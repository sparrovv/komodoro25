var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroLogOverviewView = (function(_super) {

    __extends(PomodoroLogOverviewView, _super);

    function PomodoroLogOverviewView() {
      return PomodoroLogOverviewView.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogOverviewView.prototype.context = function() {
      return {
        allToday: 20,
        finishedToday: 10,
        interruptedToday: 10,
        allEver: 20,
        finishedAll: 10,
        interruptedAll: 10
      };
    };

    PomodoroLogOverviewView.prototype.render = function() {
      this.$el.html(_.template(KP.pomodoroLogsOverviewTemplate, this.context()));
      return this;
    };

    PomodoroLogOverviewView.prototype.destroy = function() {
      this.off();
      return this.remove();
    };

    PomodoroLogOverviewView.prototype.focus = function() {};

    return PomodoroLogOverviewView;

  })(window.Backbone.View);
}
