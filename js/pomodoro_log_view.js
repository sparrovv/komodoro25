var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroLogsView = (function(_super) {

    __extends(PomodoroLogsView, _super);

    function PomodoroLogsView() {
      return PomodoroLogsView.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogsView.prototype.initialize = function(options) {
      PomodoroLogsView.__super__.initialize.call(this, options);
      this.task = options.task;
      return this.collection.on('add', this.render, this);
    };

    PomodoroLogsView.prototype.context = function() {
      return {
        all: this.collection.allForTaskId(this.task.id).length,
        finished: this.collection.finished(this.task.id).length
      };
    };

    PomodoroLogsView.prototype.render = function() {
      var c,
        _this = this;
      this.$el.html(_.template(KP.Templates.pomodoroLogs, this.context()));
      c = this.collection.allForTaskId(this.task.id);
      _(c).each(function(model) {
        return _this.addLogEntry(model);
      });
      return this;
    };

    PomodoroLogsView.prototype.addLogEntry = function(model) {
      var view;
      view = new KP.PomodoroLogView({
        model: model
      });
      view.render();
      return this.$el.find('tbody').append(view.el);
    };

    return PomodoroLogsView;

  })(window.Backbone.View);
  KP.PomodoroLogView = (function(_super) {

    __extends(PomodoroLogView, _super);

    function PomodoroLogView() {
      return PomodoroLogView.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogView.prototype.tagName = 'tr';

    PomodoroLogView.prototype.context = function() {
      return {
        name: this.model.get('name'),
        type: this.model.get('type'),
        time: moment(this.model.get('time')).format('mm:ss'),
        created_at: moment(this.model.get('created_at')).format('dddd, MMMM Do YYYY, h:mm:ss a')
      };
    };

    PomodoroLogView.prototype.render = function() {
      this.$el.html(_.template(KP.Templates.pomodoroLog, this.context()));
      return this;
    };

    return PomodoroLogView;

  })(window.Backbone.View);
}
