#snapdoc

##About

This project was created based on a discussion in [#angularjs on freenode](http://webchat.freenode.net/?channels=angularjs),
regarding the ability to serialize a snapshot of a dynamic DOM (dynamic due to manipulation via, for example, AngularJS
routing or directives), in order to validate the output.

This is an interesting task, but unfortunately it's very difficult to serialize the DOM in this way, and there are a number
of reasons why:

1) The browser serializes the DOM in a "correct" way, nearly every time. There are some quirks with rendering, however, the
browser will always close unclosed tags, will remove unallowed elements unless they're created in a very specific fashion.
It is very difficult to get the browser to serialize invalid markup, except for serializing custom attributes as they are
specified.

2) Even if the browser could serialize not-totally-valid DOM as it truly appears, with AngularJS in particular, we don't
really know when the DOM is ready to be serialized, as there is no event to listen for. For other dynamic applications,
such as jQuery + PJAX, this ought to be much simpler. But for dynamic websites using frameworks like Angular, it is quite
difficult.

Despite these problems, it was a fun little project, and I've learned some things I didn't know about how specific browsers
will serialize DOM. And that's what this stuff is all about, really. Experimenting, trying things, and seeing what works
and what doesn't.

So, anyone who would like to is perfectly free to use this library in any fashion they like. See [LICENSE](#license) for
details.

##License

The MIT License (MIT)

Copyright (c) 2013 Caitlin Potter & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
