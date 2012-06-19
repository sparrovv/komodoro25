var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroLogsOverviewView = (function(_super) {

    __extends(PomodoroLogsOverviewView, _super);

    function PomodoroLogsOverviewView() {
      return PomodoroLogsOverviewView.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogsOverviewView.prototype.context = function() {
      return {
        allToday: this.collection.allToday().length,
        finishedToday: this.collection.finishedToday().length,
        interruptedToday: this.collection.allToday().length - this.collection.finishedToday().length,
        allEver: "to do",
        finishedAll: "to do",
        interruptedAll: "to do"
      };
    };

    PomodoroLogsOverviewView.prototype.render = function() {
      this.$el.html(_.template(KP.Templates.pomodoroLogsOverview, this.context()));
      return this;
    };

    PomodoroLogsOverviewView.prototype.destroy = function() {
      this.off();
      return this.remove();
    };

    PomodoroLogsOverviewView.prototype.focus = function() {};

    return PomodoroLogsOverviewView;

  })(window.Backbone.View);
}
