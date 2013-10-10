﻿define("ace/mode/coffee", "require exports module ace/tokenizer ace/mode/coffee_highlight_rules ace/mode/matching_brace_outdent ace/mode/folding/coffee ace/range ace/mode/text ace/worker/worker_client ace/lib/oop".split(" "), function (d, g) {
    function e() {
        this.$tokenizer = new b((new a).getRules());
        this.$outdent = new c;
        this.foldingRules = new f
    }

    var b = d("../tokenizer").Tokenizer, a = d("./coffee_highlight_rules").CoffeeHighlightRules, c = d("./matching_brace_outdent").MatchingBraceOutdent, f = d("./folding/coffee").FoldMode,
        i = d("../range").Range, j = d("./text").Mode, h = d("../worker/worker_client").WorkerClient;
    d("../lib/oop").inherits(e, j);
    (function () {
        var a = /(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/, f = /^(\s*)#/, c = /^\s*###(?!#)/, b = /^\s*/;
        this.getNextLineIndent = function (f, c, i) {
            var b = this.$getIndent(c), j = this.$tokenizer.getLineTokens(c, f).tokens;
            return(!j.length || j[j.length - 1].type !== "comment") && f === "start" && a.test(c) && (b = b + i), b
        };
        this.toggleCommentLines = function (a, j, h, d) {
            console.log("toggle");
            for (a = new i(0, 0, 0, 0); h <= d; ++h) {
                var e = j.getLine(h);
                if (!c.test(e)) {
                    f.test(e) ? e = e.replace(f, "$1") : e = e.replace(b, "$&#");
                    a.end.row = a.start.row = h;
                    a.end.column = e.length + 1;
                    j.replace(a, e)
                }
            }
        };
        this.checkOutdent = function (a, f, c) {
            return this.$outdent.checkOutdent(f, c)
        };
        this.autoOutdent = function (a, f, c) {
            this.$outdent.autoOutdent(f, c)
        };
        this.createWorker = function (a) {
            var f = new h(["ace"], "ace/mode/coffee_worker", "Worker");
            return f.attachToDocument(a.getDocument()), f.on("error", function (f) {
                a.setAnnotations([f.data])
            }),
                f.on("ok", function () {
                    a.clearAnnotations()
                }), f
        }
    }).call(e.prototype);
    g.Mode = e
});
define("ace/mode/coffee_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (d, g) {
    function e() {
        var a = {token: "string", merge: !0, regex: ".+"};
        this.$rules = {start: [
            {token: "identifier", regex: "(?:(?:\\.|::)\\s*)[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*"},
            {token: "variable", regex: "@(?:[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*)?"},
            {token: this.createKeywordMapper({keyword: "this|throw|then|try|typeof|super|switch|return|break|by)|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes", "constant.language": "true|false|null|undefined",
                "invalid.illegal": "case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|extends|slice|bind|indexOf", "language.support.class": "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|RangeError|SyntaxError|Error|EvalError|TypeError|URIError", "language.support.function": "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|String|"}, "identifier"), regex: "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*"},
            {token: "constant.numeric", regex: "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},
            {token: "string", merge: !0, regex: "'''", next: "qdoc"},
            {token: "string", merge: !0, regex: '"""', next: "qqdoc"},
            {token: "string", merge: !0, regex: "'", next: "qstring"},
            {token: "string", merge: !0, regex: '"', next: "qqstring"},
            {token: "string", merge: !0, regex: "`", next: "js"},
            {token: "string.regex", merge: !0, regex: "///", next: "heregex"},
            {token: "string.regex", regex: "/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"},
            {token: "comment", merge: !0, regex: "###(?!#)", next: "comment"},
            {token: "comment", regex: "#.*"},
            {token: "punctuation.operator", regex: "\\?|\\:|\\,|\\."},
            {token: "keyword.operator", regex: "(?:[\\-=]>|[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},
            {token: "paren.lparen", regex: "[({[]"},
            {token: "paren.rparen", regex: "[\\]})]"},
            {token: "text", regex: "\\s+"}
        ], qdoc: [
            {token: "string", regex: ".*?'''", next: "start"},
            a
        ], qqdoc: [
            {token: "string", regex: '.*?"""', next: "start"},
            a
        ], qstring: [
            {token: "string",
                regex: "[^\\\\']*(?:\\\\.[^\\\\']*)*'", merge: !0, next: "start"},
            a
        ], qqstring: [
            {token: "string", regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"', merge: !0, next: "start"},
            a
        ], js: [
            {token: "string", merge: !0, regex: "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`", next: "start"},
            a
        ], heregex: [
            {token: "string.regex", regex: ".*?///[imgy]{0,4}", next: "start"},
            {token: "comment.regex", regex: "\\s+(?:#.*)?"},
            {token: "string.regex", merge: !0, regex: "\\S+"}
        ], comment: [
            {token: "comment", regex: ".*?###", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ]}
    }

    var b =
        d("../lib/oop"), a = d("./text_highlight_rules").TextHighlightRules;
    b.inherits(e, a);
    g.CoffeeHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (d, g) {
    var e = d("../range").Range, b = function () {
    };
    (function () {
        this.checkOutdent = function (a, c) {
            return/^\s+$/.test(a) ? /^\s*\}/.test(c) : !1
        };
        this.autoOutdent = function (a, c) {
            var f = a.getLine(c).match(/^(\s*\})/);
            if (!f)return 0;
            var f = f[1].length, i = a.findMatchingBracket({row: c, column: f});
            if (!i || i.row == c)return 0;
            i = this.$getIndent(a.getLine(i.row));
            a.replace(new e(c, 0, c, f - 1), i)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(b.prototype);
    g.MatchingBraceOutdent = b
});
define("ace/mode/folding/coffee", "require exports module ace/lib/oop ace/mode/folding/fold_mode ace/range".split(" "), function (d, g) {
    var e = d("../../lib/oop"), b = d("./fold_mode").FoldMode, a = d("../../range").Range, c = g.FoldMode = function () {
    };
    e.inherits(c, b);
    (function () {
        this.getFoldWidgetRange = function (f, c, b) {
            if (c = this.indentationBlock(f, b))return c;
            var c = /\S/, h = f.getLine(b), e = h.search(c);
            if (!(e == -1 || h[e] != "#")) {
                for (var e = h.length, d = f.getLength(), g = b, k = b; ++b < d;) {
                    var h = f.getLine(b), o = h.search(c);
                    if (o != -1) {
                        if (h[o] !=
                            "#")break;
                        k = b
                    }
                }
                if (k > g) {
                    f = f.getLine(k).length;
                    return new a(g, e, k, f)
                }
            }
        };
        this.getFoldWidget = function (a, c, b) {
            var c = a.getLine(b), e = c.search(/\S/), d = a.getLine(b + 1), g = a.getLine(b - 1), l = g.search(/\S/), k = d.search(/\S/);
            if (e == -1)return a.foldWidgets[b - 1] = l != -1 && l < k ? "start" : "", "";
            if (l == -1) {
                if (e == k && c[e] == "#" && d[e] == "#")return a.foldWidgets[b - 1] = "", a.foldWidgets[b + 1] = "", "start"
            } else if (l == e && c[e] == "#" && g[e] == "#" && a.getLine(b - 2).search(/\S/) == -1)return a.foldWidgets[b - 1] = "start", a.foldWidgets[b + 1] = "", "";
            return l != -1 && l < e ? a.foldWidgets[b - 1] = "start" : a.foldWidgets[b - 1] = "", e < k ? "start" : ""
        }
    }).call(c.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (d, g) {
    var e = d("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (b, a, c) {
            b = b.getLine(c);
            return this.foldingStartMarker.test(b) ? "start" : "markbeginend" == a && this.foldingStopMarker && this.foldingStopMarker.test(b) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (b, a, c) {
            var f = /\S/, d = b.getLine(a), g = d.search(f);
            if (-1 != g) {
                for (var c =
                    c || d.length, h = b.getLength(), m = d = a; ++a < h;) {
                    var n = b.getLine(a).search(f);
                    if (-1 != n) {
                        if (n <= g)break;
                        m = a
                    }
                }
                if (m > d)return b = b.getLine(m).length, new e(d, c, m, b)
            }
        };
        this.openingBracketBlock = function (b, a, c, f, d) {
            c = {row: c, column: f + 1};
            if (a = b.$findClosingBracket(a, c, d))return d = b.foldWidgets[a.row], null == d && (d = this.getFoldWidget(b, a.row)), "start" == d && a.row > c.row && (a.row--, a.column = b.getLine(a.row).length), e.fromPoints(c, a)
        }
    }).call((g.FoldMode = function () {
        }).prototype)
});