﻿define("ace/mode/jsx", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/jsx_highlight_rules ace/mode/matching_brace_outdent ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (h, j) {
    function i() {
        this.$tokenizer = new a((new f).getRules());
        this.$outdent = new b;
        this.$behaviour = new c;
        this.foldingRules = new d
    }

    var g = h("../lib/oop"), e = h("./text").Mode, a = h("../tokenizer").Tokenizer, f = h("./jsx_highlight_rules").JsxHighlightRules, b = h("./matching_brace_outdent").MatchingBraceOutdent,
        c = h("./behaviour/cstyle").CstyleBehaviour, d = h("./folding/cstyle").FoldMode;
    g.inherits(i, e);
    (function () {
        this.getNextLineIndent = function (a, b, d) {
            var c = this.$getIndent(b), f = this.$tokenizer.getLineTokens(b, a).tokens;
            if (f.length && f[f.length - 1].type == "comment")return c;
            a == "start" && b.match(/^.*[\{\(\[]\s*$/) && (c = c + d);
            return c
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        }
    }).call(i.prototype);
    j.Mode = i
});
define("ace/mode/jsx_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (h, j) {
    var i = h("../lib/oop"), g = h("../lib/lang"), e = h("./doc_comment_highlight_rules").DocCommentHighlightRules, a = h("./text_highlight_rules").TextHighlightRules, f = function () {
        var a = g.arrayToMap(["break", "do", "instanceof", "typeof", "case", "else", "new", "var", "catch", "finally", "return", "void", "continue", "for", "switch", "default", "while",
            "function", "this", "if", "throw", "delete", "in", "try", "class", "extends", "super", "import", "from", "into", "implements", "interface", "static", "mixin", "override", "abstract", "final", "number", "int", "string", "boolean", "variant", "log", "assert"]), c = g.arrayToMap(["null", "true", "false", "NaN", "Infinity", "__FILE__", "__LINE__", "undefined"]), d = g.arrayToMap(["debugger", "with", "const", "export", "let", "private", "public", "yield", "protected", "extern", "native", "as", "operator", "__fake__", "__readonly__"]);
        this.$rules = {start: [
            {token: "comment",
                regex: "\\/\\/.*$"},
            e.getStartRule("doc-start"),
            {token: "comment", regex: "\\/\\*", merge: true, next: "comment"},
            {token: "string.regexp", regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant.language.boolean",
                regex: "(?:true|false)\\b"},
            {token: ["storage.type", "text", "entity.name.function"], regex: "(function)(\\s+)([a-zA-Z_][a-zA-Z0-9_]*\\b)"},
            {token: function (f) {
                return f == "this" ? "variable.language" : f == "function" ? "storage.type" : a.hasOwnProperty(f) || d.hasOwnProperty(f) ? "keyword" : c.hasOwnProperty(f) ? "constant.language" : /^_?[A-Z][a-zA-Z0-9_]*$/.test(f) ? "language.support.class" : "identifier"
            }, regex: "[a-zA-Z_][a-zA-Z0-9_]*\\b"},
            {token: "keyword.operator", regex: "!|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},
            {token: "punctuation.operator", regex: "\\?|\\:|\\,|\\;|\\."},
            {token: "paren.lparen", regex: "[[({<]"},
            {token: "paren.rparen", regex: "[\\])}>]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ]};
        this.embedRules(e, "doc-", [e.getEndRule("start")])
    };
    i.inherits(f, a);
    j.JsxHighlightRules = f
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (h, j) {
    var i = h("../lib/oop"), g = h("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    i.inherits(e, g);
    e.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    e.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    j.DocCommentHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../range").Range, g = function () {
    };
    (function () {
        this.checkOutdent = function (e, a) {
            return/^\s+$/.test(e) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (e, a) {
            var f = e.getLine(a).match(/^(\s*\})/);
            if (!f)return 0;
            var f = f[1].length, b = e.findMatchingBracket({row: a, column: f});
            if (!b || b.row == a)return 0;
            b = this.$getIndent(e.getLine(b.row));
            e.replace(new i(a, 0, a, f - 1), b)
        };
        this.$getIndent = function (e) {
            return(e = e.match(/^(\s+)/)) ?
                e[1] : ""
        }
    }).call(g.prototype);
    j.MatchingBraceOutdent = g
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (h, j) {
    var i = h("../../lib/oop"), g = h("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (a, f, b, c, d) {
            if ("{" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == d) {
                if (b = b.getCursorPosition(), f = c.doc.getLine(b.row), d = f.substring(b.column, b.column + 1), "}" == d && null !== c.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == d && (b = b.getCursorPosition(), f = c.doc.getLine(b.row), d = f.substring(b.column, b.column + 1), "}" == d)) {
                b = c.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, f.substring(0, f.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, f, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(d.start.row).substring(d.end.column, d.end.column + 1))return d.end.column++, d
        });
        this.add("parens", "insertion", function (a, f, b, c, d) {
            if ("(" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == d && (a = b.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, f, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && "(" == a && ")" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            });
        this.add("brackets", "insertion", function (a, f, b, c, d) {
            if ("[" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == d && (a = b.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, f, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "[" == a && "]" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
        });
        this.add("string_dquotes", "insertion", function (a, f, b, c, d) {
            if ('"' == d || "'" == d) {
                a = b.getSelectionRange();
                f = c.doc.getTextRange(a);
                if ("" !== f)return{text: d + f + d, selection: !1};
                b = b.getCursorPosition();
                f = c.doc.getLine(b.row);
                if ("\\" == f.substring(b.column - 1,
                    b.column))return null;
                for (var c = c.getTokens(a.start.row), e = 0, g, h = -1, i = 0; i < c.length; i++) {
                    g = c[i];
                    "string" == g.type ? h = -1 : 0 > h && (h = g.value.indexOf(d));
                    if (g.value.length + e > a.start.column)break;
                    e += c[i].value.length
                }
                if (!g || 0 > h && "comment" !== g.type && ("string" !== g.type || a.start.column !== g.value.length + e - 1 && g.value.lastIndexOf(d) === g.value.length - 1))return{text: d + d, selection: [1, 1]};
                if (g && "string" === g.type && f.substring(b.column, b.column + 1) == d)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, f, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && ('"' == a || "'" == a) && '"' == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            })
    };
    i.inherits(e, g);
    j.CstyleBehaviour = e
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (h, j) {
    var i = h("../../lib/oop"), g = h("../../range").Range, e = h("./fold_mode").FoldMode, a = j.FoldMode = function () {
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
                if (a = a.$findOpeningBracket(e[1], c))return a.column++, c.column--, g.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (g, e, a) {
            g = g.getLine(a);
            return this.foldingStartMarker.test(g) ? "start" : "markbeginend" == e && this.foldingStopMarker && this.foldingStopMarker.test(g) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (g, e, a) {
            var f = /\S/, b = g.getLine(e), c = b.search(f);
            if (-1 != c) {
                for (var a =
                    a || b.length, d = g.getLength(), h = b = e; ++e < d;) {
                    var j = g.getLine(e).search(f);
                    if (-1 != j) {
                        if (j <= c)break;
                        h = e
                    }
                }
                if (h > b)return g = g.getLine(h).length, new i(b, a, h, g)
            }
        };
        this.openingBracketBlock = function (g, e, a, f, b) {
            a = {row: a, column: f + 1};
            if (e = g.$findClosingBracket(e, a, b))return b = g.foldWidgets[e.row], null == b && (b = this.getFoldWidget(g, e.row)), "start" == b && e.row > a.row && (e.row--, e.column = g.getLine(e.row).length), i.fromPoints(a, e)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});