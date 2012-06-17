var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroTimer = (function(_super) {

    __extends(PomodoroTimer, _super);

    function PomodoroTimer() {
      return PomodoroTimer.__super__.constructor.apply(this, arguments);
    }

    PomodoroTimer.prototype.context = function() {
      return {
        name: this.model.get('title'),
        minutes: this.countdown.numberOfMinutes(),
        seconds: this.countdown.numberOfSeconds()
      };
    };

    PomodoroTimer.prototype.events = {
      'click #start-pomodoro': 'onPomodoroStart',
      'click #stop-pomodoro': 'onPomodoroStop'
    };

    PomodoroTimer.prototype.initialize = function() {
      PomodoroTimer.__super__.initialize.call(this, arguments);
      this.countdown = new K2.Countdown();
      this.countdown.on('end', this.onCountdownEnd, this);
      return this.countdown.on('tick', this.onCountdownTick, this);
    };

    PomodoroTimer.prototype.render = function() {
      var log;
      this.$el.html(_.template(KP.pomodorTemplate, this.context()));
      log = new KP.PomodoroLogsView({
        collection: KP.app.pomodoroLog,
        task: this.model
      });
      this.$el.find('#pomodoro-log').html(log.render().el);
      return this;
    };

    PomodoroTimer.prototype.focus = function() {};

    PomodoroTimer.prototype.onCountdownTick = function() {
      var minutes, seconds, time;
      KP.app.tickSound.play();
      time = this.countdown.currentCountdown();
      minutes = time[0];
      seconds = time[1];
      this.$('.seconds').text(seconds);
      return this.$('.minutes').text(minutes);
    };

    PomodoroTimer.prototype.onCountdownEnd = function() {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.countdown.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      this.countdown.stop();
      return KP.app.endSound.play();
    };

    PomodoroTimer.prototype.onPomodoroStart = function() {
      KP.app.startSound.play();
      this.countdown.start();
      return false;
    };

    PomodoroTimer.prototype.onPomodoroStop = function() {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.countdown.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      this.countdown.stop();
      return false;
    };

    PomodoroTimer.prototype.destroy = function() {
      this.countdown.stop();
      this.countdown.destroy();
      delete this.countdown;
      this.off();
      return this.remove();
    };

    return PomodoroTimer;

  })(window.Backbone.View);
}
