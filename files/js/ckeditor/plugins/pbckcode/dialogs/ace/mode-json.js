﻿define("ace/mode/json", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/json_highlight_rules ace/mode/matching_brace_outdent ace/mode/behaviour/cstyle ace/mode/folding/cstyle ace/worker/worker_client".split(" "), function (g, j) {
    var i = g("../lib/oop"), f = g("./text").Mode, e = g("../tokenizer").Tokenizer, a = g("./json_highlight_rules").JsonHighlightRules, h = g("./matching_brace_outdent").MatchingBraceOutdent, b = g("./behaviour/cstyle").CstyleBehaviour, c = g("./folding/cstyle").FoldMode, d = g("../worker/worker_client").WorkerClient,
        k = function () {
            this.$tokenizer = new e((new a).getRules());
            this.$outdent = new h;
            this.$behaviour = new b;
            this.foldingRules = new c
        };
    i.inherits(k, f);
    (function () {
        this.getNextLineIndent = function (a, b, d) {
            var c = this.$getIndent(b);
            a == "start" && b.match(/^.*[\{\(\[]\s*$/) && (c = c + d);
            return c
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        };
        this.createWorker = function (a) {
            var b = new d(["ace"], "ace/mode/json_worker", "JsonWorker");
            return b.attachToDocument(a.getDocument()),
                b.on("error", function (b) {
                    a.setAnnotations([b.data])
                }), b.on("ok", function () {
                a.clearAnnotations()
            }), b
        }
    }).call(k.prototype);
    j.Mode = k
});
define("ace/mode/json_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (g, j) {
    var i = g("../lib/oop"), f = g("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "variable", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},
            {token: "string", regex: '"', next: "string"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant.language.boolean",
                regex: "(?:true|false)\\b"},
            {token: "invalid.illegal", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "invalid.illegal", regex: "\\/\\/.*$"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], string: [
            {token: "constant.language.escape", regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},
            {token: "string", regex: '[^"\\\\]+', merge: !0},
            {token: "string", regex: '"', next: "start", merge: !0},
            {token: "string", regex: "", next: "start", merge: !0}
        ]}
    };
    i.inherits(e,
        f);
    j.JsonHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (g, j) {
    var i = g("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (e, a) {
            return/^\s+$/.test(e) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (e, a) {
            var h = e.getLine(a).match(/^(\s*\})/);
            if (!h)return 0;
            var h = h[1].length, b = e.findMatchingBracket({row: a, column: h});
            if (!b || b.row == a)return 0;
            b = this.$getIndent(e.getLine(b.row));
            e.replace(new i(a, 0, a, h - 1), b)
        };
        this.$getIndent = function (e) {
            return(e = e.match(/^(\s+)/)) ?
                e[1] : ""
        }
    }).call(f.prototype);
    j.MatchingBraceOutdent = f
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (g, j) {
    var i = g("../../lib/oop"), f = g("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (a, h, b, c, d) {
            if ("{" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == d) {
                if (b = b.getCursorPosition(), h = c.doc.getLine(b.row), d = h.substring(b.column, b.column + 1), "}" == d && null !== c.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == d && (b = b.getCursorPosition(), h = c.doc.getLine(b.row), d = h.substring(b.column, b.column + 1), "}" == d)) {
                b = c.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, h.substring(0, h.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, h, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(d.start.row).substring(d.end.column, d.end.column + 1))return d.end.column++, d
        });
        this.add("parens", "insertion", function (a, h, b, c, d) {
            if ("(" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == d && (a = b.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, h, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && "(" == a && ")" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            });
        this.add("brackets", "insertion", function (a, h, b, c, d) {
            if ("[" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == d && (a = b.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, h, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "[" == a && "]" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
        });
        this.add("string_dquotes", "insertion", function (a, h, b, c, d) {
            if ('"' == d || "'" == d) {
                a = b.getSelectionRange();
                h = c.doc.getTextRange(a);
                if ("" !== h)return{text: d + h + d, selection: !1};
                b = b.getCursorPosition();
                h = c.doc.getLine(b.row);
                if ("\\" == h.substring(b.column - 1,
                    b.column))return null;
                for (var c = c.getTokens(a.start.row), e = 0, f, g = -1, i = 0; i < c.length; i++) {
                    f = c[i];
                    "string" == f.type ? g = -1 : 0 > g && (g = f.value.indexOf(d));
                    if (f.value.length + e > a.start.column)break;
                    e += c[i].value.length
                }
                if (!f || 0 > g && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + e - 1 && f.value.lastIndexOf(d) === f.value.length - 1))return{text: d + d, selection: [1, 1]};
                if (f && "string" === f.type && h.substring(b.column, b.column + 1) == d)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, h, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && ('"' == a || "'" == a) && '"' == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            })
    };
    i.inherits(e, f);
    j.CstyleBehaviour = e
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (g, j) {
    var i = g("../../lib/oop"), f = g("../../range").Range, e = g("./fold_mode").FoldMode, a = j.FoldMode = function () {
    };
    i.inherits(a, e);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, c) {
            var d = a.getLine(c), e = d.match(this.foldingStartMarker);
            if (e) {
                b = e.index;
                if (e[1])return this.openingBracketBlock(a,
                    e[1], c, b);
                a = a.getCommentFoldRange(c, b + e[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (e = d.match(this.foldingStopMarker)) {
                b = e.index + e[0].length;
                if (e[2]) {
                    a = a.getCommentFoldRange(c, b);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: b};
                if (a = a.$findOpeningBracket(e[1], c))return a.column++, c.column--, f.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (g, j) {
    var i = g("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (f, e, a) {
            f = f.getLine(a);
            return this.foldingStartMarker.test(f) ? "start" : "markbeginend" == e && this.foldingStopMarker && this.foldingStopMarker.test(f) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (f, e, a) {
            var h = /\S/, b = f.getLine(e), c = b.search(h);
            if (-1 != c) {
                for (var a =
                    a || b.length, d = f.getLength(), g = b = e; ++e < d;) {
                    var j = f.getLine(e).search(h);
                    if (-1 != j) {
                        if (j <= c)break;
                        g = e
                    }
                }
                if (g > b)return f = f.getLine(g).length, new i(b, a, g, f)
            }
        };
        this.openingBracketBlock = function (f, e, a, g, b) {
            a = {row: a, column: g + 1};
            if (e = f.$findClosingBracket(e, a, b))return b = f.foldWidgets[e.row], null == b && (b = this.getFoldWidget(f, e.row)), "start" == b && e.row > a.row && (e.row--, e.column = f.getLine(e.row).length), i.fromPoints(a, e)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});