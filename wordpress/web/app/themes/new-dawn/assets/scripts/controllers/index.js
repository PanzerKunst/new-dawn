"use strict";

CB.Controllers.Index = P(function(c) {
  c.menuBtnTopPosWhenHidden = -40;
  c.navBarTopPosWhenHidden = -72;
  c.menuBtnTopPosWhenHiddenPx = c.menuBtnTopPosWhenHidden + "px";
  c.navBarTopPosWhenHiddenPx = c.navBarTopPosWhenHidden + "px";

  c.init = function() {
    this._initElements();
    this._initEvents();

    // We need a little delay for the CSS to be processed, otherwise the element dimentions aren't computed correctly
    window.setTimeout(function() {
      this._initElementDimentions();
      this._initMenu();
    }.bind(this), 50);
  };

  c._initElements = function() {
    this.$window = $(window);

    this.$siteHeader = $("header.banner");
    this.$headerWithoutMenu = this.$siteHeader.children(".container");
    this.$menuBtnWrapper = this.$siteHeader.children("#menu-btn-wrapper");
    this.$menuBtn = this.$menuBtnWrapper.children();

    this.$nav = this.$siteHeader.children(".nav-primary");
    this.$menuContainer = this.$nav.children(".menu-all-pages-as-single-container");
    this.$menuLinks = this.$menuContainer.find("a");
  };

  c._initEvents = function() {
    this.$window.resize(_.debounce(function() {
      this._initElementDimentions();
    }.bind(this), 15));

    this.$window.scroll(_.debounce($.proxy(this._onScroll, this), 15));

    this.$headerWithoutMenu.parallax();

    this.$menuBtn.click($.proxy(this._toggleMenu, this));
  };

  c._initElementDimentions = function() {
    this.windowHeight = this.$window.height();

    // Save height when expanded
    const menuContainerHeight = this.$menuContainer.height();

    this.menuContainerHeightExpanded = menuContainerHeight ? menuContainerHeight : this.menuContainerHeightExpanded;

    const menuContainerWidth = this.$menuContainer.width();
    this.menuContainerWidthExpanded = menuContainerWidth ? menuContainerWidth : this.menuContainerWidthExpanded;
  };

  c._initMenu = function() {
    if (this.$menuBtn.is(":visible")) {
      TweenLite.set(this.$menuContainer, {height: 0, visibility: "visible"});
    }
  };

  c._onScroll = function() {
    const scrollPos = this.$window.scrollTop();
    const wasScrolledDownEnough = this.scrollPos >= this.windowHeight;
    let isScrolledDownEnough = scrollPos >= this.windowHeight + this.navBarTopPosWhenHidden;

    if (this.$menuBtn.is(":visible")) {
      isScrolledDownEnough = scrollPos >= this.windowHeight + this.menuBtnTopPosWhenHidden;
    }

    this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);

    if (isScrolledDownEnough) {
      if (this.$menuBtn.is(":visible")) {
        this._closeMenu();

        if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$menuBtnWrapper.css("top") === "0px") {
          TweenLite.set(this.$menuBtnWrapper, {top: this.menuBtnTopPosWhenHiddenPx});
        } else if (this.$menuBtnWrapper.css("top") === this.menuBtnTopPosWhenHiddenPx) {
          TweenLite.to(this.$menuBtnWrapper, CB.animationDurations.default, {top: 0});
        }
      } else {
        if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$nav.css("top") === "0px") {
          TweenLite.set(this.$nav, {top: this.navBarTopPosWhenHiddenPx});
        } else if (this.$nav.css("top") === this.navBarTopPosWhenHiddenPx) {
          TweenLite.to(this.$nav, CB.animationDurations.default, {top: 0});
        }
      }
    }

    this.scrollPos = scrollPos;
  };

  c._toggleMenu = function() {
    if (this.$menuBtn.is(":visible")) {
      this.$siteHeader.toggleClass("menu-open");

      const isMenuOpen = this.$siteHeader.hasClass("menu-open");

      const targetHeight = isMenuOpen ? this.menuContainerHeightExpanded : 0;

      TweenLite.to(this.$menuContainer, CB.animationDurations.default, {height: targetHeight, ease: Power4.easeOut});

      if (this.$siteHeader.hasClass("scrolled-down")) {
        TweenLite.set(this.$nav, {width: "auto"});

        if (isMenuOpen) {
          TweenLite.set(this.$menuContainer, {width: 0});
        }

        const targetWidth = isMenuOpen ? this.menuContainerWidthExpanded : 0;
        TweenLite.to(this.$menuContainer, CB.animationDurations.default, {
          width: targetWidth,
          ease: Power4.easeOut,
          onComplete: function() {
            TweenLite.set(this.$nav, {width: "100%"});
          }.bind(this)
        });
      } else {
        TweenLite.set(this.$menuContainer, {width: "auto"});

        if (isMenuOpen) {
          const scrollPos = this.$window.scrollTop();
          if (scrollPos < this.menuContainerHeightExpanded) {
            // We scroll down to make sure that the menu becomes visible
            TweenLite.to(window, CB.animationDurations.default, {
              scrollTo: this.menuContainerHeightExpanded,
              ease: Power4.easeOut
            });
          }
        }
      }
    }
  };

  c._closeMenu = function() {
    if (this.$menuContainer.width() > 0 && !this.isMenuClosing) {
      this.$siteHeader.removeClass("menu-open");
      TweenLite.to(this.$menuContainer, CB.animationDurations.default, {height: 0, ease: Power4.easeOut});
      TweenLite.set(this.$nav, {width: "auto"});

      // TODO: remove
      console.log("closing menu");

      this.isMenuClosing = true;

      TweenLite.to(this.$menuContainer, CB.animationDurations.default, {
        width: 0,
        ease: Power4.easeOut,
        onComplete: function() {
          TweenLite.set(this.$nav, {width: "100%"});
          this.isMenuClosing = false;
        }.bind(this)
      });
    }
  };

  c._isScrollDown = function(scrollPos) {
    const scrollPosition = scrollPos || this.$window.scrollTop();
    return scrollPosition > this.scrollPos;
  };
});
