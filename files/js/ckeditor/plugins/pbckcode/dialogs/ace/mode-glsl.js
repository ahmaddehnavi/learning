﻿define("ace/mode/glsl", "require exports module ace/lib/oop ace/mode/c_cpp ace/tokenizer ace/mode/glsl_highlight_rules ace/mode/matching_brace_outdent ace/range ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (c, h) {
    var j = c("../lib/oop"), i = c("./c_cpp").Mode, e = c("../tokenizer").Tokenizer, a = c("./glsl_highlight_rules").glslHighlightRules, g = c("./matching_brace_outdent").MatchingBraceOutdent;
    c("../range");
    var b = c("./behaviour/cstyle").CstyleBehaviour, d = c("./folding/cstyle").FoldMode,
        f = function () {
            this.$tokenizer = new e((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new b;
            this.foldingRules = new d
        };
    j.inherits(f, i);
    h.Mode = f
});
define("ace/mode/c_cpp", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/c_cpp_highlight_rules ace/mode/matching_brace_outdent ace/range ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (c, h) {
    var j = c("../lib/oop"), i = c("./text").Mode, e = c("../tokenizer").Tokenizer, a = c("./c_cpp_highlight_rules").c_cppHighlightRules, g = c("./matching_brace_outdent").MatchingBraceOutdent, b = c("../range").Range, d = c("./behaviour/cstyle").CstyleBehaviour, f = c("./folding/cstyle").FoldMode,
        k = function () {
            this.$tokenizer = new e((new a).getRules());
            this.$outdent = new g;
            this.$behaviour = new d;
            this.foldingRules = new f
        };
    j.inherits(k, i);
    (function () {
        this.toggleCommentLines = function (a, f, d, g) {
            for (var e = true, a = /^(\s*)\/\//, c = d; c <= g; c++)if (!a.test(f.getLine(c))) {
                e = false;
                break
            }
            if (e) {
                e = new b(0, 0, 0, 0);
                for (c = d; c <= g; c++) {
                    d = f.getLine(c).match(a);
                    e.start.row = c;
                    e.end.row = c;
                    e.end.column = d[0].length;
                    f.replace(e, d[1])
                }
            } else f.indentRows(d, g, "//")
        };
        this.getNextLineIndent = function (a, d, f) {
            var b = this.$getIndent(d),
                g = this.$tokenizer.getLineTokens(d, a), e = g.tokens, g = g.state;
            if (e.length && e[e.length - 1].type == "comment")return b;
            if (a == "start")(a = d.match(/^.*[\{\(\[]\s*$/)) && (b = b + f); else if (a == "doc-start") {
                if (g == "start")return"";
                (a = d.match(/^\s*(\/?)\*/)) && (a[1] && (b = b + " "), b = b + "* ")
            }
            return b
        };
        this.checkOutdent = function (a, b, d) {
            return this.$outdent.checkOutdent(b, d)
        };
        this.autoOutdent = function (a, b, d) {
            this.$outdent.autoOutdent(b, d)
        }
    }).call(k.prototype);
    h.Mode = k
});
define("ace/mode/c_cpp_highlight_rules", "require exports module ace/lib/oop ace/mode/doc_comment_highlight_rules ace/mode/text_highlight_rules".split(" "), function (c, h) {
    var j = c("../lib/oop"), i = c("./doc_comment_highlight_rules").DocCommentHighlightRules, e = c("./text_highlight_rules").TextHighlightRules, a = h.cFunctions = "\\s*\\bhypot(?:f|l)?|s(?:scanf|ystem|nprintf|ca(?:nf|lb(?:n(?:f|l)?|ln(?:f|l)?))|i(?:n(?:h(?:f|l)?|f|l)?|gn(?:al|bit))|tr(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?)|error|pbrk|ftime|len|rchr|xfrm)|printf|et(?:jmp|vbuf|locale|buf)|qrt(?:f|l)?|w(?:scanf|printf)|rand)|n(?:e(?:arbyint(?:f|l)?|xt(?:toward(?:f|l)?|after(?:f|l)?))|an(?:f|l)?)|c(?:s(?:in(?:h(?:f|l)?|f|l)?|qrt(?:f|l)?)|cos(?:h(?:f)?|f|l)?|imag(?:f|l)?|t(?:ime|an(?:h(?:f|l)?|f|l)?)|o(?:s(?:h(?:f|l)?|f|l)?|nj(?:f|l)?|pysign(?:f|l)?)|p(?:ow(?:f|l)?|roj(?:f|l)?)|e(?:il(?:f|l)?|xp(?:f|l)?)|l(?:o(?:ck|g(?:f|l)?)|earerr)|a(?:sin(?:h(?:f|l)?|f|l)?|cos(?:h(?:f|l)?|f|l)?|tan(?:h(?:f|l)?|f|l)?|lloc|rg(?:f|l)?|bs(?:f|l)?)|real(?:f|l)?|brt(?:f|l)?)|t(?:ime|o(?:upper|lower)|an(?:h(?:f|l)?|f|l)?|runc(?:f|l)?|gamma(?:f|l)?|mp(?:nam|file))|i(?:s(?:space|n(?:ormal|an)|cntrl|inf|digit|u(?:nordered|pper)|p(?:unct|rint)|finite|w(?:space|c(?:ntrl|type)|digit|upper|p(?:unct|rint)|lower|al(?:num|pha)|graph|xdigit|blank)|l(?:ower|ess(?:equal|greater)?)|al(?:num|pha)|gr(?:eater(?:equal)?|aph)|xdigit|blank)|logb(?:f|l)?|max(?:div|abs))|di(?:v|fftime)|_Exit|unget(?:c|wc)|p(?:ow(?:f|l)?|ut(?:s|c(?:har)?|wc(?:har)?)|error|rintf)|e(?:rf(?:c(?:f|l)?|f|l)?|x(?:it|p(?:2(?:f|l)?|f|l|m1(?:f|l)?)?))|v(?:s(?:scanf|nprintf|canf|printf|w(?:scanf|printf))|printf|f(?:scanf|printf|w(?:scanf|printf))|w(?:scanf|printf)|a_(?:start|copy|end|arg))|qsort|f(?:s(?:canf|e(?:tpos|ek))|close|tell|open|dim(?:f|l)?|p(?:classify|ut(?:s|c|w(?:s|c))|rintf)|e(?:holdexcept|set(?:e(?:nv|xceptflag)|round)|clearexcept|testexcept|of|updateenv|r(?:aiseexcept|ror)|get(?:e(?:nv|xceptflag)|round))|flush|w(?:scanf|ide|printf|rite)|loor(?:f|l)?|abs(?:f|l)?|get(?:s|c|pos|w(?:s|c))|re(?:open|e|ad|xp(?:f|l)?)|m(?:in(?:f|l)?|od(?:f|l)?|a(?:f|l|x(?:f|l)?)?))|l(?:d(?:iv|exp(?:f|l)?)|o(?:ngjmp|cal(?:time|econv)|g(?:1(?:p(?:f|l)?|0(?:f|l)?)|2(?:f|l)?|f|l|b(?:f|l)?)?)|abs|l(?:div|abs|r(?:int(?:f|l)?|ound(?:f|l)?))|r(?:int(?:f|l)?|ound(?:f|l)?)|gamma(?:f|l)?)|w(?:scanf|c(?:s(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?|mbs)|pbrk|ftime|len|r(?:chr|tombs)|xfrm)|to(?:b|mb)|rtomb)|printf|mem(?:set|c(?:hr|py|mp)|move))|a(?:s(?:sert|ctime|in(?:h(?:f|l)?|f|l)?)|cos(?:h(?:f|l)?|f|l)?|t(?:o(?:i|f|l(?:l)?)|exit|an(?:h(?:f|l)?|2(?:f|l)?|f|l)?)|b(?:s|ort))|g(?:et(?:s|c(?:har)?|env|wc(?:har)?)|mtime)|r(?:int(?:f|l)?|ound(?:f|l)?|e(?:name|alloc|wind|m(?:ove|quo(?:f|l)?|ainder(?:f|l)?))|a(?:nd|ise))|b(?:search|towc)|m(?:odf(?:f|l)?|em(?:set|c(?:hr|py|mp)|move)|ktime|alloc|b(?:s(?:init|towcs|rtowcs)|towc|len|r(?:towc|len)))\\b",
        g = function () {
            var b = this.createKeywordMapper({"keyword.control": "break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using", "storage.type": "asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|voidclass|wchar_t|template", "storage.modifier": "const|extern|register|restrict|static|volatile|inline|private:|protected:|public:|friend|explicit|virtual|export|mutable|typename", "keyword.operator": "and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eqconst_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",
                "variable.language": "this", "constant.language": "NULL|true|false|TRUE|FALSE"}, "identifier");
            this.$rules = {start: [
                {token: "comment", regex: "\\/\\/.*$"},
                i.getStartRule("doc-start"),
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
                {token: b, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
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
            this.embedRules(i,
                "doc-", [i.getEndRule("start")])
        };
    j.inherits(g, e);
    h.c_cppHighlightRules = g
});
define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (c, h) {
    var j = c("../lib/oop"), i = c("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "comment.doc.tag", regex: "@[\\w\\d_]+"},
            {token: "comment.doc", merge: !0, regex: "\\s+"},
            {token: "comment.doc", merge: !0, regex: "TODO"},
            {token: "comment.doc", merge: !0, regex: "[^@\\*]+"},
            {token: "comment.doc", merge: !0, regex: "."}
        ]}
    };
    j.inherits(e, i);
    e.getStartRule = function (a) {
        return{token: "comment.doc",
            merge: !0, regex: "\\/\\*(?=\\*)", next: a}
    };
    e.getEndRule = function (a) {
        return{token: "comment.doc", merge: !0, regex: "\\*\\/", next: a}
    };
    h.DocCommentHighlightRules = e
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (c, h) {
    var j = c("../range").Range, i = function () {
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
            e.replace(new j(a, 0, a, g - 1), b)
        };
        this.$getIndent = function (e) {
            return(e = e.match(/^(\s+)/)) ?
                e[1] : ""
        }
    }).call(i.prototype);
    h.MatchingBraceOutdent = i
});
define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (c, h) {
    var j = c("../../lib/oop"), i = c("../behaviour").Behaviour, e = function () {
        this.add("braces", "insertion", function (a, g, b, d, f) {
            if ("{" == f)return a = b.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "{" + d + "}", selection: !1} : {text: "{}", selection: [1, 1]};
            if ("}" == f) {
                if (b = b.getCursorPosition(), g = d.doc.getLine(b.row), f = g.substring(b.column, b.column + 1), "}" == f && null !== d.$findOpeningBracket("}", {column: b.column +
                    1, row: b.row}))return{text: "", selection: [1, 1]}
            } else if ("\n" == f && (b = b.getCursorPosition(), g = d.doc.getLine(b.row), f = g.substring(b.column, b.column + 1), "}" == f)) {
                b = d.findMatchingBracket({row: b.row, column: b.column + 1});
                if (!b)return null;
                a = this.getNextLineIndent(a, g.substring(0, g.length - 1), d.getTabString());
                d = this.$getIndent(d.doc.getLine(b.row));
                return{text: "\n" + a + "\n" + d, selection: [1, a.length, 1, a.length]}
            }
        });
        this.add("braces", "deletion", function (a, g, b, d, f) {
            a = d.doc.getTextRange(f);
            if (!f.isMultiLine() && "{" ==
                a && "}" == d.doc.getLine(f.start.row).substring(f.end.column, f.end.column + 1))return f.end.column++, f
        });
        this.add("parens", "insertion", function (a, g, b, d, f) {
            if ("(" == f)return a = b.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "(" + d + ")", selection: !1} : {text: "()", selection: [1, 1]};
            if (")" == f && (a = b.getCursorPosition(), ")" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket(")", {column: a.column + 1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("parens", "deletion",
            function (a, g, b, d, f) {
                a = d.doc.getTextRange(f);
                if (!f.isMultiLine() && "(" == a && ")" == d.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
            });
        this.add("brackets", "insertion", function (a, g, b, d, f) {
            if ("[" == f)return a = b.getSelectionRange(), d = d.doc.getTextRange(a), "" !== d ? {text: "[" + d + "]", selection: !1} : {text: "[]", selection: [1, 1]};
            if ("]" == f && (a = b.getCursorPosition(), "]" == d.doc.getLine(a.row).substring(a.column, a.column + 1) && null !== d.$findOpeningBracket("]", {column: a.column +
                1, row: a.row})))return{text: "", selection: [1, 1]}
        });
        this.add("brackets", "deletion", function (a, g, b, d, f) {
            a = d.doc.getTextRange(f);
            if (!f.isMultiLine() && "[" == a && "]" == d.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
        });
        this.add("string_dquotes", "insertion", function (a, g, b, d, f) {
            if ('"' == f || "'" == f) {
                a = b.getSelectionRange();
                g = d.doc.getTextRange(a);
                if ("" !== g)return{text: f + g + f, selection: !1};
                b = b.getCursorPosition();
                g = d.doc.getLine(b.row);
                if ("\\" == g.substring(b.column - 1,
                    b.column))return null;
                for (var d = d.getTokens(a.start.row), e = 0, c, i = -1, h = 0; h < d.length; h++) {
                    c = d[h];
                    "string" == c.type ? i = -1 : 0 > i && (i = c.value.indexOf(f));
                    if (c.value.length + e > a.start.column)break;
                    e += d[h].value.length
                }
                if (!c || 0 > i && "comment" !== c.type && ("string" !== c.type || a.start.column !== c.value.length + e - 1 && c.value.lastIndexOf(f) === c.value.length - 1))return{text: f + f, selection: [1, 1]};
                if (c && "string" === c.type && g.substring(b.column, b.column + 1) == f)return{text: "", selection: [1, 1]}
            }
        });
        this.add("string_dquotes", "deletion",
            function (a, g, b, d, f) {
                a = d.doc.getTextRange(f);
                if (!f.isMultiLine() && ('"' == a || "'" == a) && '"' == d.doc.getLine(f.start.row).substring(f.start.column + 1, f.start.column + 2))return f.end.column++, f
            })
    };
    j.inherits(e, i);
    h.CstyleBehaviour = e
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (c, h) {
    var j = c("../../lib/oop"), i = c("../../range").Range, e = c("./fold_mode").FoldMode, a = h.FoldMode = function () {
    };
    j.inherits(a, e);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (a, b, d) {
            var f = a.getLine(d), e = f.match(this.foldingStartMarker);
            if (e) {
                b = e.index;
                if (e[1])return this.openingBracketBlock(a,
                    e[1], d, b);
                a = a.getCommentFoldRange(d, b + e[0].length);
                return a.end.column = a.end.column - 2, a
            }
            if (b === "markbeginend")if (e = f.match(this.foldingStopMarker)) {
                b = e.index + e[0].length;
                if (e[2]) {
                    a = a.getCommentFoldRange(d, b);
                    return a.end.column = a.end.column - 2, a
                }
                d = {row: d, column: b};
                if (a = a.$findOpeningBracket(e[1], d))return a.column++, d.column--, i.fromPoints(a, d)
            }
        }
    }).call(a.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (c, h) {
    var j = c("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (c, e, a) {
            c = c.getLine(a);
            return this.foldingStartMarker.test(c) ? "start" : "markbeginend" == e && this.foldingStopMarker && this.foldingStopMarker.test(c) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (c, e, a) {
            var g = /\S/, b = c.getLine(e), d = b.search(g);
            if (-1 != d) {
                for (var a =
                    a || b.length, f = c.getLength(), h = b = e; ++e < f;) {
                    var l = c.getLine(e).search(g);
                    if (-1 != l) {
                        if (l <= d)break;
                        h = e
                    }
                }
                if (h > b)return c = c.getLine(h).length, new j(b, a, h, c)
            }
        };
        this.openingBracketBlock = function (c, e, a, g, b) {
            a = {row: a, column: g + 1};
            if (e = c.$findClosingBracket(e, a, b))return b = c.foldWidgets[e.row], null == b && (b = this.getFoldWidget(c, e.row)), "start" == b && e.row > a.row && (e.row--, e.column = c.getLine(e.row).length), j.fromPoints(a, e)
        }
    }).call((h.FoldMode = function () {
        }).prototype)
});
define("ace/mode/glsl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/c_cpp_highlight_rules"], function (c, h) {
    var j = c("../lib/oop"), i = c("./c_cpp_highlight_rules").c_cppHighlightRules, e = function () {
        var a = this.createKeywordMapper({"variable.language": "this", keyword: "attribute|const|uniform|varying|break|continue|do|for|while|if|else|in|out|inout|float|int|void|bool|true|false|lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|samplerCube|struct",
                "constant.language": "radians|degrees|sin|cos|tan|asin|acos|atan|pow|exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|faceforward|reflect|refract|matrixCompMult|lessThan|lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|texture2DProjLod|textureCube|textureCubeLod|gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|gl_DepthRangeParameters|gl_DepthRange|gl_Position|gl_PointSize|gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData"},
            "identifier");
        this.$rules = (new i).$rules;
        this.$rules.start.forEach(function (c) {
            "function" == typeof c.token && (c.token = a)
        })
    };
    j.inherits(e, i);
    h.glslHighlightRules = e
});