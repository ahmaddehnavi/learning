﻿define("ace/mode/tcl", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/folding/cstyle ace/mode/tcl_highlight_rules ace/mode/matching_brace_outdent ace/range".split(" "), function (a, i) {
    var h = a("../lib/oop"), f = a("./text").Mode, b = a("../tokenizer").Tokenizer, c = a("./folding/cstyle").FoldMode, e = a("./tcl_highlight_rules").TclHighlightRules, d = a("./matching_brace_outdent").MatchingBraceOutdent, l = a("../range").Range, j = function () {
        this.$tokenizer = new b((new e).getRules());
        this.$outdent =
            new d;
        this.foldingRules = new c
    };
    h.inherits(j, f);
    (function () {
        this.toggleCommentLines = function (b, e, d, f) {
            for (var c = true, b = /^(\s*)#/, a = d; a <= f; a++)if (!b.test(e.getLine(a))) {
                c = false;
                break
            }
            if (c) {
                c = new l(0, 0, 0, 0);
                for (a = d; a <= f; a++) {
                    d = e.getLine(a).match(b);
                    c.start.row = a;
                    c.end.row = a;
                    c.end.column = d[0].length;
                    e.replace(c, d[1])
                }
            } else e.indentRows(d, f, "#")
        };
        this.getNextLineIndent = function (b, e, d) {
            var c = this.$getIndent(e), f = this.$tokenizer.getLineTokens(e, b).tokens;
            if (f.length && f[f.length - 1].type == "comment")return c;
            b == "start" && e.match(/^.*[\{\(\[]\s*$/) && (c = c + d);
            return c
        };
        this.checkOutdent = function (b, e, c) {
            return this.$outdent.checkOutdent(e, c)
        };
        this.autoOutdent = function (b, e, c) {
            this.$outdent.autoOutdent(e, c)
        }
    }).call(j.prototype);
    i.Mode = j
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (a, i) {
    var h = a("../../lib/oop"), f = a("../../range").Range, b = a("./fold_mode").FoldMode, c = i.FoldMode = function () {
    };
    h.inherits(c, b);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (b, c, a) {
            var h = b.getLine(a), g = h.match(this.foldingStartMarker);
            if (g) {
                c = g.index;
                if (g[1])return this.openingBracketBlock(b,
                    g[1], a, c);
                b = b.getCommentFoldRange(a, c + g[0].length);
                return b.end.column = b.end.column - 2, b
            }
            if (c === "markbeginend")if (g = h.match(this.foldingStopMarker)) {
                c = g.index + g[0].length;
                if (g[2]) {
                    b = b.getCommentFoldRange(a, c);
                    return b.end.column = b.end.column - 2, b
                }
                a = {row: a, column: c};
                if (b = b.$findOpeningBracket(g[1], a))return b.column++, a.column--, f.fromPoints(b, a)
            }
        }
    }).call(c.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (a, i) {
    var h = a("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (a, b, c) {
            a = a.getLine(c);
            return this.foldingStartMarker.test(a) ? "start" : "markbeginend" == b && this.foldingStopMarker && this.foldingStopMarker.test(a) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (a, b, c) {
            var e = /\S/, d = a.getLine(b), i = d.search(e);
            if (-1 != i) {
                for (var c =
                    c || d.length, j = a.getLength(), g = d = b; ++b < j;) {
                    var k = a.getLine(b).search(e);
                    if (-1 != k) {
                        if (k <= i)break;
                        g = b
                    }
                }
                if (g > d)return a = a.getLine(g).length, new h(d, c, g, a)
            }
        };
        this.openingBracketBlock = function (a, b, c, e, d) {
            c = {row: c, column: e + 1};
            if (b = a.$findClosingBracket(b, c, d))return d = a.foldWidgets[b.row], null == d && (d = this.getFoldWidget(a, b.row)), "start" == d && b.row > c.row && (b.row--, b.column = a.getLine(b.row).length), h.fromPoints(c, b)
        }
    }).call((i.FoldMode = function () {
        }).prototype)
});
define("ace/mode/tcl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, i) {
    var h = a("../lib/oop"), f = a("./text_highlight_rules").TextHighlightRules, b = function () {
        this.$rules = {start: [
            {token: "comment", merge: !0, regex: "#.*\\\\$", next: "commentfollow"},
            {token: "comment", regex: "#.*$"},
            {token: "support.function", regex: "[\\\\]$", next: "splitlineStart"},
            {token: "text", regex: '[\\\\](?:["]|[{]|[}]|[[]|[]]|[$]|[])'},
            {token: "text", regex: "^|[^{][;][^}]|[/\r/]", next: "commandItem"},
            {token: "string", regex: '[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", merge: !0, regex: '[ ]*["]', next: "qqstring"},
            {token: "variable.instancce", merge: !0, regex: "[$]", next: "variable"},
            {token: "support.function", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"},
            {token: "identifier", regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "paren.lparen", regex: "[[{]", next: "commandItem"},
            {token: "paren.lparen", regex: "[(]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], commandItem: [
            {token: "comment", merge: !0, regex: "#.*\\\\$", next: "commentfollow"},
            {token: "comment", regex: "#.*$", next: "start"},
            {token: "string", regex: '[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "variable.instancce", merge: !0, regex: "[$]", next: "variable"},
            {token: "support.function", regex: "(?:[:][:])[a-zA-Z0-9_/]+(?:[:][:])", next: "commandItem"},
            {token: "support.function", regex: "[a-zA-Z0-9_/]+(?:[:][:])", next: "commandItem"},
            {token: "support.function",
                regex: "(?:[:][:])", next: "commandItem"},
            {token: "support.function", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"},
            {token: "keyword", regex: "[a-zA-Z0-9_/]+", next: "start"}
        ], commentfollow: [
            {token: "comment", regex: ".*\\\\$", next: "commentfollow"},
            {token: "comment", merge: !0, regex: ".+", next: "start"}
        ], splitlineStart: [
            {token: "text", regex: "^.", next: "start"}
        ], variable: [
            {token: "variable.instancce", regex: "(?:[:][:])?(?:[a-zA-Z_]|d)+(?:(?:[:][:])?(?:[a-zA-Z_]|d)+)?(?:[(](?:[a-zA-Z_]|d)+[)])?",
                next: "start"},
            {token: "variable.instancce", regex: "(?:[a-zA-Z_]|d)+(?:[(](?:[a-zA-Z_]|d)+[)])?", next: "start"},
            {token: "variable.instancce", regex: "{?(?:[a-zA-Z_]|d)+}?", next: "start"}
        ], qqstring: [
            {token: "string", regex: '(?:[^\\\\]|\\\\.)*?["]', next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    h.inherits(b, f);
    i.TclHighlightRules = b
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, i) {
    var h = a("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (b, a) {
            return/^\s+$/.test(b) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (b, a) {
            var e = b.getLine(a).match(/^(\s*\})/);
            if (!e)return 0;
            var e = e[1].length, d = b.findMatchingBracket({row: a, column: e});
            if (!d || d.row == a)return 0;
            d = this.$getIndent(b.getLine(d.row));
            b.replace(new h(a, 0, a, e - 1), d)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(f.prototype);
    i.MatchingBraceOutdent = f
});