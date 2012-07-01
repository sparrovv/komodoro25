var inject, p;

p = new Proxy(document);

chrome.extension.sendRequest({
  method: "getSettings"
}, function(response) {
  return localStorage['komodoro_settings'] = response.settings;
});

inject = function(path) {
  return p.injectScript('', null, chrome.extension.getURL(path) + ("?" + (new Date().getTime())));
};

inject('js/komodoro_bundle.js');
