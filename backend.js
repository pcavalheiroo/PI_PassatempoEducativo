const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Definindo o modelo de Usuário
const UsuarioSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

const app = express()
app.use(express.json()) // Para poder ler JSON

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:30000/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro na conexão com o MongoDB:', err))

// Rota para configurar o usuário admin
app.post('/setup-admin', async (req, res) => {
  const login = 'admin'
  const password = 'admin'

  try {
    // Verifica se o usuário já existe
    let usuario = await Usuario.findOne({ login: login })
    
    if (!usuario) {
      // Caso o usuário não exista, cria um novo
      const passwordCriptografada = await bcrypt.hash(password, 10)
      usuario = new Usuario({ login: login, password: passwordCriptografada, isAdmin: true })
      await usuario.save()
      return res.status(201).json({ mensagem: 'Usuário admin criado e promovido a administrador!' })
    } else {
      // Caso o usuário já exista, atualiza para admin
      usuario.isAdmin = true
      await usuario.save()
      return res.status(200).json({ mensagem: 'Usuário admin promovido a administrador!' })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({ mensagem: 'Erro ao configurar admin' })
  }
})

// Rota de login com autenticação
app.post('/login', async (req, res) => {
  const { login, password } = req.body

  // Verifica se o usuário existe
  const usuario = await Usuario.findOne({ login: login })
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Login inválido' })
  }

  // Verifica se a senha está correta
  const passwordValida = await bcrypt.compare(password, usuario.password)
  if (!passwordValida) {
    return res.status(401).json({ mensagem: 'Senha inválida' })
  }

  // Gera o token de autenticação com o campo isAdmin
  const token = jwt.sign(
    { login: usuario.login, isAdmin: usuario.isAdmin },
    'chave-segura', // Substitua por uma chave mais segura
    { expiresIn: '1h' }
  )

  return res.status(200).json({ token: token })
})

// Middleware para verificar se o usuário tem acesso à área restrita
const verificarAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso não autorizado' })
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, 'chave-segura') // Use a chave secreta que você definiu
    req.usuario = decoded

    // Verifica se é administrador
    if (!req.usuario.isAdmin) {
      return res.status(403).json({ mensagem: 'Acesso restrito a administradores' })
    }

    next()
  } catch (e) {
    return res.status(401).json({ mensagem: 'Token inválido' })
  }
}

// Rota de área restrita (exemplo)
app.get('/admin', verificarAdmin, (req, res) => {
  res.status(200).json({ mensagem: 'Bem-vindo à área restrita de administradores!' })
})

// Rota de exemplo para usuário comum
app.get('/user', (req, res) => {
  res.status(200).json({ mensagem: 'Bem-vindo, usuário!' })
})

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})