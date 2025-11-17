const GITHUB_USERNAME = "Ateibuzena";
const REPO_NAME = "Ateibuzena";

// --- 1️⃣ Traer README ---
async function fetchReadme() {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/readme`);
    const data = await res.json();
    return atob(data.content);
}

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
            const category = cols[0].textContent.replace(/💻|🧩|📊|🤖|🗄️|🔥|🛠️|🌐/g, "").trim();
            const skills = cols[1].textContent.split(",").map(s => s.trim());
            skillsData[category] = skills;
        }
    });
    return skillsData;
}

// --- 3️⃣ Renderizar Skills ---
async function renderSkills() {
    const container = document.getElementById("skills-container");
    const readme = await fetchReadme();
    const skillsData = parseSkillsFromReadme(readme);

    for (const category in skillsData) {
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryTitle.className = "text-2xl font-semibold text-center mb-6";
        container.appendChild(categoryTitle);

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center";

        skillsData[category].forEach(skill => {
            const card = document.createElement("div");
            card.className = "skill-card flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 opacity-0 translate-y-6 w-36";

            card.innerHTML = `
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg"
                     class="w-16 h-16 mb-3"
                     onerror="this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'"/>
                <p class="font-semibold text-center">${skill}</p>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // Animación entrada suave
    document.querySelectorAll(".skill-card").forEach((card, i) => {
        setTimeout(() => {
            card.classList.add("opacity-100", "translate-y-0");
        }, i * 80);
    });
}

// --- 4️⃣ Renderizar Acerca de + LinkedIn ---
function renderLinkedInInfo() {
    const container = document.getElementById("linkedin-info");
    container.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
            class="w-36 h-36 rounded-full mx-auto mb-4"
            alt="Foto Ana Zubieta"
            onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"/>

        <h1 class="text-3xl font-bold">Ana Zubieta</h1>
        <p class="text-gray-600 text-lg font-medium">Científica de Datos | Machine Learning & AI Engineer</p>
        <p class="text-gray-500 max-w-2xl mx-auto mt-4">
          Soy Científica de Datos con experiencia en Machine Learning, Inteligencia Artificial y desarrollo de software. 
          Combino análisis de datos y modelado para diseñar soluciones que generen valor real.<br><br>
          Me apasiona colaborar en proyectos que exploren el potencial de la inteligencia artificial y los datos, 
          aportando una mentalidad orientada al aprendizaje continuo y al trabajo en equipo.
        </p>
        <div class="flex justify-center space-x-6 mt-6">
            <a href="https://www.linkedin.com/in/ana-zubieta/" target="_blank" class="text-blue-600 font-semibold hover:underline">LinkedIn</a>
            <a href="https://github.com/Ateibuzena" target="_blank" class="text-gray-800 font-semibold hover:underline">GitHub</a>
            <a href="mailto:ena.ateibuz@gmail.com" class="text-red-600 font-semibold hover:underline">Email</a>
        </div>
    `;
}

// --- 5️⃣ Ejecutar todo ---
renderLinkedInInfo();
renderSkills();
