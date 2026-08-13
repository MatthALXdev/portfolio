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
        title: "Pyx — Démo E-commerce sur Mesure",
        description: "Démonstration d'un e-commerce sur mesure : parcours d'achat complet du catalogue à la confirmation de commande, sur une interface moderne et responsive.",
        features: [
            "Catalogue de produits responsive avec filtres",
            "Pages détail produit avec images haute résolution",
            "Parcours d'achat simplifié et page de confirmation",
            "Interface admin Django pour gestion des produits",
            "Optimisation des images avec service nginx-static mutualisé"
        ],
        stack: ["Django 5.1", "PostgreSQL 16", "Docker", "Tailwind CSS", "Gunicorn", "Nginx"],
        architecture: "Une architecture pensée pour la fiabilité : la base de données est isolée du reste de l'infrastructure, les images sont servies rapidement même en forte affluence, et le site est accessible en HTTPS sécurisé par défaut.",
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
            "Connexion chiffrée (HTTPS) sur tout le site",
            "Données sensibles jamais exposées dans le code",
            "Protection contre les attaques courantes (CSRF)",
            "Base de données isolée du reste de l'infrastructure",
            "Configuration de production sécurisée",
            "Pare-feu serveur actif"
        ],
        cicd: "Chaque mise à jour est testée automatiquement avant d'être mise en ligne, pour limiter les régressions et livrer en confiance.",
        demoUrl: "https://pyx.devamalix.fr",
        githubUrl: "https://github.com/MatthALXdev/dm",
        videoWebm: "assets/demos/pyx_demo.webm",
        videoMp4: "assets/demos/pyx_demo.mp4",
        screenshotImg: "assets/screenshots/pyx.png",
        architectureImg: "assets/architecture/pyx-architecture.svg"
    },
    recontent: {
        title: "ReContent — Démo Intégration IA",
        description: "Démonstration d'intégration d'IA générative dans une application web : reformulation de contenu en temps réel via l'API Mistral AI, illustrant la mise en place de chatbots et agents IA sur mesure.",
        features: [
            "Interface React SPA responsive",
            "Reformulation intelligente via Mistral AI",
            "Validation des inputs côté client et serveur",
            "Copie rapide du résultat en un clic",
            "API Node.js avec Express"
        ],
        stack: ["React 18", "Node.js", "Express", "Mistral AI", "Docker", "Vite", "Nginx"],
        architecture: "Le frontend et l'API sont séparés et communiquent de façon sécurisée avec le service d'IA (Mistral AI), sans jamais exposer la clé d'accès.",
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
            "Connexion chiffrée (HTTPS)",
            "Clé d'accès à l'IA jamais exposée",
            "Accès à l'API restreint aux origines autorisées",
            "Contenus utilisateurs validés avant traitement",
            "Aucun secret stocké dans le code",
            "Protection contre l'injection de contenu malveillant"
        ],
        cicd: "Les fonctionnalités de l'API sont testées automatiquement à chaque évolution, pour garantir un service stable.",
        demoUrl: "https://recontent.devamalix.fr",
        githubUrl: "https://github.com/MatthALXdev/recontent",
        videoWebm: "assets/demos/recontent_demo.webm",
        videoMp4: "assets/demos/recontent_demo.mp4",
        screenshotImg: "assets/screenshots/recontent.png",
        architectureImg: "assets/architecture/recontent-architecture.svg"
    },
    feelback: {
        title: "Feelback - Questionnaire de Satisfaction",
        description: "Application de suivi de satisfaction pour les livraisons : notation en un clic et tableau de bord en temps réel. Projet réalisé en équipe de 3, où j'ai piloté la partie infrastructure (Docker, base de données, workflow Git).",
        features: [
            "Questionnaire rapide avec 3 critères notés de 1 à 5 étoiles",
            "Dashboard statistiques en temps réel avec moyennes",
            "Système d'étoiles interactives et demi-étoiles pour les moyennes",
            "Interface responsive mobile-first avec Tailwind CSS",
            "Seeder de données pour génération de jeux de test",
            "Interface admin Django pour gestion des avis"
        ],
        stack: ["Django 5.1", "Python 3.12", "MySQL 8", "Docker", "Tailwind CSS"],
        architecture: "Application conteneurisée avec une base de données isolée, développée en équipe de 3 avec un workflow Git structuré pour fiabiliser les livraisons.",
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
            "Base de données isolée du reste de l'infrastructure",
            "Données sensibles jamais exposées dans le code",
            "Protection contre les attaques courantes (CSRF)",
            "Saisies utilisateurs validées côté serveur",
            "Revue de code systématique en équipe"
        ],
        cicd: "Projet mené en équipe de 3, avec un historique Git structuré (38 commits) et des données de test générées automatiquement pour fiabiliser les développements.",
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
        description: "Plateforme de gestion pour le Festival Pateuf : programmation, actualités et carte interactive, avec une administration sécurisée. Projet personnel en développement actif.",
        features: [
            "Programme des concerts avec carte interactive Mapbox",
            "CRUD complet sur programmations, FAQ et actualités",
            "Authentification OAuth2 avec Auth0 et protection JWT",
            "CMS headless Sanity pour flexibilité du contenu",
            "Drag-and-drop pour réordonnancement des éléments",
            "Architecture serverless avec Netlify Functions"
        ],
        stack: ["Vue 3", "Vite", "Pinia", "Tailwind CSS", "Sanity CMS", "Auth0", "Netlify", "Mapbox"],
        architecture: "Architecture moderne et légère : le contenu est géré séparément de l'affichage, ce qui facilite les mises à jour, et l'accès en écriture est protégé pour les seuls administrateurs.",
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
            "Connexion sécurisée pour les administrateurs",
            "Toute modification de contenu est authentifiée",
            "Protection contre les usages abusifs de l'API",
            "En-têtes de sécurité configurés",
            "Contenu public en lecture seule, écriture protégée",
            "Sessions utilisateurs sécurisées"
        ],
        cicd: "Projet personnel en développement actif, avec un code organisé et linté pour rester maintenable sur la durée.",
        demoUrl: null,
        githubUrl: "https://github.com/MatthALXdev/Pateuf_Festival",
        videoMp4: "assets/demos/pateuf_demo.mp4",
        screenshotImg: "assets/screenshots/pateuf.png",
        architectureImg: "assets/architecture/pateuf-architecture.svg",
        isCollaborative: false
    }
};

// Whole project card click → démo live si disponible, sinon GitHub
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card-clickable').forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Ne pas interférer avec les liens/boutons internes (démo, détails, GitHub, QR...)
            if (e.target.closest('a, button')) return;
            const url = card.dataset.demoUrl || card.dataset.githubUrl;
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
});

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

// Lightbox zoom/pan state
let _lbScale = 1, _lbX = 0, _lbY = 0, _lbLastTap = 0;

function _lbApply(img) {
    img.style.transform = `translate(${_lbX}px, ${_lbY}px) scale(${_lbScale})`;
    const label = document.querySelector('.lb-zoom-level');
    if (label) label.textContent = Math.round(_lbScale * 100) + '%';
}

function _lbZoomAt(img, factor, px, py) {
    const newScale = Math.min(5, Math.max(1, _lbScale * factor));
    const f = newScale / _lbScale;
    _lbX = px + f * (_lbX - px);
    _lbY = py + f * (_lbY - py);
    _lbScale = newScale;
    if (_lbScale <= 1) { _lbScale = 1; _lbX = 0; _lbY = 0; }
    _lbApply(img);
}

// Open image lightbox
window.openImageLightbox = function(imageSrc, imageAlt) {
    let lightbox = document.getElementById('image-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-toolbar">
                <button class="lb-btn lb-btn-zoom-out" aria-label="Zoom arrière">−</button>
                <span class="lb-zoom-level">100%</span>
                <button class="lb-btn lb-btn-zoom-in" aria-label="Zoom avant">+</button>
                <button class="lb-btn lightbox-close" aria-label="Fermer">✕</button>
            </div>
            <div class="lightbox-image-container">
                <img id="lightbox-image" src="" alt="" class="lightbox-image">
            </div>
        `;
        document.body.appendChild(lightbox);

        const img = lightbox.querySelector('.lightbox-image');
        const container = lightbox.querySelector('.lightbox-image-container');

        // Toolbar buttons
        lightbox.querySelector('.lightbox-close').addEventListener('click', function(e) {
            e.stopPropagation();
            window.closeImageLightbox();
        });
        lightbox.querySelector('.lb-btn-zoom-in').addEventListener('click', function(e) {
            e.stopPropagation();
            _lbZoomAt(img, 1.5, 0, 0);
        });
        lightbox.querySelector('.lb-btn-zoom-out').addEventListener('click', function(e) {
            e.stopPropagation();
            _lbZoomAt(img, 1 / 1.5, 0, 0);
        });

        // Close on dark background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) window.closeImageLightbox();
        });

        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                window.closeImageLightbox();
            }
        });

        // Mouse wheel zoom
        container.addEventListener('wheel', function(e) {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const px = e.clientX - rect.left - rect.width / 2;
            const py = e.clientY - rect.top - rect.height / 2;
            _lbZoomAt(img, e.deltaY < 0 ? 1.15 : 1 / 1.15, px, py);
        }, { passive: false });

        // Mouse drag
        let drag = null;
        container.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            e.preventDefault();
            drag = { x: e.clientX, y: e.clientY, tx: _lbX, ty: _lbY };
            container.style.cursor = 'grabbing';
        });
        window.addEventListener('mousemove', function(e) {
            if (!drag) return;
            if (_lbScale > 1) {
                _lbX = drag.tx + e.clientX - drag.x;
                _lbY = drag.ty + e.clientY - drag.y;
                _lbApply(img);
            }
        });
        window.addEventListener('mouseup', function() {
            if (!drag) return;
            drag = null;
            container.style.cursor = '';
        });

        // Touch: pinch zoom + pan + double-tap
        let pinch = null;
        container.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (e.touches.length === 1) {
                const now = Date.now();
                if (now - _lbLastTap < 300) {
                    // Double tap: toggle zoom
                    _lbLastTap = 0;
                    if (_lbScale > 1) {
                        _lbScale = 1; _lbX = 0; _lbY = 0; _lbApply(img);
                    } else {
                        const rect = container.getBoundingClientRect();
                        const px = e.touches[0].clientX - rect.left - rect.width / 2;
                        const py = e.touches[0].clientY - rect.top - rect.height / 2;
                        _lbZoomAt(img, 2.5, px, py);
                    }
                } else {
                    _lbLastTap = now;
                    pinch = { type: 'drag', x: e.touches[0].clientX, y: e.touches[0].clientY, tx: _lbX, ty: _lbY };
                }
            } else if (e.touches.length === 2) {
                const t1 = e.touches[0], t2 = e.touches[1];
                const dx = t2.clientX - t1.clientX, dy = t2.clientY - t1.clientY;
                const rect = container.getBoundingClientRect();
                pinch = {
                    type: 'pinch',
                    dist: Math.sqrt(dx * dx + dy * dy),
                    scale: _lbScale, tx: _lbX, ty: _lbY,
                    midX: (t1.clientX + t2.clientX) / 2 - rect.left - rect.width / 2,
                    midY: (t1.clientY + t2.clientY) / 2 - rect.top - rect.height / 2
                };
            }
        }, { passive: false });

        container.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (!pinch) return;
            if (pinch.type === 'drag' && e.touches.length === 1 && _lbScale > 1) {
                _lbX = pinch.tx + e.touches[0].clientX - pinch.x;
                _lbY = pinch.ty + e.touches[0].clientY - pinch.y;
                _lbApply(img);
            } else if (pinch.type === 'pinch' && e.touches.length >= 2) {
                const t1 = e.touches[0], t2 = e.touches[1];
                const dx = t2.clientX - t1.clientX, dy = t2.clientY - t1.clientY;
                const newDist = Math.sqrt(dx * dx + dy * dy);
                const rect = container.getBoundingClientRect();
                const curMidX = (t1.clientX + t2.clientX) / 2 - rect.left - rect.width / 2;
                const curMidY = (t1.clientY + t2.clientY) / 2 - rect.top - rect.height / 2;

                _lbScale = Math.min(5, Math.max(1, pinch.scale * newDist / pinch.dist));
                const f = _lbScale / pinch.scale;
                _lbX = pinch.midX + f * (pinch.tx - pinch.midX) + (curMidX - pinch.midX);
                _lbY = pinch.midY + f * (pinch.ty - pinch.midY) + (curMidY - pinch.midY);
                if (_lbScale <= 1) { _lbScale = 1; _lbX = 0; _lbY = 0; }
                _lbApply(img);
            }
        }, { passive: false });

        container.addEventListener('touchend', function(e) {
            if (e.touches.length === 0) {
                pinch = null;
            } else if (e.touches.length === 1 && pinch?.type === 'pinch') {
                pinch = { type: 'drag', x: e.touches[0].clientX, y: e.touches[0].clientY, tx: _lbX, ty: _lbY };
            }
        }, { passive: false });
    }

    // Reset zoom and set image
    _lbScale = 1; _lbX = 0; _lbY = 0;
    const img = document.getElementById('lightbox-image');
    img.style.transform = '';
    img.src = imageSrc;
    img.alt = imageAlt;
    const label = document.querySelector('.lb-zoom-level');
    if (label) label.textContent = '100%';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close image lightbox
window.closeImageLightbox = function() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        _lbScale = 1; _lbX = 0; _lbY = 0;
        const img = document.getElementById('lightbox-image');
        if (img) img.style.transform = '';
    }
};

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
