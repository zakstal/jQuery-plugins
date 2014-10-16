$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$active = this.$el.find(".active");
  this.$gutterImages = this.$el.find(".gutter-images");
  this.activate(this.$gutterImages.children().eq(0));
  this.selectedIdx = 0;
  this.bindEvents();
  this.$gutterIdx = 0;
  this.$images = this.$gutterImages.children();
  this.fillGutterImages();
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};

$.Thumbnails.prototype.activate = function ($gutterImagesImage) {
  this.$active.html($gutterImagesImage.html());
};

$.Thumbnails.prototype.bindEvents = function () {
  var self = this
  this.$el.on('click', '.gutter-images > li', function(event) {
    var $currentTarget = $(event.currentTarget);
   self.$images.removeClass('selected');
   $currentTarget.addClass('selected');
    self.activate($currentTarget);
    self.selectedIdx = $currentTarget.index() + self.gutterIdx;
  });

  this.$el.on('mouseenter', '.gutter-images > li', function(event) {
    var $currentTarget = $(event.currentTarget);

    self.activate($(event.currentTarget));
    self.hoverIdx = $currentTarget.index();
  });

  this.$el.on('mouseleave', '.gutter-images > li', function(event) {
    var $currentTarget = $(event.currentTarget);
    self.activate(self.$gutterImages.children().eq(self.selectedIdx));
    self.hoverIdx = -1;
  });

  this.$el.on('click', '.gutter-left', function(event) {
    if(self.$gutterIdx > 0 ){
      self.$gutterIdx--;
      self.fillGutterImages();
    }
  });

  this.$el.on('click', '.gutter-right', function(event) {
    if(self.$gutterIdx < self.$images.length - 4){
      self.$gutterIdx++;
      self.fillGutterImages();
    }
  });

};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages.children().detach();
  this.$gutterImages.append(this.$images.slice(this.$gutterIdx, this.$gutterIdx + 4));
};