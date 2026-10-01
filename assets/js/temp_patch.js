
    /* ================================
       Video Banner — Width expand on scroll
       Starts as a narrow centered strip, expands to full width
    ================================ */
    (function() {
        if (!document.querySelector('.video-image1')) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            '.video-image1',
            { clipPath: 'inset(8% 32% 8% 32% round 12px)' },
            {
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.video-banner-section',
                    start: 'top 85%',
                    end: 'top 5%',
                    scrub: 1.4,
                    markers: false,
                    toggleActions: 'play reverse play reverse',
                }
            }
        );
    })();

