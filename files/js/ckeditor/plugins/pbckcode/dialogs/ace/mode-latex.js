﻿define("ace/mode/latex", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/latex_highlight_rules ace/range".split(" "), function (a, g) {
    var h = a("../lib/oop"), i = a("./text").Mode, b = a("../tokenizer").Tokenizer, k = a("./latex_highlight_rules").LatexHighlightRules, l = a("../range").Range, j = function () {
        this.$tokenizer = new b((new k).getRules())
    };
    h.inherits(j, i);
    (function () {
        this.toggleCommentLines = function (a, f, e, b) {
            for (var d = true, a = /^(\s*)\%/, c = e; c <= b; c++)if (!a.test(f.getLine(c))) {
                d = false;
                break
            }
            if (d) {
                d =
                    new l(0, 0, 0, 0);
                for (c = e; c <= b; c++) {
                    e = f.getLine(c).match(a);
                    d.start.row = c;
                    d.end.row = c;
                    d.end.column = e[0].length;
                    f.replace(d, e[1])
                }
            } else f.indentRows(e, b, "%")
        };
        this.getNextLineIndent = function (a, b) {
            return this.$getIndent(b)
        }
    }).call(j.prototype);
    g.Mode = j
});
define("ace/mode/latex_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, g) {
    var h = a("../lib/oop"), i = a("./text_highlight_rules").TextHighlightRules, b = function () {
        this.$rules = {start: [
            {token: "keyword", regex: "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"},
            {token: "lparen", regex: "[[({]"},
            {token: "rparen", regex: "[\\])}]"},
            {token: "string", regex: "\\$(?:(?:\\\\.)|(?:[^\\$\\\\]))*?\\$"},
            {token: "comment", regex: "%.*$"}
        ]}
    };
    h.inherits(b, i);
    g.LatexHighlightRules = b
});