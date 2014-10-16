$.Tabs = function (el) {
  this.$el = $(el);
  this.$el.on('click', 'a', clickTab.bind(this))
  this.$contentTabs = $(this.$el.attr("data-content-tabs"))
  this.$activeTab = this.$el.find(".active");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

var clickTab = $.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();

  this.$activeTab.removeClass("active");
  this.$activeTabPane().removeClass("active").addClass("transitioning");

  this.$activeTab = $(event.currentTarget);

  this.$activeTab.addClass("active");
  this.$activeTabPane().removeClass("transitioning").addClass("active");
}

$.Tabs.prototype.$activeTabPane = function () {
  return $(this.$activeTab.attr("href"));
};