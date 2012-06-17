class Proxy

  constructor: (@document) ->
    @injectExtensionUrl()

  injectScript: (code, name=null, src=null) ->
    code = code.toString()

    if code.length > 0
      if name?
        code = "#{name} = #{code}"
      else
        code = "(#{code})()"

    if name and script = document.getElementById(name)
      script.innerHTML = code
    else
      script = @document.createElement("script")
      script.type = "text/javascript"
      script.id = name if name?
      script.src = src if src?
      script.innerHTML = code
      @document.head.appendChild(script)

  injectExtensionUrl: ->
    input = @document.createElement("input")
    input.type = "hidden"
    input.id = "komodoro-url"
    input.value = chrome.extension.getURL('')
    @document.body.appendChild(input)
