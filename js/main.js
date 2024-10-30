function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
}

// Selecione o botão do dropdown
const dropdownBtn = document.querySelector('.dropbtn');

// Adicione um evento de clique ao botão
dropdownBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Previne o comportamento padrão do link

  const dropdown = this.parentElement; // Obtém o pai do botão dropdown (li)

  // Verifica se o dropdown já está ativo
  const isActive = dropdown.classList.contains('active');

  // Fecha qualquer dropdown ativo antes de abrir o atual
  document.querySelectorAll('.dropdown').forEach(function(drop) {
    drop.classList.remove('active');
  });

  // Se não estiver ativo, abre o dropdown
  if (!isActive) {
    dropdown.classList.add('active');
  }
});

// Fecha o dropdown se clicar fora dele
document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(function(dropdown) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
});


