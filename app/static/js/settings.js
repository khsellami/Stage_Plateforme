// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Skills Chart
    const skillsCtx = document.getElementById('skillsChart').getContext('2d');
    const skillsChart = new Chart(skillsCtx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'Python', 'Database', 'UI/UX'],
            datasets: [{
                label: 'Your Skills',
                data: [85, 90, 75, 70, 65, 80, 60],
                backgroundColor: 'rgba(78, 115, 223, 0.2)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
  
    // Job Offers Chart
    const offersCtx = document.getElementById('offersChart').getContext('2d');
    const offersChart = new Chart(offersCtx, {
        type: 'bar',
        data: {
            labels: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX', 'Data Science'],
            datasets: [{
                label: 'Available Offers',
                data: [42, 38, 56, 24, 18, 32],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.7)',
                    'rgba(54, 185, 204, 0.7)',
                    'rgba(246, 194, 62, 0.7)',
                    'rgba(28, 200, 138, 0.7)',
                    'rgba(231, 74, 59, 0.7)',
                    'rgba(133, 135, 150, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
  
    // Make charts responsive to container size
    function resizeCharts() {
        skillsChart.resize();
        offersChart.resize();
    }
  
    // Add resize event listener
    window.addEventListener('resize', resizeCharts);
  
    // Handle dropdown toggling
    const profileDropdown = document.querySelector('.profile-dropdown');
    const settingsDropdown = document.querySelector('.settings-dropdown');
  
    // Helper function for closing dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Profile dropdown close logic
        if (!profileDropdown.contains(event.target)) {
            const profileContent = profileDropdown.querySelector('.dropdown-content');
            profileContent.style.display = 'none';
        }
        
        // Settings dropdown close logic
        if (!settingsDropdown.contains(event.target)) {
            const settingsContent = settingsDropdown.querySelector('.dropdown-content');
            settingsContent.style.display = 'none';
        }
    });
  
    // Prevent event bubbling when clicking on dropdown
    profileDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        const profileContent = this.querySelector('.dropdown-content');
        profileContent.style.display = profileContent.style.display === 'block' ? 'none' : 'block';
    });
  
    settingsDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        const settingsContent = this.querySelector('.dropdown-content');
        settingsContent.style.display = settingsContent.style.display === 'block' ? 'none' : 'block';
    });
  
    // Add active class to sidebar menu items
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
  });
  
  // Add this to your dashboard.js file
  
  // Dark mode toggle functionality
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on initial load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle button click handler
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
  });
  
  
  // Add this to your dashboard.js file
  
  // Sidebar Toggle functionality
  document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Check for saved sidebar state or default to 'expanded'
    const sidebarState = localStorage.getItem('sidebar-state') || 'expanded';
    
    // Apply saved sidebar state on initial load
    if (sidebarState === 'collapsed') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
    
    // Sidebar toggle button click handler
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Save sidebar state
        if (sidebar.classList.contains('collapsed')) {
            localStorage.setItem('sidebar-state', 'collapsed');
        } else {
            localStorage.setItem('sidebar-state', 'expanded');
        }
    });
  });
  
  // Chart.js Candidature Chart
  const ctx = document.getElementById('candidatureChart').getContext('2d');
  const candidatureChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Applications Sent', 'In Review', 'Interviews', 'Offers'],
          datasets: [{
              label: 'Number of Candidatures',
              data: [15, 6, 3, 1],
              backgroundColor: [
                  '#3498db',
                  '#f1c40f',
                  '#e67e22',
                  '#2ecc71'
              ],
              borderRadius: 6
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: { display: false }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 }
              }
          }
      }
  });
  
  // Dark Mode toggle (optional if needed)
// Add more logic here if you want dark mode in future

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Change URL to your login page
  }
});

// Avatar preview
const profilePicture = document.getElementById('profilePicture');
const avatarPreview = document.getElementById('avatarPreview');

profilePicture.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.style.backgroundImage = `url('${reader.result}')`;
    };
    reader.readAsDataURL(file);
  }
});

// Save button (just prevent default for now)
const settingsForm = document.getElementById('settingsForm');
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Settings saved successfully!');
});
