"use strict";

/* Galleries on this Wordpress site:
 <div class="cbr-gallery">
 <figure data-file-name="meadow-5.jpg" data-size="1920x1440"></figure>
 <figure data-file-name="meadow-3.jpg" data-size="1920x1440"></figure>
 <figure data-file-name="meadow-1.jpg" data-size="1920x1440"></figure>
 </div>

 <div class="cbr-gallery">
 <figure data-file-name="young-forest-1.jpg" data-size="1334x1000"></figure>
 <figure data-file-name="young-forest-2.jpg" data-size="1334x1000"></figure>
 </div>
 */

CB.Services.Gallery = P(function(c) {
  c.init = function(thumbDirectory, fullSizeDirectory) {
    this.thumbDirectory = thumbDirectory;
    this.fullSizeDirectory = fullSizeDirectory;

    this._initElements();
    this._initAttributes();
    this._initAnchors();
    initPhotoSwipeFromDOM(".cbr-gallery");
  };

  c._initElements = function() {
    this.$wrapper = $(".cbr-gallery");
    this.$figures = this.$wrapper.children();
  };

  c._initAttributes = function() {
    this.$wrapper.prop("itemscope", true);
    this.$wrapper.attr("itemtype", "http://schema.org/ImageGallery");

    this.$figures.each(function() {
      var $figure = $(this);

      $figure.prop("itemscope", true);
      $figure.attr("itemprop", "associatedMedia");
      $figure.attr("itemtype", "http://schema.org/ImageObject");
    });
  };

  c._initAnchors = function() {
    for (var i = 0; i < this.$figures.length; i++) {
      var $figure = $(this.$figures[i]);
      var fileName = $figure.data("fileName");

      $figure.html("<a href=\"" + this.fullSizeDirectory + fileName + "\" itemprop=\"contentUrl\"></a>");
      $figure.children().css("background-image", "url(" + this.thumbDirectory + fileName + ")");
    }
  };
});
