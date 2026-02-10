document.addEventListener("DOMContentLoaded", () => {
    // --- SELETTORI ---
    const ui = {
        views: {
            cards: document.getElementById("view-cards"),
            collection: document.getElementById("view-collection")
        },
        buttons: {
            cards: document.getElementById("btn-cards"),
            collection: document.getElementById("btn-collection"),
            addBinder: document.getElementById("add-collection")
        },
        modals: {
            main: document.getElementById("modal"),
            binder: document.getElementById("binder-modal")
        }
    };

    // --- LOGICA VISTE (Sidebar) ---
    const switchView = (target) => {
        Object.keys(ui.views).forEach(key => {
            const isTarget = key === target;
            ui.views[key].classList.toggle("hidden", !isTarget);
            ui.buttons[key].classList.toggle("active", isTarget);
        });
    };

    ui.buttons.cards.addEventListener("click", () => switchView('cards'));
    ui.buttons.collection.addEventListener("click", () => switchView('collection'));

    // --- CARICAMENTO CARTE ---
    const cardsContainer = document.getElementById("cards");

    fetch("data/cards.json")
        .then(res => res.json())
        .then(cards => {
            cards.forEach(card => {
                const img = document.createElement("img");
                img.src = card.immagine;
                img.className = "card-thumb"; // Usa classi per lo stile, non inline JS
                img.addEventListener("click", () => openCardModal(card));
                cardsContainer.appendChild(img);
            });
        });

    // --- MODALE DETTAGLIO CARTA ---
    function openCardModal(card) {
        const modalContent = document.querySelector(".modal-content");
        const modalImg = document.getElementById("modalImg");
        const modalInfo = document.getElementById("modalInfo");

        ui.modals.main.classList.remove("hidden");
        modalContent.className = "modal-content" + (card.set === "Astri Lucenti" ? " modal-astri-lucenti" : "");
        modalImg.src = card.immagine;

        const owned = localStorage.getItem(card.id) === "true";

        modalInfo.innerHTML = `
            <h2>${card.nome}</h2>
            <p><strong>Rarità:</strong> ${card.rarita}</p>
            <p><strong>Set:</strong> ${card.set}</p>
            <p><strong>Illustratore:</strong> ${card.illustratore}</p>
            <label><input type="checkbox" id="ownedCheckbox" ${owned ? "checked" : ""}> Posseduta</label>
        `;

        document.getElementById("ownedCheckbox").onchange = (e) => {
            localStorage.setItem(card.id, e.target.checked);
        };
    }

    // --- LOGICA RACCOGLITORE (Binder) ---
    const binderForm = {
        container: document.getElementById("binder-form"),
        artist: document.getElementById("artist-form"),
        set: document.getElementById("set-form"),
        label: document.getElementById("binder-label")
    };

    ui.buttons.addBinder.addEventListener("click", () => {
        ui.modals.binder.classList.remove("hidden");
        Object.values(binderForm).forEach(el => el?.classList?.add("hidden"));
    });

    // Gestione click opzioni (Set o Artista)
    ui.modals.binder.addEventListener("click", (e) => {
        const mode = e.target.dataset.mode;
        if (!mode) return;

        binderForm.container.classList.remove("hidden");
        binderForm.artist.classList.toggle("hidden", mode !== "artist");
        binderForm.set.classList.toggle("hidden", mode !== "set");
    });

    // Chiusura modali cliccando fuori
    [ui.modals.main, ui.modals.binder].forEach(m => {
        m.addEventListener("click", (e) => {
            if (e.target === m) m.classList.add("hidden");
        });
    });
});