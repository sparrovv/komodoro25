var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroView = (function(_super) {

    __extends(PomodoroView, _super);

    function PomodoroView() {
      return PomodoroView.__super__.constructor.apply(this, arguments);
    }

    PomodoroView.prototype.context = function() {
      return {
        name: this.model.get('title'),
        minutes: this.timer.numberOfMinutes(),
        seconds: this.timer.numberOfSeconds()
      };
    };

    PomodoroView.prototype.events = {
      'click #start-pomodoro': 'onPomodoroStart',
      'click #stop-pomodoro': 'onPomodoroStop',
      'keydown input': 'onKeyDown'
    };

    PomodoroView.prototype.onKeyDown = function(e) {
      if (e.keyCode === 13) {
        this.onPomodoroStart();
        return false;
      } else {
        return true;
      }
    };

    PomodoroView.prototype.initialize = function() {
      PomodoroView.__super__.initialize.call(this, arguments);
      this.timer = new K2.Timer();
      this.timer.on('end', this.onTimerEnd, this);
      this.timer.on('tick', this.onTimerTick, this);
      return this.documentTitle = $(document).attr('title');
    };

    PomodoroView.prototype.render = function() {
      var log;
      this.$el.html(_.template(KP.pomodorTemplate, this.context()));
      log = new KP.PomodoroLogsView({
        collection: KP.app.pomodoroLog,
        task: this.model
      });
      this.$el.find('#pomodoro-log').html(log.render().el);
      return this;
    };

    PomodoroView.prototype.focus = function() {
      return this.$('input').focus();
    };

    PomodoroView.prototype.onTimerTick = function() {
      var minutes, seconds, time;
      KP.app.tickSound.play();
      time = this.timer.currentTime();
      minutes = time[0];
      seconds = time[1];
      this.$('.seconds').text(seconds);
      this.$('.minutes').text(minutes);
      return $(document).attr('title', "" + minutes + ":" + seconds);
    };

    PomodoroView.prototype.onTimerEnd = function() {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.timer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      this.timer.stop();
      KP.app.endSound.play();
      return $(document).attr('title', this.documentTitle);
    };

    PomodoroView.prototype.onPomodoroStart = function() {
      KP.app.startSound.play();
      this.timer.start();
      return false;
    };

    PomodoroView.prototype.onPomodoroStop = function() {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.timer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      $(document).attr('title', this.documentTitle);
      this.timer.stop();
      return false;
    };

    PomodoroView.prototype.destroy = function() {
      this.timer.stop();
      this.timer.destroy();
      delete this.timer;
      this.off();
      return this.remove();
    };

    return PomodoroView;

  })(window.Backbone.View);
}
