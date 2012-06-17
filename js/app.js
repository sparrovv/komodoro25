
KP.App = (function() {

  function App() {
    var _this = this;
    $(document).bind('tasks-loaded', function() {
      return _this.init();
    });
    this.pomodoroLog = new KP.PomodoroLogs();
    this.pomodoroLog.fetch();
    KP.app = this;
  }

  App.prototype.init = function() {
    var el, thiz;
    KP.url = $('#komodoro-url').val();
    el = $("<a class='pomodoro'><img src='" + KP.url + "/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>");
    $('.task-view .task-panel').append(el);
    thiz = this;
    $('.task-view .pomodoro').click(function(e) {
      e.preventDefault();
      thiz.onPomodorIconClicked(this);
      return false;
    });
    this.tickSound = new Audio("" + KP.url + "/assets/tick.wav");
    this.endSound = new Audio("" + KP.url + "/assets/stop.wav");
    return this.startSound = new Audio("" + KP.url + "/assets/start.wav");
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

if (window.K2) {
  new KP.App();
}
