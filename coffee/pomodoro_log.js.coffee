if window.K2

  class KP.PomodoroLog extends Backbone.Model
    defaults: ->
      created_at: new Date()

    createdAtDateString: ->
      new Date(@get('created_at')).toDateString()

    sync: (method, model, options) ->
      resp = undefined
      store = model.localStorage or model.collection.localStorage
      switch method
        when "read"
          resp = (if model.id then store.find(model) else store.findAll())
        when "create"
          resp = store.create(model)
        when "update"
          resp = store.update(model)
        when "delete"
          resp = store.destroy(model)
      if resp
        options.success resp
      else
        options.error "Record not found"

  class KP.PomodoroLogs extends Backbone.Collection
    model: KP.PomodoroLog

    # every project has its own storage
    localStorage: new Store("komodoro_logs_#{K2.project.id}")

    all_for_task_id: (task_id) ->
      @filter (l) -> l.get('task_id') == task_id 

    finished: (task_id) ->
      _(@all_for_task_id(task_id)).filter (l) -> l.get('type') == 'finished'

    allToday: ->
      todayString = (new Date()).toDateString()
      @filter (l) -> l.createdAtDateString() == todayString

    finishedToday: ->
      @allToday().filter (l) -> l.get('type') == 'finished'

    comperator: ->
      @get('created_at')

    sync: (method, model, options) ->
      resp = undefined
      store = model.localStorage or model.collection.localStorage
      switch method
        when "read"
          resp = (if model.id then store.find(model) else store.findAll())
        when "create"
          resp = store.create(model)
        when "update"
          resp = store.update(model)
        when "delete"
          resp = store.destroy(model)
      if resp
        options.success resp
      else
        options.error "Record not found"
