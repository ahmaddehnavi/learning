﻿define("ace/mode/python", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/python_highlight_rules ace/mode/folding/pythonic ace/range".split(" "), function (b, f) {
    var g = b("../lib/oop"), a = b("./text").Mode, c = b("../tokenizer").Tokenizer, h = b("./python_highlight_rules").PythonHighlightRules, d = b("./folding/pythonic").FoldMode, e = b("../range").Range, k = function () {
        this.$tokenizer = new c((new h).getRules());
        this.foldingRules = new d("\\:")
    };
    g.inherits(k, a);
    (function () {
        this.toggleCommentLines =
            function (c, i, a, h) {
                for (var b = true, c = /^(\s*)#/, d = a; d <= h; d++)if (!c.test(i.getLine(d))) {
                    b = false;
                    break
                }
                if (b) {
                    b = new e(0, 0, 0, 0);
                    for (d = a; d <= h; d++) {
                        a = i.getLine(d).match(c);
                        b.start.row = d;
                        b.end.row = d;
                        b.end.column = a[0].length;
                        i.replace(b, a[1])
                    }
                } else i.indentRows(a, h, "#")
            };
        this.getNextLineIndent = function (c, a, h) {
            var d = this.$getIndent(a), b = this.$tokenizer.getLineTokens(a, c).tokens;
            if (b.length && b[b.length - 1].type == "comment")return d;
            c == "start" && a.match(/^.*[\{\(\[\:]\s*$/) && (d = d + h);
            return d
        };
        var c = {pass: 1, "return": 1,
            raise: 1, "break": 1, "continue": 1};
        this.checkOutdent = function (a, d, b) {
            if (b !== "\r\n" && b !== "\r" && b !== "\n")return false;
            a = this.$tokenizer.getLineTokens(d.trim(), a).tokens;
            if (!a)return false;
            do d = a.pop(); while (d && (d.type == "comment" || d.type == "text" && d.value.match(/^\s+$/)));
            return d ? d.type == "keyword" && c[d.value] : false
        };
        this.autoOutdent = function (d, a, c) {
            var c = c + 1, d = this.$getIndent(a.getLine(c)), b = a.getTabString();
            d.slice(-b.length) == b && a.remove(new e(c, d.length - b.length, c, d.length))
        }
    }).call(k.prototype);
    f.Mode =
        k
});
define("ace/mode/python_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, f) {
    var g = b("../lib/oop"), a = b("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: "comment", regex: "#.*$"},
            {token: "string", regex: '(?:r|u|ur|R|U|UR|Ur|uR)?"{3}(?:[^\\\\]|\\\\.)*?"{3}'},
            {token: "string", merge: !0, regex: '(?:r|u|ur|R|U|UR|Ur|uR)?"{3}.*$', next: "qqstring"},
            {token: "string", regex: '(?:r|u|ur|R|U|UR|Ur|uR)?"(?:[^\\\\]|\\\\.)*?"'},
            {token: "string",
                regex: "(?:r|u|ur|R|U|UR|Ur|uR)?'{3}(?:[^\\\\]|\\\\.)*?'{3}"},
            {token: "string", merge: !0, regex: "(?:r|u|ur|R|U|UR|Ur|uR)?'{3}.*$", next: "qstring"},
            {token: "string", regex: "(?:r|u|ur|R|U|UR|Ur|uR)?'(?:[^\\\\]|\\\\.)*?'"},
            {token: "constant.numeric", regex: "(?:(?:(?:(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.))|(?:\\d+))(?:[eE][+-]?\\d+))|(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))|\\d+)[jJ]\\b"},
            {token: "constant.numeric", regex: "(?:(?:(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.))|(?:\\d+))(?:[eE][+-]?\\d+))|(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))"},
            {token: "constant.numeric", regex: "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))[lL]\\b"},
            {token: "constant.numeric", regex: "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))\\b"},
            {token: this.createKeywordMapper({"invalid.deprecated": "debugger", "support.function": "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern",
                "constant.language": "True|False|None|NotImplemented|Ellipsis|__debug__", keyword: "and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield"}, "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},
            {token: "paren.lparen", regex: "[\\[\\(\\{]"},
            {token: "paren.rparen", regex: "[\\]\\)\\}]"},
            {token: "text",
                regex: "\\s+"}
        ], qqstring: [
            {token: "string", regex: '(?:[^\\\\]|\\\\.)*?"{3}', next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?'{3}", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    g.inherits(c, a);
    f.PythonHighlightRules = c
});
define("ace/mode/folding/pythonic", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (b, f) {
    var g = b("../../lib/oop"), a = b("./fold_mode").FoldMode, c = f.FoldMode = function (a) {
        this.foldingStartMarker = RegExp("([\\[{])(?:\\s*)$|(" + a + ")(?:\\s*)(?:#.*)?$")
    };
    g.inherits(c, a);
    (function () {
        this.getFoldWidgetRange = function (a, d, c) {
            if (d = a.getLine(c).match(this.foldingStartMarker))return d[1] ? this.openingBracketBlock(a, d[1], c, d.index) : d[2] ? this.indentationBlock(a, c, d.index + d[2].length) :
                this.indentationBlock(a, c)
        }
    }).call(c.prototype)
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
            var d = /\S/, e = a.getLine(c), f = e.search(d);
            if (-1 != f) {
                for (var b =
                    b || e.length, l = a.getLength(), j = e = c; ++c < l;) {
                    var i = a.getLine(c).search(d);
                    if (-1 != i) {
                        if (i <= f)break;
                        j = c
                    }
                }
                if (j > e)return a = a.getLine(j).length, new g(e, b, j, a)
            }
        };
        this.openingBracketBlock = function (a, c, b, d, e) {
            b = {row: b, column: d + 1};
            if (c = a.$findClosingBracket(c, b, e))return e = a.foldWidgets[c.row], null == e && (e = this.getFoldWidget(a, c.row)), "start" == e && c.row > b.row && (c.row--, c.column = a.getLine(c.row).length), g.fromPoints(b, c)
        }
    }).call((f.FoldMode = function () {
        }).prototype)
});