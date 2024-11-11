document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            // Armazena o token em localStorage ou sessionStorage
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
            // Redirecionar para a página principal ou dashboard
            window.location.href = 'home.html';
        } else {
            alert('Login ou senha inválidos.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar login. Tente novamente.');
    }
});
