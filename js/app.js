
KP.App = (function() {

  function App() {
    var _this = this;
    $(document).bind('initial-load-finished', function() {
      return _this.init();
    });
    KP.url = $('#komodoro-url').val();
    KP.app = this;
    this.loadSettings();
    this.pomodoroEl = $("<a class='pomodoro'><img src='" + KP.url + "/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>");
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
    console.log('KP init');
    this.pomodoroLog = new KP.PomodoroLogs();
    this.pomodoroLog.fetch();
    this.endSound = new KP.KAudio("" + KP.url + "/assets/stop.wav");
    this.startSound = new KP.KAudio("" + KP.url + "/assets/start.wav");
    this.endBreakSound = new KP.KAudio("" + KP.url + "/assets/end_of_break.wav");
    this.tickSound = new KP.KAudio("" + KP.url + "/assets/tick.wav");
    this.createLogOverviewListener();
    return this.appendPomodoroEl();
  };

  App.prototype.appendPomodoroEl = function() {
    var thiz;
    thiz = this;
    $('.task-view .task-panel').append(this.pomodoroEl);
    return $('.task-view .pomodoro').click(function(e) {
      e.preventDefault();
      thiz.onPomodoroElClicked(this);
      return false;
    });
  };

  App.prototype.onPomodoroElClicked = function(el) {
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

  App.prototype.onNewTaskAddedToBoard = function() {
    return console.log("attach icon");
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
