if window.K2
  class KP.PomodoroLogsOverviewView extends window.Backbone.View

    context: ->
      allToday: @collection.allToday().length
      finishedToday: @collection.finishedToday().length
      interruptedToday: @collection.allToday().length - @collection.finishedToday().length
      allEver: "to do"
      finishedAll: "to do"
      interruptedAll: "to do"

    render: ->
      @$el.html _.template(KP.Templates.pomodoroLogsOverview, @context()) 

      this

    destroy: ->
      @off()
      @remove()

    focus: ->
