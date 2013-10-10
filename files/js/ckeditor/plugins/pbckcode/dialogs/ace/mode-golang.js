﻿define("ace/mode/golang", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/golang_highlight_rules ace/mode/matching_brace_outdent ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (g, j) {
    var i = g("../lib/oop"), f = g("./text").Mode, d = g("../tokenizer").Tokenizer, a = g("./golang_highlight_rules").GolangHighlightRules, h = g("./matching_brace_outdent").MatchingBraceOutdent;
    g("./behaviour/cstyle");
    var b = g("./folding/cstyle").FoldMode, c = function () {
        this.$tokenizer = new d((new a).getRules());
        this.$outdent = new h;
        this.foldingRules = new b
    };
    i.inherits(c, f);
    (function () {
        this.toggleCommentLines = function (a, b, c, h) {
            for (var d = true, a = /^(\s*)\/\//, f = c; f <= h; f++)if (!a.test(b.getLine(f))) {
                d = false;
                break
            }
            if (d) {
                d = new Range(0, 0, 0, 0);
                for (f = c; f <= h; f++) {
                    c = b.getLine(f).match(a);
                    d.start.row = f;
                    d.end.row = f;
                    d.end.column = c[0].length;
                    b.replace(d, c[1])
                }
            } else b.indentRows(c, h, "//")
        };
        this.getNextLineIndent = function (a, b, c) {
            var h = this.$getIndent(b), d = this.$tokenizer.getLineTokens(b, a).tokens;
            if (d.length && d[d.length - 1].type ==
                "comment")return h;
            a == "start" && b.match(/^.*[\{\(\[]\s*$/) && (h = h + c);
            return h
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        }
    }).call(c.prototype);
    j.Mode = c
});
define("ace/mode/golang_highlight_rules", "require exports module ace/lib/oop ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (g, j) {
    var i = g("../lib/oop"), f = g("./doc_comment_highlight_rules").DocCommentHighlightRules, d = g("./text_highlight_rules").TextHighlightRules, a = function () {
        var a = this.createKeywordMapper({"variable.language": "this", keyword: "true|else|false|break|case|return|goto|if|const|continue|struct|default|switch|for|func|import|package|chan|defer|fallthrough|go|interface|map|rangeselect|type|var",
            "constant.language": "nil|true|false|iota"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: "\\/\\/.*$"},
            f.getStartRule("doc-start"),
            {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", merge: true, regex: '["].*\\\\$', next: "qqstring"},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "string", merge: true, regex: "['].*\\\\$", next: "qstring"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant", regex: "<[a-zA-Z0-9.]+>"},
            {token: "keyword", regex: "(?:#include|#pragma|#line|#define|#undef|#ifdef|#else|#elif|#endif|#ifndef)"},
            {token: a, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},
            {token: "punctuation.operator", regex: "\\?|\\:|\\,|\\;|\\."},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ], qqstring: [
            {token: "string", regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"', next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'", next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ]};
        this.embedRules(f, "doc-", [f.getEndRule("start")])
    };
    i.inherits(a,
        d);
    j.GolangHighlightRules = a
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (g, j) {
    var i = g("../lib/oop"), f = g("./text_highlight_rules").TextHighlightRules, d = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    i.inherits(d, f);
    d.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    d.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    j.DocCommentHighlightRules = d
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (g, j) {
    var i = g("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (d, a) {
            return/^\s+$/.test(d) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (d, a) {
            var h = d.getLine(a).match(/^(\s*\})/);
            if (!h)return 0;
            var h = h[1].length, b = d.findMatchingBracket({row: a, column: h});
            if (!b || b.row == a)return 0;
            b = this.$getIndent(d.getLine(b.row));
            d.replace(new i(a, 0, a, h - 1), b)
        };
        this.$getIndent = function (d) {
            return(d = d.match(/^(\s+)/)) ?
                d[1] : ""
        }
    }).call(f.prototype);
    j.MatchingBraceOutdent = f
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (g, j) {
    var i = g("../../lib/oop"), f = g("../behaviour").Behaviour, d = function () {
        this.add("braces", "insertion", function (a, h, b, c, e) {
            if ("{" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == e) {
                if (b = b.getCursorPosition(), h = c.doc.getLine(b.row), e = h.substring(b.column, b.column + 1), "}" == e && null !== c.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == e && (b = b.getCursorPosition(), h = c.doc.getLine(b.row), e = h.substring(b.column, b.column + 1), "}" == e)) {
                b = c.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, h.substring(0, h.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, h, b, c, e) {
            a = c.doc.getTextRange(e);
            if (!e.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(e.start.row).substring(e.end.column, e.end.column + 1))return e.end.column++, e
        });
        this.add("parens", "insertion", function (a, h, b, c, e) {
            if ("(" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == e && (a = b.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, h, b, c, e) {
                a = c.doc.getTextRange(e);
                if (!e.isMultiLine() && "(" == a && ")" == c.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            });
        this.add("brackets", "insertion", function (a, h, b, c, e) {
            if ("[" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == e && (a = b.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, h, b, c, e) {
            a = c.doc.getTextRange(e);
            if (!e.isMultiLine() && "[" == a && "]" == c.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
        });
        this.add("string_dquotes", "insertion", function (a, h, b, c, e) {
            if ('"' == e || "'" == e) {
                a = b.getSelectionRange();
                h = c.doc.getTextRange(a);
                if ("" !== h)return{text: e + h + e, selection: !1};
                b = b.getCursorPosition();
                h = c.doc.getLine(b.row);
                if ("\\" == h.substring(b.column - 1,
                    b.column))return null;
                for (var c = c.getTokens(a.start.row), d = 0, f, g = -1, i = 0; i < c.length; i++) {
                    f = c[i];
                    "string" == f.type ? g = -1 : 0 > g && (g = f.value.indexOf(e));
                    if (f.value.length + d > a.start.column)break;
                    d += c[i].value.length
                }
                if (!f || 0 > g && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + d - 1 && f.value.lastIndexOf(e) === f.value.length - 1))return{text: e + e, selection: [1, 1]};
                if (f && "string" === f.type && h.substring(b.column, b.column + 1) == e)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, d, b, c, e) {
                a = c.doc.getTextRange(e);
                if (!e.isMultiLine() && ('"' == a || "'" == a) && '"' == c.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            })
    };
    i.inherits(d, f);
    j.CstyleBehaviour = d
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (g, j) {
    var i = g("../../lib/oop"), f = g("../../range").Range, d = g("./fold_mode").FoldMode, a = j.FoldMode = function () {
    };
    i.inherits(a, d);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, c) {
            var d = a.getLine(c), g = d.match(this.foldingStartMarker);
            if (g) {
                b = g.index;
                if (g[1])return this.openingBracketBlock(a,
                    g[1], c, b);
                a = a.getCommentFoldRange(c, b + g[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (g = d.match(this.foldingStopMarker)) {
                b = g.index + g[0].length;
                if (g[2]) {
                    a = a.getCommentFoldRange(c, b);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: b};
                if (a = a.$findOpeningBracket(g[1], c))return a.column++, c.column--, f.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (g, j) {
    var i = g("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (f, d, a) {
            f = f.getLine(a);
            return this.foldingStartMarker.test(f) ? "start" : "markbeginend" == d && this.foldingStopMarker && this.foldingStopMarker.test(f) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (f, d, a) {
            var g = /\S/, b = f.getLine(d), c = b.search(g);
            if (-1 != c) {
                for (var a =
                    a || b.length, e = f.getLength(), j = b = d; ++d < e;) {
                    var k = f.getLine(d).search(g);
                    if (-1 != k) {
                        if (k <= c)break;
                        j = d
                    }
                }
                if (j > b)return f = f.getLine(j).length, new i(b, a, j, f)
            }
        };
        this.openingBracketBlock = function (f, d, a, g, b) {
            a = {row: a, column: g + 1};
            if (d = f.$findClosingBracket(d, a, b))return b = f.foldWidgets[d.row], null == b && (b = this.getFoldWidget(f, d.row)), "start" == b && d.row > a.row && (d.row--, d.column = f.getLine(d.row).length), i.fromPoints(a, d)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});