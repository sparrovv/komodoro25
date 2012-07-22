var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroView = (function(_super) {

    __extends(PomodoroView, _super);

    function PomodoroView() {
      this.showInitialPomodoroTimer = __bind(this.showInitialPomodoroTimer, this);

      this.onPomodoroTimerStop = __bind(this.onPomodoroTimerStop, this);

      this.onBreakTimerEnd = __bind(this.onBreakTimerEnd, this);
      return PomodoroView.__super__.constructor.apply(this, arguments);
    }

    PomodoroView.prototype.events = {
      'click #start-pomodoro': 'onPomodoroStart',
      'click #stop-pomodoro': 'onAbortedClicked',
      'keydown input': 'onKeyDown'
    };

    PomodoroView.prototype.initialize = function() {
      PomodoroView.__super__.initialize.call(this, arguments);
      this.breakTimer = new KP.Timer(parseInt(KP.settings.breakTime, 10));
      this.breakTimer.on('end', this.onBreakTimerEnd);
      this.breakTimer.on('tick', this.onBreakTimerTick, this);
      this.pomodoroTimer = new KP.Timer(parseInt(KP.settings.pomodoroTime, 10));
      this.pomodoroTimer.on('end', this.onPomodoroTimerEnd, this);
      this.pomodoroTimer.on('tick', this.onPomodoroTimerTick, this);
      this.pomodoroTimer.on('stop', this.onPomodoroTimerStop);
      return this.documentTitle = $(document).attr('title');
    };

    PomodoroView.prototype.context = function() {
      var time;
      time = this.pomodoroTimer.initialTime();
      return {
        name: this.model.get('title'),
        description: this.model.get('description'),
        minutes: time[0],
        seconds: time[1]
      };
    };

    PomodoroView.prototype.render = function() {
      var log;
      this.$el.html(_.template(KP.Templates.pomodoroView, this.context()));
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

    PomodoroView.prototype.renderTimer = function(minutes, seconds) {
      this.$('.minutes').text(minutes);
      this.$('.seconds').text(seconds);
      return $(document).attr('title', "" + minutes + ":" + seconds);
    };

    PomodoroView.prototype.onBreakTimerTick = function() {
      var time;
      time = this.breakTimer.currentTime();
      return this.renderTimer(time[0], time[1]);
    };

    PomodoroView.prototype.onBreakTimerEnd = function() {
      KP.app.endSound.play();
      this.breakTimer.stop();
      $(document).attr('title', this.documentTitle);
      this.$('.break-info').hide();
      this.$('.commands').show();
      return setTimeout(this.showInitialPomodoroTimer, 10);
    };

    PomodoroView.prototype.onPomodoroTimerTick = function() {
      var time;
      time = this.pomodoroTimer.currentTime();
      return this.renderTimer(time[0], time[1]);
    };

    PomodoroView.prototype.onPomodoroTimerStop = function() {
      return this.showInitialPomodoroTimer();
    };

    PomodoroView.prototype.onPomodoroTimerEnd = function() {
      var log;
      KP.app.endSound.play();
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.pomodoroTimer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      this.pomodoroTimer.stop();
      $(document).attr('title', this.documentTitle);
      return this.startBreakTimer();
    };

    PomodoroView.prototype.startBreakTimer = function() {
      this.breakTimer.start();
      this.$('.commands').hide();
      return this.$('.break-info').show();
    };

    PomodoroView.prototype.onPomodoroStart = function(e) {
      this.pomodoroTimer.start();
      return false;
    };

    PomodoroView.prototype.isTimerStopOrUnset = function() {
      return !this.pomodoroTimer.intervalId || !this.pomodoroTimer.startTime;
    };

    PomodoroView.prototype.onAbortedClicked = function(e) {
      if (this.isTimerStopOrUnset()) {
        return false;
      }
      this.onPomodoroStop(e);
      return false;
    };

    PomodoroView.prototype.onPomodoroStop = function(e) {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'interrupted',
        time: this.pomodoroTimer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      $(document).attr('title', this.documentTitle);
      return this.pomodoroTimer.stop();
    };

    PomodoroView.prototype.onKeyDown = function(e) {
      if (e.keyCode === 13) {
        this.onPomodoroStart();
        return false;
      } else {
        return true;
      }
    };

    PomodoroView.prototype.showInitialPomodoroTimer = function() {
      var time;
      time = this.pomodoroTimer.initialTime();
      return this.renderTimer(time[0], time[1]);
    };

    PomodoroView.prototype.destroy = function() {
      this.pomodoroTimer.stop();
      this.pomodoroTimer.destroy();
      delete this.pomodoroTimer;
      this.breakTimer.stop();
      this.breakTimer.destroy();
      delete this.breakTimer;
      $(document).attr('title', this.documentTitle);
      this.off();
      return this.remove();
    };

    return PomodoroView;

  })(window.Backbone.View);
}
