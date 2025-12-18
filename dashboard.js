// Initialize projects from localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Display existing projects
function displayProjects() {
    const projectsList = document.getElementById('projectsList');
    
    if (projects.length === 0) {
        projectsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No projects yet. Add your first project!</p>';
        return;
    }
    
    projectsList.innerHTML = projects.map((project, index) => `
        <div class="project-item" style="animation-delay: ${index * 0.1}s">
            <h3>${project.name}</h3>
            <span class="project-type">${project.type}</span>
            <p class="project-description">${project.description}</p>
            ${project.language ? `<p style="color: var(--accent-color); font-size: 0.9rem;">Language: ${project.language}</p>` : ''}
            ${project.url ? `<a href="${project.url}" target="_blank" style="color: var(--primary-color); font-size: 0.9rem;">View Project →</a><br>` : ''}
            ${project.tags ? `<p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">Tags: ${project.tags}</p>` : ''}
            <button class="delete-btn" onclick="deleteProject(${index})" style="margin-top: 1rem;">Delete</button>
        </div>
    `).join('');
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects();
        showMessage('Project deleted successfully!', 'success');
    }
}

// Show message
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message show ${type}`;
    
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 3000);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    displayProjects();
    
    const projectForm = document.getElementById('projectForm');
    
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newProject = {
            name: document.getElementById('projectName').value,
            type: document.getElementById('projectType').value,
            description: document.getElementById('projectDescription').value,
            language: document.getElementById('projectLanguage').value,
            url: document.getElementById('projectUrl').value,
            tags: document.getElementById('projectTags').value,
            dateAdded: new Date().toISOString()
        };
        
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        
        showMessage('Project added successfully!', 'success');
        projectForm.reset();
        displayProjects();
    });
});
