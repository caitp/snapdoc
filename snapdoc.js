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
  var jqLite = IsObject(angular) && IsFunction(angular.element) && angular.element;
  return (jqLite && node instanceof jqLite); 
}

function ElementToHTML(element) {
  
}

function TextToHTML(text) {
  
}

function ProcessingInstructionToHTML(pi) {
  
}

function CommentToHTML(comment) {
  
}

function DocumentToHTML(document) {
  
}

function DocumentTypeToHTML(doctype) {
  var html = ['DOCTYPE', doctype.name || "html"];
  if (IsString(doctype.publicId)) html.push('PUBLIC', QuotedString(doctype.publicId));
  if (IsString(doctype.systemId)) html.push(QuotedString(doctype.systemId));
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
      if (IsJQueryLikeNode(node)) {
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
};

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
