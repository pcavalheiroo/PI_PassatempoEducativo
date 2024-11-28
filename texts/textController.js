const express = require('express');
const router = express.Router();
const Text = require('./model');

/**
 * CREATE - Adicionar um novo texto ao banco
 * Endpoint: POST /texts
 */
router.post('/', async (req, res) => {
    const { _id, h1, p } = req.body;

    try {
        const newText = new Text({ _id, h1, p });
        const savedText = await newText.save();
        res.status(201).json({ message: 'Texto adicionado com sucesso!', data: savedText });
    } catch (e) {
        console.error('Erro ao criar texto:', e);
        res.status(500).json({ message: 'Erro ao criar texto.', error: e });
    }
});

/**
 * READ - Buscar todos os textos
 * Endpoint: GET /texts
 */
router.get('/', async (req, res) => {
    try {
        const texts = await Text.find();
        res.status(200).json(texts);
    } catch (e) {
        console.error('Erro ao buscar textos:', e);
        res.status(500).json({ message: 'Erro ao buscar textos.', error: e });
    }
});

/**
 * READ - Buscar um texto específico pelo ID
 * Endpoint: GET /texts/:id
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const text = await Text.findById(id);
        if (!text) {
            return res.status(404).json({ message: 'Texto não encontrado.' });
        }
        res.status(200).json(text);
    } catch (e) {
        console.error('Erro ao buscar texto:', e);
        res.status(500).json({ message: 'Erro ao buscar texto.', error: e });
    }
});

/**
 * UPDATE - Atualizar um texto pelo ID
 * Endpoint: PUT /texts/:id
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { h1, p } = req.body;

    try {
        const updatedText = await Text.findByIdAndUpdate(
            id,
            { h1, p },
            { new: true } // Retorna o documento atualizado
        );
        if (!updatedText) {
            return res.status(404).json({ message: 'Texto não encontrado.' });
        }
        res.status(200).json({ message: 'Texto atualizado com sucesso!', data: updatedText });
    } catch (e) {
        console.error('Erro ao atualizar texto:', e);
        res.status(500).json({ message: 'Erro ao atualizar texto.', error: e });
    }
});

/**
 * DELETE - Remover um texto pelo ID
 * Endpoint: DELETE /texts/:id
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedText = await Text.findByIdAndDelete(id);
        if (!deletedText) {
            return res.status(404).json({ message: 'Texto não encontrado.' });
        }
        res.status(200).json({ message: 'Texto removido com sucesso!', data: deletedText });
    } catch (e) {
        console.error('Erro ao remover texto:', e);
        res.status(500).json({ message: 'Erro ao remover texto.', error: e });
    }
});

module.exports = router;
