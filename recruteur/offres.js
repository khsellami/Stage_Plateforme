const offres = [
    {
        titre: "Stage Développeur Web",
        entreprise: "TechNova",
        lieu: "Paris, France",
        duree: "6 mois",
        description: "Rejoignez notre équipe dynamique en développement frontend.",
        date: "Publié il y a 3 jours"
    },
    {
        titre: "Stage Data Engineer",
        entreprise: "DataWiz",
        lieu: "Lyon, France",
        duree: "5 mois",
        description: "Manipulation de big data avec Python et Spark.",
        date: "Publié aujourd'hui"
    }
];

function displayOffres() {
    const container = document.getElementById("offresList");
    container.innerHTML = ""; // on vide avant d'ajouter

    offres.forEach(offre => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${offre.titre}</h3>
            <p><strong>Entreprise :</strong> ${offre.entreprise}</p>
            <p><strong>Lieu :</strong> ${offre.lieu}</p>
            <p><strong>Durée :</strong> ${offre.duree}</p>
            <p>${offre.description}</p>
            <p style="color: gray; font-size: 12px;">${offre.date}</p>
            <button class="logout" style="margin-top: 10px;">Postuler</button>
        `;
        container.appendChild(card);
    });
}
    // Ouvrir la modale au clic sur le bouton
    document.querySelector('.create-offer-btn').addEventListener('click', function() {
        document.getElementById('createOfferModal').style.display = "block";
    });

    // Fermer la modale en cliquant sur la croix
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('createOfferModal').style.display = "none";
    });

    // Fermer la modale si l'utilisateur clique en dehors de la modale
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('createOfferModal')) {
            document.getElementById('createOfferModal').style.display = "none";
        }
    });

    // Gestion de l'ajout d'une offre
    document.getElementById('createOfferForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs du formulaire
        const title = document.getElementById('offer-title').value;
        const description = document.getElementById('offer-description').value;
        const location = document.getElementById('offer-location').value;
        const duration = document.getElementById('offer-duration').value;

        // Créer une nouvelle offre à ajouter
        const offerHTML = `
            <div class="card">
                <h3>${title}</h3>
                <p><strong>Description :</strong> ${description}</p>
                <p><strong>Lieu :</strong> ${location}</p>
                <p><strong>Durée :</strong> ${duration}</p>
                <div class="offer-actions">
                    <button class="offer-btn edit-btn">Modifier</button>
                    <button class="offer-btn publish-btn">Publier</button>
                    <button class="offer-btn delete-btn">Supprimer</button>
                </div>
            </div>
        `;

        // Ajouter l'offre à la liste des offres
        document.getElementById('offresList').innerHTML += offerHTML;

        // Fermer la modale après l'ajout
        document.getElementById('createOfferModal').style.display = "none";

        // Réinitialiser le formulaire
        document.getElementById('createOfferForm').reset();
    });

    // Gestion des actions des boutons (modifier, publier, supprimer)
    document.getElementById('offresList').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            // Supprimer l'offre
            event.target.closest('.card').remove();
        }
        if (event.target.classList.contains('publish-btn')) {
            // Publier l'offre (changer son état, ici un simple message)
            alert("Offre publiée !");
        }
        if (event.target.classList.contains('edit-btn')) {
            // Modifier l'offre (ouvrir un formulaire ou faire une action)
            alert("Modification de l'offre !");
        }
    });
const dateInput = document.getElementById('date-today');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;


// Dès que la page est chargée
window.onload = displayOffres;
