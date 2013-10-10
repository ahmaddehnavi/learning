﻿define("ace/mode/coldfusion", "require exports module ace/lib/oop ace/mode/xml ace/mode/javascript ace/mode/css ace/tokenizer ace/mode/coldfusion_highlight_rules".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./xml").Mode, e = a("./javascript").Mode, b = a("./css").Mode, i = a("../tokenizer").Tokenizer, d = a("./coldfusion_highlight_rules").ColdfusionHighlightRules, c = function () {
        g.call(this);
        var c = new d;
        this.$tokenizer = new i(c.getRules());
        this.$embeds = c.getEmbeds();
        this.createModeDelegates({"js-": e, "css-": b})
    };
    h.inherits(c, g);
    (function () {
        this.getNextLineIndent = function (c, k) {
            return this.$getIndent(k)
        }
    }).call(c.prototype);
    j.Mode = c
});
define("ace/mode/xml", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/xml_highlight_rules ace/mode/behaviour/xml ace/mode/folding/xml".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./text").Mode, e = a("../tokenizer").Tokenizer, b = a("./xml_highlight_rules").XmlHighlightRules, i = a("./behaviour/xml").XmlBehaviour, d = a("./folding/xml").FoldMode, c = function () {
        this.$tokenizer = new e((new b).getRules());
        this.$behaviour = new i;
        this.foldingRules = new d
    };
    h.inherits(c, g);
    (function () {
        this.getNextLineIndent =
            function (c, k) {
                return this.$getIndent(k)
            }
    }).call(c.prototype);
    j.Mode = c
});
define("ace/mode/xml_highlight_rules", "require exports module ace/lib/oop ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./xml_util"), e = a("./text_highlight_rules").TextHighlightRules, b = function () {
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
        g.tag(this.$rules, "tag", "start")
    };
    h.inherits(b, e);
    j.XmlHighlightRules = b
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (a, j) {
    function h(a, e) {
        return[
            {token: "string", merge: !0, regex: ".*?" + a, next: e},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    j.tag = function (a, e, b, i) {
        a[e] = [
            {token: "text", regex: "\\s+"},
            {token: i ? function (b) {
                return i[b] ? "meta.tag.tag-name." + i[b] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: e + "_embed_attribute_list"},
            {token: "empty", regex: "", next: e + "_embed_attribute_list"}
        ];
        a[e + "_qstring"] = h("'", e + "_embed_attribute_list");
        a[e + "_qqstring"] = h('"', e + "_embed_attribute_list");
        a[e + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: b},
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
define("ace/mode/behaviour/xml", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (a, j) {
    function h(c, f) {
        var k = true, b = c.type.split(".");
        return f.split(".").forEach(function (c) {
            if (b.indexOf(c) == -1)return k = false, false
        }), k
    }

    var g = a("../../lib/oop"), e = a("../behaviour").Behaviour, b = a("./cstyle").CstyleBehaviour, i = a("../../token_iterator").TokenIterator, d = function () {
        this.inherit(b, ["string_dquotes"]);
        this.add("autoclosing", "insertion",
            function (c, f, k, b, a) {
                if (a == ">") {
                    c = k.getCursorPosition();
                    k = new i(b, c.row, c.column);
                    b = k.getCurrentToken();
                    f = false;
                    if (!b || !h(b, "meta.tag") && (!h(b, "text") || !b.value.match("/"))) {
                        do b = k.stepBackward(); while (b && (h(b, "string") || h(b, "keyword.operator") || h(b, "entity.attribute-name") || h(b, "text")))
                    } else f = true;
                    if (b && h(b, "meta.tag-name") && !k.stepBackward().value.match("/")) {
                        k = b.value;
                        f && (k = k.substring(0, c.column - b.start));
                        return{text: "></" + k + ">", selection: [1, 1]}
                    }
                }
            });
        this.add("autoindent", "insertion", function (c, f, b, a, d) {
            if (d == "\n") {
                f = b.getCursorPosition();
                if (a.doc.getLine(f.row).substring(f.column, f.column + 2) == "</") {
                    c = this.$getIndent(a.doc.getLine(f.row)) + a.getTabString();
                    a = this.$getIndent(a.doc.getLine(f.row));
                    return{text: "\n" + c + "\n" + a, selection: [1, c.length, 1, c.length]}
                }
            }
        })
    };
    g.inherits(d, e);
    j.XmlBehaviour = d
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (a, j) {
    var h = a("../../lib/oop"), g = a("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (b, a, d, c, f) {
            if ("{" == f)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == f) {
                if (d = d.getCursorPosition(), a = c.doc.getLine(d.row), f = a.substring(d.column, d.column + 1), "}" == f && null !== c.$findOpeningBracket("}", {column: d.column +
                    1, row: d.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == f && (d = d.getCursorPosition(), a = c.doc.getLine(d.row), f = a.substring(d.column, d.column + 1), "}" == f)) {
                d = c.findMatchingBracket({row: d.row, column: d.column + 1});
                if (!d)return null;
                b = this.getNextLineIndent(b, a.substring(0, a.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(d.row));
                return{text: "\n" + b + "\n" + c, selection: [1, b.length, 1, b.length]}
            }
        });
        this.add("braces", "deletion", function (b, a, d, c, f) {
            b = c.doc.getTextRange(f);
            if (!f.isMultiLine() && "{" ==
                b && "}" == c.doc.getLine(f.start.row).substring(f.end.column, f.end.column + 1))return f.end.column++, f
        });
        this.add("parens", "insertion", function (b, a, d, c, f) {
            if ("(" == f)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == f && (b = d.getCursorPosition(), ")" == c.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== c.$findOpeningBracket(")", {column: b.column + 1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (b, a, d, c, f) {
                b = c.doc.getTextRange(f);
                if (!f.isMultiLine() && "(" == b && ")" == c.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
            });
        this.add("brackets", "insertion", function (b, a, d, c, f) {
            if ("[" == f)return b = d.getSelectionRange(), c = c.doc.getTextRange(b), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == f && (b = d.getCursorPosition(), "]" == c.doc.getLine(b.row).substring(b.column, b.column + 1) && null !== c.$findOpeningBracket("]", {column: b.column +
                1, row: b.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (b, a, d, c, f) {
            b = c.doc.getTextRange(f);
            if (!f.isMultiLine() && "[" == b && "]" == c.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
        });
        this.add("string_dquotes", "insertion", function (b, a, d, c, f) {
            if ('"' == f || "'" == f) {
                b = d.getSelectionRange();
                a = c.doc.getTextRange(b);
                if ("" !== a)return{text: f + a + f, selection: !1};
                d = d.getCursorPosition();
                a = c.doc.getLine(d.row);
                if ("\\" == a.substring(d.column - 1,
                    d.column))return null;
                for (var c = c.getTokens(b.start.row), k = 0, e, g = -1, h = 0; h < c.length; h++) {
                    e = c[h];
                    "string" == e.type ? g = -1 : 0 > g && (g = e.value.indexOf(f));
                    if (e.value.length + k > b.start.column)break;
                    k += c[h].value.length
                }
                if (!e || 0 > g && "comment" !== e.type && ("string" !== e.type || b.start.column !== e.value.length + k - 1 && e.value.lastIndexOf(f) === e.value.length - 1))return{text: f + f, selection: [1, 1]};
                if (e && "string" === e.type && a.substring(d.column, d.column + 1) == f)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (b, a, e, c, f) {
                b = c.doc.getTextRange(f);
                if (!f.isMultiLine() && ('"' == b || "'" == b) && '"' == c.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
            })
    };
    h.inherits(e, g);
    j.CstyleBehaviour = e
});
define("ace/mode/folding/xml", "require exports module ace/lib/oop ace/lib/lang ace/range ace/mode/folding/fold_mode ace/token_iterator".split(" "), function (a, j) {
    var h = a("../../lib/oop"), g = a("../../lib/lang"), e = a("../../range").Range, b = a("./fold_mode").FoldMode, i = a("../../token_iterator").TokenIterator, d = j.FoldMode = function (c) {
        b.call(this);
        this.voidElements = c || {}
    };
    h.inherits(d, b);
    (function () {
        this.getFoldWidget = function (c, f, b) {
            c = this._getFirstTagInLine(c, b);
            return c.closing ? f == "markbeginend" ? "end" :
                "" : !c.tagName || this.voidElements[c.tagName.toLowerCase()] ? "" : c.selfClosing ? "" : c.value.indexOf("/" + c.tagName) !== -1 ? "" : "start"
        };
        this._getFirstTagInLine = function (c, f) {
            for (var b = c.getTokens(f), a = "", e = 0; e < b.length; e++) {
                var d = b[e];
                d.type.indexOf("meta.tag") === 0 ? a = a + d.value : a = a + g.stringRepeat(" ", d.value.length)
            }
            return this._parseTag(a)
        };
        this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
        this._parseTag = function (c) {
            var f = this.tagRe.exec(c), b = this.tagRe.lastIndex || 0;
            return this.tagRe.lastIndex = 0, {value: c,
                match: f ? f[2] : "", closing: f ? !!f[3] : false, selfClosing: f ? !!f[5] || f[2] == "/>" : false, tagName: f ? f[4] : "", column: f[1] ? b + f[1].length : b}
        };
        this._readTagForward = function (c) {
            var b = c.getCurrentToken();
            if (!b)return null;
            var a = "", e;
            do if (b.type.indexOf("meta.tag") === 0) {
                e || (e = {row: c.getCurrentTokenRow(), column: c.getCurrentTokenColumn()});
                a = a + b.value;
                if (a.indexOf(">") !== -1) {
                    a = this._parseTag(a);
                    return a.start = e, a.end = {row: c.getCurrentTokenRow(), column: c.getCurrentTokenColumn() + b.value.length}, c.stepForward(), a
                }
            } while (b =
                c.stepForward());
            return null
        };
        this._readTagBackward = function (c) {
            var b = c.getCurrentToken();
            if (!b)return null;
            var a = "", e;
            do if (b.type.indexOf("meta.tag") === 0) {
                e || (e = {row: c.getCurrentTokenRow(), column: c.getCurrentTokenColumn() + b.value.length});
                a = b.value + a;
                if (a.indexOf("<") !== -1) {
                    b = this._parseTag(a);
                    return b.end = e, b.start = {row: c.getCurrentTokenRow(), column: c.getCurrentTokenColumn()}, c.stepBackward(), b
                }
            } while (b = c.stepBackward());
            return null
        };
        this._pop = function (b, a) {
            for (; b.length;) {
                var e = b[b.length - 1];
                if (!a || e.tagName == a.tagName)return b.pop();
                if (this.voidElements[a.tagName])break;
                if (this.voidElements[e.tagName])b.pop(); else return null
            }
        };
        this.getFoldWidgetRange = function (b, a, d) {
            var g = this._getFirstTagInLine(b, d);
            if (!g.match)return null;
            a = [];
            if (!g.closing && !g.selfClosing) {
                b = new i(b, d, g.column);
                for (g = {row: d, column: g.column + g.tagName.length + 2}; d = this._readTagForward(b);)if (d.selfClosing) {
                    if (!a.length)return d.start.column = d.start.column + (d.tagName.length + 2), d.end.column = d.end.column - 2, e.fromPoints(d.start,
                        d.end)
                } else if (d.closing) {
                    this._pop(a, d);
                    if (a.length == 0)return e.fromPoints(g, d.start)
                } else a.push(d)
            } else {
                b = new i(b, d, g.column + g.match.length);
                for (g = {row: d, column: g.column}; d = this._readTagBackward(b);)if (d.selfClosing) {
                    if (!a.length)return d.start.column = d.start.column + (d.tagName.length + 2), d.end.column = d.end.column - 2, e.fromPoints(d.start, d.end)
                } else if (d.closing)a.push(d); else {
                    this._pop(a, d);
                    if (a.length == 0)return d.start.column = d.start.column + (d.tagName.length + 2), e.fromPoints(d.start, g)
                }
            }
        }
    }).call(d.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (a, j) {
    var h = a("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (a, e, b) {
            a = a.getLine(b);
            return this.foldingStartMarker.test(a) ? "start" : "markbeginend" == e && this.foldingStopMarker && this.foldingStopMarker.test(a) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (a, e, b) {
            var i = /\S/, d = a.getLine(e), c = d.search(i);
            if (-1 != c) {
                for (var b =
                    b || d.length, f = a.getLength(), k = d = e; ++e < f;) {
                    var j = a.getLine(e).search(i);
                    if (-1 != j) {
                        if (j <= c)break;
                        k = e
                    }
                }
                if (k > d)return a = a.getLine(k).length, new h(d, b, k, a)
            }
        };
        this.openingBracketBlock = function (a, e, b, i, d) {
            b = {row: b, column: i + 1};
            if (e = a.$findClosingBracket(e, b, d))return d = a.foldWidgets[e.row], null == d && (d = this.getFoldWidget(a, e.row)), "start" == d && e.row > b.row && (e.row--, e.column = a.getLine(e.row).length), h.fromPoints(b, e)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});
define("ace/mode/javascript", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/javascript_highlight_rules ace/mode/matching_brace_outdent ace/range ace/worker/worker_client ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./text").Mode, e = a("../tokenizer").Tokenizer, b = a("./javascript_highlight_rules").JavaScriptHighlightRules, i = a("./matching_brace_outdent").MatchingBraceOutdent, d = a("../range").Range, c = a("../worker/worker_client").WorkerClient,
        f = a("./behaviour/cstyle").CstyleBehaviour, k = a("./folding/cstyle").FoldMode, l = function () {
            this.$tokenizer = new e((new b).getRules());
            this.$outdent = new i;
            this.$behaviour = new f;
            this.foldingRules = new k
        };
    h.inherits(l, g);
    (function () {
        this.toggleCommentLines = function (a, b, c, e) {
            for (var f = true, a = /^(\s*)\/\//, i = c; i <= e; i++)if (!a.test(b.getLine(i))) {
                f = false;
                break
            }
            if (f) {
                f = new d(0, 0, 0, 0);
                for (i = c; i <= e; i++) {
                    c = b.getLine(i).match(a);
                    f.start.row = i;
                    f.end.row = i;
                    f.end.column = c[0].length;
                    b.replace(f, c[1])
                }
            } else b.indentRows(c,
                e, "//")
        };
        this.getNextLineIndent = function (a, b, c) {
            var d = this.$getIndent(b), e = this.$tokenizer.getLineTokens(b, a), f = e.tokens, e = e.state;
            if (f.length && f[f.length - 1].type == "comment")return d;
            if (a == "start" || a == "regex_allowed")(a = b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/)) && (d = d + c); else if (a == "doc-start") {
                if (e == "start" || a == "regex_allowed")return"";
                (a = b.match(/^\s*(\/?)\*/)) && (a[1] && (d = d + " "), d = d + "* ")
            }
            return d
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        };
        this.createWorker = function (a) {
            var b = new c(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return b.attachToDocument(a.getDocument()), b.on("jslint", function (b) {
                for (var c = [], d = 0; d < b.data.length; d++) {
                    var e = b.data[d];
                    e && c.push({row: e.line - 1, column: e.character - 1, text: e.reason, type: "warning", lint: e})
                }
                a.setAnnotations(c)
            }), b.on("narcissus", function (b) {
                a.setAnnotations([b.data])
            }), b.on("terminate", function () {
                a.clearAnnotations()
            }), b
        }
    }).call(l.prototype);
    j.Mode =
        l
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (a, j) {
    var h = a("../lib/oop");
    a("../unicode");
    var g = a("./doc_comment_highlight_rules").DocCommentHighlightRules, e = a("./text_highlight_rules").TextHighlightRules, b = function () {
        var b = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger",
            keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: /\/\/.*$/},
            g.getStartRule("doc-start"),
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
        ], regex_allowed: [g.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
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
        this.embedRules(g, "doc-", [g.getEndRule("start")])
    };
    h.inherits(b, e);
    j.JavaScriptHighlightRules = b
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, j) {
    var h = a("../lib/oop"), g = a("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    h.inherits(e, g);
    e.getStartRule = function (b) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: b}
    };
    e.getEndRule = function (b) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: b}
    };
    j.DocCommentHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, j) {
    var h = a("../range").Range, g = function () {
    };
    (function () {
        this.checkOutdent = function (a, b) {
            return/^\s+$/.test(a) ? /^\s*\}/.test(b) : !1
        };
        this.autoOutdent = function (a, b) {
            var i = a.getLine(b).match(/^(\s*\})/);
            if (!i)return 0;
            var i = i[1].length, d = a.findMatchingBracket({row: b, column: i});
            if (!d || d.row == b)return 0;
            d = this.$getIndent(a.getLine(d.row));
            a.replace(new h(b, 0, b, i - 1), d)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(g.prototype);
    j.MatchingBraceOutdent = g
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (a, j) {
    var h = a("../../lib/oop"), g = a("../../range").Range, e = a("./fold_mode").FoldMode, b = j.FoldMode = function () {
    };
    h.inherits(b, e);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, c) {
            var f = a.getLine(c), e = f.match(this.foldingStartMarker);
            if (e) {
                b = e.index;
                if (e[1])return this.openingBracketBlock(a,
                    e[1], c, b);
                a = a.getCommentFoldRange(c, b + e[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (e = f.match(this.foldingStopMarker)) {
                b = e.index + e[0].length;
                if (e[2]) {
                    a = a.getCommentFoldRange(c, b);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: b};
                if (a = a.$findOpeningBracket(e[1], c))return a.column++, c.column--, g.fromPoints(a, c)
            }
        }
    }).call(b.prototype)
});
define("ace/mode/css", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/css_highlight_rules ace/mode/matching_brace_outdent ace/worker/worker_client ace/mode/folding/cstyle".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./text").Mode, e = a("../tokenizer").Tokenizer, b = a("./css_highlight_rules").CssHighlightRules, i = a("./matching_brace_outdent").MatchingBraceOutdent, d = a("../worker/worker_client").WorkerClient, c = a("./folding/cstyle").FoldMode, f = function () {
        this.$tokenizer = new e((new b).getRules(),
            "i");
        this.$outdent = new i;
        this.foldingRules = new c
    };
    h.inherits(f, g);
    (function () {
        this.foldingRules = "cStyle";
        this.getNextLineIndent = function (a, b, c) {
            var d = this.$getIndent(b), a = this.$tokenizer.getLineTokens(b, a).tokens;
            return a.length && a[a.length - 1].type == "comment" ? d : (b.match(/^.*\{\s*$/) && (d = d + c), d)
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        };
        this.createWorker = function (a) {
            var b = new d(["ace"], "ace/mode/css_worker",
                "Worker");
            return b.attachToDocument(a.getDocument()), b.on("csslint", function (b) {
                var c = [];
                b.data.forEach(function (a) {
                    c.push({row: a.line - 1, column: a.col - 1, text: a.message, type: a.type, lint: a})
                });
                a.setAnnotations(c)
            }), b
        }
    }).call(f.prototype);
    j.Mode = f
});
define("ace/mode/css_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("../lib/lang"), e = a("./text_highlight_rules").TextHighlightRules, b = function () {
        var a = [
            {token: "comment", merge: true, regex: "\\/\\*", next: "ruleset_comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: ["constant.numeric", "keyword"], regex: "(\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+)))(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"},
            {token: ["constant.numeric"], regex: "([0-9]+)"},
            {token: "constant.numeric", regex: "#[a-f0-9]{6}"},
            {token: "constant.numeric", regex: "#[a-f0-9]{3}"},
            {token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"], regex: "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b"},
            {token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"], regex: "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b"},
            {token: this.createKeywordMapper({"support.type": "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index",
                "support.function": "rgb|rgba|url|attr|counter|counters", "support.constant": "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero",
                "support.constant.color": "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow", "support.constant.fonts": "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace"}, "text", true), regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}
        ], b = g.copyArray(a);
        b.unshift({token: "paren.rparen", regex: "\\}", next: "start"});
        a = g.copyArray(a);
        a.unshift({token: "paren.rparen", regex: "\\}",
            next: "media"});
        var c = [
            {token: "comment", merge: true, regex: ".+"}
        ], e = g.copyArray(c);
        e.unshift({token: "comment", regex: ".*?\\*\\/", next: "start"});
        var h = g.copyArray(c);
        h.unshift({token: "comment", regex: ".*?\\*\\/", next: "media"});
        c = g.copyArray(c);
        c.unshift({token: "comment", regex: ".*?\\*\\/", next: "ruleset"});
        this.$rules = {start: [
            {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
            {token: "paren.lparen", regex: "\\{", next: "ruleset"},
            {token: "string", regex: "@.*?{", next: "media"},
            {token: "keyword", regex: "#[a-z0-9-_]+"},
            {token: "variable", regex: "\\.[a-z0-9-_]+"},
            {token: "string", regex: ":[a-z0-9-_]+"},
            {token: "constant", regex: "[a-z0-9-_]+"}
        ], media: [
            {token: "comment", merge: true, regex: "\\/\\*", next: "media_comment"},
            {token: "paren.lparen", regex: "\\{", next: "media_ruleset"},
            {token: "string", regex: "\\}", next: "start"},
            {token: "keyword", regex: "#[a-z0-9-_]+"},
            {token: "variable", regex: "\\.[a-z0-9-_]+"},
            {token: "string", regex: ":[a-z0-9-_]+"},
            {token: "constant", regex: "[a-z0-9-_]+"}
        ], comment: e, ruleset: b, ruleset_comment: c, media_ruleset: a,
            media_comment: h}
    };
    h.inherits(b, e);
    j.CssHighlightRules = b
});
define("ace/mode/coldfusion_highlight_rules", "require exports module ace/lib/oop ace/mode/css_highlight_rules ace/mode/javascript_highlight_rules ace/mode/text_highlight_rules ace/mode/xml_util".split(" "), function (a, j) {
    var h = a("../lib/oop"), g = a("./css_highlight_rules").CssHighlightRules, e = a("./javascript_highlight_rules").JavaScriptHighlightRules, b = a("./text_highlight_rules").TextHighlightRules, i = a("./xml_util"), d = function () {
        this.$rules = {start: [
            {token: "text", merge: true, regex: "<\\!\\[CDATA\\[", next: "cdata"},
            {token: "xml_pe", regex: "<\\?.*?\\?>"},
            {token: "comment", merge: true, regex: "<\\!--", next: "comment"},
            {token: "meta.tag", regex: "<(?=s*script)", next: "script"},
            {token: "meta.tag", regex: "<(?=s*style)", next: "style"},
            {token: "meta.tag", regex: "<\\/?", next: "tag"},
            {token: "text", regex: "\\s+"},
            {token: "text", regex: "[^<]+"}
        ], cdata: [
            {token: "text", regex: "\\]\\]>", next: "start"},
            {token: "text", merge: true, regex: "\\s+"},
            {token: "text", merge: true, regex: ".+"}
        ], comment: [
            {token: "comment", regex: ".*?--\>", next: "start"},
            {token: "comment",
                merge: true, regex: ".+"}
        ]};
        i.tag(this.$rules, "tag", "start");
        i.tag(this.$rules, "style", "css-start");
        i.tag(this.$rules, "script", "js-start");
        this.embedRules(e, "js-", [
            {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
            {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
        ]);
        this.embedRules(g, "css-", [
            {token: "meta.tag", regex: "<\\/(?=style)", next: "tag"}
        ])
    };
    h.inherits(d, b);
    j.ColdfusionHighlightRules = d
});