﻿define("ace/mode/xml", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/xml_highlight_rules ace/mode/behaviour/xml ace/mode/folding/xml".split(" "), function (g, k) {
    var i = g("../lib/oop"), f = g("./text").Mode, e = g("../tokenizer").Tokenizer, a = g("./xml_highlight_rules").XmlHighlightRules, l = g("./behaviour/xml").XmlBehaviour, c = g("./folding/xml").FoldMode, d = function () {
        this.$tokenizer = new e((new a).getRules());
        this.$behaviour = new l;
        this.foldingRules = new c
    };
    i.inherits(d, f);
    (function () {
        this.getNextLineIndent =
            function (b, d) {
                return this.$getIndent(d)
            }
    }).call(d.prototype);
    k.Mode = d
});
define("ace/mode/xml_highlight_rules", "require exports module ace/lib/oop ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (g, k) {
    var i = g("../lib/oop"), f = g("./xml_util"), e = g("./text_highlight_rules").TextHighlightRules, a = function () {
        this.$rules = {start: [
            {token: "text", regex: "<\\!\\[CDATA\\[", next: "cdata"},
            {token: "xml_pe", regex: "<\\?.*?\\?>"},
            {token: "comment", merge: true, regex: "<\\!--", next: "comment"},
            {token: "xml_pe", regex: "<\\!.*?>"},
            {token: "meta.tag", regex: "<\\/?", next: "tag"},
            {token: "text",
                regex: "\\s+"},
            {token: "constant.character.entity", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},
            {token: "text", regex: "[^<]+"}
        ], cdata: [
            {token: "text", regex: "\\]\\]>", next: "start"},
            {token: "text", regex: "\\s+"},
            {token: "text", regex: "(?:[^\\]]|\\](?!\\]>))+"}
        ], comment: [
            {token: "comment", regex: ".*?--\>", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ]};
        f.tag(this.$rules, "tag", "start")
    };
    i.inherits(a, e);
    k.XmlHighlightRules = a
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (g, k) {
    function i(f, e) {
        return[
            {token: "string", merge: !0, regex: ".*?" + f, next: e},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    k.tag = function (f, e, a, l) {
        f[e] = [
            {token: "text", regex: "\\s+"},
            {token: l ? function (a) {
                return l[a] ? "meta.tag.tag-name." + l[a] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: e + "_embed_attribute_list"},
            {token: "empty", regex: "", next: e + "_embed_attribute_list"}
        ];
        f[e + "_qstring"] = i("'", e + "_embed_attribute_list");
        f[e + "_qqstring"] = i('"', e + "_embed_attribute_list");
        f[e + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: a},
            {token: "keyword.operator", regex: "="},
            {token: "entity.other.attribute-name", regex: "[-_a-zA-Z0-9:]+"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "text", regex: "\\s+"}
        ].concat([
                {token: "string", regex: '".*?"'},
                {token: "string", merge: !0, regex: '["].*', next: e + "_qqstring"},
                {token: "string", regex: "'.*?'"},
                {token: "string", merge: !0, regex: "['].*",
                    next: e + "_qstring"}
            ])
    }
});
define("ace/mode/behaviour/xml", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (g, k) {
    function i(d, b) {
        var h = true, a = d.type.split(".");
        return b.split(".").forEach(function (b) {
            if (a.indexOf(b) == -1)return h = false, false
        }), h
    }

    var f = g("../../lib/oop"), e = g("../behaviour").Behaviour, a = g("./cstyle").CstyleBehaviour, l = g("../../token_iterator").TokenIterator, c = function () {
        this.inherit(a, ["string_dquotes"]);
        this.add("autoclosing", "insertion",
            function (d, b, h, a, c) {
                if (c == ">") {
                    d = h.getCursorPosition();
                    h = new l(a, d.row, d.column);
                    a = h.getCurrentToken();
                    b = false;
                    if (!a || !i(a, "meta.tag") && (!i(a, "text") || !a.value.match("/"))) {
                        do a = h.stepBackward(); while (a && (i(a, "string") || i(a, "keyword.operator") || i(a, "entity.attribute-name") || i(a, "text")))
                    } else b = true;
                    if (a && i(a, "meta.tag-name") && !h.stepBackward().value.match("/")) {
                        h = a.value;
                        b && (h = h.substring(0, d.column - a.start));
                        return{text: "></" + h + ">", selection: [1, 1]}
                    }
                }
            });
        this.add("autoindent", "insertion", function (d, b, a, c, e) {
            if (e == "\n") {
                b = a.getCursorPosition();
                if (c.doc.getLine(b.row).substring(b.column, b.column + 2) == "</") {
                    d = this.$getIndent(c.doc.getLine(b.row)) + c.getTabString();
                    c = this.$getIndent(c.doc.getLine(b.row));
                    return{text: "\n" + d + "\n" + c, selection: [1, d.length, 1, d.length]}
                }
            }
        })
    };
    f.inherits(c, e);
    k.XmlBehaviour = c
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (g, k) {
    var i = g("../../lib/oop"), f = g("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (a, e, c, d, b) {
            if ("{" == b)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "{" + d + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == b) {
                if (c = c.getCursorPosition(), e = d.doc.getLine(c.row), b = e.substring(c.column, c.column + 1), "}" == b && null !== d.$findOpeningBracket("}", {column: c.column +
                    1, row: c.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == b && (c = c.getCursorPosition(), e = d.doc.getLine(c.row), b = e.substring(c.column, c.column + 1), "}" == b)) {
                c = d.findMatchingBracket({row: c.row, column: c.column + 1});
                if (!c)return null;
                a = this.getNextLineIndent(a, e.substring(0, e.length - 1), d.getTabString());
                d = this.$getIndent(d.doc.getLine(c.row));
                return{text: "\n" + a + "\n" + d, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, e, c, d, b) {
            a = d.doc.getTextRange(b);
            if (!b.isMultiLine() && "{" ==
                a && "}" == d.doc.getLine(b.start.row).substring(b.end.column, b.end.column + 1))return b.end.column++, b
        });
        this.add("parens", "insertion", function (a, e, c, d, b) {
            if ("(" == b)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "(" + d + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == b && (a = c.getCursorPosition(), ")" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, e, c, d, b) {
                a = d.doc.getTextRange(b);
                if (!b.isMultiLine() && "(" == a && ")" == d.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
            });
        this.add("brackets", "insertion", function (a, e, c, d, b) {
            if ("[" == b)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "[" + d + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == b && (a = c.getCursorPosition(), "]" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, e, c, d, b) {
            a = d.doc.getTextRange(b);
            if (!b.isMultiLine() && "[" == a && "]" == d.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
        });
        this.add("string_dquotes", "insertion", function (a, e, c, d, b) {
            if ('"' == b || "'" == b) {
                a = c.getSelectionRange();
                e = d.doc.getTextRange(a);
                if ("" !== e)return{text: b + e + b, selection: !1};
                c = c.getCursorPosition();
                e = d.doc.getLine(c.row);
                if ("\\" == e.substring(c.column - 1,
                    c.column))return null;
                for (var d = d.getTokens(a.start.row), h = 0, j, f = -1, g = 0; g < d.length; g++) {
                    j = d[g];
                    "string" == j.type ? f = -1 : 0 > f && (f = j.value.indexOf(b));
                    if (j.value.length + h > a.start.column)break;
                    h += d[g].value.length
                }
                if (!j || 0 > f && "comment" !== j.type && ("string" !== j.type || a.start.column !== j.value.length + h - 1 && j.value.lastIndexOf(b) === j.value.length - 1))return{text: b + b, selection: [1, 1]};
                if (j && "string" === j.type && e.substring(c.column, c.column + 1) == b)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, e, c, d, b) {
                a = d.doc.getTextRange(b);
                if (!b.isMultiLine() && ('"' == a || "'" == a) && '"' == d.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
            })
    };
    i.inherits(e, f);
    k.CstyleBehaviour = e
});
define("ace/mode/folding/xml", "require exports module ace/lib/oop ace/lib/lang ace/range ace/mode/folding/fold_mode ace/token_iterator".split(" "), function (g, k) {
    var i = g("../../lib/oop"), f = g("../../lib/lang"), e = g("../../range").Range, a = g("./fold_mode").FoldMode, l = g("../../token_iterator").TokenIterator, c = k.FoldMode = function (d) {
        a.call(this);
        this.voidElements = d || {}
    };
    i.inherits(c, a);
    (function () {
        this.getFoldWidget = function (d, b, a) {
            d = this._getFirstTagInLine(d, a);
            return d.closing ? b == "markbeginend" ? "end" :
                "" : !d.tagName || this.voidElements[d.tagName.toLowerCase()] ? "" : d.selfClosing ? "" : d.value.indexOf("/" + d.tagName) !== -1 ? "" : "start"
        };
        this._getFirstTagInLine = function (d, b) {
            for (var a = d.getTokens(b), e = "", c = 0; c < a.length; c++) {
                var g = a[c];
                g.type.indexOf("meta.tag") === 0 ? e = e + g.value : e = e + f.stringRepeat(" ", g.value.length)
            }
            return this._parseTag(e)
        };
        this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
        this._parseTag = function (d) {
            var b = this.tagRe.exec(d), a = this.tagRe.lastIndex || 0;
            return this.tagRe.lastIndex = 0, {value: d,
                match: b ? b[2] : "", closing: b ? !!b[3] : false, selfClosing: b ? !!b[5] || b[2] == "/>" : false, tagName: b ? b[4] : "", column: b[1] ? a + b[1].length : a}
        };
        this._readTagForward = function (d) {
            var b = d.getCurrentToken();
            if (!b)return null;
            var a = "", e;
            do if (b.type.indexOf("meta.tag") === 0) {
                e || (e = {row: d.getCurrentTokenRow(), column: d.getCurrentTokenColumn()});
                a = a + b.value;
                if (a.indexOf(">") !== -1) {
                    a = this._parseTag(a);
                    return a.start = e, a.end = {row: d.getCurrentTokenRow(), column: d.getCurrentTokenColumn() + b.value.length}, d.stepForward(), a
                }
            } while (b =
                d.stepForward());
            return null
        };
        this._readTagBackward = function (d) {
            var b = d.getCurrentToken();
            if (!b)return null;
            var a = "", e;
            do if (b.type.indexOf("meta.tag") === 0) {
                e || (e = {row: d.getCurrentTokenRow(), column: d.getCurrentTokenColumn() + b.value.length});
                a = b.value + a;
                if (a.indexOf("<") !== -1) {
                    b = this._parseTag(a);
                    return b.end = e, b.start = {row: d.getCurrentTokenRow(), column: d.getCurrentTokenColumn()}, d.stepBackward(), b
                }
            } while (b = d.stepBackward());
            return null
        };
        this._pop = function (a, b) {
            for (; a.length;) {
                var e = a[a.length - 1];
                if (!b || e.tagName == b.tagName)return a.pop();
                if (this.voidElements[b.tagName])break;
                if (this.voidElements[e.tagName])a.pop(); else return null
            }
        };
        this.getFoldWidgetRange = function (a, b, c) {
            var f = this._getFirstTagInLine(a, c);
            if (!f.match)return null;
            b = [];
            if (!f.closing && !f.selfClosing) {
                a = new l(a, c, f.column);
                for (f = {row: c, column: f.column + f.tagName.length + 2}; c = this._readTagForward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, e.fromPoints(c.start,
                        c.end)
                } else if (c.closing) {
                    this._pop(b, c);
                    if (b.length == 0)return e.fromPoints(f, c.start)
                } else b.push(c)
            } else {
                a = new l(a, c, f.column + f.match.length);
                for (f = {row: c, column: f.column}; c = this._readTagBackward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, e.fromPoints(c.start, c.end)
                } else if (c.closing)b.push(c); else {
                    this._pop(b, c);
                    if (b.length == 0)return c.start.column = c.start.column + (c.tagName.length + 2), e.fromPoints(c.start, f)
                }
            }
        }
    }).call(c.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (g, k) {
    var i = g("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (f, e, a) {
            f = f.getLine(a);
            return this.foldingStartMarker.test(f) ? "start" : "markbeginend" == e && this.foldingStopMarker && this.foldingStopMarker.test(f) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (f, e, a) {
            var g = /\S/, c = f.getLine(e), d = c.search(g);
            if (-1 != d) {
                for (var a =
                    a || c.length, b = f.getLength(), h = c = e; ++e < b;) {
                    var j = f.getLine(e).search(g);
                    if (-1 != j) {
                        if (j <= d)break;
                        h = e
                    }
                }
                if (h > c)return f = f.getLine(h).length, new i(c, a, h, f)
            }
        };
        this.openingBracketBlock = function (f, e, a, g, c) {
            a = {row: a, column: g + 1};
            if (e = f.$findClosingBracket(e, a, c))return c = f.foldWidgets[e.row], null == c && (c = this.getFoldWidget(f, e.row)), "start" == c && e.row > a.row && (e.row--, e.column = f.getLine(e.row).length), i.fromPoints(a, e)
        }
    }).call((k.FoldMode = function () {
        }).prototype)
});