document.addEventListener('DOMContentLoaded', function () {
    // ========== MENU MOBILE - VERSÃO CORRIGIDA ==========
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuButton && mainNav) {
        let isMenuOpen = false;

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);

        // Função para alternar menu
        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                // Abrir menu
                mainNav.classList.add('nav-open');
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                mobileMenuButton.setAttribute('aria-expanded', 'true');
                mobileMenuButton.innerHTML = '<i class="bi bi-x"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                // Fechar menu
                mainNav.classList.remove('nav-open');
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.innerHTML = '<i class="bi bi-list"></i>';
                document.body.style.overflow = '';
            }
        }

        // Event listeners para o menu
        mobileMenuButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Fechar menu clicando no overlay
        overlay.addEventListener('click', function () {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });

        // Fechar menu ao clicar nos links de navegação
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMobileMenu();
            }
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMobileMenu();
            }
        });
    }

    // ========== NAVEGAÇÃO SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== BOTÃO VOLTAR AO TOPO ==========
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        // Criar estilos para o botão se não existirem
        if (!document.querySelector('#back-to-top-styles')) {
            const style = document.createElement('style');
            style.id = 'back-to-top-styles';
            style.textContent = `
                #backToTopBtn {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                #backToTopBtn.show {
                    opacity: 1;
                    visibility: visible;
                }
                #backToTopBtn:hover {
                    background: #0056b3;
                    transform: translateY(-2px);
                }
            `;
            document.head.appendChild(style);
        }

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
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

    // ========== FORMULÁRIO DE CONTATO ==========
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        // Verificar se EmailJS está carregado
        const checkEmailJS = () => {
            return typeof emailjs !== 'undefined';
        };

        // Inicializar EmailJS se disponível
        if (checkEmailJS()) {
            try {
                emailjs.init("OseWI6pnm-kvssoSJ");
            } catch (error) {
                console.warn('Erro ao inicializar EmailJS:', error);
            }
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameField = contactForm.querySelector('#name');
            const emailField = contactForm.querySelector('#email');
            const messageField = contactForm.querySelector('#message');

            // Validação
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !message) {
                showFeedback('Por favor, preencha todos os campos.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Tentar enviar via EmailJS
            if (checkEmailJS()) {
                showFeedback('Enviando mensagem...', 'loading');

                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_name: 'Brian Muniz'
                };

                emailjs.send('service_sii999k', 'template_ieno9yb', templateParams)
                    .then(() => {
                        showFeedback('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('Erro EmailJS:', error);
                        showFeedback('Erro ao enviar. Tente contato direto: brian.muniz.silveira@gmail.com', 'error');
                    });
            } else {
                showFeedback('Sistema de envio indisponível. Contate diretamente: brian.muniz.silveira@gmail.com', 'error');
            }
        });

        function showFeedback(message, type) {
            formFeedback.textContent = message;
            formFeedback.className = `form-feedback ${type}`;
            formFeedback.style.display = 'block';

            if (type !== 'loading') {
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, type === 'success' ? 5000 : 8000);
            }
        }
    }

    // ========== ANO ATUAL ==========
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ========== LOG DE DEBUG ==========
    console.log('Script carregado com sucesso!');
    console.log('Menu mobile:', mobileMenuButton ? 'encontrado' : 'não encontrado');
    console.log('Navegação:', mainNav ? 'encontrada' : 'não encontrada');
    console.log('Formulário:', contactForm ? 'encontrado' : 'não encontrado');
});