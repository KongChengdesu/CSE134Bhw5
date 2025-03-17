function createProject(project, container) {

    // Create a new element <project-card>
    const projectCard = document.createElement('project-card');
    // Populate with <h2>Project Name</h2>
    const title = document.createElement('h2');
    title.textContent = project.name;
    projectCard.appendChild(title);
    // Populate with <picture><img src="project.image" alt="project.name"></picture>
    const picture = document.createElement('picture');
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.name;
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

// On page load, fetch the projects and create a card for each
document.addEventListener('DOMContentLoaded', async () => {
    //const response = await fetch('https://api.example.com/projects');
    //const projects = await response.json();
    const projects = [
        {
            name: 'Game Development',
            image: 'project1-thumbnail.jpg',
            description: 'Development of indie titles like Talis Stand, Sweet Doll... ',
            url: 'project1-details.html'
        },
        {
            name: 'AI Chatbot',
            image: 'project2-thumbnail.jpg',
            description: 'Natural Language Processing chatbot built with OpenAI...',
            url: 'project1-details.html'
        },
        {
            name: 'Discord Auto Admin',
            image: 'project3-thumbnail.jpg',
            description: 'Discord app that provides several admin functions and fun minigames...',
            url: 'project1-details.html'
        }
    ];

    const container = document.querySelector('#projects-container');
    console.log(projects);
    projects.forEach(project => createProject(project, container));

});