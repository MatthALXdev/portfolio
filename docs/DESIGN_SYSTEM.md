# 🎨 Design System - Portfolio DevAlix

> Spécifications complètes du design system "Sunrise" pour le portfolio professionnel.

**Version** : 1.0
**Dernière mise à jour** : Décembre 2025
**Statut** : ✅ Implémenté en production

---

## Table des Matières

1. [Objectifs & Parcours Utilisateurs](#objectifs--parcours-utilisateurs)
2. [Palette de Couleurs](#palette-de-couleurs)
3. [Typographie](#typographie)
4. [Architecture Globale](#architecture-globale)
5. [Sections Détaillées](#sections-détaillées)
6. [Modals & Interactions](#modals--interactions)
7. [Responsive Design](#responsive-design)
8. [Animations](#animations)
9. [Assets Nécessaires](#assets-nécessaires)

---

## 🎯 Objectifs & Parcours Utilisateurs

### Parcours 1 : Recruteur Pressé (15-30 sec)

**Objectif** : Impression immédiate et décision rapide

- ✅ Impression immédiate avec visuels forts
- ✅ Stack technique visible d'emblée
- ✅ Accès direct aux demos live (QR codes + liens)
- ✅ Décision rapide sur pertinence du profil

### Parcours 2 : Recruteur Investigateur (5-10 min)

**Objectif** : Validation approfondie des compétences

- ✅ Détails techniques approfondis (modals)
- ✅ Architecture complète (schémas infrastructure)
- ✅ Validation cohérence profil (timeline parcours)
- ✅ Preuves concrètes (tests, CI/CD, monitoring)

---

## 🎨 Palette de Couleurs

### Palette Principale "Sunrise"

```css
/* Couleurs de marque */
--sunrise-orange: #E67451    /* CTA, accents, hover */
--sunrise-blue: #2B4C7E      /* Titres, structure, footer */
--dawn-blue: #5B8DBE         /* Secondaire, liens, gradients */
--sky-light: #E8F1F8         /* Backgrounds clairs, cards */

/* Couleurs projets */
--pyxalix: #D67D3E           /* Orange doré - Projet Pyx */
--recontent: #4A90C9         /* Bleu ciel - Projet ReContent */

/* Couleurs utilitaires */
--success: #10b981           /* Tests passing, validations */
--warning: #f59e0b           /* Warnings, attention */
--error: #ef4444             /* Erreurs, actions critiques */
--info: #3b82f6              /* Informations, tips */

/* Gris & Neutres */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Gradient Principal "Sunrise"

```css
/* Gradient Hero Background */
.bg-gradient-sunrise {
  background: linear-gradient(135deg, #E67451 0%, #5B8DBE 100%);
}

/* Gradient texte (titres) */
.text-gradient-sunrise {
  background: linear-gradient(135deg, #E67451 0%, #5B8DBE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient border hover */
.border-gradient-sunrise {
  border-image: linear-gradient(135deg, #E67451 0%, #5B8DBE 100%) 1;
}
```

### Accessibilité Couleurs

**Contraste WCAG AA** :
- Texte sur fond clair : `--sunrise-blue` (#2B4C7E) → Ratio 8.5:1 ✅
- Texte sur fond foncé : `--sky-light` (#E8F1F8) → Ratio 12:1 ✅
- CTA `--sunrise-orange` : Texte blanc → Ratio 4.8:1 ✅

---

## ✍️ Typographie

### Police Principale

**Inter** (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Hiérarchie Typographique

```css
/* Hero - Nom */
.hero-name {
  font-size: 3rem;        /* Mobile 48px */
  font-size: 3.75rem;     /* Desktop 60px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Titres de sections (H2) */
.section-title {
  font-size: 2.5rem;      /* 40px */
  font-weight: 700;
  line-height: 1.2;
  color: var(--sunrise-blue);
}

/* Sous-titres (H3) */
.subsection-title {
  font-size: 1.5rem;      /* 24px */
  font-weight: 600;
  line-height: 1.3;
}

/* Corps de texte */
.body-text {
  font-size: 1rem;        /* 16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--gray-700);
}

/* Texte small (labels, captions) */
.text-small {
  font-size: 0.875rem;    /* 14px */
  font-weight: 400;
  line-height: 1.5;
}

/* Texte extra-small (badges, notes) */
.text-xs {
  font-size: 0.75rem;     /* 12px */
  font-weight: 500;
  line-height: 1.4;
}
```

### Poids de Police Recommandés

- **300 (Light)** : Pas utilisé
- **400 (Regular)** : Corps de texte, paragraphes
- **500 (Medium)** : Labels, petits textes importants
- **600 (Semi-Bold)** : Sous-titres, boutons secondaires
- **700 (Bold)** : Titres sections, boutons primaires
- **800 (Extra-Bold)** : Hero nom, accents importants
- **900 (Black)** : Pas utilisé (trop lourd)

---

## 📐 Architecture Globale

### Structure 3 Niveaux

```
Niveau 1 : Landing Page (scroll)
  ├─ Navigation Sticky
  ├─ Hero Section (gradient + photo + CTA)
  ├─ Projets (3 cards cliquables)
  ├─ Timeline Parcours (6 étapes)
  ├─ Compétences (4 catégories)
  └─ Footer (3 colonnes)

Niveau 2 : Modals Projets (clic sur card)
  ├─ Vidéo démo (grande taille)
  ├─ Description complète
  ├─ Features (liste bullets)
  ├─ Stack technique (badges)
  ├─ Architecture simplifiée (schéma + CTA)
  ├─ CI/CD aperçu (badges + CTA)
  └─ Liens (Demo live + GitHub)

Niveau 3 : Modals Architecture (clic "voir détails")
  ├─ Bouton retour modal projet
  ├─ Schéma infrastructure complet (haute résolution)
  ├─ Légende composants avec descriptions
  ├─ Environnements (dev/staging/prod)
  └─ Métriques (uptime, coverage, build time)
```

### Grille & Layout

**Container Max-Width** :
```css
.container-sm { max-width: 640px; }  /* Contenu texte */
.container-md { max-width: 768px; }  /* Formulaires */
.container-lg { max-width: 1024px; } /* Sections standard */
.container-xl { max-width: 1280px; } /* Full width content */
```

**Grid Projects** :
```css
/* Mobile : 1 colonne */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Desktop : 2 colonnes */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

/* 3ème card (infra) : full width */
.projects-grid .card-infrastructure {
  grid-column: 1 / -1;
}
```

---

## 🏗️ Sections Détaillées

### 1. Navigation Sticky

**Layout** :
- Logo "MA" à gauche (gradient sunrise)
- Menu horizontal centre : Projets | Parcours | Compétences | Contact
- CTA "Télécharger CV" à droite (desktop uniquement)
- Burger menu (mobile < 768px)

**States** :
```css
/* Normal (top page) */
.navbar {
  background: transparent;
  padding: 1.5rem 0;
}

/* Scrolled (sticky) */
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

---

### 2. Hero Section

**Layout** :
```
[Photo ronde]  [Nom + Baseline + Badges Stack + CTAs + Liens Sociaux]
```

**Éléments** :
- **Photo** : 192px desktop, 128px mobile, border 4px sunrise-orange
- **Nom** : "Matthieu Alix" (60px desktop, 48px mobile)
- **Titre** : "Développeur Fullstack DevOps"
- **Baseline** : "Issu d'une reconversion après 5 ans en biologie moléculaire..."
- **Badges stack** : Django, React, Docker, PostgreSQL, CI/CD, Nginx
- **2 CTAs** :
  - Primaire : "Voir projets" (scroll smooth)
  - Secondaire : "Télécharger CV" (download PDF)
- **Liens sociaux** : GitHub, LinkedIn, Email (icônes)

**Background** :
```css
.hero {
  background: linear-gradient(135deg, #E67451 0%, #5B8DBE 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}
```

---

### 3. Section Projets

**3 Cards** : Pyx | ReContent | Infrastructure

**Structure Card Projet** :
```html
<article class="project-card">
  <video autoplay loop muted playsinline>
    <source src="demo.webm" type="video/webm">
    <source src="demo.mp4" type="video/mp4">
  </video>

  <div class="card-content">
    <h3 class="project-title">Pyx</h3>
    <p class="project-description">E-commerce de fonds d'écran...</p>

    <div class="stack-badges">
      <span>Django 5</span>
      <span>PostgreSQL</span>
      <span>Docker</span>
    </div>

    <div class="status-badges">
      <span class="badge-success">✓ Tests 65%</span>
      <span class="badge-success">✓ HTTPS</span>
    </div>

    <div class="card-actions">
      <button onclick="openProjectModal('pyx')">Voir détails</button>
      <a href="https://pyx.devamalix.fr">Demo live →</a>
      <a href="github.com/...">GitHub</a>
    </div>

    <!-- QR Code : desktop uniquement -->
    <div class="qr-code hidden lg:block">
      <p>Scanner pour tester sur mobile :</p>
      <img src="qr-pyx.png" alt="QR Pyx">
    </div>
  </div>
</article>
```

**Hover Effect** :
```css
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(230, 116, 81, 0.2);
}
```

---

### 4. Timeline Parcours

**Structure Verticale** :
```
○ 2025 : Bachelor DevOps Fullstack (EPSI)
│
○ 2024-2023 : TP Dev Web (EPSI) + Projets perso
│
○ 2025 : Approvisionneur (transition biologie → dev)
│
○ 2022-2021 : Technicien R&D (Evotec)
│
○ 2021-2017 : Technicien Qualité (BioMérieux)
│
○ 2016 : BTS Bioanalyses et Contrôles
```

**Ligne Gradient** :
```css
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #E67451 0%, #5B8DBE 100%);
}
```

**Markers Circulaires** :
```css
.timeline-item::before {
  content: '';
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--sunrise-orange);
  border: 4px solid white;
  box-shadow: 0 0 0 4px rgba(230, 116, 81, 0.2);
}
```

**CTA Fin Timeline** :
```html
<button onclick="openCoverLetterModal()">
  Lire ma lettre de motivation →
</button>
```

---

### 5. Section Compétences

**4 Colonnes (grid responsive)** :

**1. Backend** : Django 5, Node.js, PostgreSQL, API REST
**2. Frontend** : React, Tailwind CSS, HTML5/CSS3, JavaScript
**3. DevOps** : Docker, Nginx, Traefik, GitHub Actions, Linux
**4. Tests** : pytest, Jest, CI/CD, Git/GitHub

**Icônes** : Emojis simples
- 🔧 Backend
- 🎨 Frontend
- ⚙️ DevOps
- 🧪 Tests

**Grid Layout** :
```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

---

### 6. Footer

**3 Colonnes** :

```
[Gauche]                [Centre]              [Droite]
Matthieu Alix          GitHub                © 2025 Matthieu Alix
Dev Fullstack DevOps   LinkedIn              Fait avec React & Tailwind
Lyon, France           Email                 Hébergé sur VPS OVH
```

**Background** : `--sunrise-blue`
**Texte** : blanc / gris clair

---

## 🎭 Modals & Interactions

### Modal Projet (Niveau 2)

**Sections** :
1. Vidéo démo (grande taille, 16:9)
2. Description (2-3 paragraphes)
3. Fonctionnalités (liste bullets, icônes)
4. Stack technique (badges colorés)
5. Architecture (schéma simplifié + CTA "voir détails")
6. CI/CD (pipeline visuel + badges + CTA "workflow détaillé")
7. Liens (Demo live + GitHub)

**Fermeture** :
- Bouton ✕ en haut à droite
- Touche `Esc`
- Clic sur overlay (fond semi-transparent)

### Modal Architecture (Niveau 3)

**Contenu** :
- Bouton `← Retour` vers modal projet
- Schéma infrastructure complet (haute résolution, zoomable)
- Légende composants avec descriptions détaillées
- Tableau environnements (dev/staging/prod)
- Métriques : Uptime 99.5% | Coverage 65% | Build 2m15s

### Modal Lettre de Motivation

**Contenu** :
- Titre "Lettre de Motivation"
- Texte complet formaté (prose professionnelle)
- Signature + date
- CTA "Télécharger CV complet"

---

## 📱 Responsive Design

### Breakpoints Tailwind

```css
/* Mobile first (défaut) */
/* < 640px : Mobile portrait */

/* sm: 640px */
@media (min-width: 640px) { /* Mobile landscape */ }

/* md: 768px */
@media (min-width: 768px) { /* Tablette portrait */ }

/* lg: 1024px */
@media (min-width: 1024px) { /* Tablette landscape / Desktop */ }

/* xl: 1280px */
@media (min-width: 1280px) { /* Desktop large */ }

/* 2xl: 1536px */
@media (min-width: 1536px) { /* Desktop extra-large */ }
```

### Mobile (< 768px)

**Hero** :
- Stack vertical (photo au-dessus du texte)
- Photo 128px
- Texte centré
- Badges stack sur 2 lignes
- CTAs stack vertical

**Projets** :
- 1 colonne
- **QR codes cachés** (`hidden lg:block`)
- Vidéos 100% width

**Timeline** :
- Markers 12px (au lieu de 16px)
- Padding réduit
- Texte plus compact

**Compétences** :
- 1 colonne (stack vertical)

**Modals** :
- Fullscreen (100vw × 100vh)
- Padding réduit (1rem)
- Scroll vertical

**Navigation** :
- Burger menu (hamburger icon)
- Menu slide-in depuis la droite
- Overlay fond sombre

### Desktop (≥ 1024px)

**Hero** :
- Flex row (photo à gauche, contenu à droite)
- Photo 192px
- Texte aligné à gauche

**Projets** :
- 2 colonnes (grid)
- **QR codes visibles** (`hidden lg:block`)
- Card infra full-width (3ème)

**Timeline** :
- Markers 16px
- Padding normal
- Hover effects activés

**Compétences** :
- 4 colonnes (grid)

**Modals** :
- Max-width 900px (projets)
- Max-width 1200px (architecture)
- Centrés horizontalement + verticalement
- Border-radius 1rem

**Navigation** :
- Menu horizontal visible
- CTA "Télécharger CV" visible
- Pas de burger menu

---

## 🎬 Animations

### Scroll Reveal

**Principe** : Fade-in + Translate Y sur sections au scroll

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,  // 10% de l'élément visible
  rootMargin: '0px 0px -50px 0px'
});

// Observer toutes les sections
document.querySelectorAll('.section-reveal').forEach((section) => {
  observer.observe(section);
});
```

```css
.section-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Délai progressif pour éléments multiples */
.section-reveal:nth-child(1) { transition-delay: 0s; }
.section-reveal:nth-child(2) { transition-delay: 0.1s; }
.section-reveal:nth-child(3) { transition-delay: 0.2s; }
```

### Interactions

**Cards Projets** :
```css
.project-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(230, 116, 81, 0.25);
}
```

**Boutons** :
```css
.btn-primary {
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  box-shadow: 0 8px 16px rgba(230, 116, 81, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

**Timeline Markers** :
```css
.timeline-marker {
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.3);
  box-shadow: 0 0 0 8px rgba(230, 116, 81, 0.3);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.3); }
  50% { transform: scale(1.5); }
}
```

**Modals** :
```css
/* Entrée modal */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal {
  animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Overlay fade */
.modal-overlay {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 🖼️ Assets Nécessaires

### Vidéos Démo

| Fichier | Format | Durée | Poids | Usage |
|---------|--------|-------|-------|-------|
| `pyx-demo.webm` | WebM VP9 | 15-20s | < 2MB | Card + Modal Pyx |
| `pyx-demo.mp4` | H.264 | 15-20s | < 3MB | Fallback |
| `recontent-demo.webm` | WebM VP9 | 15-20s | < 2MB | Card + Modal ReContent |
| `recontent-demo.mp4` | H.264 | 15-20s | < 3MB | Fallback |

**Optimisation FFmpeg** :
```bash
# WebM (léger, bonne qualité)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 500k -an output.webm

# MP4 fallback
ffmpeg -i input.mp4 -vcodec h264 -b:v 500k -an output.mp4
```

### QR Codes

| Fichier | Taille | URL cible | Usage |
|---------|--------|-----------|-------|
| `pyx-qr.png` | 96×96px | https://pyx.devamalix.fr | Card Pyx desktop |
| `recontent-qr.png` | 96×96px | https://recontent.devamalix.fr | Card ReContent desktop |
| `portfolio-qr.png` | 96×96px | https://me.devamalix.fr | README GitHub |

**Génération** : https://www.qr-code-generator.com/
- Format : PNG
- Résolution source : 1000×1000px
- Resize pour web : 96×96px
- Couleur : Noir standard

### Schémas Architecture

| Fichier | Résolution | Usage |
|---------|-----------|-------|
| `pyx-arch-simple.png` | 1200×800 | Modal projet niveau 2 |
| `pyx-arch-full.png` | 1920×1080 | Modal architecture niveau 3 |
| `recontent-arch-simple.png` | 1200×800 | Modal projet niveau 2 |
| `recontent-arch-full.png` | 1920×1080 | Modal architecture niveau 3 |
| `infra-global.png` | 1920×1080 | Modal infrastructure |

**Outils** : draw.io ou Excalidraw
**Export** : PNG haute résolution, transparent background

### Screenshots

| Fichier | Résolution | Usage |
|---------|-----------|-------|
| `hero-desktop.png` | 1920×1080 | README |
| `projects-desktop.png` | 1920×1080 | README |
| `hero-mobile.png` | 375×812 | README |
| `pyx-catalog.png` | 1920×1080 | Documentation Pyx |
| `pyx-product-detail.png` | 1920×1080 | Documentation Pyx |
| `recontent-interface.png` | 1920×1080 | Documentation ReContent |

**Optimisation** : TinyPNG ou ImageOptim

### Photo & Documents

| Fichier | Format | Taille | Usage |
|---------|--------|--------|-------|
| `photo-matthieu.jpg` | JPEG | 500×500px | Hero section (cercle) |
| `cv-matthieu-alix.pdf` | PDF | < 500KB | Téléchargement |

---

## ✅ Checklist Validation Design

### Couleurs
- [x] Palette Sunrise définie (4 couleurs principales)
- [x] Couleurs projets distinctes (Pyx orange, ReContent bleu)
- [x] Contraste WCAG AA respecté (tous les textes)
- [x] Gradient sunrise implémenté

### Typographie
- [x] Police Inter chargée (Google Fonts)
- [x] Hiérarchie claire (H1 > H2 > H3 > body)
- [x] Tailles responsive (3rem mobile → 4rem desktop)
- [x] Poids de police cohérents (400, 600, 700, 800)

### Layout
- [x] Container max-width définis (640 / 768 / 1024 / 1280)
- [x] Grid projets 1 col mobile / 2 col desktop
- [x] Navigation sticky fonctionnelle
- [x] Hero section gradient background

### Composants
- [x] 3 cards projets (vidéo + contenu + QR)
- [x] Timeline parcours (6 étapes, gradient line)
- [x] Section compétences (4 catégories, grid)
- [x] Footer (3 colonnes)
- [x] 3 modals (projet, architecture, cover letter)

### Responsive
- [x] Mobile-first approach
- [x] Breakpoints Tailwind (sm/md/lg/xl)
- [x] QR codes cachés mobile / visibles desktop
- [x] Burger menu mobile
- [x] Modals fullscreen mobile / centrés desktop

### Animations
- [x] Scroll reveal (fade + translateY)
- [x] Hover effects cards (translateY + shadow)
- [x] Hover effects buttons (scale + brightness)
- [x] Modal slide-in animation
- [x] Timeline markers pulse hover

### Assets
- [ ] Vidéos démo (2×2 = 4 fichiers .webm + .mp4)
- [ ] QR codes (3 fichiers .png 96×96)
- [ ] Schémas architecture (5 fichiers .png)
- [ ] Screenshots (6 fichiers .png)
- [ ] Photo profil (1 fichier .jpg)
- [ ] CV (1 fichier .pdf)

---

## 📖 Ressources

**Documentation Design** :
- Tailwind CSS : https://tailwindcss.com/docs
- Google Fonts Inter : https://fonts.google.com/specimen/Inter
- Color Contrast Checker : https://webaim.org/resources/contrastchecker/

**Outils Recommandés** :
- Schémas : https://app.diagrams.net/ ou https://excalidraw.com/
- QR Codes : https://www.qr-code-generator.com/
- Optimisation images : https://tinypng.com/
- Optimisation vidéos : FFmpeg

---

**Auteur** : Matthieu Alix
**Date création** : Octobre 2025
**Dernière révision** : Décembre 2025
**Statut** : ✅ Specs validées et implémentées
