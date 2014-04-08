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