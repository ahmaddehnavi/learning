﻿define("ace/mode/svg", "require exports module ace/lib/oop ace/mode/xml ace/mode/javascript ace/tokenizer ace/mode/svg_highlight_rules ace/mode/folding/mixed ace/mode/folding/xml ace/mode/folding/cstyle".split(" "), function (a, j) {
    var i = a("../lib/oop"), h = a("./xml").Mode, g = a("./javascript").Mode, b = a("../tokenizer").Tokenizer, f = a("./svg_highlight_rules").SvgHighlightRules, c = a("./folding/mixed").FoldMode, d = a("./folding/xml").FoldMode, e = a("./folding/cstyle").FoldMode, k = function () {
        h.call(this);
        this.highlighter =
            new f;
        this.$tokenizer = new b(this.highlighter.getRules());
        this.$embeds = this.highlighter.getEmbeds();
        this.createModeDelegates({"js-": g});
        this.foldingRules = new c(new d({}), {"js-": new e})
    };
    i.inherits(k, h);
    (function () {
        this.getNextLineIndent = function (d, e) {
            return this.$getIndent(e)
        }
    }).call(k.prototype);
    j.Mode = k
});
define("ace/mode/xml", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/xml_highlight_rules ace/mode/behaviour/xml ace/mode/folding/xml".split(" "), function (a, j) {
    var i = a("../lib/oop"), h = a("./text").Mode, g = a("../tokenizer").Tokenizer, b = a("./xml_highlight_rules").XmlHighlightRules, f = a("./behaviour/xml").XmlBehaviour, c = a("./folding/xml").FoldMode, d = function () {
        this.$tokenizer = new g((new b).getRules());
        this.$behaviour = new f;
        this.foldingRules = new c
    };
    i.inherits(d, h);
    (function () {
        this.getNextLineIndent =
            function (d, b) {
                return this.$getIndent(b)
            }
    }).call(d.prototype);
    j.Mode = d
});
define("ace/mode/xml_highlight_rules", "require exports module ace/lib/oop ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (a, j) {
    var i = a("../lib/oop"), h = a("./xml_util"), g = a("./text_highlight_rules").TextHighlightRules, b = function () {
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
        h.tag(this.$rules, "tag", "start")
    };
    i.inherits(b, g);
    j.XmlHighlightRules = b
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (a, j) {
    function i(a, g) {
        return[
            {token: "string", merge: !0, regex: ".*?" + a, next: g},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    j.tag = function (a, g, b, f) {
        a[g] = [
            {token: "text", regex: "\\s+"},
            {token: f ? function (b) {
                return f[b] ? "meta.tag.tag-name." + f[b] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: g + "_embed_attribute_list"},
            {token: "empty", regex: "", next: g + "_embed_attribute_list"}
        ];
        a[g + "_qstring"] = i("'", g + "_embed_attribute_list");
        a[g + "_qqstring"] = i('"', g + "_embed_attribute_list");
        a[g + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: b},
            {token: "keyword.operator", regex: "="},
            {token: "entity.other.attribute-name", regex: "[-_a-zA-Z0-9:]+"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "text", regex: "\\s+"}
        ].concat([
                {token: "string", regex: '".*?"'},
                {token: "string", merge: !0, regex: '["].*', next: g + "_qqstring"},
                {token: "string", regex: "'.*?'"},
                {token: "string", merge: !0, regex: "['].*",
                    next: g + "_qstring"}
            ])
    }
});
define("ace/mode/behaviour/xml", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (a, j) {
    function i(d, e) {
        var b = true, c = d.type.split(".");
        return e.split(".").forEach(function (d) {
            if (c.indexOf(d) == -1)return b = false, false
        }), b
    }

    var h = a("../../lib/oop"), g = a("../behaviour").Behaviour, b = a("./cstyle").CstyleBehaviour, f = a("../../token_iterator").TokenIterator, c = function () {
        this.inherit(b, ["string_dquotes"]);
        this.add("autoclosing", "insertion",
            function (d, e, b, c, a) {
                if (a == ">") {
                    d = b.getCursorPosition();
                    b = new f(c, d.row, d.column);
                    c = b.getCurrentToken();
                    e = false;
                    if (!c || !i(c, "meta.tag") && (!i(c, "text") || !c.value.match("/"))) {
                        do c = b.stepBackward(); while (c && (i(c, "string") || i(c, "keyword.operator") || i(c, "entity.attribute-name") || i(c, "text")))
                    } else e = true;
                    if (c && i(c, "meta.tag-name") && !b.stepBackward().value.match("/")) {
                        b = c.value;
                        e && (b = b.substring(0, d.column - c.start));
                        return{text: "></" + b + ">", selection: [1, 1]}
                    }
                }
            });
        this.add("autoindent", "insertion", function (d, b, c, f, a) {
            if (a == "\n") {
                b = c.getCursorPosition();
                if (f.doc.getLine(b.row).substring(b.column, b.column + 2) == "</") {
                    d = this.$getIndent(f.doc.getLine(b.row)) + f.getTabString();
                    f = this.$getIndent(f.doc.getLine(b.row));
                    return{text: "\n" + d + "\n" + f, selection: [1, d.length, 1, d.length]}
                }
            }
        })
    };
    h.inherits(c, g);
    j.XmlBehaviour = c
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (a, j) {
    var i = a("../../lib/oop"), h = a("../behaviour").Behaviour, g = function () {
        this.add("braces", "insertion", function (b, f, c, d, e) {
            if ("{" == e)return b = c.getSelectionRange(), d = d.doc.getTextRange(b), "" !== d ? {text: "{" + d + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == e) {
                if (c = c.getCursorPosition(), f = d.doc.getLine(c.row), e = f.substring(c.column, c.column + 1), "}" == e && null !== d.$findOpeningBracket("}", {column: c.column +
                    1, row: c.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == e && (c = c.getCursorPosition(), f = d.doc.getLine(c.row), e = f.substring(c.column, c.column + 1), "}" == e)) {
                c = d.findMatchingBracket({row: c.row, column: c.column + 1});
                if (!c)return null;
                b = this.getNextLineIndent(b, f.substring(0, f.length - 1), d.getTabString());
                d = this.$getIndent(d.doc.getLine(c.row));
                return{text: "\n" + b + "\n" + d, selection: [1, b.length, 1, b.length]}
            }
        });
        this.add("braces", "deletion", function (b, f, c, d, e) {
            b = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "{" ==
                b && "}" == d.doc.getLine(e.start.row).substring(e.end.column, e.end.column + 1))return e.end.column++, e
        });
        this.add("parens", "insertion", function (b, f, c, d, e) {
            if ("(" == e)return b = c.getSelectionRange(), d = d.doc.getTextRange(b), "" !== d ? {text: "(" + d + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == e && (b = c.getCursorPosition(), ")" == d.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== d.$findOpeningBracket(")", {column: b.column + 1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (b, f, c, d, e) {
                b = d.doc.getTextRange(e);
                if (!e.isMultiLine() && "(" == b && ")" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            });
        this.add("brackets", "insertion", function (b, f, c, d, e) {
            if ("[" == e)return b = c.getSelectionRange(), d = d.doc.getTextRange(b), "" !== d ? {text: "[" + d + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == e && (b = c.getCursorPosition(), "]" == d.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== d.$findOpeningBracket("]", {column: b.column +
                1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (b, f, c, d, e) {
            b = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "[" == b && "]" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
        });
        this.add("string_dquotes", "insertion", function (b, f, c, d, e) {
            if ('"' == e || "'" == e) {
                b = c.getSelectionRange();
                f = d.doc.getTextRange(b);
                if ("" !== f)return{text: e + f + e, selection: !1};
                c = c.getCursorPosition();
                f = d.doc.getLine(c.row);
                if ("\\" == f.substring(c.column - 1,
                    c.column))return null;
                for (var d = d.getTokens(b.start.row), k = 0, a, g = -1, h = 0; h < d.length; h++) {
                    a = d[h];
                    "string" == a.type ? g = -1 : 0 > g && (g = a.value.indexOf(e));
                    if (a.value.length + k > b.start.column)break;
                    k += d[h].value.length
                }
                if (!a || 0 > g && "comment" !== a.type && ("string" !== a.type || b.start.column !== a.value.length + k - 1 && a.value.lastIndexOf(e) === a.value.length - 1))return{text: e + e, selection: [1, 1]};
                if (a && "string" === a.type && f.substring(c.column, c.column + 1) == e)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (b, a, c, d, e) {
                b = d.doc.getTextRange(e);
                if (!e.isMultiLine() && ('"' == b || "'" == b) && '"' == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            })
    };
    i.inherits(g, h);
    j.CstyleBehaviour = g
});
define("ace/mode/folding/xml", "require exports module ace/lib/oop ace/lib/lang ace/range ace/mode/folding/fold_mode ace/token_iterator".split(" "), function (a, j) {
    var i = a("../../lib/oop"), h = a("../../lib/lang"), g = a("../../range").Range, b = a("./fold_mode").FoldMode, f = a("../../token_iterator").TokenIterator, c = j.FoldMode = function (d) {
        b.call(this);
        this.voidElements = d || {}
    };
    i.inherits(c, b);
    (function () {
        this.getFoldWidget = function (d, b, c) {
            d = this._getFirstTagInLine(d, c);
            return d.closing ? b == "markbeginend" ? "end" :
                "" : !d.tagName || this.voidElements[d.tagName.toLowerCase()] ? "" : d.selfClosing ? "" : d.value.indexOf("/" + d.tagName) !== -1 ? "" : "start"
        };
        this._getFirstTagInLine = function (b, e) {
            for (var c = b.getTokens(e), a = "", f = 0; f < c.length; f++) {
                var g = c[f];
                g.type.indexOf("meta.tag") === 0 ? a = a + g.value : a = a + h.stringRepeat(" ", g.value.length)
            }
            return this._parseTag(a)
        };
        this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
        this._parseTag = function (b) {
            var e = this.tagRe.exec(b), c = this.tagRe.lastIndex || 0;
            return this.tagRe.lastIndex = 0, {value: b,
                match: e ? e[2] : "", closing: e ? !!e[3] : false, selfClosing: e ? !!e[5] || e[2] == "/>" : false, tagName: e ? e[4] : "", column: e[1] ? c + e[1].length : c}
        };
        this._readTagForward = function (b) {
            var c = b.getCurrentToken();
            if (!c)return null;
            var a = "", f;
            do if (c.type.indexOf("meta.tag") === 0) {
                f || (f = {row: b.getCurrentTokenRow(), column: b.getCurrentTokenColumn()});
                a = a + c.value;
                if (a.indexOf(">") !== -1) {
                    a = this._parseTag(a);
                    return a.start = f, a.end = {row: b.getCurrentTokenRow(), column: b.getCurrentTokenColumn() + c.value.length}, b.stepForward(), a
                }
            } while (c =
                b.stepForward());
            return null
        };
        this._readTagBackward = function (b) {
            var c = b.getCurrentToken();
            if (!c)return null;
            var a = "", f;
            do if (c.type.indexOf("meta.tag") === 0) {
                f || (f = {row: b.getCurrentTokenRow(), column: b.getCurrentTokenColumn() + c.value.length});
                a = c.value + a;
                if (a.indexOf("<") !== -1) {
                    c = this._parseTag(a);
                    return c.end = f, c.start = {row: b.getCurrentTokenRow(), column: b.getCurrentTokenColumn()}, b.stepBackward(), c
                }
            } while (c = b.stepBackward());
            return null
        };
        this._pop = function (b, c) {
            for (; b.length;) {
                var a = b[b.length - 1];
                if (!c || a.tagName == c.tagName)return b.pop();
                if (this.voidElements[c.tagName])break;
                if (this.voidElements[a.tagName])b.pop(); else return null
            }
        };
        this.getFoldWidgetRange = function (b, c, a) {
            var h = this._getFirstTagInLine(b, a);
            if (!h.match)return null;
            c = [];
            if (!h.closing && !h.selfClosing) {
                b = new f(b, a, h.column);
                for (h = {row: a, column: h.column + h.tagName.length + 2}; a = this._readTagForward(b);)if (a.selfClosing) {
                    if (!c.length)return a.start.column = a.start.column + (a.tagName.length + 2), a.end.column = a.end.column - 2, g.fromPoints(a.start,
                        a.end)
                } else if (a.closing) {
                    this._pop(c, a);
                    if (c.length == 0)return g.fromPoints(h, a.start)
                } else c.push(a)
            } else {
                b = new f(b, a, h.column + h.match.length);
                for (h = {row: a, column: h.column}; a = this._readTagBackward(b);)if (a.selfClosing) {
                    if (!c.length)return a.start.column = a.start.column + (a.tagName.length + 2), a.end.column = a.end.column - 2, g.fromPoints(a.start, a.end)
                } else if (a.closing)c.push(a); else {
                    this._pop(c, a);
                    if (c.length == 0)return a.start.column = a.start.column + (a.tagName.length + 2), g.fromPoints(a.start, h)
                }
            }
        }
    }).call(c.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (a, j) {
    var i = a("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (a, g, b) {
            a = a.getLine(b);
            return this.foldingStartMarker.test(a) ? "start" : "markbeginend" == g && this.foldingStopMarker && this.foldingStopMarker.test(a) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (a, g, b) {
            var f = /\S/, c = a.getLine(g), d = c.search(f);
            if (-1 != d) {
                for (var b =
                    b || c.length, e = a.getLength(), j = c = g; ++g < e;) {
                    var l = a.getLine(g).search(f);
                    if (-1 != l) {
                        if (l <= d)break;
                        j = g
                    }
                }
                if (j > c)return a = a.getLine(j).length, new i(c, b, j, a)
            }
        };
        this.openingBracketBlock = function (a, g, b, f, c) {
            b = {row: b, column: f + 1};
            if (g = a.$findClosingBracket(g, b, c))return c = a.foldWidgets[g.row], null == c && (c = this.getFoldWidget(a, g.row)), "start" == c && g.row > b.row && (g.row--, g.column = a.getLine(g.row).length), i.fromPoints(b, g)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});
define("ace/mode/javascript", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/javascript_highlight_rules ace/mode/matching_brace_outdent ace/range ace/worker/worker_client ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (a, j) {
    var i = a("../lib/oop"), h = a("./text").Mode, g = a("../tokenizer").Tokenizer, b = a("./javascript_highlight_rules").JavaScriptHighlightRules, f = a("./matching_brace_outdent").MatchingBraceOutdent, c = a("../range").Range, d = a("../worker/worker_client").WorkerClient,
        e = a("./behaviour/cstyle").CstyleBehaviour, k = a("./folding/cstyle").FoldMode, l = function () {
            this.$tokenizer = new g((new b).getRules());
            this.$outdent = new f;
            this.$behaviour = new e;
            this.foldingRules = new k
        };
    i.inherits(l, h);
    (function () {
        this.toggleCommentLines = function (b, a, d, f) {
            for (var e = true, b = /^(\s*)\/\//, g = d; g <= f; g++)if (!b.test(a.getLine(g))) {
                e = false;
                break
            }
            if (e) {
                e = new c(0, 0, 0, 0);
                for (g = d; g <= f; g++) {
                    d = a.getLine(g).match(b);
                    e.start.row = g;
                    e.end.row = g;
                    e.end.column = d[0].length;
                    a.replace(e, d[1])
                }
            } else a.indentRows(d,
                f, "//")
        };
        this.getNextLineIndent = function (b, a, c) {
            var d = this.$getIndent(a), f = this.$tokenizer.getLineTokens(a, b), e = f.tokens, f = f.state;
            if (e.length && e[e.length - 1].type == "comment")return d;
            if (b == "start" || b == "regex_allowed")(b = a.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/)) && (d = d + c); else if (b == "doc-start") {
                if (f == "start" || b == "regex_allowed")return"";
                (b = a.match(/^\s*(\/?)\*/)) && (b[1] && (d = d + " "), d = d + "* ")
            }
            return d
        };
        this.checkOutdent = function (b, a, c) {
            return this.$outdent.checkOutdent(a, c)
        };
        this.autoOutdent = function (b, a, c) {
            this.$outdent.autoOutdent(a, c)
        };
        this.createWorker = function (b) {
            var a = new d(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return a.attachToDocument(b.getDocument()), a.on("jslint", function (a) {
                for (var c = [], d = 0; d < a.data.length; d++) {
                    var f = a.data[d];
                    f && c.push({row: f.line - 1, column: f.character - 1, text: f.reason, type: "warning", lint: f})
                }
                b.setAnnotations(c)
            }), a.on("narcissus", function (a) {
                b.setAnnotations([a.data])
            }), a.on("terminate", function () {
                b.clearAnnotations()
            }), a
        }
    }).call(l.prototype);
    j.Mode =
        l
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (a, j) {
    var i = a("../lib/oop");
    a("../unicode");
    var h = a("./doc_comment_highlight_rules").DocCommentHighlightRules, g = a("./text_highlight_rules").TextHighlightRules, b = function () {
        var b = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger",
            keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: /\/\/.*$/},
            h.getStartRule("doc-start"),
            {token: "comment", merge: true,
                regex: /\/\*/, next: "comment"},
            {token: "string", regex: "'(?=.)", next: "qstring"},
            {token: "string", regex: '"(?=.)', next: "qqstring"},
            {token: "constant.numeric", regex: /0[xX][0-9a-fA-F]+\b/},
            {token: "constant.numeric", regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},
            {token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"], regex: "([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\.)(prototype)(\\.)([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(=)",
                next: "function_arguments"},
            {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\.)([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"},
            {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\.)([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()", next: "function_arguments"},
            {token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(function)(\\s+)([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(\\()",
                next: "function_arguments"},
            {token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"], regex: "([a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b)(\\s*)(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: ["text", "text", "storage.type", "text", "paren.lparen"], regex: "(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments"},
            {token: "constant.language.boolean", regex: /(?:true|false)\b/},
            {token: "keyword", regex: "(?:case|do|else|finally|in|instanceof|return|throw|try|typeof|yield)\\b",
                next: "regex_allowed"},
            {token: ["punctuation.operator", "support.function"], regex: /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},
            {token: ["punctuation.operator", "support.function.dom"], regex: /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},
            {token: ["punctuation.operator", "support.constant"], regex: /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},
            {token: ["storage.type", "punctuation.operator", "support.function.firebug"], regex: /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},
            {token: b, regex: "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b"},
            {token: "keyword.operator", regex: /!|\$|%|&|\*|\-\-|\-|\+\+|\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=|\b(?:in|instanceof|new|delete|typeof|void)/, next: "regex_allowed"},
            {token: "punctuation.operator", regex: /\?|\:|\,|\;|\./, next: "regex_allowed"},
            {token: "paren.lparen",
                regex: /[\[({]/, next: "regex_allowed"},
            {token: "paren.rparen", regex: /[\])}]/},
            {token: "keyword.operator", regex: /\/=?/, next: "regex_allowed"},
            {token: "comment", regex: /^#!.*$/},
            {token: "text", regex: /\s+/}
        ], regex_allowed: [h.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
            {token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},
            {token: "string.regexp", regex: "/\\w*", next: "start", merge: true},
            {token: "invalid", regex: /\{\d+,?(?:\d+)?}[+*]|[+*^$?][+*]|\?\?/},
            {token: "constant.language.escape", regex: /\(\?[:=!]|\)|\{\d+,?(?:\d+)?}|[+*]\?|[(|)$^+*?]/},
            {token: "string.regexp", regex: /{|[^\[\\{()$^+*?\/]+/, merge: true},
            {token: "constant.language.escape", regex: /\[\^?/, next: "regex_character_class", merge: true},
            {token: "empty", regex: "", next: "start"}
        ], regex_character_class: [
            {token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},
            {token: "constant.language.escape", regex: "]", next: "regex", merge: true},
            {token: "constant.language.escape", regex: "-"},
            {token: "string.regexp.charachterclass", regex: /[^\]\-\\]+/, merge: true},
            {token: "empty", regex: "", next: "start"}
        ], function_arguments: [
            {token: "variable.parameter", regex: "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b"},
            {token: "punctuation.operator", regex: "[, ]+", merge: true},
            {token: "punctuation.operator", regex: "$", merge: true},
            {token: "empty", regex: "",
                next: "start"}
        ], comment_regex_allowed: [
            {token: "comment", regex: ".*?\\*\\/", merge: true, next: "regex_allowed"},
            {token: "comment", merge: true, regex: ".+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", merge: true, next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ], qqstring: [
            {token: "constant.language.escape", regex: "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)"},
            {token: "string", regex: '[^"\\\\]+', merge: true},
            {token: "string", regex: "\\\\$", next: "qqstring", merge: true},
            {token: "string", regex: '"|$', next: "start", merge: true}
        ], qstring: [
            {token: "constant.language.escape", regex: "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)"},
            {token: "string", regex: "[^'\\\\]+", merge: true},
            {token: "string", regex: "\\\\$", next: "qstring", merge: true},
            {token: "string", regex: "'|$", next: "start", merge: true}
        ]};
        this.embedRules(h, "doc-", [h.getEndRule("start")])
    };
    i.inherits(b, g);
    j.JavaScriptHighlightRules = b
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, j) {
    var i = a("../lib/oop"), h = a("./text_highlight_rules").TextHighlightRules, g = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    i.inherits(g, h);
    g.getStartRule = function (b) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: b}
    };
    g.getEndRule = function (b) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: b}
    };
    j.DocCommentHighlightRules = g
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, j) {
    var i = a("../range").Range, h = function () {
    };
    (function () {
        this.checkOutdent = function (a, b) {
            return/^\s+$/.test(a) ? /^\s*\}/.test(b) : !1
        };
        this.autoOutdent = function (a, b) {
            var f = a.getLine(b).match(/^(\s*\})/);
            if (!f)return 0;
            var f = f[1].length, c = a.findMatchingBracket({row: b, column: f});
            if (!c || c.row == b)return 0;
            c = this.$getIndent(a.getLine(c.row));
            a.replace(new i(b, 0, b, f - 1), c)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(h.prototype);
    j.MatchingBraceOutdent = h
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (a, j) {
    var i = a("../../lib/oop"), h = a("../../range").Range, g = a("./fold_mode").FoldMode, b = j.FoldMode = function () {
    };
    i.inherits(b, g);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, d) {
            var e = a.getLine(d), g = e.match(this.foldingStartMarker);
            if (g) {
                b = g.index;
                if (g[1])return this.openingBracketBlock(a,
                    g[1], d, b);
                a = a.getCommentFoldRange(d, b + g[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (g = e.match(this.foldingStopMarker)) {
                b = g.index + g[0].length;
                if (g[2]) {
                    a = a.getCommentFoldRange(d, b);
                    return a.end.column = a.end.column - 2, a
                }
                d = {row: d, column: b};
                if (a = a.$findOpeningBracket(g[1], d))return a.column++, d.column--, h.fromPoints(a, d)
            }
        }
    }).call(b.prototype)
});
define("ace/mode/svg_highlight_rules", "require exports module ace/lib/oop ace/mode/javascript_highlight_rules ace/mode/xml_highlight_rules ace/mode/xml_util".split(" "), function (a, j) {
    var i = a("../lib/oop"), h = a("./javascript_highlight_rules").JavaScriptHighlightRules, g = a("./xml_highlight_rules").XmlHighlightRules, b = a("./xml_util"), f = function () {
        g.call(this);
        this.$rules.start.splice(3, 0, {token: "meta.tag", regex: "<(?=s*script)", next: "script"});
        b.tag(this.$rules, "script", "js-start");
        this.embedRules(h, "js-",
            [
                {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
                {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
            ])
    };
    i.inherits(f, g);
    j.SvgHighlightRules = f
});
define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (a, j) {
    var i = a("../../lib/oop"), h = a("./fold_mode").FoldMode, g = j.FoldMode = function (a, f) {
        this.defaultMode = a;
        this.subModes = f
    };
    i.inherits(g, h);
    (function () {
        this.$getMode = function (a) {
            for (var f in this.subModes)if (0 === a.indexOf(f))return this.subModes[f];
            return null
        };
        this.$tryMode = function (a, f, c, d) {
            return(a = this.$getMode(a)) ? a.getFoldWidget(f, c, d) : ""
        };
        this.getFoldWidget = function (a, f, c) {
            return this.$tryMode(a.getState(c -
                1), a, f, c) || this.$tryMode(a.getState(c), a, f, c) || this.defaultMode.getFoldWidget(a, f, c)
        };
        this.getFoldWidgetRange = function (a, f, c) {
            var d = this.$getMode(a.getState(c - 1));
            if (!d || !d.getFoldWidget(a, f, c))d = this.$getMode(a.getState(c));
            if (!d || !d.getFoldWidget(a, f, c))d = this.defaultMode;
            return d.getFoldWidgetRange(a, f, c)
        }
    }).call(g.prototype)
});