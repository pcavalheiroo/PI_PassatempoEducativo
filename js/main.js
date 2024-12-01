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

  menuIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    mobileMenu.style.display = "flex";
  });

  // Fechar o menu mobile ao clicar no ícone de fechar
  closeIcon.addEventListener("click", function () {
    mobileMenu.style.display = "none";
  });

  // Fechar o menu ao clicar fora do menu
  document.addEventListener("click", function (e) {
    if (!mobileMenu.contains(e.target) && e.target !== menuIcon) {
      mobileMenu.style.display = "none";
    }
  });

  const dropdownMobile = document.querySelector("nav.mobile .dropdown");
  const dropdownBtnMobile = dropdownMobile.querySelector(".dropbtn");
  const dropdownContentMobile = dropdownMobile.querySelector(".dropdown-content");
  const arrowIconMobile = dropdownMobile.querySelector('.arrow-icon');

  // Abrir/fechar o dropdown
  dropdownBtnMobile.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownContentMobile.classList.toggle("active");
    if (dropdownContentMobile.classList.contains('active')) {
      arrowIconMobile.style.transform = 'rotate(180deg)';
    } else {
      arrowIconMobile.style.transform = 'rotate(0deg)'; // Reseta
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
