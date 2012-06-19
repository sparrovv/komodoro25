class KP.App
  constructor: ->
    $(document).bind 'initial-load-finished', => @init()

    KP.url = $('#komodoro-url').val()
    KP.app = this

    @loadSettings()

  loadSettings: ->
    if localStorage['komodoro_settings']
      KP.settings = JSON.parse(localStorage['komodoro_settings'])
    else
      KP.settings =
        sounds: false
        pomodoroTime: 150000
        breakTime: 30000

  init: ->
    console.log 'KP init'

    @pomodoroLog = new KP.PomodoroLogs()
    @pomodoroLog.fetch()

    el = $("<a class='pomodoro'><img src='#{KP.url}/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>")
    $('.task-view .task-panel').append(el)

    thiz = @
    $('.task-view .pomodoro').click (e) -> 
      e.preventDefault()
      thiz.onPomodorIconClicked(this)
      false

    @endSound = new KP.KAudio("#{KP.url}/assets/stop.wav")
    @startSound = new KP.KAudio("#{KP.url}/assets/start.wav")
    @endBreakSound = new KP.KAudio("#{KP.url}/assets/end_of_break.wav")
    @tickSound = new KP.KAudio("#{KP.url}/assets/tick.wav")

    @addTopnavEl()

  onPomodorIconClicked: (el) ->
    taskModel = $(el).parents('.task-view').view().model

    pomodoroView = new KP.PomodoroView(model: taskModel)
    K2.modal.displayView pomodoroView

    false

  onPomodorLogsOverviewClicked: () ->
    pomodoroView = new KP.PomodoroLogsOverviewView(collection: @pomodoroLog)
    K2.modal.displayView pomodoroView

    false

  addTopnavEl: ->
    el = '<li><a id="plog">Plogs</a></li>'
    $('#topnav').append el

    $('#plog').click (e) => 
      e.preventDefault()
      @onPomodorLogsOverviewClicked()
      false


class KP.KAudio
  constructor: (src) ->
    @sound = new window.Audio(src)

  play: () ->
    if KP.settings.sounds
      @sound.play()

  stop: () ->
    @sound.stop()

if window.K2
  new KP.App()
