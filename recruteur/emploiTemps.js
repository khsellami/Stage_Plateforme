// Exemple d'emploi du temps avec des créneaux d'entretien et des créneaux libres
const emploiDuTemps = [
    { hour: '09:00', lundi: 'disponible', mardi: 'entretien', mercredi: 'disponible', jeudi: 'disponible', vendredi: 'entretien' },
    { hour: '10:00', lundi: 'entretien', mardi: 'disponible', mercredi: 'entretien', jeudi: 'disponible', vendredi: 'disponible' },
    { hour: '11:00', lundi: 'disponible', mardi: 'disponible', mercredi: 'entretien', jeudi: 'entretien', vendredi: 'disponible' },
    { hour: '14:00', lundi: 'entretien', mardi: 'disponible', mercredi: 'disponible', jeudi: 'disponible', vendredi: 'entretien' },
    { hour: '15:00', lundi: 'disponible', mardi: 'disponible', mercredi: 'disponible', jeudi: 'entretien', vendredi: 'disponible' },
];

// Fonction pour remplir le tableau avec les données de l'emploi du temps
function generateSchedule() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';  // Clear previous content

    emploiDuTemps.forEach(row => {
        const tr = document.createElement('tr');

        // Créer la cellule de l'heure
        const tdHour = document.createElement('td');
        tdHour.textContent = row.hour;
        tr.appendChild(tdHour);

        // Créer les cellules pour chaque jour de la semaine
        ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].forEach(day => {
            const td = document.createElement('td');
            td.classList.add(row[day] === 'entretien' ? 'interview' : row[day] === 'disponible' ? 'available' : 'empty');
            td.textContent = row[day] === 'entretien' ? 'Entretien' : row[day] === 'disponible' ? 'Libre' : '';
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// Afficher ou cacher le formulaire pour ajouter un entretien
document.getElementById('planifierEntretien').addEventListener('click', function() {
    const form = document.getElementById('entretienForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

// Ajouter un entretien à l'emploi du temps
document.getElementById('submitEntretien').addEventListener('click', function() {
    const horaire = document.getElementById('horaire').value;
    const jour = document.getElementById('jour').value;

    // Ajouter l'entretien à l'emploi du temps
    const existingSlot = emploiDuTemps.find(slot => slot.hour === horaire);
    if (existingSlot) {
        existingSlot[jour] = 'entretien';
        generateSchedule(); // Mettre à jour l'affichage
    } else {
        alert('Le créneau horaire est introuvable.');
    }

    // Réinitialiser et cacher le formulaire
    document.getElementById('entretienForm').style.display = 'none';
    document.getElementById('horaire').value = '';
    document.getElementById('jour').value = 'lundi';
});
const dateInput = document.getElementById('date-today');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
// Appeler la fonction pour générer l'emploi du temps au chargement de la page
window.onload = generateSchedule;
