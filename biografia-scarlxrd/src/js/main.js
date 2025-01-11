// Efeito Parallax
window.addEventListener('scroll', function () {
    const parallaxBg = document.querySelector('.parallax-bg');
    let scrollPosition = window.pageYOffset;
    parallaxBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
});

// Animação de Revelação ao Rolar
function revelarElementos() {
    const elementos = document.querySelectorAll('.reveal');

    elementos.forEach(elemento => {
        const alturaJanela = window.innerHeight;
        const posicaoElemento = elemento.getBoundingClientRect().top;
        const pontoDeRevelacao = 150;

        if (posicaoElemento < alturaJanela - pontoDeRevelacao) {
            elemento.classList.add('active');
        }
    });
}

// Adicionar listeners para os efeitos
window.addEventListener('scroll', revelarElementos);
window.addEventListener('load', revelarElementos);