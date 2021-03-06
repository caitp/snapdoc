;(function(global) {

var ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    PROCESSING_INSTRUCTION_NODE = 7,
    COMMENT_NODE = 8,
    DOCUMENT_NODE = 9,
    DOCUMENT_TYPE_NODE = 10,
    DOCUMENT_FRAGMENT_NODE = 11;

function IsString(maybeString) {
  return typeof maybeString === "string";
}

function IsObject(maybeObject) {
  return (maybeObject && typeof maybeObject === "object") || false;
}

function IsFunction(maybeFunction) {
  return typeof maybeFunction === "function";
}

function QuotedString(string) {
  return '"' + string + '"';
}

var JQueryAliases = ['$', 'jQuery'];

function IsJQueryLike(node) {
  // WARNING: This is not speedy. This should probably be configurable.
  var jQuery, i, ii = JQueryAliases.length;
  for (i=0; i<ii; ++i) {
    var alias = JQueryAliases[i];
    if (IsFunction(global[alias]) && node instanceof global[alias]) {
      return true;
    }
  }

  // As a last-ditch effort, try Angular's jqLite.
  var jqLite = IsObject(global.angular) && IsFunction(angular.element) && angular.element;
  return (jqLite && node instanceof jqLite); 
}

function DisplaceNode(node) {
  var parentNode = node.parentNode;
  var nextSibling = node.nextSibling;
  var text = false;
  if (global.document && parentNode) {
    var temp = global.document.createElement('div');
    temp.appendChild(node);
    text = temp.innerHTML;
    temp.removeChild(node);
    if (nextSibling) {
      parentNode.insertBefore(node, nextSibling);
    } else {
      parentNode.appendChild(node);
    }
  }
  return text;
}

function ElementToHTML(element) {
  return DisplaceNode(element);
}

function TextToHTML(text) {
  return DisplaceNode(text) || text.data;
}

function ProcessingInstructionToHTML(pi) {
  var text = '';
  if (pi.nodeType === COMMENT_NODE) {
    var match = PI_REGEXP.exec(pi.data);
    if (match) {
      text = '<?' + match[1] + match[2] + match[7] + '?>';
    }
  } else {
    text = DisplaceNode(pi);
    if (text === false) {
      var data = IsString(pi.data) && pi.data;
      text = '<?' + pi.target;
      if (data) text += ' ' + pi.data + ' ';
      text += '?>';
    }
  }
  return text;
}

var PI_REGEXP = /^\?(\w+)((\s+(\w+)=((['"])[^\6]*\6))*)(\s*)\?$/;

function CommentToHTML(comment) {
  // Chrome is kind of stupid, and can mistake a PI node for a Comment. It will render them
  // incorrectly, so we need to pre-process the node to make sure it's actually a PI, before
  // deferring to the DOM.
  var match = PI_REGEXP.exec(comment.data);
  if (match) {
    return '<?' + match[1] + match[2] + match[7] + '?>';
  }
  
  var text = DisplaceNode(comment);
  if (text === false) {
    
  }
  return text;
}

function DocumentToHTML(document) {
  var text = '';
  for (var i=0, ii=document.childNodes.length; i<ii; ++i) {
    text += NodeToHTML(document.childNodes[i]);
  }
  return text;
}

function DocumentTypeToHTML(doctype) {
  var html = ['!DOCTYPE', doctype.name || "html"];
  if (doctype.publicId && IsString(doctype.publicId)) {
    html.push('PUBLIC', QuotedString(doctype.publicId));
    if (doctype.systemId && IsString(doctype.systemId)) {
      html.push(QuotedString(doctype.systemId));
    }
  }
  return '<' + html.join(' ') + '>';
}

function DocumentFragmentToHTML(fragment) {
  
}

function JQueryNodesToHTML(jqNodes) {
  if (!jqNodes) throw new Error("expected jQuery node, got " + jqNodes);
  var i, ii = node.length, result = [];
  for (i=0; i<ii; ++i) {
    result.push(NodeToHTML(node[i]));
  }
  return result.join("");
}

function NodeToHTML(node) {
  if (!node) throw new Error("expected DOM node, got " + node);

  switch (node.nodeType) {
  case ELEMENT_NODE: return ElementToHTML(node);
  case TEXT_NODE: return TextToHTML(node);
  case PROCESSING_INSTRUCTION_NODE: return ProcessingInstructionToHTML(node);
  case COMMENT_NODE: return CommentToHTML(node);
  case DOCUMENT_NODE: return DocumentToHTML(node);
  case DOCUMENT_TYPE_NODE: return DocumentTypeToHTML(node);
  case DOCUMENT_FRAGMENT_NODE: return DocumentFragmentToHTML(node);
  default: throw new Error("Unsupported DOM node type");
  }
}

function Wrap(nodeFunction) {
  return function(node) {
    if (node) {
      if (IsJQueryLike(node)) {
        node = node[0];
      }
      return node && nodeFunction(node);
    }
    return "";
  }
}

function snapdoc(node) {
  if (!node) node = document;
  else if (node instanceof Window) node = node.document;
  else if (IsJQueryLike(node)) return JQueryNodesToHTML(node);
  return NodeToHTML(node);
}

var snap = snapdoc;

snap.snap = snapdoc;
snap.element = Wrap(ElementToHTML);
snap.text = Wrap(TextToHTML);
snap.processing = Wrap(ProcessingInstructionToHTML);
snap.comment = Wrap(CommentToHTML);
snap.document = Wrap(DocumentToHTML);
snap.doctype = Wrap(DocumentTypeToHTML);
snap.fragment = Wrap(DocumentFragmentToHTML);

var exports = IsObject(global.exports) && !global.exports.nodeType && global.exports;
var module = IsObject(global.module) && !global.module.nodeType && global.module;
var moduleExports = module && module.exports === exports && exports;
var amd = IsFunction(global.define) && IsObject(global.define.amd);

if (amd) {
  global.define(function() {
    return snap;
  });
} else if (exports && module) {
  if (moduleExports) module.exports = snap;
  else exports.snapdoc = snap;
} else {
  global.snapdoc = snap;
}

})(this);
