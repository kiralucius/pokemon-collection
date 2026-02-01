document.addEventListener("DOMContentLoaded", () => {

  fetch("data/cards.json")
    .then(res => res.json())
    .then(cards => {
      const container = document.getElementById("cards");

      cards.forEach(card => {
        const img = document.createElement("img");
        img.src = card.immagine;
        img.style.width = "160px";
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          console.log("CLICK", card.nome);
          openModal(card);
        });

        container.appendChild(img);
      });
    });

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalInfo = document.getElementById("modalInfo");
  const closeModal = document.getElementById("closeModal");

  function openModal(card) {
    modal.classList.remove("hidden");
    // reset temi precedenti
    const modalContent = document.querySelector(".modal-content");
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

                        <label style="margin-top: 10px; display: block;">
                        <input type="checkbox" id="ownedCheckbox" ${owned ? "checked" : ""}>
                        Ce l’ho
                        </label>
    `;

    const checkbox = document.getElementById("ownedCheckbox");

    checkbox.addEventListener("change", () => {
        localStorage.setItem(card.id, checkbox.checked);
    });
}


  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

});
