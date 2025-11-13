# 1️⃣ Crear carpetas y archivos

- index.html: la página principal (Home / Intro).

- css/styles.css: estilos propios, además de Tailwind.

- js/main.js: scripts generales para animaciones, eventos, etc.

- assets/: tus imágenes, iconos, logos, etc.

# 2️⃣ Configurar Tailwind CSS

Para hacerlo rápido, vamos a usar CDN por ahora, asípuedes empezar a aprender sin configurar NodePostCSS todavía.

## En index.html:

### Head

```bash
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Ana Zubieta</title>
```

- charset="UTF-8" → asegura que se lean todos los caracteres especiales (acentos, eñes).

- viewport → hace que la página sea responsive en móviles y tablets.

- title → el título que aparece en la pestaña del navegador.

```bash
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/styles.css">
```

- Importa Tailwind para usar clases utilitarias.

- Importa tu CSS personalizado para añadir estilos extra.

### Navbar

```bash
<nav class="bg-white shadow p-4 flex justify-between items-center">
    <div class="font-bold text-xl">Ana Zubieta</div>
    <ul class="flex space-x-4">
        <li><a href="#home" class="hover:text-blue-500">Home</a></li>
        ...
    </ul>
</nav>
```

- bg-white shadow p-4 → fondo blanco, sombra ligera, padding.

- flex justify-between items-center → usa Flexbox para separar el nombre del menú.

- space-x-4 → añade espacio entre los elementos de la lista.

- hover:text-blue-500 → cambia color al pasar el mouse (interactividad).

### Home Section

```bash
<section id="home" class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
```

Home Section
<section id="home" class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">

- flex flex-col items-center justify-center → centra el contenido vertical y horizontalmente.

- h-screen → ocupa toda la altura de la ventana.

- bg-gradient-to-r from-blue-200 to-purple-300 → degradado de fondo de azul a morado

### JS

```bash
<script src="js/main.js"></script>
```

Aquí pondremos los scripts más adelante, como animaciones o interacciones. Por ahora lo dejamos vacío.

## 📍 Próximo paso: animación fade-in en Home

### Objetivo:

Que cuando abramos la página, los elementos de la sección Home (titulo, texto, botón) aparezcan suavemente con una animación de desvanecimiento y desplazamiento hacia arriba, usando JS + Tailwind.

### Esto nos sirve para:

- Aprender a manipular clases en JS

- Aprender animaciones básicas con Tailwind

- Que el portfolio ya tenga un “look profesional” desde el inicio

### 1️⃣ Ajustar el HTML

Vamos a añadir clases para ocultar inicialmente los elementos, para luego mostrarlos con animación desde JS.

En el index.html, dentro de la sección Home:

```bash
<section id="home" class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
    <h1 id="home-title" class="text-5xl font-bold mb-4 opacity-0 translate-y-6">Hola, soy Ana Zubieta</h1>
    <p id="home-text" class="text-xl opacity-0 translate-y-6">Desarrolladora en formación en 42 Málaga | Ciencia de Datos & Proyectos en C</p>
    <button id="home-button" class="mt-6 px-6 py-3 bg-blue-500 text-white rounded opacity-0 translate-y-6 hover:bg-blue-600 transition">Ver mis proyectos</button>
</section>
```
- opacity-0 → hace que el elemento sea invisible al inicio

- translate-y-6 → lo desplaza un poco hacia abajo (Tailwind clase utilitaria)

- IDs (home-title, home-text, home-button) → nos permiten seleccionarlos desde JS

### 2️⃣ Código JS para animación

En el js/main.js, agrega lo siguiente:

```bash
// Animación fade-in para la sección Home
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
```

- Espera a que el DOM esté completamente cargado antes de ejecutar la animación.

- Seleccionamos los elementos de Home que queremos animar.

- Iteramos sobre cada elemento para animarlos uno a uno.

- Creamos un delay progresivo para que aparezcan de forma secuencial: el primero al instante, el segundo después de 300ms, el tercero 600ms…

- Quitamos las clases que ocultaban y desplazaban el elemento

- Añadimos clases Tailwind para que aparezca suavemente (opacity-100 + translate-y-0)

- transition duration-700 ease-out → duración 0.7s, efecto de easing suave

Con esto, cuando abramos el index.html, veremos cómo el título, texto y botón aparecen con un fade-in progresivo.