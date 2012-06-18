p = new Proxy(document)

chrome.extension.sendRequest { method: "getSettings" }, (response) ->
  console.log(response.settings)
  localStorage['komodoro_settings'] = response.settings

inject = (path) ->
  p.injectScript('', null, chrome.extension.getURL(path) + "?#{new Date().getTime()}")

inject 'js/init.js'
inject 'js/templates.js'
inject 'js/local_storage.js'
inject 'js/timer.js'
inject 'js/pomodoro_log.js'
inject 'js/pomodoro_log_view.js'
inject 'js/pomodoro_view.js'
inject 'js/app.js'
