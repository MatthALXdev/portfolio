# 🚢 Guide de Déploiement - Portfolio DevAlix

> Procédures complètes de déploiement pour tous les environnements (dev, staging, production).

**Version** : 1.0
**Dernière mise à jour** : Décembre 2025

---

## Table des Matières

1. [Prérequis](#prérequis)
2. [Développement Local](#développement-local)
3. [Production VPS](#production-vps)
4. [Mise à Jour](#mise-à-jour)
5. [Rollback](#rollback)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Prérequis

### Outils Nécessaires

**Développement Local** :
- Python 3.8+ (pour http.server)
- OU Docker 24+ & Docker Compose v2+
- Git 2.30+
- Navigateur moderne (Chrome, Firefox, Safari)

**Production VPS** :
- VPS avec IP publique
- Ubuntu 22.04 LTS (recommandé)
- Docker 24+ & Docker Compose v2+
- Traefik v3 configuré
- DNS configuré (A record)
- Accès SSH (clés ED25519)

### Vérifications Préalables

```bash
# Vérifier versions
docker --version          # → Docker version 24.0.0+
docker compose version    # → Docker Compose version v2.20.0+
git --version            # → git version 2.30.0+

# Vérifier accès Docker
docker ps                # → Liste conteneurs actifs

# Vérifier réseau Traefik (production)
docker network ls | grep traefik
# → traefik-network
```

---

## 💻 Développement Local

### Méthode 1 : Python HTTP Server (Rapide)

**Avantages** :
- ✅ Aucune installation requise
- ✅ Démarrage instantané
- ✅ Idéal pour tests rapides

**Commandes** :
```bash
# Naviguer vers le projet
cd portfolio

# Démarrer serveur
python3 -m http.server 8080

# Accès : http://localhost:8080
```

**Tests** :
```bash
# Dans un autre terminal
curl -I http://localhost:8080
# → HTTP/1.0 200 OK

# Ouvrir navigateur
xdg-open http://localhost:8080  # Linux
open http://localhost:8080      # macOS
```

**Arrêt** :
```bash
# Ctrl+C dans le terminal du serveur
```

---

### Méthode 2 : Live Server (VSCode)

**Extension VSCode** : Live Server by Ritwick Dey

**Avantages** :
- ✅ Hot reload automatique
- ✅ Intégration IDE
- ✅ Multi-navigateurs

**Utilisation** :
1. Installer extension Live Server
2. Ouvrir `index.html`
3. Clic droit → "Open with Live Server"
4. Accès : http://127.0.0.1:5500

---

### Méthode 3 : Docker Local (Sans Traefik)

**Utilisation** : Tests d'intégration Docker

```bash
# Build image
docker build -t portfolio:local .

# Run conteneur
docker run -d \
  --name portfolio-local \
  -p 8080:80 \
  portfolio:local

# Accès : http://localhost:8080

# Logs
docker logs -f portfolio-local

# Arrêt & nettoyage
docker stop portfolio-local
docker rm portfolio-local
```

---

## ☁️ Production VPS

### Prérequis Production

**Infrastructure** :
- ✅ VPS OVH Ubuntu 22.04
- ✅ IP publique : `37.59.115.242` (exemple)
- ✅ Traefik v3 opérationnel
- ✅ Réseau Docker `traefik-network` créé
- ✅ Firewall UFW configuré (ports 22, 80, 443)

**DNS (OVH)** :
```
Type: A
Nom: me
Cible: 37.59.115.242
TTL: 300
```

**Vérification DNS** :
```bash
# Depuis local
dig me.devamalix.fr
# → ANSWER SECTION: me.devamalix.fr. 300 IN A 37.59.115.242

nslookup me.devamalix.fr
# → Address: 37.59.115.242
```

---

### Déploiement Initial

#### 1. Préparer VPS

```bash
# Connexion SSH
ssh ubuntu@37.59.115.242

# Mettre à jour système
sudo apt update && sudo apt upgrade -y

# Vérifier Docker
docker --version
docker compose version

# Vérifier Traefik
docker ps | grep traefik
# → traefik   Up 5 days

# Vérifier réseau
docker network ls | grep traefik
# → traefik-network
```

#### 2. Cloner Repository

```bash
# Naviguer vers home
cd /home/ubuntu

# Cloner (HTTPS ou SSH)
git clone https://github.com/MatthALXdev/portfolio.git
# OU
git clone git@github.com:MatthALXdev/portfolio.git

# Entrer dans le projet
cd portfolio
```

#### 3. Configuration

```bash
# Vérifier docker-compose.yml
cat docker-compose.yml
# → Host(`me.devamalix.fr`)
# → certresolver=letsencrypt

# Vérifier nginx.conf
cat nginx.conf
# → Gzip, cache headers, security headers
```

#### 4. Déploiement

```bash
# Build et démarrer
docker compose up -d --build

# Vérifier status
docker compose ps
# → portfolio   running   healthy

# Attendre certificat TLS (1-2 min première fois)
docker compose logs -f portfolio
# → "Certificate obtained for domain me.devamalix.fr"
```

#### 5. Vérifications

```bash
# Test HTTP → HTTPS redirect
curl -I http://me.devamalix.fr
# → HTTP/1.1 301 Moved Permanently
# → Location: https://me.devamalix.fr

# Test HTTPS
curl -I https://me.devamalix.fr
# → HTTP/2 200
# → strict-transport-security: max-age=31536000

# Test certificat TLS
echo | openssl s_client -connect me.devamalix.fr:443 -servername me.devamalix.fr 2>/dev/null | openssl x509 -noout -dates
# → notBefore=Dec 10 00:00:00 2025 GMT
# → notAfter=Mar 10 23:59:59 2026 GMT (3 mois)

# Test dans navigateur
# → https://me.devamalix.fr
# → Cadenas vert ✅
```

---

### Configuration Traefik

**Vérifier labels Traefik** :
```bash
docker inspect portfolio | grep traefik
# → traefik.enable=true
# → traefik.http.routers.portfolio.rule=Host(`me.devamalix.fr`)
# → traefik.http.routers.portfolio.entrypoints=websecure
# → traefik.http.routers.portfolio.tls.certresolver=letsencrypt
```

**Vérifier dashboard Traefik** (si activé) :
```
http://traefik.devamalix.fr/dashboard/
→ Routers → portfolio@docker
→ Services → portfolio@docker
→ Certificates → me.devamalix.fr (Let's Encrypt)
```

---

## 🔄 Mise à Jour

### Mise à Jour Code

**Workflow** :
1. Push modifications sur GitHub (branche, puis PR)
2. Pull sur VPS
3. Rebuild conteneur
4. Vérification

**Commandes VPS** :
```bash
# Connexion SSH
ssh ubuntu@37.59.115.242

# Naviguer projet
cd /home/ubuntu/portfolio

# Pull dernières modifications
git pull origin main

# Rebuild et redémarrer (downtime ~5-10 sec)
docker compose up -d --build

# Vérifier logs
docker compose logs -f portfolio

# Tester site
curl -I https://me.devamalix.fr
```

---

### Mise à Jour Nginx

**Modifications** : `nginx.conf`

```bash
# Éditer configuration locale
nano nginx.conf

# Commit & push
git add nginx.conf
git commit -m "chore: update nginx configuration"
git push

# Sur VPS
cd /home/ubuntu/portfolio
git pull
docker compose up -d --build
```

---

### Mise à Jour Image Nginx

**Rebuild avec nouvelle version** :

```bash
# Sur VPS
cd /home/ubuntu/portfolio

# Pull nouvelle image nginx:alpine
docker pull nginx:alpine

# Rebuild portfolio
docker compose up -d --build

# Vérifier version
docker exec portfolio nginx -v
# → nginx version: nginx/1.25.x
```

---

## ⏮️ Rollback

### Rollback Git

**En cas de bug après déploiement** :

```bash
# Sur VPS
cd /home/ubuntu/portfolio

# Lister commits récents
git log --oneline -5
# → abc1234 feat: add new section
# → def5678 fix: correct typo
# → ghi9012 chore: update readme

# Rollback au commit précédent
git checkout def5678

# Rebuild
docker compose up -d --build

# Tester
curl -I https://me.devamalix.fr

# Si OK, créer branche de fix
git checkout -b hotfix/rollback
git push origin hotfix/rollback
```

---

### Rollback Image Docker

**Utiliser image précédente** :

```bash
# Lister images locales
docker images | grep portfolio
# → portfolio   latest   abc123   2 hours ago
# → portfolio   <none>   def456   1 day ago

# Tag ancienne image
docker tag def456 portfolio:rollback

# Modifier docker-compose.yml temporairement
# image: portfolio:rollback

# Redémarrer
docker compose up -d

# Vérifier
curl -I https://me.devamalix.fr
```

---

## 🐛 Troubleshooting

### Problème : Site inaccessible (404)

**Symptômes** :
```bash
curl https://me.devamalix.fr
# → 404 Not Found
```

**Diagnostic** :
```bash
# 1. Vérifier conteneur
docker compose ps
# → Si absent ou unhealthy

# 2. Vérifier logs
docker compose logs portfolio
# → Erreur nginx config ?

# 3. Vérifier Traefik
docker logs traefik | grep portfolio
# → Route introuvable ?

# 4. Vérifier DNS
dig me.devamalix.fr
# → Bonne IP ?
```

**Solutions** :
```bash
# Redémarrer conteneur
docker compose restart portfolio

# Rebuild si config modifiée
docker compose up -d --build

# Vérifier labels Traefik
docker inspect portfolio | grep traefik.http.routers
```

---

### Problème : Certificat TLS invalide

**Symptômes** :
- Navigateur affiche "Connexion non sécurisée"
- Certificat self-signed ou expiré

**Diagnostic** :
```bash
# Vérifier certificat
echo | openssl s_client -connect me.devamalix.fr:443 -servername me.devamalix.fr 2>/dev/null | openssl x509 -noout -issuer -dates
# → Issuer: CN=R3,O=Let's Encrypt (correct)
# → notAfter: (date future)
```

**Solutions** :
```bash
# Vérifier logs Traefik
docker logs traefik | grep "me.devamalix.fr"
# → Erreur ACME challenge ?

# Forcer renouvellement
docker compose down
rm -rf /path/to/traefik/letsencrypt/acme.json
# ⚠️ ATTENTION : Supprime TOUS les certificats !
docker compose up -d
```

---

### Problème : 502 Bad Gateway

**Symptômes** :
```bash
curl https://me.devamalix.fr
# → 502 Bad Gateway
```

**Diagnostic** :
```bash
# 1. Vérifier conteneur portfolio
docker compose ps
# → État : restarting / unhealthy

# 2. Logs portfolio
docker compose logs portfolio
# → Erreur nginx startup ?

# 3. Healthcheck
docker inspect portfolio | grep -A 10 Health
# → Status: unhealthy
```

**Solutions** :
```bash
# Vérifier config nginx
docker exec portfolio nginx -t
# → nginx: configuration file /etc/nginx/nginx.conf test failed

# Corriger config et rebuild
docker compose up -d --build

# Restart si config OK
docker compose restart portfolio
```

---

### Problème : Styles Tailwind CSS ne chargent pas

**Symptômes** :
- Site s'affiche sans styles
- Console navigateur : Failed to load Tailwind CDN

**Diagnostic** :
```bash
# Vérifier source HTML
curl https://me.devamalix.fr | grep tailwindcss
# → <script src="https://cdn.tailwindcss.com"></script>

# Tester CDN
curl -I https://cdn.tailwindcss.com
# → 200 OK (CDN accessible)
```

**Solutions** :
- Vérifier bloqueur pub navigateur (désactiver)
- Tester en navigation privée
- Vérifier Content Security Policy (CSP headers)

---

### Problème : Vidéos ne se chargent pas

**Symptômes** :
- Placeholder vidéo noir
- Console : Failed to load video

**Diagnostic** :
```bash
# Vérifier fichiers vidéo présents
docker exec portfolio ls -lh /usr/share/nginx/html/assets/demos/
# → pyx-demo.webm, pyx-demo.mp4, etc.

# Tester accès direct
curl -I https://me.devamalix.fr/assets/demos/pyx-demo.webm
# → 200 OK (ou 404 si absent)
```

**Solutions** :
```bash
# Copier vidéos manquantes
docker cp pyx-demo.webm portfolio:/usr/share/nginx/html/assets/demos/

# OU rebuild avec assets
docker compose up -d --build
```

---

## 📋 Checklist Déploiement Production

**Avant déploiement** :
- [ ] Code testé en local (Python server)
- [ ] Code testé en local (Docker, `docker-compose.dev.yml`)
- [ ] DNS configuré (A record)
- [ ] Traefik opérationnel sur VPS
- [ ] Réseau `traefik-network` existe
- [ ] Firewall UFW configuré (22, 80, 443)
- [ ] Git repo à jour

**Pendant déploiement** :
- [ ] Repository cloné sur VPS
- [ ] `docker-compose.yml` vérifié (Host correct)
- [ ] Build & start réussi
- [ ] Conteneur healthy
- [ ] Certificat TLS obtenu (1-2 min)

**Après déploiement** :
- [ ] HTTPS accessible (cadenas vert)
- [ ] HTTP → HTTPS redirect fonctionne
- [ ] Toutes les pages/sections chargent
- [ ] Vidéos démo autoplay
- [ ] QR codes visibles (desktop)
- [ ] Modals s'ouvrent correctement
- [ ] CV téléchargeable
- [ ] Liens sociaux actifs
- [ ] Test responsive (mobile)
- [ ] Lighthouse score > 90

---

## 📚 Ressources

**Documentation** :
- Docker Compose : https://docs.docker.com/compose/
- Traefik : https://doc.traefik.io/traefik/
- Let's Encrypt : https://letsencrypt.org/docs/
- Nginx : https://nginx.org/en/docs/

**Outils** :
- DNS Check : https://dnschecker.org/
- SSL Test : https://www.ssllabs.com/ssltest/
- Lighthouse : https://pagespeed.web.dev/

---

**Auteur** : Matthieu Alix
**Dernière mise à jour** : Décembre 2025
**Statut** : ✅ Testé en production
