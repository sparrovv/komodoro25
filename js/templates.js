
KP.pomodorTemplate = '\
<div id="pomodoro-box">\
  <h2>Pomodoro for "<%= name %>"</h2>\
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
\
\
  <div id="pomodoro-log"></div>\
</div>\
';

KP.pomodoroLogTemplate = '\
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

KP.PomodoroLogEntry = '\
  <td><%= name %></td>\
  <td><%= type %></td>\
  <td><%= time %></td>\
  <td><%= created_at  %></td>\
';
