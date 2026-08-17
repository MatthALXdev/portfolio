/* =====================================================
   DevAlix Portfolio - Particules de fond ("mare au microscope")

   Points blancs en suspension au-dessus de l'aura :
   - chaque particule suit une vraie trajectoire (pas une simple
     oscillation sur place) : elle avance dans une direction qui
     dérive doucement au fil du temps, ce qui donne un parcours
     long et non-linéaire, différent pour chacune ;
   - quand une particule sort du cadre, elle "repop" ailleurs sur
     l'écran plutôt que de boucler mécaniquement en face ;
   - un décalage vertical rattrape le scroll avec un retard
     exponentiel (rapide au début, de plus en plus lent en
     s'approchant de la position finale) ;
   - une légère traînée lumineuse est laissée derrière chaque
     particule (fondu progressif du canvas au lieu d'un clear net).

   Purement décoratif : aucune interaction, pas de blocage du
   rendu si canvas indisponible, coupé sous prefers-reduced-motion.
   ===================================================== */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('aura-particles');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    const PARTICLE_COUNT = isMobile ? 22 : 48;
    const EDGE_MARGIN = 24; // marge avant repop : la particule sort bien du cadre
    const TRAIL_FADE = 0.16; // plus bas = traînée plus longue

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    // Sprite pré-rendu (point blanc) réutilisé pour chaque particule,
    // plutôt que de recréer un gradient à chaque frame. Cœur quasi plein
    // et net, très lumineux, avec juste un léger halo en bordure.
    const spriteSize = 48;
    const sprite = document.createElement('canvas');
    sprite.width = spriteSize;
    sprite.height = spriteSize;
    const spriteCtx = sprite.getContext('2d');
    const gradient = spriteCtx.createRadialGradient(
        spriteSize / 2, spriteSize / 2, 0,
        spriteSize / 2, spriteSize / 2, spriteSize / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.65, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, spriteSize, spriteSize);

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function createParticle() {
        const parallaxValue = randomBetween(0.15, 0.45);
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: randomBetween(0.5, 1.1),
            opacity: randomBetween(0.92, 1),
            // Cap (direction) qui dérive doucement dans le temps, plutôt
            // que de changer brutalement : trajectoire longue et courbe,
            // différente pour chaque particule.
            angle: Math.random() * Math.PI * 2,
            speed: randomBetween(0.018, 0.055), // px/ms
            turnFreq: randomBetween(0.4, 1.4),
            turnPhase: Math.random() * Math.PI * 2,
            turnAmount: randomBetween(0.006, 0.02),
            // Décalage lié au scroll : une impulsion proportionnelle à la
            // VITESSE de défilement (pas à la position absolue), qui se
            // résorbe ensuite vers 0. Comme un sédiment remué par le
            // courant puis qui se redépose — borné, quelle que soit la
            // longueur de la page (contrairement à un suivi de la
            // position absolue, qui ferait fuir les particules hors
            // champ en bas de page).
            parallax: parallaxValue,
            ease: randomBetween(0.02, 0.05),
            lagY: 0
        };
    }

    // Repositionne une particule "ailleurs sur l'écran" avec un tout
    // nouveau comportement (vitesse, cap, taille...), pour que le champ
    // de particules ne se répète jamais à l'identique.
    function respawn(p) {
        const fresh = createParticle();
        Object.assign(p, fresh);
    }

    let particles = [];

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    let lastScroll = window.scrollY || window.pageYOffset || 0;

    resize();
    initParticles();

    window.addEventListener('scroll', function() {
        const current = window.scrollY || window.pageYOffset || 0;
        const scrollDelta = current - lastScroll;
        lastScroll = current;
        for (let i = 0; i < particles.length; i++) {
            particles[i].lagY += scrollDelta * particles[i].parallax;
        }
    }, { passive: true });

    let resizeTimeout = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            resize();
            initParticles();
        }, 200);
    });

    let lastTime = 0;

    function updateParticle(p, dt, time) {
        p.angle += Math.sin(time * 0.0002 * p.turnFreq + p.turnPhase) * p.turnAmount;
        p.x += Math.cos(p.angle) * p.speed * dt;
        p.y += Math.sin(p.angle) * p.speed * dt;

        // Retour progressif vers 0 après l'impulsion de scroll (voir le
        // listener 'scroll' plus haut) : rapide au début, de plus en
        // plus lent en s'approchant du repos — régressif, comme demandé.
        p.lagY += (0 - p.lagY) * p.ease;
    }

    function draw(time) {
        const dt = lastTime ? Math.min(time - lastTime, 50) : 16;
        lastTime = time;

        // Traînée : on estompe légèrement l'existant au lieu de tout
        // effacer. destination-out ne fait que réduire l'alpha déjà
        // présent sur le canvas (qui reste transparent partout ailleurs),
        // donc ça ne teinte jamais le fond aura ni le contenu en dessous.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(0, 0, 0, ' + TRAIL_FADE + ')';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            updateParticle(p, dt, time);

            const renderY = p.y + p.lagY;
            const outOfBounds = p.x < -EDGE_MARGIN || p.x > width + EDGE_MARGIN ||
                renderY < -EDGE_MARGIN || renderY > height + EDGE_MARGIN;

            if (outOfBounds) {
                respawn(p);
                continue; // réapparaît à la frame suivante, à sa nouvelle position
            }

            const r = p.radius * 2.2;
            ctx.globalAlpha = p.opacity;
            ctx.drawImage(sprite, p.x - r, renderY - r, r * 2, r * 2);
        }

        ctx.globalAlpha = 1;
    }

    // Rendu statique (une seule frame, sans mouvement ni traînée) si
    // l'utilisateur préfère un affichage sans animation.
    if (reduceMotion) {
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const r = p.radius * 2.2;
            ctx.globalAlpha = p.opacity;
            ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
        }
        ctx.globalAlpha = 1;
        return;
    }

    let rafId = null;

    function loop(time) {
        draw(time);
        rafId = requestAnimationFrame(loop);
    }

    function start() {
        if (rafId === null) {
            rafId = requestAnimationFrame(loop);
        }
    }

    function stop() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    // Coupe la boucle quand l'onglet n'est pas visible (perf/batterie).
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });

    start();
});
