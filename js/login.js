document.getElementById('#loginButton').addEventListener('click', async () => {
    const email = document.getElementById('#email').value;
    const password = document.getElementById('#senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: email, senha: senha})
        });

        if (response.ok) {
            const data = await response.json();
            // Armazena o token em localStorage ou sessionStorage
            localStorage.setItem('token', data.token);
            exibirAlerta('.alert-modal-login', 'Login Realizado com sucesso!!', ['show', 'alert-sucess'], ['d-none'], 2000)
            // Redirecionar para a página principal ou dashboard
            window.location.href = 'home.html';
        } else {
            exibirAlerta('.alert-modal-login', 'Preencha todos os campos!!', ['show', 'alert-danger'], ['d-none'], 2000)
        }
    } catch (e) {   
        exibirAlerta('.alert-modal-login', 'Falha na autenticação!!', ['show', 'alert-warning'], ['d-none'], 2000)
    }
});
