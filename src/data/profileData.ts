export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  default_branch: string;
}

export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  clientOrProject: string;
  period: string;
  location: string;
  category: "support-infra" | "fullstack" | "hardware-sales";
  categoryLabel: string;
  status?: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  domain:
    | "Desarrollo Fullstack"
    | "Redes e Infraestructura"
    | "Ciberseguridad"
    | "Ciencia de Datos"
    | "Hardware y Soporte";
  skills: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  categoryName: string;
  accent: "purple" | "blue" | "cyan";
  skills: {
    name: string;
    level: number;
    tag: string;
  }[];
}

export const PROFILE_DATA = {
  name: "Juan Sebastián Tamayo Toro",
  shortName: "JSTT",
  githubUsername: "Jotechno",
  title: "Desarrollador de Software Fullstack y Especialista en Soporte TI",
  tagline:
    "Ingeniería de software escalable combinada con operación crítica de infraestructura, ciberseguridad y administración de identidades corporativas bajo estándares empresariales.",
  location: "Caldas y Medellín, Antioquia — Colombia",
  phone: "(+57) 301-3567242",
  phoneClean: "573013567242",
  email: "jstamayotoro@hotmail.com",
  github: "https://github.com/Jotechno",
  githubDisplay: "github.com/Jotechno",
  linkedin: "https://www.linkedin.com/in/juanstam",
  linkedinDisplay: "linkedin.com/in/juanstam",
  cvUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-JSTT.pdf`,
  availability: "Disponible para Desarrollo Fullstack, Infraestructura y Soporte TI",
  languages: [
    {
      name: "Español",
      level: "Nativo",
      detail: "Comunicación ejecutiva, documentación ITIL y pedagogía técnica",
    },
    {
      name: "Inglés",
      level: "Avanzado (Escucha y lectura avanzadas · Habla intermedia)",
      detail:
        "Comprensión fluida de documentación técnica, entornos corporativos y conversación profesional",
    },
  ],
  aboutParagraphs: [
    "Soy un profesional híbrido donde convergen el Desarrollo de Software Fullstack (Angular, Node.js, NestJS, Python, Java, PostgreSQL y MongoDB) y la Ingeniería de Soporte Técnico Corporativo de Nivel 1 y Nivel 2. Esta combinación me permite diseñar aplicaciones escalables entendiendo al mismo tiempo cómo operan los sistemas reales en producción: redes, máquinas virtuales, Active Directory, permisos corporativos y puntos de venta críticos.",
    "He desarrollado plataformas empresariales con geolocalización en tiempo real (Leaflet, OpenStreetMap, OSRM y Google Maps API), sistemas de fidelización y software administrativo que eliminaron la dependencia del papel, además de gestionar soporte e infraestructura tecnológica bajo estrictos Acuerdos de Nivel de Servicio (ANS) para grandes compañías del sector agroindustrial y bancario.",
    "Me destaco por la comunicación asertiva, la pedagogía técnica y la inteligencia emocional bajo presión: transformo incidentes complejos o requerimientos exigentes en soluciones claras, seguras y orientadas a la excelencia en el servicio.",
  ],
  heroStats: [
    {
      category: "Experiencia",
      value: "5+ Años",
      label: "Trayectoria combinada en desarrollo de software y tecnología",
    },
    {
      category: "Soporte TI",
      value: "Nivel 1 y 2",
      label: "Infraestructura corporativa, identidades y cumplimiento de ANS",
    },
    {
      category: "Stacks y Tecnología",
      value: "Fullstack",
      label: "Angular, Node.js, NestJS, Python, Java, PostgreSQL y MongoDB",
    },
    {
      category: "Certificados",
      value: "7 Títulos",
      label: "Formación verificada en SENA, CISCO Networking Academy y UDEMY",
    },
  ],
  pillars: [
    {
      id: "fullstack",
      badge: "Especialidad 01",
      title: "Desarrollo de Software y Datos",
      subtitle: "Arquitectura Web, APIs y Geolocalización",
      description:
        "Construcción de aplicaciones web y móviles robustas con Angular, Node.js, NestJS, PostgreSQL y MongoDB. Integración de mapas interactivos (Leaflet, OpenStreetMap, OSRM) y paneles analíticos en tiempo real.",
      tags: ["Angular", "Node.js", "NestJS", "PostgreSQL", "MongoDB", "Geolocalización"],
      accent: "purple",
    },
    {
      id: "infra",
      badge: "Especialidad 02",
      title: "Infraestructura e Identidades TI",
      subtitle: "Active Directory, Google Workspace y Virtualización",
      description:
        "Administración de identidades y accesos corporativos (Active Directory, permisos NTFS, autenticación 2FA/MFA), gestión integral de Google Workspace, soporte en SAP, máquinas virtuales y redes compartidas.",
      tags: ["Active Directory", "Google Workspace", "SAP", "Máquinas Virtuales", "Seguridad 2FA", "ITIL"],
      accent: "blue",
    },
    {
      id: "ops",
      badge: "Especialidad 03",
      title: "Continuidad Operativa y Hardware",
      subtitle: "Soporte Nivel 2, Sistemas POS y Diagnóstico Avanzado",
      description:
        "Soporte integral a puntos de venta (SMS-PRO / Fazenda), sincronización de facturación electrónica DIAN, diagnóstico profundo de hardware Dell (BIOS UEFI / ePSA), periféricos en red y acompañamiento humano al usuario.",
      tags: ["Sistemas POS y DIAN", "Diagnóstico UEFI", "Redes CISCO", "Ciberseguridad", "Acuerdos ANS", "AnyDesk"],
      accent: "cyan",
    },
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "dev",
    title: "Desarrollo de Software y Bases de Datos",
    subtitle: "Ingeniería Fullstack, APIs y Sistemas Geoespaciales",
    categoryName: "Ingeniería de Software",
    accent: "purple",
    skills: [
      { name: "Node.js y NestJS (Arquitectura Backend)", level: 92, tag: "Backend" },
      { name: "Angular y TypeScript (Aplicaciones y Paneles Web)", level: 90, tag: "Frontend" },
      { name: "PostgreSQL y MongoDB (Bases de Datos SQL y NoSQL)", level: 88, tag: "Datos" },
      { name: "Leaflet, OpenStreetMap, Google Maps API y OSRM", level: 90, tag: "Geolocalización" },
      { name: "Python y Java (Desarrollo Multilenguaje)", level: 82, tag: "Lenguajes" },
      { name: "Aplicaciones Móviles y Despliegue en Nube / Local", level: 84, tag: "Móvil y Cloud" },
    ],
  },
  {
    id: "infra",
    title: "Infraestructura Corporativa, Redes y Soporte TI",
    subtitle: "Directorio Activo, Plataformas Cloud y Seguridad",
    categoryName: "Soporte e Infraestructura",
    accent: "blue",
    skills: [
      { name: "Active Directory (Identidades, Cuentas, Grupos y NTFS)", level: 95, tag: "Identidades" },
      { name: "Google Workspace (Licencias, 2FA, Drive y Grupos)", level: 94, tag: "Administración Cloud" },
      { name: "Sistemas POS (SMS-PRO, Facturación DIAN y Puertos COM)", level: 93, tag: "Operación POS" },
      { name: "Máquinas Virtuales, SAP Básico y Red Compartida Pandora", level: 86, tag: "Infraestructura" },
      { name: "Redes CISCO, Conectividad Corporativa y Ciberseguridad", level: 88, tag: "Redes y Seguridad" },
      { name: "Gestión de Incidentes bajo ITIL y Cumplimiento de ANS", level: 96, tag: "Calidad de Servicio" },
    ],
  },
  {
    id: "hardware",
    title: "Hardware, Diagnóstico y Competencias Profesionales",
    subtitle: "Mantenimiento Físico, Periféricos y Liderazgo de Servicio",
    categoryName: "Hardware y Servicio",
    accent: "cyan",
    skills: [
      { name: "Diagnóstico Físico, BIOS UEFI y Herramienta Dell ePSA", level: 94, tag: "Diagnóstico" },
      { name: "Mantenimiento de Computadores, Portátiles y Consolas", level: 95, tag: "Hardware" },
      { name: "Impresoras y Escáneres por Red SMB / USB y Biométricos", level: 92, tag: "Periféricos" },
      { name: "Comunicación Asertiva y Pedagogía Técnica bajo Presión", level: 98, tag: "Liderazgo" },
      { name: "Inteligencia Emocional en Situaciones Críticas", level: 97, tag: "Enfoque Humano" },
      { name: "Inglés Técnico Avanzado (Lectura, Escucha y Conversación)", level: 88, tag: "Idiomas" },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "henkia-n2",
    role: "Especialista de Soporte SET Nivel 2",
    company: "Henkia",
    clientOrProject: "Proyecto Agropecuaria Aliar / La Fazenda",
    period: "Junio 2026 — Presente",
    location: "Itagüí, Antioquia",
    category: "support-infra",
    categoryLabel: "Soporte Corporativo e Infraestructura Nivel 2",
    status: "Cargo Actual",
    summary:
      "Soporte microinformático de segundo nivel y administración de infraestructura corporativa bajo cumplimiento estricto de Acuerdos de Nivel de Servicio (ANS), gestionando directorios activos, plataformas cloud, puntos de venta y servidores.",
    highlights: [
      "Soporte de microinformática de segundo nivel y resolución avanzada de incidentes y requerimientos bajo cumplimiento estricto de Acuerdos de Nivel de Servicio (ANS).",
      "Administración de identidades y accesos en Active Directory: aprovisionamiento, inhabilitación, desbloqueo de cuentas en bucle, restablecimiento de credenciales, permisos NTFS y grupos de seguridad corporativos.",
      "Administración de Google Workspace: creación y baja de correos, delegación y transferencia de cuentas, asignación de licencias, políticas de verificación en 2 pasos (2FA), grupos de distribución y autorización de dispositivos en Google Drive.",
      "Soporte integral a puntos de venta (POS - SMS-PRO / Fazenda) por AnyDesk: configuración de puertos seriales COM para escáneres y lectores de barras, control de servicios de sistema (services.msc), resolución de fallas en certificación y retransmisión de facturación electrónica a la DIAN sincronizando con el servidor central.",
      "Gestión y diagnóstico de infraestructura: administración de usuarios en sistemas biométricos fotográficos, soporte básico en SAP (desbloqueo y gestión de datos), control y monitoreo de máquinas virtuales (inicio, detención e inspección de estado) y mapeo de carpetas compartidas de red (Pandora).",
      "Configuración de periféricos y diagnóstico de hardware: instalación de impresoras y escáneres por red/USB con carpetas compartidas SMB, análisis de fallas físicas y BIOS UEFI en equipos Dell (diagnóstico ePSA) y escalamiento de enlaces de conectividad con áreas internas.",
    ],
    metrics: [
      { label: "Nivel de Atención", value: "Segundo Nivel (N2)" },
      { label: "Plataformas de Identidad", value: "Active Directory y Workspace" },
      { label: "Continuidad Comercial", value: "POS y Facturación DIAN" },
    ],
    stack: [
      "Active Directory",
      "Google Workspace",
      "SAP",
      "POS SMS-PRO",
      "Facturación DIAN",
      "Máquinas Virtuales",
      "Permisos NTFS y SMB",
      "Dell ePSA / UEFI",
      "AnyDesk",
    ],
  },
  {
    id: "henkia-ibm-n1",
    role: "Especialista de Soporte SET Nivel 1",
    company: "Henkia / IBM",
    clientOrProject: "Proyecto Banco Davivienda",
    period: "Noviembre 2025 — Mayo 2026",
    location: "Itagüí, Antioquia",
    category: "support-infra",
    categoryLabel: "Soporte Corporativo Bancario e ITIL",
    summary:
      "Resolución de incidentes tecnológicos en entorno financiero de alta exigencia, administración de accesos multifactor, configuración de perfiles móviles y documentación estandarizada bajo lineamientos ITIL.",
    highlights: [
      "Resolución de problemas de microinformática en primer nivel mediante ejecución de comandos de red, actualización de políticas y depuración de navegadores para restablecer el acceso a aplicaciones corporativas bancarias.",
      "Asesoramiento técnico personalizado y en vivo a través de pantalla compartida, guiando al usuario con paciencia en la solución de fallas de software, configuración de estaciones de trabajo y solicitudes de acceso.",
      "Asesoramiento en gestión de usuarios, identidades y accesos, administrando roles, perfiles, vinculación de autenticadores MFA y configuración de perfiles de trabajo en dispositivos móviles.",
      "Configuración y redireccionamiento de periféricos de impresión, realizando escalamientos oportunos hacia áreas físicas o niveles superiores cuando la complejidad del caso superaba la resolución en primer contacto (FCR).",
      "Aplicación rigurosa de lineamientos basados en ITIL para la documentación, categorización y seguimiento de casos en la plataforma de gestión de tickets.",
    ],
    metrics: [
      { label: "Sector Empresarial", value: "Banca (IBM / Davivienda)" },
      { label: "Marco de Trabajo", value: "Prácticas ITIL" },
      { label: "Seguridad de Acceso", value: "Autenticación MFA y Móvil" },
    ],
    stack: [
      "Marco ITIL",
      "Gestión de Identidades",
      "Autenticadores MFA",
      "Diagnóstico de Red",
      "Perfiles Móviles",
      "Soporte Remoto en Vivo",
    ],
  },
  {
    id: "aroma-cafe-fullstack",
    role: "Desarrollador Fullstack — Proyecto Encafeina2",
    company: "Aroma Café",
    clientOrProject: "Plataforma de Geolocalización, Fidelización y Analítica",
    period: "Abril 2024 — Octubre 2024",
    location: "Sabaneta, Antioquia",
    category: "fullstack",
    categoryLabel: "Desarrollo de Software Fullstack",
    summary:
      "Diseño y construcción de un sistema empresarial de rutas geoespaciales en tiempo real, plataforma de recompensas por códigos únicos y paneles ejecutivos de métricas.",
    highlights: [
      "Desarrollo e implementación de un sistema de geolocalización con Leaflet, OpenStreetMap (OSM) y Google Maps API, permitiendo la visualización de rutas en tiempo real y la interacción dinámica con mapas.",
      "Creación de una plataforma de fidelización y recompensas que permite a los clientes acumular puntos mediante códigos únicos, asegurando su generación, validación y canje con un backend eficiente en Node.js, NestJS y MongoDB.",
      "Diseño e implementación de paneles de control en Angular, proporcionando métricas detalladas en tiempo real para tiendas y administradores, incluyendo seguimiento de clientes, códigos utilizados y desempeño por cafetería.",
      "Optimización del backend con Node.js y OSRM (Open Source Routing Machine), garantizando escalabilidad, seguridad y eficiencia en la gestión de datos y rutas geoespaciales.",
      "Implementación de un sistema de análisis avanzado integrando reportes dinámicos y rankings con Angular para facilitar la toma de decisiones estratégicas en tiempo real.",
    ],
    metrics: [
      { label: "Tecnología de Mapas", value: "Leaflet, OSM y OSRM" },
      { label: "Arquitectura Backend", value: "Node.js, NestJS y MongoDB" },
      { label: "Visualización de Datos", value: "Paneles Angular en Vivo" },
    ],
    stack: [
      "Angular",
      "Node.js",
      "NestJS",
      "MongoDB",
      "Leaflet",
      "OpenStreetMap",
      "Google Maps API",
      "OSRM",
      "TypeScript",
    ],
  },
  {
    id: "monvel-fullstack",
    role: "Desarrollador Fullstack — Proyecto CosmeTIC",
    company: "Distribuidora Monvel",
    clientOrProject: "Software Administrativo y Aplicativo Móvil de Inventario",
    period: "Agosto 2022 — Marzo 2024",
    location: "Medellín, Antioquia",
    category: "fullstack",
    categoryLabel: "Desarrollo de Software Fullstack",
    summary:
      "Digitalización integral de procesos administrativos, financieros y de inventario mediante una plataforma web en Angular y Node.js con PostgreSQL y una aplicación móvil.",
    highlights: [
      "Desarrollo de un software administrativo con módulos enfocados en proveedores, pagos y comisiones, utilizando Angular para el Frontend y Node.js para el Backend.",
      "Eliminación de la dependencia de hojas de cálculo y documentos en papel, mejorando de forma sustancial la eficiencia y el control operativo.",
      "Uso de PostgreSQL para el almacenamiento relacional, optimizando funciones y consultas para responder ante altos volúmenes de información.",
      "Despliegue de la aplicación tanto de forma local como en la nube para asegurar la disponibilidad y respaldo de los datos.",
      "Desarrollo de un aplicativo móvil complementario dedicado a la gestión y control de stock de productos.",
    ],
    metrics: [
      { label: "Impacto Operativo", value: "Cero Papel y Hojas de Cálculo" },
      { label: "Stack Principal", value: "Angular, Node.js y PostgreSQL" },
      { label: "Infraestructura", value: "Despliegue Local y en Nube" },
    ],
    stack: [
      "Angular",
      "Node.js",
      "PostgreSQL",
      "Aplicación Móvil",
      "Despliegue en Nube",
      "APIs REST",
      "TypeScript",
    ],
  },
  {
    id: "juegos-fantasia",
    role: "Ventas y Soporte Técnico",
    company: "Juegos de Fantasía",
    clientOrProject: "Mantenimiento de Equipos, Consolas y Asesoría Tecnológica",
    period: "Marzo 2019 — Junio 2021",
    location: "Caldas, Antioquia",
    category: "hardware-sales",
    categoryLabel: "Soporte de Hardware y Gestión Comercial",
    summary:
      "Mantenimiento preventivo y diagnóstico de portátiles y consolas de videojuegos, atención técnica de primera línea y asesoría comercial personalizada.",
    highlights: [
      "Mantenimiento y diagnóstico básico de portátiles y consolas de videojuegos (limpieza interna y externa, verificación de componentes), reduciendo tiempos de inactividad.",
      "Gestión de venta de videojuegos, consolas y accesorios tecnológicos brindando asesoría personalizada para elevar la experiencia del cliente.",
      "Asignación y supervisión operativa de estaciones de juego y periféricos.",
      "Atención al cliente de primera línea resolviendo inquietudes técnicas y aportando a la organización de inventario y exhibición.",
    ],
    metrics: [
      { label: "Equipos Atendidos", value: "Portátiles y Consolas" },
      { label: "Rol Integral", value: "Soporte Técnico y Ventas" },
      { label: "Resultado", value: "Reducción de Inactividad" },
    ],
    stack: [
      "Diagnóstico de Hardware",
      "Mantenimiento Preventivo",
      "Consolas y Portátiles",
      "Periféricos",
      "Gestión de Inventario",
      "Servicio al Cliente",
    ],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "sena-adso",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    issuer: "SENA",
    date: "Octubre 2024",
    domain: "Desarrollo Fullstack",
    skills:
      "Análisis de requerimientos, diseño de arquitectura de software, desarrollo Fullstack (Frontend, Backend y Bases de Datos) y despliegue de aplicaciones.",
  },
  {
    id: "cisco-networking",
    title: "Conceptos Básicos de Redes",
    issuer: "CISCO Networking Academy",
    date: "Septiembre 2025",
    domain: "Redes e Infraestructura",
    skills:
      "Arquitectura y descripción de redes, tipos de conexiones, medios de transmisión, cableado y conectividad de dispositivos corporativos.",
  },
  {
    id: "cisco-cybersec",
    title: "Introducción a la Ciberseguridad",
    issuer: "CISCO Networking Academy",
    date: "Junio 2025",
    domain: "Ciberseguridad",
    skills:
      "Principios de ciberseguridad corporativa, identificación de tipos de ataques informáticos y estrategias de prevención y protección.",
  },
  {
    id: "udemy-corp-support",
    title: "Soporte Técnico a Computadoras en Entornos Corporativos",
    issuer: "UDEMY",
    date: "Junio 2025",
    domain: "Hardware y Soporte",
    skills:
      "Gestión de infraestructura tecnológica, planes de mantenimiento preventivo y correctivo, diagnóstico de hardware y despliegue de sistemas operativos.",
  },
  {
    id: "cisco-datascience",
    title: "Introducción a la Ciencia de Datos",
    issuer: "CISCO Networking Academy",
    date: "Noviembre 2023",
    domain: "Ciencia de Datos",
    skills:
      "Fundamentos de ciencia de datos, interpretación de información estructurada y bases para el análisis estratégico.",
  },
  {
    id: "sena-cybersec",
    title: "Apropiación de Conceptos en Ciberseguridad",
    issuer: "SENA",
    date: "Octubre 2022",
    domain: "Ciberseguridad",
    skills:
      "Encriptación de datos, resguardo de la información y fundamentos esenciales de seguridad informática.",
  },
  {
    id: "sena-hardware",
    title: "Curso Básico en Mantenimiento de Computadores",
    issuer: "SENA",
    date: "Octubre 2022",
    domain: "Hardware y Soporte",
    skills:
      "Mantenimiento preventivo, limpieza técnica especializada y verificación diagnóstica de componentes físicos de hardware.",
  },
];
