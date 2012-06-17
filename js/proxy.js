var Proxy;

Proxy = (function() {

  function Proxy(document) {
    this.document = document;
    this.injectExtensionUrl();
  }

  Proxy.prototype.injectScript = function(code, name, src) {
    var script;
    if (name == null) {
      name = null;
    }
    if (src == null) {
      src = null;
    }
    code = code.toString();
    if (code.length > 0) {
      if (name != null) {
        code = "" + name + " = " + code;
      } else {
        code = "(" + code + ")()";
      }
    }
    if (name && (script = document.getElementById(name))) {
      return script.innerHTML = code;
    } else {
      script = this.document.createElement("script");
      script.type = "text/javascript";
      if (name != null) {
        script.id = name;
      }
      if (src != null) {
        script.src = src;
      }
      script.innerHTML = code;
      return this.document.head.appendChild(script);
    }
  };

  Proxy.prototype.injectExtensionUrl = function() {
    var input;
    input = this.document.createElement("input");
    input.type = "hidden";
    input.id = "komodoro-url";
    input.value = chrome.extension.getURL('');
    return this.document.body.appendChild(input);
  };

  return Proxy;

})();
