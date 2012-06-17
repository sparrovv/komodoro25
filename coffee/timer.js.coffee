if window.K2
  class K2.Timer
    constructor: ->
      _.extend this, Backbone.Events

      @intervalId = undefined
      @pomodoroLength = 1500000 #25minutes
      @breakLength = 500000 #5minutes

    numberOfSeconds: ->
      new Date(@pomodoroLength).getSeconds()

    numberOfMinutes: ->
      new Date(@pomodoroLength).getMinutes()

    currentTime: ->
      diff =  @pomodoroLength - @timeDiff() 

      if diff >= 0
        dateDiff = new Date(diff)
        [dateDiff.getMinutes(), dateDiff.getSeconds()]
      else
        @trigger 'end'
        [0, 0]

    tick: =>
      @trigger 'tick'

    start: ->
      if @intervalId then return this

      @intervalId = setInterval(@tick, 1000)
      @startTime = new Date().getTime()
      @tick()

    stop: ->
      if @intervalId
        clearInterval @intervalId
        @intervalId = undefined
        @trigger 'stop'

    timeDiff: ->
      now = new Date().getTime()
      now - @startTime

    destroy: ->
      @off()
