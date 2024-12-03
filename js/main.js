// Menu Desktop

// Abrir/fechar menu
function toggleMenu() {
  const menu = document.querySelector('nav ul');
  menu.classList.toggle('active');
}

// Dropdown
const dropdownBtn = document.querySelector('.dropbtn');

dropdownBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const dropdown = this.parentElement;

  // Verifica se ativo
  const isActive = dropdown.classList.contains('active');

  document.querySelectorAll('.dropdown').forEach(function (drop) {
    drop.classList.remove('active');
    drop.querySelector('.arrow-icon').style.transform = 'rotate(0deg)';
  });

  if (!isActive) {
    dropdown.classList.add('active');
    dropdown.querySelector('.arrow-icon').style.transform = 'rotate(180deg)';
  }
});

// Fecha o dropdown se clicar fora
document.addEventListener('click', function (e) {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
      dropdown.querySelector('.arrow-icon').style.transform = 'rotate(0deg)'; // Reseta a rotação
    }
  });
});



// Menu Mobile

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector("nav.mobile");
  const closeIcon = document.querySelector(".close-icon");
  const menuIcon = document.querySelector("#menu-icon");
  const daltonismoSelector = document.querySelector("#daltonismo");

  menuIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      mobileMenu.classList.add("show");
      if (daltonismoSelector) {
          daltonismoSelector.style.display = "none";
      }
  });

  closeIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      mobileMenu.classList.remove("show");
      if (daltonismoSelector) {
          daltonismoSelector.style.display = "";
      }
  });

  const dropdownMobile = document.querySelector("nav.mobile .dropdown");
  const dropdownBtnMobile = dropdownMobile.querySelector(".dropbtn");
  const dropdownContentMobile = dropdownMobile.querySelector(".dropdown-content");
  const arrowIconMobile = dropdownMobile.querySelector('.arrow-icon');

  dropdownBtnMobile.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownContentMobile.classList.toggle("active");
      if (dropdownContentMobile.classList.contains('active')) {
          arrowIconMobile.style.transform = 'rotate(180deg)';
      } else {
          arrowIconMobile.style.transform = 'rotate(0deg)';
      }
  });
});



// Daltonismo

const daltonismoSelect = document.getElementById('daltonismo');

daltonismoSelect.addEventListener('change', function () {
  document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');

  const selectedValue = daltonismoSelect.value;
  if (selectedValue) {
    document.body.classList.add(selectedValue);
  }
});



// Carrossel

document.addEventListener("DOMContentLoaded", () => {
  const carrossel = document.querySelector(".carrossel-images");
  const images = document.querySelectorAll(".carrossel-images img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let index = 0;
  const intervalTime = 3000;
  let autoSlide;

  function updateCarrossel() {
    const offset = -index * 100;
    carrossel.style.transform = `translateX(${offset}%)`;
  }

  function showNextImage() {
    index = (index + 1) % images.length;
    updateCarrossel();
  }

  function startAutoSlide() {
    autoSlide = setInterval(showNextImage, intervalTime);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  prevButton.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateCarrossel();
    resetAutoSlide();
  });

  nextButton.addEventListener("click", () => {
    showNextImage();
    resetAutoSlide();
  });

  // Pausa o auto-slide ao passar o mouse sobre o carrossel
  carrossel.addEventListener("mouseenter", () => clearInterval(autoSlide));
  carrossel.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
});



// Verificação do Token
// Função para verificar o status de login na Navbar
function verificarNavbar() {
  const token = localStorage.getItem('token');
  const painelLink = document.getElementById('painelLink');
  const loginLink = document.getElementById('loginLink');

  if (!painelLink || !loginLink) {
    console.error('Elementos da Navbar não encontrados!');
    return;
  }

  // Inicialmente, oculta os links
  painelLink.style.display = 'none';
  loginLink.style.display = 'block';

  // Verifica se o token é válido
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
      if (payload.username === 'admin') {
        painelLink.style.display = 'block'; // Exibe o link do painel
        loginLink.style.display = 'none';  // Oculta o link de login
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }
}

// Função de Login
function login(event) {
  event.preventDefault(); // Impede o envio tradicional do formulário

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Verifica as credenciais
  if (username === 'admin' && password === 'admin') {
    const token = btoa(JSON.stringify({ username: 'admin', isAdmin: true }));
    localStorage.setItem('token', token); // Armazena o token no localStorage
    alert('Login bem-sucedido!');
    verificarNavbar(); // Atualiza a navbar após login
  } else {
    alert('Credenciais inválidas!');
  }
}

// Função para verificar se o usuário está autenticado na página de painel
function verificarAutenticacao() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Acesso Negado: Você precisa estar autenticado.');
    window.location.href = 'login.html'; // Redireciona para a página de login
  }
}

// Função para redirecionar caso o usuário já esteja logado na página de login
function verificarLoginPage() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
      if (payload.username === 'admin') {
        verificarNavbar(); // Atualiza a navbar
        return; // Não exibe mensagens desnecessárias
      }
    } catch (error) {
      console.error('Erro ao verificar login na página de login:', error);
    }
  }
}

// Executa as verificações quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  verificarNavbar(); // Atualiza a navbar conforme o login

  // Página de login
  if (window.location.pathname.includes('login.html')) {
    verificarLoginPage(); // Verifica e exibe o menu adequado na página de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        login(event); // Realiza o login e previne o envio padrão
      });
    } else {
      console.error('Formulário de login não encontrado!');
    }
  }

  // Página do painel (texts.html)
  if (window.location.pathname.includes('texts.html')) {
    verificarAutenticacao(); // Verifica se está autenticado ao acessar o painel
  }
});