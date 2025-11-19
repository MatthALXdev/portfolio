/* =====================================================
   DevAlix Portfolio - JavaScript
   ===================================================== */

// Tech logos mapping
const techLogos = {
    'Django 5.1': 'assets/logos/django.svg',
    'Django 5': 'assets/logos/django.svg',
    'PostgreSQL 16': 'assets/logos/postgresql.svg',
    'Docker': 'assets/logos/docker.svg',
    'Tailwind CSS': 'assets/logos/tailwindcss.svg',
    'React 18': 'assets/logos/react.svg',
    'Node.js': 'assets/logos/nodejs.svg',
    'Mistral AI': 'assets/logos/mistralai.svg',
    'Express': 'assets/logos/nodejs.svg',
    'Vite': 'assets/logos/vite.svg',
    'Gunicorn': 'assets/logos/gunicorn.svg',
    'Nginx': 'assets/logos/nginx.svg',
    'MySQL 8': 'assets/logos/mysql.svg',
    'Python 3.12': 'assets/logos/python.svg',
    'Vue 3': 'assets/logos/vuejs.svg',
    'Vite': 'assets/logos/vite.svg',
    'Pinia': 'assets/logos/pinia.svg',
    'Sanity CMS': 'assets/logos/sanity.svg',
    'Auth0': 'assets/logos/auth0.svg',
    'Netlify': 'assets/logos/netlify.svg',
    'Mapbox': 'assets/logos/mapbox.svg'
};

// Project data
const projects = {
    pyx: {
        title: "Pyx - E-commerce Fonds d'Écran",
        description: "E-commerce de fonds d'écran numériques avec parcours utilisateur complet. Interface moderne construite avec Django 5 et Tailwind CSS.",
        features: [
            "Catalogue de produits responsive avec filtres",
            "Pages détail produit avec images haute résolution",
            "Parcours d'achat simplifié et page de confirmation",
            "Interface admin Django pour gestion des produits",
            "Optimisation des images avec service nginx-static mutualisé"
        ],
        stack: ["Django 5.1", "PostgreSQL 16", "Docker", "Tailwind CSS", "Gunicorn", "Nginx"],
        architecture: "Architecture Django classique avec base de données PostgreSQL isolée dans un réseau Docker interne. Les media files sont servis par nginx-static mutualisé pour des performances optimales. Traefik v3 gère le reverse proxy avec HTTPS automatique via Let's Encrypt.",
        architectureMermaid: `%%{init: {'theme':'base', 'themeVariables': {'fontSize':'12px'}}}%%
flowchart TD
    User([👤 Utilisateur])

    subgraph VPS["☁️ VPS OVH"]
        Traefik[🔀 Traefik<br/>Reverse Proxy<br/>HTTPS]

        subgraph PyxStack["📦 Pyx E-commerce"]
            Django[⚙️ Django 5<br/>Gunicorn WSGI]
            DB[(🗄️ PostgreSQL 16)]
        end

        NginxStatic[📁 nginx-static<br/>Fichiers Media]
    end

    User -->|Requête HTTPS| Traefik
    Traefik -->|Route /| Django
    Traefik -->|Route /media| NginxStatic
    Django -->|SQL| DB
    Django -.->|Upload fichiers| NginxStatic

    style Traefik fill:#2563eb,stroke:#1e40af,color:#fff,stroke-width:2px
    style Django fill:#092e20,stroke:#0c4b33,color:#fff,stroke-width:2px
    style DB fill:#336791,stroke:#2b5d7e,color:#fff,stroke-width:2px
    style NginxStatic fill:#009639,stroke:#00772e,color:#fff,stroke-width:2px
    style VPS fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px
    style PyxStack fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px`,
        security: [
            "HTTPS forcé (Let's Encrypt)",
            "Secrets gérés via .env (hors Git)",
            "CSRF protection activée",
            "PostgreSQL isolé (réseau Docker interne)",
            "DEBUG=False en production",
            "Firewall VPS configuré"
        ],
        cicd: "Tests automatisés avec pytest (coverage 65%). GitHub Actions exécute les tests à chaque push sur les branches main et develop.",
        demoUrl: "https://pyx.devamalix.fr",
        githubUrl: "https://github.com/MatthALXdev/dm",
        videoWebm: "assets/demos/pyx_demo.webm",
        videoMp4: "assets/demos/pyx_demo.mp4",
        screenshotImg: "assets/screenshots/pyx.png",
        architectureImg: "assets/architecture/pyx-architecture.svg"
    },
    recontent: {
        title: "ReContent - Reformulation IA",
        description: "Outil de reformulation de contenu utilisant l'API Mistral AI. Interface React moderne pour réécrire et optimiser vos textes instantanément.",
        features: [
            "Interface React SPA responsive",
            "Reformulation intelligente via Mistral AI",
            "Validation des inputs côté client et serveur",
            "Copie rapide du résultat en un clic",
            "API Node.js avec Express"
        ],
        stack: ["React 18", "Node.js", "Express", "Mistral AI", "Docker", "Vite", "Nginx"],
        architecture: "Architecture multi-conteneurs avec un frontend React servi par nginx et une API Node.js. Traefik route les requêtes selon le path (/api/recontent vers l'API). Communication sécurisée avec Mistral AI via clé API stockée dans variables d'environnement.",
        architectureMermaid: `%%{init: {'theme':'base', 'themeVariables': {'fontSize':'12px'}}}%%
flowchart TD
    User([👤 Utilisateur])

    subgraph VPS["☁️ VPS OVH"]
        Traefik[🔀 Traefik<br/>Reverse Proxy<br/>HTTPS]

        subgraph Stack["📦 ReContent App"]
            Frontend[📱 React 18<br/>SPA Frontend<br/>Nginx]
            API[⚙️ API Node.js<br/>Express Server]
        end
    end

    Mistral[🤖 Mistral AI<br/>API Externe]
    Storage[(💾 LocalStorage<br/>Navigateur)]

    User -->|Requête HTTPS| Traefik
    Traefik -->|Route /| Frontend
    Traefik -->|Route /api| API
    Frontend -->|POST /api/recontent| API
    API -->|Génération texte| Mistral
    Frontend -.->|Sauvegarde locale| Storage

    style Traefik fill:#2563eb,stroke:#1e40af,color:#fff,stroke-width:2px
    style Frontend fill:#61dafb,stroke:#21a1c4,color:#000,stroke-width:2px
    style API fill:#68a063,stroke:#4d7c4a,color:#fff,stroke-width:2px
    style Mistral fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:2px
    style Storage fill:#8b5cf6,stroke:#7c3aed,color:#fff,stroke-width:2px
    style VPS fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px
    style Stack fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px`,
        security: [
            "HTTPS forcé (Let's Encrypt)",
            "API key Mistral sécurisée (.env)",
            "CORS configuré strictement",
            "Validation des inputs (longueur, format)",
            "Pas de secrets dans Git",
            "XSS protection (React escaping)"
        ],
        cicd: "Tests automatisés avec Jest (coverage 60%). GitHub Actions exécute les tests API à chaque push. Validation de la conformité des endpoints.",
        demoUrl: "https://recontent.devamalix.fr",
        githubUrl: "https://github.com/MatthALXdev/recontent",
        videoWebm: "assets/demos/recontent_demo.webm",
        videoMp4: "assets/demos/recontent_demo.mp4",
        screenshotImg: "assets/screenshots/recontent.png",
        architectureImg: "assets/architecture/recontent-architecture.svg"
    },
    feelback: {
        title: "Feelback - Questionnaire de Satisfaction",
        description: "Application collaborative de questionnaires de satisfaction pour les livraisons. Développée en équipe de 3 dans le cadre d'un projet scolaire EPSI. Mon rôle : DevOps (Docker, MySQL, workflow Git).",
        features: [
            "Questionnaire rapide avec 3 critères notés de 1 à 5 étoiles",
            "Dashboard statistiques en temps réel avec moyennes",
            "Système d'étoiles interactives et demi-étoiles pour les moyennes",
            "Interface responsive mobile-first avec Tailwind CSS",
            "Seeder de données pour génération de jeux de test",
            "Interface admin Django pour gestion des avis"
        ],
        stack: ["Django 5.1", "Python 3.12", "MySQL 8", "Docker", "Tailwind CSS"],
        architecture: "Architecture multi-conteneurs Docker avec séparation frontend/backend. Application Django conteneurisée communiquant avec une base MySQL isolée. Workflow GitFlow avec branches dev-infra, dev-back et dev-front pour une collaboration efficace en équipe de 3 développeurs.",
        architectureMermaid: `%%{init: {'theme':'base', 'themeVariables': {'fontSize':'12px'}}}%%
flowchart TD
    User([👤 Utilisateur])

    subgraph DockerCompose["🐳 Docker Compose"]
        subgraph WebContainer["📦 Container Web"]
            Django[⚙️ Django 5.1<br/>Python 3.12]
            Templates[📄 Templates HTML<br/>Tailwind CSS]
        end

        subgraph DBContainer["📦 Container DB"]
            MySQL[(🗄️ MySQL 8.0)]
        end

        Volume[💾 mysql_data<br/>Persistance]
    end

    User -->|HTTP :8000| Django
    Django -->|ORM| MySQL
    MySQL -.->|Store| Volume
    Django --> Templates

    style Django fill:#092e20,stroke:#0c4b33,color:#fff,stroke-width:2px
    style MySQL fill:#00758f,stroke:#005f73,color:#fff,stroke-width:2px
    style Templates fill:#38bdf8,stroke:#0284c7,color:#000,stroke-width:2px
    style Volume fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:2px
    style DockerCompose fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px
    style WebContainer fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px
    style DBContainer fill:#f1f5f9,stroke:#94a3b8,stroke-width:2px`,
        security: [
            "Base de données MySQL isolée (réseau Docker interne)",
            "Secrets gérés via variables d'environnement",
            "CSRF protection Django activée",
            "Validation des inputs côté serveur (notes 1-5)",
            "Workflow GitFlow pour revue de code en équipe"
        ],
        cicd: "Projet collaboratif avec 3 développeurs et 38 commits Git. Workflow GitFlow structuré avec branches dédiées (dev-infra, dev-back, dev-front). Convention de nommage PEP 8 respectée. Seeder automatisé pour génération de données de test.",
        demoUrl: null,
        githubUrl: "https://github.com/MatthALXdev/django-feelback",
        videoMp4: "assets/demos/feelback_demo.mp4",
        screenshotImg: "assets/screenshots/feelback.png",
        architectureImg: "assets/architecture/feelback-architecture.svg",
        isCollaborative: true,
        teamSize: 3,
        myRole: "DevOps (Docker, MySQL, Git workflow)"
    },
    pateuf: {
        title: "Pateuf Festival - Gestion d'Événements",
        description: "Application web de gestion du Festival Pateuf avec architecture moderne serverless. Frontend Vue 3 connecté à un CMS headless Sanity, authentification OAuth2 via Auth0, et fonctions Netlify pour le backend.",
        features: [
            "Programme des concerts avec carte interactive Mapbox",
            "CRUD complet sur programmations, FAQ et actualités",
            "Authentification OAuth2 avec Auth0 et protection JWT",
            "CMS headless Sanity pour flexibilité du contenu",
            "Drag-and-drop pour réordonnancement des éléments",
            "Architecture serverless avec Netlify Functions"
        ],
        stack: ["Vue 3", "Vite", "Pinia", "Tailwind CSS", "Sanity CMS", "Auth0", "Netlify", "Mapbox"],
        architecture: "Architecture JAMstack moderne avec frontend Vue 3 SPA, gestion d'état centralisée via Pinia, backend serverless sur Netlify Functions. Sanity CMS comme source de données headless avec séparation lecture publique / écriture protégée par JWT.",
        architectureMermaid: `%%{init: {'theme':'base', 'themeVariables': {'fontSize':'12px'}}}%%
flowchart TD
    User([👤 Utilisateur])
    Admin([🔐 Admin])

    subgraph Frontend["📱 Vue 3 SPA"]
        Views[🖼️ Views<br/>Home / Gestion]
        Pinia[📦 Pinia Stores]
        Auth0Client[🔑 Auth0 SDK]
    end

    subgraph Netlify["⚡ Netlify Functions"]
        PublicAPI[📖 API Publique<br/>Rate Limited]
        ProtectedAPI[🔒 API Protégée<br/>JWT Verify]
    end

    subgraph External["☁️ Services Externes"]
        Sanity[(📝 Sanity CMS)]
        Auth0[🛡️ Auth0]
        Mapbox[🗺️ Mapbox GL]
    end

    User -->|HTTP| Views
    Admin -->|Login| Auth0Client
    Auth0Client -->|OAuth2| Auth0
    Views --> Pinia
    Pinia -->|Fetch| PublicAPI
    Pinia -->|Mutation + JWT| ProtectedAPI
    PublicAPI -->|Read| Sanity
    ProtectedAPI -->|Write| Sanity
    Views -->|Maps| Mapbox

    style Views fill:#42b883,stroke:#35495e,color:#fff,stroke-width:2px
    style Pinia fill:#ffd859,stroke:#d4a50c,color:#000,stroke-width:2px
    style Auth0 fill:#eb5424,stroke:#c43d12,color:#fff,stroke-width:2px
    style Sanity fill:#f03e2f,stroke:#c7321f,color:#fff,stroke-width:2px
    style Mapbox fill:#4264fb,stroke:#3451d1,color:#fff,stroke-width:2px
    style PublicAPI fill:#00c7b7,stroke:#00a89d,color:#fff,stroke-width:2px
    style ProtectedAPI fill:#00c7b7,stroke:#00a89d,color:#fff,stroke-width:2px`,
        security: [
            "Authentification OAuth2 via Auth0",
            "Protection JWT sur toutes les mutations",
            "Rate limiting sur endpoints publics",
            "CSP headers configurés",
            "Séparation lecture publique / écriture protégée",
            "Tokens sécurisés côté client"
        ],
        cicd: "Projet personnel en développement actif (v0.3.0). Architecture moderne avec 25+ fichiers modifiés incluant 10 stores Pinia harmonisés et 6 Netlify Functions sécurisées. Code organisé avec ESLint/Prettier.",
        demoUrl: null,
        githubUrl: "https://github.com/MatthALXdev/Pateuf_Festival",
        videoMp4: "assets/demos/pateuf_demo.mp4",
        screenshotImg: "assets/screenshots/pateuf.png",
        architectureImg: "assets/architecture/pateuf-architecture.svg",
        isCollaborative: false
    }
};

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Open project modal
window.openProjectModal = function(projectKey) {
    const data = projects[projectKey];
    if (!data) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('modal-project');
    if (!modal) {
        modal = createProjectModal();
        document.body.appendChild(modal);
    }

    // Populate modal content
    document.getElementById('modal-title').textContent = data.title;

    let bodyHTML = '';

    // Screenshot section with floating effect
    bodyHTML += `
        <div class="modal-screenshot-container">
            <img src="${data.screenshotImg}" alt="${data.title} screenshot" class="modal-screenshot">
        </div>
    `;

    // Collaborative badge if applicable
    if (data.isCollaborative) {
        bodyHTML += `
            <div class="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-purple-600 font-semibold">👥 Projet Collaboratif</span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">${data.teamSize} développeurs</span>
                </div>
                <p class="text-sm text-purple-800"><strong>Mon rôle :</strong> ${data.myRole}</p>
            </div>
        `;
    }

    // Description
    bodyHTML += `
        <h3 style="margin-top: 3rem;">Description</h3>
        <p>${data.description}</p>
    `;

    // Features
    bodyHTML += `
        <h3>Fonctionnalités</h3>
        <ul>
            ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
    `;

    // Stack
    bodyHTML += `
        <h3>Stack Technique</h3>
        <div class="flex flex-wrap gap-2 mb-4">
            ${data.stack.map(tech => {
                const logo = techLogos[tech];
                if (logo) {
                    return `<span class="px-3 py-1 bg-sky-light text-sunrise-blue rounded-full text-sm font-medium flex items-center gap-2">
                        <img src="${logo}" alt="" class="w-5 h-5">
                        ${tech}
                    </span>`;
                } else {
                    return `<span class="px-3 py-1 bg-sky-light text-sunrise-blue rounded-full text-sm font-medium">${tech}</span>`;
                }
            }).join('')}
        </div>
    `;

    // Architecture
    bodyHTML += `
        <h3>Architecture</h3>
        <p class="text-gray-700 mb-4">${data.architecture}</p>
        <div class="modal-architecture mb-4">
            <img src="${data.architectureImg}"
                 alt="${data.title} architecture"
                 class="architecture-img w-full h-auto rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                 data-img-src="${data.architectureImg}"
                 data-img-alt="${data.title} architecture">
            <p class="text-xs text-gray-500 mt-2 text-center md:hidden">Cliquez pour agrandir</p>
        </div>
    `;

    // Security
    bodyHTML += `
        <h3>🔒 Sécurité</h3>
        <ul class="security-list">
            ${data.security.map(item => `<li>✓ ${item}</li>`).join('')}
        </ul>
    `;

    // CI/CD
    bodyHTML += `
        <h3>🚀 Tests & CI/CD</h3>
        <p>${data.cicd}</p>
    `;

    // Links
    bodyHTML += `
        <div class="flex flex-wrap gap-3 mt-6">
            ${data.demoUrl ? `
                <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer"
                   class="px-6 py-3 bg-sunrise-blue text-white rounded-lg font-semibold hover:bg-sunrise-blue/90 transition-colors inline-block">
                    Voir la démo live →
                </a>
            ` : `
                <span class="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold inline-block cursor-not-allowed">
                    Pas de démo live (projet scolaire)
                </span>
            `}
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer"
               class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block">
                Code sur GitHub →
            </a>
        </div>
    `;

    document.getElementById('modal-body').innerHTML = bodyHTML;

    // Add click event to architecture image
    const archImg = document.querySelector('.architecture-img');
    if (archImg) {
        archImg.addEventListener('click', function() {
            window.openImageLightbox(this.dataset.imgSrc, this.dataset.imgAlt);
        });
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
window.closeModal = function() {
    const modal = document.getElementById('modal-project');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open image lightbox
window.openImageLightbox = function(imageSrc, imageAlt) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('image-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeImageLightbox()" aria-label="Fermer">✕</button>
                <div class="lightbox-image-container">
                    <img id="lightbox-image" src="" alt="" class="lightbox-image">
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeImageLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeImageLightbox();
            }
        });
    }

    // Set image
    const img = document.getElementById('lightbox-image');
    img.src = imageSrc;
    img.alt = imageAlt;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close image lightbox
window.closeImageLightbox = function() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Create modal element
function createProjectModal() {
    const modal = document.createElement('dialog');
    modal.id = 'modal-project';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2 id="modal-title"></h2>
                <button onclick="closeModal()" aria-label="Fermer">✕</button>
            </div>
            <div class="modal-body" id="modal-body"></div>
        </div>
    `;

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    return modal;
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add scroll-based animations (optional)
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe project cards
    const cards = document.querySelectorAll('.project-card, article');
    cards.forEach(card => {
        observer.observe(card);
    });
});
