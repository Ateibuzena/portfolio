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

