﻿define("ace/mode/xquery", "require exports module ace/worker/worker_client ace/lib/oop ace/mode/text ace/tokenizer ace/mode/xquery_highlight_rules ace/mode/behaviour/xquery ace/range".split(" "), function (e, k) {
    var l = e("../worker/worker_client").WorkerClient, m = e("../lib/oop"), i = e("./text").Mode, b = e("../tokenizer").Tokenizer, f = e("./xquery_highlight_rules").XQueryHighlightRules, d = e("./behaviour/xquery").XQueryBehaviour, c = e("../range").Range, a = function (a) {
        this.$tokenizer = new b((new f).getRules());
        this.$behaviour =
            new d(a)
    };
    m.inherits(a, i);
    (function () {
        this.getNextLineIndent = function (a, b, c) {
            a = this.$getIndent(b);
            return b.match(/\s*(?:then|else|return|[{\(]|<\w+>)\s*$/) && (a = a + c), a
        };
        this.checkOutdent = function (a, b, c) {
            return/^\s+$/.test(b) ? /^\s*[\}\)]/.test(c) : false
        };
        this.autoOutdent = function (a, b, d) {
            a = b.getLine(d).match(/^(\s*[\}\)])/);
            if (!a)return 0;
            var a = a[1].length, j = b.findMatchingBracket({row: d, column: a});
            if (!j || j.row == d)return 0;
            j = this.$getIndent(b.getLine(j.row));
            b.replace(new c(d, 0, d, a - 1), j)
        };
        this.$getIndent =
            function (a) {
                return(a = a.match(/^(\s+)/)) ? a[1] : ""
            };
        this.toggleCommentLines = function (a, b, d, j) {
            for (var f = true, e = /^\s*\(:(.*):\)/, a = d; a <= j; a++)if (!e.test(b.getLine(a))) {
                f = false;
                break
            }
            for (var n = new c(0, 0, 0, 0), a = d; a <= j; a++) {
                d = b.getLine(a);
                n.start.row = a;
                n.end.row = a;
                n.end.column = d.length;
                b.replace(n, f ? d.match(e)[1] : "(:" + d + ":)")
            }
        };
        this.createWorker = function (a) {
            this.$deltas = [];
            var b = new l(["ace"], "ace/mode/xquery_worker", "XQueryWorker"), c = this;
            return a.getDocument().on("change", function (a) {
                c.$deltas.push(a.data)
            }),
                b.attachToDocument(a.getDocument()), b.on("start", function () {
                c.$deltas = []
            }), b.on("error", function (b) {
                a.setAnnotations([b.data])
            }), b.on("ok", function () {
                a.clearAnnotations()
            }), b.on("highlight", function (b) {
                for (var d = a.getLength() - 1, f = b.data.lines, b = b.data.states, e = 0; e < c.$deltas.length; e++) {
                    var g = c.$deltas[e];
                    if (g.action === "insertLines")for (var h = g.lines.length, e = 0; e < h; e++) {
                        f.splice(g.range.start.row + e, 0, void 0);
                        b.splice(g.range.start.row + e, 0, void 0)
                    } else if (g.action === "insertText")a.getDocument().isNewLine(g.text) ?
                        (f.splice(g.range.end.row, 0, void 0), b.splice(g.range.end.row, 0, void 0)) : (f[g.range.start.row] = void 0, b[g.range.start.row] = void 0); else if (g.action === "removeLines") {
                        h = g.lines.length;
                        f.splice(g.range.start.row, h);
                        b.splice(g.range.start.row, h)
                    } else g.action === "removeText" && (a.getDocument().isNewLine(g.text) ? (f[g.range.start.row] = void 0, f.splice(g.range.end.row, 1), b[g.range.start.row] = void 0, b.splice(g.range.end.row, 1)) : (f[g.range.start.row] = void 0, b[g.range.start.row] = void 0))
                }
                a.bgTokenizer.lines = f;
                a.bgTokenizer.states = b;
                a.bgTokenizer.fireUpdateEvent(0, d)
            }), b
        }
    }).call(a.prototype);
    k.Mode = a
});
define("ace/mode/xquery_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, k) {
    var l = e("../lib/oop"), m = e("./text_highlight_rules").TextHighlightRules, i = function () {
        this.$rules = {start: [
            {token: "text", regex: "<\\!\\[CDATA\\[", next: "cdata"},
            {token: "xml_pe", regex: "<\\?.*?\\?>"},
            {token: "comment", regex: "<\\!--", next: "comment"},
            {token: "comment", regex: "\\(:", next: "comment"},
            {token: "text", regex: "<\\/?", next: "tag"},
            {token: "constant", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "variable", regex: "\\$[a-zA-Z_][a-zA-Z0-9_\\-:]*\\b"},
            {token: "string", regex: '".*?"'},
            {token: "string", regex: "'.*?'"},
            {token: "text", regex: "\\s+"},
            {token: "support.function", regex: "\\w[\\w+_\\-:]+(?=\\()"},
            {token: this.createKeywordMapper({keyword: "after|ancestor|ancestor-or-self|and|as|ascending|attribute|before|case|cast|castable|child|collation|comment|copy|count|declare|default|delete|descendant|descendant-or-self|descending|div|document|document-node|element|else|empty|empty-sequence|end|eq|every|except|first|following|following-sibling|for|function|ge|group|gt|idiv|if|import|insert|instance|intersect|into|is|item|last|le|let|lt|mod|modify|module|namespace|namespace-node|ne|node|only|or|order|ordered|parent|preceding|preceding-sibling|processing-instruction|rename|replace|return|satisfies|schema-attribute|schema-element|self|some|stable|start|switch|text|to|treat|try|typeswitch|union|unordered|validate|where|with|xquery|contains|paragraphs|sentences|times|words|by|collectionreturn|variable|version|option|when|encoding|toswitch|catch|tumbling|sliding|window|at|using|stemming|collection|schema|while|on|nodes|index|external|then|in|updating|value|of|containsbreak|loop|continue|exit|returning|append|json|position"},
                "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "\\*|=|<|>|\\-|\\+"},
            {token: "lparen", regex: "[[({]"},
            {token: "rparen", regex: "[\\])}]"}
        ], tag: [
            {token: "text", regex: ">", next: "start"},
            {token: "meta.tag", regex: "[-_a-zA-Z0-9:]+"},
            {token: "text", regex: "\\s+"},
            {token: "string", regex: '".*?"'},
            {token: "string", regex: "'.*?'"}
        ], cdata: [
            {token: "comment", regex: "\\]\\]>", next: "start"},
            {token: "comment", regex: "\\s+"},
            {token: "comment", regex: "(?:[^\\]]|\\](?!\\]>))+"}
        ], comment: [
            {token: "comment",
                regex: ".*?--\>", next: "start"},
            {token: "comment", regex: ".*:\\)", next: "start"},
            {token: "comment", regex: ".+"}
        ]}
    };
    l.inherits(i, m);
    k.XQueryHighlightRules = i
});
define("ace/mode/behaviour/xquery", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle".split(" "), function (e, k) {
    var l = e("../../lib/oop"), m = e("../behaviour").Behaviour, i = e("./cstyle").CstyleBehaviour, b = function (b) {
        this.inherit(i, ["braces", "parens", "string_dquotes"]);
        this.parent = b
    };
    l.inherits(b, m);
    k.XQueryBehaviour = b
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (e, k) {
    var l = e("../../lib/oop"), m = e("../behaviour").Behaviour, i = function () {
        this.add("braces", "insertion", function (b, f, d, c, a) {
            if ("{" == a)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == a) {
                if (d = d.getCursorPosition(), f = c.doc.getLine(d.row), a = f.substring(d.column, d.column + 1), "}" == a && null !== c.$findOpeningBracket("}", {column: d.column +
                    1, row: d.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == a && (d = d.getCursorPosition(), f = c.doc.getLine(d.row), a = f.substring(d.column, d.column + 1), "}" == a)) {
                d = c.findMatchingBracket({row: d.row, column: d.column + 1});
                if (!d)return null;
                b = this.getNextLineIndent(b, f.substring(0, f.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(d.row));
                return{text: "\n" + b + "\n" + c, selection: [1, b.length, 1, b.length]}
            }
        });
        this.add("braces", "deletion", function (b, f, d, c, a) {
            b = c.doc.getTextRange(a);
            if (!a.isMultiLine() && "{" ==
                b && "}" == c.doc.getLine(a.start.row).substring(a.end.column, a.end.column + 1))return a.end.column++, a
        });
        this.add("parens", "insertion", function (b, f, d, c, a) {
            if ("(" == a)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == a && (b = d.getCursorPosition(), ")" == c.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== c.$findOpeningBracket(")", {column: b.column + 1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (b, f, d, c, a) {
                b = c.doc.getTextRange(a);
                if (!a.isMultiLine() && "(" == b && ")" == c.doc.getLine(a.start.row).substring(a.start.column + 1, a.start.column + 2))return a.end.column++, a
            });
        this.add("brackets", "insertion", function (b, f, d, c, a) {
            if ("[" == a)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == a && (b = d.getCursorPosition(), "]" == c.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== c.$findOpeningBracket("]", {column: b.column +
                1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (b, f, d, c, a) {
            b = c.doc.getTextRange(a);
            if (!a.isMultiLine() && "[" == b && "]" == c.doc.getLine(a.start.row).substring(a.start.column + 1, a.start.column + 2))return a.end.column++, a
        });
        this.add("string_dquotes", "insertion", function (b, f, d, c, a) {
            if ('"' == a || "'" == a) {
                b = d.getSelectionRange();
                f = c.doc.getTextRange(b);
                if ("" !== f)return{text: a + f + a, selection: !1};
                d = d.getCursorPosition();
                f = c.doc.getLine(d.row);
                if ("\\" == f.substring(d.column - 1,
                    d.column))return null;
                for (var c = c.getTokens(b.start.row), e = 0, h, i = -1, j = 0; j < c.length; j++) {
                    h = c[j];
                    "string" == h.type ? i = -1 : 0 > i && (i = h.value.indexOf(a));
                    if (h.value.length + e > b.start.column)break;
                    e += c[j].value.length
                }
                if (!h || 0 > i && "comment" !== h.type && ("string" !== h.type || b.start.column !== h.value.length + e - 1 && h.value.lastIndexOf(a) === h.value.length - 1))return{text: a + a, selection: [1, 1]};
                if (h && "string" === h.type && f.substring(d.column, d.column + 1) == a)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (b, e, d, c, a) {
                b = c.doc.getTextRange(a);
                if (!a.isMultiLine() && ('"' == b || "'" == b) && '"' == c.doc.getLine(a.start.row).substring(a.start.column + 1, a.start.column + 2))return a.end.column++, a
            })
    };
    l.inherits(i, m);
    k.CstyleBehaviour = i
});