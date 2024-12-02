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