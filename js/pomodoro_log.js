var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroLog = (function(_super) {

    __extends(PomodoroLog, _super);

    function PomodoroLog() {
      return PomodoroLog.__super__.constructor.apply(this, arguments);
    }

    PomodoroLog.prototype.defaults = function() {
      return {
        created_at: new Date()
      };
    };

    PomodoroLog.prototype.sync = function(method, model, options) {
      var resp, store;
      resp = void 0;
      store = model.localStorage || model.collection.localStorage;
      switch (method) {
        case "read":
          resp = (model.id ? store.find(model) : store.findAll());
          break;
        case "create":
          resp = store.create(model);
          break;
        case "update":
          resp = store.update(model);
          break;
        case "delete":
          resp = store.destroy(model);
      }
      if (resp) {
        return options.success(resp);
      } else {
        return options.error("Record not found");
      }
    };

    return PomodoroLog;

  })(Backbone.Model);
  KP.PomodoroLogs = (function(_super) {

    __extends(PomodoroLogs, _super);

    function PomodoroLogs() {
      return PomodoroLogs.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogs.prototype.model = KP.PomodoroLog;

    PomodoroLogs.prototype.localStorage = new Store('komodoro_logs');

    PomodoroLogs.prototype.all_for_task_id = function(task_id) {
      return this.filter(function(l) {
        return l.get('task_id') === task_id;
      });
    };

    PomodoroLogs.prototype.finished = function(task_id) {
      return _(this.all_for_task_id(task_id)).filter(function(l) {
        return l.type === 'finished';
      });
    };

    PomodoroLogs.prototype.sync = function(method, model, options) {
      var resp, store;
      resp = void 0;
      store = model.localStorage || model.collection.localStorage;
      switch (method) {
        case "read":
          resp = (model.id ? store.find(model) : store.findAll());
          break;
        case "create":
          resp = store.create(model);
          break;
        case "update":
          resp = store.update(model);
          break;
        case "delete":
          resp = store.destroy(model);
      }
      if (resp) {
        return options.success(resp);
      } else {
        return options.error("Record not found");
      }
    };

    return PomodoroLogs;

  })(Backbone.Collection);
}
