if window.K2
  S4 = ->
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1

  guid = ->
    S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()

  class Store 
    constructor: (@name) ->
      store = localStorage.getItem(@name)
      @data = (store and JSON.parse(store)) or {}

  #_.extend Store::,
    save: ->
      localStorage.setItem @name, JSON.stringify(@data)

    create: (model) ->
      model.id = model.attributes.id = guid()  unless model.id
      @data[model.id] = model
      @save()
      model

    update: (model) ->
      @data[model.id] = model
      @save()
      model

    find: (model) ->
      @data[model.id]

    findAll: ->
      _.values @data

    destroy: (model) ->
      delete @data[model.id]

      @save()
      model
