/* ============================================================
   TRASTEOS Y MUDANZAS ALFRED — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------
       1. NAVBAR: Scroll effect + Mobile toggle
    ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menú');
        });
    });

    /* ----------------------------------------------------------
       2. NAVBAR: Active link on scroll
    ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(section => sectionObserver.observe(section));

    /* ----------------------------------------------------------
       3. SCROLL REVEAL ANIMATION
    ---------------------------------------------------------- */
    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const siblings = entry.target.parentElement
                            ? [...entry.target.parentElement.querySelectorAll('[data-reveal]')]
                            : [];
                        const staggerIndex = siblings.indexOf(entry.target);
                        const delay = staggerIndex >= 0 ? staggerIndex * 80 : 0;

                        setTimeout(() => entry.target.classList.add('revealed'), delay);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll('[data-reveal]').forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('[data-reveal]').forEach(el => {
            el.classList.add('revealed');
        });
    }

    /* ----------------------------------------------------------
       4. SMOOTH SCROLL
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const navbarHeight = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
                10
            ) || 72;

            const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    });

    /* ----------------------------------------------------------
       5. FLOATING WHATSAPP
    ---------------------------------------------------------- */
    const fab = document.getElementById('whatsappFab');
    if (fab && !prefersReducedMotion) {
        fab.style.opacity = '0';
        fab.style.transform = 'scale(0.8)';
        fab.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
            fab.style.opacity = '1';
            fab.style.transform = 'scale(1)';
        }, 3000);
    }

    /* ----------------------------------------------------------
       6. MOBILE CTA BAR
    ---------------------------------------------------------- */
    const mobileCta = document.getElementById('mobileCta');
    const hero = document.getElementById('inicio');

    if (mobileCta && hero) {
        const mobileCtaObserver = new IntersectionObserver(
            ([entry]) => {
                const isMobile = window.innerWidth <= 768;
                mobileCta.classList.toggle('is-visible', isMobile && !entry.isIntersecting);
                mobileCta.setAttribute('aria-hidden', !(isMobile && !entry.isIntersecting));
            },
            { threshold: 0 }
        );

        mobileCtaObserver.observe(hero);
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileCta.classList.remove('is-visible');
                mobileCta.setAttribute('aria-hidden', 'true');
            }
        }, { passive: true });
    }

    /* ----------------------------------------------------------
       7. HOVER EFFECTS (desktop only)
    ---------------------------------------------------------- */
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.servicio-card').forEach(card => {
            const img = card.querySelector('.servicio-card__img');
            if (!img) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                img.style.transform = `scale(1.08) translate(${x * 8}px, ${y * 8}px)`;
            });

            card.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });
        });

        document.querySelectorAll('.ventaja-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const xPct = (e.clientX - rect.left) / rect.width - 0.5;
                const yPct = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-4px) rotateX(${-yPct * 5}deg) rotateY(${xPct * 5}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /* ----------------------------------------------------------
       8. GOOGLE ANALYTICS EVENTS
    ---------------------------------------------------------- */
    const trackEvent = (name, params = {}) => {
        if (typeof gtag === 'function') {
            gtag('event', name, params);
        }
    };

    document.querySelectorAll('.track-whatsapp').forEach(el => {
        el.addEventListener('click', () => {
            trackEvent('whatsapp_click', {
                event_category: 'conversion',
                event_label: el.dataset.track || 'unknown'
            });
        });
    });

    document.querySelectorAll('.track-phone').forEach(el => {
        el.addEventListener('click', () => {
            trackEvent('phone_click', {
                event_category: 'conversion',
                event_label: el.dataset.track || 'unknown'
            });
        });
    });

    document.querySelectorAll('.track-review').forEach(el => {
        el.addEventListener('click', () => {
            trackEvent('review_click', {
                event_category: 'engagement',
                event_label: el.dataset.track || 'google-review'
            });
        });
    });

    document.querySelectorAll('.track-instagram').forEach(el => {
        el.addEventListener('click', () => {
            trackEvent('instagram_click', {
                event_category: 'engagement',
                event_label: el.dataset.track || 'instagram'
            });
        });
    });

});
