const jobs = [
    {
      title: " intern Junior Graphic Designer",
      location: "New York",
      category: "Design",
      type: "Full Time",
      urgent: true,
      featured: true,
      salary: "$150 - $180 / month",
      status: "Accepted"
    },
    {
      title: "intren Finance Manager & Health",
      location: "New York",
      category: "Finance",
      type: "Full Time",
      urgent: true,
      featured: true,
      salary: "$450 - $500 / month",
      status: "Rejected"
    },
    {
      title: " intern Senior Product Designer",
      location: "San Francisco",
      category: "Design",
      type: "Part Time",
      urgent: true,
      featured: false,
      salary: "$250 - $300 / month",
      status: "Under Review"
    }
  ];
  
  // Render job cards
  const jobContainer = document.getElementById('jobs');
  
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
  
    const info = document.createElement('div');
    info.className = 'job-info';
  
    const title = document.createElement('div');
    title.className = 'job-title';
    title.textContent = job.title;
  
    const meta = document.createElement('div');
    meta.className = 'job-meta';
    meta.textContent = `${job.category} | ${job.location}`;
  
    const salary = document.createElement('div');
    salary.className = 'job-salary';
    salary.textContent = job.salary;
  
    const labels = document.createElement('div');
    labels.className = 'labels';
  
    const typeLabel = document.createElement('span');
    typeLabel.className = 'label ' + (job.type === 'Full Time' ? 'full-time' : 'part-time');
    typeLabel.textContent = job.type;
    labels.appendChild(typeLabel);
  
    if (job.status) {
      const statusLabel = document.createElement('span');
      const statusClass = job.status.toLowerCase().replace(/\s+/g, '-'); // e.g., under-review
      statusLabel.className = `label ${statusClass}`;
      statusLabel.textContent = `Status: ${job.status}`;
      labels.appendChild(statusLabel);
    }
  
    if (job.featured) {
      const featuredLabel = document.createElement('span');
      featuredLabel.className = 'label featured';
      featuredLabel.textContent = 'Featured';
      labels.appendChild(featuredLabel);
    }
  
    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(salary);
    info.appendChild(labels);
  
    card.appendChild(info);
    jobContainer.appendChild(card);
  });
  
  // Count job statuses
  const statusCounts = jobs.reduce((acc, job) => {
    const status = job.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  // Chart labels and data from job statuses
  const labels = Object.keys(statusCounts).map(status =>
    status.charAt(0).toUpperCase() + status.slice(1)
  );
  const data = Object.values(statusCounts);
  const colors = {
    accepted: '#52c41a',
    rejected: '#ff4d4f',
    'under review': '#faad14'
  };
  
  // Render chart
  const ctx = document.getElementById('jobChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Job Status',
        data,
        backgroundColor: labels.map(label => colors[label.toLowerCase()])
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  