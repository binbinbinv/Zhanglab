// Main JS for Zhanglab site
// - Handles: smooth scrolling, nav toggle (ARIA), accessible carousel, page load animations
(function () {
    'use strict';

    function onReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    onReady(function () {
        // Smooth scroll for internal anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navigation toggle (mobile) with ARIA
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            });

            // Close menu on link click (mobile)
            navMenu.querySelectorAll('a').forEach(item => {
                item.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Header style on scroll (lightweight)
        const header = document.querySelector('header');
        if (header) {
            const scroller = function () {
                if (window.scrollY > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = 'none';
                }
            };
            window.addEventListener('scroll', scroller);
            scroller();
        }

        // Page load animation for cards
        window.addEventListener('load', function () {
            const cards = document.querySelectorAll('.research-card, .team-member, .publication');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease ' + (index * 0.06) + 's';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 80 + index * 60);
            });
        });

        // Accessible carousel
        (function setupCarousel() {
            const carousel = document.querySelector('.hero-carousel');
            if (!carousel) return;

            const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
            const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
            let current = slides.findIndex(s => s.classList.contains('active')) || 0;
            let timer = null;
            const intervalMs = 4000;

            function updateAria() {
                slides.forEach((s, i) => s.setAttribute('aria-hidden', i === current ? 'false' : 'true'));
                dots.forEach((d, i) => d.setAttribute('aria-pressed', i === current ? 'true' : 'false'));
            }

            function showSlide(idx) {
                slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
                dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
                current = idx;
                updateAria();
            }

            function nextSlide() { showSlide((current + 1) % slides.length); }

            function resetTimer() {
                if (timer) clearInterval(timer);
                timer = setInterval(nextSlide, intervalMs);
            }

            // initialize aria roles
            slides.forEach((s, i) => s.setAttribute('role', 'group'));
            dots.forEach((d, i) => d.setAttribute('role', 'button'));
            updateAria();
            resetTimer();

            // Pause on hover/focus
            carousel.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
            carousel.addEventListener('mouseleave', () => resetTimer());

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => { showSlide(i); resetTimer(); });
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showSlide(i); resetTimer(); }
                });
            });
        })();
    });
})();
