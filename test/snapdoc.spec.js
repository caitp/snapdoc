function getChildElement(parent, nodeName) {
  for (var i=0, ii=parent.childNodes.length; i<ii; ++i) {
    var node = parent.childNodes[i];
    if (node.nodeName.toLowerCase() === nodeName.toLowerCase()) {
      return node;
    }
  }
  return null;
}

describe("DocumentTypeToHTML", function() {
  it("should render HTML4.01 strict doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/html.4.01.strict.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" ' +
              '"http://www.w3.org/TR/html4/strict.dtd">');
      done();
    });
  });


  it("should render HTML4.01 transitional doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/html.4.01.transitional.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" ' +
              '"http://www.w3.org/TR/html4/loose.dtd">');
      done();
    });
  });


  it("should render HTML4.01 frameset doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/html.4.01.frameset.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" ' +
              '"http://www.w3.org/TR/html4/frameset.dtd">');
      done();
    });
  });


  it("should render XHTML1.0 strict doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/xhtml.1.0.strict.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
              '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
      done();
    });
  });


  it("should render XHTML1.0 transitional doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/xhtml.1.0.transitional.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
              '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
      done();
    });
  });


  it("should render XHTML1.0 frameset doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/xhtml.1.0.frameset.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" ' +
              '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">');
      done();
    });
  });


  it("should render XHTML1.1 basic doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/xhtml.1.1.basic.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" ' +
              '"http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">');
      done();
    });
  });


  it("should render XHTML1.1 doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/xhtml.1.1.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype))
        .toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" ' +
              '"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">');
      done();
    });
  });


  it("should render HTML5 doctype", function(done) {
    this.loadDocument("/test/fixtures/doctype/html5.html", function(doc) {
      expect(snapdoc.doctype(doc.doctype)).toBe('<!DOCTYPE html>');
      done();
    });
  });
});

describe("CommentToHTML", function() {
  function collectComments(body) {
    var comments = [];
    for (var i=0, ii=body.childNodes.length; i<ii; ++i) {
      var node = body.childNodes[i];
      if (node.nodeType === 8) {
        comments.push(node);
      }
    }
    return comments;
  }
  it("should render comments", function(done) {
    this.loadDocument("/test/fixtures/comments/basic.html", function(doc) {
      var comment = collectComments(doc.body)[0];
      expect(snapdoc.comment(comment)).toBe('<!-- Hello, world! -->');
      done();
    });
  });
});

describe("ProcessingInstructionToHTML", function() {
  it("should render common xml version/encoding processing instruction", function(done) {
    this.loadDocument("/test/fixtures/processing_instruction/xml.version.encoding.html", function(doc) {
      expect(snapdoc.processing(doc.childNodes[0])).toBe('<?xml version="1.0" encoding="UTF-8" ?>');
      done();
    });
  });

  if (document.createProcessingInstruction) {
    it("should render common xml version/encoding processing instruction from PI node type", function() {
      // This method is totally synchronous and doesn't depend on loading a fixture at all! This
      // test is needed, because the previous test is possibly using a comment node due to Chrome's
      // weirdness.
      var pi = document.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"');
      expect(snapdoc.processing(pi)).toBe('<?xml version="1.0" encoding="UTF-8" ?>');
    });
  }
});

describe("TextToHTML", function() {
  it("should render text nodes with latin1 characters", function(done) {
    this.loadDocument("/test/fixtures/text_nodes/paragraph.latin1.html", function(doc) {
      var text = getChildElement(doc.body, "p").childNodes[0];
      expect(snapdoc.text(text)).toBe('Hello, world!');
      done();
    });
  });


  it("should render text nodes with non-latin1 characters in the unicode BMP", function(done) {
    this.loadDocument("/test/fixtures/text_nodes/paragraph.bmp.html", function(doc) {
      var text = getChildElement(doc.body, "p").childNodes[0];
      expect(snapdoc.text(text)).toBe('안녕하세요');
      done();
    });
  });


  it("should render text nodes with characters in the unicode supplementary planes", function(done) {
    this.loadDocument("/test/fixtures/text_nodes/paragraph.supplementary.html", function(doc) {
      var text = getChildElement(doc.body, "p").childNodes[0];
      expect(snapdoc.text(text)).toBe('☼☉☽♂♀♃☿♄');
      done();
    });
  });
});


describe("ElementToHTML", function() {
  var elements = {
    "p": ["<p>hello, world</p>", "<p>hello, world</p>"],
    "i": ["<i>hello, world</i>", "<i>hello, world</i>"],
    "b": ["<b>hello, world</b>", "<b>hello, world</b>"],
    "em": ["<em>hello, world</em>", "<em>hello, world</em>"],
    "strong": ["<strong>hello, world</strong>", "<strong>hello, world</strong>"],
    "h1": ["<h1>hello, world</h1>", "<h1>hello, world</h1>"],
    "h2": ["<h2>hello, world</h2>", "<h2>hello, world</h2>"],
    "h3": ["<h3>hello, world</h3>", "<h3>hello, world</h3>"],
    "h4": ["<h4>hello, world</h4>", "<h4>hello, world</h4>"],
    "h5": ["<h5>hello, world</h5>", "<h5>hello, world</h5>"],
    "h6": ["<h6>hello, world</h6>", "<h6>hello, world</h6>"],
    "form": ['<form><input type="text" value="foo"></form>', '<form><input type="text" value="foo"></form>'],
    "div": ["<div><p><b>yo</b></p></div>", "<div><p><b>yo</b></p></div>"],
    "main": ["<main><p><b>yo</b></p></main>", "<main><p><b>yo</b></p></main>"],
    "article": ["<article><p><b>yo</b></p></article>", "<article><p><b>yo</b></p></article>"],
    "aside": ["<aside><p><b>yo</b></p></aside>", "<aside><p><b>yo</b></p></aside>"],
    "header": ["<header><p><b>yo</b></p></header>", "<header><p><b>yo</b></p></header>"],
    "footer": ["<footer><p><b>yo</b></p></footer>", "<footer><p><b>yo</b></p></footer>"],
    "nav": ["<nav><p><b>yo</b></p></nav>", "<nav><p><b>yo</b></p></nav>"],
    "table": [
      "<table><thead><tr><th>foo</th><th>bar</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody><tfoot><tr><td>c</td><td>d</td></tr></tfoot></table>",
      "<table><thead><tr><th>foo</th><th>bar</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody><tfoot><tr><td>c</td><td>d</td></tr></tfoot></table>"
    ]
  };

  for (var k in elements) {
    (function(name) {
      it("should deserialize <" + name + "> element", function() {
        var bits = elements[name];
        var p = document.createElement("div");
        p.innerHTML = bits[0];
        var toplevel = getChildElement(p, name);
        expect(snapdoc.element(toplevel)).toBe(bits[1]);
      });
    })(k);
  }
});
