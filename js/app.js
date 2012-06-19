
KP.App = (function() {

  function App() {
    var _this = this;
    $(document).bind('initial-load-finished', function() {
      return _this.init();
    });
    KP.url = $('#komodoro-url').val();
    KP.app = this;
    this.loadSettings();
  }

  App.prototype.loadSettings = function() {
    if (localStorage['komodoro_settings']) {
      return KP.settings = JSON.parse(localStorage['komodoro_settings']);
    } else {
      return KP.settings = {
        sounds: false,
        pomodoroTime: 150000,
        breakTime: 30000
      };
    }
  };

  App.prototype.init = function() {
    var el, thiz;
    console.log('KP init');
    this.pomodoroLog = new KP.PomodoroLogs();
    this.pomodoroLog.fetch();
    el = $("<a class='pomodoro'><img src='" + KP.url + "/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>");
    $('.task-view .task-panel').append(el);
    thiz = this;
    $('.task-view .pomodoro').click(function(e) {
      e.preventDefault();
      thiz.onPomodorIconClicked(this);
      return false;
    });
    this.endSound = new KP.KAudio("" + KP.url + "/assets/stop.wav");
    this.startSound = new KP.KAudio("" + KP.url + "/assets/start.wav");
    this.endBreakSound = new KP.KAudio("" + KP.url + "/assets/end_of_break.wav");
    this.tickSound = new KP.KAudio("" + KP.url + "/assets/tick.wav");
    return this.createLogOverviewListener();
  };

  App.prototype.onPomodorIconClicked = function(el) {
    var pomodoroView, taskModel;
    taskModel = $(el).parents('.task-view').view().model;
    pomodoroView = new KP.PomodoroView({
      model: taskModel
    });
    K2.modal.displayView(pomodoroView);
    return false;
  };

  App.prototype.onPomodorLogsOverviewClicked = function() {
    var pomodoroView;
    pomodoroView = new KP.PomodoroLogsOverviewView({
      collection: this.pomodoroLog
    });
    K2.modal.displayView(pomodoroView);
    return false;
  };

  App.prototype.createLogOverviewListener = function() {
    var el,
      _this = this;
    el = '<li><a id="komodoro-logs-overview">komodoro</a></li>';
    $('#topnav').append(el);
    return $('#komodoro-logs-overview').click(function(e) {
      e.preventDefault();
      _this.onPomodorLogsOverviewClicked();
      return false;
    });
  };

  return App;

})();

KP.KAudio = (function() {

  function KAudio(src) {
    this.sound = new window.Audio(src);
  }

  KAudio.prototype.play = function() {
    if (this._canPlay()) {
      return this.sound.play();
    }
  };

  KAudio.prototype._canPlay = function() {
    return KP.settings.sounds;
  };

  return KAudio;

})();

if (window.K2) {
  new KP.App();
}
