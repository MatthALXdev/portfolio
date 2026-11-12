# 🎨 DevAlix Portfolio

[![Production](https://img.shields.io/badge/production-live-success)](https://me.devamalix.fr)
[![HTTPS](https://img.shields.io/badge/HTTPS-enabled-brightgreen)](https://me.devamalix.fr)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-proprietary-red)](LICENSE)

> Portfolio professionnel présentant mes projets fullstack en production avec tests, CI/CD et infrastructure DevOps.

---

## 🚀 Demo Live

**[https://me.devamalix.fr](https://me.devamalix.fr)**

Scannez le QR code (desktop uniquement) :

<div align="center">
  <img src="assets/qr/portfolio-qr.png" alt="QR Code Portfolio" width="150"/>
</div>

---

## 📸 Screenshots

### Desktop View
![Hero Section](assets/screenshots/hero-desktop.png)
*Hero section avec gradient sunrise et présentation*

![Projects Section](assets/screenshots/projects-desktop.png)
*Cards projets avec vidéos démo et QR codes*

### Mobile View
![Mobile Hero](assets/screenshots/hero-mobile.png)
*Version responsive mobile-first*

---

## ✨ Fonctionnalités

### Navigation & Interface
- ✅ Navigation sticky avec menu responsive
- ✅ Hero section avec gradient "Sunrise" (#E67451 → #5B8DBE)
- ✅ Design system cohérent et moderne
- ✅ Animations scroll reveal
- ✅ Responsive mobile-first (breakpoints 768px / 1024px)

### Projets Showcase
- ✅ **3 cards projets** : Pyx, ReContent, Infrastructure
- ✅ Vidéos démo (autoplay, loop, optimisées WebM + MP4)
- ✅ **QR codes** visibles desktop, cachés mobile
- ✅ Modals détails projets (3 niveaux)
  - Niveau 1 : Cards cliquables
  - Niveau 2 : Modal projet (features, stack, architecture)
  - Niveau 3 : Modal architecture complète

### Contenu
- ✅ Timeline parcours professionnel (6 étapes)
- ✅ Section compétences (4 catégories)
- ✅ Modal lettre de motivation
- ✅ CV téléchargeable (PDF)
- ✅ Liens sociaux (GitHub, LinkedIn, Email)

---

## 🛠️ Stack Technique

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés + animations
- **JavaScript ES6+** - Logique interactive
- **Tailwind CSS** (CDN) - Design system utility-first

### Infrastructure
- **Docker** - Conteneurisation
- **Nginx Alpine** - Serveur web léger
- **Traefik v3** - Reverse proxy HTTPS
- **Let's Encrypt** - Certificats SSL automatiques

### DevOps
- **Docker Compose** - Orchestration multi-environnements
- **Git/GitHub** - Versionnement
- **VPS Ubuntu 22.04** - Hébergement production

---

## 📁 Structure du Projet

```
portfolio/
├── index.html              # Page principale
├── README.md              # Documentation (vous êtes ici)
│
├── css/
│   └── style.css          # Styles personnalisés
│
├── js/
│   └── main.js            # Logique JavaScript
│
├── assets/
│   ├── demos/             # Vidéos démo projets (.webm + .mp4)
│   ├── qr/                # QR codes (desktop only)
│   ├── architecture/      # Schémas infrastructure
│   ├── screenshots/       # Captures d'écran
│   ├── photo-matthieu.jpg # Photo profil
│   └── cv-matthieu-alix.pdf # CV téléchargeable
│
├── docs/                  # 📚 Documentation centralisée
│   ├── DESIGN_SYSTEM.md   # Spécifications design complètes
│   ├── ARCHITECTURE.md    # Architecture technique
│   ├── DEPLOYMENT.md      # Guide déploiement
│   └── CONTRIBUTING.md    # Guide contribution
│
├── docker-compose.yml     # Config production (VPS)
├── docker-compose.dev.yml # Config développement local
├── Dockerfile             # Image nginx
└── nginx.conf             # Configuration nginx
```

---

## 🎨 Design System "Sunrise"

### Palette de Couleurs

```css
--sunrise-orange: #E67451    /* CTA, accents, hover */
--sunrise-blue: #2B4C7E      /* Titres, structure, footer */
--dawn-blue: #5B8DBE         /* Secondaire, liens */
--sky-light: #E8F1F8         /* Backgrounds clairs */

--pyxalix: #D67D3E           /* Orange doré (projet Pyx) */
--recontent: #4A90C9         /* Bleu ciel (projet ReContent) */
--success: #10b981           /* Tests passing, validations */
```

### Gradient Principal

```css
background: linear-gradient(135deg, #E67451 0%, #5B8DBE 100%);
```

### Typographie

- **Police** : Inter (Google Fonts)
- **Hero nom** : 3-4rem (mobile → desktop)
- **Titres sections** : 2.5rem
- **Corps de texte** : 1rem

> 📖 **Specs complètes** : Voir [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)

---

## 🚢 Déploiement

### Prérequis

- Docker & Docker Compose installés
- Traefik v3 configuré (pour production)
- DNS configuré (pour production HTTPS)

### Développement Local

```bash
# Servir avec Python (test rapide)
python3 -m http.server 8080
# Accès: http://localhost:8080

# OU avec Docker Compose
docker compose -f docker-compose.dev.yml up -d
# Accès: http://localhost:8080
```

### Production (VPS avec Traefik)

```bash
# Cloner le repository
git clone git@github.com:MatthALXdev/portfolio.git
cd portfolio

# Déployer avec Docker Compose
docker compose up -d

# Vérifier le déploiement
curl -I https://me.devamalix.fr
```

**Configuration DNS** :
```
Type: A
Nom: me
Cible: [IP_VPS]
TTL: 300
```

**Labels Traefik (docker-compose.yml)** :
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.portfolio.rule=Host(`me.devamalix.fr`)"
  - "traefik.http.routers.portfolio.entrypoints=websecure"
  - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"
  - "traefik.http.services.portfolio.loadbalancer.server.port=80"
```

> 📖 **Guide détaillé** : Voir [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🔧 Développement

### Modifier le Contenu

1. **Textes & Contenu** : Éditer `index.html`
2. **Styles** : Éditer `css/style.css`
3. **Logique** : Éditer `js/main.js`
4. **Assets** : Ajouter dans `assets/`

### Tester en Local

```bash
# Méthode 1 : Python simple
python3 -m http.server 8080

# Méthode 2 : Docker
docker compose -f docker-compose.dev.yml up --build

# Méthode 3 : Live Server (VSCode extension)
# Clic droit sur index.html → "Open with Live Server"
```

### Optimiser les Assets

```bash
# Optimiser les vidéos
ffmpeg -i demo.mp4 -c:v libvpx-vp9 -b:v 500k -an demo.webm
ffmpeg -i demo.mp4 -vcodec h264 -b:v 500k -an demo-optimized.mp4

# Optimiser les images
# Utiliser: https://tinypng.com/ ou ImageOptim
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Spécifications design complètes (couleurs, typographie, composants) |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture technique et infrastructure |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Guide de déploiement (dev, staging, prod) |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Guide de contribution et conventions |

---

## 🎯 Projets Présentés

### 1. **Pyx** - E-commerce de Fonds d'Écran

- **URL** : [https://pyx.devamalix.fr](https://pyx.devamalix.fr)
- **Stack** : Django 5, PostgreSQL 16, Docker, Tailwind CSS
- **Features** : Catalogue responsive, paiement Stripe, téléchargements sécurisés
- **Tests** : pytest, coverage 65%
- **CI/CD** : GitHub Actions
- **Repo** : [github.com/MatthALXdev/dm](https://github.com/MatthALXdev/dm)

### 2. **ReContent** - Reformulation IA

- **URL** : [https://recontent.devamalix.fr](https://recontent.devamalix.fr)
- **Stack** : React 19, Node.js, Mistral AI, Docker
- **Features** : SPA React, API REST, reformulation multi-plateformes
- **Tests** : Jest + Vitest, coverage 60%
- **CI/CD** : GitHub Actions
- **Repo** : [github.com/MatthALXdev/recontent](https://github.com/MatthALXdev/recontent)

### 3. **Infrastructure Mutualisée**

- **Services** : Traefik v3, nginx-static, monitoring
- **Sécurité** : Firewall, HTTPS auto, SSH keys, secrets management
- **Monitoring** : Uptime Kuma, Dozzle, MailHog
- **Repo** : Privé (configurations sensibles)

---

## 🔒 Sécurité

### Mesures Appliquées

- ✅ **HTTPS forcé** via Let's Encrypt
- ✅ **Firewall VPS** (ports 22, 80, 443 uniquement)
- ✅ **Nginx Alpine** (image officielle minimale)
- ✅ **Headers sécurité** configurés
- ✅ **Pas de secrets** dans le repository Git

### Bonnes Pratiques

- Serveur web en mode lecture seule
- Conteneur non-root (user nginx)
- Logs accessibles mais non exposés
- Mises à jour régulières des images Docker

---

## 🧪 Tests

### Tests Manuels

```bash
# Checklist de validation
□ Navigation sticky fonctionne
□ Vidéos démo autoplay
□ QR codes visibles desktop, cachés mobile
□ Modals s'ouvrent/ferment correctement
□ Timeline parcours affichée
□ CV téléchargeable fonctionne
□ Liens sociaux actifs
□ Responsive mobile (test iPhone/Android)
```

### Tests Navigateurs

- ✅ Chrome 120+ (desktop + mobile)
- ✅ Firefox 120+
- ✅ Safari 17+ (iOS)
- ✅ Edge 120+

---

## 📊 Performance

### Optimisations

- ✅ **Vidéos** : WebM (léger) + MP4 fallback
- ✅ **Images** : Optimisées, lazy loading
- ✅ **Fonts** : Preconnect Google Fonts
- ✅ **CSS** : Minifié en production
- ✅ **Nginx** : Gzip compression, cache headers

### Métriques Lighthouse (Desktop)

- **Performance** : 95+
- **Accessibility** : 100
- **Best Practices** : 100
- **SEO** : 100

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](docs/CONTRIBUTING.md) pour :

- Convention de commits
- Workflow Git (branches)
- Standards de code
- Process de review

---

## 📝 License

**Propriétaire** - © 2025 Matthieu Alix

Tous droits réservés. Ce projet est à usage personnel et professionnel (portfolio).

---

## 👤 Auteur

**Matthieu Alix**
Développeur Fullstack DevOps

- 🌐 **Portfolio** : [me.devamalix.fr](https://me.devamalix.fr)
- 💼 **LinkedIn** : [linkedin.com/in/matthieu-alix](https://linkedin.com/in/matthieu-alix)
- 🐙 **GitHub** : [@MatthALXdev](https://github.com/MatthALXdev)
- 📧 **Email** : matth.alx.dev@gmail.com

---

## 🙏 Remerciements

- **Design inspiration** : Awwwards, Dribbble
- **Stack technique** : Docker, Traefik, Nginx
- **Outils** : VSCode, Git

---

<div align="center">

**Fait avec ❤️ et beaucoup de ☕**

**Dernière mise à jour** : Décembre 2025

[⬆️ Retour en haut](#-devalix-portfolio)

</div>
