﻿define("ace/mode/luapage", "require exports module ace/lib/oop ace/mode/html ace/mode/lua ace/tokenizer ace/mode/luapage_highlight_rules".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./html").Mode, g = b("./lua").Mode, a = b("../tokenizer").Tokenizer, h = b("./luapage_highlight_rules").LuaPageHighlightRules, c = function () {
        var d = new h;
        this.$tokenizer = new a((new h).getRules());
        this.$embeds = d.getEmbeds();
        this.createModeDelegates({"lua-": g})
    };
    i.inherits(c, j);
    l.Mode = c
});
define("ace/mode/html", "require exports module ace/lib/oop ace/mode/text ace/mode/javascript ace/mode/css ace/tokenizer ace/mode/html_highlight_rules ace/mode/behaviour/html ace/mode/folding/html".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./text").Mode, g = b("./javascript").Mode, a = b("./css").Mode, h = b("../tokenizer").Tokenizer, c = b("./html_highlight_rules").HtmlHighlightRules, d = b("./behaviour/html").HtmlBehaviour, e = b("./folding/html").FoldMode, k = function () {
        var k = new c;
        this.$tokenizer = new h(k.getRules());
        this.$behaviour = new d;
        this.$embeds = k.getEmbeds();
        this.createModeDelegates({"js-": g, "css-": a});
        this.foldingRules = new e
    };
    i.inherits(k, j);
    (function () {
        this.toggleCommentLines = function () {
            return 0
        };
        this.getNextLineIndent = function (d, e) {
            return this.$getIndent(e)
        };
        this.checkOutdent = function () {
            return false
        }
    }).call(k.prototype);
    l.Mode = k
});
define("ace/mode/javascript", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/javascript_highlight_rules ace/mode/matching_brace_outdent ace/range ace/worker/worker_client ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./text").Mode, g = b("../tokenizer").Tokenizer, a = b("./javascript_highlight_rules").JavaScriptHighlightRules, h = b("./matching_brace_outdent").MatchingBraceOutdent, c = b("../range").Range, d = b("../worker/worker_client").WorkerClient,
        e = b("./behaviour/cstyle").CstyleBehaviour, k = b("./folding/cstyle").FoldMode, f = function () {
            this.$tokenizer = new g((new a).getRules());
            this.$outdent = new h;
            this.$behaviour = new e;
            this.foldingRules = new k
        };
    i.inherits(f, j);
    (function () {
        this.toggleCommentLines = function (d, e, k, a) {
            for (var f = true, d = /^(\s*)\/\//, h = k; h <= a; h++)if (!d.test(e.getLine(h))) {
                f = false;
                break
            }
            if (f) {
                f = new c(0, 0, 0, 0);
                for (h = k; h <= a; h++) {
                    k = e.getLine(h).match(d);
                    f.start.row = h;
                    f.end.row = h;
                    f.end.column = k[0].length;
                    e.replace(f, k[1])
                }
            } else e.indentRows(k,
                a, "//")
        };
        this.getNextLineIndent = function (d, e, k) {
            var a = this.$getIndent(e), f = this.$tokenizer.getLineTokens(e, d), c = f.tokens, f = f.state;
            if (c.length && c[c.length - 1].type == "comment")return a;
            if (d == "start" || d == "regex_allowed")(d = e.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/)) && (a = a + k); else if (d == "doc-start") {
                if (f == "start" || d == "regex_allowed")return"";
                (d = e.match(/^\s*(\/?)\*/)) && (d[1] && (a = a + " "), a = a + "* ")
            }
            return a
        };
        this.checkOutdent = function (d, e, a) {
            return this.$outdent.checkOutdent(e, a)
        };
        this.autoOutdent = function (d, e, a) {
            this.$outdent.autoOutdent(e, a)
        };
        this.createWorker = function (e) {
            var a = new d(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return a.attachToDocument(e.getDocument()), a.on("jslint", function (d) {
                for (var a = [], k = 0; k < d.data.length; k++) {
                    var f = d.data[k];
                    f && a.push({row: f.line - 1, column: f.character - 1, text: f.reason, type: "warning", lint: f})
                }
                e.setAnnotations(a)
            }), a.on("narcissus", function (d) {
                e.setAnnotations([d.data])
            }), a.on("terminate", function () {
                e.clearAnnotations()
            }), a
        }
    }).call(f.prototype);
    l.Mode =
        f
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var i = b("../lib/oop");
    b("../unicode");
    var j = b("./doc_comment_highlight_rules").DocCommentHighlightRules, g = b("./text_highlight_rules").TextHighlightRules, a = function () {
        var a = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger",
            keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: /\/\/.*$/},
            j.getStartRule("doc-start"),
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
        ], regex_allowed: [j.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
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
        this.embedRules(j, "doc-", [j.getEndRule("start")])
    };
    i.inherits(a, g);
    l.JavaScriptHighlightRules = a
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, l) {
    var i = b("../lib/oop"), j = b("./text_highlight_rules").TextHighlightRules, g = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    i.inherits(g, j);
    g.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    g.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    l.DocCommentHighlightRules = g
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (b, l) {
    var i = b("../range").Range, j = function () {
    };
    (function () {
        this.checkOutdent = function (b, a) {
            return/^\s+$/.test(b) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (b, a) {
            var h = b.getLine(a).match(/^(\s*\})/);
            if (!h)return 0;
            var h = h[1].length, c = b.findMatchingBracket({row: a, column: h});
            if (!c || c.row == a)return 0;
            c = this.$getIndent(b.getLine(c.row));
            b.replace(new i(a, 0, a, h - 1), c)
        };
        this.$getIndent = function (b) {
            return(b = b.match(/^(\s+)/)) ?
                b[1] : ""
        }
    }).call(j.prototype);
    l.MatchingBraceOutdent = j
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (b, l) {
    var i = b("../../lib/oop"), j = b("../behaviour").Behaviour, g = function () {
        this.add("braces", "insertion", function (a, h, c, d, e) {
            if ("{" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "{" + d + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == e) {
                if (c = c.getCursorPosition(), h = d.doc.getLine(c.row), e = h.substring(c.column, c.column + 1), "}" == e && null !== d.$findOpeningBracket("}", {column: c.column +
                    1, row: c.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == e && (c = c.getCursorPosition(), h = d.doc.getLine(c.row), e = h.substring(c.column, c.column + 1), "}" == e)) {
                c = d.findMatchingBracket({row: c.row, column: c.column + 1});
                if (!c)return null;
                a = this.getNextLineIndent(a, h.substring(0, h.length - 1), d.getTabString());
                d = this.$getIndent(d.doc.getLine(c.row));
                return{text: "\n" + a + "\n" + d, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, h, c, d, e) {
            a = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "{" ==
                a && "}" == d.doc.getLine(e.start.row).substring(e.end.column, e.end.column + 1))return e.end.column++, e
        });
        this.add("parens", "insertion", function (a, h, c, d, e) {
            if ("(" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "(" + d + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == e && (a = c.getCursorPosition(), ")" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, h, c, d, e) {
                a = d.doc.getTextRange(e);
                if (!e.isMultiLine() && "(" == a && ")" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            });
        this.add("brackets", "insertion", function (a, h, c, d, e) {
            if ("[" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "[" + d + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == e && (a = c.getCursorPosition(), "]" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, h, c, d, e) {
            a = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "[" == a && "]" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
        });
        this.add("string_dquotes", "insertion", function (a, h, c, d, e) {
            if ('"' == e || "'" == e) {
                a = c.getSelectionRange();
                h = d.doc.getTextRange(a);
                if ("" !== h)return{text: e + h + e, selection: !1};
                c = c.getCursorPosition();
                h = d.doc.getLine(c.row);
                if ("\\" == h.substring(c.column - 1,
                    c.column))return null;
                for (var d = d.getTokens(a.start.row), k = 0, f, b = -1, g = 0; g < d.length; g++) {
                    f = d[g];
                    "string" == f.type ? b = -1 : 0 > b && (b = f.value.indexOf(e));
                    if (f.value.length + k > a.start.column)break;
                    k += d[g].value.length
                }
                if (!f || 0 > b && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + k - 1 && f.value.lastIndexOf(e) === f.value.length - 1))return{text: e + e, selection: [1, 1]};
                if (f && "string" === f.type && h.substring(c.column, c.column + 1) == e)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, h, c, d, e) {
                a = d.doc.getTextRange(e);
                if (!e.isMultiLine() && ('"' == a || "'" == a) && '"' == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            })
    };
    i.inherits(g, j);
    l.CstyleBehaviour = g
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (b, l) {
    var i = b("../../lib/oop"), j = b("../../range").Range, g = b("./fold_mode").FoldMode, a = l.FoldMode = function () {
    };
    i.inherits(a, g);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, c, d) {
            var e = a.getLine(d), k = e.match(this.foldingStartMarker);
            if (k) {
                c = k.index;
                if (k[1])return this.openingBracketBlock(a,
                    k[1], d, c);
                a = a.getCommentFoldRange(d, c + k[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (c === "markbeginend")if (k = e.match(this.foldingStopMarker)) {
                c = k.index + k[0].length;
                if (k[2]) {
                    a = a.getCommentFoldRange(d, c);
                    return a.end.column = a.end.column - 2, a
                }
                d = {row: d, column: c};
                if (a = a.$findOpeningBracket(k[1], d))return a.column++, d.column--, j.fromPoints(a, d)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, l) {
    var i = b("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (b, g, a) {
            b = b.getLine(a);
            return this.foldingStartMarker.test(b) ? "start" : "markbeginend" == g && this.foldingStopMarker && this.foldingStopMarker.test(b) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (b, g, a) {
            var h = /\S/, c = b.getLine(g), d = c.search(h);
            if (-1 != d) {
                for (var a =
                    a || c.length, e = b.getLength(), k = c = g; ++g < e;) {
                    var f = b.getLine(g).search(h);
                    if (-1 != f) {
                        if (f <= d)break;
                        k = g
                    }
                }
                if (k > c)return b = b.getLine(k).length, new i(c, a, k, b)
            }
        };
        this.openingBracketBlock = function (b, g, a, h, c) {
            a = {row: a, column: h + 1};
            if (g = b.$findClosingBracket(g, a, c))return c = b.foldWidgets[g.row], null == c && (c = this.getFoldWidget(b, g.row)), "start" == c && g.row > a.row && (g.row--, g.column = b.getLine(g.row).length), i.fromPoints(a, g)
        }
    }).call((l.FoldMode = function () {
        }).prototype)
});
define("ace/mode/css", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/css_highlight_rules ace/mode/matching_brace_outdent ace/worker/worker_client ace/mode/folding/cstyle".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./text").Mode, g = b("../tokenizer").Tokenizer, a = b("./css_highlight_rules").CssHighlightRules, h = b("./matching_brace_outdent").MatchingBraceOutdent, c = b("../worker/worker_client").WorkerClient, d = b("./folding/cstyle").FoldMode, e = function () {
        this.$tokenizer = new g((new a).getRules(),
            "i");
        this.$outdent = new h;
        this.foldingRules = new d
    };
    i.inherits(e, j);
    (function () {
        this.foldingRules = "cStyle";
        this.getNextLineIndent = function (d, a, e) {
            var b = this.$getIndent(a), d = this.$tokenizer.getLineTokens(a, d).tokens;
            return d.length && d[d.length - 1].type == "comment" ? b : (a.match(/^.*\{\s*$/) && (b = b + e), b)
        };
        this.checkOutdent = function (d, a, e) {
            return this.$outdent.checkOutdent(a, e)
        };
        this.autoOutdent = function (d, a, e) {
            this.$outdent.autoOutdent(a, e)
        };
        this.createWorker = function (d) {
            var a = new c(["ace"], "ace/mode/css_worker",
                "Worker");
            return a.attachToDocument(d.getDocument()), a.on("csslint", function (a) {
                var e = [];
                a.data.forEach(function (d) {
                    e.push({row: d.line - 1, column: d.col - 1, text: d.message, type: d.type, lint: d})
                });
                d.setAnnotations(e)
            }), a
        }
    }).call(e.prototype);
    l.Mode = e
});
define("ace/mode/css_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("../lib/lang"), g = b("./text_highlight_rules").TextHighlightRules, a = function () {
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
        ], b = j.copyArray(a);
        b.unshift({token: "paren.rparen", regex: "\\}", next: "start"});
        a = j.copyArray(a);
        a.unshift({token: "paren.rparen", regex: "\\}",
            next: "media"});
        var d = [
            {token: "comment", merge: true, regex: ".+"}
        ], e = j.copyArray(d);
        e.unshift({token: "comment", regex: ".*?\\*\\/", next: "start"});
        var k = j.copyArray(d);
        k.unshift({token: "comment", regex: ".*?\\*\\/", next: "media"});
        d = j.copyArray(d);
        d.unshift({token: "comment", regex: ".*?\\*\\/", next: "ruleset"});
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
        ], comment: e, ruleset: b, ruleset_comment: d, media_ruleset: a,
            media_comment: k}
    };
    i.inherits(a, g);
    l.CssHighlightRules = a
});
define("ace/mode/html_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/css_highlight_rules ace/mode/javascript_highlight_rules ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("../lib/lang"), g = b("./css_highlight_rules").CssHighlightRules, a = b("./javascript_highlight_rules").JavaScriptHighlightRules, h = b("./xml_util"), c = b("./text_highlight_rules").TextHighlightRules, d = j.createMap({a: "anchor", button: "form", form: "form", img: "image",
        input: "form", label: "form", script: "script", select: "form", textarea: "form", style: "style", table: "table", tbody: "table", td: "table", tfoot: "table", th: "table", tr: "table"}), j = function () {
        this.$rules = {start: [
            {token: "text", merge: true, regex: "<\\!\\[CDATA\\[", next: "cdata"},
            {token: "xml_pe", regex: "<\\?.*?\\?>"},
            {token: "comment", merge: true, regex: "<\\!--", next: "comment"},
            {token: "xml_pe", regex: "<\\!.*?>"},
            {token: "meta.tag", regex: "<(?=s*script\\b)", next: "script"},
            {token: "meta.tag", regex: "<(?=s*style\\b)", next: "style"},
            {token: "meta.tag", regex: "<\\/?", next: "tag"},
            {token: "text", regex: "\\s+"},
            {token: "constant.character.entity", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},
            {token: "text", regex: "[^<]+"}
        ], cdata: [
            {token: "text", regex: "\\]\\]>", next: "start"},
            {token: "text", merge: true, regex: "\\s+"},
            {token: "text", merge: true, regex: ".+"}
        ], comment: [
            {token: "comment", regex: ".*?--\>", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ]};
        h.tag(this.$rules, "tag", "start", d);
        h.tag(this.$rules, "style", "css-start",
            d);
        h.tag(this.$rules, "script", "js-start", d);
        this.embedRules(a, "js-", [
            {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
            {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
        ]);
        this.embedRules(g, "css-", [
            {token: "meta.tag", regex: "<\\/(?=style)", next: "tag"}
        ])
    };
    i.inherits(j, c);
    l.HtmlHighlightRules = j
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (b, l) {
    function i(b, g) {
        return[
            {token: "string", merge: !0, regex: ".*?" + b, next: g},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    l.tag = function (b, g, a, h) {
        b[g] = [
            {token: "text", regex: "\\s+"},
            {token: h ? function (a) {
                return h[a] ? "meta.tag.tag-name." + h[a] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: g + "_embed_attribute_list"},
            {token: "empty", regex: "", next: g + "_embed_attribute_list"}
        ];
        b[g + "_qstring"] = i("'", g + "_embed_attribute_list");
        b[g + "_qqstring"] = i('"', g + "_embed_attribute_list");
        b[g + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: a},
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
define("ace/mode/behaviour/html", "require exports module ace/lib/oop ace/mode/behaviour/xml ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (b, l) {
    function i(d, a) {
        var b = true, f = d.type.split(".");
        return a.split(".").forEach(function (d) {
            if (f.indexOf(d) == -1)return b = false, false
        }), b
    }

    var j = b("../../lib/oop"), g = b("../behaviour/xml").XmlBehaviour;
    b("./cstyle");
    var a = b("../../token_iterator").TokenIterator, h = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta",
        "param", "source", "track", "wbr"], c = function () {
        this.inherit(g);
        this.add("autoclosing", "insertion", function (d, e, b, f, c) {
            if (c == ">") {
                d = b.getCursorPosition();
                b = new a(f, d.row, d.column);
                f = b.getCurrentToken();
                e = false;
                if (!f || !i(f, "meta.tag") && (!i(f, "text") || !f.value.match("/"))) {
                    do f = b.stepBackward(); while (f && (i(f, "string") || i(f, "keyword.operator") || i(f, "entity.attribute-name") || i(f, "text")))
                } else e = true;
                if (f && i(f, "meta.tag-name") && !b.stepBackward().value.match("/")) {
                    b = f.value;
                    e && (b = b.substring(0, d.column - f.start));
                    if (h.indexOf(b) === -1)return{text: "></" + b + ">", selection: [1, 1]}
                }
            }
        })
    };
    j.inherits(c, g);
    l.HtmlBehaviour = c
});
define("ace/mode/behaviour/xml", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (b, l) {
    function i(d, a) {
        var b = true, f = d.type.split(".");
        return a.split(".").forEach(function (d) {
            if (f.indexOf(d) == -1)return b = false, false
        }), b
    }

    var j = b("../../lib/oop"), g = b("../behaviour").Behaviour, a = b("./cstyle").CstyleBehaviour, h = b("../../token_iterator").TokenIterator, c = function () {
        this.inherit(a, ["string_dquotes"]);
        this.add("autoclosing", "insertion",
            function (d, a, b, f, c) {
                if (c == ">") {
                    d = b.getCursorPosition();
                    b = new h(f, d.row, d.column);
                    f = b.getCurrentToken();
                    a = false;
                    if (!f || !i(f, "meta.tag") && (!i(f, "text") || !f.value.match("/"))) {
                        do f = b.stepBackward(); while (f && (i(f, "string") || i(f, "keyword.operator") || i(f, "entity.attribute-name") || i(f, "text")))
                    } else a = true;
                    if (f && i(f, "meta.tag-name") && !b.stepBackward().value.match("/")) {
                        b = f.value;
                        a && (b = b.substring(0, d.column - f.start));
                        return{text: "></" + b + ">", selection: [1, 1]}
                    }
                }
            });
        this.add("autoindent", "insertion", function (d, a, b, f, c) {
            if (c == "\n") {
                a = b.getCursorPosition();
                if (f.doc.getLine(a.row).substring(a.column, a.column + 2) == "</") {
                    d = this.$getIndent(f.doc.getLine(a.row)) + f.getTabString();
                    f = this.$getIndent(f.doc.getLine(a.row));
                    return{text: "\n" + d + "\n" + f, selection: [1, d.length, 1, d.length]}
                }
            }
        })
    };
    j.inherits(c, g);
    l.XmlBehaviour = c
});
define("ace/mode/folding/html", "require exports module ace/lib/oop ace/mode/folding/mixed ace/mode/folding/xml ace/mode/folding/cstyle".split(" "), function (b, l) {
    var i = b("../../lib/oop"), j = b("./mixed").FoldMode, g = b("./xml").FoldMode, a = b("./cstyle").FoldMode, h = l.FoldMode = function () {
        j.call(this, new g({area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1, li: 1, dt: 1, dd: 1, p: 1, rt: 1, rp: 1, optgroup: 1, option: 1, colgroup: 1, td: 1, th: 1}), {"js-": new a,
            "css-": new a})
    };
    i.inherits(h, j)
});
define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (b, l) {
    var i = b("../../lib/oop"), j = b("./fold_mode").FoldMode, g = l.FoldMode = function (a, b) {
        this.defaultMode = a;
        this.subModes = b
    };
    i.inherits(g, j);
    (function () {
        this.$getMode = function (a) {
            for (var b in this.subModes)if (0 === a.indexOf(b))return this.subModes[b];
            return null
        };
        this.$tryMode = function (a, b, c, d) {
            return(a = this.$getMode(a)) ? a.getFoldWidget(b, c, d) : ""
        };
        this.getFoldWidget = function (a, b, c) {
            return this.$tryMode(a.getState(c -
                1), a, b, c) || this.$tryMode(a.getState(c), a, b, c) || this.defaultMode.getFoldWidget(a, b, c)
        };
        this.getFoldWidgetRange = function (a, b, c) {
            var d = this.$getMode(a.getState(c - 1));
            if (!d || !d.getFoldWidget(a, b, c))d = this.$getMode(a.getState(c));
            if (!d || !d.getFoldWidget(a, b, c))d = this.defaultMode;
            return d.getFoldWidgetRange(a, b, c)
        }
    }).call(g.prototype)
});
define("ace/mode/folding/xml", "require exports module ace/lib/oop ace/lib/lang ace/range ace/mode/folding/fold_mode ace/token_iterator".split(" "), function (b, l) {
    var i = b("../../lib/oop"), j = b("../../lib/lang"), g = b("../../range").Range, a = b("./fold_mode").FoldMode, h = b("../../token_iterator").TokenIterator, c = l.FoldMode = function (d) {
        a.call(this);
        this.voidElements = d || {}
    };
    i.inherits(c, a);
    (function () {
        this.getFoldWidget = function (a, b, c) {
            a = this._getFirstTagInLine(a, c);
            return a.closing ? b == "markbeginend" ? "end" :
                "" : !a.tagName || this.voidElements[a.tagName.toLowerCase()] ? "" : a.selfClosing ? "" : a.value.indexOf("/" + a.tagName) !== -1 ? "" : "start"
        };
        this._getFirstTagInLine = function (a, b) {
            for (var c = a.getTokens(b), f = "", h = 0; h < c.length; h++) {
                var g = c[h];
                g.type.indexOf("meta.tag") === 0 ? f = f + g.value : f = f + j.stringRepeat(" ", g.value.length)
            }
            return this._parseTag(f)
        };
        this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
        this._parseTag = function (a) {
            var b = this.tagRe.exec(a), c = this.tagRe.lastIndex || 0;
            return this.tagRe.lastIndex = 0, {value: a,
                match: b ? b[2] : "", closing: b ? !!b[3] : false, selfClosing: b ? !!b[5] || b[2] == "/>" : false, tagName: b ? b[4] : "", column: b[1] ? c + b[1].length : c}
        };
        this._readTagForward = function (a) {
            var b = a.getCurrentToken();
            if (!b)return null;
            var c = "", f;
            do if (b.type.indexOf("meta.tag") === 0) {
                f || (f = {row: a.getCurrentTokenRow(), column: a.getCurrentTokenColumn()});
                c = c + b.value;
                if (c.indexOf(">") !== -1) {
                    c = this._parseTag(c);
                    return c.start = f, c.end = {row: a.getCurrentTokenRow(), column: a.getCurrentTokenColumn() + b.value.length}, a.stepForward(), c
                }
            } while (b =
                a.stepForward());
            return null
        };
        this._readTagBackward = function (a) {
            var b = a.getCurrentToken();
            if (!b)return null;
            var c = "", f;
            do if (b.type.indexOf("meta.tag") === 0) {
                f || (f = {row: a.getCurrentTokenRow(), column: a.getCurrentTokenColumn() + b.value.length});
                c = b.value + c;
                if (c.indexOf("<") !== -1) {
                    b = this._parseTag(c);
                    return b.end = f, b.start = {row: a.getCurrentTokenRow(), column: a.getCurrentTokenColumn()}, a.stepBackward(), b
                }
            } while (b = a.stepBackward());
            return null
        };
        this._pop = function (a, b) {
            for (; a.length;) {
                var c = a[a.length - 1];
                if (!b || c.tagName == b.tagName)return a.pop();
                if (this.voidElements[b.tagName])break;
                if (this.voidElements[c.tagName])a.pop(); else return null
            }
        };
        this.getFoldWidgetRange = function (a, b, c) {
            var f = this._getFirstTagInLine(a, c);
            if (!f.match)return null;
            b = [];
            if (!f.closing && !f.selfClosing) {
                a = new h(a, c, f.column);
                for (f = {row: c, column: f.column + f.tagName.length + 2}; c = this._readTagForward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, g.fromPoints(c.start,
                        c.end)
                } else if (c.closing) {
                    this._pop(b, c);
                    if (b.length == 0)return g.fromPoints(f, c.start)
                } else b.push(c)
            } else {
                a = new h(a, c, f.column + f.match.length);
                for (f = {row: c, column: f.column}; c = this._readTagBackward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, g.fromPoints(c.start, c.end)
                } else if (c.closing)b.push(c); else {
                    this._pop(b, c);
                    if (b.length == 0)return c.start.column = c.start.column + (c.tagName.length + 2), g.fromPoints(c.start, f)
                }
            }
        }
    }).call(c.prototype)
});
define("ace/mode/lua", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/lua_highlight_rules ace/range".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./text").Mode, g = b("../tokenizer").Tokenizer, a = b("./lua_highlight_rules").LuaHighlightRules, h = b("../range").Range, c = function () {
        this.$tokenizer = new g((new a).getRules())
    };
    i.inherits(c, j);
    (function () {
        function a(c) {
            var d = 0, h;
            for (h in c) {
                var g = c[h];
                g.type == "keyword" ? g.value in b && (d = d + b[g.value]) : g.type == "paren.lparen" ? d++ : g.type ==
                    "paren.rparen" && d--
            }
            return d < 0 ? -1 : d > 0 ? 1 : 0
        }

        var b = {"function": 1, then: 1, "do": 1, "else": 1, elseif: 1, repeat: 1, end: -1, until: -1}, c = ["else", "elseif", "end", "until"];
        this.getNextLineIndent = function (b, c, e) {
            var g = this.$getIndent(c), h = 0, i = this.$tokenizer.getLineTokens(c, b).tokens;
            return b == "start" && (h = a(i)), h > 0 ? g + e : h < 0 && g.substr(g.length - e.length) == e && !this.checkOutdent(b, c, "\n") ? g.substr(0, g.length - e.length) : g
        };
        this.checkOutdent = function (a, b, d) {
            if (d != "\n" && d != "\r" && d != "\r\n")return false;
            if (b.match(/^\s*[\)\}\]]$/))return true;
            a = this.$tokenizer.getLineTokens(b.trim(), a).tokens;
            return!a || !a.length ? false : a[0].type == "keyword" && c.indexOf(a[0].value) != -1
        };
        this.autoOutdent = function (b, c, e) {
            var g = c.getLine(e - 1), b = this.$getIndent(g).length, g = this.$tokenizer.getLineTokens(g, "start").tokens, i = c.getTabString().length, b = b + i * a(g);
            this.$getIndent(c.getLine(e)).length < b || c.outdentRows(new h(e, 0, e + 2, 0))
        }
    }).call(c.prototype);
    l.Mode = c
});
define("ace/mode/lua_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, l) {
    var i = b("../lib/oop"), j = b("./text_highlight_rules").TextHighlightRules, g = function () {
        var a = [];
        this.$rules = {start: [
            {token: "comment", regex: "\\-\\-\\[\\[.*\\]\\]"},
            {token: "comment", regex: "\\-\\-\\[\\=\\[.*\\]\\=\\]"},
            {token: "comment", regex: "\\-\\-\\[\\={2}\\[.*\\]\\={2}\\]"},
            {token: "comment", regex: "\\-\\-\\[\\={3}\\[.*\\]\\={3}\\]"},
            {token: "comment", regex: "\\-\\-\\[\\={4}\\[.*\\]\\={4}\\]"},
            {token: "comment", regex: "\\-\\-\\[\\={5}\\=*\\[.*\\]\\={5}\\=*\\]"},
            {token: "comment", regex: "\\-\\-\\[\\[.*$", merge: !0, next: "qcomment"},
            {token: "comment", regex: "\\-\\-\\[\\=\\[.*$", merge: !0, next: "qcomment1"},
            {token: "comment", regex: "\\-\\-\\[\\={2}\\[.*$", merge: !0, next: "qcomment2"},
            {token: "comment", regex: "\\-\\-\\[\\={3}\\[.*$", merge: !0, next: "qcomment3"},
            {token: "comment", regex: "\\-\\-\\[\\={4}\\[.*$", merge: !0, next: "qcomment4"},
            {token: function (b) {
                var c;
                return null != (c = /\-\-\[(\=+)\[/.exec(b)) && void 0 !=
                    (c = c[1]) && a.push(c.length), "comment"
            }, regex: "\\-\\-\\[\\={5}\\=*\\[.*$", merge: !0, next: "qcomment5"},
            {token: "comment", regex: "\\-\\-.*$"},
            {token: "string", regex: "\\[\\[.*\\]\\]"},
            {token: "string", regex: "\\[\\=\\[.*\\]\\=\\]"},
            {token: "string", regex: "\\[\\={2}\\[.*\\]\\={2}\\]"},
            {token: "string", regex: "\\[\\={3}\\[.*\\]\\={3}\\]"},
            {token: "string", regex: "\\[\\={4}\\[.*\\]\\={4}\\]"},
            {token: "string", regex: "\\[\\={5}\\=*\\[.*\\]\\={5}\\=*\\]"},
            {token: "string", regex: "\\[\\[.*$", merge: !0, next: "qstring"},
            {token: "string",
                regex: "\\[\\=\\[.*$", merge: !0, next: "qstring1"},
            {token: "string", regex: "\\[\\={2}\\[.*$", merge: !0, next: "qstring2"},
            {token: "string", regex: "\\[\\={3}\\[.*$", merge: !0, next: "qstring3"},
            {token: "string", regex: "\\[\\={4}\\[.*$", merge: !0, next: "qstring4"},
            {token: function (b) {
                var c;
                return null != (c = /\[(\=+)\[/.exec(b)) && void 0 != (c = c[1]) && a.push(c.length), "string"
            }, regex: "\\[\\={5}\\=*\\[.*$", merge: !0, next: "qstring5"},
            {token: "string", regex: '"(?:[^\\\\]|\\\\.)*?"'},
            {token: "string", regex: "'(?:[^\\\\]|\\\\.)*?'"},
            {token: "constant.numeric", regex: "(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))"},
            {token: "constant.numeric", regex: "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[xX][\\dA-Fa-f]+))\\b"},
            {token: this.createKeywordMapper({keyword: "break|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while|or|and|not", "support.function": "string|xpcall|package|tostring|print|os|unpack|require|getfenv|setmetatable|next|assert|tonumber|io|rawequal|collectgarbage|getmetatable|module|rawset|math|debug|pcall|table|newproxy|type|coroutine|_G|select|gcinfo|pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|load|error|loadfile|sub|upper|len|gfind|rep|find|match|char|dump|gmatch|reverse|byte|format|gsub|lower|preload|loadlib|loaded|loaders|cpath|config|path|seeall|exit|setlocale|date|getenv|difftime|remove|time|clock|tmpname|rename|execute|lines|write|close|flush|open|output|type|read|stderr|stdin|input|stdout|popen|tmpfile|log|max|acos|huge|ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|gethook|setmetatable|setlocal|traceback|setfenv|getinfo|setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|foreachi|maxn|foreach|concat|sort|remove|resume|yield|status|wrap|create|running|__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber",
                "invalid.deprecated": "setn|foreach|foreachi|gcinfo|log10|maxn", "constant.library": "string|package|os|io|math|debug|table|coroutine", "constant.language": "true|false|nil|_G|_VERSION", "invalid.illegal": "", "variable.language": "this"}, "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."},
            {token: "paren.lparen", regex: "[\\[\\(\\{]"},
            {token: "paren.rparen", regex: "[\\]\\)\\}]"},
            {token: "text", regex: "\\s+"}
        ], qcomment: [
            {token: "comment",
                regex: "(?:[^\\\\]|\\\\.)*?\\]\\]", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qcomment1: [
            {token: "comment", regex: "(?:[^\\\\]|\\\\.)*?\\]\\=\\]", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qcomment2: [
            {token: "comment", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={2}\\]", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qcomment3: [
            {token: "comment", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={3}\\]", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qcomment4: [
            {token: "comment", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={4}\\]",
                next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qcomment5: [
            {token: function (b) {
                var c = this.rules.qcomment5[0], d;
                c.next = "start";
                if (null != (d = /\](\=+)\]/.exec(b)) && void 0 != (d = d[1])) {
                    var b = d.length, e;
                    (e = a.pop()) != b && (a.push(e), c.next = "qcomment5")
                }
                return"comment"
            }, regex: "(?:[^\\\\]|\\\\.)*?\\]\\={5}\\=*\\]", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?\\]\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring1: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?\\]\\=\\]",
                next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring2: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={2}\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring3: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={3}\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring4: [
            {token: "string", regex: "(?:[^\\\\]|\\\\.)*?\\]\\={4}\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring5: [
            {token: function (b) {
                var c = this.rules.qstring5[0], d;
                c.next = "start";
                if (null != (d = /\](\=+)\]/.exec(b)) &&
                    void 0 != (d = d[1])) {
                    var b = d.length, e;
                    (e = a.pop()) != b && (a.push(e), c.next = "qstring5")
                }
                return"string"
            }, regex: "(?:[^\\\\]|\\\\.)*?\\]\\={5}\\=*\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    i.inherits(g, j);
    l.LuaHighlightRules = g
});
define("ace/mode/luapage_highlight_rules", "require exports module ace/lib/oop ace/mode/html_highlight_rules ace/mode/lua_highlight_rules".split(" "), function (b, l) {
    var i = b("../lib/oop"), j = b("./html_highlight_rules").HtmlHighlightRules, g = b("./lua_highlight_rules").LuaHighlightRules, a = function () {
        this.$rules = (new j).getRules();
        for (var a in this.$rules)this.$rules[a].unshift({token: "keyword", regex: "<\\%\\=?", next: "lua-start"}, {token: "keyword", regex: "<\\?lua\\=?", next: "lua-start"});
        this.embedRules(g, "lua-",
            [
                {token: "keyword", regex: "\\%>", next: "start"},
                {token: "keyword", regex: "\\?>", next: "start"}
            ])
    };
    i.inherits(a, j);
    l.LuaPageHighlightRules = a
});