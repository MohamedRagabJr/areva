(function ($) {
  "use strict";

  // 👉 background image set function
  $("[data-background]").each(function () {
    const bg = $(this).attr("data-background");
    $(this).css("background-image", `url(${bg})`);
  });

  //portfolio-slider
  $('.gt-portfolio-11-slider-active').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-angle-right"></i></button>',
    arrows: true,
    fade: true,
    speed: 1000,
    asNavFor: '.gt-portfolio-11-slider-nav-active',
  });

  var helpers = {
    addZeros: function (n) {
      return (n < 10) ? '0' + n : '' + n;
    }
  };

  function sliderInit() {
    var $slider = $('.gt-portfolio-11-slider-nav-active');
    $slider.each(function () {
      var $sliderParent = $(this).parent();
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.gt-portfolio-11-slider-active',
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-angle-right"></i></button>',
        dots: false,
        focusOnSelect: true,
        centerPadding: '0',
        speed: 600,
        responsive: [
          { breakpoint: 1600, settings: { slidesToShow: 4 } },
          { breakpoint: 1400, settings: { slidesToShow: 3 } },
          { breakpoint: 1200, settings: { slidesToShow: 2 } },
          { breakpoint: 992, settings: { arrows: false, slidesToShow: 4 } },
          { breakpoint: 768, settings: { arrows: false, slidesToShow: 4 } },
          { breakpoint: 480, settings: { arrows: false, slidesToShow: 4 } },
        ]
      });

      if ($(this).find('.gt-portfolio-11-slider-nav-item').length > 1) {
        $(this).siblings('.slides-number').show();
      }
      $(this).on('afterChange', function (event, slick, currentSlide) {
        $sliderParent.find('.slides-number .active').html(helpers.addZeros(currentSlide + 1));
      });

    });
  };
  sliderInit();

})(jQuery);
