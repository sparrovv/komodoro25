p = new Proxy(document)

chrome.extension.sendRequest { method: "getSettings" }, (response) ->
  localStorage['komodoro_settings'] = response.settings

inject = (path) ->
  p.injectScript('', null, chrome.extension.getURL(path) + "?#{new Date().getTime()}")

inject 'js/komodoro_bundle.js'
