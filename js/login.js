document.getElementById('loginButton').addEventListener('click', async () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alertDiv = document.querySelector('.alert');

    const login = emailInput.value;
    const password = passwordInput.value;

    if (!login || !password) {
        alertDiv.textContent = 'Por favor, preencha todos os campos.';
        alertDiv.classList.remove('d-none');
        alertDiv.classList.add('alert-danger');
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

            alertDiv.textContent = 'Login realizado com sucesso!';
            alertDiv.classList.remove('alert-danger');
            alertDiv.classList.add('alert-success');
        } else {
            const errorData = await response.json();
            alertDiv.textContent = errorData.mensagem || 'Erro ao fazer login.';
            alertDiv.classList.remove('alert-success');
            alertDiv.classList.add('alert-danger');
        }
    } catch (error) {
        alertDiv.textContent = 'Erro na comunicação com o servidor.';
        alertDiv.classList.remove('alert-success');
        alertDiv.classList.add('alert-danger');
        console.error(error);
    } finally {
        alertDiv.classList.remove('d-none');
    }
});