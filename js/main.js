// Aquí pondremos animaciones y funciones generales más adelante


//Animación fade-in para la sección Home
window.addEventListener('DOMContentLoaded', () => {
    const elements = [
        document.getElementById('home-title'),
        document.getElementById('home-text'),
        document.getElementById('home-button')
    ];

    elements.forEach((el, index) => {
        // Agregamos un retraso progresivo para cada elemento
        setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-6');
            el.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-700', 'ease-out');
        }, index * 300); // 0ms, 300ms, 600ms...
    });
});

