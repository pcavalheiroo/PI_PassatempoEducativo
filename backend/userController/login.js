document.getElementById('loginButton').addEventListener('click', async () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alertDiv = document.querySelector('.alert');

    const login = emailInput.value;
    const password = passwordInput.value;

    // Alertas
    function atualizarAlerta(mensagem, classe) {
        alertDiv.textContent = mensagem;
        alertDiv.className = `alert ${classe}`;
        alertDiv.classList.remove('d-none'); // Alerta visível
    }

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

            localStorage.setItem('authToken', token);

            // Verificar Admin
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isAdmin = payload.isAdmin;

            if (isAdmin) {
                const painelLink = document.getElementById('painelLink');
                painelLink.style.display = 'inline';
            }

            atualizarAlerta('Login realizado com sucesso! Painel de Textos disponível!', 'alert-success');
        } else {
            const errorData = await response.json();
            atualizarAlerta(errorData.mensagem || 'Erro ao fazer login.', 'alert-error');
        }
    } catch (error) {
        atualizarAlerta('Erro na comunicação com o servidor.', 'alert-error');
        console.error(error);
    }
});
