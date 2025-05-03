document.addEventListener('DOMContentLoaded', function () {
    // Menu mobile
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mainNav = document.querySelector('.main-nav');
    let menuOpen = false;

    // Criar um overlay para fechar o menu quando clicado fora
    const overlay = document.createElement('div');
    overlay.id = 'overlay-menu';
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Função para abrir/fechar o menu
    function toggleMenu() {
        if (menuOpen) {
            mainNav.classList.remove('menu-open');
            overlay.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
            document.body.style.overflow = ''; // Restaura o scroll
        } else {
            mainNav.classList.add('menu-open');
            overlay.classList.add('active');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            mobileMenuButton.innerHTML = '<i class="bi bi-x" aria-hidden="true"></i>';
            document.body.style.overflow = 'hidden'; // Previne scroll quando menu aberto
        }
        menuOpen = !menuOpen;
    }

    // Event listeners
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }

    overlay.addEventListener('click', toggleMenu);

    // Fechar menu quando um link é clicado
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (menuOpen) toggleMenu();
        });
    });

    // Botão voltar ao topo
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Formulário de contato
    if (typeof emailjs !== 'undefined') {
        emailjs.init("OseWI6pnm-kvssoSJ");

        const contactForm = document.getElementById('contact-form');
        const formFeedback = document.getElementById('form-feedback');

        if (contactForm && formFeedback) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Mostrar feedback de carregamento
                formFeedback.textContent = "Enviando mensagem...";
                formFeedback.className = "form-feedback loading";
                formFeedback.style.display = "block";

                emailjs.sendForm('service_sii999k', 'template_ieno9yb', this)
                    .then(function () {
                        formFeedback.textContent = "Mensagem enviada com sucesso!";
                        formFeedback.className = "form-feedback success";
                        contactForm.reset();
                        setTimeout(function () {
                            formFeedback.style.display = "none";
                        }, 5000);
                    }, function (error) {
                        formFeedback.textContent = "Ocorreu um erro. Tente novamente.";
                        formFeedback.className = "form-feedback error";
                        setTimeout(function () {
                            formFeedback.style.display = "none";
                        }, 5000);
                        console.error("Erro ao enviar:", error);
                    });
            });
        }
    }

    // Atualizar o ano atual no rodapé
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});