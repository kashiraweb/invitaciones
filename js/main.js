/* =====================================================================
   INVITA-EXPRO · Lógica de la página principal
   Módulos: WhatsApp · Contacto · Navegación · Animaciones · Ejemplo · Catálogo
   ===================================================================== */
(function () {
    'use strict';

    const CFG = window.INVITA_CONFIG || {};
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ---------- WhatsApp ---------- */
    function whatsappLink(message) {
        const number = String(CFG.whatsappNumber || '').replace(/\D/g, '');
        const text = encodeURIComponent(message || CFG.whatsappMessage || '');
        // Sin número configurado, wa.me abre WhatsApp para elegir el contacto.
        return 'https://wa.me/' + number + '?text=' + text;
    }

    function setupWhatsAppLinks() {
        $$('[data-wa]').forEach(a => {
            let msg = CFG.whatsappMessage;
            if (a.dataset.waMsg === 'example') {
                msg = 'Hola, buenas tardes. Vi el ejemplo de invitación en INVITA-EXPRO y me gustaría ' +
                      'solicitar una invitación digital como esa para mi fiesta de expromoción. ' +
                      '¿Podrían brindarme más detalles? Muchas gracias.';
            }
            a.href = whatsappLink(msg);
        });
    }

    /* ---------- Datos de contacto (pie de página) ---------- */
    function setupContactInfo() {
        const number = String(CFG.whatsappNumber || '').replace(/\D/g, '');
        const wa = $('#footer-whatsapp');
        if (wa && number) {
            const link = document.createElement('a');
            link.href = whatsappLink();
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = '+' + number;
            wa.replaceWith(link);
        }

        const email = $('#footer-email');
        if (email && CFG.email) {
            const link = document.createElement('a');
            link.href = 'mailto:' + CFG.email;
            link.textContent = CFG.email;
            email.replaceWith(link);
        }
    }

    /* ---------- Menú y encabezado ---------- */
    function setupNavigation() {
        const header = $('#header');
        const toggle = $('#nav-toggle');
        const nav = $('#main-nav');

        const closeMenu = () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú');
        };

        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });
        $$('a', nav).forEach(a => a.addEventListener('click', closeMenu));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // Enlace activo según la sección visible
        const links = $$('.nav-link');
        const sections = links.map(l => $(l.getAttribute('href'))).filter(Boolean);
        if ('IntersectionObserver' in window) {
            const spy = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            sections.forEach(s => spy.observe(s));
        }
    }

    /* ---------- Animaciones al hacer scroll ---------- */
    function setupReveal() {
        const items = $$('.reveal');
        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('visible'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(el => io.observe(el));
    }

    /* ---------- Ejemplo: código QR ---------- */
    function setupExampleQr() {
        const img = $('#example-qr-img');
        const placeholder = $('#qr-placeholder');
        const live = $('#example-live');

        if (CFG.exampleUrl) {
            live.href = CFG.exampleUrl;
            live.hidden = false;
        }

        // Busca la primera imagen de QR disponible en assets/ejemplo/
        (function find(list, i) {
            if (i >= list.length) return;
            const probe = new Image();
            probe.onload = () => {
                img.src = list[i];
                img.hidden = false;
                placeholder.remove();
                if (CFG.exampleUrl) {
                    // Tocar el QR también abre el ejemplo
                    const a = document.createElement('a');
                    a.href = CFG.exampleUrl;
                    a.target = '_blank';
                    a.rel = 'noopener';
                    a.setAttribute('aria-label', 'Abrir el ejemplo de invitación');
                    img.replaceWith(a);
                    a.appendChild(img);
                }
            };
            probe.onerror = () => find(list, i + 1);
            probe.src = list[i];
        })(CFG.exampleQrCandidates || [], 0);
    }

    /* ---------- Botones "Ver diseños" → zona de catálogo ---------- */
    function setupCatalog() {
        const zone = $('#catalogo');
        const tag = $('#catalog-selected');
        const wa = $('#catalog-wa');

        $$('[data-categoria]').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.categoria;
                tag.textContent = 'Categoría: ' + cat;
                tag.hidden = false;
                wa.href = whatsappLink(
                    'Hola, buenas tardes. Me interesa la categoría "' + cat + '" de INVITA-EXPRO. ' +
                    '¿Podrían mostrarme los modelos disponibles? Muchas gracias.'
                );
                zone.scrollIntoView({ behavior: 'smooth', block: 'center' });
                zone.classList.remove('highlight');
                void zone.offsetWidth; // reinicia la animación
                zone.classList.add('highlight');
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupWhatsAppLinks();
        setupContactInfo();
        setupNavigation();
        setupReveal();
        setupExampleQr();
        setupCatalog();
    });
})();
