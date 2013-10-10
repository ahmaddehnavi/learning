﻿define("ace/mode/perl", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/perl_highlight_rules ace/mode/matching_brace_outdent ace/range ace/mode/folding/cstyle".split(" "), function (b, i) {
    var j = b("../lib/oop"), a = b("./text").Mode, c = b("../tokenizer").Tokenizer, f = b("./perl_highlight_rules").PerlHighlightRules, d = b("./matching_brace_outdent").MatchingBraceOutdent, e = b("../range").Range, h = b("./folding/cstyle").FoldMode, k = function () {
        this.$tokenizer = new c((new f).getRules());
        this.$outdent =
            new d;
        this.foldingRules = new h
    };
    j.inherits(k, a);
    (function () {
        this.toggleCommentLines = function (c, d, a, f) {
            for (var b = true, c = /^(\s*)#/, h = a; h <= f; h++)if (!c.test(d.getLine(h))) {
                b = false;
                break
            }
            if (b) {
                b = new e(0, 0, 0, 0);
                for (h = a; h <= f; h++) {
                    a = d.getLine(h).match(c);
                    b.start.row = h;
                    b.end.row = h;
                    b.end.column = a[0].length;
                    d.replace(b, a[1])
                }
            } else d.indentRows(a, f, "#")
        };
        this.getNextLineIndent = function (c, d, a) {
            var f = this.$getIndent(d), e = this.$tokenizer.getLineTokens(d, c).tokens;
            if (e.length && e[e.length - 1].type == "comment")return f;
            c == "start" && d.match(/^.*[\{\(\[\:]\s*$/) && (f = f + a);
            return f
        };
        this.checkOutdent = function (c, d, a) {
            return this.$outdent.checkOutdent(d, a)
        };
        this.autoOutdent = function (c, d, a) {
            this.$outdent.autoOutdent(d, a)
        }
    }).call(k.prototype);
    i.Mode = k
});
define("ace/mode/perl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (b, i) {
    var j = b("../lib/oop"), a = b("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: "comment", regex: "#.*$"},
            {token: "string.regexp", regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", merge: !0, regex: '["].*\\\\$', next: "qqstring"},
            {token: "string",
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "string", merge: !0, regex: "['].*\\\\$", next: "qstring"},
            {token: "constant.numeric", regex: "0x[0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: this.createKeywordMapper({keyword: "base|constant|continue|else|elsif|for|foreach|format|goto|if|last|local|my|next|no|package|parent|redo|require|scalar|sub|unless|until|while|use|vars", "constant.language": "ARGV|ENV|INC|SIG", "support.function": "getprotobynumber|getprotobyname|getservbyname|gethostbyaddr|gethostbyname|getservbyport|getnetbyaddr|getnetbyname|getsockname|getpeername|setpriority|getprotoent|setprotoent|getpriority|endprotoent|getservent|setservent|endservent|sethostent|socketpair|getsockopt|gethostent|endhostent|setsockopt|setnetent|quotemeta|localtime|prototype|getnetent|endnetent|rewinddir|wantarray|getpwuid|closedir|getlogin|readlink|endgrent|getgrgid|getgrnam|shmwrite|shutdown|readline|endpwent|setgrent|readpipe|formline|truncate|dbmclose|syswrite|setpwent|getpwnam|getgrent|getpwent|ucfirst|sysread|setpgrp|shmread|sysseek|sysopen|telldir|defined|opendir|connect|lcfirst|getppid|binmode|syscall|sprintf|getpgrp|readdir|seekdir|waitpid|reverse|unshift|symlink|dbmopen|semget|msgrcv|rename|listen|chroot|msgsnd|shmctl|accept|unpack|exists|fileno|shmget|system|unlink|printf|gmtime|msgctl|semctl|values|rindex|substr|splice|length|msgget|select|socket|return|caller|delete|alarm|ioctl|index|undef|lstat|times|srand|chown|fcntl|close|write|umask|rmdir|study|sleep|chomp|untie|print|utime|mkdir|atan2|split|crypt|flock|chmod|BEGIN|bless|chdir|semop|shift|reset|link|stat|chop|grep|fork|dump|join|open|tell|pipe|exit|glob|warn|each|bind|sort|pack|eval|push|keys|getc|kill|seek|sqrt|send|wait|rand|tied|read|time|exec|recv|eof|chr|int|ord|exp|pos|pop|sin|log|abs|oct|hex|tie|cos|vec|END|ref|map|die|uc|lc|do"},
                "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "\\.\\.\\.|\\|\\|=|>>=|<<=|<=>|&&=|=>|!~|\\^=|&=|\\|=|\\.=|x=|%=|\\/=|\\*=|\\-=|\\+=|=~|\\*\\*|\\-\\-|\\.\\.|\\|\\||&&|\\+\\+|\\->|!=|==|>=|<=|>>|<<|,|=|\\?\\:|\\^|\\||x|%|\\/|\\*|<|&|\\\\|~|!|>|\\.|\\-|\\+|\\-C|\\-b|\\-S|\\-u|\\-t|\\-p|\\-l|\\-d|\\-f|\\-g|\\-s|\\-z|\\-k|\\-e|\\-O|\\-T|\\-B|\\-M|\\-A|\\-X|\\-W|\\-c|\\-R|\\-o|\\-x|\\-w|\\-r|\\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)"},
            {token: "lparen", regex: "[[({]"},
            {token: "rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], qqstring: [
            {token: "string", regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"', next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ], qstring: [
            {token: "string", regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'", next: "start"},
            {token: "string", merge: !0, regex: ".+"}
        ]}
    };
    j.inherits(c, a);
    i.PerlHighlightRules = c
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (b, i) {
    var j = b("../range").Range, a = function () {
    };
    (function () {
        this.checkOutdent = function (c, a) {
            return/^\s+$/.test(c) ? /^\s*\}/.test(a) : !1
        };
        this.autoOutdent = function (c, a) {
            var d = c.getLine(a).match(/^(\s*\})/);
            if (!d)return 0;
            var d = d[1].length, e = c.findMatchingBracket({row: a, column: d});
            if (!e || e.row == a)return 0;
            e = this.$getIndent(c.getLine(e.row));
            c.replace(new j(a, 0, a, d - 1), e)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(a.prototype);
    i.MatchingBraceOutdent = a
});
define("ace/mode/folding/cstyle", "require exports module ace/lib/oop ace/range ace/mode/folding/fold_mode".split(" "), function (b, i) {
    var j = b("../../lib/oop"), a = b("../../range").Range, c = b("./fold_mode").FoldMode, f = i.FoldMode = function () {
    };
    j.inherits(f, c);
    (function () {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.getFoldWidgetRange = function (d, c, b) {
            var f = d.getLine(b), g = f.match(this.foldingStartMarker);
            if (g) {
                c = g.index;
                if (g[1])return this.openingBracketBlock(d,
                    g[1], b, c);
                d = d.getCommentFoldRange(b, c + g[0].length);
                return d.end.column = d.end.column - 2, d
            }
            if (c === "markbeginend")if (g = f.match(this.foldingStopMarker)) {
                c = g.index + g[0].length;
                if (g[2]) {
                    d = d.getCommentFoldRange(b, c);
                    return d.end.column = d.end.column - 2, d
                }
                b = {row: b, column: c};
                if (d = d.$findOpeningBracket(g[1], b))return d.column++, b.column--, a.fromPoints(d, b)
            }
        }
    }).call(f.prototype)
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, i) {
    var j = b("../../range").Range;
    (function () {
        this.foldingStopMarker = this.foldingStartMarker = null;
        this.getFoldWidget = function (a, c, b) {
            a = a.getLine(b);
            return this.foldingStartMarker.test(a) ? "start" : "markbeginend" == c && this.foldingStopMarker && this.foldingStopMarker.test(a) ? "end" : ""
        };
        this.getFoldWidgetRange = function () {
            return null
        };
        this.indentationBlock = function (a, c, b) {
            var d = /\S/, e = a.getLine(c), h = e.search(d);
            if (-1 != h) {
                for (var b =
                    b || e.length, i = a.getLength(), g = e = c; ++c < i;) {
                    var l = a.getLine(c).search(d);
                    if (-1 != l) {
                        if (l <= h)break;
                        g = c
                    }
                }
                if (g > e)return a = a.getLine(g).length, new j(e, b, g, a)
            }
        };
        this.openingBracketBlock = function (a, c, b, d, e) {
            b = {row: b, column: d + 1};
            if (c = a.$findClosingBracket(c, b, e))return e = a.foldWidgets[c.row], null == e && (e = this.getFoldWidget(a, c.row)), "start" == e && c.row > b.row && (c.row--, c.column = a.getLine(c.row).length), j.fromPoints(b, c)
        }
    }).call((i.FoldMode = function () {
        }).prototype)
});