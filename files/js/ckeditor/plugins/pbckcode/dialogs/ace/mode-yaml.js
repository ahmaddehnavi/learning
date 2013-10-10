﻿define("ace/mode/yaml", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/yaml_highlight_rules ace/mode/matching_brace_outdent ace/mode/folding/coffee".split(" "), function (b, f) {
    var g = b("../lib/oop"), a = b("./text").Mode, c = b("../tokenizer").Tokenizer, h = b("./yaml_highlight_rules").YamlHighlightRules, e = b("./matching_brace_outdent").MatchingBraceOutdent, d = b("./folding/coffee").FoldMode, j = function () {
        this.$tokenizer = new c((new h).getRules());
        this.$outdent = new e;
        this.foldingRules = new d
    };
    g.inherits(j, a);
    (function () {
        this.getNextLineIndent = function (c, e, d) {
            var j = this.$getIndent(e);
            c == "start" && e.match(/^.*[\{\(\[]\s*$/) && (j = j + d);
            return j
        };
        this.checkOutdent = function (c, e, d) {
            return this.$outdent.checkOutdent(e, d)
        };
        this.autoOutdent = function (c, e, d) {
            this.$outdent.autoOutdent(e, d)
        }
    }).call(j.prototype);
    f.Mode = j
});
define("ace/mode/yaml_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, f) {
    var g = b("../lib/oop"), a = b("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: "comment", regex: "#.*$"},
            {token: "comment", regex: "^---"},
            {token: "variable", regex: "[&\\*][a-zA-Z0-9-_]+"},
            {token: ["identifier", "text"], regex: "(\\w+\\s*:)(\\w*)"},
            {token: "keyword.operator", regex: "<<\\w*:\\w*"},
            {token: "keyword.operator", regex: "-\\s*(?=[{])"},
            {token: "string",
                regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", merge: !0, regex: "[\\|>]\\w*", next: "qqstring"},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant.language.boolean", regex: "(?:true|false|yes|no)\\b"},
            {token: "invalid.illegal", regex: "\\/\\/.*$"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], qqstring: [
            {token: "string", regex: "(?=(?:(?:\\\\.)|(?:[^:]))*?:)",
                next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    g.inherits(c, a);
    f.YamlHighlightRules = c
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (b, f) {
    var g = b("../range").Range, a = function () {
    };
    (function () {
        this.checkOutdent = function (c, a) {
            return/^\s+$/.test(c) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (c, a) {
            var e = c.getLine(a).match(/^(\s*\})/);
            if (!e)return 0;
            var e = e[1].length, d = c.findMatchingBracket({row: a, column: e});
            if (!d || d.row == a)return 0;
            d = this.$getIndent(c.getLine(d.row));
            c.replace(new g(a, 0, a, e - 1), d)
        };
        this.$getIndent = function (c) {
            return(c = c.match(/^(\s+)/)) ?
                c[1] : ""
        }
    }).call(a.prototype);
    f.MatchingBraceOutdent = a
});
define("ace/mode/folding/coffee", "require exports module ace/lib/oop ace/mode/folding/fold_mode ace/range".split(" "), function (b, f) {
    var g = b("../../lib/oop"), a = b("./fold_mode").FoldMode, c = b("../../range").Range, h = f.FoldMode = function () {
    };
    g.inherits(h, a);
    (function () {
        this.getFoldWidgetRange = function (e, d, a) {
            if (d = this.indentationBlock(e, a))return d;
            var d = /\S/, i = e.getLine(a), b = i.search(d);
            if (!(b == -1 || i[b] != "#")) {
                for (var b = i.length, h = e.getLength(), g = a, f = a; ++a < h;) {
                    var i = e.getLine(a), o = i.search(d);
                    if (o != -1) {
                        if (i[o] !=
                            "#")break;
                        f = a
                    }
                }
                if (f > g) {
                    e = e.getLine(f).length;
                    return new c(g, b, f, e)
                }
            }
        };
        this.getFoldWidget = function (a, c, b) {
            var c = a.getLine(b), h = c.search(/\S/), f = a.getLine(b + 1), g = a.getLine(b - 1), k = g.search(/\S/), m = f.search(/\S/);
            if (h == -1)return a.foldWidgets[b - 1] = k != -1 && k < m ? "start" : "", "";
            if (k == -1) {
                if (h == m && c[h] == "#" && f[h] == "#")return a.foldWidgets[b - 1] = "", a.foldWidgets[b + 1] = "", "start"
            } else if (k == h && c[h] == "#" && g[h] == "#" && a.getLine(b - 2).search(/\S/) == -1)return a.foldWidgets[b - 1] = "start", a.foldWidgets[b + 1] = "", "";
            return k != -1 && k < h ? a.foldWidgets[b - 1] = "start" : a.foldWidgets[b - 1] = "", h < m ? "start" : ""
        }
    }).call(h.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, f) {
    var g = b("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (a, c, b) {
            a = a.getLine(b);
            return this.foldingStartMarker.test(a) ? "start" : "markbeginend" == c && this.foldingStopMarker && this.foldingStopMarker.test(a) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (a, c, b) {
            var e = /\S/, d = a.getLine(c), f = d.search(e);
            if (-1 != f) {
                for (var b =
                    b || d.length, i = a.getLength(), l = d = c; ++c < i;) {
                    var n = a.getLine(c).search(e);
                    if (-1 != n) {
                        if (n <= f)break;
                        l = c
                    }
                }
                if (l > d)return a = a.getLine(l).length, new g(d, b, l, a)
            }
        };
        this.openingBracketBlock = function (a, c, b, e, d) {
            b = {row: b, column: e + 1};
            if (c = a.$findClosingBracket(c, b, d))return d = a.foldWidgets[c.row], null == d && (d = this.getFoldWidget(a, c.row)), "start" == d && c.row > b.row && (c.row--, c.column = a.getLine(c.row).length), g.fromPoints(b, c)
        }
    }).call((f.FoldMode = function () {
        }).prototype)
});