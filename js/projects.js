// Array de proyectos (por ahora estático)
const projects = [
  {
    name: "42 Libft",
    description: "Tu propia librería en C, base de los proyectos de 42.",
    technologies: ["C", "Makefile"],
    github: "https://github.com/anazubieta/libft"
  },
  {
    name: "Data Cleaning en Python",
    description: "Proyecto de ciencia de datos donde se limpian datasets con pandas y numpy.",
    technologies: ["Python", "Pandas", "NumPy"],
    github: "https://github.com/anazubieta/data-cleaning"
  },
  {
    name: "Portfolio Web",
    description: "Tu propio portfolio hecho en HTML, Tailwind y JS puro.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/anazubieta/portfolio"
  }
];

// Seleccionamos el contenedor
const container = document.getElementById('projects-container');

// Generamos el HTML dinámicamente
projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 
    'group bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105';

  // Creamos contenido de la tarjeta
  card.innerHTML = `
    <h2 class="text-2xl font-semibold mb-2">${project.name}</h2>
    
    <p class="text-gray-700 mb-4 line-clamp-2 transition-all duration-300 group-hover:line-clamp-none">
        ${project.description}
    </p>

    <div class="flex flex-wrap gap-2 mb-4">
        ${project.technologies.map(tech => `<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">${tech}</span>`).join('')}
    </div>

    <a href="${project.github}" target="_blank" class="text-blue-500 hover:text-blue-700 font-medium">See on GitHub →</a>
  `;

  // Agregamos al contenedor DOM
  container.appendChild(card);
});
