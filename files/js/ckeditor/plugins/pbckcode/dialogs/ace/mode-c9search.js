﻿define("ace/mode/c9search", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/c9search_highlight_rules ace/mode/matching_brace_outdent ace/mode/folding/c9search".split(" "), function (b, g) {
    var e = b("../lib/oop"), a = b("./text").Mode, c = b("../tokenizer").Tokenizer, f = b("./c9search_highlight_rules").C9SearchHighlightRules, k = b("./matching_brace_outdent").MatchingBraceOutdent, d = b("./folding/c9search").FoldMode, i = function () {
        this.$tokenizer = new c((new f).getRules(), "i");
        this.$outdent = new k;
        this.foldingRules = new d
    };
    e.inherits(i, a);
    (function () {
        this.getNextLineIndent = function (c, a) {
            return this.$getIndent(a)
        };
        this.checkOutdent = function (c, a, f) {
            return this.$outdent.checkOutdent(a, f)
        };
        this.autoOutdent = function (c, a, f) {
            this.$outdent.autoOutdent(a, f)
        }
    }).call(i.prototype);
    g.Mode = i
});
define("ace/mode/c9search_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, g) {
    var e = b("../lib/oop"), a = b("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: ["c9searchresults.constant.numeric", "c9searchresults.text", "c9searchresults.text"], regex: "(^\\s+[0-9]+)(:\\s*)(.+)"},
            {token: ["string", "text"], regex: "(.+)(:$)"}
        ]}
    };
    e.inherits(c, a);
    g.C9SearchHighlightRules = c
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (b, g) {
    var e = b("../range").Range, a = function () {
    };
    (function () {
        this.checkOutdent = function (c, a) {
            return/^\s+$/.test(c) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (c, a) {
            var b = c.getLine(a).match(/^(\s*\})/);
            if (!b)return 0;
            var b = b[1].length, d = c.findMatchingBracket({row: a, column: b});
            if (!d || d.row == a)return 0;
            d = this.$getIndent(c.getLine(d.row));
            c.replace(new e(a, 0, a, b - 1), d)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(a.prototype);
    g.MatchingBraceOutdent = a
});
define("ace/mode/folding/c9search", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (b, g) {
    var e = b("../../lib/oop"), a = b("../../range").Range, c = b("./fold_mode").FoldMode, f = g.FoldMode = function () {
    };
    e.inherits(f, c);
    (function () {
        this.foldingStartMarker = /^(\S.*\:|Searching for.*)$/;
        this.foldingStopMarker = /^(\s+|Found.*)$/;
        this.getFoldWidgetRange = function (c, d, b) {
            var d = c.doc.getAllLines(b), f = d[b], e = /^(Found.*|Searching for.*)$/, h = /^(\S.*\:|\s*)$/, e = e.test(f) ? e : h;
            if (this.foldingStartMarker.test(f)) {
                h = b + 1;
                for (c = c.getLength(); h < c; h++)if (e.test(d[h]))break;
                return new a(b, f.length, h, 0)
            }
            if (this.foldingStopMarker.test(f)) {
                for (h = b - 1; h >= 0; h--) {
                    f = d[h];
                    if (e.test(f))break
                }
                return new a(h, f.length, b, 0)
            }
        }
    }).call(f.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, g) {
    var e = b("../../range").Range;
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
            var g = /\S/, d = a.getLine(c), i = d.search(g);
            if (-1 != i) {
                for (var b =
                    b || d.length, l = a.getLength(), j = d = c; ++c < l;) {
                    var h = a.getLine(c).search(g);
                    if (-1 != h) {
                        if (h <= i)break;
                        j = c
                    }
                }
                if (j > d)return a = a.getLine(j).length, new e(d, b, j, a)
            }
        };
        this.openingBracketBlock = function (a, c, b, g, d) {
            b = {row: b, column: g + 1};
            if (c = a.$findClosingBracket(c, b, d))return d = a.foldWidgets[c.row], null == d && (d = this.getFoldWidget(a, c.row)), "start" == d && c.row > b.row && (c.row--, c.column = a.getLine(c.row).length), e.fromPoints(b, c)
        }
    }).call((g.FoldMode = function () {
        }).prototype)
});