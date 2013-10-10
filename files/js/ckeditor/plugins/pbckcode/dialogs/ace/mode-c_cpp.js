﻿define("ace/mode/c_cpp", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/c_cpp_highlight_rules ace/mode/matching_brace_outdent ace/range ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (h, i) {
    var j = h("../lib/oop"), f = h("./text").Mode, d = h("../tokenizer").Tokenizer, a = h("./c_cpp_highlight_rules").c_cppHighlightRules, g = h("./matching_brace_outdent").MatchingBraceOutdent, e = h("../range").Range, c = h("./behaviour/cstyle").CstyleBehaviour, b = h("./folding/cstyle").FoldMode,
        k = function () {
            this.$tokenizer = new d((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new c;
            this.foldingRules = new b
        };
    j.inherits(k, f);
    (function () {
        this.toggleCommentLines = function (a, b, c, g) {
            for (var d = true, a = /^(\s*)\/\//, f = c; f <= g; f++)if (!a.test(b.getLine(f))) {
                d = false;
                break
            }
            if (d) {
                d = new e(0, 0, 0, 0);
                for (f = c; f <= g; f++) {
                    c = b.getLine(f).match(a);
                    d.start.row = f;
                    d.end.row = f;
                    d.end.column = c[0].length;
                    b.replace(d, c[1])
                }
            } else b.indentRows(c, g, "//")
        };
        this.getNextLineIndent = function (a, c, e) {
            var b = this.$getIndent(c),
                g = this.$tokenizer.getLineTokens(c, a), d = g.tokens, g = g.state;
            if (d.length && d[d.length - 1].type == "comment")return b;
            if (a == "start")(a = c.match(/^.*[\{\(\[]\s*$/)) && (b = b + e); else if (a == "doc-start") {
                if (g == "start")return"";
                (a = c.match(/^\s*(\/?)\*/)) && (a[1] && (b = b + " "), b = b + "* ")
            }
            return b
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        }
    }).call(k.prototype);
    i.Mode = k
});
define("ace/mode/c_cpp_highlight_rules", "require exports module ace/lib/oop ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (h, i) {
    var j = h("../lib/oop"), f = h("./doc_comment_highlight_rules").DocCommentHighlightRules, d = h("./text_highlight_rules").TextHighlightRules, a = i.cFunctions = "\\s*\\bhypot(?:f|l)?|s(?:scanf|ystem|nprintf|ca(?:nf|lb(?:n(?:f|l)?|ln(?:f|l)?))|i(?:n(?:h(?:f|l)?|f|l)?|gn(?:al|bit))|tr(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?)|error|pbrk|ftime|len|rchr|xfrm)|printf|et(?:jmp|vbuf|locale|buf)|qrt(?:f|l)?|w(?:scanf|printf)|rand)|n(?:e(?:arbyint(?:f|l)?|xt(?:toward(?:f|l)?|after(?:f|l)?))|an(?:f|l)?)|c(?:s(?:in(?:h(?:f|l)?|f|l)?|qrt(?:f|l)?)|cos(?:h(?:f)?|f|l)?|imag(?:f|l)?|t(?:ime|an(?:h(?:f|l)?|f|l)?)|o(?:s(?:h(?:f|l)?|f|l)?|nj(?:f|l)?|pysign(?:f|l)?)|p(?:ow(?:f|l)?|roj(?:f|l)?)|e(?:il(?:f|l)?|xp(?:f|l)?)|l(?:o(?:ck|g(?:f|l)?)|earerr)|a(?:sin(?:h(?:f|l)?|f|l)?|cos(?:h(?:f|l)?|f|l)?|tan(?:h(?:f|l)?|f|l)?|lloc|rg(?:f|l)?|bs(?:f|l)?)|real(?:f|l)?|brt(?:f|l)?)|t(?:ime|o(?:upper|lower)|an(?:h(?:f|l)?|f|l)?|runc(?:f|l)?|gamma(?:f|l)?|mp(?:nam|file))|i(?:s(?:space|n(?:ormal|an)|cntrl|inf|digit|u(?:nordered|pper)|p(?:unct|rint)|finite|w(?:space|c(?:ntrl|type)|digit|upper|p(?:unct|rint)|lower|al(?:num|pha)|graph|xdigit|blank)|l(?:ower|ess(?:equal|greater)?)|al(?:num|pha)|gr(?:eater(?:equal)?|aph)|xdigit|blank)|logb(?:f|l)?|max(?:div|abs))|di(?:v|fftime)|_Exit|unget(?:c|wc)|p(?:ow(?:f|l)?|ut(?:s|c(?:har)?|wc(?:har)?)|error|rintf)|e(?:rf(?:c(?:f|l)?|f|l)?|x(?:it|p(?:2(?:f|l)?|f|l|m1(?:f|l)?)?))|v(?:s(?:scanf|nprintf|canf|printf|w(?:scanf|printf))|printf|f(?:scanf|printf|w(?:scanf|printf))|w(?:scanf|printf)|a_(?:start|copy|end|arg))|qsort|f(?:s(?:canf|e(?:tpos|ek))|close|tell|open|dim(?:f|l)?|p(?:classify|ut(?:s|c|w(?:s|c))|rintf)|e(?:holdexcept|set(?:e(?:nv|xceptflag)|round)|clearexcept|testexcept|of|updateenv|r(?:aiseexcept|ror)|get(?:e(?:nv|xceptflag)|round))|flush|w(?:scanf|ide|printf|rite)|loor(?:f|l)?|abs(?:f|l)?|get(?:s|c|pos|w(?:s|c))|re(?:open|e|ad|xp(?:f|l)?)|m(?:in(?:f|l)?|od(?:f|l)?|a(?:f|l|x(?:f|l)?)?))|l(?:d(?:iv|exp(?:f|l)?)|o(?:ngjmp|cal(?:time|econv)|g(?:1(?:p(?:f|l)?|0(?:f|l)?)|2(?:f|l)?|f|l|b(?:f|l)?)?)|abs|l(?:div|abs|r(?:int(?:f|l)?|ound(?:f|l)?))|r(?:int(?:f|l)?|ound(?:f|l)?)|gamma(?:f|l)?)|w(?:scanf|c(?:s(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?|mbs)|pbrk|ftime|len|r(?:chr|tombs)|xfrm)|to(?:b|mb)|rtomb)|printf|mem(?:set|c(?:hr|py|mp)|move))|a(?:s(?:sert|ctime|in(?:h(?:f|l)?|f|l)?)|cos(?:h(?:f|l)?|f|l)?|t(?:o(?:i|f|l(?:l)?)|exit|an(?:h(?:f|l)?|2(?:f|l)?|f|l)?)|b(?:s|ort))|g(?:et(?:s|c(?:har)?|env|wc(?:har)?)|mtime)|r(?:int(?:f|l)?|ound(?:f|l)?|e(?:name|alloc|wind|m(?:ove|quo(?:f|l)?|ainder(?:f|l)?))|a(?:nd|ise))|b(?:search|towc)|m(?:odf(?:f|l)?|em(?:set|c(?:hr|py|mp)|move)|ktime|alloc|b(?:s(?:init|towcs|rtowcs)|towc|len|r(?:towc|len)))\\b",
        g = function () {
            var e = this.createKeywordMapper({"keyword.control": "break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using", "storage.type": "asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|voidclass|wchar_t|template", "storage.modifier": "const|extern|register|restrict|static|volatile|inline|private:|protected:|public:|friend|explicit|virtual|export|mutable|typename", "keyword.operator": "and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eqconst_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",
                "variable.language": "this", "constant.language": "NULL|true|false|TRUE|FALSE"}, "identifier");
            this.$rules = {start: [
                {token: "comment", regex: "\\/\\/.*$"},
                f.getStartRule("doc-start"),
                {token: "comment", merge: true, regex: "\\/\\*", next: "comment"},
                {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
                {token: "string", merge: true, regex: '["].*\\\\$', next: "qqstring"},
                {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
                {token: "string", merge: true, regex: "['].*\\\\$", next: "qstring"},
                {token: "constant.numeric",
                    regex: "0[xX][0-9a-fA-F]+\\b"},
                {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
                {token: "constant", regex: "<[a-zA-Z0-9.]+>"},
                {token: "keyword", regex: "(?:#include|#pragma|#line|#define|#undef|#ifdef|#else|#elif|#endif|#ifndef)"},
                {token: "support.function.C99.c", regex: a},
                {token: ["text", "entity.name.function", "text", "paren.lparen"], regex: "(\\s+)([a-zA-Z\\$_¡-￿][a-zA-Zd\\$_¡-￿]*\\b)(\\s*)(\\()"},
                {token: e, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
                {token: "keyword.operator", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},
                {token: "punctuation.operator", regex: "\\?|\\:|\\,|\\;|\\."},
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
            ]};
            this.embedRules(f,
                "doc-", [f.getEndRule("start")])
        };
    j.inherits(g, d);
    i.c_cppHighlightRules = g
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (h, i) {
    var j = h("../lib/oop"), f = h("./text_highlight_rules").TextHighlightRules, d = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    j.inherits(d, f);
    d.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    d.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    i.DocCommentHighlightRules = d
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (h, i) {
    var j = h("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (d, a) {
            return/^\s+$/.test(d) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (d, a) {
            var g = d.getLine(a).match(/^(\s*\})/);
            if (!g)return 0;
            var g = g[1].length, e = d.findMatchingBracket({row: a, column: g});
            if (!e || e.row == a)return 0;
            e = this.$getIndent(d.getLine(e.row));
            d.replace(new j(a, 0, a, g - 1), e)
        };
        this.$getIndent = function (d) {
            return(d = d.match(/^(\s+)/)) ?
                d[1] : ""
        }
    }).call(f.prototype);
    i.MatchingBraceOutdent = f
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (h, i) {
    var j = h("../../lib/oop"), f = h("../behaviour").Behaviour, d = function () {
        this.add("braces", "insertion", function (a, g, e, c, b) {
            if ("{" == b)return a = e.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "{" + c + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == b) {
                if (e = e.getCursorPosition(), g = c.doc.getLine(e.row), b = g.substring(e.column, e.column + 1), "}" == b && null !== c.$findOpeningBracket("}", {column: e.column +
                    1, row: e.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == b && (e = e.getCursorPosition(), g = c.doc.getLine(e.row), b = g.substring(e.column, e.column + 1), "}" == b)) {
                e = c.findMatchingBracket({row: e.row, column: e.column + 1});
                if (!e)return null;
                a = this.getNextLineIndent(a, g.substring(0, g.length - 1), c.getTabString());
                c = this.$getIndent(c.doc.getLine(e.row));
                return{text: "\n" + a + "\n" + c, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, g, e, c, b) {
            a = c.doc.getTextRange(b);
            if (!b.isMultiLine() && "{" ==
                a && "}" == c.doc.getLine(b.start.row).substring(b.end.column, b.end.column + 1))return b.end.column++, b
        });
        this.add("parens", "insertion", function (a, g, e, c, b) {
            if ("(" == b)return a = e.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "(" + c + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == b && (a = e.getCursorPosition(), ")" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, g, e, c, b) {
                a = c.doc.getTextRange(b);
                if (!b.isMultiLine() && "(" == a && ")" == c.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
            });
        this.add("brackets", "insertion", function (a, g, e, c, b) {
            if ("[" == b)return a = e.getSelectionRange(), c = c.doc.getTextRange(a), "" !== c ? {text: "[" + c + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == b && (a = e.getCursorPosition(), "]" == c.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== c.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, g, e, c, b) {
            a = c.doc.getTextRange(b);
            if (!b.isMultiLine() && "[" == a && "]" == c.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
        });
        this.add("string_dquotes", "insertion", function (a, g, e, c, b) {
            if ('"' == b || "'" == b) {
                a = e.getSelectionRange();
                g = c.doc.getTextRange(a);
                if ("" !== g)return{text: b + g + b, selection: !1};
                e = e.getCursorPosition();
                g = c.doc.getLine(e.row);
                if ("\\" == g.substring(e.column - 1,
                    e.column))return null;
                for (var c = c.getTokens(a.start.row), d = 0, f, h = -1, i = 0; i < c.length; i++) {
                    f = c[i];
                    "string" == f.type ? h = -1 : 0 > h && (h = f.value.indexOf(b));
                    if (f.value.length + d > a.start.column)break;
                    d += c[i].value.length
                }
                if (!f || 0 > h && "comment" !== f.type && ("string" !== f.type || a.start.column !== f.value.length + d - 1 && f.value.lastIndexOf(b) === f.value.length - 1))return{text: b + b, selection: [1, 1]};
                if (f && "string" === f.type && g.substring(e.column, e.column + 1) == b)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, g, e, c, b) {
                a = c.doc.getTextRange(b);
                if (!b.isMultiLine() && ('"' == a || "'" == a) && '"' == c.doc.getLine(b.start.row).substring(b.start.column + 1, b.start.column + 2))return b.end.column++, b
            })
    };
    j.inherits(d, f);
    i.CstyleBehaviour = d
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (h, i) {
    var j = h("../../lib/oop"), f = h("../../range").Range, d = h("./fold_mode").FoldMode, a = i.FoldMode = function () {
    };
    j.inherits(a, d);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, e, c) {
            var b = a.getLine(c), d = b.match(this.foldingStartMarker);
            if (d) {
                e = d.index;
                if (d[1])return this.openingBracketBlock(a,
                    d[1], c, e);
                a = a.getCommentFoldRange(c, e + d[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (e === "markbeginend")if (d = b.match(this.foldingStopMarker)) {
                e = d.index + d[0].length;
                if (d[2]) {
                    a = a.getCommentFoldRange(c, e);
                    return a.end.column = a.end.column - 2, a
                }
                c = {row: c, column: e};
                if (a = a.$findOpeningBracket(d[1], c))return a.column++, c.column--, f.fromPoints(a, c)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (h, i) {
    var j = h("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (f, d, a) {
            f = f.getLine(a);
            return this.foldingStartMarker.test(f) ? "start" : "markbeginend" == d && this.foldingStopMarker && this.foldingStopMarker.test(f) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (f, d, a) {
            var g = /\S/, e = f.getLine(d), c = e.search(g);
            if (-1 != c) {
                for (var a =
                    a || e.length, b = f.getLength(), h = e = d; ++d < b;) {
                    var i = f.getLine(d).search(g);
                    if (-1 != i) {
                        if (i <= c)break;
                        h = d
                    }
                }
                if (h > e)return f = f.getLine(h).length, new j(e, a, h, f)
            }
        };
        this.openingBracketBlock = function (f, d, a, g, e) {
            a = {row: a, column: g + 1};
            if (d = f.$findClosingBracket(d, a, e))return e = f.foldWidgets[d.row], null == e && (e = this.getFoldWidget(f, d.row)), "start" == e && d.row > a.row && (d.row--, d.column = f.getLine(d.row).length), j.fromPoints(a, d)
        }
    }).call((i.FoldMode = function () {
        }).prototype)
});