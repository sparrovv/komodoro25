if window.K2
  class KP.PomodoroView extends window.Backbone.View
    context: ->
      name: @model.get('title')
      minutes: @timer.numberOfMinutes()
      seconds: @timer.numberOfSeconds()

    events:
      'click #start-pomodoro': 'onPomodoroStart'
      'click #stop-pomodoro': 'onPomodoroStop'
      'keydown input': 'onKeyDown'

    onKeyDown: (e) ->
      if e.keyCode == 13
        @onPomodoroStart()
        false
      else
        true

    initialize: ->
      super arguments

      @timer = new K2.Timer()

      @timer.on 'end', @onTimerEnd, this
      @timer.on 'tick', @onTimerTick, this
      @documentTitle = $(document).attr('title')

    render: ->
      @$el.html _.template(KP.pomodorTemplate, @context())

      log = new KP.PomodoroLogsView
        collection: KP.app.pomodoroLog, task: @model

      @$el.find('#pomodoro-log').html log.render().el
      
      this

    focus: ->
      @$('input').focus()

    onTimerTick: ->
      KP.app.tickSound.play()
      time = @timer.currentTime()
      minutes = time[0]
      seconds = time[1]

      @$('.seconds').text(seconds)
      @$('.minutes').text(minutes)

      $(document).attr('title', "#{minutes}:#{seconds}")

    onTimerEnd: ->
      log = new KP.PomodoroLog
        name: @model.get('title')
        task_id: @model.id 
        type: 'finished'
        time: @timer.timeDiff()
      KP.app.pomodoroLog.add(log)
      log.save()

      @timer.stop()
      KP.app.endSound.play()
      $(document).attr('title', @documentTitle)

    onPomodoroStart: ->
      KP.app.startSound.play()
      @timer.start()

      false

    onPomodoroStop: ->
      log = new KP.PomodoroLog
        name: @model.get('title')
        task_id: @model.id 
        type: 'finished'
        time: @timer.timeDiff()
      KP.app.pomodoroLog.add log
      log.save()

      $(document).attr('title', @documentTitle)
      @timer.stop()

      false

    destroy: ->
      @timer.stop()
      @timer.destroy()
      delete @timer

      @off()
      @remove()
