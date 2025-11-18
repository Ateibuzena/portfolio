// --- CONFIGURATION VARIABLES --- //
const GITHUB_USERNAME = 'Ateibuzena';

let activeButtons = [];

let allRepos = [];
let filteredRepos = [];

let currentPage = 1;
const reposPerPage = 6;

// --- SET ATTRIBUTES FILTER FUNCTION --- //
function setAttributesFilter(language)
{   
    // Obtener todos los botones de filtro
    const buttons = document.querySelectorAll('#filters button');
    
    // Lógica de selección de botones
    if (language === "All") // Si se selecciona "All"
    {
        // Si "All" está activo, desactivarlo; si no, activarlo y desactivar los demás
        buttons.forEach(button =>
        {   
            button.classList.remove('bg-blue-600', 'text-white', 'border-transparent');
            if (button.textContent === "All")
            {
                if (activeButtons.includes("All")) // Si ya está activo, desactivarlo
                {
                    activeButtons = [];
                    console.log(activeButtons);
                    return ;

                }
                else // Activar "All" y desactivar los demás
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
    else // Si se selecciona un lenguaje específico
    {
        // Si "All" está activo, desactivarlo
        if (activeButtons.includes("All"))
        {
            activeButtons = [];
        }
        // Alternar el estado del botón seleccionado
        if (activeButtons.includes(language)) // Si ya está activo, desactivarlo
        {
            activeButtons = activeButtons.filter(item => item !== language);
        }
        else if (!activeButtons.includes("All")) // Evitar agregar si "All" está activo
        {
            activeButtons.push(language);
        }
    }
    console.log(activeButtons);

    // Actualizar estilos de los botones
    buttons.forEach(button =>
    {
        // Aplicar estilos según el estado activo
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
    if (activeButtons.length === 0 || activeButtons.includes("All"))
    {
        filteredRepos = [...allRepos];
    }
    else
    {
        filteredRepos = allRepos.filter(repo =>
            activeButtons.includes(repo.language)
        );
    }

    currentPage = 1;  // Reset a página 1 cuando cambias filtro
    renderPaginatedCards();
    /*// Obtener todas las tarjetas de proyecto
    const cards = document.querySelectorAll('#projects-container > div');

    // Mostrar u ocultar tarjetas según los filtros activos
    cards.forEach(card =>
    {
        const cardLanguage = card.getAttribute('data-language');
        
        if (activeButtons.length === 0 || activeButtons.includes("All") || activeButtons.includes(cardLanguage)) // Mostrar todas si no hay filtros o si "All" está activo
        {
            card.style.display = 'block';
        }
        else // Ocultar si no coincide con los filtros activos
        {
            card.style.display = 'none';
        }
    });*/
}

// --- CREATE FILTERS FUNCTION --- //
function createFilters(projects)
{
    // Obtener contenedor de filtros
    const filtersContainer = document.getElementById('filters');
    filtersContainer.innerHTML = ""; // Limpiar filtros previos

    // Obtener lenguajes únicos
    const languages = ["All"];
    projects.forEach(project =>
    {
        if (project.language && !languages.includes(project.language)) // Evitar duplicados
        {
            languages.push(project.language);
        }
    });
    
    // Crear botones de filtro
    languages.forEach(language =>
    {
        // Crear botón
        const button = document.createElement('button');
        
        // Configurar botón
        button.textContent = language;

        button.className =
            "px-4 py-1 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-200 transition";
    
        // Añadir evento de clic
        button.addEventListener('click', () =>
        {
            // Actualizar filtros activos y filtrar tarjetas
            setAttributesFilter(language);
            filterCard();
        });

        // Añadir botón al contenedor
        filtersContainer.appendChild(button);
    }); 
}

// --- SCROLL REVEAL ANIMATION --- //
const observer = new IntersectionObserver((entries) =>
{
    // Animar las tarjetas cuando entren en el viewport
    entries.forEach(entry =>
    {
        if (entry.isIntersecting) // Si la tarjeta está en el viewport
        {
            entry.target.classList.add('opacity-100', 'translate-y-0'); // Añadir clases para animar
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
},
{
    threshold: 1.0, // Ajusta este valor según cuándo quieras que se active la animación
});

async function openProjectModal(project)
{
    // Obtener modal
    const modal = document.getElementById('project-modal');
    
    // Rellenar contenido del modal
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-description').textContent = project.description || 'No description provided.';
    document.getElementById('modal-language').textContent = project.language || 'N/A';
    document.getElementById('modal-stars').textContent = project.stargazers_count;
    document.getElementById('modal-link').href = project.html_url;

    // Obtener Readme
    const readmeResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${project.name}/readme`);
    if (readmeResponse.ok)
    {
        const readmeData = await readmeResponse.json();
        const decodedContent = atob(readmeData.content);

        document.getElementById('modal-readme').innerHTML = marked.parse(decodedContent);

        // Resaltar código después de insertar el contenido
        document.querySelectorAll("#modal-readme pre code").forEach(block => {
            hljs.highlightElement(block);
        });
    }
    else
    {
        document.getElementById('modal-readme').textContent = 'No README available.';
    }
    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Añadir evento de cierre
    document.getElementById('close-modal').addEventListener('click', () =>
    {
        const modal = document.getElementById('project-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    document.getElementById('project-modal').addEventListener('click', (e) =>
    {
        if (e.target.id === 'project-modal')
        {
            document.getElementById('project-modal').classList.add('hidden');
        }
    });
}

// --- RENDER FUNCTION --- //
function renderGithubCards(projects)
{
    const container = document.getElementById('projects-container');
    container.innerHTML = ""; // Limpiar contenido previo

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

        // Agregar eventos a las tarjetas
        card.addEventListener('click', () =>
        {
            openProjectModal(project);
        });
            
    });
}

function renderPaginationButtons()
{
    const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ""; // Limpiar botones previos

    for (let i = 1; i <= totalPages; i++)
    {
        const button = document.createElement('button');
        button.textContent = i;

        button.className = `px-3 py-1 rounded border ${
            i === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-400"
        }`;

        button.addEventListener('click', () =>
        {
            currentPage = i;
            renderPaginatedCards();
        });

        paginationContainer.appendChild(button);
    }
}

function renderPaginatedCards()
{
    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;

    const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

    const reposToShow = filteredRepos.slice(startIndex, endIndex);

    renderGithubCards(reposToShow);
    renderPaginationButtons();
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

        allRepos = filteredProjects;
        filteredRepos = [...allRepos];  // al inicio no hay filtros

        createFilters(allRepos);        // generar filtros SOLO una vez
        renderPaginatedCards();

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