if window.K2
  class KP.Timer
    constructor: (timer=1500000)->
      _.extend this, Backbone.Events

      @intervalId = undefined
      @timerLength = timer

    initialTime: ->
      dateDiff = moment(new Date(@timerLength))
      [dateDiff.format('mm'), dateDiff.format('ss')]

    currentTime: ->
      diff =  @timerLength - @timeDiff() 

      if diff >= 0
        dateDiff = moment(new Date(diff))
        [dateDiff.format('mm'), dateDiff.format('ss')]
      else
        @trigger 'end'
        ['00', '00']

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
