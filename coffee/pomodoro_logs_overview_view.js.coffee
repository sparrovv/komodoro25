if window.K2
  class KP.PomodoroLogsOverviewView extends window.Backbone.View

    context: ->
      allToday: @collection.allToday().length
      finishedToday: @collection.finishedToday().length
      interruptedToday: @collection.allToday().length - @collection.finishedToday().length
      allEver: @collection.all().length
      allFinished: @collection.allFinished().length
      allInterupted: @collection.all().length - @collection.allFinished().length  

    render: ->
      @$el.html _.template(KP.Templates.pomodoroLogsOverview, @context()) 

      this

    destroy: ->
      @off()
      @remove()

    focus: ->
