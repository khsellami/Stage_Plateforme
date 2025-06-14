// Plugin personnalisé pour afficher du texte au centre du doughnut
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height } = chart;
    const ctx = chart.ctx;
    ctx.save();

    const dataset = chart.data.datasets[0];
    const value = dataset.data[0]; // valeur du "Temps écoulé"
    const text = `${value} jours`;

    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const x = width / 2;
    const y = height / 2;
    ctx.fillText(text, x, y);
    ctx.restore();
  }
};

// Chart 1: Temps moyen de recrutement (gauge-like chart using doughnut)
new Chart(document.getElementById('recruitmentTimeChart'), {
  type: 'doughnut',
  data: {
    labels: ['Temps écoulé', 'Restant (par rapport à 60 jours)'],
    datasets: [{
      data: [30, 30], // 30 jours écoulés sur 60
      backgroundColor: ['#36a2eb', '#eaeaea'],
      borderWidth: 1
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      centerText: {} // Activer le plugin
    }
  },
  plugins: [centerTextPlugin]
});

// Chart 2: Sources de candidats
new Chart(document.getElementById('candidateSourcesChart'), {
  type: 'pie',
  data: {
    labels: ['LinkedIn', 'Site carrière', 'Cooptation'],
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// Chart 3: Compétences recherchées
new Chart(document.getElementById('skillsChart'), {
  type: 'bar',
  data: {
    labels: ['Python', 'React.js', 'SQL'],
    datasets: [{
      label: 'Nombre de recherches',
      data: [45, 30, 25],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});

document.getElementById('exportBtn').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Titre
  doc.setFontSize(16);
  doc.text("Rapport d'analyse de recrutement", 14, 20);

  // Tableau 1 - Compétences recherchées
  doc.autoTable({
    startY: 30,
    head: [['Compétence', 'Nombre de recherches']],
    body: [
      ['Python', '45'],
      ['React.js', '30'],
      ['SQL', '25']
    ],
    theme: 'grid',
    headStyles: { fillColor: [54, 162, 235] }
  });

  // Tableau 2 - Sources de candidats
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Source', 'Nombre de candidats']],
    body: [
      ['LinkedIn', '50'],
      ['Site carrière', '30'],
      ['Cooptation', '20']
    ],
    theme: 'grid',
    headStyles: { fillColor: [76, 115, 223] }
  });

  // Tableau 3 - Temps de recrutement
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Métrique', 'Valeur']],
    body: [
      ['Temps moyen de recrutement', '30 jours'],
      ['Objectif interne', '60 jours']
    ],
    theme: 'grid',
    headStyles: { fillColor: [60, 179, 113] }
  });

  // Sauvegarde du PDF
  doc.save('donnees-recrutement.pdf');
});

