
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