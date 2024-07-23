document.addEventListener("DOMContentLoaded", function() {
    const books = document.querySelectorAll(".book");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalResenha = document.getElementById("modal-sobre");

    books.forEach(book => {
        book.addEventListener("click", function() {
            const resenha = this.getAttribute("data-sobre");
            const title = this.querySelector("p").textContent;

            modalTitle.textContent = title;
            modalResenha.textContent = resenha;
            modal.style.display = "block";
        });
    });

    // Fechar o modal ao clicar no botão de fechar (X)
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
