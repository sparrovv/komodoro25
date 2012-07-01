
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
