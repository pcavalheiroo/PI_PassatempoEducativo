document.getElementById('loginButton').addEventListener('click', async () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alertDiv = document.querySelector('.alert');

    const login = emailInput.value;
    const password = passwordInput.value;

    // Função para atualizar o alerta com a mensagem e a classe correta
    function atualizarAlerta(mensagem, classe) {
        alertDiv.textContent = mensagem;
        alertDiv.className = `alert ${classe}`; // Remove outras classes e adiciona a nova
        alertDiv.classList.remove('d-none'); // Certifique-se de que o alerta está visível
    }

    // Validação de campos vazios
    if (!login || !password) {
        atualizarAlerta('Por favor, preencha todos os campos.', 'alert-warning');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // Salvar o token no localStorage
            localStorage.setItem('authToken', token);

            // Decodificar o token para verificar se o usuário é admin
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isAdmin = payload.isAdmin;

            if (isAdmin) {
                // Mostrar o link do painel
                const painelLink = document.getElementById('painelLink');
                painelLink.style.display = 'inline';
            }

            atualizarAlerta('Login realizado com sucesso!', 'alert-success');
        } else {
            const errorData = await response.json();
            atualizarAlerta(errorData.mensagem || 'Erro ao fazer login.', 'alert-error');
        }
    } catch (error) {
        atualizarAlerta('Erro na comunicação com o servidor.', 'alert-error');
        console.error(error);
    }
});
