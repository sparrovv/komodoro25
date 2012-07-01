if window.K2
  class KP.PomodoroLogsView extends window.Backbone.View

    initialize: (options) ->
      super options

      @task = options.task
      @collection.on 'add', @render, this

    context: ->
      all: @collection.allForTaskId(@task.id).length
      finished: @collection.finished(@task.id).length

    render: ->
      @$el.html _.template(KP.Templates.pomodoroLogs, @context()) 

      c = @collection.allForTaskId(@task.id)
      _(c).each (model) =>
        @addLogEntry(model)

      this

    addLogEntry: (model) ->
      view = new KP.PomodoroLogView(model:model)

      view.render()

      @$el.find('tbody').append view.el

  class KP.PomodoroLogView extends window.Backbone.View
    tagName: 'tr'

    context: ->
      name: @model.get('name')
      type: @model.get('type')
      time: moment(@model.get('time')).format('mm:ss')
      created_at: moment( @model.get('created_at')).format('dddd, MMMM Do YYYY, h:mm:ss a')

    render: ->
      @$el.html _.template(KP.Templates.pomodoroLog, @context()) 

      this
