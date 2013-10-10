﻿CKEDITOR.dialog.add("pbckcodeDialog", function (b) {
    var e = document.getElementsByTagName("HEAD").item(0), c = document.createElement("script");
    c.type = "text/javascript";
    c.src = CKEDITOR.plugins.getPath("pbckcode") + "dialogs/ace/ace.js";
    e.appendChild(c);
    c = document.createElement("link");
    c.rel = "stylesheet";
    c.type = "text/css";
    c.href = CKEDITOR.plugins.getPath("pbckcode") + "dialogs/style.css";
    c.media = "all";
    e.appendChild(c);
    void 0 == b.config.pbckcode.cls && (b.config.pbckcode.cls = "prettyprint linenums");
    void 0 == b.config.pbckcode.modes &&
    (b.config.pbckcode.modes = [
        ["PHP", "php"],
        ["HTML", "html"],
        ["CSS", "css"]
    ]);
    void 0 == b.config.pbckcode.defaultMode && (b.config.pbckcode.defaultMode = b.config.pbckcode.modes[0][1]);
    void 0 == b.config.pbckcode.theme && (b.config.pbckcode.theme = "textmate");
    var d;
    return{title: b.lang.pbckcode.title, minWidth: 600, minHeight: 400, contents: [
        {id: "code-container", label: b.lang.pbckcode.tabCode, elements: [
            {type: "select", id: "code-select", items: b.config.pbckcode.modes, defaultMode: b.config.pbckcode.defaultMode, setup: function (a) {
                this.setValue(a.getAttribute("data-language"))
            },
                commit: function (a) {
                    a.setAttribute("data-language", this.getValue())
                }, onChange: function () {
                d.getSession().setMode("ace/mode/" + this.getValue())
            }},
            {type: "html", html: '<div id="code"></div>', setup: function (a) {
                code = a.getHtml();
                code = code.replace(RegExp("<br/>", "g"), "\n");
                code = code.replace(RegExp("<br>", "g"), "\n");
                code = code.replace(RegExp("&lt;", "g"), "<");
                code = code.replace(RegExp("&gt;", "g"), ">");
                code = code.replace(RegExp("&amp;", "g"), "&");
                d.setValue(code)
            }, commit: function (a) {
                a.setText(d.getValue())
            }}
        ]}
    ], onLoad: function () {
        var a =
            document.getElementById("code");
        a.style.width = "600px";
        a.style.height = "380px";
        a.style.position = "relative";
        d = ace.edit("code");
        d.getSession().setMode("ace/mode/" + b.config.pbckcode.defaultMode);
        d.setTheme("ace/theme/" + b.config.pbckcode.theme)
    }, onShow: function () {
        var a = b.getSelection().getStartElement();
        a && (a = a.getAscendant("pre", true));
        if (!a || a.getName() != "pre") {
            a = b.document.createElement("pre");
            this.insertMode = true
        } else this.insertMode = false;
        this.element = a;
        d.setValue("");
        this.insertMode || this.setupContent(this.element)
    },
        onOk: function () {
            var a = this.element;
            this.commitContent(a);
            if (this.insertMode) {
                a.setAttribute("class", b.config.pbckcode.cls);
                b.insertElement(a)
            }
        }}
});