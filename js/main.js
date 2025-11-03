/* =====================================================
   DevAlix Portfolio - JavaScript
   ===================================================== */

// Load Mermaid library dynamically
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = function() {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#fff',
                primaryBorderColor: '#2563eb',
                lineColor: '#64748b',
                secondaryColor: '#f59e0b',
                tertiaryColor: '#10b981'
            }
        });
    };
    document.head.appendChild(script);
})();

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
    'Nginx': 'assets/logos/nginx.svg'
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
        architectureMermaid: `flowchart LR
    User([👤 User])

    subgraph VPS["☁️ VPS OVH"]
        Traefik[🔀 Traefik<br/>HTTPS]

        subgraph PyxStack["Pyx Shop"]
            Django[⚙️ Django<br/>Gunicorn]
            DB[(🗄️ PostgreSQL)]
        end

        NginxStatic[📦 nginx-static<br/>Media]
    end

    User -->|HTTPS| Traefik
    Traefik --> Django
    Traefik --> NginxStatic
    Django --> DB
    Django -.->|Upload| NginxStatic

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
        videoWebm: "assets/demos/pyx-demo.webm",
        videoMp4: "assets/demos/pyx-demo.mp4",
        architectureImg: "assets/architecture/pyx-architecture.png"
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
        architectureMermaid: `flowchart LR
    User([👤 User])

    subgraph VPS["☁️ VPS OVH"]
        Traefik[🔀 Traefik<br/>HTTPS]

        subgraph Stack["ReContent"]
            Frontend[📱 Frontend<br/>React]
            API[⚙️ API<br/>Node.js]
        end
    end

    Mistral[🤖 Mistral AI]
    Storage[(💾 LocalStorage)]

    User -->|HTTPS| Traefik
    Traefik --> Frontend
    Traefik --> API
    Frontend -->|POST| API
    API -->|Generate| Mistral
    Frontend -.->|Save| Storage

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
        videoWebm: "assets/demos/recontent-demo.webm",
        videoMp4: "assets/demos/recontent-demo.mp4",
        architectureImg: "assets/architecture/recontent-architecture.png"
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
function openProjectModal(projectKey) {
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

    // Video section
    bodyHTML += `
        <div class="modal-video">
            <div class="bg-gradient-to-br from-sunrise-orange to-dawn-blue h-64 flex items-center justify-center rounded-lg">
                <p class="text-white text-sm opacity-75">Vidéo démo à ajouter (${data.videoWebm})</p>
            </div>
        </div>
    `;

    // Description
    bodyHTML += `
        <h3>Description</h3>
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
        <div class="modal-architecture mb-4 bg-white p-4 rounded-lg border border-gray-200">
            <pre class="mermaid" id="mermaid-${projectKey}">${data.architectureMermaid}</pre>
        </div>
        <p class="text-gray-700">${data.architecture}</p>
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
            <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer"
               class="px-6 py-3 bg-sunrise-blue text-white rounded-lg font-semibold hover:bg-sunrise-blue/90 transition-colors inline-block">
                Voir la démo live →
            </a>
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer"
               class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block">
                Code sur GitHub →
            </a>
        </div>
    `;

    document.getElementById('modal-body').innerHTML = bodyHTML;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Render Mermaid diagram after DOM insertion
    if (data.architectureMermaid) {
        // Wait for mermaid to load and render
        const renderMermaid = () => {
            if (window.mermaid) {
                setTimeout(() => {
                    window.mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                }, 100);
            } else {
                // Retry if mermaid not loaded yet
                setTimeout(renderMermaid, 100);
            }
        };
        renderMermaid();
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal-project');
    if (modal) {
        modal.classList.remove('active');
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
