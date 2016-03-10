"use strict";

CB.Controllers.Common = P(function(c) {
  c.init = function() {
    CB.Services.Browser.addUserAgentAttributeToHtmlTag();
    CB.Services.Browser.fixFlexboxIndicatorClass();

    this._initElements();
    this._initEvents();
    this._removeEmptyParagraphTagsAddedByTheWpEditor();
  };

  c._initElements = function() {
    this.$scrollingAnchors = $("body").find("a[href^=#]");
  };

  c._initEvents = function() {
    this.$scrollingAnchors.click($.proxy(this._scrollToSection, this));
  };

  c._removeEmptyParagraphTagsAddedByTheWpEditor = function() {
    $("p:empty").remove();
  };

  c._scrollToSection = function(e) {
    e.preventDefault();

    const $target = $(e.currentTarget);
    const hash = $target.attr("href");
    const sectionId = hash.substring(1);
    const $section = $(document.getElementById(sectionId));

    const scrollYPos = $section.offset().top;
    TweenLite.to(window, 1, {scrollTo: scrollYPos, ease: Power4.easeOut});
  };
});
