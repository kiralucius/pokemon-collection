document.addEventListener("DOMContentLoaded", () => {

  const cardsContainer = document.getElementById("cards");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalInfo = document.getElementById("modalInfo");
  const modalContent = document.querySelector(".modal-content");

  // =========================
// CAMBIO VISTA
// =========================
const btnCards = document.getElementById("btn-cards");
const btnCollection = document.getElementById("btn-collection");

const viewCards = document.getElementById("view-cards");
const viewCollection = document.getElementById("view-collection");

btnCards.addEventListener("click", () => {
  viewCards.classList.remove("hidden");
  viewCollection.classList.add("hidden");

  btnCards.classList.add("active");
  btnCollection.classList.remove("active");
});

btnCollection.addEventListener("click", () => {
  viewCards.classList.add("hidden");
  viewCollection.classList.remove("hidden");

  btnCollection.classList.add("active");
  btnCards.classList.remove("active");
});

  // =========================
  // CARICAMENTO CARTE
  // =========================
  fetch("data/cards.json")
    .then(res => res.json())
    .then(cards => {
      cards.forEach(card => {
        const img = document.createElement("img");
        img.src = card.immagine;
        img.style.width = "160px";
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          openModal(card);
        });

        cardsContainer.appendChild(img);
      });
    });

  // =========================
  // APERTURA MODAL
  // =========================
  function openModal(card) {
    modal.classList.remove("hidden");

    // reset classi tema
    modalContent.className = "modal-content";

    // tema per set
    if (card.set === "Astri Lucenti") {
      modalContent.classList.add("modal-astri-lucenti");
    }

    modalImg.src = card.immagine;

    const owned = localStorage.getItem(card.id) === "true";

    modalInfo.innerHTML = `
      <h2>${card.nome}</h2>
      <p><strong>Rarità:</strong> ${card.rarita}</p>
      <p><strong>Set:</strong> ${card.set}</p>
      <p><strong>Numero:</strong> ${card.numero}</p>
      <p><strong>Illustratore:</strong> ${card.illustratore}</p>

      <label style="margin-top: 10px;">
        <input type="checkbox" id="ownedCheckbox" ${owned ? "checked" : ""}>
        Ce l’ho
      </label>
    `;

    const checkbox = document.getElementById("ownedCheckbox");
    checkbox.addEventListener("change", () => {
      localStorage.setItem(card.id, checkbox.checked);
    });
  }

  // =========================
  // CHIUSURA MODAL
  // =========================

  // clic su overlay → chiude
  modal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // clic sul contenuto → NON chiude
  modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });

});
