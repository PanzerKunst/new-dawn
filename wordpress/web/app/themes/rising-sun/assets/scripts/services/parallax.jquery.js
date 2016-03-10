"use strict";

$.fn.parallax = function(params) {
  const bgPosX = params && params.posX ? params.posX : "50%";
  const parallaxSpeed = params && params.speed ? params.speed : 3;

  const $window = $(window);
  const $elements = $(this);

  function update() {
    const scrollPos = $window.scrollTop();

    $elements.each(function() {
      const $el = $(this);
      const elementPosY = $el.offset().top;

      const newParallaxPosition = Math.round((elementPosY - scrollPos) / parallaxSpeed) + "px";
      $el.css("backgroundPosition", bgPosX + " " + newParallaxPosition);
    });
  }

  function canBrowserBenefitFromASmootherParallax() {
    return false;
  }

  if (CB.Services.Browser.isLargeScreen()) {
    $window.scroll(update).resize(update);

    // To have a smoother parallax when scrolling with the mouse wheel
    if (canBrowserBenefitFromASmootherParallax()) {
      $window.mousewheel(function(e) {
        e.preventDefault();

        const scrollTop = $window.scrollTop();
        const scrollYPos = scrollTop - e.deltaY * 200;

        TweenLite.to(window, CB.animationDurations.default / 2, {scrollTo: scrollYPos, ease: Power1.easeOut});
      });
    }
  }
};
