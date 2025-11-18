const GITHUB_USERNAME = "Ateibuzena";
const REPO_NAME = "Ateibuzena";

// --- 1️⃣ Traer README ---
async function fetchReadme()
{
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/readme`);
    if (!res.ok)
    {
        return (NULL);
    }
    
    const data = await res.json();

    return (atob(data.content));
}

// --- 2️⃣ Parsear tabla de skills ---
// --- 2️⃣ Parsear tabla de skills ---
function parseSkillsFromReadme(readmeHTML) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(readmeHTML, "text/html");
    const table = doc.querySelector("table");
    const skillsData = {};

    if (!table) return skillsData;

    table.querySelectorAll("tr").forEach(row => {
        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {
            // Quitar todo lo que venga antes de la primera letra
            let category = cols[0].textContent;
            const match = category.match(/[a-zA-Z].*/); // busca desde la primera letra hasta el final
            category = match ? match[0].trim() : category.trim();

            const skills = cols[1].textContent.split(",").map(s => s.trim());
            skillsData[category] = skills;
        }
    });

    return (skillsData);
}

// --- 3️⃣ Render Skills ---
async function renderSkills()
{
    const container = document.getElementById("skills-container");
    const readme = await fetchReadme();
    const skillsData = parseSkillsFromReadme(readme);

    for (const [category, skills] of Object.entries(skillsData))
    {
        
        // Contenedor por categoría (evita que se mezclen)
        const block = document.createElement("div");
        block.className = "w-full max-w-5xl mx-auto mb-20";
        
        // Título
        const title = document.createElement("h3");
        title.className = "text-2xl font-semibold text-center mb-10";
        title.textContent = category;
        block.appendChild(title);

        // Grid responsive
        const grid = document.createElement("div");
        grid.className = `
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5
            gap-10 
            justify-items-center
        `;
        block.appendChild(grid);

        // Cards
        skills.forEach(skill => {
            const card = document.createElement("div");
            card.className = `
                skill-card 
                flex flex-col items-center 
                p-5 
                bg-white 
                rounded-2xl 
                shadow-md 
                hover:shadow-xl 
                transition 
                duration-300 
                transform 
                hover:-translate-y-1 
            `;

            card.innerHTML = `
                <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg"
                    class="w-16 h-16 mb-4"
                    onerror="this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'"
                />
                <p class="font-semibold text-center">${skill}</p>
            `;

            grid.appendChild(card);
        });

        container.appendChild(block);
    }
}

// --- 4️⃣ Renderizar Acerca de + LinkedIn ---
function renderLinkedInInfo()
{
    const container = document.getElementById("linkedin-info");
    
    // Añadimos padding directamente al contenedor
    container.classList.add("p-6");

    container.innerHTML = `
        <div class="w-full">

            <img 
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Ana Zubieta Profile Photo"
                class="w-36 h-36 rounded-full mx-auto mb-4"
                onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"
            />

            <h1 class="text-3xl font-bold text-center my-10">Ana Zubieta</h1>

            <p class="text-gray-600 text-lg font-medium text-center my-10">
                Data Scientist | Machine Learning & AI Engineer
            </p>

            <p class="text-gray-700 mt-6 leading-relaxed w-full">
                I am a Data Scientist with experience in Machine Learning, Artificial Intelligence, 
                and software development. My work focuses on combining data analysis and model engineering 
                to design solutions that create real value.<br><br>
                I enjoy collaborating on projects that explore the potential of AI and data-driven 
                decision-making, always bringing a mindset centered on continuous learning and teamwork.
            </p>

            <div class="flex justify-center space-x-6 mt-6">
                <a href="https://www.linkedin.com/in/ana-zubieta/" 
                   target="_blank"
                   class="text-blue-600 font-semibold hover:underline">
                   LinkedIn
                </a>
                <a href="https://github.com/Ateibuzena" 
                   target="_blank"
                   class="text-gray-800 font-semibold hover:underline">
                   GitHub
                </a>
                <a href="mailto:ena.ateibuz@gmail.com" 
                   class="text-red-600 font-semibold hover:underline">
                   Email
                </a>
            </div>

        </div>
    `;
}

// --- 5️⃣ Ejecutar todo ---
renderLinkedInInfo();
renderSkills();
