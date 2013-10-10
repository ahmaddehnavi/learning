﻿define("ace/keyboard/emacs", "require exports module ace/lib/dom ace/keyboard/hash_handler ace/lib/keys".split(" "), function (g, d) {
    var h = g("../lib/dom"), l = function (a, b) {
        var c = this.scroller.getBoundingClientRect(), k = Math.floor((a + this.scrollLeft - c.left - this.$padding - h.getPageScrollLeft()) / this.characterWidth);
        return this.session.screenToDocumentPosition(Math.floor((b + this.scrollTop - c.top - h.getPageScrollTop()) / this.lineHeight), k)
    }, f = g("./hash_handler").HashHandler;
    d.handler = new f;
    var j = false;
    d.handler.attach =
        function (a) {
            j || (j = true, h.importCssString("            .emacs-mode .ace_cursor{                border: 2px rgba(50,250,50,0.8) solid!important;                -moz-box-sizing: border-box!important;                box-sizing: border-box!important;                background-color: rgba(0,250,0,0.9);                opacity: 0.5;            }            .emacs-mode .ace_cursor.ace_hidden{                opacity: 1;                background-color: transparent;            }            .emacs-mode .ace_cursor.ace_overwrite {                opacity: 1;                background-color: transparent;                border-width: 0 0 2px 2px !important;            }            .emacs-mode .ace_text-layer {                z-index: 4            }            .emacs-mode .ace_cursor-layer {                z-index: 2            }",
                "emacsMode"));
            a.renderer.screenToTextCoordinates = l;
            a.setStyle("emacs-mode")
        };
    d.handler.detach = function (a) {
        delete a.renderer.screenToTextCoordinates;
        a.unsetStyle("emacs-mode")
    };
    var m = g("../lib/keys").KEY_MODS, i = {C: "ctrl", S: "shift", M: "alt"};
    ["S-C-M", "S-C", "S-M", "C-M", "S", "C", "M"].forEach(function (a) {
        var b = 0;
        a.split("-").forEach(function (a) {
            b = b | m[i[a]]
        });
        i[b] = a.toLowerCase() + "-"
    });
    d.handler.bindKey = function (a, b) {
        if (a) {
            var c = this.commmandKeyBinding;
            a.split("|").forEach(function (a) {
                a = a.toLowerCase();
                c[a] =
                    b;
                a = a.split(" ")[0];
                c[a] || (c[a] = "null")
            }, this)
        }
    };
    d.handler.handleKeyboard = function (a, b, c) {
        if (b == -1 && a.count) {
            c = Array(a.count + 1).join(c);
            return a.count = null, {command: "insertstring", args: c}
        }
        if (c != "\x00") {
            b = i[b];
            if (b == "c-" || a.universalArgument) {
                var d = parseInt(c[c.length - 1]);
                if (d)return a.count = d, {command: "null"}
            }
            a.universalArgument = false;
            b && (c = b + c);
            a.keyChain && (c = a.keyChain = a.keyChain + (" " + c));
            var e = this.commmandKeyBinding[c];
            a.keyChain = e == "null" ? c : "";
            if (e) {
                if (e == "null")return{command: "null"};
                if (e ==
                    "universalArgument")return a.universalArgument = true, {command: "null"};
                if (typeof e != "string")var f = e.args, e = e.command;
                typeof e == "string" && (e = this.commands[e] || a.editor.commands.commands[e]);
                !e.readonly && !e.isYank && (a.lastCommand = null);
                if (a.count) {
                    d = a.count;
                    return a.count = 0, {args: f, command: {exec: function (a, b) {
                        for (var c = 0; c < d; c++)e.exec(a, b)
                    }}}
                }
                return{command: e, args: f}
            }
        }
    };
    d.emacsKeys = {"Up|C-p": "golineup", "Down|C-n": "golinedown", "Left|C-b": "gotoleft", "Right|C-f": "gotoright", "C-Left|M-b": "gotowordleft",
        "C-Right|M-f": "gotowordright", "Home|C-a": "gotolinestart", "End|C-e": "gotolineend", "C-Home|S-M-,": "gotostart", "C-End|S-M-.": "gotoend", "S-Up|S-C-p": "selectup", "S-Down|S-C-n": "selectdown", "S-Left|S-C-b": "selectleft", "S-Right|S-C-f": "selectright", "S-C-Left|S-M-b": "selectwordleft", "S-C-Right|S-M-f": "selectwordright", "S-Home|S-C-a": "selecttolinestart", "S-End|S-C-e": "selecttolineend", "S-C-Home": "selecttostart", "S-C-End": "selecttoend", "C-l": "recenterTopBottom", "M-s": "centerselection", "M-g": "gotoline", "C-x C-p": "selectall",
        "C-Down": "gotopagedown", "C-Up": "gotopageup", "PageDown|C-v": "gotopagedown", "PageUp|M-v": "gotopageup", "S-C-Down": "selectpagedown", "S-C-Up": "selectpageup", "C-s": "findnext", "C-r": "findprevious", "M-C-s": "findnext", "M-C-r": "findprevious", "S-M-5": "replace", Backspace: "backspace", "Delete|C-d": "del", "Return|C-m": {command: "insertstring", args: "\n"}, "C-o": "splitline", "M-d|C-Delete": {command: "killWord", args: "right"}, "C-Backspace|M-Backspace|M-Delete": {command: "killWord", args: "left"}, "C-k": "killLine", "C-y|S-Delete": "yank",
        "M-y": "yankRotate", "C-g": "keyboardQuit", "C-w": "killRegion", "M-w": "killRingSave", "C-Space": "setMark", "C-x C-x": "exchangePointAndMark", "C-t": "transposeletters", "M-u": "touppercase", "M-l": "tolowercase", "M-/": "autocomplete", "C-u": "universalArgument", "M-;": "togglecomment", "C-/|C-x u|S-C--|C-z": "undo", "S-C-/|S-C-x u|C--|S-C-z": "redo", "C-x r": "selectRectangularRegion"};
    d.handler.bindKeys(d.emacsKeys);
    d.handler.addCommands({recenterTopBottom: function (a) {
        var b = a.renderer, c = b.$cursorLayer.getPixelPosition(),
            d = b.$size.scrollerHeight - b.lineHeight, b = b.scrollTop;
        Math.abs(c.top - b) < 2 ? b = c.top - d : Math.abs(c.top - b - d * 0.5) < 2 ? b = c.top : b = c.top - d * 0.5;
        a.session.setScrollTop(b)
    }, selectRectangularRegion: function (a) {
        a.multiSelect.toggleBlockSelection()
    }, setMark: function () {
    }, exchangePointAndMark: {exec: function (a) {
        var b = a.selection.getRange();
        a.selection.setSelectionRange(b, !a.selection.isBackwards())
    }, readonly: true, multiselectAction: "forEach"}, killWord: {exec: function (a, b) {
        a.clearSelection();
        b == "left" ? a.selection.selectWordLeft() :
            a.selection.selectWordRight();
        var c = a.getSelectionRange(), f = a.session.getTextRange(c);
        d.killRing.add(f);
        a.session.remove(c);
        a.clearSelection()
    }, multiselectAction: "forEach"}, killLine: function (a) {
        a.selection.selectLine();
        var b = a.getSelectionRange(), c = a.session.getTextRange(b);
        d.killRing.add(c);
        a.session.remove(b);
        a.clearSelection()
    }, yank: function (a) {
        a.onPaste(d.killRing.get());
        a.keyBinding.$data.lastCommand = "yank"
    }, yankRotate: function (a) {
        if (a.keyBinding.$data.lastCommand == "yank") {
            a.undo();
            a.onPaste(d.killRing.rotate());
            a.keyBinding.$data.lastCommand = "yank"
        }
    }, killRegion: function (a) {
        d.killRing.add(a.getCopyText());
        a.commands.byName.cut.exec(a)
    }, killRingSave: function (a) {
        d.killRing.add(a.getCopyText())
    }});
    f = d.handler.commands;
    f.yank.isYank = true;
    f.yankRotate.isYank = true;
    d.killRing = {$data: [], add: function (a) {
        a && this.$data.push(a);
        this.$data.length > 30 && this.$data.shift()
    }, get: function () {
        return this.$data[this.$data.length - 1] || ""
    }, pop: function () {
        return this.$data.length > 1 && this.$data.pop(), this.get()
    }, rotate: function () {
        return this.$data.unshift(this.$data.pop()),
            this.get()
    }}
});