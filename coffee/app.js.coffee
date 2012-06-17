class KP.App
  constructor: ->
    $(document).bind 'tasks-loaded', => @init()
    @pomodoroLog = new KP.PomodoroLogs()
    @pomodoroLog.fetch()
    KP.app = this

  init: ->
    KP.url = $('#komodoro-url').val()

    el = $("<a class='pomodoro'><img src='#{KP.url}/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>")
    $('.task-view .task-panel').append(el)

    thiz = @
    $('.task-view .pomodoro').click (e) -> 
      e.preventDefault()
      thiz.onPomodorIconClicked(this)
      false

    @tickSound = new Audio("#{KP.url}/assets/tick.wav")
    @endSound = new Audio("#{KP.url}/assets/stop.wav")
    @startSound = new Audio("#{KP.url}/assets/start.wav")


  onPomodorIconClicked: (el) ->
    taskModel = $(el).parents('.task-view').view().model

    pomodoroView = new KP.PomodoroView(model: taskModel)
    K2.modal.displayView pomodoroView

    false

if window.K2
  new KP.App()
