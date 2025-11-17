// --- CONFIGURATION VARIABLES --- //
const GITHUB_USERNAME = 'Ateibuzena';

async function loadGithubProjects(params)
{
    try
    {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        
        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        
        // Filtrar proyectos si es necesario (por ejemplo, excluir forks)
        const filteredProjects = projects.filter(project => !project.fork);

        renderGithubCards(filteredProjects);
    }
    catch (error)
    {
        console.error('Error loading GitHub projects:', error);
    }
}

// --- RENDER FUNCTION --- //
function renderGithubCards(projects)
{
    const container = document.getElementById('projects-container');
    container.innerHTML = ""; // Limpiar contenido previo

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 
            "group bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105";

        // Crear contenido de la tarjeta
        card.innerHTML = `
            <h2 class="text-2xl font-semibold mb-2">${project.name}</h2>

            <p class="text-gray-700 mb-4 line-clamp-2 transition-all duration-300 group-hover:line-clamp-none">
                ${project.description || 'No description provided.'}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    ⭐ ${project.stargazers_count}
                </span>

                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    ${project.language ?? "N/A"}
                </span>
            </div>

            <a href="${project.html_url}" target="_blank"
                class="text-blue-500 hover:text-blue-700 font-medium">
                See on GitHub →
            </a>
        `;

        container.appendChild(card);
    });
}

// Cargar los proyectos al cargar la página

loadGithubProjects();