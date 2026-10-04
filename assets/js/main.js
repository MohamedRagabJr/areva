(function ($) {
  "use strict";

  const $documentOn = $(document);
  const $windowOn = $(window);

  $documentOn.ready(function () {
    /* ================================
       Mobile Menu Js Start
    ================================ */

    $("#mobile-menu").meanmenu({
      meanMenuContainer: ".mobile-menu",
      meanScreenWidth: "1199",
      meanExpand: ['<i class="far fa-plus"></i>'],
    });

    $("#mobile-menus").meanmenu({
      meanMenuContainer: ".mobile-menus",
      meanScreenWidth: "19920",
      meanExpand: ['<i class="far fa-plus"></i>'],
    });

    $documentOn.on("click", ".mean-expand", function () {
      let icon = $(this).find("i");

      if (icon.hasClass("fa-plus")) {
        icon.removeClass("fa-plus").addClass("fa-minus");
      } else {
        icon.removeClass("fa-minus").addClass("fa-plus");
      }
    });

    /* ================================
        Sidebar Toggle & Sticky Item Logic
        ================================ */

    // Open offcanvas
    $(".sidebar__toggle").on("click", function () {
      $(".offcanvas__info").addClass("info-open");
      $(".offcanvas__overlay").addClass("overlay-open");

      // Hide sticky item
      $(".sidebar-sticky-item").fadeOut().removeClass("active");
    });

    // Close offcanvas
    $(".offcanvas__close, .offcanvas__overlay").on("click", function () {
      $(".offcanvas__info").removeClass("info-open");
      $(".offcanvas__overlay").removeClass("overlay-open");

      // Show sticky item
      $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    /* ================================
        Body Overlay Js Start
        ================================ */

    $(".body-overlay").on("click", function () {
      $(".offcanvas__area").removeClass("offcanvas-opened");
      $(".df-search-area").removeClass("opened");
      $(".body-overlay").removeClass("opened");

      // Show sticky item when overlay clicked
      $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    /* ================================
        Offcanvas Link Click (Optional)
        ================================ */

    $(".offcanvas a").on("click", function () {
      $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    /* ================================
       Sticky Header Js Start
    ================================ */

    $windowOn.on("scroll", function () {
      if ($(this).scrollTop() > 250) {
        $("#header-sticky").addClass("sticky");
      } else {
        $("#header-sticky").removeClass("sticky");
      }
    });

    /* ================================
       Video & Image Popup Js Start
    ================================ */

    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    $(".video-popup").magnificPopup({
      type: "iframe",
      callbacks: {},
    });

    /* ================================
       Counterup Js Start
    ================================ */

    $(".count").counterUp({
      delay: 15,
      time: 4000,
    });

    /* ================================
       Wow Animation Js Start
    ================================ */

    new WOW().init();

    /* ================================
       Parallaxie Js Start
    ================================ */

    if ($(".parallaxie").length && $(window).width() > 991) {
      if ($(window).width() > 768) {
        $(".parallaxie").parallaxie({
          speed: 0.55,
          offset: 0,
        });
      }
    }

    /* ================================
      Project Slider Js Start
    ================================ */

    if ($(".project-slider-555").length > 0) {
      const projectSlider555 = new Swiper(".project-slider-555", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        //centeredSlides: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        breakpoints: {
          991: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 1.6,
          },
          575: {
            slidesPerView: 1.1,
          },
          0: {
            slidesPerView: 1.1,
          },
        },
      });
    }

    /* ================================
       Accordion Js Start
    ================================ */

    if ($(".accordion-box").length) {
      $(".accordion-box").on("click", ".acc-btn", function () {
        var outerBox = $(this).closest(".accordion-box");
        var target = $(this).closest(".accordion");
        var accBtn = $(this);
        var accContent = accBtn.next(".acc-content");

        if (target.hasClass("active-block")) {
          // Already open, so close it
          accBtn.removeClass("active");
          target.removeClass("active-block");
          accContent.slideUp(300);
        } else {
          // Close all others
          outerBox.find(".accordion").removeClass("active-block");
          outerBox.find(".acc-btn").removeClass("active");
          outerBox.find(".acc-content").slideUp(300);

          // Open clicked one
          accBtn.addClass("active");
          target.addClass("active-block");
          accContent.slideDown(300);
        }
      });
    }

    /* ================================
        Mouse Cursor Animation Js Start
    ================================ */
    if ($(".mouseCursor").length > 0) {
      function itCursor() {
        var myCursor = jQuery(".mouseCursor");
        if (myCursor.length) {
          if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
              t = document.querySelector(".cursor-outer");
            let n,
              i = 0,
              o = !1;
            window.onmousemove = function (s) {
              if (!o) {
                t.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)";
              }
              e.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)";
              n = s.clientY;
              i = s.clientX;
            };
            $("body").on(
              "mouseenter",
              "button, a, .cursor-pointer",
              function () {
                e.classList.add("cursor-hover");
                t.classList.add("cursor-hover");
              },
            );
            $("body").on(
              "mouseleave",
              "button, a, .cursor-pointer",
              function () {
                if (
                  !(
                    $(this).is("a", "button") &&
                    $(this).closest(".cursor-pointer").length
                  )
                ) {
                  e.classList.remove("cursor-hover");
                  t.classList.remove("cursor-hover");
                }
              },
            );
            e.style.visibility = "visible";
            t.style.visibility = "visible";
          }
        }
      }
      itCursor();
    }

    /* ================================
        Back To Top Button Js Start
    ================================ */
    $windowOn.on("scroll", function () {
      var windowScrollTop = $(this).scrollTop();
      var windowHeight = $(window).height();
      var documentHeight = $(document).height();

      if (windowScrollTop + windowHeight >= documentHeight - 10) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $documentOn.on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });

    /* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */

    if ($("#smooth-wrapper").length && $("#smooth-content").length) {
      gsap.registerPlugin(
        ScrollTrigger,
        ScrollSmoother,
        SplitText,
        ScrollToPlugin,
      );

      gsap.config({
        nullTargetWarn: false,
      });

      // Initialize ScrollSmoother
      let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });

      // After smoother initialized, run SplitText animations
      if ($(".tv_hero_title").length) {
        $(".tv_hero_title").each(function () {
          let $el = $(this);
          let split = new SplitText($el, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });

          gsap.set($el, { perspective: 400 });

          if ($el.hasClass("hero_title_1")) {
            gsap.set(split.chars, { x: 100, opacity: 0 });
          }
          if ($el.hasClass("hero_title_2")) {
            gsap.set(split.chars, { y: 100, opacity: 0 });
          }
          if ($el.hasClass("hero_title_3")) {
            gsap.set(split.chars, {
              y: 100,
              scaleY: 0,
              opacity: 0,
              rotationX: 15,
            });
          }

          // IMPORTANT: Use smoother effects
          gsap.to(split.chars, {
            scrollTrigger: {
              trigger: $el,
              start: "top 90%",
              scroller: smoother.scrollContainer, // 👈 this line is the key fix
              toggleActions: "play reverse play reverse",
              markers: false,
            },
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            rotationX: 15,
            delay: 0.1,
            ease: "power3.inOut",
          });
        });
      }

      // Update ScrollTrigger when smoother refreshes
      ScrollTrigger.addEventListener("refresh", () => smoother.refresh());
    }

    /* ================================
       Project Anim Js Start
    ================================ */

    if ($(".tp-project-5-2-area").length > 0) {
      let project_text = gsap.timeline({
        scrollTrigger: {
          trigger: ".tp-project-5-2-area",
          start: "top center-=350",
          end: "bottom 50%",
          pin: ".tp-project-5-2-title",
          markers: false,
          pinSpacing: false,
          scrub: 1,
        },
      });
      project_text.set(".tp-project-5-2-title", {
        scale: 0.6,
        duration: 2,
      });
      project_text.to(".tp-project-5-2-title", {
        scale: 1,
        duration: 2,
      });
      project_text.to(
        ".tp-project-5-2-title",
        {
          scale: 1,
          duration: 2,
        },
        "+=2",
      );

      project_text.to(".tp-project-5-2-title", {
        autoAlpha: 0,
        duration: 2,
      });
    }

    /* ================================
       Title SplitText Js Start
    ================================ */

    if ($(".wt-about-title").length > 0) {
      let cta = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".wt-about-title",
          start: "bottom 100%-=50px",
        },
      });
      gsap.set(".wt-about-title", {
        opacity: 0,
      });
      gsap.to(".wt-about-title", {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".wt-about-title",
          start: "bottom 100%-=50px",
          once: true,
        },
      });

      let mySplitText = new SplitText(".wt-about-title", {
        type: "words,chars",
      });
      let chars = mySplitText.chars;
      let endGradient = chroma.scale(["#888", "#888", "#888", "#888", "#888"]);
      cta.to(chars, {
        duration: 0.5,
        scaleY: 0.6,
        ease: "power1.out",
        stagger: 0.04,
        transformOrigin: "center bottom",
      });
      cta.to(
        chars,
        {
          yPercent: -20,
          ease: "elastic",
          stagger: 0.03,
          duration: 0.8,
        },
        0.5,
      );
      cta.to(
        chars,
        {
          scaleY: 1,
          ease: "elastic.out",
          stagger: 0.03,
          duration: 1.5,
        },
        0.5,
      );
      cta.to(
        chars,
        {
          color: (i, el, arr) => {
            return endGradient(i / arr.length).hex();
          },
          ease: "power1.out",
          stagger: 0.03,
          duration: 0.3,
        },
        0.5,
      );
      cta.to(
        chars,
        {
          yPercent: 0,
          ease: "back",
          stagger: 0.03,
          duration: 0.8,
        },
        0.7,
      );
      cta.to(chars, {
        color: "#888",
        duration: 1.4,
        stagger: 0.05,
      });
    }

    /* ================================
       Service Panel Js Start
    ================================ */

    let sv = gsap.matchMedia();
    sv.add("(min-width: 1199px)", () => {
      let tl = gsap.timeline();
      let projectpanels = document.querySelectorAll(".tp-service-panel");
      let baseOffset = 150;
      let offsetIncrement = 120;

      projectpanels.forEach((section, index) => {
        let topOffset = baseOffset + index * offsetIncrement;
        tl.to(section, {
          scrollTrigger: {
            trigger: section,
            pin: section,
            scrub: 1,
            start: `top ${topOffset}px`,
            end: "bottom 50%",
            endTrigger: ".tp-service-pin",
            pinSpacing: false,
            markers: false,
          },
        });
      });
    });

    let sv2 = gsap.matchMedia();
    sv2.add("(min-width: 1199px)", () => {
      let tl = gsap.timeline();
      let projectpanels = document.querySelectorAll(".tp-service-panel2");
      let baseOffset = 150;
      let offsetIncrement = 120;

      projectpanels.forEach((section, index) => {
        let topOffset = baseOffset + index * offsetIncrement;
        tl.to(section, {
          scrollTrigger: {
            trigger: section,
            pin: section,
            scrub: 1,
            start: `top ${topOffset}px`,
            end: "bottom 55%",
            endTrigger: ".tp-service-pin2",
            pinSpacing: false,
            markers: false,
          },
        });
      });
    });

    /* ================================
       Text Up Js Start
    ================================ */

    // Text Up Scroll
    if ($(".text-splite-up").length > 0) {
      let splitTitleLines = gsap.utils.toArray(".text-splite-up");
      splitTitleLines.forEach((splitTextLine) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: "top 90%",
            end: "bottom 80%",
            scrub: 1,
            markers: false,
            toggleActions: "play none none none",
          },
        });

        const itemSplitted = new SplitText(splitTextLine, {
          type: "words, lines",
        });
        gsap.set(splitTextLine, {
          perspective: 400,
        });
        itemSplitted.split({
          type: "lines",
        });
        tl.from(itemSplitted.lines, {
          duration: 1,
          delay: 0.3,
          opacity: 0,
          rotationX: -80,
          force3D: true,
          transformOrigin: "top center -50",
          stagger: 0.1,
        });
      });
    }

    /* ================================
      Text Invert Js Start
    ================================ */

    const split = new SplitText(".text_invert", { type: "lines" });

    split.lines.forEach((target) => {
      gsap.to(target, {
        backgroundPositionX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          scrub: 1,
          start: "top 85%",
          end: "bottom center",
        },
      });
    });

    const split2 = new SplitText(".text_invert-2", { type: "lines" });

    split2.lines.forEach((target) => {
      gsap.to(target, {
        backgroundPositionX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          scrub: 1,
          start: "top 85%",
          end: "bottom center",
        },
      });
    });

    /* ================================
       Des Portfolio Anim Js Start
    ================================ */

    if (document.querySelector(".des-portfolio-wrap")) {
      const pr = ScrollTrigger.matchMedia();

      pr.add("(min-width: 1199px)", () => {
        const sections = document.querySelectorAll(".des-portfolio-panel");
        const wrap = document.querySelector(".des-portfolio-wrap");

        if (!sections.length || !wrap) return;

        // Initial state
        gsap.set(sections, { scale: 1 });

        // Animate each section except the last one
        sections.forEach((section, index) => {
          const isLast = index === sections.length - 1;

          gsap.to(section, {
            scale: isLast ? 1 : 0.8, // 👈 last one stays full-size
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 14%",
              end: "bottom 60%",
              scrub: true,
              pin: true,
              pinSpacing: false,
              endTrigger: wrap,
              markers: false,
            },
          });
        });

        // Cleanup on condition change
        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      });
    }

    /* ================================
       Approach Anim Js Start
    ================================ */

    if (document.querySelectorAll(".approach-area").length > 0) {
      const boxes = document.querySelectorAll(".approach-area .approach-box");

      gsap.from(boxes, {
        x: "100%",
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          scrub: 2,
          trigger: ".approach-wrapper-box",
          start: "top 100%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (document.querySelectorAll(".grow").length > 0) {
      document.querySelectorAll(".grow").forEach((item) => {
        gsap.fromTo(
          item,
          { x: 200, opacity: 0 }, // right side theke asbe
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              scrub: 2,
              start: "top 90%",
              end: "top 50%",
            },
          },
        );
      });
    }

    if (document.querySelectorAll(".grow2").length > 0) {
      document.querySelectorAll(".grow2").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -200, opacity: 0 }, // left theke asbe
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              scrub: 2,
              start: "top 90%",
              end: "top 50%",
            },
          },
        );
      });
    }

    // ===============================
    // THEME TOGGLE (Default Light Load)
    // ===============================

    // Set Theme Function
    function setTheme(theme) {
      // Remove any previous theme
      $("html").removeClass("dark-theme white-theme").addClass(theme);

      // Update Toggle UI
      const $options = $(".quick-switch .quick-option");
      $options.removeClass("selected");

      if (theme === "dark-theme") {
        $(".quick-option.dark").addClass("selected");
      } else {
        $(".quick-option.light").addClass("selected");
      }
    }

    // Toggle Theme on Click
    $(".quick-switch").on("click", function () {
      const isDark = $("html").hasClass("dark-theme");
      const newTheme = isDark ? "white-theme" : "dark-theme";
      setTheme(newTheme);
    });

    // Restore saved theme on page load (default: white-theme)
    var savedTheme = localStorage.getItem("areva-theme") || "white-theme";
    setTheme(savedTheme);

    // Save to localStorage whenever user toggles
    $(".quick-switch").off("click").on("click", function () {
      const isDark = $("html").hasClass("dark-theme");
      const newTheme = isDark ? "white-theme" : "dark-theme";
      setTheme(newTheme);
      localStorage.setItem("areva-theme", newTheme);
    });
  }); // End Document Ready Function

  /* ================================
      Preloader Js Start
    ================================ */

  function preloader() {
    $(window).on("load", function () {
      const svg = document.getElementById("svg");
      if (!svg) return; // safety check if SVG not found

      const tl = gsap.timeline();

      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

      // Animate preloader text (if exists)
      if ($(".preloader-text").length) {
        tl.to(".preloader-text", {
          delay: 0.3,
          y: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Animate SVG wave
      tl.to(svg, {
        duration: 0.3,
        attr: { d: curve },
        ease: "power2.in",
      }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.out",
      });

      // Slide preloader up and hide
      tl.to(".preloader", {
        y: -1500,
        duration: 0.8,
        ease: "power2.inOut",
      }).set(".preloader", { display: "none", zIndex: -1 });

      // Animate main hero image
      if ($(".animated-image").length) {
        tl.fromTo(
          ".animated-image",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }
    });
  }
  // Init preloader
  preloader();

  /* ================================
       Type Text Js Start
    ================================ */

  (function ($) {
    "use strict";

    $(document).ready(function () {
      const $el = $("#typing-text");
      if (!$el.length) return; // stop if element not exist

      const words = ["Developer", "Visual Designer", "Crypto"];
      let index = 0;
      let letterIndex = 0;
      let isDeleting = false;
      let interval;

      function typeEffect() {
        const currentWord = words[index];
        if (!isDeleting && letterIndex <= currentWord.length) {
          $el.text(currentWord.substring(0, letterIndex));
          letterIndex++;
        } else if (isDeleting && letterIndex >= 0) {
          $el.text(currentWord.substring(0, letterIndex));
          letterIndex--;
        }

        if (letterIndex > currentWord.length) {
          isDeleting = true;
          clearInterval(interval);
          interval = setInterval(typeEffect, 100);
        } else if (letterIndex < 0) {
          isDeleting = false;
          index = (index + 1) % words.length;
          clearInterval(interval);
          interval = setInterval(typeEffect, 150);
        }
      }

      interval = setInterval(typeEffect, 150);
    });
  })(jQuery);
  // Type Text Area End
})(jQuery); // End jQuery
/* ================================
       Video Banner — Width expand on scroll
       Starts narrow + tall, expands to full width as you scroll
    ================================ */
(function () {
  if (!document.querySelector(".video-image1")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    ".video-image1",
    { clipPath: "inset(8% 32% 8% 32% round 12px)" },
    {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      ease: "none",
      scrollTrigger: {
        trigger: ".video-banner-section",
        start: "top 85%",
        end: "top 5%",
        scrub: 1.4,
        markers: false,
        toggleActions: "play reverse play reverse",
      },
    },
  );
})();
