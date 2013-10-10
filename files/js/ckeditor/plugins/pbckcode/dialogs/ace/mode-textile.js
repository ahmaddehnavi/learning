﻿define("ace/mode/textile", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/textile_highlight_rules ace/mode/matching_brace_outdent".split(" "), function (a, g) {
    var h = a("../lib/oop"), e = a("./text").Mode, b = a("../tokenizer").Tokenizer, f = a("./textile_highlight_rules").TextileHighlightRules, d = a("./matching_brace_outdent").MatchingBraceOutdent, c = function () {
        this.$tokenizer = new b((new f).getRules());
        this.$outdent = new d
    };
    h.inherits(c, e);
    (function () {
        this.getNextLineIndent = function (b, f, a) {
            return b ==
                "intag" ? a : ""
        };
        this.checkOutdent = function (b, f, a) {
            return this.$outdent.checkOutdent(f, a)
        };
        this.autoOutdent = function (b, f, a) {
            this.$outdent.autoOutdent(f, a)
        }
    }).call(c.prototype);
    g.Mode = c
});
define("ace/mode/textile_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, g) {
    var h = a("../lib/oop"), e = a("./text_highlight_rules").TextHighlightRules, b = function () {
        this.$rules = {start: [
            {token: function (b) {
                return"h" == b.charAt(0) ? "markup.heading." + b.charAt(1) : "markup.heading"
            }, regex: "h1|h2|h3|h4|h5|h6|bq|p|bc|pre", next: "blocktag"},
            {token: "keyword", regex: "[\\*]+|[#]+"},
            {token: "text", regex: ".+"}
        ], blocktag: [
            {token: "keyword", regex: "\\. ", next: "start"},
            {token: "keyword", regex: "\\(", next: "blocktagproperties"}
        ], blocktagproperties: [
            {token: "keyword", regex: "\\)", next: "blocktag"},
            {token: "string", regex: "[a-zA-Z0-9\\-_]+"},
            {token: "keyword", regex: "#"}
        ]}
    };
    h.inherits(b, e);
    g.TextileHighlightRules = b
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, g) {
    var h = a("../range").Range, e = function () {
    };
    (function () {
        this.checkOutdent = function (b, a) {
            return/^\s+$/.test(b) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (b, a) {
            var d = b.getLine(a).match(/^(\s*\})/);
            if (!d)return 0;
            var d = d[1].length, c = b.findMatchingBracket({row: a, column: d});
            if (!c || c.row == a)return 0;
            c = this.$getIndent(b.getLine(c.row));
            b.replace(new h(a, 0, a, d - 1), c)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(e.prototype);
    g.MatchingBraceOutdent = e
});