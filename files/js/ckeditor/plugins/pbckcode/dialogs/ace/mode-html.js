﻿define("ace/mode/html", "require exports module ace/lib/oop ace/mode/text ace/mode/javascript ace/mode/css ace/tokenizer ace/mode/html_highlight_rules ace/mode/behaviour/html ace/mode/folding/html".split(" "), function (b, l) {
    var j = b("../lib/oop"), k = b("./text").Mode, f = b("./javascript").Mode, a = b("./css").Mode, g = b("../tokenizer").Tokenizer, c = b("./html_highlight_rules").HtmlHighlightRules, d = b("./behaviour/html").HtmlBehaviour, e = b("./folding/html").FoldMode, h = function () {
        var h = new c;
        this.$tokenizer = new g(h.getRules());
        this.$behaviour = new d;
        this.$embeds = h.getEmbeds();
        this.createModeDelegates({"js-": f, "css-": a});
        this.foldingRules = new e
    };
    j.inherits(h, k);
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
    }).call(h.prototype);
    l.Mode = h
});
define("ace/mode/javascript", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/javascript_highlight_rules ace/mode/matching_brace_outdent ace/range ace/worker/worker_client ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (b, l) {
    var j = b("../lib/oop"), k = b("./text").Mode, f = b("../tokenizer").Tokenizer, a = b("./javascript_highlight_rules").JavaScriptHighlightRules, g = b("./matching_brace_outdent").MatchingBraceOutdent, c = b("../range").Range, d = b("../worker/worker_client").WorkerClient,
        e = b("./behaviour/cstyle").CstyleBehaviour, h = b("./folding/cstyle").FoldMode, i = function () {
            this.$tokenizer = new f((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new e;
            this.foldingRules = new h
        };
    j.inherits(i, k);
    (function () {
        this.toggleCommentLines = function (d, e, h, a) {
            for (var i = true, d = /^(\s*)\/\//, g = h; g <= a; g++)if (!d.test(e.getLine(g))) {
                i = false;
                break
            }
            if (i) {
                i = new c(0, 0, 0, 0);
                for (g = h; g <= a; g++) {
                    h = e.getLine(g).match(d);
                    i.start.row = g;
                    i.end.row = g;
                    i.end.column = h[0].length;
                    e.replace(i, h[1])
                }
            } else e.indentRows(h,
                a, "//")
        };
        this.getNextLineIndent = function (d, e, h) {
            var a = this.$getIndent(e), i = this.$tokenizer.getLineTokens(e, d), g = i.tokens, i = i.state;
            if (g.length && g[g.length - 1].type == "comment")return a;
            if (d == "start" || d == "regex_allowed")(d = e.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/)) && (a = a + h); else if (d == "doc-start") {
                if (i == "start" || d == "regex_allowed")return"";
                (d = e.match(/^\s*(\/?)\*/)) && (d[1] && (a = a + " "), a = a + "* ")
            }
            return a
        };
        this.checkOutdent = function (d, e, h) {
            return this.$outdent.checkOutdent(e, h)
        };
        this.autoOutdent = function (d, e, h) {
            this.$outdent.autoOutdent(e, h)
        };
        this.createWorker = function (e) {
            var h = new d(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return h.attachToDocument(e.getDocument()), h.on("jslint", function (d) {
                for (var h = [], a = 0; a < d.data.length; a++) {
                    var i = d.data[a];
                    i && h.push({row: i.line - 1, column: i.character - 1, text: i.reason, type: "warning", lint: i})
                }
                e.setAnnotations(h)
            }), h.on("narcissus", function (d) {
                e.setAnnotations([d.data])
            }), h.on("terminate", function () {
                e.clearAnnotations()
            }), h
        }
    }).call(i.prototype);
    l.Mode =
        i
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var j = b("../lib/oop");
    b("../unicode");
    var k = b("./doc_comment_highlight_rules").DocCommentHighlightRules, f = b("./text_highlight_rules").TextHighlightRules, a = function () {
        var a = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger",
            keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment", regex: /\/\/.*$/},
            k.getStartRule("doc-start"),
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
        ], regex_allowed: [k.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
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
        this.embedRules(k, "doc-", [k.getEndRule("start")])
    };
    j.inherits(a, f);
    l.JavaScriptHighlightRules = a
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, l) {
    var j = b("../lib/oop"), k = b("./text_highlight_rules").TextHighlightRules, f = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    j.inherits(f, k);
    f.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    f.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    l.DocCommentHighlightRules = f
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (b, l) {
    var j = b("../range").Range, k = function () {
    };
    (function () {
        this.checkOutdent = function (b, a) {
            return/^\s+$/.test(b) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (b, a) {
            var g = b.getLine(a).match(/^(\s*\})/);
            if (!g)return 0;
            var g = g[1].length, c = b.findMatchingBracket({row: a, column: g});
            if (!c || c.row == a)return 0;
            c = this.$getIndent(b.getLine(c.row));
            b.replace(new j(a, 0, a, g - 1), c)
        };
        this.$getIndent = function (b) {
            return(b = b.match(/^(\s+)/)) ?
                b[1] : ""
        }
    }).call(k.prototype);
    l.MatchingBraceOutdent = k
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (b, l) {
    var j = b("../../lib/oop"), k = b("../behaviour").Behaviour, f = function () {
        this.add("braces", "insertion", function (a, g, c, d, e) {
            if ("{" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "{" + d + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == e) {
                if (c = c.getCursorPosition(), g = d.doc.getLine(c.row), e = g.substring(c.column, c.column + 1), "}" == e && null !== d.$findOpeningBracket("}", {column: c.column +
                    1, row: c.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == e && (c = c.getCursorPosition(), g = d.doc.getLine(c.row), e = g.substring(c.column, c.column + 1), "}" == e)) {
                c = d.findMatchingBracket({row: c.row, column: c.column + 1});
                if (!c)return null;
                a = this.getNextLineIndent(a, g.substring(0, g.length - 1), d.getTabString());
                d = this.$getIndent(d.doc.getLine(c.row));
                return{text: "\n" + a + "\n" + d, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, g, c, d, e) {
            a = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "{" ==
                a && "}" == d.doc.getLine(e.start.row).substring(e.end.column, e.end.column + 1))return e.end.column++, e
        });
        this.add("parens", "insertion", function (a, g, c, d, e) {
            if ("(" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "(" + d + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == e && (a = c.getCursorPosition(), ")" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, g, c, d, e) {
                a = d.doc.getTextRange(e);
                if (!e.isMultiLine() && "(" == a && ")" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            });
        this.add("brackets", "insertion", function (a, g, c, d, e) {
            if ("[" == e)return a = c.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "[" + d + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == e && (a = c.getCursorPosition(), "]" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, g, c, d, e) {
            a = d.doc.getTextRange(e);
            if (!e.isMultiLine() && "[" == a && "]" == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
        });
        this.add("string_dquotes", "insertion", function (a, g, c, d, e) {
            if ('"' == e || "'" == e) {
                a = c.getSelectionRange();
                g = d.doc.getTextRange(a);
                if ("" !== g)return{text: e + g + e, selection: !1};
                c = c.getCursorPosition();
                g = d.doc.getLine(c.row);
                if ("\\" == g.substring(c.column - 1,
                    c.column))return null;
                for (var d = d.getTokens(a.start.row), h = 0, i, b = -1, f = 0; f < d.length; f++) {
                    i = d[f];
                    "string" == i.type ? b = -1 : 0 > b && (b = i.value.indexOf(e));
                    if (i.value.length + h > a.start.column)break;
                    h += d[f].value.length
                }
                if (!i || 0 > b && "comment" !== i.type && ("string" !== i.type || a.start.column !== i.value.length + h - 1 && i.value.lastIndexOf(e) === i.value.length - 1))return{text: e + e, selection: [1, 1]};
                if (i && "string" === i.type && g.substring(c.column, c.column + 1) == e)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, g, c, d, e) {
                a = d.doc.getTextRange(e);
                if (!e.isMultiLine() && ('"' == a || "'" == a) && '"' == d.doc.getLine(e.start.row).substring(e.start.column + 1, e.start.column + 2))return e.end.column++, e
            })
    };
    j.inherits(f, k);
    l.CstyleBehaviour = f
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (b, l) {
    var j = b("../../lib/oop"), k = b("../../range").Range, f = b("./fold_mode").FoldMode, a = l.FoldMode = function () {
    };
    j.inherits(a, f);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, c, d) {
            var e = a.getLine(d), h = e.match(this.foldingStartMarker);
            if (h) {
                c = h.index;
                if (h[1])return this.openingBracketBlock(a,
                    h[1], d, c);
                a = a.getCommentFoldRange(d, c + h[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (c === "markbeginend")if (h = e.match(this.foldingStopMarker)) {
                c = h.index + h[0].length;
                if (h[2]) {
                    a = a.getCommentFoldRange(d, c);
                    return a.end.column = a.end.column - 2, a
                }
                d = {row: d, column: c};
                if (a = a.$findOpeningBracket(h[1], d))return a.column++, d.column--, k.fromPoints(a, d)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, l) {
    var j = b("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (b, f, a) {
            b = b.getLine(a);
            return this.foldingStartMarker.test(b) ? "start" : "markbeginend" == f && this.foldingStopMarker && this.foldingStopMarker.test(b) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (b, f, a) {
            var g = /\S/, c = b.getLine(f), d = c.search(g);
            if (-1 != d) {
                for (var a =
                    a || c.length, e = b.getLength(), h = c = f; ++f < e;) {
                    var i = b.getLine(f).search(g);
                    if (-1 != i) {
                        if (i <= d)break;
                        h = f
                    }
                }
                if (h > c)return b = b.getLine(h).length, new j(c, a, h, b)
            }
        };
        this.openingBracketBlock = function (b, f, a, g, c) {
            a = {row: a, column: g + 1};
            if (f = b.$findClosingBracket(f, a, c))return c = b.foldWidgets[f.row], null == c && (c = this.getFoldWidget(b, f.row)), "start" == c && f.row > a.row && (f.row--, f.column = b.getLine(f.row).length), j.fromPoints(a, f)
        }
    }).call((l.FoldMode = function () {
        }).prototype)
});
define("ace/mode/css", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/css_highlight_rules ace/mode/matching_brace_outdent ace/worker/worker_client ace/mode/folding/cstyle".split(" "), function (b, l) {
    var j = b("../lib/oop"), k = b("./text").Mode, f = b("../tokenizer").Tokenizer, a = b("./css_highlight_rules").CssHighlightRules, g = b("./matching_brace_outdent").MatchingBraceOutdent, c = b("../worker/worker_client").WorkerClient, d = b("./folding/cstyle").FoldMode, e = function () {
        this.$tokenizer = new f((new a).getRules(),
            "i");
        this.$outdent = new g;
        this.foldingRules = new d
    };
    j.inherits(e, k);
    (function () {
        this.foldingRules = "cStyle";
        this.getNextLineIndent = function (d, e, a) {
            var b = this.$getIndent(e), d = this.$tokenizer.getLineTokens(e, d).tokens;
            return d.length && d[d.length - 1].type == "comment" ? b : (e.match(/^.*\{\s*$/) && (b = b + a), b)
        };
        this.checkOutdent = function (d, e, a) {
            return this.$outdent.checkOutdent(e, a)
        };
        this.autoOutdent = function (d, e, a) {
            this.$outdent.autoOutdent(e, a)
        };
        this.createWorker = function (d) {
            var e = new c(["ace"], "ace/mode/css_worker",
                "Worker");
            return e.attachToDocument(d.getDocument()), e.on("csslint", function (e) {
                var a = [];
                e.data.forEach(function (d) {
                    a.push({row: d.line - 1, column: d.col - 1, text: d.message, type: d.type, lint: d})
                });
                d.setAnnotations(a)
            }), e
        }
    }).call(e.prototype);
    l.Mode = e
});
define("ace/mode/css_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var j = b("../lib/oop"), k = b("../lib/lang"), f = b("./text_highlight_rules").TextHighlightRules, a = function () {
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
        ], b = k.copyArray(a);
        b.unshift({token: "paren.rparen", regex: "\\}", next: "start"});
        a = k.copyArray(a);
        a.unshift({token: "paren.rparen", regex: "\\}",
            next: "media"});
        var d = [
            {token: "comment", merge: true, regex: ".+"}
        ], e = k.copyArray(d);
        e.unshift({token: "comment", regex: ".*?\\*\\/", next: "start"});
        var h = k.copyArray(d);
        h.unshift({token: "comment", regex: ".*?\\*\\/", next: "media"});
        d = k.copyArray(d);
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
            media_comment: h}
    };
    j.inherits(a, f);
    l.CssHighlightRules = a
});
define("ace/mode/html_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/css_highlight_rules ace/mode/javascript_highlight_rules ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (b, l) {
    var j = b("../lib/oop"), k = b("../lib/lang"), f = b("./css_highlight_rules").CssHighlightRules, a = b("./javascript_highlight_rules").JavaScriptHighlightRules, g = b("./xml_util"), c = b("./text_highlight_rules").TextHighlightRules, d = k.createMap({a: "anchor", button: "form", form: "form", img: "image",
        input: "form", label: "form", script: "script", select: "form", textarea: "form", style: "style", table: "table", tbody: "table", td: "table", tfoot: "table", th: "table", tr: "table"}), k = function () {
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
        g.tag(this.$rules, "tag", "start", d);
        g.tag(this.$rules, "style", "css-start",
            d);
        g.tag(this.$rules, "script", "js-start", d);
        this.embedRules(a, "js-", [
            {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
            {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
        ]);
        this.embedRules(f, "css-", [
            {token: "meta.tag", regex: "<\\/(?=style)", next: "tag"}
        ])
    };
    j.inherits(k, c);
    l.HtmlHighlightRules = k
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (b, l) {
    function j(b, f) {
        return[
            {token: "string", merge: !0, regex: ".*?" + b, next: f},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    l.tag = function (b, f, a, g) {
        b[f] = [
            {token: "text", regex: "\\s+"},
            {token: g ? function (a) {
                return g[a] ? "meta.tag.tag-name." + g[a] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: f + "_embed_attribute_list"},
            {token: "empty", regex: "", next: f + "_embed_attribute_list"}
        ];
        b[f + "_qstring"] = j("'", f + "_embed_attribute_list");
        b[f + "_qqstring"] = j('"', f + "_embed_attribute_list");
        b[f + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: a},
            {token: "keyword.operator", regex: "="},
            {token: "entity.other.attribute-name", regex: "[-_a-zA-Z0-9:]+"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "text", regex: "\\s+"}
        ].concat([
                {token: "string", regex: '".*?"'},
                {token: "string", merge: !0, regex: '["].*', next: f + "_qqstring"},
                {token: "string", regex: "'.*?'"},
                {token: "string", merge: !0, regex: "['].*",
                    next: f + "_qstring"}
            ])
    }
});
define("ace/mode/behaviour/html", "require exports module ace/lib/oop ace/mode/behaviour/xml ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (b, l) {
    function j(d, a) {
        var h = true, b = d.type.split(".");
        return a.split(".").forEach(function (d) {
            if (b.indexOf(d) == -1)return h = false, false
        }), h
    }

    var k = b("../../lib/oop"), f = b("../behaviour/xml").XmlBehaviour;
    b("./cstyle");
    var a = b("../../token_iterator").TokenIterator, g = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta",
        "param", "source", "track", "wbr"], c = function () {
        this.inherit(f);
        this.add("autoclosing", "insertion", function (d, e, h, b, c) {
            if (c == ">") {
                d = h.getCursorPosition();
                h = new a(b, d.row, d.column);
                b = h.getCurrentToken();
                e = false;
                if (!b || !j(b, "meta.tag") && (!j(b, "text") || !b.value.match("/"))) {
                    do b = h.stepBackward(); while (b && (j(b, "string") || j(b, "keyword.operator") || j(b, "entity.attribute-name") || j(b, "text")))
                } else e = true;
                if (b && j(b, "meta.tag-name") && !h.stepBackward().value.match("/")) {
                    h = b.value;
                    e && (h = h.substring(0, d.column - b.start));
                    if (g.indexOf(h) === -1)return{text: "></" + h + ">", selection: [1, 1]}
                }
            }
        })
    };
    k.inherits(c, f);
    l.HtmlBehaviour = c
});
define("ace/mode/behaviour/xml", "require exports module ace/lib/oop ace/mode/behaviour ace/mode/behaviour/cstyle ace/token_iterator".split(" "), function (b, l) {
    function j(d, a) {
        var b = true, c = d.type.split(".");
        return a.split(".").forEach(function (d) {
            if (c.indexOf(d) == -1)return b = false, false
        }), b
    }

    var k = b("../../lib/oop"), f = b("../behaviour").Behaviour, a = b("./cstyle").CstyleBehaviour, g = b("../../token_iterator").TokenIterator, c = function () {
        this.inherit(a, ["string_dquotes"]);
        this.add("autoclosing", "insertion",
            function (d, a, b, c, f) {
                if (f == ">") {
                    d = b.getCursorPosition();
                    b = new g(c, d.row, d.column);
                    c = b.getCurrentToken();
                    a = false;
                    if (!c || !j(c, "meta.tag") && (!j(c, "text") || !c.value.match("/"))) {
                        do c = b.stepBackward(); while (c && (j(c, "string") || j(c, "keyword.operator") || j(c, "entity.attribute-name") || j(c, "text")))
                    } else a = true;
                    if (c && j(c, "meta.tag-name") && !b.stepBackward().value.match("/")) {
                        b = c.value;
                        a && (b = b.substring(0, d.column - c.start));
                        return{text: "></" + b + ">", selection: [1, 1]}
                    }
                }
            });
        this.add("autoindent", "insertion", function (d, a, b, c, g) {
            if (g == "\n") {
                a = b.getCursorPosition();
                if (c.doc.getLine(a.row).substring(a.column, a.column + 2) == "</") {
                    d = this.$getIndent(c.doc.getLine(a.row)) + c.getTabString();
                    c = this.$getIndent(c.doc.getLine(a.row));
                    return{text: "\n" + d + "\n" + c, selection: [1, d.length, 1, d.length]}
                }
            }
        })
    };
    k.inherits(c, f);
    l.XmlBehaviour = c
});
define("ace/mode/folding/html", "require exports module ace/lib/oop ace/mode/folding/mixed ace/mode/folding/xml ace/mode/folding/cstyle".split(" "), function (b, l) {
    var j = b("../../lib/oop"), k = b("./mixed").FoldMode, f = b("./xml").FoldMode, a = b("./cstyle").FoldMode, g = l.FoldMode = function () {
        k.call(this, new f({area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1, li: 1, dt: 1, dd: 1, p: 1, rt: 1, rp: 1, optgroup: 1, option: 1, colgroup: 1, td: 1, th: 1}), {"js-": new a,
            "css-": new a})
    };
    j.inherits(g, k)
});
define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (b, l) {
    var j = b("../../lib/oop"), k = b("./fold_mode").FoldMode, f = l.FoldMode = function (a, b) {
        this.defaultMode = a;
        this.subModes = b
    };
    j.inherits(f, k);
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
    }).call(f.prototype)
});
define("ace/mode/folding/xml", "require exports module ace/lib/oop ace/lib/lang ace/range ace/mode/folding/fold_mode ace/token_iterator".split(" "), function (b, l) {
    var j = b("../../lib/oop"), k = b("../../lib/lang"), f = b("../../range").Range, a = b("./fold_mode").FoldMode, g = b("../../token_iterator").TokenIterator, c = l.FoldMode = function (d) {
        a.call(this);
        this.voidElements = d || {}
    };
    j.inherits(c, a);
    (function () {
        this.getFoldWidget = function (d, a, b) {
            d = this._getFirstTagInLine(d, b);
            return d.closing ? a == "markbeginend" ? "end" :
                "" : !d.tagName || this.voidElements[d.tagName.toLowerCase()] ? "" : d.selfClosing ? "" : d.value.indexOf("/" + d.tagName) !== -1 ? "" : "start"
        };
        this._getFirstTagInLine = function (d, a) {
            for (var b = d.getTokens(a), c = "", f = 0; f < b.length; f++) {
                var g = b[f];
                g.type.indexOf("meta.tag") === 0 ? c = c + g.value : c = c + k.stringRepeat(" ", g.value.length)
            }
            return this._parseTag(c)
        };
        this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
        this._parseTag = function (d) {
            var a = this.tagRe.exec(d), b = this.tagRe.lastIndex || 0;
            return this.tagRe.lastIndex = 0, {value: d,
                match: a ? a[2] : "", closing: a ? !!a[3] : false, selfClosing: a ? !!a[5] || a[2] == "/>" : false, tagName: a ? a[4] : "", column: a[1] ? b + a[1].length : b}
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
            var i = this._getFirstTagInLine(a, c);
            if (!i.match)return null;
            b = [];
            if (!i.closing && !i.selfClosing) {
                a = new g(a, c, i.column);
                for (i = {row: c, column: i.column + i.tagName.length + 2}; c = this._readTagForward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, f.fromPoints(c.start,
                        c.end)
                } else if (c.closing) {
                    this._pop(b, c);
                    if (b.length == 0)return f.fromPoints(i, c.start)
                } else b.push(c)
            } else {
                a = new g(a, c, i.column + i.match.length);
                for (i = {row: c, column: i.column}; c = this._readTagBackward(a);)if (c.selfClosing) {
                    if (!b.length)return c.start.column = c.start.column + (c.tagName.length + 2), c.end.column = c.end.column - 2, f.fromPoints(c.start, c.end)
                } else if (c.closing)b.push(c); else {
                    this._pop(b, c);
                    if (b.length == 0)return c.start.column = c.start.column + (c.tagName.length + 2), f.fromPoints(c.start, i)
                }
            }
        }
    }).call(c.prototype)
});