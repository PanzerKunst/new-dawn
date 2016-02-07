"use strict";

$.fn.parallax = function(posX, speed) {
  const bgPosX = posX || "50%";
  const parallaxSpeed = speed || 3;

  const $window = $(window);
  const $elements = $(this);

  function update() {
    const scrollPos = $window.scrollTop();

    $elements.each(function() {
      const $el = $(this);
      const elementPosY = $el.offset().top;

      if (scrollPos >= elementPosY) {
        const newParallaxPosition = -Math.round((scrollPos - elementPosY) / parallaxSpeed) + "px";
        $el.css("backgroundPosition", bgPosX + " " + newParallaxPosition);
      }
    });
  }

  function canBrowserBenefitFromASmootherParallax() {
    // Windows, except FF
    return (navigator.platform === "Win32" || navigator.platform === "Win64") &&
      navigator.userAgent.indexOf("Firefox") === -1;
  }

  if (!Modernizr.touch) {
    $window.scroll(update).resize(update);

    // To have a smoother parallax when scrolling with the mouse wheel
    if (canBrowserBenefitFromASmootherParallax) {
      $window.mousewheel(function(e) {
        e.preventDefault();

        const scrollTop = $window.scrollTop();
        const scrollYPos = scrollTop - e.deltaY * 200;

        TweenLite.to(window, CB.animationDurations.default / 2, {scrollTo: scrollYPos, ease: Power1.easeOut});
      });
    }
  }
};
