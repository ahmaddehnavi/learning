﻿define("ace/mode/powershell", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/powershell_highlight_rules ace/mode/matching_brace_outdent ace/mode/behaviour/cstyle ace/mode/folding/cstyle".split(" "), function (h, j) {
    var i = h("../lib/oop"), f = h("./text").Mode, e = h("../tokenizer").Tokenizer, a = h("./powershell_highlight_rules").PowershellHighlightRules, g = h("./matching_brace_outdent").MatchingBraceOutdent, b = h("./behaviour/cstyle").CstyleBehaviour, c = h("./folding/cstyle").FoldMode, d = function () {
        this.$tokenizer =
            new e((new a).getRules());
        this.$outdent = new g;
        this.$behaviour = new b;
        this.foldingRules = new c
    };
    i.inherits(d, f);
    (function () {
        this.getNextLineIndent = function (a, b, d) {
            var c = this.$getIndent(b), g = this.$tokenizer.getLineTokens(b, a).tokens;
            if (g.length && g[g.length - 1].type == "comment")return c;
            a == "start" && b.match(/^.*[\{\(\[]\s*$/) && (c = c + d);
            return c
        };
        this.checkOutdent = function (a, b, c) {
            return this.$outdent.checkOutdent(b, c)
        };
        this.autoOutdent = function (a, b, c) {
            this.$outdent.autoOutdent(b, c)
        };
        this.createWorker = function () {
            return null
        }
    }).call(d.prototype);
    j.Mode = d
});
define("ace/mode/powershell_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (h, j) {
    var i = h("../lib/oop"), f = h("./text_highlight_rules").TextHighlightRules, e = function () {
        this.$rules = {start: [
            {token: "comment", regex: "#.*$"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F]+\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant.language.boolean",
                regex: "[$](?:[Tt]rue|[Ff]alse)\\b"},
            {token: "constant.language", regex: "[$][Nn]ull\\b"},
            {token: "variable.instance", regex: "[$][a-zA-Z][a-zA-Z0-9_]*\\b"},
            {token: this.createKeywordMapper({"support.function": "Get-Alias|Import-Alias|New-Alias|Set-Alias|Get-AuthenticodeSignature|Set-AuthenticodeSignature|Set-Location|Get-ChildItem|Clear-Item|Get-Command|Measure-Command|Trace-Command|Add-Computer|Checkpoint-Computer|Remove-Computer|Restart-Computer|Restore-Computer|Stop-Computer|Reset-ComputerMachinePassword|Test-ComputerSecureChannel|Add-Content|Get-Content|Set-Content|Clear-Content|Get-Command|Invoke-Command|Enable-ComputerRestore|Disable-ComputerRestore|Get-ComputerRestorePoint|Test-Connection|ConvertFrom-CSV|ConvertTo-CSV|ConvertTo-Html|ConvertTo-Xml|ConvertFrom-SecureString|ConvertTo-SecureString|Copy-Item|Export-Counter|Get-Counter|Import-Counter|Get-Credential|Get-Culture|Get-ChildItem|Get-Date|Set-Date|Remove-Item|Compare-Object|Get-Event|Get-WinEvent|New-Event|Remove-Event|Unregister-Event|Wait-Event|Clear-EventLog|Get-Eventlog|Limit-EventLog|New-Eventlog|Remove-EventLog|Show-EventLog|Write-EventLog|Get-EventSubscriber|Register-EngineEvent|Register-ObjectEvent|Register-WmiEvent|Get-ExecutionPolicy|Set-ExecutionPolicy|Export-Alias|Export-Clixml|Export-Console|Export-Csv|ForEach-Object|Format-Custom|Format-List|Format-Table|Format-Wide|Export-FormatData|Get-FormatData|Get-Item|Get-ChildItem|Get-Help|Add-History|Clear-History|Get-History|Invoke-History|Get-Host|Read-Host|Write-Host|Get-HotFix|Import-Clixml|Import-Csv|Invoke-Command|Invoke-Expression|Get-Item|Invoke-Item|New-Item|Remove-Item|Set-Item|Clear-ItemProperty|Copy-ItemProperty|Get-ItemProperty|Move-ItemProperty|New-ItemProperty|Remove-ItemProperty|Rename-ItemProperty|Set-ItemProperty|Get-Job|Receive-Job|Remove-Job|Start-Job|Stop-Job|Wait-Job|Stop-Process|Update-List|Get-Location|Pop-Location|Push-Location|Set-Location|Send-MailMessage|Add-Member|Get-Member|Move-Item|Compare-Object|Group-Object|Measure-Object|New-Object|Select-Object|Sort-Object|Where-Object|Out-Default|Out-File|Out-GridView|Out-Host|Out-Null|Out-Printer|Out-String|Convert-Path|Join-Path|Resolve-Path|Split-Path|Test-Path|Get-Pfxcertificate|Pop-Location|Push-Location|Get-Process|Start-Process|Stop-Process|Wait-Process|Enable-PSBreakpoint|Disable-PSBreakpoint|Get-PSBreakpoint|Set-PSBreakpoint|Remove-PSBreakpoint|Get-PSDrive|New-PSDrive|Remove-PSDrive|Get-PSProvider|Set-PSdebug|Enter-PSSession|Exit-PSSession|Export-PSSession|Get-PSSession|Import-PSSession|New-PSSession|Remove-PSSession|Disable-PSSessionConfiguration|Enable-PSSessionConfiguration|Get-PSSessionConfiguration|Register-PSSessionConfiguration|Set-PSSessionConfiguration|Unregister-PSSessionConfiguration|New-PSSessionOption|Add-PsSnapIn|Get-PsSnapin|Remove-PSSnapin|Get-Random|Read-Host|Remove-Item|Rename-Item|Rename-ItemProperty|Select-Object|Select-XML|Send-MailMessage|Get-Service|New-Service|Restart-Service|Resume-Service|Set-Service|Start-Service|Stop-Service|Suspend-Service|Sort-Object|Start-Sleep|ConvertFrom-StringData|Select-String|Tee-Object|New-Timespan|Trace-Command|Get-Tracesource|Set-Tracesource|Start-Transaction|Complete-Transaction|Get-Transaction|Use-Transaction|Undo-Transaction|Start-Transcript|Stop-Transcript|Add-Type|Update-TypeData|Get-Uiculture|Get-Unique|Update-Formatdata|Update-Typedata|Clear-Variable|Get-Variable|New-Variable|Remove-Variable|Set-Variable|New-WebServiceProxy|Where-Object|Write-Debug|Write-Error|Write-Host|Write-Output|Write-Progress|Write-Verbose|Write-Warning|Set-WmiInstance|Invoke-WmiMethod|Get-WmiObject|Remove-WmiObject|Connect-WSMan|Disconnect-WSMan|Test-WSMan|Invoke-WSManAction|Disable-WSManCredSSP|Enable-WSManCredSSP|Get-WSManCredSSP|New-WSManInstance|Get-WSManInstance|Set-WSManInstance|Remove-WSManInstance|Set-WSManQuickConfig|New-WSManSessionOption",
                keyword: "function|if|else|elseif|switch|while|default|for|do|until|break|continue|foreach|return|filter|in|trap|throw|param|begin|process|end"}, "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$\\-]*\\b"},
            {token: "keyword.operator", regex: "\\-(?:eq|ne|ge|gt|lt|le|like|notlike|match|notmatch|replace|contains|notcontains|ieq|ine|ige|igt|ile|ilt|ilike|inotlike|imatch|inotmatch|ireplace|icontains|inotcontains|is|isnot|as|and|or|band|bor|not)"},
            {token: "keyword.operator", regex: "&|\\*|\\+|\\-|\\=|\\+=|\\-="},
            {token: "lparen",
                regex: "[[({]"},
            {token: "rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: ".*?\\*\\/", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ]}
    };
    i.inherits(e, f);
    j.PowershellHighlightRules = e
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