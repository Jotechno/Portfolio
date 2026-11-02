# Portfolio - Juan Sebastian Tamayo Toro

Plataforma web profesional orientada a ingenieria de software Fullstack, soporte TI corporativo N1/N2 y gestion de infraestructura. Este proyecto corresponde a un Producto Minimo Viable (MVP) en evolucion activa, disenado bajo estandares de arquitectura limpia, modularidad y compatibilidad con exportacion estatica.

## Stack Tecnologico

- Framework: Next.js 15 (App Router, static export mode)
- Lenguaje: TypeScript 5
- Libreria UI: React 19
- Estilos: Tailwind CSS 3 y PostCSS
- Integracion IA: Google GenAI SDK (@google/genai) con Gemini
- Iconografia: Lucide React

## Caracteristicas Principales

- Perfil profesional centralizado como fuente unica de verdad (SSOT).
- Desglose cronologico de experiencia laboral en soporte corporativo N1/N2 y desarrollo Fullstack.
- Portafolio dinamico integrado con la API publica de GitHub para consultar repositorios en tiempo real con fallback resiliente.
- Matriz filtrable de certificaciones tecnicas (SENA, CISCO Networking Academy, UDEMY).
- Componente de Gemelo Digital interactivo alimentado con Gemini API para atencion automatizada sobre el perfil.
- Compatibilidad nativa para despliegue estatico en GitHub Pages bajo el subdirectorio `/Portfolio`.

## Requisitos Previos

- Node.js v18.18.0 o superior (recomendado Node.js 20+ LTS).
- Gestor de paquetes npm.

## Instalacion y Ejecucion Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Jotechno/Portfolio.git
   cd Portfolio
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno (opcional para el asistente de IA local):
   Crear un archivo `.env` en la raiz con:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Acceder a `http://localhost:3000/Portfolio` (o el puerto asignado en consola).

5. Generar la compilacion y exportacion estatica:
   ```bash
   npm run build
   ```
   Los artefactos estaticos finales se generaran en la carpeta `out/`.

## Despliegue en GitHub Pages

El proyecto esta preconfigurado en `next.config.mjs` con `output: 'export'` y `basePath: '/Portfolio'`. La publicacion se gestiona a traves de la rama `gh-pages` con el contenido del directorio `out/` o mediante flujos de GitHub Actions.

## Estado del Proyecto

MVP en desarrollo activo. Las futuras iteraciones contemplan la incorporacion de pruebas unitarias con Vitest, optimizaciones adicionales de Core Web Vitals y telemetria estructurada.

