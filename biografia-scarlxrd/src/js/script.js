/* "Setinha" para retornar ao topo */ 
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

document.getElementById("backToTopBtn").onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};


/* Tooltip para os albuns */
const abbrs = document.querySelectorAll('abbr');

abbrs.forEach(function(abbr) {
    abbr.addEventListener('click', function() {
        alert(this.getAttribute('title'));
    })
})