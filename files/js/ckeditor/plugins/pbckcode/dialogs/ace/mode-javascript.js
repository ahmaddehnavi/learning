﻿define("ace/mode/javascript", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/javascript_highlight_rules ace/mode/matching_brace_outdent ace/range ace/worker/worker_client ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (h, j) {
    var i = h("../lib/oop"), f = h("./text").Mode, e = h("../tokenizer").Tokenizer, a = h("./javascript_highlight_rules").JavaScriptHighlightRules, g = h("./matching_brace_outdent").MatchingBraceOutdent, b = h("../range").Range, c = h("../worker/worker_client").WorkerClient,
        d = h("./behaviour/cstyle").CstyleBehaviour, l = h("./folding/cstyle").FoldMode, k = function () {
            this.$tokenizer = new e((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new d;
            this.foldingRules = new l
        };
    i.inherits(k, f);
    (function () {
        this.toggleCommentLines = function (a, d, c, g) {
            for (var e = true, a = /^(\s*)\/\//, f = c; f <= g; f++)if (!a.test(d.getLine(f))) {
                e = false;
                break
            }
            if (e) {
                e = new b(0, 0, 0, 0);
                for (f = c; f <= g; f++) {
                    c = d.getLine(f).match(a);
                    e.start.row = f;
                    e.end.row = f;
                    e.end.column = c[0].length;
                    d.replace(e, c[1])
                }
            } else d.indentRows(c,
                g, "//")
        };
        this.getNextLineIndent = function (a, c, d) {
            var b = this.$getIndent(c), g = this.$tokenizer.getLineTokens(c, a), e = g.tokens, g = g.state;
            if (e.length && e[e.length - 1].type == "comment")return b;
            if (a == "start" || a == "regex_allowed")(a = c.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/)) && (b = b + d); else if (a == "doc-start") {
                if (g == "start" || a == "regex_allowed")return"";
                (a = c.match(/^\s*(\/?)\*/)) && (a[1] && (b = b + " "), b = b + "* ")
            }
            return b
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
                    var g = b.data[d];
                    g && c.push({row: g.line - 1, column: g.character - 1, text: g.reason, type: "warning", lint: g})
                }
                a.setAnnotations(c)
            }), b.on("narcissus", function (b) {
                a.setAnnotations([b.data])
            }), b.on("terminate", function () {
                a.clearAnnotations()
            }), b
        }
    }).call(k.prototype);
    j.Mode =
        k
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (h, j) {
    var i = h("../lib/oop");
    h("../unicode");
    var f = h("./doc_comment_highlight_rules").DocCommentHighlightRules, e = h("./text_highlight_rules").TextHighlightRules, a = function () {
        var a = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger",
            keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: /\/\/.*$/},
            f.getStartRule("doc-start"),
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
            {token: a, regex: "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b"},
            {token: "keyword.operator", regex: /!|\$|%|&|\*|\-\-|\-|\+\+|\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=|\b(?:in|instanceof|new|delete|typeof|void)/, next: "regex_allowed"},
            {token: "punctuation.operator", regex: /\?|\:|\,|\;|\./, next: "regex_allowed"},
            {token: "paren.lparen",
                regex: /[\[({]/, next: "regex_allowed"},
            {token: "paren.rparen", regex: /[\])}]/},
            {token: "keyword.operator", regex: /\/=?/, next: "regex_allowed"},
            {token: "comment", regex: /^#!.*$/},
            {token: "text", regex: /\s+/}
        ], regex_allowed: [f.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
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
        this.embedRules(f, "doc-", [f.getEndRule("start")])
    };
    i.inherits(a, e);
    j.JavaScriptHighlightRules = a
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (h, j) {
    var i = h("../lib/oop"), f = h("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    i.inherits(e, f);
    e.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    e.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    j.DocCommentHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (e, a) {
            return/^\s+$/.test(e) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (e, a) {
            var g = e.getLine(a).match(/^(\s*\})/);
            if (!g)return 0;
            var g = g[1].length, b = e.findMatchingBracket({row: a, column: g});
            if (!b || b.row == a)return 0;
            b = this.$getIndent(e.getLine(b.row));
            e.replace(new i(a, 0, a, g - 1), b)
        };
        this.$getIndent = function (e) {
            return(e = e.match(/^(\s+)/)) ?
                e[1] : ""
        }
    }).call(f.prototype);
    j.MatchingBraceOutdent = f
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (h, j) {
    var i = h("../../lib/oop"), f = h("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (a, g, b, c, d) {
            if ("{" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == d) {
                if (b = b.getCursorPosition(), g = c.doc.getLine(b.row), d = g.substring(b.column, b.column + 1), "}" == d && null !== c.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == d && (b = b.getCursorPosition(), g = c.doc.getLine(b.row), d = g.substring(b.column, b.column + 1), "}" == d)) {
                b = c.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, g.substring(0, g.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, g, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(d.start.row).substring(d.end.column, d.end.column + 1))return d.end.column++, d
        });
        this.add("parens", "insertion", function (a, g, b, c, d) {
            if ("(" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == d && (a = b.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, g, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && "(" == a && ")" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            });
        this.add("brackets", "insertion", function (a, g, b, c, d) {
            if ("[" == d)return a = b.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == d && (a = b.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, g, b, c, d) {
            a = c.doc.getTextRange(d);
            if (!d.isMultiLine() && "[" == a && "]" == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
        });
        this.add("string_dquotes", "insertion", function (a, g, b, c, d) {
            if ('"' == d || "'" == d) {
                a = b.getSelectionRange();
                g = c.doc.getTextRange(a);
                if ("" !== g)return{text: d + g + d, selection: !1};
                b = b.getCursorPosition();
                g = c.doc.getLine(b.row);
                if ("\\" == g.substring(b.column - 1,
                    b.column))return null;
                for (var c = c.getTokens(a.start.row), e = 0, f, h = -1, i = 0; i < c.length; i++) {
                    f = c[i];
                    "string" == f.type ? h = -1 : 0 > h && (h = f.value.indexOf(d));
                    if (f.value.length + e > a.start.column)break;
                    e += c[i].value.length
                }
                if (!f || 0 > h && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + e - 1 && f.value.lastIndexOf(d) === f.value.length - 1))return{text: d + d, selection: [1, 1]};
                if (f && "string" === f.type && g.substring(b.column, b.column + 1) == d)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, g, b, c, d) {
                a = c.doc.getTextRange(d);
                if (!d.isMultiLine() && ('"' == a || "'" == a) && '"' == c.doc.getLine(d.start.row).substring(d.start.column + 1, d.start.column + 2))return d.end.column++, d
            })
    };
    i.inherits(e, f);
    j.CstyleBehaviour = e
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (h, j) {
    var i = h("../../lib/oop"), f = h("../../range").Range, e = h("./fold_mode").FoldMode, a = j.FoldMode = function () {
    };
    i.inherits(a, e);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, c) {
            var d = a.getLine(c), e = d.match(this.foldingStartMarker);
            if (e) {
                b = e.index;
                if (e[1])return this.openingBracketBlock(a,
                    e[1], c, b);
                a = a.getCommentFoldRange(c, b + e[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (e = d.match(this.foldingStopMarker)) {
                b = e.index + e[0].length;
                if (e[2]) {
                    a = a.getCommentFoldRange(c, b);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: b};
                if (a = a.$findOpeningBracket(e[1], c))return a.column++, c.column--, f.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (h, j) {
    var i = h("../../range").Range;
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
            var g = /\S/, b = f.getLine(e), c = b.search(g);
            if (-1 != c) {
                for (var a =
                    a || b.length, d = f.getLength(), h = b = e; ++e < d;) {
                    var j = f.getLine(e).search(g);
                    if (-1 != j) {
                        if (j <= c)break;
                        h = e
                    }
                }
                if (h > b)return f = f.getLine(h).length, new i(b, a, h, f)
            }
        };
        this.openingBracketBlock = function (f, e, a, g, b) {
            a = {row: a, column: g + 1};
            if (e = f.$findClosingBracket(e, a, b))return b = f.foldWidgets[e.row], null == b && (b = this.getFoldWidget(f, e.row)), "start" == b && e.row > a.row && (e.row--, e.column = f.getLine(e.row).length), i.fromPoints(a, e)
        }
    }).call((j.FoldMode = function () {
        }).prototype)
});