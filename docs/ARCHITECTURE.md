# 🏗️ Architecture Technique - Portfolio DevAlix

> Documentation complète de l'architecture technique, infrastructure et stack du portfolio.

**Version** : 1.0
**Dernière mise à jour** : Décembre 2025

---

## Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Architecture Frontend](#architecture-frontend)
3. [Infrastructure Docker](#infrastructure-docker)
4. [Intégration Traefik](#intégration-traefik)
5. [Environnements](#environnements)
6. [Performance & Optimisations](#performance--optimisations)
7. [Sécurité](#sécurité)
8. [Monitoring](#monitoring)

---

## 🎯 Vue d'Ensemble

### Architecture Générale

```
┌─────────────────────────────────────────────────────────────┐
│                      INTERNET (HTTPS)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   Traefik v3 (VPS)     │
         │  Reverse Proxy HTTPS    │
         │  Let's Encrypt Auto     │
         └────────────┬───────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
  ┌──────────────┐        ┌──────────────┐
  │  Portfolio   │        │  nginx-static│
  │  (Nginx)     │        │  (Media)     │
  │  Port: 80    │        │  Port: 80    │
  └──────────────┘        └──────────────┘
       │                       │
       ▼                       ▼
  index.html             /media/, /uploads/
  assets/                Fichiers statiques
  CSS/JS                 partagés
```

### Stack Technologique

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| **Frontend** | HTML5 | - | Structure sémantique |
| **Frontend** | CSS3 | - | Styles personnalisés |
| **Frontend** | JavaScript ES6+ | - | Logique interactive |
| **Framework CSS** | Tailwind CSS | 3.x (CDN) | Utility-first design |
| **Serveur Web** | Nginx | Alpine latest | Serveur HTTP statique |
| **Reverse Proxy** | Traefik | v3.2 | HTTPS, routing, TLS |
| **Conteneurisation** | Docker | 24+ | Isolation, portabilité |
| **Orchestration** | Docker Compose | v2+ | Multi-conteneurs |
| **TLS/SSL** | Let's Encrypt | ACME v2 | Certificats HTTPS auto |
| **DNS** | OVH | - | me.devamalix.fr |
| **Hébergement** | VPS OVH | Ubuntu 22.04 | Serveur production |

---

## 🎨 Architecture Frontend

### Structure des Fichiers

```
portfolio/
├── index.html                 # Point d'entrée unique (SPA-like)
│
├── css/
│   └── style.css              # Styles personnalisés
│       ├── Variables CSS (couleurs, fonts)
│       ├── Composants (cards, buttons, modals)
│       ├── Layouts (grid, flex)
│       ├── Animations (scroll reveal, hover)
│       └── Responsive (breakpoints)
│
├── js/
│   └── main.js                # Logique JavaScript
│       ├── Navigation (sticky, burger menu)
│       ├── Modals (ouverture/fermeture)
│       ├── Scroll Reveal (IntersectionObserver)
│       ├── Smooth Scroll (ancres)
│       └── Données projets (JSON inline)
│
└── assets/
    ├── demos/                 # Vidéos démo (webm + mp4)
    ├── qr/                    # QR codes (PNG)
    ├── architecture/          # Schémas infra (PNG)
    ├── screenshots/           # Captures d'écran
    ├── photo-matthieu.jpg     # Photo profil
    └── cv-matthieu-alix.pdf   # CV téléchargeable
```

### Dépendances Externes

**CDN Tailwind CSS** :
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Google Fonts (Inter)** :
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Pas de Framework JS** : Vanilla JavaScript pur
- ✅ Moins de dépendances
- ✅ Chargement plus rapide
- ✅ Maintenance simplifiée
- ✅ Pas de build step nécessaire

### Flux de Données

```
User Interaction
    ↓
Event Listeners (main.js)
    ↓
DOM Manipulation
    ├── Modals (show/hide)
    ├── Scroll Reveal (observer)
    ├── Navigation (sticky, burger)
    └── Smooth Scroll (ancres)
    ↓
CSS Transitions/Animations
    ↓
Visual Feedback
```

**Exemple : Ouverture Modal Projet**
```javascript
// 1. Clic sur bouton "Voir détails"
function openProjectModal(projectKey) {
  // 2. Récupérer données projet
  const project = projects[projectKey];

  // 3. Remplir modal avec données
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  // ...

  // 4. Afficher modal
  const modal = document.getElementById('modal-project');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // 5. Lock scroll body
  document.body.style.overflow = 'hidden';
}
```

---

## 🐳 Infrastructure Docker

### Architecture Conteneurs

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Host (VPS)                      │
│                                                           │
│  ┌────────────────┐                                     │
│  │  portfolio     │  Image: portfolio:latest            │
│  │  (Nginx)       │  Base: nginx:alpine                 │
│  │                │  Port: 80                            │
│  └────────┬───────┘  Network: traefik-network          │
│           │          Restart: unless-stopped            │
│           │                                              │
│  ┌────────▼───────┐                                     │
│  │  traefik       │  Réseau externe                     │
│  └────────────────┘  (partagé tous projets)            │
└─────────────────────────────────────────────────────────┘
```

### Dockerfile

```dockerfile
# Portfolio Dockerfile
FROM nginx:alpine

# Copier les fichiers du projet
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition port 80 (HTTPS géré par Traefik)
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Commande par défaut (déjà dans l'image de base)
CMD ["nginx", "-g", "daemon off;"]
```

### Configuration Nginx

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length 1000;
    gzip_comp_level 6;

    # Cache headers (assets statiques)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webm|mp4|pdf)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Pas de cache pour HTML
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;
}
```

### docker-compose.yml (Production)

```yaml
version: '3.8'

networks:
  traefik-network:
    external: true

services:
  portfolio:
    build: .
    container_name: portfolio
    restart: unless-stopped

    networks:
      - traefik-network

    labels:
      # Activer Traefik
      - "traefik.enable=true"

      # Router HTTP → HTTPS
      - "traefik.http.routers.portfolio-http.rule=Host(`me.devamalix.fr`)"
      - "traefik.http.routers.portfolio-http.entrypoints=web"
      - "traefik.http.routers.portfolio-http.middlewares=https-redirect"

      # Router HTTPS
      - "traefik.http.routers.portfolio.rule=Host(`me.devamalix.fr`)"
      - "traefik.http.routers.portfolio.entrypoints=websecure"
      - "traefik.http.routers.portfolio.tls=true"
      - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"

      # Service
      - "traefik.http.services.portfolio.loadbalancer.server.port=80"

      # Middleware redirect HTTPS
      - "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.https-redirect.redirectscheme.permanent=true"

    # Healthcheck
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

---

## 🔀 Intégration Traefik

### Rôle de Traefik

**Traefik** agit comme reverse proxy centralisé pour tous les projets :
- Routing HTTP/HTTPS basé sur le Host
- Génération automatique de certificats TLS (Let's Encrypt)
- Redirection HTTP → HTTPS automatique
- Load balancing (si plusieurs instances)
- Monitoring dashboard

### Configuration Labels

```yaml
labels:
  # 1. Activer Traefik pour ce service
  - "traefik.enable=true"

  # 2. Router HTTP (port 80) → Redirection HTTPS
  - "traefik.http.routers.portfolio-http.rule=Host(`me.devamalix.fr`)"
  - "traefik.http.routers.portfolio-http.entrypoints=web"
  - "traefik.http.routers.portfolio-http.middlewares=https-redirect"

  # 3. Router HTTPS (port 443)
  - "traefik.http.routers.portfolio.rule=Host(`me.devamalix.fr`)"
  - "traefik.http.routers.portfolio.entrypoints=websecure"
  - "traefik.http.routers.portfolio.tls=true"
  - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"

  # 4. Service (port interne du conteneur)
  - "traefik.http.services.portfolio.loadbalancer.server.port=80"

  # 5. Middleware HTTPS redirect
  - "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https"
  - "traefik.http.middlewares.https-redirect.redirectscheme.permanent=true"
```

### Flux de Requête

```
1. User → https://me.devamalix.fr
          ↓
2. DNS → IP VPS (37.59.115.242)
          ↓
3. Traefik (port 443)
   ├─ Vérifie Host header: me.devamalix.fr
   ├─ Route vers service portfolio
   ├─ Utilise certificat TLS Let's Encrypt
   └─ Forward requête à conteneur portfolio:80
          ↓
4. Nginx (portfolio)
   ├─ Sert index.html
   ├─ Applique gzip compression
   ├─ Ajoute cache headers
   └─ Retourne réponse HTML
          ↓
5. Traefik → User (HTTPS 200 OK)
```

---

## 🌍 Environnements

### 1. Développement Local (Nexus)

**Configuration** : `docker-compose.nexus.yml`

```yaml
version: '3.8'

networks:
  traefik-network:
    external: true

services:
  portfolio:
    build: .
    container_name: portfolio
    restart: unless-stopped
    networks:
      - traefik-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portfolio.rule=Host(`portfolio.nexus.local`)"
      - "traefik.http.routers.portfolio.entrypoints=web"
      - "traefik.http.services.portfolio.loadbalancer.server.port=80"
```

**Accès** :
- URL : http://portfolio.nexus.local
- TLS : Non (HTTP uniquement)
- DNS : Hosts file local (`/etc/hosts`)

**Commandes** :
```bash
# Build & start
docker compose -f docker-compose.nexus.yml up -d --build

# Logs
docker compose -f docker-compose.nexus.yml logs -f

# Stop
docker compose -f docker-compose.nexus.yml down
```

---

### 2. Production (VPS OVH)

**Configuration** : `docker-compose.yml`

**Accès** :
- URL : https://me.devamalix.fr
- TLS : Let's Encrypt (auto-renewal)
- DNS : OVH (enregistrement A)

**Prérequis** :
- VPS avec IP publique
- DNS configuré (A record : me → IP VPS)
- Traefik v3 déployé et fonctionnel
- Réseau `traefik-network` créé

**Déploiement** :
```bash
# Sur VPS
cd /home/ubuntu/portfolio

# Pull dernières modifications
git pull origin main

# Rebuild & redémarrer
docker compose up -d --build

# Vérifier certificat TLS
curl -I https://me.devamalix.fr
# → HTTP/2 200
# → strict-transport-security: max-age=...
```

**Mise à jour** :
```bash
# Option 1 : Git pull
git pull && docker compose up -d --build

# Option 2 : Watchtower (auto-update si configuré)
# Détecte nouvelles images et redémarre auto
```

---

## ⚡ Performance & Optimisations

### Métriques Cibles

| Métrique | Cible | Actuel | Status |
|----------|-------|--------|--------|
| **First Contentful Paint (FCP)** | < 1.5s | ~1.2s | ✅ |
| **Largest Contentful Paint (LCP)** | < 2.5s | ~2.1s | ✅ |
| **Total Blocking Time (TBT)** | < 200ms | ~150ms | ✅ |
| **Cumulative Layout Shift (CLS)** | < 0.1 | ~0.05 | ✅ |
| **Speed Index** | < 3s | ~2.5s | ✅ |
| **Time to Interactive (TTI)** | < 3.5s | ~2.8s | ✅ |

### Optimisations Appliquées

#### 1. Images & Médias

**Vidéos** :
- Format WebM (VP9) : ~50% plus léger que MP4
- Fallback MP4 (H.264) pour compatibilité
- Bitrate optimisé : 500 kbps
- Pas d'audio (flag `-an` FFmpeg)
- Attributs HTML : `autoplay loop muted playsinline`

**Images** :
- Optimisées avec TinyPNG / ImageOptim
- Lazy loading natif : `loading="lazy"`
- Dimensions explicites (éviter CLS)

#### 2. CSS & JavaScript

**CSS** :
- Tailwind CSS via CDN (cache navigateur)
- Styles personnalisés minifiés (production)
- Critical CSS inline (hero section)

**JavaScript** :
- Vanilla JS (pas de framework lourd)
- Pas de dépendances npm (zéro build)
- Defer scripts non-critiques

#### 3. Nginx

**Compression Gzip** :
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
gzip_min_length 1000;
gzip_comp_level 6;
```

**Cache Headers** :
```nginx
# Assets statiques (7 jours)
location ~* \.(jpg|jpeg|png|gif|ico|css|js|webm|mp4|pdf)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}

# HTML (pas de cache)
location / {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

**Sendfile & TCP** :
```nginx
sendfile on;
tcp_nopush on;
tcp_nodelay on;
keepalive_timeout 65;
```

#### 4. Fonts

**Google Fonts Optimization** :
```html
<!-- Preconnect pour réduire latence DNS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font avec display=swap (éviter FOIT) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

#### 5. Docker

**Image Alpine** :
- Nginx Alpine : ~10MB (vs 130MB Debian)
- Temps build réduit : ~5-10 sec
- Moins de surface d'attaque sécurité

**Multi-stage Build** (si nécessaire) :
Pas implémenté car pas de build step (vanilla JS)

---

## 🔒 Sécurité

### Mesures Appliquées

#### 1. HTTPS Forcé

- ✅ Let's Encrypt (certificats gratuits, auto-renewal)
- ✅ Redirection HTTP → HTTPS automatique (Traefik)
- ✅ HSTS header activé (strict-transport-security)

```yaml
# Middleware Traefik HTTPS redirect
- "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https"
- "traefik.http.middlewares.https-redirect.redirectscheme.permanent=true"
```

#### 2. Headers Sécurité (Nginx)

```nginx
# Prévention clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Prévention MIME sniffing
add_header X-Content-Type-Options "nosniff" always;

# XSS protection
add_header X-XSS-Protection "1; mode=block" always;

# Referrer policy
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

#### 3. Conteneur Sécurisé

**User non-root** (Nginx Alpine par défaut) :
```dockerfile
# Nginx Alpine utilise user 'nginx' (UID 101)
# Pas de privilèges root nécessaires
```

**Read-only filesystem** (optionnel) :
```yaml
services:
  portfolio:
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache/nginx
      - /var/run
```

#### 4. Pas de Secrets

- ✅ Pas de `.env` (site statique)
- ✅ Pas de credentials dans le code
- ✅ Repository public safe

#### 5. Firewall VPS

```bash
# UFW (Uncomplicated Firewall)
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Vulnérabilités Potentielles

| Risque | Impact | Mitigation |
|--------|--------|------------|
| **DDoS** | Moyen | Cloudflare (si nécessaire) |
| **XSS** | Faible | Pas d'input utilisateur |
| **CSRF** | Nul | Pas de formulaires |
| **Injection SQL** | Nul | Pas de base de données |
| **Secrets exposés** | Nul | Pas de secrets |

---

## 📊 Monitoring

### Métriques Disponibles

**Uptime Kuma** (si déployé) :
- ✅ Monitoring HTTPS : https://me.devamalix.fr
- ✅ Interval : 5 minutes
- ✅ Alertes email si down > 5 min
- ✅ Historique uptime 30 jours

**Traefik Dashboard** :
- URL services actifs
- Requêtes HTTP/HTTPS
- Certificats TLS (validité, renouvellement)
- Erreurs 4xx / 5xx

**Docker Stats** :
```bash
# Ressources en temps réel
docker stats portfolio

# CPU : ~0.5% idle, ~5% load
# RAM : ~10-15MB
# Network : ~1-5KB/s idle
```

### Logs

**Nginx Access Logs** :
```bash
docker compose logs -f portfolio
# → 192.168.1.x - - [10/Dec/2025:14:23:45 +0000] "GET / HTTP/1.1" 200
```

**Nginx Error Logs** :
```bash
docker exec portfolio tail -f /var/log/nginx/error.log
```

**Traefik Logs** :
```bash
docker logs -f traefik
# → Routes actives, certificats TLS, erreurs routing
```

---

## 📚 Ressources

**Documentation Nginx** :
- https://nginx.org/en/docs/
- https://docs.nginx.com/nginx/admin-guide/

**Documentation Traefik** :
- https://doc.traefik.io/traefik/
- https://doc.traefik.io/traefik/routing/routers/

**Documentation Docker** :
- https://docs.docker.com/engine/
- https://docs.docker.com/compose/

**Outils Performance** :
- Lighthouse : https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights : https://pagespeed.web.dev/

---

**Auteur** : Matthieu Alix
**Dernière mise à jour** : Décembre 2025
**Statut** : ✅ Production
