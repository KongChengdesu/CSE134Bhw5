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
    const response = await fetch('https://api.jsonbin.io/v3/b/67d7a2758960c979a573088b');
    const projects = (await response.json()).record.projects;
    console.log(projects);

    const container = document.querySelector('#projects-container');
    projects.forEach(project => createProject(project, container));

});