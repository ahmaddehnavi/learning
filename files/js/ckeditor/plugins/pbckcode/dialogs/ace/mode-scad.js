﻿define("ace/mode/scad", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/scad_highlight_rules ace/mode/matching_brace_outdent ace/range ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (h, j) {
    var i = h("../lib/oop"), f = h("./text").Mode, d = h("../tokenizer").Tokenizer, a = h("./scad_highlight_rules").scadHighlightRules, g = h("./matching_brace_outdent").MatchingBraceOutdent, b = h("../range").Range, c = h("./behaviour/cstyle").CstyleBehaviour, e = h("./folding/cstyle").FoldMode,
        k = function () {
            this.$tokenizer = new d((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new c;
            this.foldingRules = new e
        };
    i.inherits(k, f);
    (function () {
        this.toggleCommentLines = function (a, e, c, g) {
            for (var d = true, a = /^(\s*)\/\//, f = c; f <= g; f++)if (!a.test(e.getLine(f))) {
                d = false;
                break
            }
            if (d) {
                d = new b(0, 0, 0, 0);
                for (f = c; f <= g; f++) {
                    c = e.getLine(f).match(a);
                    d.start.row = f;
                    d.end.row = f;
                    d.end.column = c[0].length;
                    e.replace(d, c[1])
                }
            } else e.indentRows(c, g, "//")
        };
        this.getNextLineIndent = function (a, c, e) {
            var b = this.$getIndent(c),
                g = this.$tokenizer.getLineTokens(c, a), d = g.tokens, g = g.state;
            if (d.length && d[d.length - 1].type == "comment")return b;
            if (a == "start")(a = c.match(/^.*[\{\(\[]\s*$/)) && (b = b + e); else if (a == "doc-start") {
                if (g == "start")return"";
                (a = c.match(/^\s*(\/?)\*/)) && (a[1] && (b = b + " "), b = b + "* ")
            }
            return b
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        }
    }).call(k.prototype);
    j.Mode = k
});
define("ace/mode/scad_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (h, j) {
    var i = h("../lib/oop");
    h("../lib/lang");
    var f = h("./doc_comment_highlight_rules").DocCommentHighlightRules, d = h("./text_highlight_rules").TextHighlightRules, a = function () {
        var a = this.createKeywordMapper({"variable.language": "this", keyword: "module|if|else|for", "constant.language": "NULL"}, "identifier");
        this.$rules = {start: [
            {token: "comment",
                regex: "\\/\\/.*$"},
            f.getStartRule("start"),
            {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: '["].*\\\\$', next: "qqstring"},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "string", regex: "['].*\\\\$", next: "qstring"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant", regex: "<[a-zA-Z0-9.]+>"},
            {token: "keyword", regex: "(?:use|include)"},
            {token: a, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ], qqstring: [
            {token: "string",
                regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"', next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'", next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ]};
        this.embedRules(f, "doc-", [f.getEndRule("start")])
    };
    i.inherits(a, d);
    j.scadHighlightRules = a
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (h, j) {
    var i = h("../lib/oop"), f = h("./text_highlight_rules").TextHighlightRules, d = function () {
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
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (d, a) {
            return/^\s+$/.test(d) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (d, a) {
            var g = d.getLine(a).match(/^(\s*\})/);
            if (!g)return 0;
            var g = g[1].length, b = d.findMatchingBracket({row: a, column: g});
            if (!b || b.row == a)return 0;
            b = this.$getIndent(d.getLine(b.row));
            d.replace(new i(a, 0, a, g - 1), b)
        };
        this.$getIndent = function (d) {
            return(d = d.match(/^(\s+)/)) ?
                d[1] : ""
        }
    }).call(f.prototype);
    j.MatchingBraceOutdent = f
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (h, j) {
    var i = h("../../lib/oop"), f = h("../behaviour").Behaviour, d = function () {
        this.add("braces", "insertion", function (a, g, b, c, e) {
            if ("{" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == e) {
                if (b = b.getCursorPosition(), g = c.doc.getLine(b.row), e = g.substring(b.column, b.column + 1), "}" == e && null !== c.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == e && (b = b.getCursorPosition(), g = c.doc.getLine(b.row), e = g.substring(b.column, b.column + 1), "}" == e)) {
                b = c.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, g.substring(0, g.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, g, b, c, e) {
            a = c.doc.getTextRange(e);
            if (!e.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(e.start.row).substring(e.end.column, e.end.column + 1))return e.end.column++, e
        });
        this.add("parens", "insertion", function (a, g, b, c, e) {
            if ("(" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == e && (a = b.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, g, b, c, e) {
                a = c.doc.getTextRange(e);
                if (!e.isMultiLine() && "(" == a && ")" == c.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            });
        this.add("brackets", "insertion", function (a, g, b, c, e) {
            if ("[" == e)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == e && (a = b.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, g, b, c, e) {
            a = c.doc.getTextRange(e);
            if (!e.isMultiLine() && "[" == a && "]" == c.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
        });
        this.add("string_dquotes", "insertion", function (a, g, b, c, e) {
            if ('"' == e || "'" == e) {
                a = b.getSelectionRange();
                g = c.doc.getTextRange(a);
                if ("" !== g)return{text: e + g + e, selection: !1};
                b = b.getCursorPosition();
                g = c.doc.getLine(b.row);
                if ("\\" == g.substring(b.column - 1,
                    b.column))return null;
                for (var c = c.getTokens(a.start.row), d = 0, f, h = -1, i = 0; i < c.length; i++) {
                    f = c[i];
                    "string" == f.type ? h = -1 : 0 > h && (h = f.value.indexOf(e));
                    if (f.value.length + d > a.start.column)break;
                    d += c[i].value.length
                }
                if (!f || 0 > h && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + d - 1 && f.value.lastIndexOf(e) === f.value.length - 1))return{text: e + e, selection: [1, 1]};
                if (f && "string" === f.type && g.substring(b.column, b.column + 1) == e)return{text: "", selection: [1, 1]}
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
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (h, j) {
    var i = h("../../lib/oop"), f = h("../../range").Range, d = h("./fold_mode").FoldMode, a = j.FoldMode = function () {
    };
    i.inherits(a, d);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, c) {
            var e = a.getLine(c), d = e.match(this.foldingStartMarker);
            if (d) {
                b = d.index;
                if (d[1])return this.openingBracketBlock(a,
                    d[1], c, b);
                a = a.getCommentFoldRange(c, b + d[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (d = e.match(this.foldingStopMarker)) {
                b = d.index + d[0].length;
                if (d[2]) {
                    a = a.getCommentFoldRange(c, b);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: b};
                if (a = a.$findOpeningBracket(d[1], c))return a.column++, c.column--, f.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../../range").Range;
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
                    a || b.length, e = f.getLength(), h = b = d; ++d < e;) {
                    var j = f.getLine(d).search(g);
                    if (-1 != j) {
                        if (j <= c)break;
                        h = d
                    }
                }
                if (h > b)return f = f.getLine(h).length, new i(b, a, h, f)
            }
        };
        this.openingBracketBlock = function (f, d, a, g, b) {
            a = {row: a, column: g + 1};
            if (d = f.$findClosingBracket(d, a, b))return b = f.foldWidgets[d.row], null == b && (b = this.getFoldWidget(f, d.row)), "start" == b && d.row > a.row && (d.row--, d.column = f.getLine(d.row).length), i.fromPoints(a, d)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});