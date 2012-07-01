try {
var KP;

KP = {};

KP.Templates = {};

KP.Templates.pomodoroView = '\
<div id="pomodoro-box" class="pomodoro-box">\
  <h2>Pomodoro for "<%= name %>"</h2>\
  <p><%= description %></p>\
\
  <div id="countdown">\
    <span class="minutes"><%= minutes %></span> : <span class="seconds"><%= seconds %></span>\
  </div>\
\
  <div class="commands">\
    <input type="text" id="pomodor-name" value="<%= name %>" placeholder="Pomodoro name"/>\
    <br />\
\
    <button id="start-pomodoro" class="btn primary">Start</button>\
    <button id="stop-pomodoro" class="btn success">Abort</button>\
  </div>\
  <div class="break-info">TAKE BREAK!!!</div>\
\
\
  <div id="pomodoro-log"></div>\
</div>\
';

KP.Templates.pomodoroLogs = '\
  <h2>Pomodoro Log (<%= finished %> / <%= all %>)</h2>\
  <table>\
    <thead>\
      <tr>\
        <th>name</th>\
        <th>type</th>\
        <th>time</th>\
        <th>created_at</th>\
      </tr>\
    </thead>\
    <tbody>\
    </tbody>\
  </table>\
';

KP.Templates.pomodoroLog = '\
  <td><%= name %></td>\
  <td><%= type %></td>\
  <td><%= time %></td>\
  <td><%= created_at  %></td>\
';

KP.Templates.pomodoroLogsOverview = '\
  <div id="pomodoro-logs-overview" class="pomodoro-box">\
    <h2>Pomodoro Log Overview</h2>\
\
    <table>\
      <tr>\
        <th class="first"> </th>\
        <th> Today </th>\
        <th> This week </th>\
      </tr>\
      <tr>\
        <td>Pomodors </td><td><%= allToday %></td><td>todo</td>\
      </tr>\
      <tr>\
        <td>Finished</td><td><%= finishedToday %></td><td>todo</td>\
      </tr>\
      <tr>\
        <td>Interrupted </td><td><%= interruptedToday %></td><td>todo</td>\
      </tr>\
    </table>\
  </div>\
';
var S4, Store, guid;

if (window.K2) {
  S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  guid = function() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  };
  Store = (function() {

    function Store(name) {
      var store;
      this.name = name;
      store = localStorage.getItem(this.name);
      this.data = (store && JSON.parse(store)) || {};
    }

    Store.prototype.save = function() {
      return localStorage.setItem(this.name, JSON.stringify(this.data));
    };

    Store.prototype.create = function(model) {
      if (!model.id) {
        model.id = model.attributes.id = guid();
      }
      this.data[model.id] = model;
      this.save();
      return model;
    };

    Store.prototype.update = function(model) {
      this.data[model.id] = model;
      this.save();
      return model;
    };

    Store.prototype.find = function(model) {
      return this.data[model.id];
    };

    Store.prototype.findAll = function() {
      return _.values(this.data);
    };

    Store.prototype.destroy = function(model) {
      delete this.data[model.id];
      this.save();
      return model;
    };

    return Store;

  })();
}
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

if (window.K2) {
  K2.Timer = (function() {

    function Timer(timer) {
      if (timer == null) {
        timer = 1500000;
      }
      this.tick = __bind(this.tick, this);

      _.extend(this, Backbone.Events);
      this.intervalId = void 0;
      this.timerLength = timer;
    }

    Timer.prototype.initialTime = function() {
      var dateDiff;
      dateDiff = moment(new Date(this.timerLength));
      return [dateDiff.format('mm'), dateDiff.format('ss')];
    };

    Timer.prototype.currentTime = function() {
      var dateDiff, diff;
      diff = this.timerLength - this.timeDiff();
      if (diff >= 0) {
        dateDiff = moment(new Date(diff));
        return [dateDiff.format('mm'), dateDiff.format('ss')];
      } else {
        this.trigger('end');
        return ['00', '00'];
      }
    };

    Timer.prototype.tick = function() {
      return this.trigger('tick');
    };

    Timer.prototype.start = function() {
      if (this.intervalId) {
        return this;
      }
      this.intervalId = setInterval(this.tick, 1000);
      this.startTime = new Date().getTime();
      return this.tick();
    };

    Timer.prototype.stop = function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = void 0;
        return this.trigger('stop');
      }
    };

    Timer.prototype.timeDiff = function() {
      var now;
      now = new Date().getTime();
      return now - this.startTime;
    };

    Timer.prototype.destroy = function() {
      return this.off();
    };

    return Timer;

  })();
}
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

    PomodoroLog.prototype.createdAtDateString = function() {
      return new Date(this.get('created_at')).toDateString();
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

    PomodoroLogs.prototype.localStorage = new Store("komodoro_logs_" + K2.app.project.id);

    PomodoroLogs.prototype.all_for_task_id = function(task_id) {
      return this.filter(function(l) {
        return l.get('task_id') === task_id;
      });
    };

    PomodoroLogs.prototype.finished = function(task_id) {
      return _(this.all_for_task_id(task_id)).filter(function(l) {
        return l.get('type') === 'finished';
      });
    };

    PomodoroLogs.prototype.allToday = function() {
      var todayString;
      todayString = (new Date()).toDateString();
      return this.filter(function(l) {
        return l.createdAtDateString() === todayString;
      });
    };

    PomodoroLogs.prototype.finishedToday = function() {
      return this.allToday().filter(function(l) {
        return l.get('type') === 'finished';
      });
    };

    PomodoroLogs.prototype.comperator = function() {
      return this.get('created_at');
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
        all: this.collection.all_for_task_id(this.task.id).length,
        finished: this.collection.finished(this.task.id).length
      };
    };

    PomodoroLogsView.prototype.render = function() {
      var c,
        _this = this;
      this.$el.html(_.template(KP.Templates.pomodoroLogs, this.context()));
      c = this.collection.all_for_task_id(this.task.id);
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
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroLogsOverviewView = (function(_super) {

    __extends(PomodoroLogsOverviewView, _super);

    function PomodoroLogsOverviewView() {
      return PomodoroLogsOverviewView.__super__.constructor.apply(this, arguments);
    }

    PomodoroLogsOverviewView.prototype.context = function() {
      return {
        allToday: this.collection.allToday().length,
        finishedToday: this.collection.finishedToday().length,
        interruptedToday: this.collection.allToday().length - this.collection.finishedToday().length,
        allEver: "to do",
        finishedAll: "to do",
        interruptedAll: "to do"
      };
    };

    PomodoroLogsOverviewView.prototype.render = function() {
      this.$el.html(_.template(KP.Templates.pomodoroLogsOverview, this.context()));
      return this;
    };

    PomodoroLogsOverviewView.prototype.destroy = function() {
      this.off();
      return this.remove();
    };

    PomodoroLogsOverviewView.prototype.focus = function() {};

    return PomodoroLogsOverviewView;

  })(window.Backbone.View);
}
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.K2) {
  KP.PomodoroView = (function(_super) {

    __extends(PomodoroView, _super);

    function PomodoroView() {
      return PomodoroView.__super__.constructor.apply(this, arguments);
    }

    PomodoroView.prototype.events = {
      'click #start-pomodoro': 'onPomodoroStart',
      'click #stop-pomodoro': 'onPomodoroStop',
      'keydown input': 'onKeyDown'
    };

    PomodoroView.prototype.initialize = function() {
      PomodoroView.__super__.initialize.call(this, arguments);
      this.breakTimer = new K2.Timer(parseInt(KP.settings.breakTime, 10));
      this.breakTimer.on('end', this.onBreakTimerEnd, this);
      this.breakTimer.on('tick', this.onBreakTimerTick, this);
      this.pomodoroTimer = new K2.Timer(parseInt(KP.settings.pomodoroTime, 10));
      this.pomodoroTimer.on('end', this.onPomodoroTimerEnd, this);
      this.pomodoroTimer.on('tick', this.onPomodoroTimerTick, this);
      return this.documentTitle = $(document).attr('title');
    };

    PomodoroView.prototype.context = function() {
      var time;
      time = this.pomodoroTimer.initialTime();
      return {
        name: this.model.get('title'),
        description: this.model.get('description'),
        minutes: time[0],
        seconds: time[1]
      };
    };

    PomodoroView.prototype.render = function() {
      var log;
      this.$el.html(_.template(KP.Templates.pomodoroView, this.context()));
      log = new KP.PomodoroLogsView({
        collection: KP.app.pomodoroLog,
        task: this.model
      });
      this.$el.find('#pomodoro-log').html(log.render().el);
      return this;
    };

    PomodoroView.prototype.focus = function() {
      return this.$('input').focus();
    };

    PomodoroView.prototype.renderTimer = function(minutes, seconds) {
      this.$('.minutes').text(minutes);
      this.$('.seconds').text(seconds);
      return $(document).attr('title', "" + minutes + ":" + seconds);
    };

    PomodoroView.prototype.onBreakTimerTick = function() {
      var time;
      time = this.breakTimer.currentTime();
      return this.renderTimer(time[0], time[1]);
    };

    PomodoroView.prototype.onBreakTimerEnd = function() {
      KP.app.endSound.play();
      this.breakTimer.stop();
      $(document).attr('title', this.documentTitle);
      this.$('.break-info').hide();
      return this.$('.commands').show();
    };

    PomodoroView.prototype.onPomodoroTimerTick = function() {
      var time;
      time = this.pomodoroTimer.currentTime();
      return this.renderTimer(time[0], time[1]);
    };

    PomodoroView.prototype.onPomodoroTimerEnd = function() {
      var log;
      KP.app.endSound.play();
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'finished',
        time: this.pomodoroTimer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      this.pomodoroTimer.stop();
      $(document).attr('title', this.documentTitle);
      return this.startBreakTimer();
    };

    PomodoroView.prototype.startBreakTimer = function() {
      this.breakTimer.start();
      this.$('.commands').hide();
      return this.$('.break-info').show();
    };

    PomodoroView.prototype.onPomodoroStart = function(e) {
      this.pomodoroTimer.start();
      return false;
    };

    PomodoroView.prototype.onPomodoroStop = function(e) {
      var log;
      log = new KP.PomodoroLog({
        name: this.model.get('title'),
        task_id: this.model.id,
        type: 'interrupted',
        time: this.pomodoroTimer.timeDiff()
      });
      KP.app.pomodoroLog.add(log);
      log.save();
      $(document).attr('title', this.documentTitle);
      this.pomodoroTimer.stop();
      return false;
    };

    PomodoroView.prototype.onKeyDown = function(e) {
      if (e.keyCode === 13) {
        this.onPomodoroStart();
        return false;
      } else {
        return true;
      }
    };

    PomodoroView.prototype.destroy = function() {
      this.pomodoroTimer.stop();
      this.pomodoroTimer.destroy();
      delete this.pomodoroTimer;
      this.breakTimer.stop();
      this.breakTimer.destroy();
      delete this.breakTimer;
      $(document).attr('title', this.documentTitle);
      this.off();
      return this.remove();
    };

    return PomodoroView;

  })(window.Backbone.View);
}

KP.App = (function() {

  function App() {
    var _this = this;
    $(document).bind('initial-load-finished', function() {
      return _this.init();
    });
    KP.url = $('#komodoro-url').val();
    KP.app = this;
    this.loadSettings();
  }

  App.prototype.loadSettings = function() {
    if (localStorage['komodoro_settings']) {
      return KP.settings = JSON.parse(localStorage['komodoro_settings']);
    } else {
      return KP.settings = {
        sounds: false,
        pomodoroTime: 150000,
        breakTime: 30000
      };
    }
  };

  App.prototype.init = function() {
    var el, thiz;
    console.log('KP init');
    this.pomodoroLog = new KP.PomodoroLogs();
    this.pomodoroLog.fetch();
    el = $("<a class='pomodoro'><img src='" + KP.url + "/assets/tomato.png' alt='P' style='width: 8px; height: 8px;'/></a>");
    $('.task-view .task-panel').append(el);
    thiz = this;
    $('.task-view .pomodoro').click(function(e) {
      e.preventDefault();
      thiz.onPomodorIconClicked(this);
      return false;
    });
    this.endSound = new KP.KAudio("" + KP.url + "/assets/stop.wav");
    this.startSound = new KP.KAudio("" + KP.url + "/assets/start.wav");
    this.endBreakSound = new KP.KAudio("" + KP.url + "/assets/end_of_break.wav");
    this.tickSound = new KP.KAudio("" + KP.url + "/assets/tick.wav");
    return this.createLogOverviewListener();
  };

  App.prototype.onPomodorIconClicked = function(el) {
    var pomodoroView, taskModel;
    taskModel = $(el).parents('.task-view').view().model;
    pomodoroView = new KP.PomodoroView({
      model: taskModel
    });
    K2.modal.displayView(pomodoroView);
    return false;
  };

  App.prototype.onPomodorLogsOverviewClicked = function() {
    var pomodoroView;
    pomodoroView = new KP.PomodoroLogsOverviewView({
      collection: this.pomodoroLog
    });
    K2.modal.displayView(pomodoroView);
    return false;
  };

  App.prototype.createLogOverviewListener = function() {
    var el,
      _this = this;
    el = '<li><a id="komodoro-logs-overview">komodoro</a></li>';
    $('#topnav').append(el);
    return $('#komodoro-logs-overview').click(function(e) {
      e.preventDefault();
      _this.onPomodorLogsOverviewClicked();
      return false;
    });
  };

  return App;

})();

KP.KAudio = (function() {

  function KAudio(src) {
    this.sound = new window.Audio(src);
  }

  KAudio.prototype.play = function() {
    if (this._canPlay()) {
      return this.sound.play();
    }
  };

  KAudio.prototype._canPlay = function() {
    return KP.settings.sounds;
  };

  return KAudio;

})();

if (window.K2) {
  new KP.App();
}
} catch(e) { console.log(e); }
