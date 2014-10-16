$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$el.on("click", ".slide-left", this.slideLeft.bind(this));
  this.$el.on("click", ".slide-right", this.slideRight.bind(this));
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.slide = function (dir) {
  var SLIDE_CLASSES = {
    "-1": "left",
    "1" : "right"
  };

  var $oldItem = this.activeItem();
  this.activeIdx = (this.activeIdx + dir) % this.numItems();
  var $newItem = this.activeItem();

  $newItem.addClass(SLIDE_CLASSES[dir]).addClass("active");
  setTimeout(function () {
    $newItem.removeClass(SLIDE_CLASSES[dir]);
    $oldItem.addClass(SLIDE_CLASSES[-1 * dir]);
  }, 0);


  $oldItem.one("transitionend", function (event) {
    $oldItem.removeClass("active").removeClass(SLIDE_CLASSES[-1 * dir]);
  });
};

$.Carousel.prototype.slideLeft = function () {
  this.slide(-1);
};

$.Carousel.prototype.slideRight = function () {
  this.slide(1);
};

$.Carousel.prototype.numItems = function () {
  return this.$el.find(".items").children().length;
};

$.Carousel.prototype.activeItem = function () {
  return this.$el.find(".items").children().eq(this.activeIdx);
};