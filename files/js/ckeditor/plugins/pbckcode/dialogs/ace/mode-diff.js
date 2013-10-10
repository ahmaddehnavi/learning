﻿define("ace/mode/diff", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/diff_highlight_rules ace/mode/folding/diff".split(" "), function (e, f) {
    var g = e("../lib/oop"), b = e("./text").Mode, a = e("../tokenizer").Tokenizer, d = e("./diff_highlight_rules").DiffHighlightRules, j = e("./folding/diff").FoldMode, c = function () {
        this.$tokenizer = new a((new d).getRules(), "i");
        this.foldingRules = new j(["diff", "index", "\\+{3}", "@@|\\*{5}"], "i")
    };
    g.inherits(c, b);
    (function () {
    }).call(c.prototype);
    f.Mode = c
});
define("ace/mode/diff_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, f) {
    var g = e("../lib/oop"), b = e("./text_highlight_rules").TextHighlightRules, a = function () {
        this.$rules = {start: [
            {regex: "^(?:\\*{15}|={67}|-{3}|\\+{3})$", token: "punctuation.definition.separator.diff", name: "keyword"},
            {regex: "^(@@)(\\s*.+?\\s*)(@@)(.*)$", token: ["constant", "constant.numeric", "constant", "comment.doc.tag"]},
            {regex: "^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$", token: "constant.numeric punctuation.definition.range.diff constant.function constant.numeric punctuation.definition.range.diff invalid".split(" "),
                name: "meta."},
            {regex: "^(?:(\\-{3}|\\+{3}|\\*{3})( .+))$", token: ["constant.numeric", "meta.tag"]},
            {regex: "^([!+>])(.*?)(\\s*)$", token: ["support.constant", "text", "invalid"]},
            {regex: "^([<\\-])(.*?)(\\s*)$", token: ["support.function", "string", "invalid"]},
            {regex: "^(diff)(\\s+--\\w+)?(.+?)( .+)?$", token: ["variable", "variable", "keyword", "variable"]},
            {regex: "^Index.+$", token: "variable"},
            {regex: "^(.*?)(\\s*)$", token: ["invisible", "invalid"]}
        ]}
    };
    g.inherits(a, b);
    f.DiffHighlightRules = a
});
define("ace/mode/folding/diff", "require exports module ace/lib/oop ace/mode/folding/fold_mode ace/range".split(" "), function (e, f) {
    var g = e("../../lib/oop"), b = e("./fold_mode").FoldMode, a = e("../../range").Range, d = f.FoldMode = function (a, c) {
        this.regExpList = a;
        this.flag = c;
        this.foldingStartMarker = RegExp("^(" + a.join("|") + ")", this.flag)
    };
    g.inherits(d, b);
    (function () {
        this.getFoldWidgetRange = function (b, c, d) {
            for (var c = b.getLine(d), e = {row: d, column: c.length}, h = this.regExpList, g = 1; g <= h.length; g++) {
                var f = RegExp("^(" +
                    h.slice(0, g).join("|") + ")", this.flag);
                if (f.test(c))break
            }
            for (h = b.getLength(); ++d < h;) {
                c = b.getLine(d);
                if (f.test(c))break
            }
            if (d != e.row + 1)return a.fromPoints(e, {row: d - 1, column: c.length})
        }
    }).call(d.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (e, f) {
    var g = e("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (b, a, d) {
            b = b.getLine(d);
            return this.foldingStartMarker.test(b) ? "start" : "markbeginend" == a && this.foldingStopMarker && this.foldingStopMarker.test(b) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (b, a, d) {
            var e = /\S/, c = b.getLine(a), f = c.search(e);
            if (-1 != f) {
                for (var d =
                    d || c.length, k = b.getLength(), h = c = a; ++a < k;) {
                    var i = b.getLine(a).search(e);
                    if (-1 != i) {
                        if (i <= f)break;
                        h = a
                    }
                }
                if (h > c)return b = b.getLine(h).length, new g(c, d, h, b)
            }
        };
        this.openingBracketBlock = function (b, a, d, e, c) {
            d = {row: d, column: e + 1};
            if (a = b.$findClosingBracket(a, d, c))return c = b.foldWidgets[a.row], null == c && (c = this.getFoldWidget(b, a.row)), "start" == c && a.row > d.row && (a.row--, a.column = b.getLine(a.row).length), g.fromPoints(d, a)
        }
    }).call((f.FoldMode = function () {
        }).prototype)
});