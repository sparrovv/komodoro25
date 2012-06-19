
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
    return this.tickSound = new KP.KAudio("" + KP.url + "/assets/tick.wav");
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

  return App;

})();

KP.KAudio = (function() {

  function KAudio(src) {
    this.sound = new window.Audio(src);
  }

  KAudio.prototype.play = function() {
    if (KP.settings.sounds) {
      return this.sound.play();
    }
  };

  KAudio.prototype.stop = function() {
    return this.sound.stop();
  };

  return KAudio;

})();

if (window.K2) {
  new KP.App();
}
