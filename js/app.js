var KP,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

KP = {};

KP.app = (function() {

  function app() {}

  app.prototype.init = function() {};

  app.prototype.onPomodorIconClicked = function() {};

  return app;

})();

KP.PomodoroTimer = (function(_super) {

  __extends(PomodoroTimer, _super);

  function PomodoroTimer(taskItemView) {}

  return PomodoroTimer;

})(Backbone.View);
