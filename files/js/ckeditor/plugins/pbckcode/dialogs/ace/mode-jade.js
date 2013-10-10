﻿define("ace/mode/jade", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/jade_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("./text").Mode, c = a("../tokenizer").Tokenizer, e = a("./jade_highlight_rules").JadeHighlightRules, g = function () {
        var a = new e;
        this.$tokenizer = new c(a.getRules())
    };
    d.inherits(g, b);
    (function () {
    }).call(g.prototype);
    f.Mode = g
});
define("ace/mode/jade_highlight_rules", "require exports module ace/lib/oop ace/mode/text_highlight_rules ace/mode/markdown_highlight_rules ace/mode/scss_highlight_rules ace/mode/less_highlight_rules ace/mode/coffee_highlight_rules ace/mode/javascript_highlight_rules".split(" "), function (a, f) {
    function d(a, b) {
        return{token: "entity.name.function.jade", regex: "^\\s*\\:" + a, next: b + "start"}
    }

    var b = a("../lib/oop"), c = a("./text_highlight_rules").TextHighlightRules;
    a("./markdown_highlight_rules");
    a("./scss_highlight_rules");
    a("./less_highlight_rules");
    a("./coffee_highlight_rules");
    a("./javascript_highlight_rules");
    var e = function () {
        this.$rules = {start: [
            {token: "keyword.control.import.include.jade", regex: "\\s*\\binclude\\b"},
            {token: "keyword.other.doctype.jade", regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"},
            {token: "punctuation.section.comment", regex: "^\\s*//(?:\\s*[^-\\s]|\\s+\\S)(?:.*$)"},
            {token: function () {
                return"punctuation.section.comment"
            }, regex: "^((\\s*)//)(?:\\s*$)", next: "comment_block"},
            d("markdown", "markdown-"),
            d("sass", "sass-"),
            d("less", "less-"),
            d("coffee", "coffee-"),
            {token: ["storage.type.function.jade", "entity.name.function.jade", "punctuation.definition.parameters.begin.jade", "variable.parameter.function.jade", "punctuation.definition.parameters.end.jade"], regex: "^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"},
            {token: ["storage.type.function.jade", "entity.name.function.jade"], regex: "^(\\s*mixin)( [\\w\\-]+)"},
            {token: "string.interpolated.jade", regex: "[#!]\\{[^\\}]+\\}"},
            {token: ["meta.tag.any.jade", "entity.variable.tag.jade"],
                regex: /^\s*(?!\w+\:)(?:[\w]+|(?=\.|#)])/, next: "tag_single"},
            {token: "suport.type.attribute.id.jade", regex: "#\\w+"},
            {token: "suport.type.attribute.class.jade", regex: "\\.\\w+"},
            {token: "punctuation", regex: "\\s*(?:\\()", next: "tag_attributes"}
        ], comment_block: [
            {token: function () {
                return"text"
            }, regex: "^(\\1\\S|$)", captures: "1", next: "start"},
            {token: "comment.block.jade", merge: true, regex: ".+"}
        ], tag_single: [
            {token: "suport.type.attribute.class.jade", regex: "\\.[\\w-]+"},
            {token: "suport.type.attribute.id.jade", regex: "#[\\w-]+"},
            {token: ["text", "punctuation"], regex: "($)|((?!\\.|#|=|-))", next: "start"}
        ], tag_attributes: [
            {token: ["entity.other.attribute-name.jade", "punctuation"], regex: "\\b([a-zA-Z:\\.-]+)(=)", next: "attribute_strings"},
            {token: "punctuation", regex: "\\)", next: "start"}
        ], attribute_strings: [
            {token: "string", regex: "'(?=.)", next: "qstring"},
            {token: "string", regex: '"(?=.)', next: "qqstring"}
        ], qqstring: [
            {token: "constant.language.escape", regex: "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)"},
            {token: "string", regex: '[^"\\\\]+', merge: true},
            {token: "string", regex: "\\\\$", next: "qqstring", merge: true},
            {token: "string", regex: '"|$', next: "tag_attributes", merge: true}
        ], qstring: [
            {token: "constant.language.escape", regex: "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)"},
            {token: "string", regex: "[^'\\\\]+", merge: true},
            {token: "string", regex: "\\\\$", next: "qstring", merge: true},
            {token: "string", regex: "'|$", next: "tag_attributes", merge: true}
        ]}
    };
    b.inherits(e, c);
    f.JadeHighlightRules =
        e
});
define("ace/mode/markdown_highlight_rules", "require exports module ace/lib/oop ace/mode/text_highlight_rules ace/mode/javascript_highlight_rules ace/mode/xml_highlight_rules ace/mode/html_highlight_rules ace/mode/css_highlight_rules".split(" "), function (a, f) {
    function d(a, b) {
        return{token: "support.function", regex: "^```" + a + "\\s*$", next: b + "start"}
    }

    var b = a("../lib/oop"), c = a("./text_highlight_rules").TextHighlightRules, e = a("./javascript_highlight_rules").JavaScriptHighlightRules, g = a("./xml_highlight_rules").XmlHighlightRules, i =
        a("./html_highlight_rules").HtmlHighlightRules, h = a("./css_highlight_rules").CssHighlightRules, k = function () {
        this.$rules = {start: [
            {token: "empty_line", regex: "^$"},
            {token: ["support.function", "support.function", "support.function"], regex: "(`+)([^\\r]*?[^`])(\\1)"},
            {token: "support.function", regex: "^[ ]{4}.+"},
            {token: "markup.heading.1", regex: "^=+(?=\\s*$)"},
            {token: "markup.heading.2", regex: "^\\-+(?=\\s*$)"},
            {token: function (a) {
                return"markup.heading." + a.search(/[^#]/)
            }, regex: "^#{1,6}(?:[^ #].*| +.*(?:[^ #].*|[^ ]+.* +#+ *))$"},
            d("(?:javascript|js)", "js-"),
            d("xml", "xml-"),
            d("html", "html-"),
            d("css", "css-"),
            {token: "support.function", regex: "^```[a-zA-Z]+\\s*$", next: "githubblock"},
            {token: "string", regex: "^>[ ].+$", next: "blockquote"},
            {token: ["text", "constant", "text", "url", "string", "text"], regex: '^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:["][^"]+["])?(\\s*))$'},
            {token: ["text", "string", "text", "constant", "text"], regex: "(\\[)((?:[[^\\]]*\\]|[^\\[\\]])*)(\\][ ]?(?:\\n[ ]*)?\\[)(.*?)(\\])"},
            {token: ["text", "string", "text", "markup.underline",
                "string", "text"], regex: '(\\[)(\\[[^\\]]*\\]|[^\\[\\]]*)(\\]\\([ \\t]*)(<?(?:(?:[^\\(]*?\\([^\\)]*?\\)\\S*?)|(?:.*?))>?)((?:[ \t]*"(?:.*?)"[ \\t]*)?)(\\))'},
            {token: "constant", regex: "^[ ]{0,2}(?:[ ]?\\*[ ]?){3,}\\s*$"},
            {token: "constant", regex: "^[ ]{0,2}(?:[ ]?\\-[ ]?){3,}\\s*$"},
            {token: "constant", regex: "^[ ]{0,2}(?:[ ]?\\_[ ]?){3,}\\s*$"},
            {token: "markup.list", regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+", next: "listblock"},
            {token: ["string", "string", "string"], regex: "([*]{2}|[_]{2}(?=\\S))([^\\r]*?\\S[*_]*)(\\1)"},
            {token: ["string", "string", "string"], regex: "([*]|[_](?=\\S))([^\\r]*?\\S[*_]*)(\\1)"},
            {token: ["text", "url", "text"], regex: "(<)((?:https?|ftp|dict):[^'\">\\s]+|(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+)(>)"},
            {token: "text", regex: "[^\\*_%$`\\[#<>]+"}
        ], listblock: [
            {token: "empty_line", regex: "^$", next: "start"},
            {token: "markup.list", regex: ".+"}
        ], blockquote: [
            {token: "empty_line", regex: "^\\s*$", next: "start"},
            {token: "string", regex: ".+"}
        ], githubblock: [
            {token: "support.function", regex: "^```", next: "start"},
            {token: "support.function", regex: ".+"}
        ]};
        this.embedRules(e, "js-", [
            {token: "support.function", regex: "^```", next: "start"}
        ]);
        this.embedRules(i, "html-", [
            {token: "support.function", regex: "^```", next: "start"}
        ]);
        this.embedRules(h, "css-", [
            {token: "support.function", regex: "^```", next: "start"}
        ]);
        this.embedRules(g, "xml-", [
            {token: "support.function", regex: "^```", next: "start"}
        ])
    };
    b.inherits(k, c);
    f.MarkdownHighlightRules = k
});
define("ace/mode/javascript_highlight_rules", "require exports module ace/lib/oop ace/unicode ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop");
    a("../unicode");
    var b = a("./doc_comment_highlight_rules").DocCommentHighlightRules, c = a("./text_highlight_rules").TextHighlightRules, e = function () {
        var a = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",
            "invalid.deprecated": "__parent__|__count__|escape|unescape|with|__proto__|debugger", keyword: "const|yield|import|get|setbreak|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|", "storage.type": "const|let|var|function", "invalid.illegal": "class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "constant.language": "null|Infinity|NaN|undefined"}, "identifier");
        this.$rules = {start: [
            {token: "comment",
                regex: /\/\/.*$/},
            b.getStartRule("doc-start"),
            {token: "comment", merge: true, regex: /\/\*/, next: "comment"},
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
        ], regex_allowed: [b.getStartRule("doc-start"), {token: "comment", merge: true, regex: "\\/\\*", next: "comment_regex_allowed"}, {token: "comment", regex: "\\/\\/.*$"}, {token: "string.regexp", regex: "\\/", next: "regex", merge: true}, {token: "text", regex: "\\s+"}, {token: "empty", regex: "", next: "start"}], regex: [
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
        this.embedRules(b, "doc-", [b.getEndRule("start")])
    };
    d.inherits(e, c);
    f.JavaScriptHighlightRules = e
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, f) {
    var d = a("../lib/oop"), b = a("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    d.inherits(c, b);
    c.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    c.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    f.DocCommentHighlightRules = c
});
define("ace/mode/xml_highlight_rules", "require exports module ace/lib/oop ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("./xml_util"), c = a("./text_highlight_rules").TextHighlightRules, e = function () {
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
        b.tag(this.$rules, "tag", "start")
    };
    d.inherits(e, c);
    f.XmlHighlightRules = e
});
define("ace/mode/xml_util", ["require", "exports", "module"], function (a, f) {
    function d(a, c) {
        return[
            {token: "string", merge: !0, regex: ".*?" + a, next: c},
            {token: "string", merge: !0, regex: ".+"}
        ]
    }

    f.tag = function (a, c, e, f) {
        a[c] = [
            {token: "text", regex: "\\s+"},
            {token: f ? function (a) {
                return f[a] ? "meta.tag.tag-name." + f[a] : "meta.tag.tag-name"
            } : "meta.tag.tag-name", merge: !0, regex: "[-_a-zA-Z0-9:]+", next: c + "_embed_attribute_list"},
            {token: "empty", regex: "", next: c + "_embed_attribute_list"}
        ];
        a[c + "_qstring"] = d("'", c + "_embed_attribute_list");
        a[c + "_qqstring"] = d('"', c + "_embed_attribute_list");
        a[c + "_embed_attribute_list"] = [
            {token: "meta.tag", merge: !0, regex: "/?>", next: e},
            {token: "keyword.operator", regex: "="},
            {token: "entity.other.attribute-name", regex: "[-_a-zA-Z0-9:]+"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "text", regex: "\\s+"}
        ].concat([
                {token: "string", regex: '".*?"'},
                {token: "string", merge: !0, regex: '["].*', next: c + "_qqstring"},
                {token: "string", regex: "'.*?'"},
                {token: "string", merge: !0, regex: "['].*",
                    next: c + "_qstring"}
            ])
    }
});
define("ace/mode/html_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/css_highlight_rules ace/mode/javascript_highlight_rules ace/mode/xml_util ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("../lib/lang"), c = a("./css_highlight_rules").CssHighlightRules, e = a("./javascript_highlight_rules").JavaScriptHighlightRules, g = a("./xml_util"), i = a("./text_highlight_rules").TextHighlightRules, h = b.createMap({a: "anchor", button: "form", form: "form", img: "image",
        input: "form", label: "form", script: "script", select: "form", textarea: "form", style: "style", table: "table", tbody: "table", td: "table", tfoot: "table", th: "table", tr: "table"}), b = function () {
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
        g.tag(this.$rules, "tag", "start", h);
        g.tag(this.$rules, "style", "css-start",
            h);
        g.tag(this.$rules, "script", "js-start", h);
        this.embedRules(e, "js-", [
            {token: "comment", regex: "\\/\\/.*(?=<\\/script>)", next: "tag"},
            {token: "meta.tag", regex: "<\\/(?=script)", next: "tag"}
        ]);
        this.embedRules(c, "css-", [
            {token: "meta.tag", regex: "<\\/(?=style)", next: "tag"}
        ])
    };
    d.inherits(b, i);
    f.HtmlHighlightRules = b
});
define("ace/mode/css_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("../lib/lang"), c = a("./text_highlight_rules").TextHighlightRules, e = function () {
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
        ], c = b.copyArray(a);
        c.unshift({token: "paren.rparen", regex: "\\}", next: "start"});
        a = b.copyArray(a);
        a.unshift({token: "paren.rparen", regex: "\\}",
            next: "media"});
        var d = [
            {token: "comment", merge: true, regex: ".+"}
        ], e = b.copyArray(d);
        e.unshift({token: "comment", regex: ".*?\\*\\/", next: "start"});
        var f = b.copyArray(d);
        f.unshift({token: "comment", regex: ".*?\\*\\/", next: "media"});
        d = b.copyArray(d);
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
        ], comment: e, ruleset: c, ruleset_comment: d, media_ruleset: a,
            media_comment: f}
    };
    d.inherits(e, c);
    f.CssHighlightRules = e
});
define("ace/mode/scss_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("../lib/lang"), c = a("./text_highlight_rules").TextHighlightRules, e = function () {
        var a = b.arrayToMap(function () {
            for (var a = ["-webkit-", "-moz-", "-o-", "-ms-", "-svg-", "-pie-", "-khtml-"], b = ["appearance", "background-clip", "background-inline-policy", "background-origin", "background-size", "binding", "border-bottom-colors", "border-left-colors", "border-right-colors",
                "border-top-colors", "border-end", "border-end-color", "border-end-style", "border-end-width", "border-image", "border-start", "border-start-color", "border-start-style", "border-start-width", "box-align", "box-direction", "box-flex", "box-flexgroup", "box-ordinal-group", "box-orient", "box-pack", "box-sizing", "column-count", "column-gap", "column-width", "column-rule", "column-rule-width", "column-rule-style", "column-rule-color", "float-edge", "font-feature-settings", "font-language-override", "force-broken-image-icon", "image-region",
                "margin-end", "margin-start", "opacity", "outline", "outline-color", "outline-offset", "outline-radius", "outline-radius-bottomleft", "outline-radius-bottomright", "outline-radius-topleft", "outline-radius-topright", "outline-style", "outline-width", "padding-end", "padding-start", "stack-sizing", "tab-size", "text-blink", "text-decoration-color", "text-decoration-line", "text-decoration-style", "transform", "transform-origin", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function",
                "user-focus", "user-input", "user-modify", "user-select", "window-shadow", "border-radius"], c = [], d = 0, e = a.length; d < e; d++)Array.prototype.push.apply(c, (a[d] + b.join("|" + a[d])).split("|"));
            return Array.prototype.push.apply(c, b), Array.prototype.push.apply(c, ["azimuth", "background-attachment", "background-color", "background-image", "background-position", "background-repeat", "background", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-bottom", "border-collapse", "border-color", "border-left-color",
                "border-left-style", "border-left-width", "border-left", "border-right-color", "border-right-style", "border-right-width", "border-right", "border-spacing", "border-style", "border-top-color", "border-top-style", "border-top-width", "border-top", "border-width", "border", "bottom", "box-sizing", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cue-after", "cue-before", "cue", "cursor", "direction", "display", "elevation", "empty-cells", "float", "font-family", "font-size-adjust", "font-size",
                "font-stretch", "font-style", "font-variant", "font-weight", "font", "height", "left", "letter-spacing", "line-height", "list-style-image", "list-style-position", "list-style-type", "list-style", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "margin", "marks", "max-height", "max-width", "min-height", "min-width", "opacity", "orphans", "outline-color", "outline-style", "outline-width", "outline", "overflow", "overflow-x", "overflow-y", "padding-bottom", "padding-left", "padding-right", "padding-top",
                "padding", "page-break-after", "page-break-before", "page-break-inside", "page", "pause-after", "pause-before", "pause", "pitch-range", "pitch", "play-during", "position", "quotes", "richness", "right", "size", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "speak", "stress", "table-layout", "text-align", "text-decoration", "text-indent", "text-shadow", "text-transform", "top", "unicode-bidi", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "word-spacing", "z-index"]),
                c
        }()), c = b.arrayToMap(["hsl", "hsla", "rgb", "rgba", "url", "attr", "counter", "counters", "abs", "adjust_color", "adjust_hue", "alpha", "join", "blue", "ceil", "change_color", "comparable", "complement", "darken", "desaturate", "floor", "grayscale", "green", "hue", "if", "invert", "join", "length", "lighten", "lightness", "mix", "nth", "opacify", "opacity", "percentage", "quote", "red", "round", "saturate", "saturation", "scale_color", "transparentize", "type_of", "unit", "unitless", "unqoute"]), d = b.arrayToMap(["absolute", "all-scroll", "always",
            "armenian", "auto", "baseline", "below", "bidi-override", "block", "bold", "bolder", "border-box", "both", "bottom", "break-all", "break-word", "capitalize", "center", "char", "circle", "cjk-ideographic", "col-resize", "collapse", "content-box", "crosshair", "dashed", "decimal-leading-zero", "decimal", "default", "disabled", "disc", "distribute-all-lines", "distribute-letter", "distribute-space", "distribute", "dotted", "double", "e-resize", "ellipsis", "fixed", "georgian", "groove", "hand", "hebrew", "help", "hidden", "hiragana-iroha", "hiragana",
            "horizontal", "ideograph-alpha", "ideograph-numeric", "ideograph-parenthesis", "ideograph-space", "inactive", "inherit", "inline-block", "inline", "inset", "inside", "inter-ideograph", "inter-word", "italic", "justify", "katakana-iroha", "katakana", "keep-all", "left", "lighter", "line-edge", "line-through", "line", "list-item", "loose", "lower-alpha", "lower-greek", "lower-latin", "lower-roman", "lowercase", "lr-tb", "ltr", "medium", "middle", "move", "n-resize", "ne-resize", "newspaper", "no-drop", "no-repeat", "nw-resize", "none", "normal",
            "not-allowed", "nowrap", "oblique", "outset", "outside", "overline", "pointer", "progress", "relative", "repeat-x", "repeat-y", "repeat", "right", "ridge", "row-resize", "rtl", "s-resize", "scroll", "se-resize", "separate", "small-caps", "solid", "square", "static", "strict", "super", "sw-resize", "table-footer-group", "table-header-group", "tb-rl", "text-bottom", "text-top", "text", "thick", "thin", "top", "transparent", "underline", "upper-alpha", "upper-latin", "upper-roman", "uppercase", "vertical-ideographic", "vertical-text", "visible",
            "w-resize", "wait", "whitespace", "zero"]), e = b.arrayToMap(["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "orange", "purple", "red", "silver", "teal", "white", "yellow"]), f = b.arrayToMap(["@mixin", "@extend", "@include", "@import", "@media", "@debug", "@warn", "@if", "@for", "@each", "@while", "@else", "@font-face", "@-webkit-keyframes", "if", "and", "!default", "module", "def", "end", "declare"]), j = b.arrayToMap(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base",
            "basefont", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "datalist", "dd", "del", "details", "dfn", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "keygen", "kbd", "label", "legend", "li", "link", "map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup",
            "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "tt", "u", "ul", "var", "video", "wbr", "xmp"]);
        this.$rules = {start: [
            {token: "comment", regex: "\\/\\/.*$"},
            {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", merge: true, regex: '["].*\\\\$',
                next: "qqstring"},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "string", merge: true, regex: "['].*\\\\$", next: "qstring"},
            {token: "constant.numeric", regex: "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"},
            {token: "constant.numeric", regex: "#[a-f0-9]{6}"},
            {token: "constant.numeric", regex: "#[a-f0-9]{3}"},
            {token: "constant.numeric", regex: "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))"},
            {token: function (b) {
                return a.hasOwnProperty(b.toLowerCase()) ? "support.type" :
                    f.hasOwnProperty(b) ? "keyword" : d.hasOwnProperty(b) ? "constant.language" : c.hasOwnProperty(b) ? "support.function" : e.hasOwnProperty(b.toLowerCase()) ? "support.constant.color" : j.hasOwnProperty(b.toLowerCase()) ? "variable.language" : "text"
            }, regex: "\\-?[@a-z_][@a-z0-9_\\-]*"},
            {token: "variable", regex: "[a-z_\\-$][a-z0-9_\\-$]*\\b"},
            {token: "variable.language", regex: "#[a-z0-9-_]+"},
            {token: "variable.language", regex: "\\.[a-z0-9-_]+"},
            {token: "variable.language", regex: ":[a-z0-9-_]+"},
            {token: "constant", regex: "[a-z0-9-_]+"},
            {token: "keyword.operator", regex: "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ], qqstring: [
            {token: "string", regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"', next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'", next: "start"},
            {token: "string", merge: true, regex: ".+"}
        ]}
    };
    d.inherits(e, c);
    f.ScssHighlightRules = e
});
define("ace/mode/less_highlight_rules", "require exports module ace/lib/oop ace/lib/lang ace/mode/text_highlight_rules".split(" "), function (a, f) {
    var d = a("../lib/oop"), b = a("../lib/lang"), c = a("./text_highlight_rules").TextHighlightRules, e = function () {
        var a = b.arrayToMap(function () {
            for (var a = ["-webkit-", "-moz-", "-o-", "-ms-", "-svg-", "-pie-", "-khtml-"], b = ["appearance", "background-clip", "background-inline-policy", "background-origin", "background-size", "binding", "border-bottom-colors", "border-left-colors", "border-right-colors",
                "border-top-colors", "border-end", "border-end-color", "border-end-style", "border-end-width", "border-image", "border-start", "border-start-color", "border-start-style", "border-start-width", "box-align", "box-direction", "box-flex", "box-flexgroup", "box-ordinal-group", "box-orient", "box-pack", "box-sizing", "column-count", "column-gap", "column-width", "column-rule", "column-rule-width", "column-rule-style", "column-rule-color", "float-edge", "font-feature-settings", "font-language-override", "force-broken-image-icon", "image-region",
                "margin-end", "margin-start", "opacity", "outline", "outline-color", "outline-offset", "outline-radius", "outline-radius-bottomleft", "outline-radius-bottomright", "outline-radius-topleft", "outline-radius-topright", "outline-style", "outline-width", "padding-end", "padding-start", "stack-sizing", "tab-size", "text-blink", "text-decoration-color", "text-decoration-line", "text-decoration-style", "transform", "transform-origin", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function",
                "user-focus", "user-input", "user-modify", "user-select", "window-shadow", "border-radius"], c = [], d = 0, e = a.length; d < e; d++)Array.prototype.push.apply(c, (a[d] + b.join("|" + a[d])).split("|"));
            return Array.prototype.push.apply(c, b), Array.prototype.push.apply(c, ["azimuth", "background-attachment", "background-color", "background-image", "background-position", "background-repeat", "background", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-bottom", "border-collapse", "border-color", "border-left-color",
                "border-left-style", "border-left-width", "border-left", "border-right-color", "border-right-style", "border-right-width", "border-right", "border-spacing", "border-style", "border-top-color", "border-top-style", "border-top-width", "border-top", "border-width", "border", "bottom", "box-sizing", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cue-after", "cue-before", "cue", "cursor", "direction", "display", "elevation", "empty-cells", "float", "font-family", "font-size-adjust", "font-size",
                "font-stretch", "font-style", "font-variant", "font-weight", "font", "height", "left", "letter-spacing", "line-height", "list-style-image", "list-style-position", "list-style-type", "list-style", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "margin", "marks", "max-height", "max-width", "min-height", "min-width", "opacity", "orphans", "outline-color", "outline-style", "outline-width", "outline", "overflow", "overflow-x", "overflow-y", "padding-bottom", "padding-left", "padding-right", "padding-top",
                "padding", "page-break-after", "page-break-before", "page-break-inside", "page", "pause-after", "pause-before", "pause", "pitch-range", "pitch", "play-during", "position", "quotes", "richness", "right", "size", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "speak", "stress", "table-layout", "text-align", "text-decoration", "text-indent", "text-shadow", "text-transform", "top", "unicode-bidi", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "word-spacing", "z-index"]),
                c
        }()), c = b.arrayToMap(["hsl", "hsla", "rgb", "rgba", "url", "attr", "counter", "counters", "lighten", "darken", "saturate", "desaturate", "fadein", "fadeout", "fade", "spin", "mix", "hue", "saturation", "lightness", "alpha", "round", "ceil", "floor", "percentage", "color", "iscolor", "isnumber", "isstring", "iskeyword", "isurl", "ispixel", "ispercentage", "isem"]), d = b.arrayToMap(["absolute", "all-scroll", "always", "armenian", "auto", "baseline", "below", "bidi-override", "block", "bold", "bolder", "border-box", "both", "bottom", "break-all", "break-word",
            "capitalize", "center", "char", "circle", "cjk-ideographic", "col-resize", "collapse", "content-box", "crosshair", "dashed", "decimal-leading-zero", "decimal", "default", "disabled", "disc", "distribute-all-lines", "distribute-letter", "distribute-space", "distribute", "dotted", "double", "e-resize", "ellipsis", "fixed", "georgian", "groove", "hand", "hebrew", "help", "hidden", "hiragana-iroha", "hiragana", "horizontal", "ideograph-alpha", "ideograph-numeric", "ideograph-parenthesis", "ideograph-space", "inactive", "inherit", "inline-block",
            "inline", "inset", "inside", "inter-ideograph", "inter-word", "italic", "justify", "katakana-iroha", "katakana", "keep-all", "left", "lighter", "line-edge", "line-through", "line", "list-item", "loose", "lower-alpha", "lower-greek", "lower-latin", "lower-roman", "lowercase", "lr-tb", "ltr", "medium", "middle", "move", "n-resize", "ne-resize", "newspaper", "no-drop", "no-repeat", "nw-resize", "none", "normal", "not-allowed", "nowrap", "oblique", "outset", "outside", "overline", "pointer", "progress", "relative", "repeat-x", "repeat-y", "repeat",
            "right", "ridge", "row-resize", "rtl", "s-resize", "scroll", "se-resize", "separate", "small-caps", "solid", "square", "static", "strict", "super", "sw-resize", "table-footer-group", "table-header-group", "tb-rl", "text-bottom", "text-top", "text", "thick", "thin", "top", "transparent", "underline", "upper-alpha", "upper-latin", "upper-roman", "uppercase", "vertical-ideographic", "vertical-text", "visible", "w-resize", "wait", "whitespace", "zero"]), e = b.arrayToMap(["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy",
            "olive", "orange", "purple", "red", "silver", "teal", "white", "yellow"]), f = b.arrayToMap(["@mixin", "@extend", "@include", "@import", "@media", "@debug", "@warn", "@if", "@for", "@each", "@while", "@else", "@font-face", "@-webkit-keyframes", "if", "and", "!default", "module", "def", "end", "declare", "when", "not", "and"]), j = b.arrayToMap(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup",
            "command", "datalist", "dd", "del", "details", "dfn", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "keygen", "kbd", "label", "legend", "li", "link", "map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small",
            "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "tt", "u", "ul", "var", "video", "wbr", "xmp"]);
        this.$rules = {start: [
            {token: "comment", regex: "\\/\\/.*$"},
            {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "constant.numeric", regex: "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"},
            {token: "constant.numeric", regex: "#[a-f0-9]{6}"},
            {token: "constant.numeric", regex: "#[a-f0-9]{3}"},
            {token: "constant.numeric", regex: "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))"},
            {token: function (a) {
                return f.hasOwnProperty(a) ? "keyword" : "variable"
            }, regex: "@[a-z0-9_\\-@]*\\b"},
            {token: function (b) {
                return a.hasOwnProperty(b.toLowerCase()) ? "support.type" : f.hasOwnProperty(b) ? "keyword" : d.hasOwnProperty(b) ? "constant.language" : c.hasOwnProperty(b) ? "support.function" : e.hasOwnProperty(b.toLowerCase()) ? "support.constant.color" :
                    j.hasOwnProperty(b.toLowerCase()) ? "variable.language" : "text"
            }, regex: "\\-?[@a-z_][@a-z0-9_\\-]*"},
            {token: "variable.language", regex: "#[a-z0-9-_]+"},
            {token: "variable.language", regex: "\\.[a-z0-9-_]+"},
            {token: "variable.language", regex: ":[a-z0-9-_]+"},
            {token: "constant", regex: "[a-z0-9-_]+"},
            {token: "keyword.operator", regex: "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/",
                next: "start"},
            {token: "comment", merge: true, regex: ".+"}
        ]}
    };
    d.inherits(e, c);
    f.LessHighlightRules = e
});
define("ace/mode/coffee_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, f) {
    function d() {
        var a = {token: "string", merge: !0, regex: ".+"};
        this.$rules = {start: [
            {token: "identifier", regex: "(?:(?:\\.|::)\\s*)[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*"},
            {token: "variable", regex: "@(?:[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*)?"},
            {token: this.createKeywordMapper({keyword: "this|throw|then|try|typeof|super|switch|return|break|by)|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes", "constant.language": "true|false|null|undefined",
                "invalid.illegal": "case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|extends|slice|bind|indexOf", "language.support.class": "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|RangeError|SyntaxError|Error|EvalError|TypeError|URIError", "language.support.function": "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|String|"}, "identifier"), regex: "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*"},
            {token: "constant.numeric", regex: "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},
            {token: "string", merge: !0, regex: "'''", next: "qdoc"},
            {token: "string", merge: !0, regex: '"""', next: "qqdoc"},
            {token: "string", merge: !0, regex: "'", next: "qstring"},
            {token: "string", merge: !0, regex: '"', next: "qqstring"},
            {token: "string", merge: !0, regex: "`", next: "js"},
            {token: "string.regex", merge: !0, regex: "///", next: "heregex"},
            {token: "string.regex", regex: "/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"},
            {token: "comment", merge: !0, regex: "###(?!#)", next: "comment"},
            {token: "comment", regex: "#.*"},
            {token: "punctuation.operator", regex: "\\?|\\:|\\,|\\."},
            {token: "keyword.operator", regex: "(?:[\\-=]>|[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},
            {token: "paren.lparen", regex: "[({[]"},
            {token: "paren.rparen", regex: "[\\]})]"},
            {token: "text", regex: "\\s+"}
        ], qdoc: [
            {token: "string", regex: ".*?'''", next: "start"},
            a
        ], qqdoc: [
            {token: "string", regex: '.*?"""', next: "start"},
            a
        ], qstring: [
            {token: "string",
                regex: "[^\\\\']*(?:\\\\.[^\\\\']*)*'", merge: !0, next: "start"},
            a
        ], qqstring: [
            {token: "string", regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"', merge: !0, next: "start"},
            a
        ], js: [
            {token: "string", merge: !0, regex: "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`", next: "start"},
            a
        ], heregex: [
            {token: "string.regex", regex: ".*?///[imgy]{0,4}", next: "start"},
            {token: "comment.regex", regex: "\\s+(?:#.*)?"},
            {token: "string.regex", merge: !0, regex: "\\S+"}
        ], comment: [
            {token: "comment", regex: ".*?###", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ]}
    }

    var b =
        a("../lib/oop"), c = a("./text_highlight_rules").TextHighlightRules;
    b.inherits(d, c);
    f.CoffeeHighlightRules = d
});