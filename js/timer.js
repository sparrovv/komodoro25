var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

if (window.K2) {
  KP.Timer = (function() {

    function Timer(timer) {
      if (timer == null) {
        timer = 1500000;
      }
      this.tick = __bind(this.tick, this);

      _.extend(this, Backbone.Events);
      this.intervalId = void 0;
      this.timerLength = timer;
    }

    Timer.prototype.initialTime = function() {
      var dateDiff;
      dateDiff = moment(new Date(this.timerLength));
      return [dateDiff.format('mm'), dateDiff.format('ss')];
    };

    Timer.prototype.currentTime = function() {
      var dateDiff, diff;
      diff = this.timerLength - this.timeDiff();
      if (diff >= 0) {
        dateDiff = moment(new Date(diff));
        return [dateDiff.format('mm'), dateDiff.format('ss')];
      } else {
        this.trigger('end');
        return ['00', '00'];
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
