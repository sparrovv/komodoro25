if window.K2

  class KP.PomodoroLog extends Backbone.Model
    defaults: ->
      created_at: new Date()

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

    localStorage: new Store('komodoro_logs')

    all_for_task_id: (task_id) ->
      @filter (l) -> l.get('task_id') == task_id 

    finished: (task_id) ->
      _(@all_for_task_id(task_id)).filter (l) -> l.type == 'finished'

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

