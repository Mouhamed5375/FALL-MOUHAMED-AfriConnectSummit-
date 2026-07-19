document.addEventListener('DOMContentLoaded', () => {
    // 1.le dark mode / light mode 
    // - Le thème choisi est stocké dans localStorage
    // - Il est appliqué via l'attribut [data-theme] sur <html>
    // - Persiste entre les pages et les rechargements

    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        }
    }

    // Au chargement : on lit la preference sauvegarde (ou clair par defaut)
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        })
    }

    // navbar dynamique
    // - Fond + ombre apparaissent après 80px de défilement
    // - Menu hamburger ouvre/ferme la navigation sur mobile

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navbarNav = document.getElementById('navbarNav');
    const navLinks = navbarNav ? navbarNav.querySelector('.navbar-links') : null;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        })
        // Ferme le menu mobile après un clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // annee dynamique
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});