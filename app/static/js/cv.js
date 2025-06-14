document.addEventListener('DOMContentLoaded', () => {
    const cvForm = document.getElementById('cvForm');
    const previewArea = document.getElementById('previewArea');
    const suggestBtn = document.getElementById('suggestBtn');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    // Load saved sidebar state
    if (localStorage.getItem('sidebar-state') === 'collapsed') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }

    // Sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        localStorage.setItem('sidebar-state', sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    });

    // Real-time preview
    cvForm.addEventListener('input', () => {
        const inputs = cvForm.querySelectorAll('input, textarea');
        let previewHtml = '';

        inputs.forEach(input => {
            if (input.value.trim()) {
                previewHtml += `<p><strong>${input.placeholder}:</strong> ${input.value}</p>`;
            }
        });

        previewArea.innerHTML = previewHtml || '<p>Aucune information saisie pour l\'instant...</p>';
    });

    // Suggestions
    suggestBtn.addEventListener('click', () => {
        showNotification('Ajoutez plus de détails dans vos expériences et compétences clés.');
    });

    // Submit
    cvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('CV sauvegardé avec succès !');
    });

    function showNotification(message) {
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }
});
