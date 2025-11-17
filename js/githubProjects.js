// --- CONFIGURATION VARIABLES --- //
const GITHUB_USERNAME = 'Ateibuzena';

let activeButtons = [];

// --- SET ATTRIBUTES FILTER FUNCTION --- //
function setAttributesFilter(language)
{   
    const buttons = document.querySelectorAll('#filters button');
    
    if (language === "All")
    {
        buttons.forEach(button =>
        {   
            button.classList.remove('bg-blue-600', 'text-white', 'border-transparent');
            if (button.textContent === "All")
            {
                if (activeButtons.includes("All"))
                {
                    activeButtons = [];
                    console.log(activeButtons);
                    return ;

                }
                else
                {   
                    activeButtons = [];
                    activeButtons.push(button.textContent);
                    button.classList.add('bg-blue-600', 'text-white', 'border-transparent');
                    console.log(activeButtons);
                    return ;
                }
            }
        });
    }
    else
    {
        if (activeButtons.includes("All"))
        {
            activeButtons = [];
        }
        if (activeButtons.includes(language))
        {
            activeButtons = activeButtons.filter(item => item !== language);
        }
        else if (!activeButtons.includes("All"))
        {
            activeButtons.push(language);
        }
    }
    console.log(activeButtons);

    buttons.forEach(button =>
    {
        if (activeButtons.includes(button.textContent))
        {
            button.classList.add('bg-blue-600', 'text-white', 'border-transparent');
        }
        else
        {
            button.classList.remove('bg-blue-600', 'text-white', 'border-transparent');
        }
    });
}

// --- FILTER CARD FUNCTION --- //
function filterCard()
{
    const cards = document.querySelectorAll('#projects-container > div');

    cards.forEach(card =>
    {
        const cardLanguage = card.getAttribute('data-language');
        
        if (activeButtons.length === 0 || activeButtons.includes("All") || activeButtons.includes(cardLanguage))
        {
            card.style.display = 'block';
        }
        else
        {
            card.style.display = 'none';
        }
    });
}

// --- CREATE FILTERS FUNCTION --- //
function createFilters(projects)
{
    const filtersContainer = document.getElementById('filters');
    filtersContainer.innerHTML = ""; // Limpiar filtros previos

    // Obtener lenguajes únicos
    const languages = ["All"];
    projects.forEach(project =>
    {
        if (project.language && !languages.includes(project.language))
        {
            languages.push(project.language);
        }
    });
    
    // Crear botones de filtro
    languages.forEach(language =>
    {
        const button = document.createElement('button');
        button.textContent = language;

        button.className =
            "px-4 py-1 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-200 transition";
    
        button.addEventListener('click', () =>
        {
            setAttributesFilter(language);
            filterCard();
        });

        filtersContainer.appendChild(button);
    }); 
}

// --- SCROLL REVEAL ANIMATION --- //
const observer = new IntersectionObserver((entries) =>
{
    entries.forEach(entry =>
    {
        if (entry.isIntersecting)
        {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
},
{
    threshold: 1.0, // Ajusta este valor según cuándo quieras que se active la animación
});

// --- RENDER FUNCTION --- //
function renderGithubCards(projects)
{
    const container = document.getElementById('projects-container');
    container.innerHTML = ""; // Limpiar contenido previo

    // Crear filtros dinámicos
    createFilters(projects);

    projects.forEach(project =>
    {
        const card = document.createElement('div');
        card.className = 
            "group bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 opacity-30 translate-y-10";

        // Añadir atributo de lenguaje para filtrado
        card.setAttribute('data-language', project.language ?? "N/A");

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

        // Animación de entrada

        /*setTimeout(() =>
        {
            card.classList.add("opacity-100", "translate-y-0");
        }, 500);*/

        observer.observe(card);
            
    });
}

// --- LOAD GITHUB PROJECTS FUNCTION --- //
async function loadGithubProjects(params)
{
    const loadingSpinner = document.getElementById("loading-spinner");
    const container = document.getElementById("projects-container");

    try
    {
        // Mostrar spinner de carga
        loadingSpinner.style.display = 'block';
        container.style.opacity = 0;

        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projects = await response.json();
        
        // Filtrar proyectos si es necesario (por ejemplo, excluir forks)
        const filteredProjects = projects.filter(project => !project.fork);

        console.log("Filtered Projects:", filteredProjects);
        renderGithubCards(filteredProjects);
    }
    catch (error)
    {
        console.error(`Error loading GitHub projects:`, error);
        loadingSpinner.innerHTML = 'Failed to load projects.';
    }
    finally
    {
        // Ocultar spinner de carga
        loadingSpinner.style.display = 'none';
        
        setTimeout(() =>
        {
            container.style.transition = 'opacity 0.6s ease';
            container.style.opacity = 1;
        }, 100); // Pequeño retraso para asegurar la transición suave
    }
    console.log("GitHub projects loaded.");
}

// Cargar los proyectos al cargar la página
loadGithubProjects();