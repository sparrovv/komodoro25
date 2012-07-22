if window.K2
  class KP.PomodoroView extends window.Backbone.View
    events:
      'click #start-pomodoro': 'onPomodoroStart'
      'click #stop-pomodoro': 'onPomodoroStop'
      'keydown input': 'onKeyDown'

    initialize: ->
      super arguments

      @breakTimer = new K2.Timer(parseInt(KP.settings.breakTime, 10))
      @breakTimer.on 'end', @onBreakTimerEnd, this
      @breakTimer.on 'tick', @onBreakTimerTick, this

      @pomodoroTimer = new K2.Timer(parseInt(KP.settings.pomodoroTime, 10))
      @pomodoroTimer.on 'end', @onPomodoroTimerEnd, this
      @pomodoroTimer.on 'tick', @onPomodoroTimerTick, this
      @pomodoroTimer.on 'stop', @onPomodoroTimerStop, this

      @documentTitle = $(document).attr('title')

    context: ->
      time = @pomodoroTimer.initialTime()

      name: @model.get('title')
      description: @model.get('description')
      minutes: time[0]
      seconds: time[1]

    render: ->
      @$el.html _.template(KP.Templates.pomodoroView, @context())

      log = new KP.PomodoroLogsView
        collection: KP.app.pomodoroLog, task: @model

      @$el.find('#pomodoro-log').html log.render().el

      this

    focus: ->
      @$('input').focus()

    renderTimer: (minutes, seconds) ->
      @$('.minutes').text(minutes)
      @$('.seconds').text(seconds)

      $(document).attr('title', "#{minutes}:#{seconds}")

    onBreakTimerTick: ->
      time = @breakTimer.currentTime()
      @renderTimer(time[0], time[1])

    onBreakTimerEnd: ->
      KP.app.endSound.play()

      @breakTimer.stop()
      $(document).attr('title', @documentTitle)

      @$('.break-info').hide()
      @$('.commands').show()

    onPomodoroTimerTick: ->
      #KP.app.tickSound.play()

      time = @pomodoroTimer.currentTime()
      @renderTimer(time[0], time[1])

    onPomodoroTimerStop: ->
      time = @pomodoroTimer.initialTime()
      @renderTimer(time[0], time[1])

    onPomodoroTimerEnd: ->
      KP.app.endSound.play()

      log = new KP.PomodoroLog
        name: @model.get('title')
        task_id: @model.id 
        type: 'finished'
        time: @pomodoroTimer.timeDiff()

      KP.app.pomodoroLog.add(log)
      log.save()

      @pomodoroTimer.stop()
      $(document).attr('title', @documentTitle)
      @startBreakTimer()

    startBreakTimer: ->
      @breakTimer.start()
      @$('.commands').hide()
      @$('.break-info').show()

    onPomodoroStart: (e) ->
      @pomodoroTimer.start()

      false

    onPomodoroStop: (e) ->
      log = new KP.PomodoroLog
        name: @model.get('title')
        task_id: @model.id 
        type: 'interrupted'
        time: @pomodoroTimer.timeDiff()

      KP.app.pomodoroLog.add log
      log.save()

      $(document).attr('title', @documentTitle)
      @pomodoroTimer.stop()

      false

    onKeyDown: (e) ->
      if e.keyCode == 13
        @onPomodoroStart()
        false
      else
        true

    destroy: ->
      @pomodoroTimer.stop()
      @pomodoroTimer.destroy()
      delete @pomodoroTimer

      @breakTimer.stop()
      @breakTimer.destroy()
      delete @breakTimer

      $(document).attr('title', @documentTitle)

      @off()
      @remove()
