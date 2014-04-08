beforeEach(function() {
  // In Jasmine tests, we are not in the global context, and need to ensure that async callbacks
  // get the right spec context. Thus, remember it here.
  var currentSpec = this;

  var msie = "documentMode" in document && document.documentMode;

  var addOneEventListener = document.addEventListener
    ? function(node, type, fn) { node.addEventListener(type, fn, false); }
    : function(node, type, fn) { node.attachEvent('on' + type, fn); };
  var removeOneEventListener = document.removeEventListener
    ? function(node, type, fn) { node.removeEventListener(type, fn, false); }
    : function(node, type, fn) { node.detachEvent('on' + type, fn); };

  function addEventListener(node, types, fn) {
    types = types.split(/\s+/);
    for (var i=0, ii=types.length; i<ii; ++i) {
      addOneEventListener(node, types[i], fn);
    }
  }

  function removeEventListener(node, types, fn) {
    types = types.split(/\s+/);
    for (var i=0, ii=types.length; i<ii; ++i) {
      removeOneEventListener(node, types[i], fn);
    }
  }


  function createXHR(method) {
    if (!method) method = "get";
    if ((msie && msie <= 8) &&
         (!method.match(/^(get|post|head|put|delete|options)$/i) ||
         !window.XMLHttpRequest)) {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      return new window.XMLHttpRequest();
    } else throw new Error("No XMLHttpRequest available");
  }

  currentSpec.loadDocument = function loadDocument(url, done) {
    if (url.indexOf("/base") !== 0) {
      var prepend = "/base";
      if (url.charAt(0) !== "/") prepend += "/";
      url = prepend + url;
    }

    var iframe = document.createElement('iframe');
    addEventListener(iframe, 'load error', function fini(event) {
      var doc = iframe.contentDocument
             || (iframe.contentWindow && iframe.contentWindow.document) || null;
      iframe.parentNode.removeChild(iframe);
      removeEventListener(iframe, 'load error', fini);
      done.call(currentSpec, doc);
    });
    iframe.src = url;
    document.body.appendChild(iframe);
  }
});