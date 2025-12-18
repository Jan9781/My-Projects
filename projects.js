// Load projects from localStorage
let allProjects = JSON.parse(localStorage.getItem('projects')) || [];
let filteredProjects = [...allProjects];

// Display projects in grid
function displayProjectsGrid() {
    const projectsGrid = document.getElementById('projectsGrid');
    const noProjects = document.getElementById('noProjects');
    
    if (filteredProjects.length === 0) {
        projectsGrid.style.display = 'none';
        noProjects.style.display = 'block';
        return;
    }
    
    projectsGrid.style.display = 'grid';
    noProjects.style.display = 'none';
    
    projectsGrid.innerHTML = filteredProjects.map((project, index) => {
        const tags = project.tags ? project.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        
        return `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <h3>${project.name}</h3>
                <span class="type-badge">${project.type}</span>
                <p class="description">${project.description}</p>
                ${project.language ? `<p class="language">💻 ${project.language}</p>` : ''}
                ${tags.length > 0 ? `
                    <div class="tags">
                        ${tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                ` : ''}
                ${project.url ? `<a href="${project.url}" target="_blank" class="project-url">View Project →</a>` : ''}
            </div>
        `;
    }).join('');
}

// Filter projects
function filterProjects(type) {
    if (type === 'all') {
        filteredProjects = [...allProjects];
    } else {
        filteredProjects = allProjects.filter(project => project.type === type);
    }
    displayProjectsGrid();
}

// Search projects
function searchProjects(query) {
    const searchTerm = query.toLowerCase();
    
    if (!searchTerm) {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterProjects(activeFilter);
        return;
    }
    
    filteredProjects = allProjects.filter(project => {
        return project.name.toLowerCase().includes(searchTerm) ||
               project.description.toLowerCase().includes(searchTerm) ||
               (project.language && project.language.toLowerCase().includes(searchTerm)) ||
               (project.tags && project.tags.toLowerCase().includes(searchTerm));
    });
    
    displayProjectsGrid();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayProjectsGrid();
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterType = this.dataset.filter;
            filterProjects(filterType);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        searchProjects(e.target.value);
    });
    
    // Refresh projects every 5 seconds (in case they're updated in another tab)
    setInterval(() => {
        const updatedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        if (JSON.stringify(updatedProjects) !== JSON.stringify(allProjects)) {
            allProjects = updatedProjects;
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterProjects(activeFilter);
        }
    }, 5000);
});

// Add some sample projects if none exist (for demo purposes)
if (allProjects.length === 0) {
    const sampleProjects = [
        {
            name: "Python Automation Script",
            type: "script",
            description: "A powerful automation script that streamlines daily tasks and improves productivity.",
            language: "Python",
            url: "https://github.com/example/automation",
            tags: "automation, python, productivity",
            dateAdded: new Date().toISOString()
        },
        {
            name: "Chrome Extension",
            type: "extension",
            description: "A browser extension that enhances web browsing experience with custom features.",
            language: "JavaScript",
            url: "https://github.com/example/chrome-ext",
            tags: "chrome, extension, javascript",
            dateAdded: new Date().toISOString()
        },
        {
            name: "React Dashboard",
            type: "webapp",
            description: "A modern dashboard built with React for data visualization and analytics.",
            language: "JavaScript/React",
            url: "https://github.com/example/dashboard",
            tags: "react, dashboard, analytics",
            dateAdded: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('projects', JSON.stringify(sampleProjects));
    allProjects = sampleProjects;
    filteredProjects = [...allProjects];
}
