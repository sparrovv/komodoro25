class KP.App

  constructor: ->
    $(document).bind 'initial-load-finished', => @init()

    KP.url = $('#komodoro-url').val()
    KP.app = this

    @loadSettings()
    @pomodoroEl = $("<a class='pomodoro'><img src='#{KP.url}/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>")

  loadSettings: ->
    if  localStorage['komodoro_settings'] && localStorage['komodoro_settings'] != 'undefined'
      KP.settings = JSON.parse(localStorage['komodoro_settings'])
    else
      KP.settings =
        sounds: true
        pomodoroTime: 1500000
        breakTime: 30000

  init: ->
    console.log 'KP init'

    @pomodoroLog = new KP.PomodoroLogs()
    @pomodoroLog.fetch()

    @endSound = new KP.KAudio("#{KP.url}/assets/stop.wav")
    @startSound = new KP.KAudio("#{KP.url}/assets/start.wav")
    @endBreakSound = new KP.KAudio("#{KP.url}/assets/end_of_break.wav")
    @tickSound = new KP.KAudio("#{KP.url}/assets/tick.wav")

    @createLogOverviewListener()

    @appendPomodoroEl()

  appendPomodoroEl: ->
    thiz = this

    $('.task-view .task-panel').append(@pomodoroEl)

    $('.task-view .pomodoro').click (e) ->
      e.preventDefault()
      thiz.onPomodoroElClicked(this)

      false

  onPomodoroElClicked: (el) ->
    taskModel = $(el).parents('.task-view').view().model

    pomodoroView = new KP.PomodoroView(model: taskModel)
    K2.modal.displayView pomodoroView

    false

  onPomodorLogsOverviewClicked: () ->
    pomodoroView = new KP.PomodoroLogsOverviewView(collection: @pomodoroLog)
    K2.modal.displayView pomodoroView

    false

  createLogOverviewListener: ->
    el = '<li><a id="komodoro-logs-overview">komodoro</a></li>'
    $('#topnav').append el

    $('#komodoro-logs-overview').click (e) =>
      e.preventDefault()
      @onPomodorLogsOverviewClicked()
      false

   #TODO:
   onNewTaskAddedToBoard: ->
     console.log "attach icon"
     # I need global event for new tasks, 

class KP.KAudio
  constructor: (src) ->
    @sound = new window.Audio(src)

  play: () ->
    if @_canPlay() 
      @sound.play()

  _canPlay: ->
    KP.settings.sounds

if window.K2
  new KP.App()
