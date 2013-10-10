﻿define("ace/mode/lua", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/lua_highlight_rules ace/range".split(" "), function (b, l) {
    var m = b("../lib/oop"), n = b("./text").Mode, k = b("../tokenizer").Tokenizer, i = b("./lua_highlight_rules").LuaHighlightRules, c = b("../range").Range, a = function () {
        this.$tokenizer = new k((new i).getRules())
    };
    m.inherits(a, n);
    (function () {
        function a(h) {
            var d = 0, f;
            for (f in h) {
                var e = h[f];
                e.type == "keyword" ? e.value in b && (d = d + b[e.value]) : e.type == "paren.lparen" ? d++ : e.type ==
                    "paren.rparen" && d--
            }
            return d < 0 ? -1 : d > 0 ? 1 : 0
        }

        var b = {"function": 1, then: 1, "do": 1, "else": 1, elseif: 1, repeat: 1, end: -1, until: -1}, i = ["else", "elseif", "end", "until"];
        this.getNextLineIndent = function (h, d, f) {
            var e = this.$getIndent(d), c = 0, b = this.$tokenizer.getLineTokens(d, h).tokens;
            return h == "start" && (c = a(b)), c > 0 ? e + f : c < 0 && e.substr(e.length - f.length) == f && !this.checkOutdent(h, d, "\n") ? e.substr(0, e.length - f.length) : e
        };
        this.checkOutdent = function (a, d, c) {
            if (c != "\n" && c != "\r" && c != "\r\n")return false;
            if (d.match(/^\s*[\)\}\]]$/))return true;
            a = this.$tokenizer.getLineTokens(d.trim(), a).tokens;
            return!a || !a.length ? false : a[0].type == "keyword" && i.indexOf(a[0].value) != -1
        };
        this.autoOutdent = function (b, d, f) {
            var e = d.getLine(f - 1), b = this.$getIndent(e).length, e = this.$tokenizer.getLineTokens(e, "start").tokens, i = d.getTabString().length, b = b + i * a(e);
            this.$getIndent(d.getLine(f)).length < b || d.outdentRows(new c(f, 0, f + 2, 0))
        }
    }).call(a.prototype);
    l.Mode = a
});
define("ace/mode/lua_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, l) {
    var m = b("../lib/oop"), n = b("./text_highlight_rules").TextHighlightRules, k = function () {
        var b = [];
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
            {token: function (c) {
                var a;
                return null != (a = /\-\-\[(\=+)\[/.exec(c)) && void 0 !=
                    (a = a[1]) && b.push(a.length), "comment"
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
            {token: function (c) {
                var a;
                return null != (a = /\[(\=+)\[/.exec(c)) && void 0 != (a = a[1]) && b.push(a.length), "string"
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
            {token: function (c) {
                var a = this.rules.qcomment5[0], g;
                a.next = "start";
                if (null != (g = /\](\=+)\]/.exec(c)) && void 0 != (g = g[1])) {
                    var c = g.length, j;
                    (j = b.pop()) != c && (b.push(j), a.next = "qcomment5")
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
            {token: function (c) {
                var a = this.rules.qstring5[0], g;
                a.next = "start";
                if (null != (g = /\](\=+)\]/.exec(c)) &&
                    void 0 != (g = g[1])) {
                    var c = g.length, j;
                    (j = b.pop()) != c && (b.push(j), a.next = "qstring5")
                }
                return"string"
            }, regex: "(?:[^\\\\]|\\\\.)*?\\]\\={5}\\=*\\]", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    m.inherits(k, n);
    l.LuaHighlightRules = k
});