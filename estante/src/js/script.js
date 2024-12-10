function displayBooks(e) {
  let t = document.getElementById("book-shelf");
  (t.innerHTML = ""),
    e.forEach((e, o) => {
      let n = document.createElement("div");
      n.classList.add("book-card"),
        (n.dataset.index = o),
        (n.innerHTML = `<img src="${e.cover}" alt="Capa do livro ${e.title}"> <h3>${e.title}</h3>`),
        t.appendChild(n),
        n.addEventListener("click", () => showModal(e));
    });
}

function searchBooks() {
  let e = document.getElementById("search-bar").value.toLowerCase(),
    t = books.filter(
      (t) =>
        t.title.toLowerCase().includes(e) || t.author.toLowerCase().includes(e)
    );
  if (0 === t.length) {
    showSnackbar(
      "Ops! Parece que esse livro ainda n\xe3o est\xe1 na minha estante."
    );
    return;
  }
  displayBooks(t);
}

function showSnackbar(e) {
  let t = document.getElementById("snackbar");
  (t.textContent = e),
    t.classList.add("show"),
    setTimeout(() => {
      t.classList.remove("show");
    }, 3e3);
}

function showModal(e) {
  let t = document.getElementById("modal-title"),
    o = document.getElementById("modal-author"),
    n = document.getElementById("modal-description"),
    a = document.getElementById("book-year"),
    l = document.getElementById("book-pages"),
    d = document.getElementById("book-genre");
  (t.textContent = e.title),
    (o.textContent = `Autor: ${e.author}`),
    (n.textContent = e.description),
    (a.textContent = e.year),
    (l.textContent = e.pages),
    (d.textContent = `G\xeanero: ${e.genres.join(", ")}`),
    (document.getElementById("modal").style.display = "flex");
  let r = document.getElementById("review-arrow");
  r.onclick = () => openReviewModal(e.review);
}

function closeModal() {
  let e = document.getElementById("modal");
  e.style.display = "none";
}

function openReviewModal(e) {
  let t = document.getElementById("review-modal-title"),
    o = document.getElementById("review-modal-text");
  (t.textContent = "Resenha"),
    (o.textContent = e),
    (document.getElementById("review-modal").style.display = "flex");
}

function closeReviewModal() {
  document.getElementById("review-modal").style.display = "none";
}

function toggleInfo() {
  let e = document.querySelector(".info-container");
  e.classList.toggle("active");
}
document.querySelectorAll(".close").forEach((e) => {
  e.addEventListener("click", () => {
    closeModal(), closeReviewModal();
  });
}),
  window.addEventListener("click", (e) => {
    let t = document.getElementById("modal");
    e.target === t && closeModal();
    let o = document.getElementById("review-modal");
    e.target === o && closeReviewModal();
  }),
  document.getElementById("search-bar").addEventListener("input", searchBooks),
  (window.onload = () => {
    displayBooks(books);
  }),
  document.addEventListener("DOMContentLoaded", () => {
    let e = new Date(document.lastModified),
      t = e.getDate().toString().padStart(2, "0"),
      o = (e.getMonth() + 1).toString().padStart(2, "0"),
      n = e.getFullYear(),
      a = e.getHours().toString().padStart(2, "0"),
      l = e.getMinutes().toString().padStart(2, "0");
    document.getElementById(
      "data-atualizacao"
    ).textContent = `\xdaltima atualiza\xe7\xe3o em: ${t}/${o}/${n} \xe0s ${a}:${l}`;
  }),
  window.addEventListener("scroll", () => {
    let e = window.pageYOffset,
      t = document.querySelector(".header-bg");
    t.style.transform = `translateY(${0.5 * e}px)`;
  }),
  document.addEventListener("DOMContentLoaded", () => {
    let e = () => {
      let e = new Date(),
        t = e.getHours().toString().padStart(2, "0"),
        o = e.getMinutes().toString().padStart(2, "0"),
        n = e.getSeconds().toString().padStart(2, "0");
      document.getElementById("horario").textContent = `${t}:${o}:${n}`;
    };
    setInterval(e, 1e3);
  });

// Mostrar ou esconder a seta com base no scroll
window.addEventListener("scroll", () => {
  const backToTopButton = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Rolar para o topo quando a seta for clicada
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
