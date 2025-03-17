var projectsLoaded = false;

function createProject(project, container) {

    // Create a new element <project-card>
    const projectCard = document.createElement('project-card');
    // Populate with <h2>Project Name</h2>
    const title = document.createElement('h2');
    title.textContent = project.name;
    projectCard.appendChild(title);
    // Populate with <picture><source media="(min-width: 300)" srcset="project.image"><img src="project.small_image" alt="project.name"></picture>
    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.media = '(min-width: 300px)';
    source.srcset = project.image;
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.name;
    picture.appendChild(source);
    picture.appendChild(image);
    projectCard.appendChild(picture);
    // Populate with <p>Project Description</p>
    const description = document.createElement('p');
    description.textContent = project.description;
    projectCard.appendChild(description);
    // Populate with <a href="project.url">Project URL</a>
    const link = document.createElement('a');
    link.href = project.url;
    link.textContent = 'View Details';
    projectCard.appendChild(link);
    // Append the new element to the document
    container.appendChild(projectCard);

}

function loadLocalStorage() {
    if(projectsLoaded) {

        const reload = confirm('Are you sure you want to reload the projects? This will append the loaded projects to the existing ones.');
        if(!reload) return;

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
    if(projectsLoaded) {

        const reload = confirm('Are you sure you want to reload the projects? This will append the loaded projects to the existing ones.');
        if(!reload) return;

    }
    const response = await fetch('https://api.jsonbin.io/v3/b/67d7a2758960c979a573088b');
    const projects = (await response.json()).record.projects;
    const container = document.querySelector('#projects-container');
    projects.forEach(project => createProject(project, container));
    projectsLoaded = true;
}

// On page load, fetch the projects and create a card for each
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