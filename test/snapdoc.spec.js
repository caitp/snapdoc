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
