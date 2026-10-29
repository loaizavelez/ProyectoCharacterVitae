# Character Vitae

Character Vitae es una aplicación web de tipo portfolio / currículum interactivo con una estética narrativa inspirada en aventuras, misiones y personajes. La idea del proyecto es presentar el perfil profesional, habilidades, herramientas, proyectos y logros de una persona de una manera más original y visual, simulando una especie de "hoja de personaje" o "tabla de aventurero".

En lugar de un CV tradicional plano, la plataforma propone una experiencia más inmersiva, con secciones para mostrar información personal, experiencia, proyectos destacados, herramientas utilizadas y hitos profesionales, todo con una interfaz moderna y temática de fantasía / RPG.

## Descripción del proyecto

Este proyecto está desarrollado con React y Vite, y combina una interfaz moderna con animaciones, rutas dinámicas y un enfoque visual orientado a portfolio personal.

Entre sus funcionalidades principales se destacan:

- Registro y autenticación de usuarios
- Perfil editable con información personal y profesional
- Visualización de proyectos y logros
- Secciones tipo herramientas, milestones y fichas de personaje
- Tutoriales guiados para crear herramientas e hitos, con pasos contextuales y progreso
- Navegación entre páginas con React Router
- Diseño responsive para distintos tamaños de pantalla
- Animaciones suaves y experiencias visuales con GSAP
- Integración con Firebase para almacenamiento y servicios backend

## Diagrama del proyecto

![Diagrama del proyecto](./src/assets/Diagrama%20del%20proyecto.png)


## Tecnologías y paquetes utilizados

### Dependencias principales

- `react` y `react-dom`: interfaz de usuario y renderizado de la aplicación.
- `react-router-dom`: navegación entre páginas.
- `firebase`: integración con servicios de backend de Firebase.
- `tailwindcss` y `@tailwindcss/vite`: estilos utilitarios e integración de Tailwind CSS con Vite.
- `gsap` y `@gsap/react`: animaciones y su integración con componentes React.
- `phaser`: experiencias interactivas y contenido tipo juego o canvas.
- `driver.js`: creación de guías paso a paso para elementos de la interfaz.
- `lucide-react`: iconos para la interfaz.
- `react-responsive`: detección de tamaños de pantalla para el diseño responsive.

### Dependencias de desarrollo

- `vite` y `@vitejs/plugin-react`: servidor de desarrollo, compilación e integración de React.
- `@rolldown/plugin-babel`, `@babel/core` y `babel-plugin-react-compiler`: transformación de código e integración de React Compiler.
- `eslint`, `@eslint/js`, `globals`, `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`: análisis estático y reglas para el proyecto.
- `gh-pages`: publicación en GitHub Pages.
- `@types/react` y `@types/react-dom`: tipos de React para herramientas de desarrollo.

### Tutoriales guiados con Driver.js

Las pantallas de herramientas e hitos incluyen un botón **Ver tutorial** que inicia una guía contextual. Cada paso resalta un elemento del formulario y muestra una explicación, incluyendo la vista previa, los campos que se deben completar y la acción para guardar.

Las guías muestran el progreso y ofrecen controles para avanzar, retroceder y finalizar. Al iniciar una guía por primera vez, esta se reproduce automáticamente; su estado se guarda en `localStorage` por usuario y por sección. El botón permite volver a abrirla cuando se necesite. Los pasos cuyos elementos no están visibles se omiten, por lo que la guía se adapta a la interfaz disponible. Los estilos base de Driver.js se cargan desde `driver.js/dist/driver.css`.

## Objetivo

El objetivo de Character Vitae es ofrecer una alternativa visual y creativa a la presentación tradicional de perfiles profesionales, destacando la personalidad, los proyectos y las habilidades del usuario mediante una narrativa más atractiva y memorable.
