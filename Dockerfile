# =====================================================
# DevAlix Portfolio - Dockerfile
# =====================================================
# Nginx Alpine pour servir le site statique

FROM nginx:alpine

# Copier les fichiers du portfolio
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Configuration nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]
