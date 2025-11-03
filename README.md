# DevAlix Portfolio

Portfolio personnel présentant mes projets fullstack en production.

## URL
https://me.devamalix.fr

## Stack
- HTML5 / CSS3 / JavaScript
- Tailwind CSS (CDN)
- Responsive design
- Docker + Nginx

## Structure

```
portfolio/
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles personnalisés
├── js/
│   └── main.js        # Logique JavaScript
└── assets/
    ├── demos/         # Vidéos démo projets
    ├── qr/           # QR codes (desktop only)
    ├── architecture/ # Schémas architecture
    ├── security/     # Assets sécurité
    └── screenshots/  # Captures d'écran
```

## Déploiement

### Local (Nexus)
```bash
# Servir en local pour tests
python3 -m http.server 8080
# Accès: http://localhost:8080
```

### Production (VPS)
```bash
docker-compose up -d
# Accès: https://me.devamalix.fr
```

## Design System

### Couleurs
- Sunrise Orange: #E67451
- Sunrise Blue: #2B4C7E
- Dawn Blue: #5B8DBE
- Sky Light: #E8F1F8

### Gradient
- Gradient sunrise: #E67451 → #5B8DBE (135deg)

## Fonctionnalités

- Navigation sticky avec menu responsive
- Hero section avec gradient sunrise
- Cards projets avec vidéos démo
- QR codes (desktop uniquement)
- Modals détails projets
- Timeline parcours
- Section compétences
- Responsive mobile-first
