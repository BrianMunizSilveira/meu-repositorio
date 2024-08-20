document.addEventListener('scroll', function() {
    var backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) { // Altere este valor conforme necessário
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

document.getElementById('backToTopBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
