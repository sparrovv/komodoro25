var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

if (window.K2) {
  K2.Timer = (function() {

    function Timer() {
      this.tick = __bind(this.tick, this);
      _.extend(this, Backbone.Events);
      this.intervalId = void 0;
      this.pomodoroLength = 1500000;
      this.breakLength = 500000;
    }

    Timer.prototype.numberOfSeconds = function() {
      return new Date(this.pomodoroLength).getSeconds();
    };

    Timer.prototype.numberOfMinutes = function() {
      return new Date(this.pomodoroLength).getMinutes();
    };

    Timer.prototype.currentTime = function() {
      var dateDiff, diff;
      diff = this.pomodoroLength - this.timeDiff();
      if (diff >= 0) {
        dateDiff = new Date(diff);
        return [dateDiff.getMinutes(), dateDiff.getSeconds()];
      } else {
        this.trigger('end');
        return [0, 0];
      }
    };

    Timer.prototype.tick = function() {
      return this.trigger('tick');
    };

    Timer.prototype.start = function() {
      if (this.intervalId) {
        return this;
      }
      this.intervalId = setInterval(this.tick, 1000);
      this.startTime = new Date().getTime();
      return this.tick();
    };

    Timer.prototype.stop = function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = void 0;
        return this.trigger('stop');
      }
    };

    Timer.prototype.timeDiff = function() {
      var now;
      now = new Date().getTime();
      return now - this.startTime;
    };

    Timer.prototype.destroy = function() {
      return this.off();
    };

    return Timer;

  })();
}
