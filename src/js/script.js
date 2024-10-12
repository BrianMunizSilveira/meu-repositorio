
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})


document.addEventListener('scroll', function() {
    var backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) { 
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

document.getElementById('backToTopBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Envio de e-mail
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar o EmailJS
    emailjs.init("OseWI6pnm-kvssoSJ");

    // Adicionar evento de submit ao formulário
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir o reload da página ao enviar o formulário

            // Enviar o formulário usando o EmailJS
            emailjs.sendForm('service_sii999k', 'template_ieno9yb', this)
                .then(function() {
                    alert('Mensagem enviada com sucesso!');
                }, function(error) {
                    alert('Ocorreu um erro. Tente novamente.', error);
                });
        });
    } else {
        console.error('Formulário não encontrado');
    }
});
