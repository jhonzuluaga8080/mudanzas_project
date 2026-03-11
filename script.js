/* ============================================================
   TRASTEOS Y MUDANZAS ALFRED — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. NAVBAR: Scroll effect + Mobile toggle
    ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Add .scrolled class when user scrolls past 50px
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on load

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ----------------------------------------------------------
       2. NAVBAR: Active link on scroll (Intersection Observer)
    ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
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
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation for sibling cards
                    const siblings = entry.target.parentElement
                        ? [...entry.target.parentElement.querySelectorAll('[data-reveal]')]
                        : [];
                    const staggerIndex = siblings.indexOf(entry.target);
                    const delay = staggerIndex >= 0 ? staggerIndex * 80 : 0;

                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    /* ----------------------------------------------------------
       4. SMOOTH SCROLL (for anchor buttons)
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
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    /* ----------------------------------------------------------
       5. FLOATING WHATSAPP: Show after 3 seconds
    ---------------------------------------------------------- */
    const fab = document.getElementById('whatsappFab');
    if (fab) {
        fab.style.opacity = '0';
        fab.style.transform = 'scale(0.8)';
        fab.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
            fab.style.opacity = '1';
            fab.style.transform = 'scale(1)';
        }, 3000);
    }

    /* ----------------------------------------------------------
       6. SERVICE CARDS: Image parallax on hover
    ---------------------------------------------------------- */
    document.querySelectorAll('.servicio-card').forEach(card => {
        const img = card.querySelector('.servicio-card__img');
        if (!img) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            img.style.transform = `scale(1.08) translate(${x * 8}px, ${y * 8}px)`;
        });

        card.addEventListener('mouseleave', () => {
            img.style.transform = '';
        });
    });

    /* ----------------------------------------------------------
       7. VENTAJA CARDS: Subtle tilt on hover
    ---------------------------------------------------------- */
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

});
