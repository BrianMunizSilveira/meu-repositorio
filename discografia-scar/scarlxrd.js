// Obtém o botão
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Mostra ou esconde o botão dependendo da rolagem
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Mostra o botão se rolar mais de 300px
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

// Adiciona o comportamento de scroll suave ao clicar no botão
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
