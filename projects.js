var projectsLoaded = false;

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  set project(data) {
    this._project = data;
    this.render();
  }
  
  get project() {
    return this._project;
  }
  
  render() {
    if (!this._project) return;
    this.shadowRoot.innerHTML = `
        <style>
            img {
                width: 100%;
                border-radius: 5%;
            }
            h2 {
                margin: 1rem 0;
                font-size: 1.2rem;
            }
        </style>
        <h2>${this._project.name}</h2>
        <picture>
            <source media="(min-width: 300px)" srcset="${this._project.image}">
            <img src="${this._project.image}" alt="${this._project.name}">
        </picture>
        <p>${this._project.description}</p>
        <a href="${this._project.url}">View Details</a>
    `;
  }
}

// Register the custom element
customElements.define('project-card', ProjectCard);

function createProject(project, container) {
  // Create a new custom element and set its project data
  const projectCard = document.createElement('project-card');
  projectCard.project = project;
  container.appendChild(projectCard);
}

function loadLocalStorage() {
  if (projectsLoaded) {
    const reload = confirm('Are you sure you want to reload the projects? This will append the loaded projects to the existing ones.');
    if (!reload) return;
  }
  const projects = JSON.parse(localStorage.getItem('projects'));
  const container = document.querySelector('#projects-container');
  projects.forEach(project => createProject(project, container));
  projectsLoaded = true;
}

function saveLocalStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

async function loadRemoteStorage() {
  if (projectsLoaded) {
    const reload = confirm('Are you sure you want to reload the projects? This will append the loaded projects to the existing ones.');
    if (!reload) return;
  }
  const response = await fetch('https://api.jsonbin.io/v3/b/67d7a2758960c979a573088b');
  const projects = (await response.json()).record.projects;
  const container = document.querySelector('#projects-container');
  projects.forEach(project => createProject(project, container));
  projectsLoaded = true;
}

// On page load, save the projects to localStorage
document.addEventListener('DOMContentLoaded', async () => {
  const projects = [
    {
      name: 'Game Development',
      image: 'project1-thumbnail.jpg',
      small_image: 'project1-thumbnail-small.jpg',
      description: 'Development of indie titles like Talis Stand, Sweet Doll... ',
      url: 'project1-details.html'
    },
    {
      name: 'AI Chatbot',
      image: 'project2-thumbnail.jpg',
      small_image: 'project2-thumbnail-small.jpg',
      description: 'Natural Language Processing chatbot built with OpenAI...',
      url: 'project1-details.html'
    },
    {
      name: 'Discord Auto Admin',
      image: 'project3-thumbnail.jpg',
      small_image: 'project3-thumbnail-small.jpg',
      description: 'Discord app that provides several admin functions and fun minigames...',
      url: 'project1-details.html'
    }
  ];

  saveLocalStorage(projects);
});