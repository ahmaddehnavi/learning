﻿(function () {
    function j(b) {
        var g = function (b, g) {
            return a("", b, g)
        }, c = h;
        b && (h[b] || (h[b] = {}), c = h[b]);
        if (!c.define || !c.define.packaged)e.original = c.define, c.define = e, c.define.packaged = !0;
        if (!c.require || !c.require.packaged)a.original = c.require, c.require = g, c.require.packaged = !0
    }

    var h = function () {
        return this
    }();
    if ("undefined" != typeof requirejs) {
        var f = h.define;
        h.define = function (b, g, c) {
            return"function" != typeof c ? f.apply(this, arguments) : f(b, g, function (b, a, d) {
                return"module" == g[2] && (d.packaged = !0), c.apply(this,
                    arguments)
            })
        };
        h.define.packaged = !0
    } else {
        var e = function (b, g, c) {
            "string" != typeof b ? e.original ? e.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace()) : (2 == arguments.length && (c = g), e.modules || (e.modules = {}), e.modules[b] = c)
        }, a = function (b, g, d) {
            if ("[object Array]" === Object.prototype.toString.call(g)) {
                for (var e = [], i = 0, m = g.length; i < m; ++i) {
                    var f = c(b, g[i]);
                    if (!f && a.original)return a.original.apply(window, arguments);
                    e.push(f)
                }
                d && d.apply(null, e)
            } else {
                if ("string" == typeof g)return e = c(b, g), !e && a.original ? a.original.apply(window, arguments) : (d && d(), e);
                if (a.original)return a.original.apply(window, arguments)
            }
        }, d = function (b, c) {
            if (-1 !== c.indexOf("!")) {
                var a = c.split("!");
                return d(b, a[0]) + "!" + d(b, a[1])
            }
            if ("." == c.charAt(0))for (c = b.split("/").slice(0, -1).join("/") + "/" + c; -1 !== c.indexOf(".") && a != c;)a = c, c = c.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
            return c
        }, c = function (b, c) {
            var c = d(b, c), k = e.modules[c];
            if (!k)return null;
            if ("function" == typeof k) {
                var l = {}, i = {id: c,
                    uri: "", exports: l, packaged: !0};
                return l = k(function (b, d) {
                    return a(c, b, d)
                }, l, i) || i.exports, e.modules[c] = l, l
            }
            return k
        };
        j("")
    }
})();
define("ace/ace", "require exports module ace/lib/fixoldbrowsers ace/lib/dom ace/lib/event ace/editor ace/edit_session ace/undomanager ace/virtual_renderer ace/multi_select ace/worker/worker_client ace/keyboard/hash_handler ace/keyboard/state_handler ace/placeholder ace/config ace/theme/textmate".split(" "), function (j, h) {
    j("./lib/fixoldbrowsers");
    var f = j("./lib/dom"), e = j("./lib/event"), a = j("./editor").Editor, d = j("./edit_session").EditSession, c = j("./undomanager").UndoManager, b = j("./virtual_renderer").VirtualRenderer,
        g = j("./multi_select").MultiSelect;
    j("./worker/worker_client");
    j("./keyboard/hash_handler");
    j("./keyboard/state_handler");
    j("./placeholder");
    h.config = j("./config");
    h.edit = function (k) {
        if (typeof k == "string") {
            var l = k;
            (k = document.getElementById(k)) || console.log("can't match div #" + l)
        }
        if (k.env && k.env.editor instanceof a)return k.env.editor;
        l = new d(f.getInnerText(k));
        l.setUndoManager(new c);
        k.innerHTML = "";
        var i = new a(new b(k, j("./theme/textmate")));
        new g(i);
        i.setSession(l);
        var m = {};
        return m.document = l, m.editor =
            i, i.resize(), e.addListener(window, "resize", function () {
            i.resize()
        }), k.env = m, i.env = m, i
    }
});
define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function (j) {
    j("./regexp");
    j("./es5-shim")
});
define("ace/lib/regexp", ["require", "exports", "module"], function () {
    function j(c, b, a) {
        if (Array.prototype.indexOf)return c.indexOf(b, a);
        for (a = a || 0; a < c.length; a++)if (c[a] === b)return a;
        return-1
    }

    var h = RegExp.prototype.exec, f = RegExp.prototype.test, e = String.prototype.replace, a = void 0 === h.call(/()??/, "")[1], d = function () {
        var c = /^/g;
        return f.call(c, ""), !c.lastIndex
    }();
    if (!d || !a)RegExp.prototype.exec = function (c) {
        var b = h.apply(this, arguments), g;
        if ("string" == typeof c && b) {
            !a && 1 < b.length && -1 < j(b, "") && (g = RegExp(this.source,
                e.call((this.global ? "g" : "") + (this.ignoreCase ? "i" : "") + (this.multiline ? "m" : "") + (this.extended ? "x" : "") + (this.sticky ? "y" : ""), "g", "")), e.call(c.slice(b.index), g, function () {
                for (var c = 1; c < arguments.length - 2; c++)void 0 === arguments[c] && (b[c] = void 0)
            }));
            if (this._xregexp && this._xregexp.captureNames)for (var k = 1; k < b.length; k++)(g = this._xregexp.captureNames[k - 1]) && (b[g] = b[k]);
            !d && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--
        }
        return b
    }, d || (RegExp.prototype.test = function (c) {
        c = h.call(this, c);
        return c && this.global && !c[0].length && this.lastIndex > c.index && this.lastIndex--, !!c
    })
});
define("ace/lib/es5-shim", ["require", "exports", "module"], function () {
    function j(b) {
        try {
            return Object.defineProperty(b, "sentinel", {}), "sentinel"in b
        } catch (c) {
        }
    }

    Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if ("function" != typeof c)throw new TypeError;
        var a = e.call(arguments, 1), g = function () {
            if (this instanceof g) {
                var d = function () {
                };
                d.prototype = c.prototype;
                var d = new d, o = c.apply(d, a.concat(e.call(arguments)));
                return null !== o && Object(o) === o ? o : d
            }
            return c.apply(b, a.concat(e.call(arguments)))
        };
        return g
    });
    var h = Function.prototype.call, f = Object.prototype, e = Array.prototype.slice, a = h.bind(f.toString), d = h.bind(f.hasOwnProperty), c, b, g, k, l;
    if (l = d(f, "__defineGetter__"))c = h.bind(f.__defineGetter__), b = h.bind(f.__defineSetter__), g = h.bind(f.__lookupGetter__), k = h.bind(f.__lookupSetter__);
    Array.isArray || (Array.isArray = function (b) {
        return"[object Array]" == a(b)
    });
    Array.prototype.forEach || (Array.prototype.forEach = function (b, c) {
        var g = t(this), d = 0, o = g.length >>> 0;
        if ("[object Function]" != a(b))throw new TypeError;
        for (; d < o;)d in g && b.call(c, g[d], d, g), d++
    });
    Array.prototype.map || (Array.prototype.map = function (b, c) {
        var g = t(this), d = g.length >>> 0, o = Array(d);
        if ("[object Function]" != a(b))throw new TypeError;
        for (var k = 0; k < d; k++)k in g && (o[k] = b.call(c, g[k], k, g));
        return o
    });
    Array.prototype.filter || (Array.prototype.filter = function (b, c) {
        var g = t(this), d = g.length >>> 0, o = [];
        if ("[object Function]" != a(b))throw new TypeError;
        for (var k = 0; k < d; k++)k in g && b.call(c, g[k], k, g) && o.push(g[k]);
        return o
    });
    Array.prototype.every || (Array.prototype.every =
        function (b, c) {
            var g = t(this), d = g.length >>> 0;
            if ("[object Function]" != a(b))throw new TypeError;
            for (var k = 0; k < d; k++)if (k in g && !b.call(c, g[k], k, g))return!1;
            return!0
        });
    Array.prototype.some || (Array.prototype.some = function (b, c) {
        var g = t(this), d = g.length >>> 0;
        if ("[object Function]" != a(b))throw new TypeError;
        for (var k = 0; k < d; k++)if (k in g && b.call(c, g[k], k, g))return!0;
        return!1
    });
    Array.prototype.reduce || (Array.prototype.reduce = function (b) {
        var c = t(this), g = c.length >>> 0;
        if ("[object Function]" != a(b))throw new TypeError;
        if (!g && 1 == arguments.length)throw new TypeError;
        var d = 0, k;
        if (2 <= arguments.length)k = arguments[1]; else {
            do {
                if (d in c) {
                    k = c[d++];
                    break
                }
                if (++d >= g)throw new TypeError;
            } while (1)
        }
        for (; d < g; d++)d in c && (k = b.call(void 0, k, c[d], d, c));
        return k
    });
    Array.prototype.reduceRight || (Array.prototype.reduceRight = function (b) {
        var c = t(this), g = c.length >>> 0;
        if ("[object Function]" != a(b))throw new TypeError;
        if (!g && 1 == arguments.length)throw new TypeError;
        var d, g = g - 1;
        if (2 <= arguments.length)d = arguments[1]; else {
            do {
                if (g in c) {
                    d = c[g--];
                    break
                }
                if (0 > --g)throw new TypeError;
            } while (1)
        }
        do g in this && (d = b.call(void 0, d, c[g], g, c)); while (g--);
        return d
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function (b) {
        var c = t(this), g = c.length >>> 0;
        if (!g)return-1;
        var a = 0;
        1 < arguments.length && (a = u(arguments[1]));
        for (a = 0 <= a ? a : Math.max(0, g + a); a < g; a++)if (a in c && c[a] === b)return a;
        return-1
    });
    Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (b) {
        var c = t(this), a = c.length >>> 0;
        if (!a)return-1;
        var g = a - 1;
        1 < arguments.length && (g = Math.min(g, u(arguments[1])));
        for (g = 0 <= g ? g : a - Math.abs(g); 0 <= g; g--)if (g in c && b === c[g])return g;
        return-1
    });
    Object.getPrototypeOf || (Object.getPrototypeOf = function (b) {
        return b.__proto__ || (b.constructor ? b.constructor.prototype : f)
    });
    Object.getOwnPropertyDescriptor || (Object.getOwnPropertyDescriptor = function (b, c) {
        if ("object" != typeof b && "function" != typeof b || null === b)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + b);
        if (d(b, c)) {
            var a, o, n;
            a = {enumerable: !0, configurable: !0};
            if (l) {
                var i = b.__proto__;
                b.__proto__ =
                    f;
                o = g(b, c);
                n = k(b, c);
                b.__proto__ = i;
                if (o || n)return o && (a.get = o), n && (a.set = n), a
            }
            return a.value = b[c], a
        }
    });
    Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (b) {
        return Object.keys(b)
    });
    Object.create || (Object.create = function (b, c) {
        var a;
        if (b === null)a = {__proto__: null}; else {
            if (typeof b != "object")throw new TypeError("typeof prototype[" + typeof b + "] != 'object'");
            a = function () {
            };
            a.prototype = b;
            a = new a;
            a.__proto__ = b
        }
        return c !== void 0 && Object.defineProperties(a, c), a
    });
    if (Object.defineProperty) {
        var h =
            j({}), i = "undefined" == typeof document || j(document.createElement("div"));
        if (!h || !i)var m = Object.defineProperty
    }
    if (!Object.defineProperty || m)Object.defineProperty = function (a, o, n) {
        if (typeof a != "object" && typeof a != "function" || a === null)throw new TypeError("Object.defineProperty called on non-object: " + a);
        if (typeof n != "object" && typeof n != "function" || n === null)throw new TypeError("Property description must be an object: " + n);
        if (m)try {
            return m.call(Object, a, o, n)
        } catch (i) {
        }
        if (d(n, "value"))if (l && (g(a, o) || k(a,
            o))) {
            var e = a.__proto__;
            a.__proto__ = f;
            delete a[o];
            a[o] = n.value;
            a.__proto__ = e
        } else a[o] = n.value; else {
            if (!l)throw new TypeError("getters & setters can not be defined on this javascript engine");
            d(n, "get") && c(a, o, n.get);
            d(n, "set") && b(a, o, n.set)
        }
        return a
    };
    Object.defineProperties || (Object.defineProperties = function (b, c) {
        for (var a in c)d(c, a) && Object.defineProperty(b, a, c[a]);
        return b
    });
    Object.seal || (Object.seal = function (b) {
        return b
    });
    Object.freeze || (Object.freeze = function (b) {
        return b
    });
    try {
        Object.freeze(function () {
        })
    } catch (p) {
        Object.freeze =
            function (b) {
                return function (c) {
                    return typeof c == "function" ? c : b(c)
                }
            }(Object.freeze)
    }
    Object.preventExtensions || (Object.preventExtensions = function (b) {
        return b
    });
    Object.isSealed || (Object.isSealed = function () {
        return false
    });
    Object.isFrozen || (Object.isFrozen = function () {
        return false
    });
    Object.isExtensible || (Object.isExtensible = function (b) {
        if (Object(b) === b)throw new TypeError;
        for (var c = ""; d(b, c);)c = c + "?";
        b[c] = true;
        var a = d(b, c);
        return delete b[c], a
    });
    if (!Object.keys) {
        var s = !0, q = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
            n = q.length, r;
        for (r in{toString: null})s = !1;
        Object.keys = function (b) {
            if (typeof b != "object" && typeof b != "function" || b === null)throw new TypeError("Object.keys called on a non-object");
            var c = [], a;
            for (a in b)d(b, a) && c.push(a);
            if (s)for (a = 0; a < n; a++) {
                var g = q[a];
                d(b, g) && c.push(g)
            }
            return c
        }
    }
    if (!Date.prototype.toISOString || -1 === (new Date(-621987552E5)).toISOString().indexOf("-000001"))Date.prototype.toISOString = function () {
        var b, c, a, g;
        if (!isFinite(this))throw new RangeError;
        b = [this.getUTCMonth() + 1, this.getUTCDate(),
            this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
        g = this.getUTCFullYear();
        g = (g < 0 ? "-" : g > 9999 ? "+" : "") + ("00000" + Math.abs(g)).slice(0 <= g && g <= 9999 ? -4 : -6);
        for (c = b.length; c--;) {
            a = b[c];
            a < 10 && (b[c] = "0" + a)
        }
        return g + "-" + b.slice(0, 2).join("-") + "T" + b.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
    };
    Date.now || (Date.now = function () {
        return(new Date).getTime()
    });
    Date.prototype.toJSON || (Date.prototype.toJSON = function () {
        if (typeof this.toISOString != "function")throw new TypeError;
        return this.toISOString()
    });
    864E13 !== Date.parse("+275760-09-13T00:00:00.000Z") && (Date = function (b) {
        var c = function y(c, a, g, d, k, o, n) {
                var i = arguments.length;
                if (this instanceof b) {
                    i = i == 1 && "" + c === c ? new b(y.parse(c)) : i >= 7 ? new b(c, a, g, d, k, o, n) : i >= 6 ? new b(c, a, g, d, k, o) : i >= 5 ? new b(c, a, g, d, k) : i >= 4 ? new b(c, a, g, d) : i >= 3 ? new b(c, a, g) : i >= 2 ? new b(c, a) : i >= 1 ? new b(c) : new b;
                    return i.constructor = y, i
                }
                return b.apply(this, arguments)
            }, a = RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
            g;
        for (g in b)c[g] = b[g];
        return c.now = b.now, c.UTC = b.UTC, c.prototype = b.prototype, c.prototype.constructor = c, c.parse = function (c) {
            var g = a.exec(c);
            if (g) {
                g.shift();
                for (var d = 1; d < 7; d++) {
                    g[d] = +(g[d] || (d < 3 ? 1 : 0));
                    d == 1 && g[d]--
                }
                var k = +g.pop(), o = +g.pop(), n = g.pop(), d = 0;
                if (n) {
                    if (o > 23 || k > 59)return NaN;
                    d = (o * 60 + k) * 6E4 * (n == "+" ? -1 : 1)
                }
                k = +g[0];
                return 0 <= k && k <= 99 ? (g[0] = k + 400, b.UTC.apply(this, g) + d - 126227808E5) : b.UTC.apply(this, g) + d
            }
            return b.parse.apply(this, arguments)
        }, c
    }(Date));
    r = "\t\n\x0B\r   ᠎             　  ﻿";
    if (!String.prototype.trim ||
        r.trim()) {
        r = "[" + r + "]";
        var o = RegExp("^" + r + r + "*"), v = RegExp(r + r + "*$");
        String.prototype.trim = function () {
            return("" + this).replace(o, "").replace(v, "")
        }
    }
    var u = function (b) {
        return b = +b, b !== b ? b = 0 : b !== 0 && b !== 1 / 0 && b !== -Infinity && (b = (b > 0 || -1) * Math.floor(Math.abs(b))), b
    }, w = "a" != "a"[0], t = function (b) {
        if (b == null)throw new TypeError;
        return w && typeof b == "string" && b ? b.split("") : Object(b)
    }
});
define("ace/lib/dom", ["require", "exports", "module"], function (j, h) {
    h.createElement = function (f, e) {
        return document.createElementNS ? document.createElementNS(e || "http://www.w3.org/1999/xhtml", f) : document.createElement(f)
    };
    h.setText = function (f, e) {
        void 0 !== f.innerText && (f.innerText = e);
        void 0 !== f.textContent && (f.textContent = e)
    };
    h.hasCssClass = function (f, e) {
        return-1 !== f.className.split(/\s+/g).indexOf(e)
    };
    h.addCssClass = function (f, e) {
        h.hasCssClass(f, e) || (f.className += " " + e)
    };
    h.removeCssClass = function (f, e) {
        for (var a =
            f.className.split(/\s+/g); ;) {
            var d = a.indexOf(e);
            if (-1 == d)break;
            a.splice(d, 1)
        }
        f.className = a.join(" ")
    };
    h.toggleCssClass = function (f, e) {
        for (var a = f.className.split(/\s+/g), d = !0; ;) {
            var c = a.indexOf(e);
            if (-1 == c)break;
            d = !1;
            a.splice(c, 1)
        }
        return d && a.push(e), f.className = a.join(" "), d
    };
    h.setCssClass = function (f, e, a) {
        a ? h.addCssClass(f, e) : h.removeCssClass(f, e)
    };
    h.hasCssString = function (f, e) {
        var a = 0, d, e = e || document;
        if (e.createStyleSheet && (d = e.styleSheets))for (; a < d.length;) {
            if (d[a++].owningElement.id === f)return!0
        } else if (d =
            e.getElementsByTagName("style"))for (; a < d.length;)if (d[a++].id === f)return!0;
        return!1
    };
    h.importCssString = function (f, e, a) {
        a = a || document;
        if (e && h.hasCssString(e, a))return null;
        var d;
        a.createStyleSheet ? (d = a.createStyleSheet(), d.cssText = f, e && (d.owningElement.id = e)) : (d = a.createElementNS ? a.createElementNS("http://www.w3.org/1999/xhtml", "style") : a.createElement("style"), d.appendChild(a.createTextNode(f)), e && (d.id = e), (a.getElementsByTagName("head")[0] || a.documentElement).appendChild(d))
    };
    h.importCssStylsheet =
        function (f, e) {
            if (e.createStyleSheet)e.createStyleSheet(f); else {
                var a = h.createElement("link");
                a.rel = "stylesheet";
                a.href = f;
                (e.getElementsByTagName("head")[0] || e.documentElement).appendChild(a)
            }
        };
    h.getInnerWidth = function (f) {
        return parseInt(h.computedStyle(f, "paddingLeft"), 10) + parseInt(h.computedStyle(f, "paddingRight"), 10) + f.clientWidth
    };
    h.getInnerHeight = function (f) {
        return parseInt(h.computedStyle(f, "paddingTop"), 10) + parseInt(h.computedStyle(f, "paddingBottom"), 10) + f.clientHeight
    };
    void 0 !== window.pageYOffset ?
        (h.getPageScrollTop = function () {
            return window.pageYOffset
        }, h.getPageScrollLeft = function () {
            return window.pageXOffset
        }) : (h.getPageScrollTop = function () {
        return document.body.scrollTop
    }, h.getPageScrollLeft = function () {
        return document.body.scrollLeft
    });
    window.getComputedStyle ? h.computedStyle = function (f, e) {
        return e ? (window.getComputedStyle(f, "") || {})[e] || "" : window.getComputedStyle(f, "") || {}
    } : h.computedStyle = function (f, e) {
        return e ? f.currentStyle[e] : f.currentStyle
    };
    h.scrollbarWidth = function (f) {
        var e = h.createElement("p");
        e.style.width = "100%";
        e.style.minWidth = "0px";
        e.style.height = "200px";
        var a = h.createElement("div"), d = a.style;
        d.position = "absolute";
        d.left = "-10000px";
        d.overflow = "hidden";
        d.width = "200px";
        d.minWidth = "0px";
        d.height = "150px";
        a.appendChild(e);
        f = f.body || f.documentElement;
        f.appendChild(a);
        var c = e.offsetWidth;
        d.overflow = "scroll";
        e = e.offsetWidth;
        return c == e && (e = a.clientWidth), f.removeChild(a), c - e
    };
    h.setInnerHtml = function (f, e) {
        var a = f.cloneNode(!1);
        return a.innerHTML = e, f.parentNode.replaceChild(a, f), a
    };
    h.setInnerText =
        function (f, e) {
            var a = f.ownerDocument;
            a.body && "textContent"in a.body ? f.textContent = e : f.innerText = e
        };
    h.getInnerText = function (f) {
        var e = f.ownerDocument;
        return e.body && "textContent"in e.body ? f.textContent : f.innerText || f.textContent || ""
    };
    h.getParentWindow = function (f) {
        return f.defaultView || f.parentWindow
    }
});
define("ace/lib/event", "require exports module ace/lib/keys ace/lib/useragent ace/lib/dom".split(" "), function (j, h) {
    function f(d, c, b) {
        var g = 0;
        !a.isOpera || "KeyboardEvent"in window || !a.isMac ? g = 0 | (c.ctrlKey ? 1 : 0) | (c.altKey ? 2 : 0) | (c.shiftKey ? 4 : 0) | (c.metaKey ? 8 : 0) : g = 0 | (c.metaKey ? 1 : 0) | (c.altKey ? 2 : 0) | (c.shiftKey ? 4 : 0) | (c.ctrlKey ? 8 : 0);
        if (b in e.MODIFIER_KEYS) {
            switch (e.MODIFIER_KEYS[b]) {
                case "Alt":
                    g = 2;
                    break;
                case "Shift":
                    g = 4;
                    break;
                case "Ctrl":
                    g = 1;
                    break;
                default:
                    g = 8
            }
            b = 0
        }
        return g & 8 && (b == 91 || b == 93) && (b = 0), g || b in e.FUNCTION_KEYS ||
            b in e.PRINTABLE_KEYS ? d(c, g, b) : false
    }

    var e = j("./keys"), a = j("./useragent");
    j("./dom");
    h.addListener = function (a, c, b) {
        if (a.addEventListener)return a.addEventListener(c, b, false);
        if (a.attachEvent) {
            var g = function () {
                b(window.event)
            };
            b._wrapper = g;
            a.attachEvent("on" + c, g)
        }
    };
    h.removeListener = function (a, c, b) {
        if (a.removeEventListener)return a.removeEventListener(c, b, false);
        a.detachEvent && a.detachEvent("on" + c, b._wrapper || b)
    };
    h.stopEvent = function (a) {
        return h.stopPropagation(a), h.preventDefault(a), false
    };
    h.stopPropagation =
        function (a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = true
        };
    h.preventDefault = function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = false
    };
    h.getButton = function (d) {
        return d.type == "dblclick" ? 0 : d.type == "contextmenu" || d.ctrlKey && a.isMac ? 2 : d.preventDefault ? d.button : {1: 0, 2: 2, 4: 1}[d.button]
    };
    document.documentElement.setCapture ? h.capture = function (a, c, b) {
        function g(e) {
            c(e);
            k || (k = true, b(e));
            h.removeListener(a, "mousemove", c);
            h.removeListener(a, "mouseup", g);
            h.removeListener(a, "losecapture",
                g);
            a.releaseCapture()
        }

        var k = false;
        h.addListener(a, "mousemove", c);
        h.addListener(a, "mouseup", g);
        h.addListener(a, "losecapture", g);
        a.setCapture()
    } : h.capture = function (a, c, b) {
        function g(a) {
            c && c(a);
            b && b(a);
            document.removeEventListener("mousemove", c, true);
            document.removeEventListener("mouseup", g, true);
            a.stopPropagation()
        }

        document.addEventListener("mousemove", c, true);
        document.addEventListener("mouseup", g, true)
    };
    h.addMouseWheelListener = function (a, c) {
        var b = function (b) {
            b.wheelDelta !== void 0 ? b.wheelDeltaX !== void 0 ?
                (b.wheelX = -b.wheelDeltaX / 8, b.wheelY = -b.wheelDeltaY / 8) : (b.wheelX = 0, b.wheelY = -b.wheelDelta / 8) : b.axis && b.axis == b.HORIZONTAL_AXIS ? (b.wheelX = (b.detail || 0) * 5, b.wheelY = 0) : (b.wheelX = 0, b.wheelY = (b.detail || 0) * 5);
            c(b)
        };
        h.addListener(a, "DOMMouseScroll", b);
        h.addListener(a, "mousewheel", b)
    };
    h.addMultiMouseDownListener = function (d, c, b, g) {
        var k = 0, e, i, f, p = {2: "dblclick", 3: "tripleclick", 4: "quadclick"};
        h.addListener(d, "mousedown", function (a) {
            if (h.getButton(a) != 0)k = 0; else {
                var d = Math.abs(a.clientX - e) > 5 || Math.abs(a.clientY -
                    i) > 5;
                if (!f || d)k = 0;
                k = k + 1;
                f && clearTimeout(f);
                f = setTimeout(function () {
                    f = null
                }, c[k - 1] || 600)
            }
            k == 1 && (e = a.clientX, i = a.clientY);
            b[g]("mousedown", a);
            if (k > 4)k = 0; else if (k > 1)return b[g](p[k], a)
        });
        a.isOldIE && h.addListener(d, "dblclick", function (a) {
            k = 2;
            f && clearTimeout(f);
            f = setTimeout(function () {
                f = null
            }, c[k - 1] || 600);
            b[g]("mousedown", a);
            b[g](p[k], a)
        })
    };
    h.addCommandKeyListener = function (d, c) {
        var b = h.addListener;
        if (a.isOldGecko || a.isOpera && !("KeyboardEvent"in window)) {
            var g = null;
            b(d, "keydown", function (b) {
                g = b.keyCode
            });
            b(d, "keypress", function (b) {
                return f(c, b, g)
            })
        } else b(d, "keydown", function (b) {
            return f(c, b, b.keyCode)
        })
    };
    h.nextTick = window.postMessage && !a.isOldIE ? function (a, c) {
        c = c || window;
        h.addListener(c, "message", function g(k) {
            k.data == "zero-timeout-message-1" && (h.stopPropagation(k), h.removeListener(c, "message", g), a())
        });
        c.postMessage("zero-timeout-message-1", "*")
    } : function (a) {
        window.setTimeout(a, 0)
    }
});
define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function (j, h) {
    var f = j("./oop"), e = function () {
        var a = {MODIFIER_KEYS: {16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta"}, KEY_MODS: {ctrl: 1, alt: 2, option: 2, shift: 4, meta: 8, command: 8}, FUNCTION_KEYS: {8: "Backspace", 9: "Tab", 13: "Return", 19: "Pause", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "Print", 45: "Insert", 46: "Delete", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99: "Numpad3", 100: "Numpad4", 101: "Numpad5",
            102: "Numpad6", 103: "Numpad7", 104: "Numpad8", 105: "Numpad9", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock", 145: "Scrolllock"}, PRINTABLE_KEYS: {32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 107: "+", 109: "-",
            110: ".", 188: ",", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"}}, d;
        for (d in a.FUNCTION_KEYS) {
            var c = a.FUNCTION_KEYS[d].toLowerCase();
            a[c] = parseInt(d, 10)
        }
        return f.mixin(a, a.MODIFIER_KEYS), f.mixin(a, a.PRINTABLE_KEYS), f.mixin(a, a.FUNCTION_KEYS), a.enter = a["return"], a.escape = a.esc, a.del = a["delete"], a[173] = "-", a
    }();
    f.mixin(h, e);
    h.keyCodeToString = function (a) {
        return(e[a] || String.fromCharCode(a)).toLowerCase()
    }
});
define("ace/lib/oop", ["require", "exports", "module"], function (j, h) {
    h.inherits = function () {
        var f = function () {
        };
        return function (e, a) {
            f.prototype = a.prototype;
            e.super_ = a.prototype;
            e.prototype = new f;
            e.prototype.constructor = e
        }
    }();
    h.mixin = function (f, e) {
        for (var a in e)f[a] = e[a]
    };
    h.implement = function (f, e) {
        h.mixin(f, e)
    }
});
define("ace/lib/useragent", ["require", "exports", "module"], function (j, h) {
    var f = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(), e = navigator.userAgent;
    h.isWin = "win" == f;
    h.isMac = "mac" == f;
    h.isLinux = "linux" == f;
    h.isIE = "Microsoft Internet Explorer" == navigator.appName && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]);
    h.isOldIE = h.isIE && 9 > h.isIE;
    h.isGecko = h.isMozilla = window.controllers && "Gecko" === window.navigator.product;
    h.isOldGecko = h.isGecko && 4 > parseInt((navigator.userAgent.match(/rv\:(\d+)/) ||
        [])[1], 10);
    h.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera);
    h.isWebKit = parseFloat(e.split("WebKit/")[1]) || void 0;
    h.isChrome = parseFloat(e.split(" Chrome/")[1]) || void 0;
    h.isAIR = 0 <= e.indexOf("AdobeAIR");
    h.isIPad = 0 <= e.indexOf("iPad");
    h.isTouchPad = 0 <= e.indexOf("TouchPad");
    h.OS = {LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS"};
    h.getOS = function () {
        return h.isMac ? h.OS.MAC : h.isLinux ? h.OS.LINUX : h.OS.WINDOWS
    }
});
define("ace/editor", "require exports module ace/lib/fixoldbrowsers ace/lib/oop ace/lib/lang ace/lib/useragent ace/keyboard/textinput ace/mouse/mouse_handler ace/mouse/fold_handler ace/keyboard/keybinding ace/edit_session ace/search ace/range ace/lib/event_emitter ace/commands/command_manager ace/commands/default_commands".split(" "), function (j, h) {
    j("./lib/fixoldbrowsers");
    var f = j("./lib/oop"), e = j("./lib/lang"), a = j("./lib/useragent"), d = j("./keyboard/textinput").TextInput, c = j("./mouse/mouse_handler").MouseHandler,
        b = j("./mouse/fold_handler").FoldHandler, g = j("./keyboard/keybinding").KeyBinding, k = j("./edit_session").EditSession, l = j("./search").Search, i = j("./range").Range, m = j("./lib/event_emitter").EventEmitter, p = j("./commands/command_manager").CommandManager, s = j("./commands/default_commands").commands, q = function (n, i) {
            this.container = n.getContainerElement();
            this.renderer = n;
            this.commands = new p(a.isMac ? "mac" : "win", s);
            this.textInput = new d(n.getTextAreaContainer(), this);
            this.renderer.textarea = this.textInput.getElement();
            this.keyBinding = new g(this);
            this.$mouseHandler = new c(this);
            new b(this);
            this.$blockScrolling = 0;
            this.$search = (new l).set({wrap: true});
            this.setSession(i || new k(""))
        };
    (function () {
        f.implement(this, m);
        this.setKeyboardHandler = function (b) {
            this.keyBinding.setKeyboardHandler(b)
        };
        this.getKeyboardHandler = function () {
            return this.keyBinding.getKeyboardHandler()
        };
        this.setSession = function (b) {
            if (this.session != b) {
                if (this.session) {
                    var a = this.session;
                    this.session.removeEventListener("change", this.$onDocumentChange);
                    this.session.removeEventListener("changeMode",
                        this.$onChangeMode);
                    this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
                    this.session.removeEventListener("changeTabSize", this.$onChangeTabSize);
                    this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit);
                    this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode);
                    this.session.removeEventListener("onChangeFold", this.$onChangeFold);
                    this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker);
                    this.session.removeEventListener("changeBackMarker",
                        this.$onChangeBackMarker);
                    this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint);
                    this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation);
                    this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
                    this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange);
                    this.session.removeEventListener("changeLeftTop", this.$onScrollLeftChange);
                    var c = this.session.getSelection();
                    c.removeEventListener("changeCursor", this.$onCursorChange);
                    c.removeEventListener("changeSelection",
                        this.$onSelectionChange)
                }
                this.session = b;
                this.$onDocumentChange = this.onDocumentChange.bind(this);
                b.addEventListener("change", this.$onDocumentChange);
                this.renderer.setSession(b);
                this.$onChangeMode = this.onChangeMode.bind(this);
                b.addEventListener("changeMode", this.$onChangeMode);
                this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
                b.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
                this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer);
                b.addEventListener("changeTabSize",
                    this.$onChangeTabSize);
                this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
                b.addEventListener("changeWrapLimit", this.$onChangeWrapLimit);
                this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
                b.addEventListener("changeWrapMode", this.$onChangeWrapMode);
                this.$onChangeFold = this.onChangeFold.bind(this);
                b.addEventListener("changeFold", this.$onChangeFold);
                this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
                this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker);
                this.$onChangeBackMarker =
                    this.onChangeBackMarker.bind(this);
                this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker);
                this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
                this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint);
                this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
                this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation);
                this.$onCursorChange = this.onCursorChange.bind(this);
                this.session.addEventListener("changeOverwrite", this.$onCursorChange);
                this.$onScrollTopChange = this.onScrollTopChange.bind(this);
                this.session.addEventListener("changeScrollTop", this.$onScrollTopChange);
                this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
                this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange);
                this.selection = b.getSelection();
                this.selection.addEventListener("changeCursor", this.$onCursorChange);
                this.$onSelectionChange = this.onSelectionChange.bind(this);
                this.selection.addEventListener("changeSelection", this.$onSelectionChange);
                this.onChangeMode();
                this.$blockScrolling = this.$blockScrolling + 1;
                this.onCursorChange();
                this.$blockScrolling = this.$blockScrolling - 1;
                this.onScrollTopChange();
                this.onScrollLeftChange();
                this.onSelectionChange();
                this.onChangeFrontMarker();
                this.onChangeBackMarker();
                this.onChangeBreakpoint();
                this.onChangeAnnotation();
                this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
                this.renderer.updateFull();
                this._emit("changeSession", {session: b, oldSession: a})
            }
        };
        this.getSession = function () {
            return this.session
        };
        this.setValue = function (b, a) {
            return this.session.doc.setValue(b), a ? a == 1 ? this.navigateFileEnd() : a == -1 && this.navigateFileStart() : this.selectAll(), b
        };
        this.getValue = function () {
            return this.session.getValue()
        };
        this.getSelection = function () {
            return this.selection
        };
        this.resize = function (b) {
            this.renderer.onResize(b)
        };
        this.setTheme = function (b) {
            this.renderer.setTheme(b)
        };
        this.getTheme = function () {
            return this.renderer.getTheme()
        };
        this.setStyle = function (b) {
            this.renderer.setStyle(b)
        };
        this.unsetStyle = function (b) {
            this.renderer.unsetStyle(b)
        };
        this.setFontSize = function (b) {
            this.container.style.fontSize = b;
            this.renderer.updateFontSize()
        };
        this.$highlightBrackets = function () {
            this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null);
            if (!this.$highlightPending) {
                var b = this;
                this.$highlightPending = true;
                setTimeout(function () {
                    b.$highlightPending = false;
                    var a = b.session.findMatchingBracket(b.getCursorPosition());
                    if (a) {
                        a = new i(a.row, a.column, a.row, a.column + 1);
                        b.session.$bracketHighlight =
                            b.session.addMarker(a, "ace_bracket", "text")
                    }
                }, 10)
            }
        };
        this.focus = function () {
            var b = this;
            setTimeout(function () {
                b.textInput.focus()
            });
            this.textInput.focus()
        };
        this.isFocused = function () {
            return this.textInput.isFocused()
        };
        this.blur = function () {
            this.textInput.blur()
        };
        this.onFocus = function () {
            if (!this.$isFocused) {
                this.$isFocused = true;
                this.renderer.showCursor();
                this.renderer.visualizeFocus();
                this._emit("focus")
            }
        };
        this.onBlur = function () {
            if (this.$isFocused) {
                this.$isFocused = false;
                this.renderer.hideCursor();
                this.renderer.visualizeBlur();
                this._emit("blur")
            }
        };
        this.$cursorChange = function () {
            this.renderer.updateCursor()
        };
        this.onDocumentChange = function (b) {
            var a = b.data, c = a.range, g;
            c.start.row == c.end.row && a.action != "insertLines" && a.action != "removeLines" ? g = c.end.row : g = Infinity;
            this.renderer.updateLines(c.start.row, g);
            this._emit("change", b);
            this.$cursorChange()
        };
        this.onTokenizerUpdate = function (b) {
            b = b.data;
            this.renderer.updateLines(b.first, b.last)
        };
        this.onScrollTopChange = function () {
            this.renderer.scrollToY(this.session.getScrollTop())
        };
        this.onScrollLeftChange =
            function () {
                this.renderer.scrollToX(this.session.getScrollLeft())
            };
        this.onCursorChange = function () {
            this.$cursorChange();
            this.$blockScrolling || this.renderer.scrollCursorIntoView();
            this.$highlightBrackets();
            this.$updateHighlightActiveLine();
            this._emit("changeSelection")
        };
        this.$updateHighlightActiveLine = function () {
            var b = this.getSession();
            b.$highlightLineMarker && b.removeMarker(b.$highlightLineMarker);
            b.$highlightLineMarker = null;
            if (this.$highlightActiveLine) {
                var a = this.getCursorPosition(), c = this.session.getFoldLine(a.row);
                if (this.getSelectionStyle() != "line" || !this.selection.isMultiLine()) {
                    var g;
                    c ? g = new i(c.start.row, 0, c.end.row + 1, 0) : g = new i(a.row, 0, a.row + 1, 0);
                    b.$highlightLineMarker = b.addMarker(g, "ace_active_line", "background")
                }
            }
        };
        this.onSelectionChange = function () {
            var b = this.session;
            b.$selectionMarker && b.removeMarker(b.$selectionMarker);
            b.$selectionMarker = null;
            if (this.selection.isEmpty())this.$updateHighlightActiveLine(); else {
                var a = this.selection.getRange(), c = this.getSelectionStyle();
                b.$selectionMarker = b.addMarker(a,
                    "ace_selection", c)
            }
            this.session.highlight(this.$highlightSelectedWord && this.$getSelectionHighLightRegexp());
            this._emit("changeSelection")
        };
        this.$getSelectionHighLightRegexp = function () {
            var b = this.session, a = this.getSelectionRange();
            if (!a.isEmpty() && !a.isMultiLine()) {
                var c = a.start.column - 1, g = a.end.column + 1, b = b.getLine(a.start.row), d = b.length, k = b.substring(Math.max(c, 0), Math.min(g, d));
                if (!(c >= 0 && /^[\w\d]/.test(k) || g <= d && /[\w\d]$/.test(k))) {
                    k = b.substring(a.start.column, a.end.column);
                    if (/^[\w\d]+$/.test(k))return this.$search.$assembleRegExp({wholeWord: true,
                        caseSensitive: true, needle: k})
                }
            }
        };
        this.onChangeFrontMarker = function () {
            this.renderer.updateFrontMarkers()
        };
        this.onChangeBackMarker = function () {
            this.renderer.updateBackMarkers()
        };
        this.onChangeBreakpoint = function () {
            this.renderer.updateBreakpoints()
        };
        this.onChangeAnnotation = function () {
            this.renderer.setAnnotations(this.session.getAnnotations())
        };
        this.onChangeMode = function () {
            this.renderer.updateText()
        };
        this.onChangeWrapLimit = function () {
            this.renderer.updateFull()
        };
        this.onChangeWrapMode = function () {
            this.renderer.onResize(true)
        };
        this.onChangeFold = function () {
            this.$updateHighlightActiveLine();
            this.renderer.updateFull()
        };
        this.getCopyText = function () {
            var b = "";
            return this.selection.isEmpty() || (b = this.session.getTextRange(this.getSelectionRange())), this._emit("copy", b), b
        };
        this.onCopy = function () {
            this.commands.exec("copy", this)
        };
        this.onCut = function () {
            this.commands.exec("cut", this)
        };
        this.onPaste = function (b) {
            if (!this.$readOnly) {
                this._emit("paste", b);
                this.insert(b)
            }
        };
        this.insert = function (b) {
            var a = this.session, c = a.getMode(), g = this.getCursorPosition();
            if (this.getBehavioursEnabled()) {
                var d = c.transformAction(a.getState(g.row), "insertion", this, a, b);
                d && (b = d.text)
            }
            b = b.replace("\t", this.session.getTabString());
            if (this.selection.isEmpty()) {
                if (this.session.getOverwrite()) {
                    var k = new i.fromPoints(g, g);
                    k.end.column = k.end.column + b.length;
                    this.session.remove(k)
                }
            } else {
                g = this.session.remove(this.getSelectionRange());
                this.clearSelection()
            }
            this.clearSelection();
            var e = g.column, k = a.getState(g.row), l = c.checkOutdent(k, a.getLine(g.row), b), f = a.getLine(g.row), m = c.getNextLineIndent(k,
                f.slice(0, g.column), a.getTabString()), p = a.insert(g, b);
            d && d.selection && (d.selection.length == 2 ? this.selection.setSelectionRange(new i(g.row, e + d.selection[0], g.row, e + d.selection[1])) : this.selection.setSelectionRange(new i(g.row + d.selection[0], d.selection[1], g.row + d.selection[2], d.selection[3])));
            k = a.getState(g.row);
            if (a.getDocument().isNewLine(b)) {
                this.moveCursorTo(g.row + 1, 0);
                b = a.getTabSize();
                d = Number.MAX_VALUE;
                for (e = g.row + 1; e <= p.row; ++e) {
                    for (var h = 0, f = a.getLine(e), s = 0; s < f.length; ++s)if (f.charAt(s) ==
                        "\t")h = h + b; else {
                        if (f.charAt(s) != " ")break;
                        h = h + 1
                    }
                    /[^\s]/.test(f) && (d = Math.min(h, d))
                }
                for (e = g.row + 1; e <= p.row; ++e) {
                    h = d;
                    f = a.getLine(e);
                    for (s = 0; s < f.length && h > 0; ++s)f.charAt(s) == "\t" ? h = h - b : f.charAt(s) == " " && (h = h - 1);
                    a.remove(new i(e, 0, e, s))
                }
                a.indentRows(g.row + 1, p.row, m)
            }
            l && c.autoOutdent(k, a, g.row)
        };
        this.onTextInput = function (b) {
            this.keyBinding.onTextInput(b)
        };
        this.onCommandKey = function (b, a, c) {
            this.keyBinding.onCommandKey(b, a, c)
        };
        this.setOverwrite = function (b) {
            this.session.setOverwrite(b)
        };
        this.getOverwrite =
            function () {
                return this.session.getOverwrite()
            };
        this.toggleOverwrite = function () {
            this.session.toggleOverwrite()
        };
        this.setScrollSpeed = function (b) {
            this.$mouseHandler.setScrollSpeed(b)
        };
        this.getScrollSpeed = function () {
            return this.$mouseHandler.getScrollSpeed()
        };
        this.setDragDelay = function (b) {
            this.$mouseHandler.setDragDelay(b)
        };
        this.getDragDelay = function () {
            return this.$mouseHandler.getDragDelay()
        };
        this.$selectionStyle = "line";
        this.setSelectionStyle = function (b) {
            if (this.$selectionStyle != b) {
                this.$selectionStyle =
                    b;
                this.onSelectionChange();
                this._emit("changeSelectionStyle", {data: b})
            }
        };
        this.getSelectionStyle = function () {
            return this.$selectionStyle
        };
        this.$highlightActiveLine = true;
        this.setHighlightActiveLine = function (b) {
            if (this.$highlightActiveLine != b) {
                this.$highlightActiveLine = b;
                this.$updateHighlightActiveLine()
            }
        };
        this.getHighlightActiveLine = function () {
            return this.$highlightActiveLine
        };
        this.$highlightGutterLine = true;
        this.setHighlightGutterLine = function (b) {
            if (this.$highlightGutterLine != b) {
                this.renderer.setHighlightGutterLine(b);
                this.$highlightGutterLine = b
            }
        };
        this.getHighlightGutterLine = function () {
            return this.$highlightGutterLine
        };
        this.$highlightSelectedWord = true;
        this.setHighlightSelectedWord = function (b) {
            if (this.$highlightSelectedWord != b) {
                this.$highlightSelectedWord = b;
                this.$onSelectionChange()
            }
        };
        this.getHighlightSelectedWord = function () {
            return this.$highlightSelectedWord
        };
        this.setAnimatedScroll = function (b) {
            this.renderer.setAnimatedScroll(b)
        };
        this.getAnimatedScroll = function () {
            return this.renderer.getAnimatedScroll()
        };
        this.setShowInvisibles =
            function (b) {
                this.renderer.setShowInvisibles(b)
            };
        this.getShowInvisibles = function () {
            return this.renderer.getShowInvisibles()
        };
        this.setDisplayIndentGuides = function (b) {
            this.renderer.setDisplayIndentGuides(b)
        };
        this.getDisplayIndentGuides = function () {
            return this.renderer.getDisplayIndentGuides()
        };
        this.setShowPrintMargin = function (b) {
            this.renderer.setShowPrintMargin(b)
        };
        this.getShowPrintMargin = function () {
            return this.renderer.getShowPrintMargin()
        };
        this.setPrintMarginColumn = function (b) {
            this.renderer.setPrintMarginColumn(b)
        };
        this.getPrintMarginColumn = function () {
            return this.renderer.getPrintMarginColumn()
        };
        this.$readOnly = false;
        this.setReadOnly = function (b) {
            this.$readOnly = b
        };
        this.getReadOnly = function () {
            return this.$readOnly
        };
        this.$modeBehaviours = true;
        this.setBehavioursEnabled = function (b) {
            this.$modeBehaviours = b
        };
        this.getBehavioursEnabled = function () {
            return this.$modeBehaviours
        };
        this.setShowFoldWidgets = function (b) {
            if (this.renderer.$gutterLayer.getShowFoldWidgets() != b) {
                this.renderer.$gutterLayer.setShowFoldWidgets(b);
                this.$showFoldWidgets =
                    b;
                this.renderer.updateFull()
            }
        };
        this.getShowFoldWidgets = function () {
            return this.renderer.$gutterLayer.getShowFoldWidgets()
        };
        this.setFadeFoldWidgets = function (b) {
            this.renderer.setFadeFoldWidgets(b)
        };
        this.getFadeFoldWidgets = function () {
            return this.renderer.getFadeFoldWidgets()
        };
        this.remove = function (b) {
            this.selection.isEmpty() && (b == "left" ? this.selection.selectLeft() : this.selection.selectRight());
            b = this.getSelectionRange();
            if (this.getBehavioursEnabled()) {
                var a = this.session, c = a.getState(b.start.row);
                (a = a.getMode().transformAction(c,
                    "deletion", this, a, b)) && (b = a)
            }
            this.session.remove(b);
            this.clearSelection()
        };
        this.removeWordRight = function () {
            this.selection.isEmpty() && this.selection.selectWordRight();
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        };
        this.removeWordLeft = function () {
            this.selection.isEmpty() && this.selection.selectWordLeft();
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        };
        this.removeToLineStart = function () {
            this.selection.isEmpty() && this.selection.selectLineStart();
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        };
        this.removeToLineEnd = function () {
            this.selection.isEmpty() && this.selection.selectLineEnd();
            var b = this.getSelectionRange();
            b.start.column == b.end.column && b.start.row == b.end.row && (b.end.column = 0, b.end.row++);
            this.session.remove(b);
            this.clearSelection()
        };
        this.splitLine = function () {
            this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
            var b = this.getCursorPosition();
            this.insert("\n");
            this.moveCursorToPosition(b)
        };
        this.transposeLetters = function () {
            if (this.selection.isEmpty()) {
                var b =
                    this.getCursorPosition(), a = b.column;
                if (a !== 0) {
                    var c = this.session.getLine(b.row), g, d;
                    a < c.length ? (g = c.charAt(a) + c.charAt(a - 1), d = new i(b.row, a - 1, b.row, a + 1)) : (g = c.charAt(a - 1) + c.charAt(a - 2), d = new i(b.row, a - 2, b.row, a));
                    this.session.replace(d, g)
                }
            }
        };
        this.toLowerCase = function () {
            var b = this.getSelectionRange();
            this.selection.isEmpty() && this.selection.selectWord();
            var a = this.getSelectionRange(), c = this.session.getTextRange(a);
            this.session.replace(a, c.toLowerCase());
            this.selection.setSelectionRange(b)
        };
        this.toUpperCase =
            function () {
                var b = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var a = this.getSelectionRange(), c = this.session.getTextRange(a);
                this.session.replace(a, c.toUpperCase());
                this.selection.setSelectionRange(b)
            };
        this.indent = function () {
            var b = this.session, a = this.getSelectionRange();
            if (!(a.start.row < a.end.row || a.start.column < a.end.column)) {
                if (this.session.getUseSoftTabs())var a = b.getTabSize(), c = this.getCursorPosition(), b = b.documentToScreenColumn(c.row, c.column), b = e.stringRepeat(" ",
                    a - b % a); else b = "\t";
                return this.insert(b)
            }
            a = this.$getSelectedRows();
            b.indentRows(a.first, a.last, "\t")
        };
        this.blockOutdent = function () {
            this.session.outdentRows(this.session.getSelection().getRange())
        };
        this.toggleCommentLines = function () {
            var b = this.session.getState(this.getCursorPosition().row), a = this.$getSelectedRows();
            this.session.getMode().toggleCommentLines(b, this.session, a.first, a.last)
        };
        this.removeLines = function () {
            var b = this.$getSelectedRows(), a;
            b.first === 0 || b.last + 1 < this.session.getLength() ? a = new i(b.first,
                0, b.last + 1, 0) : a = new i(b.first - 1, this.session.getLine(b.first - 1).length, b.last, this.session.getLine(b.last).length);
            this.session.remove(a);
            this.clearSelection()
        };
        this.duplicateSelection = function () {
            var b = this.selection, a = this.session, c = b.getRange();
            if (c.isEmpty()) {
                b = c.start.row;
                a.duplicateLines(b, b)
            } else {
                var g = b.isBackwards(), d = b.isBackwards() ? c.start : c.end, a = a.insert(d, a.getTextRange(c), false);
                c.start = d;
                c.end = a;
                b.setSelectionRange(c, g)
            }
        };
        this.moveLinesDown = function () {
            this.$moveLines(function (b, a) {
                return this.session.moveLinesDown(b,
                    a)
            })
        };
        this.moveLinesUp = function () {
            this.$moveLines(function (b, a) {
                return this.session.moveLinesUp(b, a)
            })
        };
        this.moveText = function (b, a) {
            return this.$readOnly ? null : this.session.moveText(b, a)
        };
        this.copyLinesUp = function () {
            this.$moveLines(function (b, a) {
                return this.session.duplicateLines(b, a), 0
            })
        };
        this.copyLinesDown = function () {
            this.$moveLines(function (b, a) {
                return this.session.duplicateLines(b, a)
            })
        };
        this.$moveLines = function (b) {
            var a = this.$getSelectedRows(), c = this.selection;
            if (!c.isMultiLine())var g = c.getRange(),
                d = c.isBackwards();
            var k = b.call(this, a.first, a.last);
            g ? (g.start.row = g.start.row + k, g.end.row = g.end.row + k, c.setSelectionRange(g, d)) : (c.setSelectionAnchor(a.last + k + 1, 0), c.$moveSelection(function () {
                c.moveCursorTo(a.first + k, 0)
            }))
        };
        this.$getSelectedRows = function () {
            var b = this.getSelectionRange().collapseRows();
            return{first: b.start.row, last: b.end.row}
        };
        this.onCompositionStart = function () {
            this.renderer.showComposition(this.getCursorPosition())
        };
        this.onCompositionUpdate = function (b) {
            this.renderer.setCompositionText(b)
        };
        this.onCompositionEnd = function () {
            this.renderer.hideComposition()
        };
        this.getFirstVisibleRow = function () {
            return this.renderer.getFirstVisibleRow()
        };
        this.getLastVisibleRow = function () {
            return this.renderer.getLastVisibleRow()
        };
        this.isRowVisible = function (b) {
            return b >= this.getFirstVisibleRow() && b <= this.getLastVisibleRow()
        };
        this.isRowFullyVisible = function (b) {
            return b >= this.renderer.getFirstFullyVisibleRow() && b <= this.renderer.getLastFullyVisibleRow()
        };
        this.$getVisibleRowCount = function () {
            return this.renderer.getScrollBottomRow() -
                this.renderer.getScrollTopRow() + 1
        };
        this.$moveByPage = function (b, a) {
            var c = this.renderer, g = this.renderer.layerConfig, d = b * Math.floor(g.height / g.lineHeight);
            this.$blockScrolling++;
            a == 1 ? this.selection.$moveSelection(function () {
                this.moveCursorBy(d, 0)
            }) : a == 0 && (this.selection.moveCursorBy(d, 0), this.selection.clearSelection());
            this.$blockScrolling--;
            var k = c.scrollTop;
            c.scrollBy(0, d * g.lineHeight);
            a != null && c.scrollCursorIntoView(null, 0.5);
            c.animateScrolling(k)
        };
        this.selectPageDown = function () {
            this.$moveByPage(1,
                true)
        };
        this.selectPageUp = function () {
            this.$moveByPage(-1, true)
        };
        this.gotoPageDown = function () {
            this.$moveByPage(1, false)
        };
        this.gotoPageUp = function () {
            this.$moveByPage(-1, false)
        };
        this.scrollPageDown = function () {
            this.$moveByPage(1)
        };
        this.scrollPageUp = function () {
            this.$moveByPage(-1)
        };
        this.scrollToRow = function (b) {
            this.renderer.scrollToRow(b)
        };
        this.scrollToLine = function (b, a, c, g) {
            this.renderer.scrollToLine(b, a, c, g)
        };
        this.centerSelection = function () {
            var b = this.getSelectionRange();
            this.renderer.alignCursor({row: Math.floor(b.start.row +
                (b.end.row - b.start.row) / 2), column: Math.floor(b.start.column + (b.end.column - b.start.column) / 2)}, 0.5)
        };
        this.getCursorPosition = function () {
            return this.selection.getCursor()
        };
        this.getCursorPositionScreen = function () {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        };
        this.getSelectionRange = function () {
            return this.selection.getRange()
        };
        this.selectAll = function () {
            this.$blockScrolling = this.$blockScrolling + 1;
            this.selection.selectAll();
            this.$blockScrolling = this.$blockScrolling - 1
        };
        this.clearSelection =
            function () {
                this.selection.clearSelection()
            };
        this.moveCursorTo = function (b, a) {
            this.selection.moveCursorTo(b, a)
        };
        this.moveCursorToPosition = function (b) {
            this.selection.moveCursorToPosition(b)
        };
        this.jumpToMatching = function (b) {
            var a = this.getCursorPosition(), c = this.session.getBracketRange(a);
            if (!c) {
                c = this.find({needle: /[{}()\[\]]/g, preventScroll: true, start: {row: a.row, column: a.column - 1}});
                if (!c)return;
                var g = c.start;
                g.row == a.row && Math.abs(g.column - a.column) < 2 && (c = this.session.getBracketRange(g))
            }
            (g = c && c.cursor ||
                g) && (b ? c && c.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(g.row, g.column) : (this.clearSelection(), this.moveCursorTo(g.row, g.column)))
        };
        this.gotoLine = function (b, a, c) {
            this.selection.clearSelection();
            this.session.unfold({row: b - 1, column: a || 0});
            this.$blockScrolling = this.$blockScrolling + 1;
            this.moveCursorTo(b - 1, a || 0);
            this.$blockScrolling = this.$blockScrolling - 1;
            this.isRowFullyVisible(b - 1) || this.scrollToLine(b - 1, true, c)
        };
        this.navigateTo = function (b, a) {
            this.clearSelection();
            this.moveCursorTo(b, a)
        };
        this.navigateUp = function (b) {
            this.selection.clearSelection();
            this.selection.moveCursorBy(-(b || 1), 0)
        };
        this.navigateDown = function (b) {
            this.selection.clearSelection();
            this.selection.moveCursorBy(b || 1, 0)
        };
        this.navigateLeft = function (b) {
            if (this.selection.isEmpty())for (b = b || 1; b--;)this.selection.moveCursorLeft(); else this.moveCursorToPosition(this.getSelectionRange().start);
            this.clearSelection()
        };
        this.navigateRight = function (b) {
            if (this.selection.isEmpty())for (b = b || 1; b--;)this.selection.moveCursorRight();
            else this.moveCursorToPosition(this.getSelectionRange().end);
            this.clearSelection()
        };
        this.navigateLineStart = function () {
            this.selection.moveCursorLineStart();
            this.clearSelection()
        };
        this.navigateLineEnd = function () {
            this.selection.moveCursorLineEnd();
            this.clearSelection()
        };
        this.navigateFileEnd = function () {
            var b = this.renderer.scrollTop;
            this.selection.moveCursorFileEnd();
            this.clearSelection();
            this.renderer.animateScrolling(b)
        };
        this.navigateFileStart = function () {
            var b = this.renderer.scrollTop;
            this.selection.moveCursorFileStart();
            this.clearSelection();
            this.renderer.animateScrolling(b)
        };
        this.navigateWordRight = function () {
            this.selection.moveCursorWordRight();
            this.clearSelection()
        };
        this.navigateWordLeft = function () {
            this.selection.moveCursorWordLeft();
            this.clearSelection()
        };
        this.replace = function (b, a) {
            a && this.$search.set(a);
            var c = this.$search.find(this.session), g = 0;
            return c ? (this.$tryReplace(c, b) && (g = 1), c !== null && (this.selection.setSelectionRange(c), this.renderer.scrollSelectionIntoView(c.start, c.end)), g) : g
        };
        this.replaceAll = function (b, a) {
            a && this.$search.set(a);
            var c = this.$search.findAll(this.session), g = 0;
            if (!c.length)return g;
            this.$blockScrolling = this.$blockScrolling + 1;
            var d = this.getSelectionRange();
            this.clearSelection();
            this.selection.moveCursorTo(0, 0);
            for (var k = c.length - 1; k >= 0; --k)this.$tryReplace(c[k], b) && g++;
            return this.selection.setSelectionRange(d), this.$blockScrolling = this.$blockScrolling - 1, g
        };
        this.$tryReplace = function (b, a) {
            return a = this.$search.replace(this.session.getTextRange(b), a), a !== null ? (b.end = this.session.replace(b,
                a), b) : null
        };
        this.getLastSearchOptions = function () {
            return this.$search.getOptions()
        };
        this.find = function (b, a, c) {
            a || (a = {});
            typeof b == "string" || b instanceof RegExp ? a.needle = b : typeof b == "object" && f.mixin(a, b);
            var g = this.selection.getRange();
            a.needle == null && (b = this.session.getTextRange(g) || this.$search.$options.needle, b || (g = this.session.getWordRange(g.start.row, g.start.column), b = this.session.getTextRange(g)), this.$search.set({needle: b}));
            this.$search.set(a);
            a.start || this.$search.set({start: g});
            b = this.$search.find(this.session);
            if (a.preventScroll)return b;
            if (b)return this.revealRange(b, c), b;
            a.backwards ? g.start = g.end : g.end = g.start;
            this.selection.setRange(g)
        };
        this.findNext = function (b, a) {
            this.find({skipCurrent: true, backwards: false}, b, a)
        };
        this.findPrevious = function (b, a) {
            this.find(b, {skipCurrent: true, backwards: true}, a)
        };
        this.revealRange = function (b, a) {
            this.$blockScrolling = this.$blockScrolling + 1;
            this.session.unfold(b);
            this.selection.setSelectionRange(b);
            this.$blockScrolling = this.$blockScrolling - 1;
            var c = this.renderer.scrollTop;
            this.renderer.scrollSelectionIntoView(b.start, b.end, 0.5);
            a != 0 && this.renderer.animateScrolling(c)
        };
        this.undo = function () {
            this.$blockScrolling++;
            this.session.getUndoManager().undo();
            this.$blockScrolling--;
            this.renderer.scrollCursorIntoView(null, 0.5)
        };
        this.redo = function () {
            this.$blockScrolling++;
            this.session.getUndoManager().redo();
            this.$blockScrolling--;
            this.renderer.scrollCursorIntoView(null, 0.5)
        };
        this.destroy = function () {
            this.renderer.destroy()
        }
    }).call(q.prototype);
    h.Editor = q
});
define("ace/lib/lang", ["require", "exports", "module"], function (j, h) {
    h.stringReverse = function (a) {
        return a.split("").reverse().join("")
    };
    h.stringRepeat = function (a, d) {
        return Array(d + 1).join(a)
    };
    var f = /^\s\s*/, e = /\s\s*$/;
    h.stringTrimLeft = function (a) {
        return a.replace(f, "")
    };
    h.stringTrimRight = function (a) {
        return a.replace(e, "")
    };
    h.copyObject = function (a) {
        var d = {}, c;
        for (c in a)d[c] = a[c];
        return d
    };
    h.copyArray = function (a) {
        for (var d = [], c = 0, b = a.length; c < b; c++)a[c] && "object" == typeof a[c] ? d[c] = this.copyObject(a[c]) :
            d[c] = a[c];
        return d
    };
    h.deepCopy = function (a) {
        if ("object" != typeof a)return a;
        var d = a.constructor(), c;
        for (c in a)"object" == typeof a[c] ? d[c] = this.deepCopy(a[c]) : d[c] = a[c];
        return d
    };
    h.arrayToMap = function (a) {
        for (var d = {}, c = 0; c < a.length; c++)d[a[c]] = 1;
        return d
    };
    h.createMap = function (a) {
        var d = Object.create(null), c;
        for (c in a)d[c] = a[c];
        return d
    };
    h.arrayRemove = function (a, d) {
        for (var c = 0; c <= a.length; c++)d === a[c] && a.splice(c, 1)
    };
    h.escapeRegExp = function (a) {
        return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    };
    h.getMatchOffsets =
        function (a, d) {
            var c = [];
            return a.replace(d, function (b) {
                c.push({offset: arguments[arguments.length - 2], length: b.length})
            }), c
        };
    h.deferredCall = function (a) {
        var d = null, c = function () {
            d = null;
            a()
        }, b = function (a) {
            return b.cancel(), d = setTimeout(c, a || 0), b
        };
        return b.schedule = b, b.call = function () {
            return this.cancel(), a(), b
        }, b.cancel = function () {
            return clearTimeout(d), d = null, b
        }, b
    }
});
define("ace/keyboard/textinput", "require exports module ace/lib/event ace/lib/useragent ace/lib/dom".split(" "), function (j, h) {
    var f = j("../lib/event"), e = j("../lib/useragent"), a = j("../lib/dom");
    h.TextInput = function (d, c) {
        function b(b) {
            try {
                b ? (i.value = m, i.selectionStart = 0, i.selectionEnd = 1) : i.select()
            } catch (a) {
            }
        }

        function g(a) {
            if (!h)(a = a || i.value) && (a.length > 1 && (a.charAt(0) == m ? a = a.substr(1) : a.charAt(a.length - 1) == m && (a = a.slice(0, -1))), a && a != m && (j ? c.onPaste(a) : c.onTextInput(a)));
            j = h = false;
            b(true)
        }

        function k() {
            return document.activeElement ===
                i
        }

        function l() {
            setTimeout(function () {
                n && (i.style.cssText = n, n = "");
                g();
                c.renderer.$keepTextAreaAtCursor == null && (c.renderer.$keepTextAreaAtCursor = true, c.renderer.$moveTextAreaToCursor())
            }, 0)
        }

        var i = a.createElement("textarea");
        e.isTouchPad && i.setAttribute("x-palm-disable-auto-cap", true);
        i.setAttribute("wrap", "off");
        i.style.top = "-2em";
        d.insertBefore(i, d.firstChild);
        var m = e.isIE ? "" : "\x00";
        b(true);
        k() && c.onFocus();
        var p = false, h = false, j = false, n = "", r = function () {
                setTimeout(function () {
                    p || i.value != "" && g()
                }, 0)
            },
            o = function () {
                p = true;
                c.onCompositionStart();
                setTimeout(v, 0)
            }, v = function () {
                if (p)c.onCompositionUpdate(i.value)
            }, u = function () {
                p = false;
                c.onCompositionEnd()
            }, w = function (a) {
                h = true;
                var d = c.getCopyText();
                d ? i.value = d : a.preventDefault();
                b();
                setTimeout(function () {
                    g()
                }, 0)
            }, t = function (a) {
                h = true;
                var d = c.getCopyText();
                d ? (i.value = d, c.onCut()) : a.preventDefault();
                b();
                setTimeout(function () {
                    g()
                }, 0)
            };
        f.addCommandKeyListener(i, c.onCommandKey.bind(c));
        f.addListener(i, "input", function (a) {
            p || g(a.data);
            setTimeout(function () {
                p ||
                b(true)
            }, 0)
        });
        if (e.isOldIE) {
            var x = {13: 1, 27: 1};
            f.addListener(i, "keyup", function (b) {
                p && (!i.value || x[b.keyCode]) && setTimeout(u, 0);
                (i.value.charCodeAt(0) | 0) < 129 || (p ? v() : o())
            });
            f.addListener(i, "propertychange", function () {
                i.value != m && setTimeout(g, 0)
            })
        }
        f.addListener(i, "paste", function (b) {
            j = true;
            b.clipboardData && b.clipboardData.getData ? (g(b.clipboardData.getData("text/plain")), b.preventDefault()) : r()
        });
        "onbeforecopy"in i && typeof clipboardData != "undefined" ? (f.addListener(i, "beforecopy", function (b) {
            if (!n) {
                var a =
                    c.getCopyText();
                a ? clipboardData.setData("Text", a) : b.preventDefault()
            }
        }), f.addListener(d, "keydown", function (b) {
            if (b.ctrlKey && b.keyCode == 88) {
                var a = c.getCopyText();
                a && (clipboardData.setData("Text", a), c.onCut());
                f.preventDefault(b)
            }
        }), f.addListener(i, "cut", t)) : !e.isOpera || "KeyboardEvent"in window ? (f.addListener(i, "copy", w), f.addListener(i, "cut", t)) : f.addListener(d, "keydown", function (b) {
            if ((!e.isMac || b.metaKey) && b.ctrlKey && (b.keyCode == 88 || b.keyCode == 67)) {
                var a = c.getCopyText();
                a && (i.value = a, i.select(),
                    b.keyCode == 88 && c.onCut())
            }
        });
        f.addListener(i, "compositionstart", o);
        e.isGecko && f.addListener(i, "text", v);
        e.isWebKit && f.addListener(i, "keyup", v);
        f.addListener(i, "compositionend", u);
        f.addListener(i, "blur", function () {
            c.onBlur()
        });
        f.addListener(i, "focus", function () {
            c.onFocus();
            b()
        });
        this.focus = function () {
            b();
            i.focus()
        };
        this.blur = function () {
            i.blur()
        };
        this.isFocused = k;
        this.getElement = function () {
            return i
        };
        this.onContextMenu = function (a) {
            n || (n = i.style.cssText);
            i.style.cssText = "position:fixed; z-index:100000;" +
                (e.isIE ? "background:rgba(0, 0, 0, 0.03); opacity:0.1;" : "") + "left:" + (a.clientX - 2) + "px; top:" + (a.clientY - 2) + "px;";
            c.selection.isEmpty() ? i.value = "" : b(true);
            if (a.type == "mousedown") {
                c.renderer.$keepTextAreaAtCursor && (c.renderer.$keepTextAreaAtCursor = null);
                e.isWin && (e.isGecko || e.isIE) && f.capture(c.container, function (b) {
                    i.style.left = b.clientX - 2 + "px";
                    i.style.top = b.clientY - 2 + "px"
                }, l)
            }
        };
        this.onContextMenuClose = l;
        e.isGecko || f.addListener(i, "contextmenu", function (b) {
            c.textInput.onContextMenu(b);
            l()
        })
    }
});
define("ace/mouse/mouse_handler", "require exports module ace/lib/event ace/lib/useragent ace/mouse/default_handlers ace/mouse/default_gutter_handler ace/mouse/mouse_event ace/mouse/dragdrop".split(" "), function (j, h) {
    var f = j("../lib/event"), e = j("../lib/useragent"), a = j("./default_handlers").DefaultHandlers, d = j("./default_gutter_handler").GutterHandler, c = j("./mouse_event").MouseEvent, b = j("./dragdrop").DragdropHandler, g = function (c) {
        this.editor = c;
        new a(this);
        new d(this);
        new b(this);
        f.addListener(c.container,
            "mousedown", function (b) {
                return c.focus(), f.preventDefault(b)
            });
        var g = c.renderer.getMouseEventTarget();
        f.addListener(g, "click", this.onMouseEvent.bind(this, "click"));
        f.addListener(g, "mousemove", this.onMouseMove.bind(this, "mousemove"));
        f.addMultiMouseDownListener(g, [300, 300, 250], this, "onMouseEvent");
        f.addMouseWheelListener(c.container, this.onMouseWheel.bind(this, "mousewheel"));
        g = c.renderer.$gutter;
        f.addListener(g, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"));
        f.addListener(g, "click", this.onMouseEvent.bind(this,
            "gutterclick"));
        f.addListener(g, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"));
        f.addListener(g, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"))
    };
    (function () {
        this.$scrollSpeed = 1;
        this.setScrollSpeed = function (b) {
            this.$scrollSpeed = b
        };
        this.getScrollSpeed = function () {
            return this.$scrollSpeed
        };
        this.onMouseEvent = function (b, a) {
            this.editor._emit(b, new c(a, this.editor))
        };
        this.$dragDelay = 250;
        this.setDragDelay = function (b) {
            this.$dragDelay = b
        };
        this.getDragDelay = function () {
            return this.$dragDelay
        };
        this.onMouseMove = function (b, a) {
            var g = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            g && g.length && this.editor._emit(b, new c(a, this.editor))
        };
        this.onMouseWheel = function (b, a) {
            var g = new c(a, this.editor);
            g.speed = this.$scrollSpeed * 2;
            g.wheelX = a.wheelX;
            g.wheelY = a.wheelY;
            this.editor._emit(b, g)
        };
        this.setState = function (b) {
            this.state = b
        };
        this.captureMouse = function (b, a) {
            a && this.setState(a);
            this.x = b.x;
            this.y = b.y;
            var c = this.editor.renderer;
            c.$keepTextAreaAtCursor && (c.$keepTextAreaAtCursor = null);
            var g = this, d = function (b) {
                g.x = b.clientX;
                g.y = b.clientY
            }, h = function (b) {
                clearInterval(n);
                g[g.state + "End"] && g[g.state + "End"](b);
                g.$clickSelection = null;
                c.$keepTextAreaAtCursor == null && (c.$keepTextAreaAtCursor = true, c.$moveTextAreaToCursor())
            }, j = function () {
                g[g.state] && g[g.state]()
            };
            if (e.isOldIE && b.domEvent.type == "dblclick")setTimeout(function () {
                j();
                h(b.domEvent)
            }); else {
                f.capture(this.editor.container, d, h);
                var n = setInterval(j, 20)
            }
        }
    }).call(g.prototype);
    h.MouseHandler = g
});
define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/useragent"], function (j, h) {
    function f(a) {
        a.$clickSelection = null;
        var c = a.editor;
        c.setDefaultHandler("mousedown", this.onMouseDown.bind(a));
        c.setDefaultHandler("dblclick", this.onDoubleClick.bind(a));
        c.setDefaultHandler("tripleclick", this.onTripleClick.bind(a));
        c.setDefaultHandler("quadclick", this.onQuadClick.bind(a));
        c.setDefaultHandler("mousewheel", this.onMouseWheel.bind(a));
        "select startSelect drag dragEnd dragWait dragWaitEnd startDrag focusWait".split(" ").forEach(function (b) {
            a[b] =
                this[b]
        }, this);
        a.selectByLines = this.extendSelectionBy.bind(a, "getLineRange");
        a.selectByWords = this.extendSelectionBy.bind(a, "getWordRange");
        a.$focusWaitTimout = 250
    }

    function e(a, c) {
        return 0 > (a.start.row == a.end.row ? 2 * c.column - a.start.column - a.end.column : 2 * c.row - a.start.row - a.end.row) ? {cursor: a.start, anchor: a.end} : {cursor: a.end, anchor: a.start}
    }

    var a = j("../lib/dom");
    j("../lib/useragent");
    (function () {
        this.onMouseDown = function (a) {
            var c = a.inSelection(), b = a.getDocumentPosition();
            this.mousedownEvent = a;
            var g =
                this.editor;
            if (0 !== a.getButton())g.getSelectionRange().isEmpty() && (g.moveCursorToPosition(b), g.selection.clearSelection()), g.textInput.onContextMenu(a.domEvent); else return c && !g.isFocused() && (g.focus(), this.$focusWaitTimout && !this.$clickSelection) ? (this.setState("focusWait"), this.captureMouse(a), a.preventDefault()) : (!c || this.$clickSelection || a.getShiftKey() ? this.startSelect(b) : c && (this.mousedownEvent.time = (new Date).getTime(), this.setState("dragWait")), this.captureMouse(a), a.preventDefault())
        };
        this.startSelect =
            function (a) {
                a = a || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
                this.mousedownEvent.getShiftKey() ? this.editor.selection.selectToPosition(a) : this.$clickSelection || (this.editor.moveCursorToPosition(a), this.editor.selection.clearSelection());
                this.setState("select")
            };
        this.select = function () {
            var a, c = this.editor, b = c.renderer.screenToTextCoordinates(this.x, this.y);
            this.$clickSelection && (a = this.$clickSelection.comparePoint(b), -1 == a ? a = this.$clickSelection.end : 1 == a ? a = this.$clickSelection.start :
                (a = e(this.$clickSelection, b), b = a.cursor, a = a.anchor), c.selection.setSelectionAnchor(a.row, a.column));
            c.selection.selectToPosition(b);
            c.renderer.scrollCursorIntoView()
        };
        this.extendSelectionBy = function (a) {
            var c, b = this.editor, g = b.renderer.screenToTextCoordinates(this.x, this.y), a = b.selection[a](g.row, g.column);
            if (this.$clickSelection) {
                c = this.$clickSelection.comparePoint(a.start);
                var k = this.$clickSelection.comparePoint(a.end);
                if (-1 == c && 0 >= k) {
                    if (c = this.$clickSelection.end, a.end.row != g.row || a.end.column !=
                        g.column)g = a.start
                } else if (1 == k && 0 <= c) {
                    if (c = this.$clickSelection.start, a.start.row != g.row || a.start.column != g.column)g = a.end
                } else-1 == c && 1 == k ? (g = a.end, c = a.start) : (a = e(this.$clickSelection, g), g = a.cursor, c = a.anchor);
                b.selection.setSelectionAnchor(c.row, c.column)
            }
            b.selection.selectToPosition(g);
            b.renderer.scrollCursorIntoView()
        };
        this.startDrag = function () {
            var d = this.editor;
            this.setState("drag");
            this.dragRange = d.getSelectionRange();
            var c = d.getSelectionStyle();
            this.dragSelectionMarker = d.session.addMarker(this.dragRange,
                "ace_selection", c);
            d.clearSelection();
            a.addCssClass(d.container, "ace_dragging");
            this.$dragKeybinding || (this.$dragKeybinding = {handleKeyboard: function (b, a, c) {
                if ("esc" == c)return{command: this.command}
            }, command: {exec: function (b) {
                b = b.$mouseHandler;
                b.dragCursor = null;
                b.dragEnd();
                b.startSelect()
            }}});
            d.keyBinding.addKeyboardHandler(this.$dragKeybinding)
        };
        this.focusWait = function () {
            var a = Math.sqrt(Math.pow(this.x - this.mousedownEvent.x, 2) + Math.pow(this.y - this.mousedownEvent.y, 2)), c = (new Date).getTime();
            (5 < a ||
                c - this.mousedownEvent.time > this.$focusWaitTimout) && this.startSelect()
        };
        this.dragWait = function () {
            var a = Math.sqrt(Math.pow(this.x - this.mousedownEvent.x, 2) + Math.pow(this.y - this.mousedownEvent.y, 2)), c = (new Date).getTime(), b = this.editor;
            5 < a ? this.startSelect(this.mousedownEvent.getDocumentPosition()) : c - this.mousedownEvent.time > b.getDragDelay() && this.startDrag()
        };
        this.dragWaitEnd = function (a) {
            this.mousedownEvent.domEvent = a;
            this.startSelect()
        };
        this.drag = function () {
            var a = this.editor;
            this.dragCursor = a.renderer.screenToTextCoordinates(this.x,
                this.y);
            a.moveCursorToPosition(this.dragCursor);
            a.renderer.scrollCursorIntoView()
        };
        this.dragEnd = function (d) {
            var c = this.editor, b = this.dragCursor, g = this.dragRange;
            a.removeCssClass(c.container, "ace_dragging");
            c.session.removeMarker(this.dragSelectionMarker);
            c.keyBinding.removeKeyboardHandler(this.$dragKeybinding);
            if (b) {
                c.clearSelection();
                if (d && (d.ctrlKey || d.altKey)) {
                    var d = c.session, k = g;
                    k.end = d.insert(b, d.getTextRange(g));
                    k.start = b
                } else {
                    if (g.contains(b.row, b.column))return;
                    k = c.moveText(g, b)
                }
                k && c.selection.setSelectionRange(k)
            }
        };
        this.onDoubleClick = function (a) {
            var a = a.getDocumentPosition(), c = this.editor, b = c.session.getBracketRange(a);
            b ? (b.isEmpty() && (b.start.column--, b.end.column++), this.$clickSelection = b, this.setState("select")) : (this.$clickSelection = c.selection.getWordRange(a.row, a.column), this.setState("selectByWords"))
        };
        this.onTripleClick = function (a) {
            var a = a.getDocumentPosition(), c = this.editor;
            this.setState("selectByLines");
            this.$clickSelection = c.selection.getLineRange(a.row)
        };
        this.onQuadClick = function () {
            var a = this.editor;
            a.selectAll();
            this.$clickSelection = a.getSelectionRange();
            this.setState("null")
        };
        this.onMouseWheel = function (a) {
            if (!a.getShiftKey() && !a.getAccelKey()) {
                var c = this.editor;
                if (c.renderer.isScrollableBy(a.wheelX * a.speed, a.wheelY * a.speed))this.$passScrollEvent = !1; else {
                    if (this.$passScrollEvent)return;
                    if (!this.$scrollStopTimeout) {
                        var b = this;
                        this.$scrollStopTimeout = setTimeout(function () {
                            b.$passScrollEvent = !0;
                            b.$scrollStopTimeout = null
                        }, 200)
                    }
                }
                return c.renderer.scrollBy(a.wheelX * a.speed, a.wheelY * a.speed), a.preventDefault()
            }
        }
    }).call(f.prototype);
    h.DefaultHandlers = f
});
define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event"], function (j, h) {
    var f = j("../lib/dom"), e = j("../lib/event");
    h.GutterHandler = function (a) {
        function d() {
            k && (k = clearTimeout(k));
            m && (i.style.display = "none", m = null, b.removeEventListener("mousewheel", d))
        }

        function c(a) {
            var c = b.renderer.$gutter.getBoundingClientRect();
            i.style.left = a.x - c.left + 15 + "px";
            a.y + 3 * b.renderer.lineHeight + 15 < c.bottom ? (i.style.bottom = "", i.style.top = a.y - c.top + 15 + "px") : (i.style.top = "", i.style.bottom =
                c.bottom - a.y + 5 + "px")
        }

        var b = a.editor, g = b.renderer.$gutterLayer;
        a.editor.setDefaultHandler("guttermousedown", function (c) {
            if (b.isFocused() && !g.getRegion(c)) {
                var d = c.getDocumentPosition().row, k = b.session.selection;
                return c.getShiftKey() ? k.selectTo(d, 0) : a.$clickSelection = b.selection.getLineRange(d), a.captureMouse(c, "selectByLines"), c.preventDefault()
            }
        });
        var k, l, i, m;
        a.editor.setDefaultHandler("guttermousemove", function (a) {
            if (f.hasCssClass(a.domEvent.target || a.domEvent.srcElement, "ace_fold-widget"))return d();
            m && c(a);
            l = a;
            k || (k = setTimeout(function () {
                    k = null;
                    if (l)a:{
                        i || (i = f.createElement("div"), i.className = "ace_gutter_tooltip", i.style.maxWidth = "500px", i.style.display = "none", b.container.appendChild(i));
                        var a = l.getDocumentPosition().row, e = g.$annotations[a];
                        if (e) {
                            var n = b.session.getLength();
                            if (a == n && (a = b.renderer.pixelToScreenCoordinates(0, l.y).row, n = l.$pos, a > b.session.documentToScreenRow(n.row, n.column))) {
                                d();
                                break a
                            }
                            m != e && (m = e.text.join("\n"), i.style.display = "block", i.innerHTML = m, b.on("mousewheel", d), c(l))
                        } else d()
                    } else d()
                },
                50))
        });
        e.addListener(b.renderer.$gutter, "mouseout", function () {
            l = null;
            m && !k && (k = setTimeout(function () {
                k = null;
                d()
            }, 50))
        })
    }
});
define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (j, h) {
    var f = j("../lib/event"), e = j("../lib/useragent");
    (function () {
        this.stopPropagation = function () {
            f.stopPropagation(this.domEvent);
            this.propagationStopped = !0
        };
        this.preventDefault = function () {
            f.preventDefault(this.domEvent);
            this.defaultPrevented = !0
        };
        this.stop = function () {
            this.stopPropagation();
            this.preventDefault()
        };
        this.getDocumentPosition = function () {
            return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX,
                this.clientY), this.$pos)
        };
        this.inSelection = function () {
            if (null !== this.$inSelection)return this.$inSelection;
            var a = this.editor;
            if (a.getReadOnly())this.$inSelection = !1; else if (a = a.getSelectionRange(), a.isEmpty())this.$inSelection = !1; else {
                var d = this.getDocumentPosition();
                this.$inSelection = a.contains(d.row, d.column)
            }
            return this.$inSelection
        };
        this.getButton = function () {
            return f.getButton(this.domEvent)
        };
        this.getShiftKey = function () {
            return this.domEvent.shiftKey
        };
        this.getAccelKey = e.isMac ? function () {
            return this.domEvent.metaKey
        } :
            function () {
                return this.domEvent.ctrlKey
            }
    }).call((h.MouseEvent = function (a, d) {
            this.domEvent = a;
            this.editor = d;
            this.x = this.clientX = a.clientX;
            this.y = this.clientY = a.clientY;
            this.$inSelection = this.$pos = null;
            this.defaultPrevented = this.propagationStopped = !1
        }).prototype)
});
define("ace/mouse/dragdrop", ["require", "exports", "module", "ace/lib/event"], function (j, h) {
    var f = j("../lib/event");
    h.DragdropHandler = function (e) {
        var a = e.editor, d, c, b, g, k, l, i, m = 0, e = a.container;
        f.addListener(e, "dragenter", function (b) {
            m++;
            if (!d) {
                k = a.getSelectionRange();
                l = a.selection.isBackwards();
                var c = a.getSelectionStyle();
                d = a.session.addMarker(k, "ace_selection", c);
                a.clearSelection();
                clearInterval(g);
                g = setInterval(h, 20)
            }
            return f.preventDefault(b)
        });
        f.addListener(e, "dragover", function (a) {
            return c = a.clientX,
                b = a.clientY, f.preventDefault(a)
        });
        var h = function () {
            i = a.renderer.screenToTextCoordinates(c, b);
            a.moveCursorToPosition(i);
            a.renderer.scrollCursorIntoView()
        };
        f.addListener(e, "dragleave", function (b) {
            m--;
            if (!(0 < m))return console.log(b.type, m, b.target), clearInterval(g), a.session.removeMarker(d), d = null, a.selection.setSelectionRange(k, l), f.preventDefault(b)
        });
        f.addListener(e, "drop", function (b) {
            return console.log(b.type, m, b.target), m = 0, clearInterval(g), a.session.removeMarker(d), d = null, k.end = a.session.insert(i,
                b.dataTransfer.getData("Text")), k.start = i, a.focus(), a.selection.setSelectionRange(k), f.preventDefault(b)
        })
    }
});
define("ace/mouse/fold_handler", ["require", "exports", "module"], function (j, h) {
    h.FoldHandler = function (f) {
        f.on("click", function (e) {
            var a = e.getDocumentPosition(), d = f.session;
            (a = d.getFoldAt(a.row, a.column, 1)) && (e.getAccelKey() ? d.removeFold(a) : d.expandFold(a), e.stop())
        });
        f.on("gutterclick", function (e) {
            if ("foldWidgets" == f.renderer.$gutterLayer.getRegion(e)) {
                var a = e.getDocumentPosition().row, d = f.session;
                d.foldWidgets && d.foldWidgets[a] && f.session.onFoldWidgetClick(a, e);
                e.stop()
            }
        })
    }
});
define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (j, h) {
    var f = j("../lib/keys"), e = j("../lib/event"), a = function (a) {
        this.$editor = a;
        this.$data = {};
        this.$handlers = [];
        this.setDefaultHandler(a.commands)
    };
    (function () {
        this.setDefaultHandler = function (a) {
            this.removeKeyboardHandler(this.$defaultHandler);
            this.$defaultHandler = a;
            this.addKeyboardHandler(a, 0);
            this.$data = {editor: this.$editor}
        };
        this.setKeyboardHandler = function (a) {
            if (this.$handlers[this.$handlers.length -
                1] != a) {
                for (; this.$handlers[1];)this.removeKeyboardHandler(this.$handlers[1]);
                this.addKeyboardHandler(a, 1)
            }
        };
        this.addKeyboardHandler = function (a, c) {
            if (a) {
                var b = this.$handlers.indexOf(a);
                -1 != b && this.$handlers.splice(b, 1);
                void 0 == c ? this.$handlers.push(a) : this.$handlers.splice(c, 0, a);
                -1 == b && a.attach && a.attach(this.$editor)
            }
        };
        this.removeKeyboardHandler = function (a) {
            var c = this.$handlers.indexOf(a);
            return-1 == c ? !1 : (this.$handlers.splice(c, 1), a.detach && a.detach(this.$editor), !0)
        };
        this.getKeyboardHandler = function () {
            return this.$handlers[this.$handlers.length -
                1]
        };
        this.$callKeyboardHandlers = function (a, c, b, g) {
            for (var k, l = this.$handlers.length; l-- && (!(k = this.$handlers[l].handleKeyboard(this.$data, a, c, b, g)) || !k.command););
            if (!k || !k.command)return!1;
            c = !1;
            b = this.$editor.commands;
            return"null" != k.command ? c = b.exec(k.command, this.$editor, k.args, g) : c = 1 != k.passEvent, c && g && -1 != a && e.stopEvent(g), c
        };
        this.onCommandKey = function (a, c, b) {
            var g = f.keyCodeToString(b);
            this.$callKeyboardHandlers(c, g, b, a)
        };
        this.onTextInput = function (a) {
            this.$callKeyboardHandlers(-1, a) || this.$editor.commands.exec("insertstring",
                this.$editor, a)
        }
    }).call(a.prototype);
    h.KeyBinding = a
});
define("ace/edit_session", "require exports module ace/config ace/lib/oop ace/lib/lang ace/lib/net ace/lib/event_emitter ace/selection ace/mode/text ace/range ace/document ace/background_tokenizer ace/search_highlight ace/edit_session/folding ace/edit_session/bracket_match".split(" "), function (j, h) {
    var f = j("./config"), e = j("./lib/oop"), a = j("./lib/lang"), d = j("./lib/net"), c = j("./lib/event_emitter").EventEmitter, b = j("./selection").Selection, g = j("./mode/text").Mode, k = j("./range").Range, l = j("./document").Document,
        i = j("./background_tokenizer").BackgroundTokenizer, m = j("./search_highlight").SearchHighlight, p = function (a, c) {
            this.$modified = true;
            this.$breakpoints = [];
            this.$decorations = [];
            this.$frontMarkers = {};
            this.$backMarkers = {};
            this.$markerId = 1;
            this.$resetRowCache(0);
            this.$wrapData = [];
            this.$foldData = [];
            this.$rowLengthCache = [];
            this.$undoSelect = true;
            this.$foldData.toString = function () {
                var b = "";
                return this.forEach(function (a) {
                    b = b + ("\n" + a.toString())
                }), b
            };
            typeof a == "object" && a.getLine ? this.setDocument(a) : this.setDocument(new l(a));
            this.selection = new b(this);
            this.setMode(c)
        };
    (function () {
        function b(a) {
            return a < 4352 ? false : a >= 4352 && a <= 4447 || a >= 4515 && a <= 4519 || a >= 4602 && a <= 4607 || a >= 9001 && a <= 9002 || a >= 11904 && a <= 11929 || a >= 11931 && a <= 12019 || a >= 12032 && a <= 12245 || a >= 12272 && a <= 12283 || a >= 12288 && a <= 12350 || a >= 12353 && a <= 12438 || a >= 12441 && a <= 12543 || a >= 12549 && a <= 12589 || a >= 12593 && a <= 12686 || a >= 12688 && a <= 12730 || a >= 12736 && a <= 12771 || a >= 12784 && a <= 12830 || a >= 12832 && a <= 12871 || a >= 12880 && a <= 13054 || a >= 13056 && a <= 19903 || a >= 19968 && a <= 42124 || a >= 42128 && a <= 42182 ||
                a >= 43360 && a <= 43388 || a >= 44032 && a <= 55203 || a >= 55216 && a <= 55238 || a >= 55243 && a <= 55291 || a >= 63744 && a <= 64255 || a >= 65040 && a <= 65049 || a >= 65072 && a <= 65106 || a >= 65108 && a <= 65126 || a >= 65128 && a <= 65131 || a >= 65281 && a <= 65376 || a >= 65504 && a <= 65510
        }

        e.implement(this, c);
        this.setDocument = function (b) {
            if (this.doc)throw Error("Document is already set");
            this.doc = b;
            b.on("change", this.onChange.bind(this));
            this.on("changeFold", this.onChangeFold.bind(this));
            this.bgTokenizer && (this.bgTokenizer.setDocument(this.getDocument()), this.bgTokenizer.start(0))
        };
        this.getDocument = function () {
            return this.doc
        };
        this.$resetRowCache = function (b) {
            if (b) {
                var b = this.$getRowCacheIndex(this.$docRowCache, b) + 1, a = this.$docRowCache.length;
                this.$docRowCache.splice(b, a);
                this.$screenRowCache.splice(b, a)
            } else {
                this.$docRowCache = [];
                this.$screenRowCache = []
            }
        };
        this.$getRowCacheIndex = function (b, a) {
            for (var c = 0, g = b.length - 1; c <= g;) {
                var d = c + g >> 1, k = b[d];
                if (a > k)c = d + 1; else {
                    if (!(a < k))return d;
                    g = d - 1
                }
            }
            return c && c - 1
        };
        this.onChangeFold = function (b) {
            this.$resetRowCache(b.data.start.row)
        };
        this.onChange =
            function (b) {
                var a = b.data;
                this.$modified = true;
                this.$resetRowCache(a.range.start.row);
                var c = this.$updateInternalDataOnChange(b);
                !this.$fromUndo && this.$undoManager && !a.ignore && (this.$deltasDoc.push(a), c && c.length != 0 && this.$deltasFold.push({action: "removeFolds", folds: c}), this.$informUndoManager.schedule());
                this.bgTokenizer.$updateOnChange(a);
                this._emit("change", b)
            };
        this.setValue = function (b) {
            this.doc.setValue(b);
            this.selection.moveCursorTo(0, 0);
            this.selection.clearSelection();
            this.$resetRowCache(0);
            this.$deltas =
                [];
            this.$deltasDoc = [];
            this.$deltasFold = [];
            this.getUndoManager().reset()
        };
        this.getValue = this.toString = function () {
            return this.doc.getValue()
        };
        this.getSelection = function () {
            return this.selection
        };
        this.getState = function (b) {
            return this.bgTokenizer.getState(b)
        };
        this.getTokens = function (b) {
            return this.bgTokenizer.getTokens(b)
        };
        this.getTokenAt = function (b, a) {
            var c = this.bgTokenizer.getTokens(b), g, d = 0;
            if (a == null) {
                k = c.length - 1;
                d = this.getLine(b).length
            } else for (var k = 0; k < c.length; k++) {
                d = d + c[k].value.length;
                if (d >=
                    a)break
            }
            return g = c[k], g ? (g.index = k, g.start = d - g.value.length, g) : null
        };
        this.highlight = function (b) {
            if (!this.$searchHighlight)this.$searchHighlight = this.addDynamicMarker(new m(null, "ace_selected_word", "text"));
            this.$searchHighlight.setRegexp(b)
        };
        this.setUndoManager = function (b) {
            this.$undoManager = b;
            this.$deltas = [];
            this.$deltasDoc = [];
            this.$deltasFold = [];
            this.$informUndoManager && this.$informUndoManager.cancel();
            if (b) {
                var c = this;
                this.$syncInformUndoManager = function () {
                    c.$informUndoManager.cancel();
                    c.$deltasFold.length &&
                    (c.$deltas.push({group: "fold", deltas: c.$deltasFold}), c.$deltasFold = []);
                    c.$deltasDoc.length && (c.$deltas.push({group: "doc", deltas: c.$deltasDoc}), c.$deltasDoc = []);
                    c.$deltas.length > 0 && b.execute({action: "aceupdate", args: [c.$deltas, c]});
                    c.$deltas = []
                };
                this.$informUndoManager = a.deferredCall(this.$syncInformUndoManager)
            }
        };
        this.$defaultUndoManager = {undo: function () {
        }, redo: function () {
        }, reset: function () {
        }};
        this.getUndoManager = function () {
            return this.$undoManager || this.$defaultUndoManager
        };
        this.getTabString = function () {
            return this.getUseSoftTabs() ?
                a.stringRepeat(" ", this.getTabSize()) : "\t"
        };
        this.$useSoftTabs = true;
        this.setUseSoftTabs = function (b) {
            if (this.$useSoftTabs !== b)this.$useSoftTabs = b
        };
        this.getUseSoftTabs = function () {
            return this.$useSoftTabs
        };
        this.$tabSize = 4;
        this.setTabSize = function (b) {
            if (!(isNaN(b) || this.$tabSize === b)) {
                this.$modified = true;
                this.$rowLengthCache = [];
                this.$tabSize = b;
                this._emit("changeTabSize")
            }
        };
        this.getTabSize = function () {
            return this.$tabSize
        };
        this.isTabStop = function (b) {
            return this.$useSoftTabs && b.column % this.$tabSize == 0
        };
        this.$overwrite =
            false;
        this.setOverwrite = function (b) {
            if (this.$overwrite != b) {
                this.$overwrite = b;
                this._emit("changeOverwrite")
            }
        };
        this.getOverwrite = function () {
            return this.$overwrite
        };
        this.toggleOverwrite = function () {
            this.setOverwrite(!this.$overwrite)
        };
        this.addGutterDecoration = function (b, a) {
            this.$decorations[b] || (this.$decorations[b] = "");
            this.$decorations[b] = this.$decorations[b] + (" " + a);
            this._emit("changeBreakpoint", {})
        };
        this.removeGutterDecoration = function (b, a) {
            this.$decorations[b] = (this.$decorations[b] || "").replace(" " +
                a, "");
            this._emit("changeBreakpoint", {})
        };
        this.getBreakpoints = function () {
            return this.$breakpoints
        };
        this.setBreakpoints = function (b) {
            this.$breakpoints = [];
            for (var a = 0; a < b.length; a++)this.$breakpoints[b[a]] = "ace_breakpoint";
            this._emit("changeBreakpoint", {})
        };
        this.clearBreakpoints = function () {
            this.$breakpoints = [];
            this._emit("changeBreakpoint", {})
        };
        this.setBreakpoint = function (b, a) {
            a === void 0 && (a = "ace_breakpoint");
            a ? this.$breakpoints[b] = a : delete this.$breakpoints[b];
            this._emit("changeBreakpoint", {})
        };
        this.clearBreakpoint =
            function (b) {
                delete this.$breakpoints[b];
                this._emit("changeBreakpoint", {})
            };
        this.addMarker = function (b, a, c, g) {
            var d = this.$markerId++, b = {range: b, type: c || "line", renderer: typeof c == "function" ? c : null, clazz: a, inFront: !!g, id: d};
            return g ? (this.$frontMarkers[d] = b, this._emit("changeFrontMarker")) : (this.$backMarkers[d] = b, this._emit("changeBackMarker")), d
        };
        this.addDynamicMarker = function (b, a) {
            if (b.update) {
                var c = this.$markerId++;
                return b.id = c, b.inFront = !!a, a ? (this.$frontMarkers[c] = b, this._emit("changeFrontMarker")) :
                    (this.$backMarkers[c] = b, this._emit("changeBackMarker")), b
            }
        };
        this.removeMarker = function (b) {
            var a = this.$frontMarkers[b] || this.$backMarkers[b];
            if (a) {
                var c = a.inFront ? this.$frontMarkers : this.$backMarkers;
                a && (delete c[b], this._emit(a.inFront ? "changeFrontMarker" : "changeBackMarker"))
            }
        };
        this.getMarkers = function (b) {
            return b ? this.$frontMarkers : this.$backMarkers
        };
        this.setAnnotations = function (b) {
            this.$annotations = {};
            for (var a = 0; a < b.length; a++) {
                var c = b[a], g = c.row;
                this.$annotations[g] ? this.$annotations[g].push(c) :
                    this.$annotations[g] = [c]
            }
            this._emit("changeAnnotation", {})
        };
        this.getAnnotations = function () {
            return this.$annotations || {}
        };
        this.clearAnnotations = function () {
            this.$annotations = {};
            this._emit("changeAnnotation", {})
        };
        this.$detectNewLine = function (b) {
            (b = b.match(/^.*?(\r?\n)/m)) ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        };
        this.getWordRange = function (b, a) {
            var c = this.getLine(b), g = false;
            a > 0 && (g = !!c.charAt(a - 1).match(this.tokenRe));
            g || (g = !!c.charAt(a).match(this.tokenRe));
            var g = g ? this.tokenRe : /^\s+$/.test(c.slice(a -
                1, a + 1)) ? /\s/ : this.nonTokenRe, d = a;
            if (d > 0) {
                do d--; while (d >= 0 && c.charAt(d).match(g));
                d++
            }
            for (var i = a; i < c.length && c.charAt(i).match(g);)i++;
            return new k(b, d, b, i)
        };
        this.getAWordRange = function (b, a) {
            for (var c = this.getWordRange(b, a), g = this.getLine(c.end.row); g.charAt(c.end.column).match(/[ \t]/);)c.end.column = c.end.column + 1;
            return c
        };
        this.setNewLineMode = function (b) {
            this.doc.setNewLineMode(b)
        };
        this.getNewLineMode = function () {
            return this.doc.getNewLineMode()
        };
        this.$useWorker = true;
        this.setUseWorker = function (b) {
            if (this.$useWorker !=
                b) {
                this.$useWorker = b;
                this.$stopWorker();
                b && this.$startWorker()
            }
        };
        this.getUseWorker = function () {
            return this.$useWorker
        };
        this.onReloadTokenizer = function (b) {
            this.bgTokenizer.start(b.data.first);
            this._emit("tokenizerUpdate", b)
        };
        this.$modes = {};
        this._loadMode = function (b, a) {
            function c(g) {
                if (k.$modes[b])return a(k.$modes[b]);
                k.$modes[b] = new g.Mode;
                k.$modes[b].$id = b;
                k._emit("loadmode", {name: b, mode: k.$modes[b]});
                a(k.$modes[b])
            }

            this.$modes["null"] || (this.$modes["null"] = this.$modes["ace/mode/text"] = new g);
            if (this.$modes[b])return a(this.$modes[b]);
            var k = this, i;
            try {
                i = j(b)
            } catch (e) {
            }
            if (i && i.Mode)return c(i);
            this.$mode || this.$setModePlaceholder();
            (function (b, a) {
                if (!f.get("packaged"))return a();
                d.loadScript(f.moduleUrl(b, "mode"), a)
            })(b, function () {
                j([b], c)
            })
        };
        this.$setModePlaceholder = function () {
            this.$mode = this.$modes["null"];
            var b = this.$mode.getTokenizer();
            if (this.bgTokenizer)this.bgTokenizer.setTokenizer(b); else {
                this.bgTokenizer = new i(b);
                var a = this;
                this.bgTokenizer.addEventListener("update", function (b) {
                    a._emit("tokenizerUpdate", b)
                })
            }
            this.bgTokenizer.setDocument(this.getDocument());
            this.tokenRe = this.$mode.tokenRe;
            this.nonTokenRe = this.$mode.nonTokenRe
        };
        this.$modeId = this.$mode = null;
        this.setMode = function (b) {
            b = b || "null";
            if (typeof b == "string") {
                if (this.$modeId != b) {
                    this.$modeId = b;
                    var a = this;
                    this._loadMode(b, function (c) {
                        a.$modeId === b && a.setMode(c)
                    })
                }
            } else if (this.$mode !== b) {
                this.$mode = b;
                this.$modeId = b.$id;
                this.$stopWorker();
                this.$useWorker && this.$startWorker();
                var c = b.getTokenizer();
                if (c.addEventListener !== void 0) {
                    var g = this.onReloadTokenizer.bind(this);
                    c.addEventListener("update",
                        g)
                }
                if (this.bgTokenizer)this.bgTokenizer.setTokenizer(c); else {
                    this.bgTokenizer = new i(c);
                    a = this;
                    this.bgTokenizer.addEventListener("update", function (b) {
                        a._emit("tokenizerUpdate", b)
                    })
                }
                this.bgTokenizer.setDocument(this.getDocument());
                this.bgTokenizer.start(0);
                this.tokenRe = b.tokenRe;
                this.nonTokenRe = b.nonTokenRe;
                this.$setFolding(b.foldingRules);
                this._emit("changeMode")
            }
        };
        this.$stopWorker = function () {
            this.$worker && this.$worker.terminate();
            this.$worker = null
        };
        this.$startWorker = function () {
            if (typeof Worker != "undefined" && !j.noWorker)try {
                this.$worker = this.$mode.createWorker(this)
            } catch (b) {
                console.log("Could not load worker");
                console.log(b);
                this.$worker = null
            } else this.$worker = null
        };
        this.getMode = function () {
            return this.$mode
        };
        this.$scrollTop = 0;
        this.setScrollTop = function (b) {
            b = Math.round(Math.max(0, b));
            if (this.$scrollTop !== b) {
                this.$scrollTop = b;
                this._emit("changeScrollTop", b)
            }
        };
        this.getScrollTop = function () {
            return this.$scrollTop
        };
        this.$scrollLeft = 0;
        this.setScrollLeft = function (b) {
            b = Math.round(Math.max(0, b));
            if (this.$scrollLeft !==
                b) {
                this.$scrollLeft = b;
                this._emit("changeScrollLeft", b)
            }
        };
        this.getScrollLeft = function () {
            return this.$scrollLeft
        };
        this.getScreenWidth = function () {
            return this.$computeWidth(), this.screenWidth
        };
        this.$computeWidth = function (b) {
            if (this.$modified || b) {
                this.$modified = false;
                if (this.$useWrapMode)return this.screenWidth = this.$wrapLimit;
                for (var b = this.doc.getAllLines(), a = this.$rowLengthCache, c = 0, g = 0, d = this.$foldData[g], k = d ? d.start.row : Infinity, i = b.length, e = 0; e < i; e++) {
                    if (e > k) {
                        e = d.end.row + 1;
                        if (e >= i)break;
                        k = (d = this.$foldData[g++]) ?
                            d.start.row : Infinity
                    }
                    a[e] == null && (a[e] = this.$getStringScreenWidth(b[e])[0]);
                    a[e] > c && (c = a[e])
                }
                this.screenWidth = c
            }
        };
        this.getLine = function (b) {
            return this.doc.getLine(b)
        };
        this.getLines = function (b, a) {
            return this.doc.getLines(b, a)
        };
        this.getLength = function () {
            return this.doc.getLength()
        };
        this.getTextRange = function (b) {
            return this.doc.getTextRange(b || this.selection.getRange())
        };
        this.insert = function (b, a) {
            return this.doc.insert(b, a)
        };
        this.remove = function (b) {
            return this.doc.remove(b)
        };
        this.undoChanges = function (b, a) {
            if (b.length) {
                this.$fromUndo = true;
                for (var c = null, g = b.length - 1; g != -1; g--) {
                    var d = b[g];
                    d.group == "doc" ? (this.doc.revertDeltas(d.deltas), c = this.$getUndoSelection(d.deltas, true, c)) : d.deltas.forEach(function (b) {
                        this.addFolds(b.folds)
                    }, this)
                }
                return this.$fromUndo = false, c && this.$undoSelect && !a && this.selection.setSelectionRange(c), c
            }
        };
        this.redoChanges = function (b, a) {
            if (b.length) {
                this.$fromUndo = true;
                for (var c = null, g = 0; g < b.length; g++) {
                    var d = b[g];
                    d.group == "doc" && (this.doc.applyDeltas(d.deltas), c = this.$getUndoSelection(d.deltas,
                        false, c))
                }
                return this.$fromUndo = false, c && this.$undoSelect && !a && this.selection.setSelectionRange(c), c
            }
        };
        this.setUndoSelect = function (b) {
            this.$undoSelect = b
        };
        this.$getUndoSelection = function (b, a, c) {
            function g(b) {
                b = b.action == "insertText" || b.action == "insertLines";
                return a ? !b : b
            }

            var d = b[0], i, e;
            g(d) ? i = d.range.clone() : i = k.fromPoints(d.range.start, d.range.start);
            for (var l = 1; l < b.length; l++) {
                d = b[l];
                g(d) ? (e = d.range.start, i.compare(e.row, e.column) == -1 && i.setStart(d.range.start), e = d.range.end, i.compare(e.row, e.column) ==
                    1 && i.setEnd(d.range.end)) : (e = d.range.start, i.compare(e.row, e.column) == -1 && (i = k.fromPoints(d.range.start, d.range.start)))
            }
            if (c != null) {
                b = c.compareRange(i);
                b == 1 ? i.setStart(c.start) : b == -1 && i.setEnd(c.end)
            }
            return i
        };
        this.replace = function (b, a) {
            return this.doc.replace(b, a)
        };
        this.moveText = function (b, a) {
            var c = this.getTextRange(b);
            this.remove(b);
            var g = a.row, d = a.column;
            !b.isMultiLine() && b.start.row == g && b.end.column < d && (d = d - c.length);
            if (b.isMultiLine() && b.end.row < g)var i = this.doc.$split(c), g = g - (i.length - 1);
            var i =
                g + b.end.row - b.start.row, e = b.isMultiLine() ? b.end.column : d + b.end.column - b.start.column, g = new k(g, d, i, e);
            return this.insert(g.start, c), g
        };
        this.indentRows = function (b, a, c) {
            for (c = c.replace(/\t/g, this.getTabString()); b <= a; b++)this.insert({row: b, column: 0}, c)
        };
        this.outdentRows = function (b) {
            for (var b = b.collapseRows(), a = new k(0, 0, 0, 0), c = this.getTabSize(), g = b.start.row; g <= b.end.row; ++g) {
                var d = this.getLine(g);
                a.start.row = g;
                a.end.row = g;
                for (var i = 0; i < c; ++i)if (d.charAt(i) != " ")break;
                i < c && d.charAt(i) == "\t" ? (a.start.column =
                    i, a.end.column = i + 1) : (a.start.column = 0, a.end.column = i);
                this.remove(a)
            }
        };
        this.moveLinesUp = function (b, a) {
            if (b <= 0)return 0;
            var c = this.doc.removeLines(b, a);
            return this.doc.insertLines(b - 1, c), -1
        };
        this.moveLinesDown = function (b, a) {
            if (a >= this.doc.getLength() - 1)return 0;
            var c = this.doc.removeLines(b, a);
            return this.doc.insertLines(b + 1, c), 1
        };
        this.duplicateLines = function (b, a) {
            var b = this.$clipRowToDocument(b), a = this.$clipRowToDocument(a), c = this.getLines(b, a);
            this.doc.insertLines(b, c);
            return a - b + 1
        };
        this.$clipRowToDocument =
            function (b) {
                return Math.max(0, Math.min(b, this.doc.getLength() - 1))
            };
        this.$clipColumnToRow = function (b, a) {
            return a < 0 ? 0 : Math.min(this.doc.getLine(b).length, a)
        };
        this.$clipPositionToDocument = function (b, a) {
            a = Math.max(0, a);
            if (b < 0)a = b = 0; else {
                var c = this.doc.getLength();
                b >= c ? (b = c - 1, a = this.doc.getLine(c - 1).length) : a = Math.min(this.doc.getLine(b).length, a)
            }
            return{row: b, column: a}
        };
        this.$clipRangeToDocument = function (b) {
            b.start.row < 0 ? (b.start.row = 0, b.start.column = 0) : b.start.column = this.$clipColumnToRow(b.start.row,
                b.start.column);
            var a = this.doc.getLength() - 1;
            return b.end.row > a ? (b.end.row = a, b.end.column = this.doc.getLine(a).length) : b.end.column = this.$clipColumnToRow(b.end.row, b.end.column), b
        };
        this.$wrapLimit = 80;
        this.$useWrapMode = false;
        this.$wrapLimitRange = {min: null, max: null};
        this.setUseWrapMode = function (b) {
            if (b != this.$useWrapMode) {
                this.$useWrapMode = b;
                this.$modified = true;
                this.$resetRowCache(0);
                if (b) {
                    b = this.getLength();
                    this.$wrapData = [];
                    for (var a = 0; a < b; a++)this.$wrapData.push([]);
                    this.$updateWrapData(0, b - 1)
                }
                this._emit("changeWrapMode")
            }
        };
        this.getUseWrapMode = function () {
            return this.$useWrapMode
        };
        this.setWrapLimitRange = function (b, a) {
            if (this.$wrapLimitRange.min !== b || this.$wrapLimitRange.max !== a) {
                this.$wrapLimitRange.min = b;
                this.$wrapLimitRange.max = a;
                this.$modified = true;
                this._emit("changeWrapMode")
            }
        };
        this.adjustWrapLimit = function (b) {
            b = this.$constrainWrapLimit(b);
            return b != this.$wrapLimit && b > 0 ? (this.$wrapLimit = b, this.$modified = true, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit")),
                true) : false
        };
        this.$constrainWrapLimit = function (b) {
            var a = this.$wrapLimitRange.min;
            a && (b = Math.max(a, b));
            a = this.$wrapLimitRange.max;
            return a && (b = Math.min(a, b)), Math.max(1, b)
        };
        this.getWrapLimit = function () {
            return this.$wrapLimit
        };
        this.getWrapLimitRange = function () {
            return{min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max}
        };
        this.$updateInternalDataOnChange = function (b) {
            var a = this.$useWrapMode, c, g = b.data.action, d = b.data.range.start.row, k = b.data.range.end.row, i = b.data.range.start, e = b.data.range.end,
                l = null;
            g.indexOf("Lines") != -1 ? (g == "insertLines" ? k = d + b.data.lines.length : k = d, c = b.data.lines ? b.data.lines.length : k - d) : c = k - d;
            if (c != 0)if (g.indexOf("remove") != -1) {
                this[a ? "$wrapData" : "$rowLengthCache"].splice(d, c);
                g = this.$foldData;
                l = this.getFoldsInRange(b.data.range);
                this.removeFolds(l);
                var b = this.getFoldLine(e.row), f = 0;
                if (b) {
                    b.addRemoveChars(e.row, e.column, i.column - e.column);
                    b.shiftRow(-c);
                    (k = this.getFoldLine(d)) && k !== b && (k.merge(b), b = k);
                    f = g.indexOf(b) + 1
                }
                for (f; f < g.length; f++) {
                    b = g[f];
                    b.start.row >= e.row &&
                    b.shiftRow(-c)
                }
                k = d
            } else {
                if (a) {
                    g = [d, 0];
                    for (b = 0; b < c; b++)g.push([]);
                    this.$wrapData.splice.apply(this.$wrapData, g)
                } else {
                    g = Array(c);
                    g.unshift(d, 0);
                    this.$rowLengthCache.splice.apply(this.$rowLengthCache, g)
                }
                g = this.$foldData;
                b = this.getFoldLine(d);
                f = 0;
                if (b) {
                    f = b.range.compareInside(i.row, i.column);
                    f == 0 ? (b = b.split(i.row, i.column), b.shiftRow(c), b.addRemoveChars(k, 0, e.column - i.column)) : f == -1 && (b.addRemoveChars(d, 0, e.column - i.column), b.shiftRow(c));
                    f = g.indexOf(b) + 1
                }
                for (f; f < g.length; f++) {
                    b = g[f];
                    b.start.row >= d &&
                    b.shiftRow(c)
                }
            } else {
                c = Math.abs(b.data.range.start.column - b.data.range.end.column);
                g.indexOf("remove") != -1 && (l = this.getFoldsInRange(b.data.range), this.removeFolds(l), c = -c);
                (b = this.getFoldLine(d)) && b.addRemoveChars(d, i.column, c)
            }
            return a && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), a ? this.$updateWrapData(d, k) : this.$updateRowLengthCache(d, k), l
        };
        this.$updateRowLengthCache = function (b, a) {
            this.$rowLengthCache[b] = null;
            this.$rowLengthCache[a] =
                null
        };
        this.$updateWrapData = function (b, c) {
            for (var g = this.doc.getAllLines(), d = this.getTabSize(), k = this.$wrapData, i = this.$wrapLimit, e, f, m = b, c = Math.min(c, g.length - 1); m <= c;)if (f = this.getFoldLine(m, f)) {
                e = [];
                for (f.walk(function (b, a, c, d) {
                    if (b) {
                        b = this.$getDisplayTokens(b, e.length);
                        b[0] = l;
                        for (a = 1; a < b.length; a++)b[a] = n
                    } else b = this.$getDisplayTokens(g[a].substring(d, c), e.length);
                    e = e.concat(b)
                }.bind(this), f.end.row, g[f.end.row].length + 1); e.length != 0 && e[e.length - 1] >= h;)e.pop();
                k[f.start.row] = this.$computeWrapSplits(e,
                    i, d);
                m = f.end.row + 1
            } else {
                e = this.$getDisplayTokens(a.stringTrimRight(g[m]));
                k[m] = this.$computeWrapSplits(e, i, d);
                m++
            }
        };
        var l = 3, n = 4, h = 10;
        this.$computeWrapSplits = function (b, a) {
            function c(a) {
                var d = b.slice(k, a), e = d.length;
                d.join("").replace(/12/g,function () {
                    e = e - 1
                }).replace(/2/g, function () {
                        e = e - 1
                    });
                i = i + e;
                g.push(i);
                k = a
            }

            if (b.length == 0)return[];
            for (var g = [], d = b.length, k = 0, i = 0; d - k > a;) {
                var e = k + a;
                if (b[e] >= h) {
                    for (; b[e] >= h;)e++;
                    c(e)
                } else if (b[e] == l || b[e] == n) {
                    for (e; e != k - 1; e--)if (b[e] == l)break;
                    if (!(e > k)) {
                        e = k + a;
                        for (e; e <
                            b.length; e++)if (b[e] != n)break;
                        if (e == b.length)break
                    }
                    c(e)
                } else {
                    for (var f = Math.max(e - 10, k - 1); e > f && b[e] < l;)e--;
                    for (; e > f && b[e] == 9;)e--;
                    if (e > f)c(++e); else {
                        e = k + a;
                        c(e)
                    }
                }
            }
            return g
        };
        this.$getDisplayTokens = function (a, c) {
            for (var g = [], d, c = c || 0, k = 0; k < a.length; k++) {
                d = a.charCodeAt(k);
                if (d == 9) {
                    d = this.getScreenTabSize(g.length + c);
                    g.push(11);
                    for (var i = 1; i < d; i++)g.push(12)
                } else d == 32 ? g.push(h) : d > 39 && d < 48 || d > 57 && d < 64 ? g.push(9) : d >= 4352 && b(d) ? g.push(1, 2) : g.push(1)
            }
            return g
        };
        this.$getStringScreenWidth = function (a, c, g) {
            if (c ==
                0)return[0, 0];
            c == null && (c = Infinity);
            var g = g || 0, d, k;
            for (k = 0; k < a.length; k++) {
                d = a.charCodeAt(k);
                d == 9 ? g = g + this.getScreenTabSize(g) : d >= 4352 && b(d) ? g = g + 2 : g = g + 1;
                if (g > c)break
            }
            return[g, k]
        };
        this.getRowLength = function (b) {
            return!this.$useWrapMode || !this.$wrapData[b] ? 1 : this.$wrapData[b].length + 1
        };
        this.getScreenLastRowColumn = function (b) {
            b = this.screenToDocumentPosition(b, Number.MAX_VALUE);
            return this.documentToScreenColumn(b.row, b.column)
        };
        this.getDocumentLastRowColumn = function (b, a) {
            return this.getScreenLastRowColumn(this.documentToScreenRow(b,
                a))
        };
        this.getDocumentLastRowColumnPosition = function (b, a) {
            return this.screenToDocumentPosition(this.documentToScreenRow(b, a), Number.MAX_VALUE / 10)
        };
        this.getRowSplitData = function (b) {
            return this.$useWrapMode ? this.$wrapData[b] : void 0
        };
        this.getScreenTabSize = function (b) {
            return this.$tabSize - b % this.$tabSize
        };
        this.screenToDocumentRow = function (b, a) {
            return this.screenToDocumentPosition(b, a).row
        };
        this.screenToDocumentColumn = function (b, a) {
            return this.screenToDocumentPosition(b, a).column
        };
        this.screenToDocumentPosition =
            function (b, a) {
                if (b < 0)return{row: 0, column: 0};
                var c, g = 0, d = 0, k, i = 0;
                c = 0;
                var e = this.$screenRowCache, l = this.$getRowCacheIndex(e, b);
                if (0 < l && l < e.length) {
                    i = e[l];
                    g = this.$docRowCache[l];
                    l = b > i || b == i && l == e.length - 1
                } else l = l != 0 || !e.length;
                for (var f = this.getLength() - 1, m = (e = this.getNextFoldLine(g)) ? e.start.row : Infinity; i <= b;) {
                    c = this.getRowLength(g);
                    if (i + c - 1 >= b || g >= f)break;
                    i = i + c;
                    g++;
                    g > m && (g = e.end.row + 1, e = this.getNextFoldLine(g, e), m = e ? e.start.row : Infinity);
                    l && (this.$docRowCache.push(g), this.$screenRowCache.push(i))
                }
                if (e &&
                    e.start.row <= g) {
                    c = this.getFoldDisplayLine(e);
                    g = e.start.row
                } else {
                    if (i + c <= b || g > f)return{row: f, column: this.getLine(f).length};
                    c = this.getLine(g);
                    e = null
                }
                if (this.$useWrapMode)(l = this.$wrapData[g]) && (k = l[b - i], b > i && l.length && (d = l[b - i - 1] || l[l.length - 1], c = c.substring(d)));
                return d = d + this.$getStringScreenWidth(c, a)[1], this.$useWrapMode && d >= k && (d = k - 1), e ? e.idxToPosition(d) : {row: g, column: d}
            };
        this.documentToScreenPosition = function (b, a) {
            var c = typeof a == "undefined" ? this.$clipPositionToDocument(b.row, b.column) : this.$clipPositionToDocument(b,
                a), b = c.row, a = c.column, c = 0, g = null, d = null;
            (d = this.getFoldAt(b, a, 1)) && (b = d.start.row, a = d.start.column);
            var k, d = 0, i = this.$docRowCache, e = this.$getRowCacheIndex(i, b);
            if (0 < e && e < i.length)var d = i[e], c = this.$screenRowCache[e], l = b > d || b == d && e == i.length - 1; else l = e != 0 || !i.length;
            for (e = (i = this.getNextFoldLine(d)) ? i.start.row : Infinity; d < b;) {
                if (d >= e) {
                    k = i.end.row + 1;
                    if (k > b)break;
                    e = (i = this.getNextFoldLine(k, i)) ? i.start.row : Infinity
                } else k = d + 1;
                c = c + this.getRowLength(d);
                d = k;
                l && (this.$docRowCache.push(d), this.$screenRowCache.push(c))
            }
            k =
                "";
            i && d >= e ? (k = this.getFoldDisplayLine(i, b, a), g = i.start.row) : (k = this.getLine(b).substring(0, a), g = b);
            if (this.$useWrapMode) {
                g = this.$wrapData[g];
                for (d = 0; k.length >= g[d];) {
                    c++;
                    d++
                }
                k = k.substring(g[d - 1] || 0, k.length)
            }
            return{row: c, column: this.$getStringScreenWidth(k)[0]}
        };
        this.documentToScreenColumn = function (b, a) {
            return this.documentToScreenPosition(b, a).column
        };
        this.documentToScreenRow = function (b, a) {
            return this.documentToScreenPosition(b, a).row
        };
        this.getScreenLength = function () {
            var b = 0, a = null;
            if (this.$useWrapMode)for (var c =
                this.$wrapData.length, g = 0, d = 0, k = (a = this.$foldData[d++]) ? a.start.row : Infinity; g < c;) {
                b = b + (this.$wrapData[g].length + 1);
                g++;
                g > k && (g = a.end.row + 1, a = this.$foldData[d++], k = a ? a.start.row : Infinity)
            } else for (var b = this.getLength(), c = this.$foldData, d = 0; d < c.length; d++) {
                a = c[d];
                b = b - (a.end.row - a.start.row)
            }
            return b
        }
    }).call(p.prototype);
    j("./edit_session/folding").Folding.call(p.prototype);
    j("./edit_session/bracket_match").BracketMatch.call(p.prototype);
    h.EditSession = p
});
define("ace/config", ["require", "exports", "module", "ace/lib/lang"], function (j, h, f) {
    function e(b) {
        return b.replace(/-(.)/g, function (b, a) {
            return a.toUpperCase()
        })
    }

    "no use strict";
    var a = j("./lib/lang"), d = function () {
        return this
    }(), c = {packaged: !1, workerPath: "", modePath: "", themePath: "", suffix: ".js", $moduleUrls: {}};
    h.get = function (b) {
        if (!c.hasOwnProperty(b))throw Error("Unknown config key: " + b);
        return c[b]
    };
    h.set = function (b, a) {
        if (!c.hasOwnProperty(b))throw Error("Unknown config key: " + b);
        c[b] = a
    };
    h.all = function () {
        return a.copyObject(c)
    };
    h.moduleUrl = function (b, a) {
        if (c.$moduleUrls[b])return c.$moduleUrls[b];
        var d = b.split("/"), a = a || d[d.length - 2] || "", e = d[d.length - 1].replace(a, "").replace(/(^[\-_])|([\-_]$)/, "");
        return!e && 1 < d.length && (e = d[d.length - 2]), this.get(a + "Path") + "/" + a + "-" + e + this.get("suffix")
    };
    h.setModuleUrl = function (b, a) {
        return c.$moduleUrls[b] = a
    };
    h.init = function () {
        c.packaged = j.packaged || f.packaged || d.define && define.packaged;
        if (!d.document)return"";
        for (var b = {}, a = "", k = document.getElementsByTagName("script"), l = 0; l < k.length; l++) {
            var i =
                k[l], m = i.src || i.getAttribute("src");
            if (m) {
                for (var i = i.attributes, p = 0, s = i.length; p < s; p++) {
                    var q = i[p];
                    0 === q.name.indexOf("data-ace-") && (b[e(q.name.replace(/^data-ace-/, ""))] = q.value)
                }
                (m = m.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/)) && (a = m[1])
            }
        }
        a && (b.base = b.base || a, b.packaged = !0);
        b.workerPath = b.workerPath || b.base;
        b.modePath = b.modePath || b.base;
        b.themePath = b.themePath || b.base;
        delete b.base;
        for (var n in b)"undefined" != typeof b[n] && h.set(n, b[n])
    }
});
define("ace/lib/net", ["require", "exports", "module", "ace/lib/useragent"], function (j, h) {
    var f = j("./useragent");
    h.get = function (a, d) {
        var c = h.createXhr();
        c.open("GET", a, !0);
        c.onreadystatechange = function () {
            4 === c.readyState && d(c.responseText)
        };
        c.send(null)
    };
    var e = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
    h.createXhr = function () {
        var a, d, c;
        if ("undefined" != typeof XMLHttpRequest)return new XMLHttpRequest;
        for (d = 0; 3 > d; d++) {
            c = e[d];
            try {
                a = new ActiveXObject(c)
            } catch (b) {
            }
            if (a) {
                e = [c];
                break
            }
        }
        if (!a)throw Error("createXhr(): XMLHttpRequest not available");
        return a
    };
    h.loadScript = function (a, d) {
        var c = document.getElementsByTagName("head")[0], b = document.createElement("script");
        b.src = a;
        c.appendChild(b);
        f.isOldIE ? b.onreadystatechange = function () {
            "loaded" == this.readyState && d()
        } : b.onload = d
    }
});
define("ace/lib/event_emitter", ["require", "exports", "module"], function (j, h) {
    var f = {};
    f._emit = f._dispatchEvent = function (e, a) {
        this._eventRegistry = this._eventRegistry || {};
        this._defaultHandlers = this._defaultHandlers || {};
        var d = this._eventRegistry[e] || [], c = this._defaultHandlers[e];
        if (d.length || c) {
            if ("object" != typeof a || !a)a = {};
            a.type || (a.type = e);
            a.stopPropagation || (a.stopPropagation = function () {
                this.propagationStopped = !0
            });
            a.preventDefault || (a.preventDefault = function () {
                this.defaultPrevented = !0
            });
            for (var b =
                0; b < d.length && !(d[b](a), a.propagationStopped); b++);
            if (c && !a.defaultPrevented)return c(a)
        }
    };
    f.setDefaultHandler = function (e, a) {
        this._defaultHandlers = this._defaultHandlers || {};
        if (this._defaultHandlers[e])throw Error("The default handler for '" + e + "' is already set");
        this._defaultHandlers[e] = a
    };
    f.on = f.addEventListener = function (e, a) {
        this._eventRegistry = this._eventRegistry || {};
        var d = this._eventRegistry[e];
        d || (d = this._eventRegistry[e] = []);
        -1 == d.indexOf(a) && d.push(a)
    };
    f.removeListener = f.removeEventListener =
        function (e, a) {
            this._eventRegistry = this._eventRegistry || {};
            var d = this._eventRegistry[e];
            if (d) {
                var c = d.indexOf(a);
                -1 !== c && d.splice(c, 1)
            }
        };
    f.removeAllListeners = function (e) {
        this._eventRegistry && (this._eventRegistry[e] = [])
    };
    h.EventEmitter = f
});
define("ace/selection", "require exports module ace/lib/oop ace/lib/lang ace/lib/event_emitter ace/range".split(" "), function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/lang"), a = j("./lib/event_emitter").EventEmitter, d = j("./range").Range, c = function (b) {
        this.session = b;
        this.doc = b.getDocument();
        this.clearSelection();
        this.lead = this.selectionLead = this.doc.createAnchor(0, 0);
        this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
        var a = this;
        this.lead.on("change", function (b) {
            a._emit("changeCursor");
            a.$isEmpty ||
            a._emit("changeSelection");
            !a.$keepDesiredColumnOnChange && b.old.column != b.value.column && (a.$desiredColumn = null)
        });
        this.selectionAnchor.on("change", function () {
            a.$isEmpty || a._emit("changeSelection")
        })
    };
    (function () {
        f.implement(this, a);
        this.isEmpty = function () {
            return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
        };
        this.isMultiLine = function () {
            return this.isEmpty() ? false : this.getRange().isMultiLine()
        };
        this.getCursor = function () {
            return this.lead.getPosition()
        };
        this.setSelectionAnchor =
            function (b, a) {
                this.anchor.setPosition(b, a);
                this.$isEmpty && (this.$isEmpty = false, this._emit("changeSelection"))
            };
        this.getSelectionAnchor = function () {
            return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
        };
        this.getSelectionLead = function () {
            return this.lead.getPosition()
        };
        this.shiftSelection = function (b) {
            if (this.$isEmpty)this.moveCursorTo(this.lead.row, this.lead.column + b); else {
                var a = this.getSelectionAnchor(), c = this.getSelectionLead(), d = this.isBackwards();
                (!d || a.column !== 0) && this.setSelectionAnchor(a.row,
                    a.column + b);
                (d || c.column !== 0) && this.$moveSelection(function () {
                    this.moveCursorTo(c.row, c.column + b)
                })
            }
        };
        this.isBackwards = function () {
            var b = this.anchor, a = this.lead;
            return b.row > a.row || b.row == a.row && b.column > a.column
        };
        this.getRange = function () {
            var b = this.anchor, a = this.lead;
            return this.isEmpty() ? d.fromPoints(a, a) : this.isBackwards() ? d.fromPoints(a, b) : d.fromPoints(b, a)
        };
        this.clearSelection = function () {
            this.$isEmpty || (this.$isEmpty = true, this._emit("changeSelection"))
        };
        this.selectAll = function () {
            var b = this.doc.getLength() -
                1;
            this.setSelectionAnchor(0, 0);
            this.moveCursorTo(b, this.doc.getLine(b).length)
        };
        this.setRange = this.setSelectionRange = function (b, a) {
            a ? (this.setSelectionAnchor(b.end.row, b.end.column), this.selectTo(b.start.row, b.start.column)) : (this.setSelectionAnchor(b.start.row, b.start.column), this.selectTo(b.end.row, b.end.column));
            this.$desiredColumn = null
        };
        this.$moveSelection = function (b) {
            var a = this.lead;
            this.$isEmpty && this.setSelectionAnchor(a.row, a.column);
            b.call(this)
        };
        this.selectTo = function (b, a) {
            this.$moveSelection(function () {
                this.moveCursorTo(b,
                    a)
            })
        };
        this.selectToPosition = function (b) {
            this.$moveSelection(function () {
                this.moveCursorToPosition(b)
            })
        };
        this.selectUp = function () {
            this.$moveSelection(this.moveCursorUp)
        };
        this.selectDown = function () {
            this.$moveSelection(this.moveCursorDown)
        };
        this.selectRight = function () {
            this.$moveSelection(this.moveCursorRight)
        };
        this.selectLeft = function () {
            this.$moveSelection(this.moveCursorLeft)
        };
        this.selectLineStart = function () {
            this.$moveSelection(this.moveCursorLineStart)
        };
        this.selectLineEnd = function () {
            this.$moveSelection(this.moveCursorLineEnd)
        };
        this.selectFileEnd = function () {
            this.$moveSelection(this.moveCursorFileEnd)
        };
        this.selectFileStart = function () {
            this.$moveSelection(this.moveCursorFileStart)
        };
        this.selectWordRight = function () {
            this.$moveSelection(this.moveCursorWordRight)
        };
        this.selectWordLeft = function () {
            this.$moveSelection(this.moveCursorWordLeft)
        };
        this.getWordRange = function (b, a) {
            if (typeof a == "undefined")var c = b || this.lead, b = c.row, a = c.column;
            return this.session.getWordRange(b, a)
        };
        this.selectWord = function () {
            this.setSelectionRange(this.getWordRange())
        };
        this.selectAWord = function () {
            var b = this.getCursor();
            this.setSelectionRange(this.session.getAWordRange(b.row, b.column))
        };
        this.getLineRange = function (b, a) {
            var c = typeof b == "number" ? b : this.lead.row, e, i = this.session.getFoldLine(c);
            return i ? (c = i.start.row, e = i.end.row) : e = c, a ? new d(c, 0, e, this.session.getLine(e).length) : new d(c, 0, e + 1, 0)
        };
        this.selectLine = function () {
            this.setSelectionRange(this.getLineRange())
        };
        this.moveCursorUp = function () {
            this.moveCursorBy(-1, 0)
        };
        this.moveCursorDown = function () {
            this.moveCursorBy(1,
                0)
        };
        this.moveCursorLeft = function () {
            var b = this.lead.getPosition(), a;
            if (a = this.session.getFoldAt(b.row, b.column, -1))this.moveCursorTo(a.start.row, a.start.column); else if (b.column == 0)b.row > 0 && this.moveCursorTo(b.row - 1, this.doc.getLine(b.row - 1).length); else {
                a = this.session.getTabSize();
                this.session.isTabStop(b) && this.doc.getLine(b.row).slice(b.column - a, b.column).split(" ").length - 1 == a ? this.moveCursorBy(0, -a) : this.moveCursorBy(0, -1)
            }
        };
        this.moveCursorRight = function () {
            var b = this.lead.getPosition();
            if (b = this.session.getFoldAt(b.row,
                b.column, 1))this.moveCursorTo(b.end.row, b.end.column); else if (this.lead.column == this.doc.getLine(this.lead.row).length)this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0); else {
                var a = this.session.getTabSize(), b = this.lead;
                this.session.isTabStop(b) && this.doc.getLine(b.row).slice(b.column, b.column + a).split(" ").length - 1 == a ? this.moveCursorBy(0, a) : this.moveCursorBy(0, 1)
            }
        };
        this.moveCursorLineStart = function () {
            var b = this.lead.row, a = this.lead.column, c = this.session.screenToDocumentPosition(this.session.documentToScreenRow(b,
                a), 0), b = this.session.getDisplayLine(b, null, c.row, c.column).match(/^\s*/);
            b[0].length == a ? this.moveCursorTo(c.row, c.column) : this.moveCursorTo(c.row, c.column + b[0].length)
        };
        this.moveCursorLineEnd = function () {
            var b = this.lead, b = this.session.getDocumentLastRowColumnPosition(b.row, b.column);
            if (this.lead.column == b.column) {
                var a = this.session.getLine(b.row);
                if (b.column == a.length) {
                    a = a.search(/\s+$/);
                    a > 0 && (b.column = a)
                }
            }
            this.moveCursorTo(b.row, b.column)
        };
        this.moveCursorFileEnd = function () {
            var b = this.doc.getLength() -
                1, a = this.doc.getLine(b).length;
            this.moveCursorTo(b, a)
        };
        this.moveCursorFileStart = function () {
            this.moveCursorTo(0, 0)
        };
        this.moveCursorLongWordRight = function () {
            var b = this.lead.row, a = this.lead.column, c = this.doc.getLine(b), d = c.substring(a);
            this.session.nonTokenRe.lastIndex = 0;
            this.session.tokenRe.lastIndex = 0;
            var e = this.session.getFoldAt(b, a, 1);
            if (e)this.moveCursorTo(e.end.row, e.end.column); else {
                if (this.session.nonTokenRe.exec(d)) {
                    a = a + this.session.nonTokenRe.lastIndex;
                    this.session.nonTokenRe.lastIndex = 0;
                    d =
                        c.substring(a)
                }
                if (a >= c.length) {
                    this.moveCursorTo(b, c.length);
                    this.moveCursorRight();
                    b < this.doc.getLength() - 1 && this.moveCursorWordRight()
                } else {
                    if (this.session.tokenRe.exec(d)) {
                        a = a + this.session.tokenRe.lastIndex;
                        this.session.tokenRe.lastIndex = 0
                    }
                    this.moveCursorTo(b, a)
                }
            }
        };
        this.moveCursorLongWordLeft = function () {
            var b = this.lead.row, a = this.lead.column, c;
            if (c = this.session.getFoldAt(b, a, -1))this.moveCursorTo(c.start.row, c.start.column); else {
                c = this.session.getFoldStringAt(b, a, -1);
                c == null && (c = this.doc.getLine(b).substring(0,
                    a));
                c = e.stringReverse(c);
                this.session.nonTokenRe.lastIndex = 0;
                this.session.tokenRe.lastIndex = 0;
                if (this.session.nonTokenRe.exec(c)) {
                    a = a - this.session.nonTokenRe.lastIndex;
                    c = c.slice(this.session.nonTokenRe.lastIndex);
                    this.session.nonTokenRe.lastIndex = 0
                }
                if (a <= 0) {
                    this.moveCursorTo(b, 0);
                    this.moveCursorLeft();
                    b > 0 && this.moveCursorWordLeft()
                } else {
                    if (this.session.tokenRe.exec(c)) {
                        a = a - this.session.tokenRe.lastIndex;
                        this.session.tokenRe.lastIndex = 0
                    }
                    this.moveCursorTo(b, a)
                }
            }
        };
        this.$shortWordEndIndex = function (b) {
            var a =
                0, c, d = /\s/, e = this.session.tokenRe;
            e.lastIndex = 0;
            if (this.session.tokenRe.exec(b))a = this.session.tokenRe.lastIndex; else {
                for (; (c = b[a]) && d.test(c);)a++;
                if (a <= 1)for (e.lastIndex = 0; (c = b[a]) && !e.test(c);) {
                    e.lastIndex = 0;
                    a++;
                    if (d.test(c)) {
                        if (a > 2) {
                            a--;
                            break
                        }
                        for (; (c = b[a]) && d.test(c);)a++;
                        if (a > 2)break
                    }
                }
            }
            return e.lastIndex = 0, a
        };
        this.moveCursorShortWordRight = function () {
            var b = this.lead.row, a = this.lead.column, c = this.doc.getLine(b), d = c.substring(a), e = this.session.getFoldAt(b, a, 1);
            if (e)return this.moveCursorTo(e.end.row,
                e.end.column);
            if (a == c.length) {
                a = this.doc.getLength();
                do {
                    b++;
                    d = this.doc.getLine(b)
                } while (b < a && /^\s*$/.test(d));
                /^\s+/.test(d) || (d = "");
                a = 0
            }
            d = this.$shortWordEndIndex(d);
            this.moveCursorTo(b, a + d)
        };
        this.moveCursorShortWordLeft = function () {
            var b = this.lead.row, a = this.lead.column, c;
            if (c = this.session.getFoldAt(b, a, -1))return this.moveCursorTo(c.start.row, c.start.column);
            c = this.session.getLine(b).substring(0, a);
            if (a == 0) {
                do {
                    b--;
                    c = this.doc.getLine(b)
                } while (b > 0 && /^\s*$/.test(c));
                a = c.length;
                /\s+$/.test(c) || (c = "")
            }
            c =
                this.$shortWordEndIndex(e.stringReverse(c));
            return this.moveCursorTo(b, a - c)
        };
        this.moveCursorWordRight = function () {
            this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
        };
        this.moveCursorWordLeft = function () {
            this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
        };
        this.moveCursorBy = function (b, a) {
            var c = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            a === 0 && (this.$desiredColumn ? c.column = this.$desiredColumn : this.$desiredColumn =
                c.column);
            c = this.session.screenToDocumentPosition(c.row + b, c.column);
            this.moveCursorTo(c.row, c.column + a, a === 0)
        };
        this.moveCursorToPosition = function (b) {
            this.moveCursorTo(b.row, b.column)
        };
        this.moveCursorTo = function (b, a, c) {
            var d = this.session.getFoldAt(b, a, 1);
            d && (b = d.start.row, a = d.start.column);
            this.$keepDesiredColumnOnChange = true;
            this.lead.setPosition(b, a);
            this.$keepDesiredColumnOnChange = false;
            c || (this.$desiredColumn = null)
        };
        this.moveCursorToScreen = function (b, a, c) {
            b = this.session.screenToDocumentPosition(b,
                a);
            this.moveCursorTo(b.row, b.column, c)
        };
        this.detach = function () {
            this.lead.detach();
            this.anchor.detach();
            this.session = this.doc = null
        };
        this.fromOrientedRange = function (b) {
            this.setSelectionRange(b, b.cursor == b.start);
            this.$desiredColumn = b.desiredColumn || this.$desiredColumn
        };
        this.toOrientedRange = function (b) {
            var a = this.getRange();
            return b ? (b.start.column = a.start.column, b.start.row = a.start.row, b.end.column = a.end.column, b.end.row = a.end.row) : b = a, b.cursor = this.isBackwards() ? b.start : b.end, b.desiredColumn = this.$desiredColumn,
                b
        }
    }).call(c.prototype);
    h.Selection = c
});
define("ace/range", ["require", "exports", "module"], function (j, h) {
    var f = function (e, a, d, c) {
        this.start = {row: e, column: a};
        this.end = {row: d, column: c}
    };
    (function () {
        this.isEqual = function (e) {
            return this.start.row == e.start.row && this.end.row == e.end.row && this.start.column == e.start.column && this.end.column == e.end.column
        };
        this.toString = function () {
            return"Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
        };
        this.contains = function (e, a) {
            return 0 == this.compare(e, a)
        };
        this.compareRange =
            function (e) {
                var a, d = e.end, e = e.start;
                return a = this.compare(d.row, d.column), 1 == a ? (a = this.compare(e.row, e.column), 1 == a ? 2 : 0 == a ? 1 : 0) : -1 == a ? -2 : (a = this.compare(e.row, e.column), -1 == a ? -1 : 1 == a ? 42 : 0)
            };
        this.comparePoint = function (e) {
            return this.compare(e.row, e.column)
        };
        this.containsRange = function (e) {
            return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
        };
        this.intersects = function (e) {
            e = this.compareRange(e);
            return-1 == e || 0 == e || 1 == e
        };
        this.isEnd = function (e, a) {
            return this.end.row == e && this.end.column == a
        };
        this.isStart =
            function (e, a) {
                return this.start.row == e && this.start.column == a
            };
        this.setStart = function (e, a) {
            "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = a)
        };
        this.setEnd = function (e, a) {
            "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = a)
        };
        this.inside = function (e, a) {
            return 0 == this.compare(e, a) ? this.isEnd(e, a) || this.isStart(e, a) ? !1 : !0 : !1
        };
        this.insideStart = function (e, a) {
            return 0 == this.compare(e, a) ? this.isEnd(e, a) ? !1 :
                !0 : !1
        };
        this.insideEnd = function (e, a) {
            return 0 == this.compare(e, a) ? this.isStart(e, a) ? !1 : !0 : !1
        };
        this.compare = function (e, a) {
            return!this.isMultiLine() && e === this.start.row ? a < this.start.column ? -1 : a > this.end.column ? 1 : 0 : e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? a >= this.start.column ? 0 : -1 : this.end.row === e ? a <= this.end.column ? 0 : 1 : 0
        };
        this.compareStart = function (e, a) {
            return this.start.row == e && this.start.column == a ? -1 : this.compare(e, a)
        };
        this.compareEnd = function (e, a) {
            return this.end.row == e && this.end.column ==
                a ? 1 : this.compare(e, a)
        };
        this.compareInside = function (e, a) {
            return this.end.row == e && this.end.column == a ? 1 : this.start.row == e && this.start.column == a ? -1 : this.compare(e, a)
        };
        this.clipRows = function (e, a) {
            if (this.end.row > a)var d = {row: a + 1, column: 0};
            if (this.start.row > a)var c = {row: a + 1, column: 0};
            this.start.row < e && (c = {row: e, column: 0});
            this.end.row < e && (d = {row: e, column: 0});
            return f.fromPoints(c || this.start, d || this.end)
        };
        this.extend = function (e, a) {
            var d = this.compare(e, a);
            if (0 == d)return this;
            if (-1 == d)var c = {row: e, column: a};
            else var b = {row: e, column: a};
            return f.fromPoints(c || this.start, b || this.end)
        };
        this.isEmpty = function () {
            return this.start.row == this.end.row && this.start.column == this.end.column
        };
        this.isMultiLine = function () {
            return this.start.row !== this.end.row
        };
        this.clone = function () {
            return f.fromPoints(this.start, this.end)
        };
        this.collapseRows = function () {
            return 0 == this.end.column ? new f(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new f(this.start.row, 0, this.end.row, 0)
        };
        this.toScreenRange = function (e) {
            var a =
                e.documentToScreenPosition(this.start), e = e.documentToScreenPosition(this.end);
            return new f(a.row, a.column, e.row, e.column)
        }
    }).call(f.prototype);
    f.fromPoints = function (e, a) {
        return new f(e.row, e.column, a.row, a.column)
    };
    h.Range = f
});
define("ace/mode/text", "require exports module ace/tokenizer ace/mode/text_highlight_rules ace/mode/behaviour ace/unicode".split(" "), function (j, h) {
    var f = j("../tokenizer").Tokenizer, e = j("./text_highlight_rules").TextHighlightRules, a = j("./behaviour").Behaviour, d = j("../unicode"), c = function () {
        this.$tokenizer = new f((new e).getRules());
        this.$behaviour = new a
    };
    (function () {
        this.tokenRe = RegExp("^[" + d.packages.L + d.packages.Mn + d.packages.Mc + d.packages.Nd + d.packages.Pc + "\\$_]+", "g");
        this.nonTokenRe = RegExp("^(?:[^" +
            d.packages.L + d.packages.Mn + d.packages.Mc + d.packages.Nd + d.packages.Pc + "\\$_]|s])+", "g");
        this.getTokenizer = function () {
            return this.$tokenizer
        };
        this.toggleCommentLines = function () {
        };
        this.getNextLineIndent = function () {
            return""
        };
        this.checkOutdent = function () {
            return false
        };
        this.autoOutdent = function () {
        };
        this.$getIndent = function (b) {
            return(b = b.match(/^(\s+)/)) ? b[1] : ""
        };
        this.createWorker = function () {
            return null
        };
        this.createModeDelegates = function (b) {
            if (this.$embeds) {
                this.$modes = {};
                for (var a = 0; a < this.$embeds.length; a++)b[this.$embeds[a]] &&
                (this.$modes[this.$embeds[a]] = new b[this.$embeds[a]]);
                for (var c = ["toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction"], a = 0; a < c.length; a++)(function (b) {
                    var d = c[a], e = b[d];
                    b[c[a]] = function () {
                        return this.$delegator(d, arguments, e)
                    }
                })(this)
            }
        };
        this.$delegator = function (b, a, c) {
            for (var d = a[0], e = 0; e < this.$embeds.length; e++)if (this.$modes[this.$embeds[e]]) {
                var f = d.split(this.$embeds[e]);
                if (!f[0] && f[1]) {
                    a[0] = f[1];
                    c = this.$modes[this.$embeds[e]];
                    return c[b].apply(c, a)
                }
            }
            b = c.apply(this,
                a);
            return c ? b : void 0
        };
        this.transformAction = function (b, a, c, d, e) {
            if (this.$behaviour) {
                var f = this.$behaviour.getBehaviours(), h;
                for (h in f)if (f[h][a]) {
                    var j = f[h][a].apply(this, arguments);
                    if (j)return j
                }
            }
        }
    }).call(c.prototype);
    h.Mode = c
});
define("ace/tokenizer", ["require", "exports", "module"], function (j, h) {
    var f = function (e, a) {
        a = a ? "g" + a : "g";
        this.rules = e;
        this.regExps = {};
        this.matchMappings = {};
        for (var d in this.rules) {
            for (var c = this.rules[d], b = [], g = 0, k = this.matchMappings[d] = {}, l = 0; l < c.length; l++) {
                c[l].regex instanceof RegExp && (c[l].regex = c[l].regex.toString().slice(1, -1));
                var i = RegExp("(?:(" + c[l].regex + ")|(.))").exec("a").length - 2, f = c[l].regex.replace(/\\([0-9]+)/g, function (b, a) {
                    return"\\" + (parseInt(a, 10) + g + 1)
                });
                if (1 < i && c[l].token.length !==
                    i - 1)throw Error("For " + c[l].regex + " the matching groups and length of the token array don't match (rule #" + l + " of state " + d + ")");
                k[g] = {rule: l, len: i};
                g += i;
                b.push(f)
            }
            this.regExps[d] = RegExp("(?:(" + b.join(")|(") + ")|(.))", a)
        }
    };
    (function () {
        this.getLineTokens = function (e, a) {
            var d = a || "start", c = this.rules[d], b = this.matchMappings[d], g = this.regExps[d];
            g.lastIndex = 0;
            for (var k, l = [], i = 0, f = {type: null, value: ""}; k = g.exec(e);) {
                for (var h = "text", j = null, q = [k[0]], n = 0; n < k.length - 2; n++)if (void 0 !== k[n + 1]) {
                    j = c[b[n].rule];
                    1 < b[n].len && (q = k.slice(n + 2, n + 1 + b[n].len));
                    "function" == typeof j.token ? h = j.token.apply(this, q) : h = j.token;
                    if (j.next) {
                        d = j.next;
                        c = this.rules[d];
                        b = this.matchMappings[d];
                        i = g.lastIndex;
                        g = this.regExps[d];
                        if (void 0 === g)throw Error("You indicated a state of " + j.next + " to go to, but it doesn't exist!");
                        g.lastIndex = i
                    }
                    break
                }
                if (q[0]) {
                    "string" == typeof h && (q = [q.join("")], h = [h]);
                    for (n = 0; n < q.length; n++)q[n] && ((!j || j.merge || "text" === h[n]) && f.type === h[n] ? f.value += q[n] : (f.type && l.push(f), f = {type: h[n], value: q[n]}))
                }
                if (i ==
                    e.length)break;
                i = g.lastIndex
            }
            return f.type && l.push(f), {tokens: l, state: d}
        }
    }).call(f.prototype);
    h.Tokenizer = f
});
define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (j, h) {
    var f = j("../lib/lang"), e = function () {
        this.$rules = {start: [
            {token: "empty_line", regex: "^$"},
            {token: "text", regex: ".+"}
        ]}
    };
    (function () {
        this.addRules = function (a, d) {
            for (var c in a) {
                for (var b = a[c], g = 0; g < b.length; g++) {
                    var k = b[g];
                    k.next && (k.next = d + k.next)
                }
                this.$rules[d + c] = b
            }
        };
        this.getRules = function () {
            return this.$rules
        };
        this.embedRules = function (a, d, c, b) {
            a = (new a).getRules();
            if (b)for (var g = 0; g < b.length; g++)b[g] =
                d + b[g]; else for (g in b = [], a)b.push(d + g);
            this.addRules(a, d);
            for (g = 0; g < b.length; g++)Array.prototype.unshift.apply(this.$rules[b[g]], f.deepCopy(c));
            this.$embeds || (this.$embeds = []);
            this.$embeds.push(d)
        };
        this.getEmbeds = function () {
            return this.$embeds
        };
        this.createKeywordMapper = function (a, d, c, b) {
            var g = Object.create(null);
            return Object.keys(a).forEach(function (c) {
                for (var d = a[c].split(b || "|"), e = d.length; e--;)g[d[e]] = c
            }), a = null, c ? function (b) {
                return g[b.toLowerCase()] || d
            } : function (b) {
                return g[b] || d
            }
        }
    }).call(e.prototype);
    h.TextHighlightRules = e
});
define("ace/mode/behaviour", ["require", "exports", "module"], function (j, h) {
    var f = function () {
        this.$behaviours = {}
    };
    (function () {
        this.add = function (e, a, d) {
            switch (void 0) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[e]:
                    this.$behaviours[e] = {}
            }
            this.$behaviours[e][a] = d
        };
        this.addBehaviours = function (e) {
            for (var a in e)for (var d in e[a])this.add(a, d, e[a][d])
        };
        this.remove = function (e) {
            this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
        };
        this.inherit = function (e, a) {
            this.addBehaviours("function" == typeof e ? (new e).getBehaviours(a) : e.getBehaviours(a))
        };
        this.getBehaviours = function (e) {
            if (!e)return this.$behaviours;
            for (var a = {}, d = 0; d < e.length; d++)this.$behaviours[e[d]] && (a[e[d]] = this.$behaviours[e[d]]);
            return a
        }
    }).call(f.prototype);
    h.Behaviour = f
});
define("ace/unicode", ["require", "exports", "module"], function (j, h) {
    h.packages = {};
    var f = {L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC", Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
            Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
            Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC", Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F", Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
            M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
            Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
            Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
            Me: "0488048906DE20DD-20E020E2-20E4A670-A672", N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
            Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19", Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF", No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
            P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
            Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D", Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62", Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
            Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20", Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21", Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F", Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
            S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
            Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC", Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6", Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
            So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
            Z: "002000A01680180E2000-200A20282029202F205F3000", Zs: "002000A01680180E2000-200A202F205F3000", Zl: "2028", Zp: "2029", C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
            Cc: "0000-001F007F-009F", Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB", Co: "E000-F8FF", Cs: "D800-DFFF", Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"},
        e = /\w{4}/g, a;
    for (a in f)h.packages[a] = f[a].replace(e, "\\u$&")
});
define("ace/document", "require exports module ace/lib/oop ace/lib/event_emitter ace/range ace/anchor".split(" "), function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/event_emitter").EventEmitter, a = j("./range").Range, d = j("./anchor").Anchor, c = function (b) {
        this.$lines = [];
        b.length == 0 ? this.$lines = [""] : Array.isArray(b) ? this.insertLines(0, b) : this.insert({row: 0, column: 0}, b)
    };
    (function () {
        f.implement(this, e);
        this.setValue = function (b) {
            var c = this.getLength();
            this.remove(new a(0, 0, c, this.getLine(c - 1).length));
            this.insert({row: 0,
                column: 0}, b)
        };
        this.getValue = function () {
            return this.getAllLines().join(this.getNewLineCharacter())
        };
        this.createAnchor = function (b, a) {
            return new d(this, b, a)
        };
        "aaa".split(/a/).length == 0 ? this.$split = function (b) {
            return b.replace(/\r\n|\r/g, "\n").split("\n")
        } : this.$split = function (b) {
            return b.split(/\r\n|\r|\n/)
        };
        this.$detectNewLine = function (b) {
            (b = b.match(/^.*?(\r\n|\r|\n)/m)) ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        };
        this.getNewLineCharacter = function () {
            switch (this.$newLineMode) {
                case "windows":
                    return"\r\n";
                case "unix":
                    return"\n";
                case "auto":
                    return this.$autoNewLine
            }
        };
        this.$autoNewLine = "\n";
        this.$newLineMode = "auto";
        this.setNewLineMode = function (b) {
            if (this.$newLineMode !== b)this.$newLineMode = b
        };
        this.getNewLineMode = function () {
            return this.$newLineMode
        };
        this.isNewLine = function (b) {
            return b == "\r\n" || b == "\r" || b == "\n"
        };
        this.getLine = function (b) {
            return this.$lines[b] || ""
        };
        this.getLines = function (b, a) {
            return this.$lines.slice(b, a + 1)
        };
        this.getAllLines = function () {
            return this.getLines(0, this.getLength())
        };
        this.getLength =
            function () {
                return this.$lines.length
            };
        this.getTextRange = function (b) {
            if (b.start.row == b.end.row)return this.$lines[b.start.row].substring(b.start.column, b.end.column);
            var a = this.getLines(b.start.row + 1, b.end.row - 1);
            return a.unshift((this.$lines[b.start.row] || "").substring(b.start.column)), a.push((this.$lines[b.end.row] || "").substring(0, b.end.column)), a.join(this.getNewLineCharacter())
        };
        this.$clipPosition = function (b) {
            var a = this.getLength();
            return b.row >= a && (b.row = Math.max(0, a - 1), b.column = this.getLine(a -
                1).length), b
        };
        this.insert = function (b, a) {
            if (!a || a.length === 0)return b;
            b = this.$clipPosition(b);
            this.getLength() <= 1 && this.$detectNewLine(a);
            var c = this.$split(a), d = c.splice(0, 1)[0], e = c.length == 0 ? null : c.splice(c.length - 1, 1)[0];
            return b = this.insertInLine(b, d), e !== null && (b = this.insertNewLine(b), b = this.insertLines(b.row, c), b = this.insertInLine(b, e || "")), b
        };
        this.insertLines = function (b, c) {
            if (c.length == 0)return{row: b, column: 0};
            if (c.length > 65535)var d = this.insertLines(b, c.slice(65535)), c = c.slice(0, 65535);
            var e =
                [b, 0];
            e.push.apply(e, c);
            this.$lines.splice.apply(this.$lines, e);
            e = new a(b, 0, b + c.length, 0);
            return this._emit("change", {data: {action: "insertLines", range: e, lines: c}}), d || e.end
        };
        this.insertNewLine = function (b) {
            var b = this.$clipPosition(b), c = this.$lines[b.row] || "";
            this.$lines[b.row] = c.substring(0, b.column);
            this.$lines.splice(b.row + 1, 0, c.substring(b.column, c.length));
            c = {row: b.row + 1, column: 0};
            return this._emit("change", {data: {action: "insertText", range: a.fromPoints(b, c), text: this.getNewLineCharacter()}}), c
        };
        this.insertInLine = function (b, c) {
            if (c.length == 0)return b;
            var d = this.$lines[b.row] || "";
            this.$lines[b.row] = d.substring(0, b.column) + c + d.substring(b.column);
            d = {row: b.row, column: b.column + c.length};
            return this._emit("change", {data: {action: "insertText", range: a.fromPoints(b, d), text: c}}), d
        };
        this.remove = function (b) {
            b.start = this.$clipPosition(b.start);
            b.end = this.$clipPosition(b.end);
            if (b.isEmpty())return b.start;
            var a = b.start.row, c = b.end.row;
            if (b.isMultiLine()) {
                var d = b.start.column == 0 ? a : a + 1, e = c - 1;
                b.end.column >
                    0 && this.removeInLine(c, 0, b.end.column);
                e >= d && this.removeLines(d, e);
                d != a && (this.removeInLine(a, b.start.column, this.getLine(a).length), this.removeNewLine(b.start.row))
            } else this.removeInLine(a, b.start.column, b.end.column);
            return b.start
        };
        this.removeInLine = function (b, c, d) {
            if (c != d) {
                var e = new a(b, c, b, d), i = this.getLine(b), f = i.substring(c, d), c = i.substring(0, c) + i.substring(d, i.length);
                this.$lines.splice(b, 1, c);
                return this._emit("change", {data: {action: "removeText", range: e, text: f}}), e.start
            }
        };
        this.removeLines =
            function (b, c) {
                var d = new a(b, 0, c + 1, 0), e = this.$lines.splice(b, c - b + 1);
                return this._emit("change", {data: {action: "removeLines", range: d, nl: this.getNewLineCharacter(), lines: e}}), e
            };
        this.removeNewLine = function (b) {
            var c = this.getLine(b), d = this.getLine(b + 1), e = new a(b, c.length, b + 1, 0);
            this.$lines.splice(b, 2, c + d);
            this._emit("change", {data: {action: "removeText", range: e, text: this.getNewLineCharacter()}})
        };
        this.replace = function (b, a) {
            if (a.length == 0 && b.isEmpty())return b.start;
            if (a == this.getTextRange(b))return b.end;
            this.remove(b);
            return a ? this.insert(b.start, a) : b.start
        };
        this.applyDeltas = function (b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c], e = a.fromPoints(d.range.start, d.range.end);
                d.action == "insertLines" ? this.insertLines(e.start.row, d.lines) : d.action == "insertText" ? this.insert(e.start, d.text) : d.action == "removeLines" ? this.removeLines(e.start.row, e.end.row - 1) : d.action == "removeText" && this.remove(e)
            }
        };
        this.revertDeltas = function (b) {
            for (var c = b.length - 1; c >= 0; c--) {
                var d = b[c], e = a.fromPoints(d.range.start, d.range.end);
                d.action ==
                    "insertLines" ? this.removeLines(e.start.row, e.end.row - 1) : d.action == "insertText" ? this.remove(e) : d.action == "removeLines" ? this.insertLines(e.start.row, d.lines) : d.action == "removeText" && this.insert(e.start, d.text)
            }
        }
    }).call(c.prototype);
    h.Document = c
});
define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/event_emitter").EventEmitter;
    (function () {
        f.implement(this, e);
        this.getPosition = function () {
            return this.$clipPositionToDocument(this.row, this.column)
        };
        this.getDocument = function () {
            return this.document
        };
        this.onChange = function (a) {
            var a = a.data, d = a.range;
            if (!(d.start.row == d.end.row && d.start.row != this.row) && !(d.start.row > this.row) && !(d.start.row == this.row && d.start.column > this.column)) {
                var c =
                    this.row, b = this.column;
                "insertText" === a.action ? d.start.row === c && d.start.column <= b ? d.start.row === d.end.row ? b += d.end.column - d.start.column : (b -= d.start.column, c += d.end.row - d.start.row) : d.start.row !== d.end.row && d.start.row < c && (c += d.end.row - d.start.row) : "insertLines" === a.action ? d.start.row <= c && (c += d.end.row - d.start.row) : "removeText" == a.action ? d.start.row == c && d.start.column < b ? d.end.column >= b ? b = d.start.column : b = Math.max(0, b - (d.end.column - d.start.column)) : d.start.row !== d.end.row && d.start.row < c ? (d.end.row ==
                    c && (b = Math.max(0, b - d.end.column) + d.start.column), c -= d.end.row - d.start.row) : d.end.row == c && (c -= d.end.row - d.start.row, b = Math.max(0, b - d.end.column) + d.start.column) : "removeLines" == a.action && d.start.row <= c && (d.end.row <= c ? c -= d.end.row - d.start.row : (c = d.start.row, b = 0));
                this.setPosition(c, b, !0)
            }
        };
        this.setPosition = function (a, d, c) {
            var b;
            c ? b = {row: a, column: d} : b = this.$clipPositionToDocument(a, d);
            this.row == b.row && this.column == b.column || (a = {row: this.row, column: this.column}, this.row = b.row, this.column = b.column, this._emit("change",
                {old: a, value: b}))
        };
        this.detach = function () {
            this.document.removeEventListener("change", this.$onChange)
        };
        this.$clipPositionToDocument = function (a, d) {
            var c = {};
            return a >= this.document.getLength() ? (c.row = Math.max(0, this.document.getLength() - 1), c.column = this.document.getLine(c.row).length) : 0 > a ? (c.row = 0, c.column = 0) : (c.row = a, c.column = Math.min(this.document.getLine(c.row).length, Math.max(0, d))), 0 > d && (c.column = 0), c
        }
    }).call((h.Anchor = function (a, d, c) {
            this.document = a;
            "undefined" == typeof c ? this.setPosition(d.row,
                d.column) : this.setPosition(d, c);
            this.$onChange = this.onChange.bind(this);
            a.on("change", this.$onChange)
        }).prototype)
});
define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/event_emitter").EventEmitter, a = function (a) {
        this.running = !1;
        this.lines = [];
        this.states = [];
        this.currentLine = 0;
        this.tokenizer = a;
        var c = this;
        this.$worker = function () {
            if (c.running) {
                for (var b = new Date, a = c.currentLine, d = 0, e = c.doc.getLength(); c.currentLine < e;) {
                    for (c.$tokenizeRow(c.currentLine); c.lines[c.currentLine];)c.currentLine++;
                    d++;
                    if (0 == d % 5 && 20 < new Date - b) {
                        c.fireUpdateEvent(a,
                            c.currentLine - 1);
                        c.running = setTimeout(c.$worker, 20);
                        return
                    }
                }
                c.running = !1;
                c.fireUpdateEvent(a, e - 1)
            }
        }
    };
    (function () {
        f.implement(this, e);
        this.setTokenizer = function (a) {
            this.tokenizer = a;
            this.lines = [];
            this.states = [];
            this.start(0)
        };
        this.setDocument = function (a) {
            this.doc = a;
            this.lines = [];
            this.states = [];
            this.stop()
        };
        this.fireUpdateEvent = function (a, c) {
            this._emit("update", {data: {first: a, last: c}})
        };
        this.start = function (a) {
            this.currentLine = Math.min(a || 0, this.currentLine, this.doc.getLength());
            this.lines.splice(this.currentLine,
                this.lines.length);
            this.states.splice(this.currentLine, this.states.length);
            this.stop();
            this.running = setTimeout(this.$worker, 700)
        };
        this.$updateOnChange = function (a) {
            var c = a.range, b = c.start.row, c = c.end.row - b;
            0 === c ? this.lines[b] = null : "removeText" == a.action || "removeLines" == a.action ? (this.lines.splice(b, c + 1, null), this.states.splice(b, c + 1, null)) : (a = Array(c + 1), a.unshift(b, 1), this.lines.splice.apply(this.lines, a), this.states.splice.apply(this.states, a));
            this.currentLine = Math.min(b, this.currentLine, this.doc.getLength());
            this.stop();
            this.running = setTimeout(this.$worker, 700)
        };
        this.stop = function () {
            this.running && clearTimeout(this.running);
            this.running = !1
        };
        this.getTokens = function (a) {
            return this.lines[a] || this.$tokenizeRow(a)
        };
        this.getState = function (a) {
            return this.currentLine == a && this.$tokenizeRow(a), this.states[a] || "start"
        };
        this.$tokenizeRow = function (a) {
            var c = this.doc.getLine(a), b = this.states[a - 1];
            if (5E3 < c.length)var g = {value: c.substr(5E3), type: "text"}, c = c.slice(0, 5E3);
            c = this.tokenizer.getLineTokens(c, b);
            return g && (c.tokens.push(g),
                c.state = "start"), this.states[a] !== c.state ? (this.states[a] = c.state, this.lines[a + 1] = null, this.currentLine > a + 1 && (this.currentLine = a + 1)) : this.currentLine == a && (this.currentLine = a + 1), this.lines[a] = c.tokens
        }
    }).call(a.prototype);
    h.BackgroundTokenizer = a
});
define("ace/search_highlight", "require exports module ace/lib/lang ace/lib/oop ace/range".split(" "), function (j, h) {
    var f = j("./lib/lang");
    j("./lib/oop");
    var e = j("./range").Range, a = function (a, c, b) {
        this.setRegexp(a);
        this.clazz = c;
        this.type = b || "text"
    };
    (function () {
        this.setRegexp = function (a) {
            if (this.regExp + "" != a + "") {
                this.regExp = a;
                this.cache = []
            }
        };
        this.update = function (a, c, b, g) {
            if (this.regExp)for (var k = g.lastRow, l = g.firstRow; l <= k; l++) {
                var i = this.cache[l];
                i == null && (i = f.getMatchOffsets(b.getLine(l), this.regExp),
                    i = i.map(function (b) {
                        return new e(l, b.offset, l, b.offset + b.length)
                    }), this.cache[l] = i.length ? i : "");
                for (var m = i.length; m--;)c.drawSingleLineMarker(a, i[m].toScreenRange(b), this.clazz, g, null, this.type)
            }
        }
    }).call(a.prototype);
    h.SearchHighlight = a
});
define("ace/edit_session/folding", "require exports module ace/range ace/edit_session/fold_line ace/edit_session/fold ace/token_iterator".split(" "), function (j, h) {
    var f = j("../range").Range, e = j("./fold_line").FoldLine, a = j("./fold").Fold, d = j("../token_iterator").TokenIterator;
    h.Folding = function () {
        this.getFoldAt = function (a, b, d) {
            var e = this.getFoldLine(a);
            if (!e)return null;
            for (var e = e.folds, f = 0; f < e.length; f++) {
                var i = e[f];
                if (i.range.contains(a, b) && !(d == 1 && i.range.isEnd(a, b)) && !(d == -1 && i.range.isStart(a,
                    b)))return i
            }
        };
        this.getFoldsInRange = function (a) {
            var a = a.clone(), b = a.end, d = this.$foldData, e = [];
            a.start.column = a.start.column + 1;
            b.column = b.column - 1;
            for (b = 0; b < d.length; b++) {
                var f = d[b].range.compareRange(a);
                if (f != 2) {
                    if (f == -2)break;
                    for (var i = d[b].folds, m = 0; m < i.length; m++) {
                        var h = i[m], f = h.range.compareRange(a);
                        if (f == -2)break;
                        if (f != 2) {
                            if (f == 42)break;
                            e.push(h)
                        }
                    }
                }
            }
            return e
        };
        this.getAllFolds = function () {
            function a(d) {
                b.push(d);
                if (d.subFolds)for (var g = 0; g < d.subFolds.length; g++)a(d.subFolds[g])
            }

            for (var b = [], d =
                this.$foldData, e = 0; e < d.length; e++)for (var f = 0; f < d[e].folds.length; f++)a(d[e].folds[f]);
            return b
        };
        this.getFoldStringAt = function (a, b, d, e) {
            e = e || this.getFoldLine(a);
            if (!e)return null;
            for (var f = {end: {column: 0}}, i, m, h = 0; h < e.folds.length; h++) {
                m = e.folds[h];
                var j = m.range.compareEnd(a, b);
                if (j == -1) {
                    i = this.getLine(m.start.row).substring(f.end.column, m.start.column);
                    break
                }
                if (j === 0)return null;
                f = m
            }
            return i || (i = this.getLine(m.start.row).substring(f.end.column)), d == -1 ? i.substring(0, b - f.end.column) : d == 1 ? i.substring(b -
                f.end.column) : i
        };
        this.getFoldLine = function (a, b) {
            var d = this.$foldData, e = 0;
            b && (e = d.indexOf(b));
            e == -1 && (e = 0);
            for (e; e < d.length; e++) {
                var f = d[e];
                if (f.start.row <= a && f.end.row >= a)return f;
                if (f.end.row > a)break
            }
            return null
        };
        this.getNextFoldLine = function (a, b) {
            var d = this.$foldData, e = 0;
            b && (e = d.indexOf(b));
            e == -1 && (e = 0);
            for (e; e < d.length; e++) {
                var f = d[e];
                if (f.end.row >= a)return f
            }
            return null
        };
        this.getFoldedRowCount = function (a, b) {
            for (var d = this.$foldData, e = b - a + 1, f = 0; f < d.length; f++) {
                var i = d[f], m = i.end.row, i = i.start.row;
                if (m >= b) {
                    i < b && (i >= a ? e = e - (b - i) : e = 0);
                    break
                }
                m >= a && (i >= a ? e = e - (m - i) : e = e - (m - a + 1))
            }
            return e
        };
        this.$addFoldLine = function (a) {
            return this.$foldData.push(a), this.$foldData.sort(function (b, a) {
                return b.start.row - a.start.row
            }), a
        };
        this.addFold = function (c, b) {
            var d = this.$foldData, k = false, f;
            c instanceof a ? f = c : f = new a(b, c);
            this.$clipRangeToDocument(f.range);
            var i = f.start.row, m = f.start.column, h = f.end.row, j = f.end.column;
            if (f.placeholder.length < 2)throw"Placeholder has to be at least 2 characters";
            if (i == h && j - m < 2)throw"The range has to be at least 2 characters width";
            var q = this.getFoldAt(i, m, 1), n = this.getFoldAt(h, j, -1);
            if (q && n == q)return q.addSubFold(f);
            if (q && !q.range.isStart(i, m) || n && !n.range.isEnd(h, j))throw"A fold can't intersect already existing fold" + f.range + q.range;
            m = this.getFoldsInRange(f.range);
            m.length > 0 && (this.removeFolds(m), f.subFolds = m);
            for (m = 0; m < d.length; m++) {
                var r = d[m];
                if (h == r.start.row) {
                    r.addFold(f);
                    k = true;
                    break
                }
                if (i == r.end.row) {
                    r.addFold(f);
                    k = true;
                    if (!f.sameRow)if ((d = d[m + 1]) && d.start.row == h) {
                        r.merge(d);
                        break
                    }
                    break
                }
                if (h <= r.start.row)break
            }
            return k ||
                (r = this.$addFoldLine(new e(this.$foldData, f))), this.$useWrapMode ? this.$updateWrapData(r.start.row, r.start.row) : this.$updateRowLengthCache(r.start.row, r.start.row), this.$modified = true, this._emit("changeFold", {data: f}), f
        };
        this.addFolds = function (a) {
            a.forEach(function (a) {
                this.addFold(a)
            }, this)
        };
        this.removeFold = function (a) {
            var b = a.foldLine, d = b.start.row, e = b.end.row, f = this.$foldData, i = b.folds;
            if (i.length == 1)f.splice(f.indexOf(b), 1); else if (b.range.isEnd(a.end.row, a.end.column)) {
                i.pop();
                b.end.row = i[i.length -
                    1].end.row;
                b.end.column = i[i.length - 1].end.column
            } else if (b.range.isStart(a.start.row, a.start.column)) {
                i.shift();
                b.start.row = i[0].start.row;
                b.start.column = i[0].start.column
            } else if (a.sameRow)i.splice(i.indexOf(a), 1); else {
                b = b.split(a.start.row, a.start.column);
                i = b.folds;
                i.shift();
                b.start.row = i[0].start.row;
                b.start.column = i[0].start.column
            }
            this.$useWrapMode ? this.$updateWrapData(d, e) : this.$updateRowLengthCache(d, e);
            this.$modified = true;
            this._emit("changeFold", {data: a})
        };
        this.removeFolds = function (a) {
            for (var b =
                [], d = 0; d < a.length; d++)b.push(a[d]);
            b.forEach(function (a) {
                this.removeFold(a)
            }, this);
            this.$modified = true
        };
        this.expandFold = function (a) {
            this.removeFold(a);
            a.subFolds.forEach(function (a) {
                this.addFold(a)
            }, this);
            a.subFolds = []
        };
        this.expandFolds = function (a) {
            a.forEach(function (a) {
                this.expandFold(a)
            }, this)
        };
        this.unfold = function (a, b) {
            var d, e;
            a == null ? d = new f(0, 0, this.getLength(), 0) : typeof a == "number" ? d = new f(a, 0, a, this.getLine(a).length) : "row"in a ? d = f.fromPoints(a, a) : d = a;
            e = this.getFoldsInRange(d);
            if (b)this.removeFolds(e);
            else for (; e.length;) {
                this.expandFolds(e);
                e = this.getFoldsInRange(d)
            }
        };
        this.isRowFolded = function (a, b) {
            return!!this.getFoldLine(a, b)
        };
        this.getRowFoldEnd = function (a, b) {
            var d = this.getFoldLine(a, b);
            return d ? d.end.row : a
        };
        this.getFoldDisplayLine = function (a, b, d, e, f) {
            e == null && (e = a.start.row, f = 0);
            b == null && (b = a.end.row, d = this.getLine(b).length);
            var i = this.doc, m = "";
            return a.walk(function (a, b, c, d) {
                if (!(b < e)) {
                    if (b == e) {
                        if (c < f)return;
                        d = Math.max(f, d)
                    }
                    a ? m = m + a : m = m + i.getLine(b).substring(d, c)
                }
            }.bind(this), b, d), m
        };
        this.getDisplayLine =
            function (a, b, d, e) {
                var f = this.getFoldLine(a);
                if (!f) {
                    var i;
                    return i = this.doc.getLine(a), i.substring(e || 0, b || i.length)
                }
                return this.getFoldDisplayLine(f, a, b, d, e)
            };
        this.$cloneFoldData = function () {
            var a = [];
            return a = this.$foldData.map(function (b) {
                b = b.folds.map(function (a) {
                    return a.clone()
                });
                return new e(a, b)
            }), a
        };
        this.toggleFold = function (a) {
            var b = this.selection.getRange(), d, e;
            if (b.isEmpty()) {
                a = b.start;
                if (d = this.getFoldAt(a.row, a.column)) {
                    this.expandFold(d);
                    return
                }
                (e = this.findMatchingBracket(a)) ? b.comparePoint(e) ==
                    1 ? b.end = e : (b.start = e, b.start.column++, b.end.column--) : (e = this.findMatchingBracket({row: a.row, column: a.column + 1})) ? (b.comparePoint(e) == 1 ? b.end = e : b.start = e, b.start.column++) : b = this.getCommentFoldRange(a.row, a.column) || b
            } else {
                e = this.getFoldsInRange(b);
                if (a && e.length) {
                    this.expandFolds(e);
                    return
                }
                e.length == 1 && (d = e[0])
            }
            d || (d = this.getFoldAt(b.start.row, b.start.column));
            if (d && d.range.toString() == b.toString())this.expandFold(d); else {
                d = "...";
                if (!b.isMultiLine()) {
                    d = this.getTextRange(b);
                    if (d.length < 4)return;
                    d =
                        d.trim().substring(0, 2) + ".."
                }
                this.addFold(d, b)
            }
        };
        this.getCommentFoldRange = function (a, b) {
            var g = new d(this, a, b), e = g.getCurrentToken();
            if (e && /^comment|string/.test(e.type)) {
                var l = new f, i = RegExp(e.type.replace(/\..*/, "\\."));
                do e = g.stepBackward(); while (e && i.test(e.type));
                g.stepForward();
                l.start.row = g.getCurrentTokenRow();
                l.start.column = g.getCurrentTokenColumn() + 2;
                g = new d(this, a, b);
                do e = g.stepForward(); while (e && i.test(e.type));
                return e = g.stepBackward(), l.end.row = g.getCurrentTokenRow(), l.end.column = g.getCurrentTokenColumn() +
                    e.value.length, l
            }
        };
        this.foldAll = function (a, b) {
            for (var d = this.foldWidgets, b = b || this.getLength(), e = a || 0; e < b; e++) {
                d[e] == null && (d[e] = this.getFoldWidget(e));
                if (d[e] == "start") {
                    var f = this.getFoldWidgetRange(e);
                    if (f && f.end.row < b)try {
                        this.addFold("...", f)
                    } catch (i) {
                    }
                }
            }
        };
        this.$foldStyles = {manual: 1, markbegin: 1, markbeginend: 1};
        this.$foldStyle = "markbegin";
        this.setFoldStyle = function (a) {
            if (!this.$foldStyles[a])throw Error("invalid fold style: " + a + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
            if (this.$foldStyle !=
                a) {
                this.$foldStyle = a;
                a == "manual" && this.unfold();
                a = this.$foldMode;
                this.$setFolding(null);
                this.$setFolding(a)
            }
        };
        this.$setFolding = function (a) {
            if (this.$foldMode != a) {
                this.$foldMode = a;
                this.removeListener("change", this.$updateFoldWidgets);
                this._emit("changeAnnotation");
                if (!a || this.$foldStyle == "manual")this.foldWidgets = null; else {
                    this.foldWidgets = [];
                    this.getFoldWidget = a.getFoldWidget.bind(a, this, this.$foldStyle);
                    this.getFoldWidgetRange = a.getFoldWidgetRange.bind(a, this, this.$foldStyle);
                    this.$updateFoldWidgets =
                        this.updateFoldWidgets.bind(this);
                    this.on("change", this.$updateFoldWidgets)
                }
            }
        };
        this.onFoldWidgetClick = function (a, b) {
            var d = this.getFoldWidget(a), e = this.getLine(a), f = b.shiftKey, i = f || b.ctrlKey || b.altKey || b.metaKey, m;
            d == "end" ? m = this.getFoldAt(a, 0, -1) : m = this.getFoldAt(a, e.length, 1);
            if (m)i ? this.removeFold(m) : this.expandFold(m); else if (d = this.getFoldWidgetRange(a)) {
                if (!d.isMultiLine())if ((m = this.getFoldAt(d.start.row, d.start.column, 1)) && d.isEqual(m.range)) {
                    this.removeFold(m);
                    return
                }
                f || this.addFold("...",
                    d);
                i && this.foldAll(d.start.row + 1, d.end.row)
            } else {
                i && this.foldAll(a + 1, this.getLength());
                (b.target || b.srcElement).className = (b.target || b.srcElement).className + " invalid"
            }
        };
        this.updateFoldWidgets = function (a) {
            var b = a.data, d = b.range, a = d.start.row, d = d.end.row - a;
            if (d === 0)this.foldWidgets[a] = null; else if (b.action == "removeText" || b.action == "removeLines")this.foldWidgets.splice(a, d + 1, null); else {
                b = Array(d + 1);
                b.unshift(a, 1);
                this.foldWidgets.splice.apply(this.foldWidgets, b)
            }
        }
    }
});
define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (j, h) {
    function f(a, d) {
        this.foldData = a;
        Array.isArray(d) ? this.folds = d : d = this.folds = [d];
        var c = d[d.length - 1];
        this.range = new e(d[0].start.row, d[0].start.column, c.end.row, c.end.column);
        this.start = this.range.start;
        this.end = this.range.end;
        this.folds.forEach(function (a) {
            a.setFoldLine(this)
        }, this)
    }

    var e = j("../range").Range;
    (function () {
        this.shiftRow = function (a) {
            this.start.row += a;
            this.end.row += a;
            this.folds.forEach(function (d) {
                d.start.row +=
                    a;
                d.end.row += a
            })
        };
        this.addFold = function (a) {
            if (a.sameRow) {
                if (a.start.row < this.startRow || a.endRow > this.endRow)throw"Can't add a fold to this FoldLine as it has no connection";
                this.folds.push(a);
                this.folds.sort(function (a, c) {
                    return-a.range.compareEnd(c.start.row, c.start.column)
                });
                0 < this.range.compareEnd(a.start.row, a.start.column) ? (this.end.row = a.end.row, this.end.column = a.end.column) : 0 > this.range.compareStart(a.end.row, a.end.column) && (this.start.row = a.start.row, this.start.column = a.start.column)
            } else if (a.start.row ==
                this.end.row)this.folds.push(a), this.end.row = a.end.row, this.end.column = a.end.column; else {
                if (a.end.row != this.start.row)throw"Trying to add fold to FoldRow that doesn't have a matching row";
                this.folds.unshift(a);
                this.start.row = a.start.row;
                this.start.column = a.start.column
            }
            a.foldLine = this
        };
        this.containsRow = function (a) {
            return a >= this.start.row && a <= this.end.row
        };
        this.walk = function (a, d, c) {
            var b = 0, g = this.folds, e, f, i;
            i = !0;
            null == d && (d = this.end.row, c = this.end.column);
            for (var m = 0; m < g.length; m++) {
                e = g[m];
                f = e.range.compareStart(d,
                    c);
                if (-1 == f) {
                    a(null, d, c, b, i);
                    return
                }
                i = a(null, e.start.row, e.start.column, b, i);
                if ((i = !i && a(e.placeholder, e.start.row, e.start.column, b)) || 0 == f)return;
                i = !e.sameRow;
                b = e.end.column
            }
            a(null, d, c, b, i)
        };
        this.getNextFoldTo = function (a, d) {
            for (var c, b, g = 0; g < this.folds.length; g++) {
                c = this.folds[g];
                b = c.range.compareEnd(a, d);
                if (-1 == b)return{fold: c, kind: "after"};
                if (0 == b)return{fold: c, kind: "inside"}
            }
            return null
        };
        this.addRemoveChars = function (a, d, c) {
            var b = this.getNextFoldTo(a, d), g;
            if (b)if (g = b.fold, "inside" == b.kind && g.start.column !=
                d && g.start.row != a)window.console && window.console.log(a, d, g); else if (g.start.row == a) {
                a = this.folds;
                d = a.indexOf(g);
                0 == d && (this.start.column += c);
                for (d; d < a.length; d++) {
                    g = a[d];
                    g.start.column += c;
                    if (!g.sameRow)return;
                    g.end.column += c
                }
                this.end.column += c
            }
        };
        this.split = function (a, d) {
            var c = this.getNextFoldTo(a, d).fold, b = this.folds, g = this.foldData;
            if (!c)return null;
            var c = b.indexOf(c), e = b[c - 1];
            this.end.row = e.end.row;
            this.end.column = e.end.column;
            b = b.splice(c, b.length - c);
            b = new f(g, b);
            return g.splice(g.indexOf(this) +
                1, 0, b), b
        };
        this.merge = function (a) {
            for (var d = a.folds, c = 0; c < d.length; c++)this.addFold(d[c]);
            d = this.foldData;
            d.splice(d.indexOf(a), 1)
        };
        this.toString = function () {
            var a = [this.range.toString() + ": ["];
            return this.folds.forEach(function (d) {
                a.push("  " + d.toString())
            }), a.push("]"), a.join("\n")
        };
        this.idxToPosition = function (a) {
            for (var d = 0, c, b = 0; b < this.folds.length; b++) {
                c = this.folds[b];
                a -= c.start.column - d;
                if (0 > a)return{row: c.start.row, column: c.start.column + a};
                a -= c.placeholder.length;
                if (0 > a)return c.start;
                d = c.end.column
            }
            return{row: this.end.row,
                column: this.end.column + a}
        }
    }).call(f.prototype);
    h.FoldLine = f
});
define("ace/edit_session/fold", ["require", "exports", "module"], function (j, h) {
    var f = h.Fold = function (e, a) {
        this.foldLine = null;
        this.placeholder = a;
        this.range = e;
        this.start = e.start;
        this.end = e.end;
        this.sameRow = e.start.row == e.end.row;
        this.subFolds = []
    };
    (function () {
        this.toString = function () {
            return'"' + this.placeholder + '" ' + this.range.toString()
        };
        this.setFoldLine = function (e) {
            this.foldLine = e;
            this.subFolds.forEach(function (a) {
                a.setFoldLine(e)
            })
        };
        this.clone = function () {
            var e = this.range.clone(), a = new f(e, this.placeholder);
            return this.subFolds.forEach(function (d) {
                a.subFolds.push(d.clone())
            }), a
        };
        this.addSubFold = function (e) {
            if (this.range.isEqual(e))return this;
            if (!this.range.containsRange(e))throw"A fold can't intersect already existing fold" + e.range + this.range;
            for (var a = e.range.start.row, d = e.range.start.column, c = 0, b = -1; c < this.subFolds.length && !(b = this.subFolds[c].range.compare(a, d), 1 != b); c++);
            a = this.subFolds[c];
            if (0 == b)return a.addSubFold(e);
            for (var a = e.range.end.row, d = e.range.end.column, g = c, b = -1; g < this.subFolds.length && !(b = this.subFolds[g].range.compare(a, d), 1 != b); g++);
            if (0 == b)throw"A fold can't intersect already existing fold" + e.range + this.range;
            this.subFolds.splice(c, g - c, e);
            return e.setFoldLine(this.foldLine), e
        }
    }).call(f.prototype)
});
define("ace/token_iterator", ["require", "exports", "module"], function (j, h) {
    var f = function (e, a, d) {
        this.$session = e;
        this.$row = a;
        this.$rowTokens = e.getTokens(a);
        this.$tokenIndex = (e = e.getTokenAt(a, d)) ? e.index : -1
    };
    (function () {
        this.stepBackward = function () {
            for (this.$tokenIndex -= 1; 0 > this.$tokenIndex;) {
                this.$row -= 1;
                if (0 > this.$row)return this.$row = 0, null;
                this.$rowTokens = this.$session.getTokens(this.$row);
                this.$tokenIndex = this.$rowTokens.length - 1
            }
            return this.$rowTokens[this.$tokenIndex]
        };
        this.stepForward = function () {
            var e =
                this.$session.getLength();
            for (this.$tokenIndex += 1; this.$tokenIndex >= this.$rowTokens.length;) {
                this.$row += 1;
                if (this.$row >= e)return this.$row = e - 1, null;
                this.$rowTokens = this.$session.getTokens(this.$row);
                this.$tokenIndex = 0
            }
            return this.$rowTokens[this.$tokenIndex]
        };
        this.getCurrentToken = function () {
            return this.$rowTokens[this.$tokenIndex]
        };
        this.getCurrentTokenRow = function () {
            return this.$row
        };
        this.getCurrentTokenColumn = function () {
            var e = this.$rowTokens, a = this.$tokenIndex, d = e[a].start;
            if (void 0 !== d)return d;
            for (d = 0; 0 < a;)a -= 1, d += e[a].value.length;
            return d
        }
    }).call(f.prototype);
    h.TokenIterator = f
});
define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (j, h) {
    var f = j("../token_iterator").TokenIterator, e = j("../range").Range;
    h.BracketMatch = function () {
        this.findMatchingBracket = function (a) {
            if (0 == a.column)return null;
            var d = this.getLine(a.row).charAt(a.column - 1);
            return"" == d ? null : (d = d.match(/([\(\[\{])|([\)\]\}])/)) ? d[1] ? this.$findClosingBracket(d[1], a) : this.$findOpeningBracket(d[2], a) : null
        };
        this.getBracketRange = function (a) {
            var d = this.getLine(a.row),
                c = !0, b = d.charAt(a.column - 1), g = b && b.match(/([\(\[\{])|([\)\]\}])/);
            g || (b = d.charAt(a.column), a = {row: a.row, column: a.column + 1}, g = b && b.match(/([\(\[\{])|([\)\]\}])/), c = !1);
            if (!g)return null;
            if (g[1]) {
                d = this.$findClosingBracket(g[1], a);
                if (!d)return null;
                a = e.fromPoints(a, d);
                c || (a.end.column++, a.start.column--);
                a.cursor = a.end
            } else {
                d = this.$findOpeningBracket(g[2], a);
                if (!d)return null;
                a = e.fromPoints(d, a);
                c || (a.start.column++, a.end.column--);
                a.cursor = a.start
            }
            return a
        };
        this.$brackets = {")": "(", "(": ")", "]": "[",
            "[": "]", "{": "}", "}": "{"};
        this.$findOpeningBracket = function (a, d, c) {
            var b = this.$brackets[a], g = 1, e = new f(this, d.row, d.column), l = e.getCurrentToken();
            l || (l = e.stepForward());
            if (l) {
                c || (c = RegExp("(\\.?" + l.type.replace(".", "\\.").replace("rparen", ".paren") + ")+"));
                d = d.column - e.getCurrentTokenColumn() - 2;
                for (l = l.value; ;) {
                    for (; 0 <= d;) {
                        var i = l.charAt(d);
                        if (i == b) {
                            if (g -= 1, 0 == g)return{row: e.getCurrentTokenRow(), column: d + e.getCurrentTokenColumn()}
                        } else i == a && (g += 1);
                        d -= 1
                    }
                    do l = e.stepBackward(); while (l && !c.test(l.type));
                    if (null == l)break;
                    l = l.value;
                    d = l.length - 1
                }
                return null
            }
        };
        this.$findClosingBracket = function (a, d, c) {
            var b = this.$brackets[a], e = 1, k = new f(this, d.row, d.column), l = k.getCurrentToken();
            l || (l = k.stepForward());
            if (l) {
                c || (c = RegExp("(\\.?" + l.type.replace(".", "\\.").replace("lparen", ".paren") + ")+"));
                for (d = d.column - k.getCurrentTokenColumn(); ;) {
                    for (var l = l.value, i = l.length; d < i;) {
                        var m = l.charAt(d);
                        if (m == b) {
                            if (e -= 1, 0 == e)return{row: k.getCurrentTokenRow(), column: d + k.getCurrentTokenColumn()}
                        } else m == a && (e += 1);
                        d += 1
                    }
                    do l =
                        k.stepForward(); while (l && !c.test(l.type));
                    if (null == l)break;
                    d = 0
                }
                return null
            }
        }
    }
});
define("ace/search", "require exports module ace/lib/lang ace/lib/oop ace/range".split(" "), function (j, h) {
    var f = j("./lib/lang"), e = j("./lib/oop"), a = j("./range").Range, d = function () {
        this.$options = {}
    };
    (function () {
        this.set = function (a) {
            return e.mixin(this.$options, a), this
        };
        this.getOptions = function () {
            return f.copyObject(this.$options)
        };
        this.setOptions = function (a) {
            this.$options = a
        };
        this.find = function (c) {
            c = this.$matchIterator(c, this.$options);
            if (!c)return false;
            var b = null;
            return c.forEach(function (c, d, e) {
                if (c.start)b =
                    c; else {
                    e = c.offset + (e || 0);
                    b = new a(d, e, d, e + c.length)
                }
                return true
            }), b
        };
        this.findAll = function (c) {
            var b = this.$options;
            if (!b.needle)return[];
            this.$assembleRegExp(b);
            var d = b.range, e = d ? c.getLines(d.start.row, d.end.row) : c.doc.getAllLines(), c = [], l = b.re;
            if (b.$isMultiLine)for (var i = l.length, m = e.length - i, h = l.offset || 0; h <= m; h++) {
                for (b = 0; b < i; b++)if (e[h + b].search(l[b]) == -1)break;
                var b = e[h], j = e[h + i - 1], q = b.match(l[0])[0].length, j = j.match(l[i - 1])[0].length;
                c.push(new a(h, b.length - q, h + i - 1, j))
            } else for (i = 0; i < e.length; i++) {
                m =
                    f.getMatchOffsets(e[i], l);
                for (b = 0; b < m.length; b++) {
                    h = m[b];
                    c.push(new a(i, h.offset, i, h.offset + h.length))
                }
            }
            if (d) {
                l = e = d.start.column;
                i = 0;
                for (b = c.length - 1; i < b && c[i].start.column < e && c[i].start.row == d.start.row;)i++;
                for (; i < b && c[b].end.column > l && c[b].end.row == d.end.row;)b--;
                return c.slice(i, b + 1)
            }
            return c
        };
        this.replace = function (a, b) {
            var d = this.$options, e = this.$assembleRegExp(d);
            if (d.$isMultiLine)return b;
            if (e) {
                var f = e.exec(a);
                if (!f || f[0].length != a.length)return null;
                b = a.replace(e, b);
                if (d.preserveCase) {
                    b = b.split("");
                    for (d = Math.min(a.length, a.length); d--;)(e = a[d]) && e.toLowerCase() != e ? b[d] = b[d].toUpperCase() : b[d] = b[d].toLowerCase();
                    b = b.join("")
                }
                return b
            }
        };
        this.$matchIterator = function (c, b) {
            var d = this.$assembleRegExp(b);
            if (!d)return false;
            var e = this, l, i = b.backwards;
            if (b.$isMultiLine)var m = d.length, h = function (b, e, i) {
                var k = b.search(d[0]);
                if (k != -1) {
                    for (var f = 1; f < m; f++) {
                        b = c.getLine(e + f);
                        if (b.search(d[f]) == -1)return
                    }
                    b = b.match(d[m - 1])[0].length;
                    e = new a(e, k, e + m - 1, b);
                    d.offset == 1 ? (e.start.row--, e.start.column = Number.MAX_VALUE) :
                        i && (e.start.column = e.start.column + i);
                    if (l(e))return true
                }
            }; else h = i ? function (a, b, c) {
                for (var a = f.getMatchOffsets(a, d), e = a.length - 1; e >= 0; e--)if (l(a[e], b, c))return true
            } : function (a, b, c) {
                for (var a = f.getMatchOffsets(a, d), e = 0; e < a.length; e++)if (l(a[e], b, c))return true
            };
            return{forEach: function (a) {
                l = a;
                e.$lineIterator(c, b).forEach(h)
            }}
        };
        this.$assembleRegExp = function (a) {
            if (a.needle instanceof RegExp)return a.re = a.needle;
            var b = a.needle;
            if (!a.needle)return a.re = false;
            a.regExp || (b = f.escapeRegExp(b));
            a.wholeWord &&
            (b = "\\b" + b + "\\b");
            var d = a.caseSensitive ? "g" : "gi";
            a.$isMultiLine = /[\n\r]/.test(b);
            if (a.$isMultiLine)return a.re = this.$assembleMultilineRegExp(b, d);
            try {
                var e = RegExp(b, d)
            } catch (l) {
                e = false
            }
            return a.re = e
        };
        this.$assembleMultilineRegExp = function (a, b) {
            for (var d = a.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), e = [], f = 0; f < d.length; f++)try {
                e.push(RegExp(d[f], b))
            } catch (i) {
                return false
            }
            return d[0] == "" ? (e.shift(), e.offset = 1) : e.offset = 0, e
        };
        this.$lineIterator = function (a, b) {
            var d = b.backwards == 1, e = b.skipCurrent != 0, f = b.range,
                i = b.start;
            i || (i = f ? f[d ? "end" : "start"] : a.selection.getRange());
            i.start && (i = i[e != d ? "end" : "start"]);
            var h = f ? f.start.row : 0, j = f ? f.end.row : a.getLength() - 1;
            return{forEach: d ? function (d) {
                var e = i.row, g = a.getLine(e).substring(0, i.column);
                if (!d(g, e)) {
                    for (e--; e >= h; e--)if (d(a.getLine(e), e))return;
                    if (b.wrap != 0) {
                        e = j;
                        for (h = i.row; e >= h; e--)if (d(a.getLine(e), e))break
                    }
                }
            } : function (d) {
                var e = i.row, g = a.getLine(e).substr(i.column);
                if (!d(g, e, i.column)) {
                    for (e = e + 1; e <= j; e++)if (d(a.getLine(e), e))return;
                    if (b.wrap != 0) {
                        e = h;
                        for (j = i.row; e <=
                            j; e++)if (d(a.getLine(e), e))break
                    }
                }
            }}
        }
    }).call(d.prototype);
    h.Search = d
});
define("ace/commands/command_manager", "require exports module ace/lib/oop ace/keyboard/hash_handler ace/lib/event_emitter".split(" "), function (j, h) {
    var f = j("../lib/oop"), e = j("../keyboard/hash_handler").HashHandler, a = j("../lib/event_emitter").EventEmitter, d = function (a, b) {
        this.platform = a;
        this.commands = this.byName = {};
        this.commmandKeyBinding = {};
        this.addCommands(b);
        this.setDefaultHandler("exec", function (a) {
            return a.command.exec(a.editor, a.args || {})
        })
    };
    f.inherits(d, e);
    (function () {
        f.implement(this, a);
        this.exec =
            function (a, b, d) {
                typeof a == "string" && (a = this.commands[a]);
                return!a || b && b.$readOnly && !a.readOnly ? false : this._emit("exec", {editor: b, command: a, args: d}) === false ? false : true
            };
        this.toggleRecording = function (a) {
            if (!this.$inReplay)return a && a._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = false) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (a) {
                this.macro.push([a.command,
                    a.args])
            }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = true)
        };
        this.replay = function (a) {
            if (!this.$inReplay && this.macro) {
                if (this.recording)return this.toggleRecording(a);
                try {
                    this.$inReplay = true;
                    this.macro.forEach(function (b) {
                        typeof b == "string" ? this.exec(b, a) : this.exec(b[0], a, b[1])
                    }, this)
                } finally {
                    this.$inReplay = false
                }
            }
        };
        this.trimMacro = function (a) {
            return a.map(function (a) {
                return typeof a[0] != "string" && (a[0] = a[0].name), a[1] || (a = a[0]), a
            })
        }
    }).call(d.prototype);
    h.CommandManager = d
});
define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys"], function (j, h) {
    function f(a, d) {
        this.platform = d;
        this.commands = {};
        this.commmandKeyBinding = {};
        this.addCommands(a)
    }

    var e = j("../lib/keys");
    (function () {
        this.addCommand = function (a) {
            this.commands[a.name] && this.removeCommand(a);
            this.commands[a.name] = a;
            a.bindKey && this._buildKeyHash(a)
        };
        this.removeCommand = function (a) {
            var d = "string" == typeof a ? a : a.name, a = this.commands[d];
            delete this.commands[d];
            var d = this.commmandKeyBinding, c;
            for (c in d)for (var b in d[c])d[c][b] ==
                a && delete d[c][b]
        };
        this.bindKey = function (a, d) {
            if (a)if ("function" == typeof d)this.addCommand({exec: d, bindKey: a, name: a}); else {
                var c = this.commmandKeyBinding;
                a.split("|").forEach(function (a) {
                    var a = this.parseKeys(a, d), e = a.hashId;
                    (c[e] || (c[e] = {}))[a.key] = d
                }, this)
            }
        };
        this.addCommands = function (a) {
            a && Object.keys(a).forEach(function (d) {
                var c = a[d];
                if ("string" == typeof c)return this.bindKey(c, d);
                "function" == typeof c && (c = {exec: c});
                c.name || (c.name = d);
                this.addCommand(c)
            }, this)
        };
        this.removeCommands = function (a) {
            Object.keys(a).forEach(function (d) {
                    this.removeCommand(a[d])
                },
                this)
        };
        this.bindKeys = function (a) {
            Object.keys(a).forEach(function (d) {
                this.bindKey(d, a[d])
            }, this)
        };
        this._buildKeyHash = function (a) {
            var d = a.bindKey;
            d && this.bindKey("string" == typeof d ? d : d[this.platform], a)
        };
        this.parseKeys = function (a) {
            var d = a.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function (a) {
                return a
            }), c = d.pop(), b = e[c];
            if (e.FUNCTION_KEYS[b])c = e.FUNCTION_KEYS[b].toLowerCase(); else {
                if (!d.length)return{key: c, hashId: -1};
                if (1 == d.length && "shift" == d[0])return{key: c.toUpperCase(), hashId: -1}
            }
            for (var b = 0,
                     g = d.length; g--;) {
                var f = e.KEY_MODS[d[g]];
                if (null == f)throw"invalid modifier " + d[g] + " in " + a;
                b |= f
            }
            return{key: c, hashId: b}
        };
        this.findKeyCommand = function (a, d) {
            var c = this.commmandKeyBinding;
            return c[a] && c[a][d]
        };
        this.handleKeyboard = function (a, d, c) {
            return{command: this.findKeyCommand(d, c)}
        }
    }).call(f.prototype);
    h.HashHandler = f
});
define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang"], function (j, h) {
    function f(a, d) {
        return{win: a, mac: d}
    }

    var e = j("../lib/lang");
    h.commands = [
        {name: "selectall", bindKey: f("Ctrl-A", "Command-A"), exec: function (a) {
            a.selectAll()
        }, readOnly: !0},
        {name: "centerselection", bindKey: f(null, "Ctrl-L"), exec: function (a) {
            a.centerSelection()
        }, readOnly: !0},
        {name: "gotoline", bindKey: f("Ctrl-L", "Command-L"), exec: function (a) {
            var d = parseInt(prompt("Enter line number:"), 10);
            isNaN(d) || a.gotoLine(d)
        },
            readOnly: !0},
        {name: "fold", bindKey: f("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"), exec: function (a) {
            a.session.toggleFold(!1)
        }, readOnly: !0},
        {name: "unfold", bindKey: f("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"), exec: function (a) {
            a.session.toggleFold(!0)
        }, readOnly: !0},
        {name: "foldall", bindKey: f("Alt-0", "Command-Option-0"), exec: function (a) {
            a.session.foldAll()
        }, readOnly: !0},
        {name: "unfoldall", bindKey: f("Alt-Shift-0", "Command-Option-Shift-0"), exec: function (a) {
            a.session.unfold()
        }, readOnly: !0},
        {name: "findnext", bindKey: f("Ctrl-K", "Command-G"), exec: function (a) {
            a.findNext()
        }, readOnly: !0},
        {name: "findprevious", bindKey: f("Ctrl-Shift-K", "Command-Shift-G"), exec: function (a) {
            a.findPrevious()
        }, readOnly: !0},
        {name: "find", bindKey: f("Ctrl-F", "Command-F"), exec: function (a) {
            var d = prompt("Find:", a.getCopyText());
            a.find(d)
        }, readOnly: !0},
        {name: "overwrite", bindKey: "Insert", exec: function (a) {
            a.toggleOverwrite()
        }, readOnly: !0},
        {name: "selecttostart", bindKey: f("Ctrl-Shift-Home", "Command-Shift-Up"), exec: function (a) {
            a.getSelection().selectFileStart()
        },
            multiSelectAction: "forEach", readOnly: !0},
        {name: "gotostart", bindKey: f("Ctrl-Home", "Command-Home|Command-Up"), exec: function (a) {
            a.navigateFileStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectup", bindKey: f("Shift-Up", "Shift-Up"), exec: function (a) {
            a.getSelection().selectUp()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "golineup", bindKey: f("Up", "Up|Ctrl-P"), exec: function (a, d) {
            a.navigateUp(d.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttoend", bindKey: f("Ctrl-Shift-End",
            "Command-Shift-Down"), exec: function (a) {
            a.getSelection().selectFileEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoend", bindKey: f("Ctrl-End", "Command-End|Command-Down"), exec: function (a) {
            a.navigateFileEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectdown", bindKey: f("Shift-Down", "Shift-Down"), exec: function (a) {
            a.getSelection().selectDown()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "golinedown", bindKey: f("Down", "Down|Ctrl-N"), exec: function (a, d) {
            a.navigateDown(d.times)
        }, multiSelectAction: "forEach",
            readOnly: !0},
        {name: "selectwordleft", bindKey: f("Ctrl-Shift-Left", "Option-Shift-Left"), exec: function (a) {
            a.getSelection().selectWordLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotowordleft", bindKey: f("Ctrl-Left", "Option-Left"), exec: function (a) {
            a.navigateWordLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttolinestart", bindKey: f("Alt-Shift-Left", "Command-Shift-Left"), exec: function (a) {
            a.getSelection().selectLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotolinestart",
            bindKey: f("Alt-Left|Home", "Command-Left|Home|Ctrl-A"), exec: function (a) {
            a.navigateLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectleft", bindKey: f("Shift-Left", "Shift-Left"), exec: function (a) {
            a.getSelection().selectLeft()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoleft", bindKey: f("Left", "Left|Ctrl-B"), exec: function (a, d) {
            a.navigateLeft(d.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectwordright", bindKey: f("Ctrl-Shift-Right", "Option-Shift-Right"), exec: function (a) {
            a.getSelection().selectWordRight()
        },
            multiSelectAction: "forEach", readOnly: !0},
        {name: "gotowordright", bindKey: f("Ctrl-Right", "Option-Right"), exec: function (a) {
            a.navigateWordRight()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttolineend", bindKey: f("Alt-Shift-Right", "Command-Shift-Right"), exec: function (a) {
            a.getSelection().selectLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotolineend", bindKey: f("Alt-Right|End", "Command-Right|End|Ctrl-E"), exec: function (a) {
            a.navigateLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectright", bindKey: f("Shift-Right", "Shift-Right"), exec: function (a) {
            a.getSelection().selectRight()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "gotoright", bindKey: f("Right", "Right|Ctrl-F"), exec: function (a, d) {
            a.navigateRight(d.times)
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectpagedown", bindKey: "Shift-PageDown", exec: function (a) {
            a.selectPageDown()
        }, readOnly: !0},
        {name: "pagedown", bindKey: f(null, "Option-PageDown"), exec: function (a) {
            a.scrollPageDown()
        }, readOnly: !0},
        {name: "gotopagedown",
            bindKey: f("PageDown", "PageDown|Ctrl-V"), exec: function (a) {
            a.gotoPageDown()
        }, readOnly: !0},
        {name: "selectpageup", bindKey: "Shift-PageUp", exec: function (a) {
            a.selectPageUp()
        }, readOnly: !0},
        {name: "pageup", bindKey: f(null, "Option-PageUp"), exec: function (a) {
            a.scrollPageUp()
        }, readOnly: !0},
        {name: "gotopageup", bindKey: "PageUp", exec: function (a) {
            a.gotoPageUp()
        }, readOnly: !0},
        {name: "scrollup", bindKey: f("Ctrl-Up", null), exec: function (a) {
            a.renderer.scrollBy(0, -2 * a.renderer.layerConfig.lineHeight)
        }, readOnly: !0},
        {name: "scrolldown",
            bindKey: f("Ctrl-Down", null), exec: function (a) {
            a.renderer.scrollBy(0, 2 * a.renderer.layerConfig.lineHeight)
        }, readOnly: !0},
        {name: "selectlinestart", bindKey: "Shift-Home", exec: function (a) {
            a.getSelection().selectLineStart()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selectlineend", bindKey: "Shift-End", exec: function (a) {
            a.getSelection().selectLineEnd()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "togglerecording", bindKey: f("Ctrl-Alt-E", "Command-Option-E"), exec: function (a) {
            a.commands.toggleRecording(a)
        },
            readOnly: !0},
        {name: "replaymacro", bindKey: f("Ctrl-Shift-E", "Command-Shift-E"), exec: function (a) {
            a.commands.replay(a)
        }, readOnly: !0},
        {name: "jumptomatching", bindKey: f("Ctrl-P", "Ctrl-Shift-P"), exec: function (a) {
            a.jumpToMatching()
        }, multiSelectAction: "forEach", readOnly: !0},
        {name: "selecttomatching", bindKey: f("Ctrl-Shift-P", null), exec: function (a) {
            a.jumpToMatching(!0)
        }, readOnly: !0},
        {name: "cut", exec: function (a) {
            var d = a.getSelectionRange();
            a._emit("cut", d);
            a.selection.isEmpty() || (a.session.remove(d), a.clearSelection())
        },
            multiSelectAction: "forEach"},
        {name: "removeline", bindKey: f("Ctrl-D", "Command-D"), exec: function (a) {
            a.removeLines()
        }, multiSelectAction: "forEach"},
        {name: "duplicateSelection", bindKey: f("Ctrl-Shift-D", "Command-Shift-D"), exec: function (a) {
            a.duplicateSelection()
        }, multiSelectAction: "forEach"},
        {name: "togglecomment", bindKey: f("Ctrl-/", "Command-/"), exec: function (a) {
            a.toggleCommentLines()
        }, multiSelectAction: "forEach"},
        {name: "replace", bindKey: f("Ctrl-R", "Command-Option-F"), exec: function (a) {
            var d = prompt("Find:",
                a.getCopyText());
            if (d) {
                var c = prompt("Replacement:");
                c && a.replace(c, {needle: d})
            }
        }},
        {name: "replaceall", bindKey: f("Ctrl-Shift-R", "Command-Shift-Option-F"), exec: function (a) {
            var d = prompt("Find:");
            if (d) {
                var c = prompt("Replacement:");
                c && a.replaceAll(c, {needle: d})
            }
        }},
        {name: "undo", bindKey: f("Ctrl-Z", "Command-Z"), exec: function (a) {
            a.undo()
        }},
        {name: "redo", bindKey: f("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"), exec: function (a) {
            a.redo()
        }},
        {name: "copylinesup", bindKey: f("Alt-Shift-Up", "Command-Option-Up"), exec: function (a) {
            a.copyLinesUp()
        }},
        {name: "movelinesup", bindKey: f("Alt-Up", "Option-Up"), exec: function (a) {
            a.moveLinesUp()
        }},
        {name: "copylinesdown", bindKey: f("Alt-Shift-Down", "Command-Option-Down"), exec: function (a) {
            a.copyLinesDown()
        }},
        {name: "movelinesdown", bindKey: f("Alt-Down", "Option-Down"), exec: function (a) {
            a.moveLinesDown()
        }},
        {name: "del", bindKey: f("Delete", "Delete|Ctrl-D"), exec: function (a) {
            a.remove("right")
        }, multiSelectAction: "forEach"},
        {name: "backspace", bindKey: f("Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
            exec: function (a) {
                a.remove("left")
            }, multiSelectAction: "forEach"},
        {name: "removetolinestart", bindKey: f("Alt-Backspace", "Command-Backspace"), exec: function (a) {
            a.removeToLineStart()
        }, multiSelectAction: "forEach"},
        {name: "removetolineend", bindKey: f("Alt-Delete", "Ctrl-K"), exec: function (a) {
            a.removeToLineEnd()
        }, multiSelectAction: "forEach"},
        {name: "removewordleft", bindKey: f("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"), exec: function (a) {
            a.removeWordLeft()
        }, multiSelectAction: "forEach"},
        {name: "removewordright",
            bindKey: f("Ctrl-Delete", "Alt-Delete"), exec: function (a) {
            a.removeWordRight()
        }, multiSelectAction: "forEach"},
        {name: "outdent", bindKey: f("Shift-Tab", "Shift-Tab"), exec: function (a) {
            a.blockOutdent()
        }, multiSelectAction: "forEach"},
        {name: "indent", bindKey: f("Tab", "Tab"), exec: function (a) {
            a.indent()
        }, multiSelectAction: "forEach"},
        {name: "insertstring", exec: function (a, d) {
            a.insert(d)
        }, multiSelectAction: "forEach"},
        {name: "inserttext", exec: function (a, d) {
            a.insert(e.stringRepeat(d.text || "", d.times || 1))
        }, multiSelectAction: "forEach"},
        {name: "splitline", bindKey: f(null, "Ctrl-O"), exec: function (a) {
            a.splitLine()
        }, multiSelectAction: "forEach"},
        {name: "transposeletters", bindKey: f("Ctrl-T", "Ctrl-T"), exec: function (a) {
            a.transposeLetters()
        }, multiSelectAction: function (a) {
            a.transposeSelections(1)
        }},
        {name: "touppercase", bindKey: f("Ctrl-U", "Ctrl-U"), exec: function (a) {
            a.toUpperCase()
        }, multiSelectAction: "forEach"},
        {name: "tolowercase", bindKey: f("Ctrl-Shift-U", "Ctrl-Shift-U"), exec: function (a) {
            a.toLowerCase()
        }, multiSelectAction: "forEach"}
    ]
});
define("ace/undomanager", ["require", "exports", "module"], function (j, h) {
    var f = function () {
        this.reset()
    };
    (function () {
        this.execute = function (e) {
            var a = e.args[0];
            this.$doc = e.args[1];
            this.$undoStack.push(a);
            this.$redoStack = []
        };
        this.undo = function (e) {
            var a = this.$undoStack.pop();
            return a && (this.$doc.undoChanges(a, e), this.$redoStack.push(a)), null
        };
        this.redo = function (e) {
            var a = this.$redoStack.pop();
            return a && (this.$doc.redoChanges(a, e), this.$undoStack.push(a)), null
        };
        this.reset = function () {
            this.$undoStack = [];
            this.$redoStack =
                []
        };
        this.hasUndo = function () {
            return 0 < this.$undoStack.length
        };
        this.hasRedo = function () {
            return 0 < this.$redoStack.length
        }
    }).call(f.prototype);
    h.UndoManager = f
});
define("ace/virtual_renderer", "require exports module ace/lib/oop ace/lib/dom ace/lib/event ace/lib/useragent ace/config ace/lib/net ace/layer/gutter ace/layer/marker ace/layer/text ace/layer/cursor ace/scrollbar ace/renderloop ace/lib/event_emitter text!ace/css/editor.css".split(" "), function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/dom"), a = j("./lib/event"), d = j("./lib/useragent"), c = j("./config"), b = j("./lib/net"), g = j("./layer/gutter").Gutter, k = j("./layer/marker").Marker, l = j("./layer/text").Text, i = j("./layer/cursor").Cursor,
        m = j("./scrollbar").ScrollBar, p = j("./renderloop").RenderLoop, s = j("./lib/event_emitter").EventEmitter, q = j("text!./css/editor.css");
    e.importCssString(q, "ace_editor");
    q = function (b, c) {
        var f = this;
        this.container = b;
        this.$keepTextAreaAtCursor = !d.isIE;
        e.addCssClass(b, "ace_editor");
        this.setTheme(c);
        this.$gutter = e.createElement("div");
        this.$gutter.className = "ace_gutter";
        this.container.appendChild(this.$gutter);
        this.scroller = e.createElement("div");
        this.scroller.className = "ace_scroller";
        this.container.appendChild(this.scroller);
        this.content = e.createElement("div");
        this.content.className = "ace_content";
        this.scroller.appendChild(this.content);
        this.setHighlightGutterLine(true);
        this.$gutterLayer = new g(this.$gutter);
        this.$gutterLayer.on("changeGutterWidth", this.onResize.bind(this, true));
        this.$markerBack = new k(this.content);
        var h = this.$textLayer = new l(this.content);
        this.canvas = h.element;
        this.$markerFront = new k(this.content);
        this.characterWidth = h.getCharacterWidth();
        this.lineHeight = h.getLineHeight();
        this.$cursorLayer = new i(this.content);
        this.$cursorPadding = 8;
        this.$animatedScroll = this.$horizScrollAlwaysVisible = this.$horizScroll = false;
        this.scrollBar = new m(b);
        this.scrollBar.addEventListener("scroll", function (a) {
            f.$inScrollAnimation || f.session.setScrollTop(a.data)
        });
        this.scrollLeft = this.scrollTop = 0;
        a.addListener(this.scroller, "scroll", function () {
            var a = f.scroller.scrollLeft;
            f.scrollLeft = a;
            f.session.setScrollLeft(a)
        });
        this.cursorPos = {row: 0, column: 0};
        this.$textLayer.addEventListener("changeCharacterSize", function () {
            f.characterWidth = h.getCharacterWidth();
            f.lineHeight = h.getLineHeight();
            f.$updatePrintMargin();
            f.onResize(true);
            f.$loop.schedule(f.CHANGE_FULL)
        });
        this.$size = {width: 0, height: 0, scrollerHeight: 0, scrollerWidth: 0};
        this.layerConfig = {width: 1, padding: 0, firstRow: 0, firstRowScreen: 0, lastRow: 0, lineHeight: 1, characterWidth: 1, minHeight: 1, maxHeight: 1, offset: 0, height: 1};
        this.$loop = new p(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView);
        this.$loop.schedule(this.CHANGE_FULL);
        this.setPadding(4);
        this.$updatePrintMargin()
    };
    (function () {
        this.showGutter =
            true;
        this.CHANGE_CURSOR = 1;
        this.CHANGE_MARKER = 2;
        this.CHANGE_GUTTER = 4;
        this.CHANGE_SCROLL = 8;
        this.CHANGE_LINES = 16;
        this.CHANGE_TEXT = 32;
        this.CHANGE_SIZE = 64;
        this.CHANGE_MARKER_BACK = 128;
        this.CHANGE_MARKER_FRONT = 256;
        this.CHANGE_FULL = 512;
        this.CHANGE_H_SCROLL = 1024;
        f.implement(this, s);
        this.setSession = function (a) {
            this.session = a;
            this.scroller.className = "ace_scroller";
            this.$cursorLayer.setSession(a);
            this.$markerBack.setSession(a);
            this.$markerFront.setSession(a);
            this.$gutterLayer.setSession(a);
            this.$textLayer.setSession(a);
            this.$loop.schedule(this.CHANGE_FULL)
        };
        this.updateLines = function (a, b) {
            b === void 0 && (b = Infinity);
            this.$changedLines ? (this.$changedLines.firstRow > a && (this.$changedLines.firstRow = a), this.$changedLines.lastRow < b && (this.$changedLines.lastRow = b)) : this.$changedLines = {firstRow: a, lastRow: b};
            this.$loop.schedule(this.CHANGE_LINES)
        };
        this.onChangeTabSize = function () {
            this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
            this.$textLayer.onChangeTabSize()
        };
        this.updateText = function () {
            this.$loop.schedule(this.CHANGE_TEXT)
        };
        this.updateFull = function (a) {
            a ? this.$renderChanges(this.CHANGE_FULL, true) : this.$loop.schedule(this.CHANGE_FULL)
        };
        this.updateFontSize = function () {
            this.$textLayer.checkForSizeChanges()
        };
        this.onResize = function (a, b, c, d) {
            var g = this.CHANGE_SIZE, i = this.$size;
            if (!(this.resizing > 2)) {
                this.resizing > 1 ? this.resizing++ : this.resizing = a ? 1 : 0;
                d || (d = e.getInnerHeight(this.container));
                if (a || i.height != d) {
                    i.height = d;
                    this.scroller.style.height = d + "px";
                    i.scrollerHeight = this.scroller.clientHeight;
                    this.scrollBar.setHeight(i.scrollerHeight);
                    this.session && (this.session.setScrollTop(this.getScrollTop()), g = g | this.CHANGE_FULL)
                }
                c || (c = e.getInnerWidth(this.container));
                if (a || this.resizing > 1 || i.width != c) {
                    i.width = c;
                    b = this.showGutter ? this.$gutter.offsetWidth : 0;
                    this.scroller.style.left = b + "px";
                    i.scrollerWidth = Math.max(0, c - b - this.scrollBar.getWidth());
                    this.scroller.style.right = this.scrollBar.getWidth() + "px";
                    if (this.session.getUseWrapMode() && this.adjustWrapLimit() || a)g = g | this.CHANGE_FULL
                }
                a ? this.$renderChanges(g, true) : this.$loop.schedule(g);
                a && delete this.resizing
            }
        };
        this.adjustWrapLimit = function () {
            return this.session.adjustWrapLimit(Math.floor((this.$size.scrollerWidth - this.$padding * 2) / this.characterWidth))
        };
        this.setAnimatedScroll = function (a) {
            this.$animatedScroll = a
        };
        this.getAnimatedScroll = function () {
            return this.$animatedScroll
        };
        this.setShowInvisibles = function (a) {
            this.$textLayer.setShowInvisibles(a) && this.$loop.schedule(this.CHANGE_TEXT)
        };
        this.getShowInvisibles = function () {
            return this.$textLayer.showInvisibles
        };
        this.getDisplayIndentGuides = function () {
            return this.$textLayer.displayIndentGuides
        };
        this.setDisplayIndentGuides = function (a) {
            this.$textLayer.setDisplayIndentGuides(a) && this.$loop.schedule(this.CHANGE_TEXT)
        };
        this.$showPrintMargin = true;
        this.setShowPrintMargin = function (a) {
            this.$showPrintMargin = a;
            this.$updatePrintMargin()
        };
        this.getShowPrintMargin = function () {
            return this.$showPrintMargin
        };
        this.$printMarginColumn = 80;
        this.setPrintMarginColumn = function (a) {
            this.$printMarginColumn = a;
            this.$updatePrintMargin()
        };
        this.getPrintMarginColumn = function () {
            return this.$printMarginColumn
        };
        this.getShowGutter =
            function () {
                return this.showGutter
            };
        this.setShowGutter = function (a) {
            if (this.showGutter !== a) {
                this.$gutter.style.display = a ? "block" : "none";
                this.showGutter = a;
                this.onResize(true)
            }
        };
        this.getFadeFoldWidgets = function () {
            return e.hasCssClass(this.$gutter, "ace_fade-fold-widgets")
        };
        this.setFadeFoldWidgets = function (a) {
            a ? e.addCssClass(this.$gutter, "ace_fade-fold-widgets") : e.removeCssClass(this.$gutter, "ace_fade-fold-widgets")
        };
        this.$highlightGutterLine = false;
        this.setHighlightGutterLine = function (a) {
            if (this.$highlightGutterLine !=
                a) {
                this.$highlightGutterLine = a;
                if (this.$gutterLineHighlight) {
                    this.$gutterLineHighlight.style.display = a ? "" : "none";
                    this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight()
                } else {
                    this.$gutterLineHighlight = e.createElement("div");
                    this.$gutterLineHighlight.className = "ace_gutter_active_line";
                    this.$gutter.appendChild(this.$gutterLineHighlight)
                }
            }
        };
        this.getHighlightGutterLine = function () {
            return this.$highlightGutterLine
        };
        this.$updateGutterLineHighlight = function () {
            this.$gutterLineHighlight.style.top = this.$cursorLayer.$pixelPos.top -
                this.layerConfig.offset + "px";
            this.$gutterLineHighlight.style.height = this.layerConfig.lineHeight + "px"
        };
        this.$updatePrintMargin = function () {
            var a;
            if (this.$showPrintMargin || this.$printMarginEl) {
                this.$printMarginEl || (a = e.createElement("div"), a.className = "ace_print_margin_layer", this.$printMarginEl = e.createElement("div"), this.$printMarginEl.className = "ace_print_margin", a.appendChild(this.$printMarginEl), this.content.insertBefore(a, this.$textLayer.element));
                a = this.$printMarginEl.style;
                a.left = this.characterWidth *
                    this.$printMarginColumn + this.$padding + "px";
                a.visibility = this.$showPrintMargin ? "visible" : "hidden"
            }
        };
        this.getContainerElement = function () {
            return this.container
        };
        this.getMouseEventTarget = function () {
            return this.content
        };
        this.getTextAreaContainer = function () {
            return this.container
        };
        this.$moveTextAreaToCursor = function () {
            if (this.$keepTextAreaAtCursor) {
                var a = this.$cursorLayer.$pixelPos.top, b = this.$cursorLayer.$pixelPos.left, a = a - this.layerConfig.offset;
                if (!(a < 0 || a > this.layerConfig.height - this.lineHeight)) {
                    var c =
                        this.characterWidth;
                    this.$composition && (c = c + this.textarea.scrollWidth);
                    b = b - this.scrollLeft;
                    b > this.$size.scrollerWidth - c && (b = this.$size.scrollerWidth - c);
                    this.showGutter && (b = b + this.$gutterLayer.gutterWidth);
                    this.textarea.style.height = this.lineHeight + "px";
                    this.textarea.style.width = c + "px";
                    this.textarea.style.left = b + "px";
                    this.textarea.style.top = a - 1 + "px"
                }
            }
        };
        this.getFirstVisibleRow = function () {
            return this.layerConfig.firstRow
        };
        this.getFirstFullyVisibleRow = function () {
            return this.layerConfig.firstRow + (this.layerConfig.offset ===
                0 ? 0 : 1)
        };
        this.getLastFullyVisibleRow = function () {
            return this.layerConfig.firstRow - 1 + Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight)
        };
        this.getLastVisibleRow = function () {
            return this.layerConfig.lastRow
        };
        this.$padding = null;
        this.setPadding = function (a) {
            this.$padding = a;
            this.$textLayer.setPadding(a);
            this.$cursorLayer.setPadding(a);
            this.$markerFront.setPadding(a);
            this.$markerBack.setPadding(a);
            this.$loop.schedule(this.CHANGE_FULL);
            this.$updatePrintMargin()
        };
        this.getHScrollBarAlwaysVisible =
            function () {
                return this.$horizScrollAlwaysVisible
            };
        this.setHScrollBarAlwaysVisible = function (a) {
            this.$horizScrollAlwaysVisible != a && (this.$horizScrollAlwaysVisible = a, (!this.$horizScrollAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL))
        };
        this.$updateScrollBar = function () {
            this.scrollBar.setInnerHeight(this.layerConfig.maxHeight);
            this.scrollBar.setScrollTop(this.scrollTop)
        };
        this.$renderChanges = function (a, b) {
            if (b || a && this.session && this.container.offsetWidth) {
                (a & this.CHANGE_FULL ||
                    a & this.CHANGE_SIZE || a & this.CHANGE_TEXT || a & this.CHANGE_LINES || a & this.CHANGE_SCROLL) && this.$computeLayerConfig();
                if (a & this.CHANGE_H_SCROLL) {
                    this.scroller.scrollLeft = this.scrollLeft;
                    var c = this.scroller.scrollLeft;
                    this.scrollLeft = c;
                    this.session.setScrollLeft(c);
                    this.scroller.className = this.scrollLeft == 0 ? "ace_scroller" : "ace_scroller horscroll"
                }
                if (a & this.CHANGE_FULL) {
                    this.$textLayer.checkForSizeChanges();
                    this.$updateScrollBar();
                    this.$textLayer.update(this.layerConfig);
                    this.showGutter && this.$gutterLayer.update(this.layerConfig);
                    this.$markerBack.update(this.layerConfig);
                    this.$markerFront.update(this.layerConfig);
                    this.$cursorLayer.update(this.layerConfig);
                    this.$moveTextAreaToCursor();
                    this.$highlightGutterLine && this.$updateGutterLineHighlight()
                } else if (a & this.CHANGE_SCROLL) {
                    this.$updateScrollBar();
                    a & this.CHANGE_TEXT || a & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig);
                    this.showGutter && this.$gutterLayer.update(this.layerConfig);
                    this.$markerBack.update(this.layerConfig);
                    this.$markerFront.update(this.layerConfig);
                    this.$cursorLayer.update(this.layerConfig);
                    this.$moveTextAreaToCursor();
                    this.$highlightGutterLine && this.$updateGutterLineHighlight()
                } else {
                    a & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_LINES ? (this.$updateLines() || a & this.CHANGE_GUTTER && this.showGutter) && this.$gutterLayer.update(this.layerConfig) : (a & this.CHANGE_TEXT || a & this.CHANGE_GUTTER) && this.showGutter && this.$gutterLayer.update(this.layerConfig);
                    a & this.CHANGE_CURSOR && (this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight());
                    a & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig);
                    a & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig);
                    a & this.CHANGE_SIZE && this.$updateScrollBar()
                }
            }
        };
        this.$computeLayerConfig = function () {
            var a = this.session, b = this.scrollTop % this.lineHeight, c = this.$size.scrollerHeight +
                this.lineHeight, d = this.$getLongestLine(), e = this.$horizScrollAlwaysVisible || this.$size.scrollerWidth - d < 0, g = this.$horizScroll !== e;
            this.$horizScroll = e;
            g && (this.scroller.style.overflowX = e ? "scroll" : "hidden", e || this.session.setScrollLeft(0));
            e = this.session.getScreenLength() * this.lineHeight;
            this.session.setScrollTop(Math.max(0, Math.min(this.scrollTop, e - this.$size.scrollerHeight)));
            var i = Math.ceil(c / this.lineHeight) - 1, f = Math.max(0, Math.round((this.scrollTop - b) / this.lineHeight)), i = f + i, k, h = this.lineHeight,
                f = a.screenToDocumentRow(f, 0);
            (b = a.getFoldLine(f)) && (f = b.start.row);
            k = a.documentToScreenRow(f, 0);
            b = a.getRowLength(f) * h;
            i = Math.min(a.screenToDocumentRow(i, 0), a.getLength() - 1);
            c = this.$size.scrollerHeight + a.getRowLength(i) * h + b;
            b = this.scrollTop - k * h;
            this.layerConfig = {width: d, padding: this.$padding, firstRow: f, firstRowScreen: k, lastRow: i, lineHeight: h, characterWidth: this.characterWidth, minHeight: c, maxHeight: e, offset: b, height: this.$size.scrollerHeight};
            this.$gutterLayer.element.style.marginTop = -b + "px";
            this.content.style.marginTop =
                -b + "px";
            this.content.style.width = d + 2 * this.$padding + "px";
            this.content.style.height = c + "px";
            g && this.onResize(true)
        };
        this.$updateLines = function () {
            var a = this.$changedLines.firstRow, b = this.$changedLines.lastRow;
            this.$changedLines = null;
            var c = this.layerConfig;
            if (!(a > c.lastRow + 1) && !(b < c.firstRow))if (b === Infinity) {
                this.showGutter && this.$gutterLayer.update(c);
                this.$textLayer.update(c)
            } else return this.$textLayer.updateLines(c, a, b), true
        };
        this.$getLongestLine = function () {
            var a = this.session.getScreenWidth();
            return this.$textLayer.showInvisibles &&
                (a = a + 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(a * this.characterWidth))
        };
        this.updateFrontMarkers = function () {
            this.$markerFront.setMarkers(this.session.getMarkers(true));
            this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        };
        this.updateBackMarkers = function () {
            this.$markerBack.setMarkers(this.session.getMarkers());
            this.$loop.schedule(this.CHANGE_MARKER_BACK)
        };
        this.addGutterDecoration = function (a, b) {
            this.$gutterLayer.addGutterDecoration(a, b)
        };
        this.removeGutterDecoration = function (a, b) {
            this.$gutterLayer.removeGutterDecoration(a,
                b)
        };
        this.updateBreakpoints = function () {
            this.$loop.schedule(this.CHANGE_GUTTER)
        };
        this.setAnnotations = function (a) {
            this.$gutterLayer.setAnnotations(a);
            this.$loop.schedule(this.CHANGE_GUTTER)
        };
        this.updateCursor = function () {
            this.$loop.schedule(this.CHANGE_CURSOR)
        };
        this.hideCursor = function () {
            this.$cursorLayer.hideCursor()
        };
        this.showCursor = function () {
            this.$cursorLayer.showCursor()
        };
        this.scrollSelectionIntoView = function (a, b, c) {
            this.scrollCursorIntoView(a, c);
            this.scrollCursorIntoView(b, c)
        };
        this.scrollCursorIntoView =
            function (a, b) {
                if (this.$size.scrollerHeight !== 0) {
                    var c = this.$cursorLayer.getPixelPosition(a), d = c.left, c = c.top;
                    this.scrollTop > c ? (b && (c = c - b * this.$size.scrollerHeight), this.session.setScrollTop(c)) : this.scrollTop + this.$size.scrollerHeight < c + this.lineHeight && (b && (c = c + b * this.$size.scrollerHeight), this.session.setScrollTop(c + this.lineHeight - this.$size.scrollerHeight));
                    c = this.scrollLeft;
                    c > d ? (d < this.$padding + 2 * this.layerConfig.characterWidth && (d = 0), this.session.setScrollLeft(d)) : c + this.$size.scrollerWidth <
                        d + this.characterWidth && this.session.setScrollLeft(Math.round(d + this.characterWidth - this.$size.scrollerWidth))
                }
            };
        this.getScrollTop = function () {
            return this.session.getScrollTop()
        };
        this.getScrollLeft = function () {
            return this.session.getScrollLeft()
        };
        this.getScrollTopRow = function () {
            return this.scrollTop / this.lineHeight
        };
        this.getScrollBottomRow = function () {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        };
        this.scrollToRow = function (a) {
            this.session.setScrollTop(a * this.lineHeight)
        };
        this.alignCursor = function (a, b) {
            typeof a == "number" && (a = {row: a, column: 0});
            var c = this.$size.scrollerHeight - this.lineHeight, c = this.$cursorLayer.getPixelPosition(a).top - c * (b || 0);
            return this.session.setScrollTop(c), c
        };
        this.STEPS = 8;
        this.$calcSteps = function (a, b) {
            for (var c = 0, d = this.STEPS, e = [], c = 0; c < d; ++c)e.push((b - a) * (Math.pow(c / this.STEPS - 1, 3) + 1) + a);
            return e
        };
        this.scrollToLine = function (a, b, c, d) {
            a = this.$cursorLayer.getPixelPosition({row: a, column: 0}).top;
            b && (a = a - this.$size.scrollerHeight / 2);
            b = this.scrollTop;
            this.session.setScrollTop(a);
            c !== false && this.animateScrolling(b, d)
        };
        this.animateScrolling = function (a, b) {
            var c = this.scrollTop;
            if (this.$animatedScroll && Math.abs(a - c) < 1E5) {
                var d = this, e = d.$calcSteps(a, c);
                this.$inScrollAnimation = true;
                clearInterval(this.$timer);
                d.session.setScrollTop(e.shift());
                this.$timer = setInterval(function () {
                    e.length ? (d.session.setScrollTop(e.shift()), d.session.$scrollTop = c) : c != null ? (d.session.$scrollTop = -1, d.session.setScrollTop(c), c = null) : (d.$timer = clearInterval(d.$timer), d.$inScrollAnimation =
                        false, b && b())
                }, 10)
            }
        };
        this.scrollToY = function (a) {
            this.scrollTop !== a && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = a)
        };
        this.scrollToX = function (a) {
            a < 0 && (a = 0);
            this.scrollLeft !== a && (this.scrollLeft = a);
            this.$loop.schedule(this.CHANGE_H_SCROLL)
        };
        this.scrollBy = function (a, b) {
            b && this.session.setScrollTop(this.session.getScrollTop() + b);
            a && this.session.setScrollLeft(this.session.getScrollLeft() + a)
        };
        this.isScrollableBy = function (a, b) {
            if (b < 0 && this.session.getScrollTop() > 0 || b > 0 && this.session.getScrollTop() +
                this.$size.scrollerHeight < this.layerConfig.maxHeight)return true
        };
        this.pixelToScreenCoordinates = function (a, b) {
            var c = this.scroller.getBoundingClientRect(), d = (a + this.scrollLeft - c.left - this.$padding) / this.characterWidth, c = Math.floor((b + this.scrollTop - c.top) / this.lineHeight), e = Math.round(d);
            return{row: c, column: e, side: d - e > 0 ? 1 : -1}
        };
        this.screenToTextCoordinates = function (a, b) {
            var c = this.scroller.getBoundingClientRect(), d = Math.round((a + this.scrollLeft - c.left - this.$padding) / this.characterWidth);
            return this.session.screenToDocumentPosition(Math.floor((b +
                this.scrollTop - c.top) / this.lineHeight), Math.max(d, 0))
        };
        this.textToScreenCoordinates = function (a, b) {
            var c = this.scroller.getBoundingClientRect(), d = this.session.documentToScreenPosition(a, b), e = this.$padding + Math.round(d.column * this.characterWidth);
            return{pageX: c.left + e - this.scrollLeft, pageY: c.top + d.row * this.lineHeight - this.scrollTop}
        };
        this.visualizeFocus = function () {
            e.addCssClass(this.container, "ace_focus")
        };
        this.visualizeBlur = function () {
            e.removeCssClass(this.container, "ace_focus")
        };
        this.showComposition =
            function () {
                this.$composition || (this.$composition = {keepTextAreaAtCursor: this.$keepTextAreaAtCursor, cssText: this.textarea.style.cssText});
                this.$keepTextAreaAtCursor = true;
                e.addCssClass(this.textarea, "ace_composition");
                this.textarea.style.cssText = "";
                this.$moveTextAreaToCursor()
            };
        this.setCompositionText = function () {
            this.$moveTextAreaToCursor()
        };
        this.hideComposition = function () {
            if (this.$composition) {
                e.removeCssClass(this.textarea, "ace_composition");
                this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor;
                this.textarea.style.cssText = this.$composition.cssText;
                this.$composition = null
            }
        };
        this._loadTheme = function (a, d) {
            if (!c.get("packaged"))return d();
            b.loadScript(c.moduleUrl(a, "theme"), d)
        };
        this.setTheme = function (a) {
            function b(a) {
                e.importCssString(a.cssText, a.cssClass, c.container.ownerDocument);
                c.$theme && e.removeCssClass(c.container, c.$theme);
                c.$theme = a ? a.cssClass : null;
                c.$theme && e.addCssClass(c.container, c.$theme);
                a && a.isDark ? e.addCssClass(c.container, "ace_dark") : e.removeCssClass(c.container, "ace_dark");
                c.$size && (c.$size.width = 0, c.onResize())
            }

            var c = this;
            this.$themeValue = a;
            if (!a || typeof a == "string") {
                var d = a || "ace/theme/textmate", g;
                try {
                    g = j(d)
                } catch (i) {
                }
                if (g)return b(g);
                c._loadTheme(d, function () {
                    j([d], function (d) {
                        c.$themeValue === a && b(d)
                    })
                })
            } else b(a)
        };
        this.getTheme = function () {
            return this.$themeValue
        };
        this.setStyle = function (a) {
            e.addCssClass(this.container, a)
        };
        this.unsetStyle = function (a) {
            e.removeCssClass(this.container, a)
        };
        this.destroy = function () {
            this.$textLayer.destroy();
            this.$cursorLayer.destroy()
        }
    }).call(q.prototype);
    h.VirtualRenderer = q
});
define("ace/layer/gutter", "require exports module ace/lib/dom ace/lib/oop ace/lib/event_emitter".split(" "), function (j, h) {
    var f = j("../lib/dom"), e = j("../lib/oop"), a = j("../lib/event_emitter").EventEmitter, d = function (a) {
        this.element = f.createElement("div");
        this.element.className = "ace_layer ace_gutter-layer";
        a.appendChild(this.element);
        this.setShowFoldWidgets(this.$showFoldWidgets);
        this.gutterWidth = 0;
        this.$annotations = []
    };
    (function () {
        e.implement(this, a);
        this.setSession = function (a) {
            this.session = a
        };
        this.addGutterDecoration =
            function (a, b) {
                window.console && console.warn && console.warn("deprecated use session.addGutterDecoration");
                this.session.addGutterDecoration(a, b)
            };
        this.removeGutterDecoration = function (a, b) {
            window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration");
            this.session.removeGutterDecoration(a, b)
        };
        this.setAnnotations = function (a) {
            this.$annotations = [];
            for (var b in a)if (a.hasOwnProperty(b)) {
                var d = a[b];
                if (d)for (var e = this.$annotations[b] = {text: []}, f = 0; f < d.length; f++) {
                    var i = d[f], h = i.text.replace(/"/g,
                        "&quot;").replace(/'/g, "&#8217;").replace(/</, "&lt;");
                    e.text.indexOf(h) === -1 && e.text.push(h);
                    i = i.type;
                    i == "error" ? e.className = " ace_error" : i == "warning" && e.className != " ace_error" ? e.className = " ace_warning" : i == "info" && !e.className && (e.className = " ace_info")
                }
            }
        };
        this.update = function (a) {
            for (var b = {className: ""}, d = [], e = a.firstRow, h = a.lastRow, i = this.session.getNextFoldLine(e), m = i ? i.start.row : Infinity, j = this.$showFoldWidgets && this.session.foldWidgets, s = this.session.$breakpoints, q = this.session.$decorations,
                     n = 0; ;) {
                e > m && (e = i.end.row + 1, i = this.session.getNextFoldLine(e, i), m = i ? i.start.row : Infinity);
                if (e > h)break;
                d.push("<div class='ace_gutter-cell ", s[e] || "", q[e] || "", (this.$annotations[e] || b).className, "' style='height:", this.session.getRowLength(e) * a.lineHeight, "px;'>", n = e + 1);
                if (j) {
                    var r = j[e];
                    r == null && (r = j[e] = this.session.getFoldWidget(e));
                    r && d.push("<span class='ace_fold-widget ", r, r == "start" && e == m && e < i.end.row ? " closed" : " open", "' style='height:", a.lineHeight, "px", "'></span>")
                }
                d.push("</div>");
                e++
            }
            this.element =
                f.setInnerHtml(this.element, d.join(""));
            this.element.style.height = a.minHeight + "px";
            this.session.$useWrapMode && (n = this.session.getLength());
            a = ("" + n).length * a.characterWidth;
            b = this.$padding || this.$computePadding();
            a = a + (b.left + b.right);
            a !== this.gutterWidth && (this.gutterWidth = a, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", a))
        };
        this.$showFoldWidgets = true;
        this.setShowFoldWidgets = function (a) {
            a ? f.addCssClass(this.element, "ace_folding-enabled") : f.removeCssClass(this.element,
                "ace_folding-enabled");
            this.$showFoldWidgets = a;
            this.$padding = null
        };
        this.getShowFoldWidgets = function () {
            return this.$showFoldWidgets
        };
        this.$computePadding = function () {
            if (!this.element.firstChild)return{left: 0, right: 0};
            var a = f.computedStyle(this.element.firstChild);
            return this.$padding = {}, this.$padding.left = parseInt(a.paddingLeft) + 1, this.$padding.right = parseInt(a.paddingRight), this.$padding
        };
        this.getRegion = function (a) {
            var b = this.$padding || this.$computePadding(), d = this.element.getBoundingClientRect();
            if (a.x < b.left + d.left)return"markers";
            if (this.$showFoldWidgets && a.x > d.right - b.right)return"foldWidgets"
        }
    }).call(d.prototype);
    h.Gutter = d
});
define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (j, h) {
    var f = j("../range").Range, e = j("../lib/dom"), a = function (a) {
        this.element = e.createElement("div");
        this.element.className = "ace_layer ace_marker-layer";
        a.appendChild(this.element)
    };
    (function () {
        this.$padding = 0;
        this.setPadding = function (a) {
            this.$padding = a
        };
        this.setSession = function (a) {
            this.session = a
        };
        this.setMarkers = function (a) {
            this.markers = a
        };
        this.update = function (a) {
            if (a = a || this.config) {
                this.config = a;
                var c = [],
                    b;
                for (b in this.markers) {
                    var g = this.markers[b];
                    if (g.range) {
                        var f = g.range.clipRows(a.firstRow, a.lastRow);
                        if (!f.isEmpty())if (f = f.toScreenRange(this.session), g.renderer) {
                            var h = this.$getTop(f.start.row, a), i = Math.round(this.$padding + f.start.column * a.characterWidth);
                            g.renderer(c, f, i, h, a)
                        } else f.isMultiLine() ? "text" == g.type ? this.drawTextMarker(c, f, g.clazz, a) : this.drawMultiLineMarker(c, f, g.clazz, a, g.type) : this.drawSingleLineMarker(c, f, g.clazz + " start", a, null, g.type)
                    } else g.update(c, this, this.session, a)
                }
                this.element =
                    e.setInnerHtml(this.element, c.join(""))
            }
        };
        this.$getTop = function (a, c) {
            return(a - c.firstRowScreen) * c.lineHeight
        };
        this.drawTextMarker = function (a, c, b, e) {
            var k = c.start.row, h = new f(k, c.start.column, k, this.session.getScreenLastRowColumn(k));
            this.drawSingleLineMarker(a, h, b + " start", e, 1, "text");
            k = c.end.row;
            h = new f(k, 0, k, c.end.column);
            this.drawSingleLineMarker(a, h, b, e, 0, "text");
            for (k = c.start.row + 1; k < c.end.row; k++)h.start.row = k, h.end.row = k, h.end.column = this.session.getScreenLastRowColumn(k), this.drawSingleLineMarker(a,
                h, b, e, 1, "text")
        };
        this.drawMultiLineMarker = function (a, c, b, e, f) {
            var f = "background" === f ? 0 : this.$padding, h = e.lineHeight, i = this.$getTop(c.start.row, e), m = Math.round(f + c.start.column * e.characterWidth);
            a.push("<div class='", b, " start' style='", "height:", h, "px;", "right:0;", "top:", i, "px;", "left:", m, "px;'></div>");
            i = this.$getTop(c.end.row, e);
            m = Math.round(c.end.column * e.characterWidth);
            a.push("<div class='", b, "' style='", "height:", h, "px;", "width:", m, "px;", "top:", i, "px;", "left:", f, "px;'></div>");
            h = (c.end.row -
                c.start.row - 1) * e.lineHeight;
            0 > h || (i = this.$getTop(c.start.row + 1, e), a.push("<div class='", b, "' style='", "height:", h, "px;", "right:0;", "top:", i, "px;", "left:", f, "px;'></div>"))
        };
        this.drawSingleLineMarker = function (a, c, b, e, f, h) {
            var i = "background" === h ? 0 : this.$padding, m = e.lineHeight, f = "background" === h ? e.width : Math.round((c.end.column + (f || 0) - c.start.column) * e.characterWidth), h = this.$getTop(c.start.row, e), c = Math.round(i + c.start.column * e.characterWidth);
            a.push("<div class='", b, "' style='", "height:", m, "px;", "width:",
                f, "px;", "top:", h, "px;", "left:", c, "px;'></div>")
        }
    }).call(a.prototype);
    h.Marker = a
});
define("ace/layer/text", "require exports module ace/lib/oop ace/lib/dom ace/lib/lang ace/lib/useragent ace/lib/event_emitter".split(" "), function (j, h) {
    var f = j("../lib/oop"), e = j("../lib/dom"), a = j("../lib/lang"), d = j("../lib/useragent"), c = j("../lib/event_emitter").EventEmitter, b = function (a) {
        this.element = e.createElement("div");
        this.element.className = "ace_layer ace_text-layer";
        a.appendChild(this.element);
        this.$characterSize = this.$measureSizes() || {width: 0, height: 0};
        this.$pollSizeChanges()
    };
    (function () {
        f.implement(this,
            c);
        this.EOF_CHAR = "¶";
        this.EOL_CHAR = "¬";
        this.TAB_CHAR = "→";
        this.SPACE_CHAR = "·";
        this.$padding = 0;
        this.setPadding = function (a) {
            this.$padding = a;
            this.element.style.padding = "0 " + a + "px"
        };
        this.getLineHeight = function () {
            return this.$characterSize.height || 1
        };
        this.getCharacterWidth = function () {
            return this.$characterSize.width || 1
        };
        this.checkForSizeChanges = function () {
            var a = this.$measureSizes();
            a && (this.$characterSize.width !== a.width || this.$characterSize.height !== a.height) && (this.$characterSize = a, this._emit("changeCharacterSize",
                {data: a}))
        };
        this.$pollSizeChanges = function () {
            var a = this;
            this.$pollSizeChangesTimer = setInterval(function () {
                a.checkForSizeChanges()
            }, 500)
        };
        this.$fontStyles = {fontFamily: 1, fontSize: 1, fontWeight: 1, fontStyle: 1, lineHeight: 1};
        this.$measureSizes = d.isIE || d.isOldGecko ? function () {
            if (!this.$measureNode) {
                var b = this.$measureNode = e.createElement("div"), c = b.style;
                c.width = c.height = "auto";
                c.left = c.top = "-40000px";
                c.visibility = "hidden";
                c.position = "fixed";
                c.overflow = "visible";
                c.whiteSpace = "nowrap";
                b.innerHTML = a.stringRepeat("Xy",
                    1E3);
                if (this.element.ownerDocument.body)this.element.ownerDocument.body.appendChild(b); else {
                    for (c = this.element.parentNode; !e.hasCssClass(c, "ace_editor");)c = c.parentNode;
                    c.appendChild(b)
                }
            }
            if (!this.element.offsetWidth)return null;
            var c = this.$measureNode.style, b = e.computedStyle(this.element), d;
            for (d in this.$fontStyles)c[d] = b[d];
            d = {height: this.$measureNode.offsetHeight, width: this.$measureNode.offsetWidth / 2E3};
            return d.width == 0 || d.height == 0 ? null : d
        } : function () {
            if (!this.$measureNode) {
                var a = this.$measureNode =
                    e.createElement("div"), b = a.style;
                b.width = b.height = "auto";
                b.left = b.top = "-100px";
                b.visibility = "hidden";
                b.position = "fixed";
                b.overflow = "visible";
                b.whiteSpace = "nowrap";
                a.innerHTML = "X";
                for (b = this.element.parentNode; b && !e.hasCssClass(b, "ace_editor");)b = b.parentNode;
                if (!b)return this.$measureNode = null;
                b.appendChild(a)
            }
            a = this.$measureNode.getBoundingClientRect();
            a = {height: a.height, width: a.width};
            return a.width == 0 || a.height == 0 ? null : a
        };
        this.setSession = function (a) {
            this.session = a;
            this.$computeTabString()
        };
        this.showInvisibles =
            false;
        this.setShowInvisibles = function (a) {
            return this.showInvisibles == a ? false : (this.showInvisibles = a, this.$computeTabString(), true)
        };
        this.displayIndentGuides = true;
        this.setDisplayIndentGuides = function (a) {
            return this.displayIndentGuides == a ? false : (this.displayIndentGuides = a, this.$computeTabString(), true)
        };
        this.$tabStrings = [];
        this.onChangeTabSize = this.$computeTabString = function () {
            var a = this.session.getTabSize();
            this.tabSize = a;
            for (var b = this.$tabStrings = [0], c = 1; c < a + 1; c++)this.showInvisibles ? b.push("<span class='ace_invisible'>" +
                this.TAB_CHAR + Array(c).join("&#160;") + "</span>") : b.push(Array(c + 1).join("&#160;"));
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                a = "ace_indent-guide";
                c = b = Array(this.tabSize + 1).join("&#160;");
                this.showInvisibles && (a = a + " ace_invisible", c = this.TAB_CHAR + b.substr(6));
                this.$tabStrings[" "] = "<span class='" + a + "'>" + b + "</span>";
                this.$tabStrings["\t"] = "<span class='" + a + "'>" + c + "</span>"
            }
        };
        this.updateLines = function (a, b, c) {
            (this.config.lastRow != a.lastRow || this.config.firstRow != a.firstRow) &&
            this.scrollLines(a);
            this.config = a;
            for (var d = Math.max(b, a.firstRow), c = Math.min(c, a.lastRow), b = this.element.childNodes, f = 0, a = a.firstRow; a < d; a++) {
                var h = this.session.getFoldLine(a);
                if (h) {
                    if (h.containsRow(d)) {
                        d = h.start.row;
                        break
                    }
                    a = h.end.row
                }
                f++
            }
            a = d;
            for (d = (h = this.session.getNextFoldLine(a)) ? h.start.row : Infinity; ;) {
                a > d && (a = h.end.row + 1, h = this.session.getNextFoldLine(a, h), d = h ? h.start.row : Infinity);
                if (a > c)break;
                var j = b[f++];
                if (j) {
                    var q = [];
                    this.$renderLine(q, a, !this.$useLineGroups(), a == d ? h : false);
                    e.setInnerHtml(j,
                        q.join(""))
                }
                a++
            }
        };
        this.scrollLines = function (a) {
            var b = this.config;
            this.config = a;
            if (!b || b.lastRow < a.firstRow || a.lastRow < b.firstRow)return this.update(a);
            var c = this.element;
            if (b.firstRow < a.firstRow)for (var d = this.session.getFoldedRowCount(b.firstRow, a.firstRow - 1); d > 0; d--)c.removeChild(c.firstChild);
            if (b.lastRow > a.lastRow)for (d = this.session.getFoldedRowCount(a.lastRow + 1, b.lastRow); d > 0; d--)c.removeChild(c.lastChild);
            if (a.firstRow < b.firstRow) {
                d = this.$renderLinesFragment(a, a.firstRow, b.firstRow - 1);
                c.firstChild ?
                    c.insertBefore(d, c.firstChild) : c.appendChild(d)
            }
            if (a.lastRow > b.lastRow) {
                d = this.$renderLinesFragment(a, b.lastRow + 1, a.lastRow);
                c.appendChild(d)
            }
        };
        this.$renderLinesFragment = function (a, b, c) {
            for (var a = this.element.ownerDocument.createDocumentFragment(), d = this.session.getNextFoldLine(b), f = d ? d.start.row : Infinity; ;) {
                b > f && (b = d.end.row + 1, d = this.session.getNextFoldLine(b, d), f = d ? d.start.row : Infinity);
                if (b > c)break;
                var h = e.createElement("div"), j = [];
                this.$renderLine(j, b, false, b == f ? d : false);
                h.innerHTML = j.join("");
                if (this.$useLineGroups()) {
                    h.className = "ace_line_group";
                    a.appendChild(h)
                } else for (h = h.childNodes; h.length;)a.appendChild(h[0]);
                b++
            }
            return a
        };
        this.update = function (a) {
            this.config = a;
            for (var b = [], c = a.lastRow, a = a.firstRow, d = this.session.getNextFoldLine(a), f = d ? d.start.row : Infinity; ;) {
                a > f && (a = d.end.row + 1, d = this.session.getNextFoldLine(a, d), f = d ? d.start.row : Infinity);
                if (a > c)break;
                this.$useLineGroups() && b.push("<div class='ace_line_group'>");
                this.$renderLine(b, a, false, a == f ? d : false);
                this.$useLineGroups() && b.push("</div>");
                a++
            }
            this.element = e.setInnerHtml(this.element, b.join(""))
        };
        this.$textToken = {text: true, rparen: true, lparen: true};
        this.$renderToken = function (a, b, c, d) {
            var e = this, f = d.replace(/\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g,
                function (a, c, d, g) {
                    if (c)return Array(a.length + 1).join("&#160;");
                    if (a == "&")return"&#38;";
                    if (a == "<")return"&#60;";
                    if (a == "\t") {
                        a = e.session.getScreenTabSize(b + g);
                        return b = b + (a - 1), e.$tabStrings[a]
                    }
                    if (a == "　") {
                        a = e.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk";
                        c = e.showInvisibles ? e.SPACE_CHAR : "";
                        return b = b + 1, "<span class='" + a + "' style='width:" + e.config.characterWidth * 2 + "px'>" + c + "</span>"
                    }
                    return d ? "<span class='ace_invisible ace_invalid'>" + e.SPACE_CHAR + "</span>" : (b = b + 1, "<span class='ace_cjk' style='width:" +
                        e.config.characterWidth * 2 + "px'>" + a + "</span>")
                });
            if (this.$textToken[c.type])a.push(f); else {
                var h = "ace_" + c.type.replace(/\./g, " ace_"), j = "";
                c.type == "fold" && (j = " style='width:" + c.value.length * this.config.characterWidth + "px;' ");
                a.push("<span class='", h, "'", j, ">", f, "</span>")
            }
            return b + d.length
        };
        this.renderIndentGuide = function (a, b) {
            var c = b.search(this.$indentGuideRe);
            return c <= 0 ? b : b[0] == " " ? (c = c - c % this.tabSize, a.push(Array(c / this.tabSize + 1).join(this.$tabStrings[" "])), b.substr(c)) : b[0] == "\t" ? (a.push(Array(c +
                1).join(this.$tabStrings["\t"])), b.substr(c)) : b
        };
        this.$renderWrappedLine = function (a, b, c, d) {
            for (var e = 0, f = 0, h = c[0], j = 0, n = 0; n < b.length; n++) {
                var r = b[n], o = r.value;
                if (n == 0 && this.displayIndentGuides) {
                    e = o.length;
                    o = this.renderIndentGuide(a, o);
                    if (!o)continue;
                    e = e - o.length
                }
                if (e + o.length < h) {
                    j = this.$renderToken(a, j, r, o);
                    e = e + o.length
                } else {
                    for (; e + o.length >= h;) {
                        this.$renderToken(a, j, r, o.substring(0, h - e));
                        o = o.substring(h - e);
                        e = h;
                        d || a.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>");
                        f++;
                        j = 0;
                        h = c[f] || Number.MAX_VALUE
                    }
                    o.length != 0 && (e = e + o.length, j = this.$renderToken(a, j, r, o))
                }
            }
        };
        this.$renderSimpleLine = function (a, b) {
            var c = 0, d = b[0], e = d.value;
            this.displayIndentGuides && (e = this.renderIndentGuide(a, e));
            e && (c = this.$renderToken(a, c, d, e));
            for (var f = 1; f < b.length; f++) {
                d = b[f];
                e = d.value;
                c = this.$renderToken(a, c, d, e)
            }
        };
        this.$renderLine = function (a, b, c, d) {
            !d && d != 0 && (d = this.session.getFoldLine(b));
            var e = d ? this.$getFoldLineTokens(b, d) : this.session.getTokens(b);
            c || a.push("<div class='ace_line' style='height:",
                this.config.lineHeight, "px'>");
            if (e.length) {
                var f = this.session.getRowSplitData(b);
                f && f.length ? this.$renderWrappedLine(a, e, f, c) : this.$renderSimpleLine(a, e)
            }
            this.showInvisibles && (d && (b = d.end.row), a.push("<span class='ace_invisible'>", b == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>"));
            c || a.push("</div>")
        };
        this.$getFoldLineTokens = function (a, b) {
            var c = this.session, d = [], e = c.getTokens(a);
            return b.walk(function (a, b, g, f, h) {
                if (a)d.push({type: "fold", value: a}); else {
                    h && (e = c.getTokens(b));
                    if (e.length)a:{
                        a =
                            e;
                        for (h = b = 0; h + a[b].value.length < f;) {
                            h = h + a[b].value.length;
                            b++;
                            if (b == a.length)break a
                        }
                        if (h != f) {
                            var k = a[b].value.substring(f - h);
                            k.length > g - f && (k = k.substring(0, g - f));
                            d.push({type: a[b].type, value: k});
                            h = f + k.length;
                            b = b + 1
                        }
                        for (; h < g && b < a.length;) {
                            k = a[b].value;
                            k.length + h > g ? d.push({type: a[b].type, value: k.substring(0, g - h)}) : d.push(a[b]);
                            h = h + k.length;
                            b = b + 1
                        }
                    }
                }
            }, b.end.row, this.session.getLine(b.end.row).length), d
        };
        this.$useLineGroups = function () {
            return this.session.getUseWrapMode()
        };
        this.destroy = function () {
            clearInterval(this.$pollSizeChangesTimer);
            this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode);
            delete this.$measureNode
        }
    }).call(b.prototype);
    h.Text = b
});
define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (j, h) {
    var f = j("../lib/dom"), e = function (a) {
        this.element = f.createElement("div");
        this.element.className = "ace_layer ace_cursor-layer";
        a.appendChild(this.element);
        this.isVisible = !1;
        this.isBlinking = !0;
        this.cursors = [];
        this.cursor = this.addCursor()
    };
    (function () {
        this.$padding = 0;
        this.setPadding = function (a) {
            this.$padding = a
        };
        this.setSession = function (a) {
            this.session = a
        };
        this.setBlinking = function (a) {
            (this.isBlinking = a) && this.restartTimer()
        };
        this.addCursor = function () {
            var a = f.createElement("div"), d = "ace_cursor";
            return this.isVisible || (d += " ace_hidden"), this.overwrite && (d += " ace_overwrite"), a.className = d, this.element.appendChild(a), this.cursors.push(a), a
        };
        this.removeCursor = function () {
            if (1 < this.cursors.length) {
                var a = this.cursors.pop();
                return a.parentNode.removeChild(a), a
            }
        };
        this.hideCursor = function () {
            this.isVisible = !1;
            for (var a = this.cursors.length; a--;)f.addCssClass(this.cursors[a], "ace_hidden");
            clearInterval(this.blinkId)
        };
        this.showCursor =
            function () {
                this.isVisible = !0;
                for (var a = this.cursors.length; a--;)f.removeCssClass(this.cursors[a], "ace_hidden");
                this.element.style.visibility = "";
                this.restartTimer()
            };
        this.restartTimer = function () {
            clearInterval(this.blinkId);
            if (this.isBlinking && this.isVisible) {
                var a = 1 == this.cursors.length ? this.cursor : this.element;
                this.blinkId = setInterval(function () {
                    a.style.visibility = "hidden";
                    setTimeout(function () {
                        a.style.visibility = ""
                    }, 400)
                }, 1E3)
            }
        };
        this.getPixelPosition = function (a, d) {
            if (!this.config || !this.session)return{left: 0,
                top: 0};
            a || (a = this.session.selection.getCursor());
            var c = this.session.documentToScreenPosition(a);
            return{left: Math.round(this.$padding + c.column * this.config.characterWidth), top: (c.row - (d ? this.config.firstRowScreen : 0)) * this.config.lineHeight}
        };
        this.update = function (a) {
            this.config = a;
            if (0 < this.session.selectionMarkerCount) {
                for (var d = this.session.$selectionMarkers, c = 0, b, e = 0, c = d.length; c--;)if (b = d[c], b = this.getPixelPosition(b.cursor, !0), !((b.top > a.height + a.offset || b.top < -a.offset) && 1 < c)) {
                    var f = (this.cursors[e++] ||
                        this.addCursor()).style;
                    f.left = b.left + "px";
                    f.top = b.top + "px";
                    f.width = a.characterWidth + "px";
                    f.height = a.lineHeight + "px"
                }
                if (1 < e)for (; this.cursors.length > e;)this.removeCursor()
            } else {
                b = this.getPixelPosition(null, !0);
                f = this.cursor.style;
                f.left = b.left + "px";
                f.top = b.top + "px";
                f.width = a.characterWidth + "px";
                for (f.height = a.lineHeight + "px"; 1 < this.cursors.length;)this.removeCursor()
            }
            a = this.session.getOverwrite();
            a != this.overwrite && this.$setOverite(a);
            this.$pixelPos = b;
            this.restartTimer()
        };
        this.$setOverite = function (a) {
            this.overwrite =
                a;
            for (var d = this.cursors.length; d--;)a ? f.addCssClass(this.cursors[d], "ace_overwrite") : f.removeCssClass(this.cursors[d], "ace_overwrite")
        };
        this.destroy = function () {
            clearInterval(this.blinkId)
        }
    }).call(e.prototype);
    h.Cursor = e
});
define("ace/scrollbar", "require exports module ace/lib/oop ace/lib/dom ace/lib/event ace/lib/event_emitter".split(" "), function (j, h) {
    var f = j("./lib/oop"), e = j("./lib/dom"), a = j("./lib/event"), d = j("./lib/event_emitter").EventEmitter, c = function (b) {
        this.element = e.createElement("div");
        this.element.className = "ace_sb";
        this.inner = e.createElement("div");
        this.element.appendChild(this.inner);
        b.appendChild(this.element);
        this.width = e.scrollbarWidth(b.ownerDocument);
        this.element.style.width = (this.width || 15) + 5 + "px";
        a.addListener(this.element, "scroll", this.onScroll.bind(this))
    };
    (function () {
        f.implement(this, d);
        this.onScroll = function () {
            this._emit("scroll", {data: this.element.scrollTop})
        };
        this.getWidth = function () {
            return this.width
        };
        this.setHeight = function (a) {
            this.element.style.height = a + "px"
        };
        this.setInnerHeight = function (a) {
            this.inner.style.height = a + "px"
        };
        this.setScrollTop = function (a) {
            this.element.scrollTop = a
        }
    }).call(c.prototype);
    h.ScrollBar = c
});
define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (j, h) {
    var f = j("./lib/event"), e = function (a, d) {
        this.onRender = a;
        this.pending = !1;
        this.changes = 0;
        this.window = d || window
    };
    (function () {
        this.schedule = function (a) {
            this.changes |= a;
            if (!this.pending) {
                this.pending = !0;
                var d = this;
                f.nextTick(function () {
                    d.pending = !1;
                    for (var a; a = d.changes;)d.changes = 0, d.onRender(a)
                }, this.window)
            }
        }
    }).call(e.prototype);
    h.RenderLoop = e
});
define("text!ace/css/editor.css", [], ".ace_editor {\n    position: absolute;\n    overflow: hidden;\n    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Droid Sans Mono', 'Consolas', monospace;\n    font-size: 12px;\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow: hidden;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    cursor: text;\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow : hidden;\n    height: 100%;\n    width: auto;\n    cursor: default;\n    z-index: 4;\n}\n\n.ace_gutter_active_line {\n    position: absolute;\n    left: 0;\n    right: 0;\n}\n\n.ace_scroller.horscroll {\n    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\n}\n\n.ace_gutter-cell {\n    padding-left: 19px;\n    padding-right: 6px;\n    background-repeat: no-repeat;\n}\n\n.ace_gutter-cell.ace_error {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_warning {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_info {\n    background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");\n    background-position: 2px center;\n}\n.ace_dark .ace_gutter-cell.ace_info {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");\n}\n\n.ace_editor .ace_sb {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    right: 0;\n}\n\n.ace_editor .ace_sb div {\n    position: absolute;\n    width: 1px;\n    left: 0;\n}\n\n.ace_editor .ace_print_margin_layer {\n    z-index: 0;\n    position: absolute;\n    overflow: hidden;\n    margin: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n}\n\n.ace_editor .ace_print_margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_editor > textarea {\n    position: absolute;\n    z-index: 0;\n    width: 0.5em;\n    height: 1em;\n    opacity: 0;\n    background: transparent;\n    appearance: none;\n    -moz-appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n}\n\n.ace_editor > textarea.ace_composition {\n    background: #fff;\n    color: #000;\n    z-index: 1000;\n    opacity: 1;\n    border: solid lightgray 1px;\n    margin: -1px\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    white-space: nowrap;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    /* setting pointer-events: auto; on node under the mouse, which changes\n        during scroll, will break mouse wheel scrolling in Safari */\n    pointer-events: none;\n}\n\n.ace_gutter .ace_layer {\n    position: relative;\n    width: auto;\n    text-align: right;\n    pointer-events: auto;\n}\n\n.ace_text-layer {\n    color: black;\n    font: inherit !important;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n}\n\n.ace_cursor.ace_hidden {\n    opacity: 0.2;\n}\n\n.ace_editor.multiselect .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_line {\n    white-space: nowrap;\n}\n\n.ace_marker-layer .ace_step {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 6;\n}\n\n.ace_marker-layer .ace_active_line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected_word {\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n\n    display: inline-block;\n    height: 11px;\n    margin-top: -2px;\n    vertical-align: middle;\n\n    background-image:\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n    color: transparent;\n\n    border: 1px solid black;\n    -moz-border-radius: 2px;\n    -webkit-border-radius: 2px;\n    border-radius: 2px;\n\n    cursor: pointer;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n}\n\n.ace_fold:hover{\n    background-image:\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n}\n\n.ace_dragging .ace_content {\n    cursor: move;\n}\n\n.ace_gutter_tooltip {\n    background-color: #FFFFD5;\n    border: 1px solid gray;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\n    color: black;\n    display: inline-block;\n    padding: 4px;\n    position: absolute;\n    z-index: 300;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    cursor: default;\n}\n\n.ace_folding-enabled > .ace_gutter-cell {\n    padding-right: 13px;\n}\n\n.ace_fold-widget {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n\n    margin: 0 -12px 0 1px;\n    display: inline-block;\n    width: 11px;\n    vertical-align: top;\n\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat;\n    background-position: center;\n\n    border-radius: 3px;\n    \n    border: 1px solid transparent;\n}\n\n.ace_fold-widget.end {\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");\n}\n\n.ace_fold-widget.closed {\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");\n}\n\n.ace_fold-widget:hover {\n    border: 1px solid rgba(0, 0, 0, 0.3);\n    background-color: rgba(255, 255, 255, 0.2);\n    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n}\n\n.ace_fold-widget:active {\n    border: 1px solid rgba(0, 0, 0, 0.4);\n    background-color: rgba(0, 0, 0, 0.05);\n    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n}\n/**\n * Dark version for fold widgets\n */\n.ace_dark .ace_fold-widget {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");\n}\n.ace_dark .ace_fold-widget.end {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");\n}\n.ace_dark .ace_fold-widget.closed {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");\n}\n.ace_dark .ace_fold-widget:hover {\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n    background-color: rgba(255, 255, 255, 0.1);\n}\n.ace_dark .ace_fold-widget:active {\n    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n}\n    \n    \n    \n.ace_fold-widget.invalid {\n    background-color: #FFB4B4;\n    border-color: #DE5555;\n}\n\n.ace_fade-fold-widgets .ace_fold-widget {\n       -moz-transition: opacity 0.4s ease 0.05s;\n    -webkit-transition: opacity 0.4s ease 0.05s;\n         -o-transition: opacity 0.4s ease 0.05s;\n        -ms-transition: opacity 0.4s ease 0.05s;\n            transition: opacity 0.4s ease 0.05s;\n    opacity: 0;\n}\n\n.ace_fade-fold-widgets:hover .ace_fold-widget {\n       -moz-transition: opacity 0.05s ease 0.05s;\n    -webkit-transition: opacity 0.05s ease 0.05s;\n         -o-transition: opacity 0.05s ease 0.05s;\n        -ms-transition: opacity 0.05s ease 0.05s;\n            transition: opacity 0.05s ease 0.05s;\n    opacity:1;\n}\n\n.ace_underline {\n    text-decoration: underline;\n}\n\n.ace_bold {\n    font-weight: bold;\n}\n\n.ace_italic {\n    font-style: italic;\n}\n");
define("ace/multi_select", "require exports module ace/range_list ace/range ace/selection ace/mouse/multi_select_handler ace/lib/event ace/lib/lang ace/commands/multi_select_commands ace/search ace/edit_session ace/editor".split(" "), function (j, h) {
    function f(a) {
        function c() {
            e && (g.style.cursor = "", e = false)
        }

        var d = a.textInput.getElement(), e = false, g = a.renderer.content;
        b.addListener(d, "keydown", function (a) {
            a.keyCode == 18 && !a.ctrlKey && !a.shiftKey && !a.metaKey ? e || (g.style.cursor = "crosshair", e = true) : e && (g.style.cursor =
                "")
        });
        b.addListener(d, "keyup", c);
        b.addListener(d, "blur", c)
    }

    var e = j("./range_list").RangeList, a = j("./range").Range, d = j("./selection").Selection, c = j("./mouse/multi_select_handler").onMouseDown, b = j("./lib/event"), g = j("./lib/lang"), k = j("./commands/multi_select_commands");
    h.commands = k.defaultCommands.concat(k.multiSelectCommands);
    var l = new (j("./search").Search);
    (function () {
        this.getSelectionMarkers = function () {
            return this.$selectionMarkers
        }
    }).call(j("./edit_session").EditSession.prototype);
    (function () {
        this.rangeList =
            this.ranges = null;
        this.addRange = function (a, b) {
            if (a) {
                if (!this.inMultiSelectMode && this.rangeCount == 0) {
                    var c = this.toOrientedRange();
                    if (a.intersects(c))return b || this.fromOrientedRange(a);
                    this.rangeList.add(c);
                    this.$onAddRange(c)
                }
                a.cursor || (a.cursor = a.end);
                c = this.rangeList.add(a);
                return this.$onAddRange(a), c.length && this.$onRemoveRange(c), this.rangeCount > 1 && !this.inMultiSelectMode && (this._emit("multiSelect"), this.inMultiSelectMode = true, this.session.$undoSelect = false, this.rangeList.attach(this.session)),
                    b || this.fromOrientedRange(a)
            }
        };
        this.toSingleRange = function (a) {
            var a = a || this.ranges[0], b = this.rangeList.removeAll();
            b.length && this.$onRemoveRange(b);
            a && this.fromOrientedRange(a)
        };
        this.substractPoint = function (a) {
            if (a = this.rangeList.substractPoint(a))return this.$onRemoveRange(a), a[0]
        };
        this.mergeOverlappingRanges = function () {
            var a = this.rangeList.merge();
            a.length ? this.$onRemoveRange(a) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
        };
        this.$onAddRange = function (a) {
            this.rangeCount = this.rangeList.ranges.length;
            this.ranges.unshift(a);
            this._emit("addRange", {range: a})
        };
        this.$onRemoveRange = function (a) {
            this.rangeCount = this.rangeList.ranges.length;
            if (this.rangeCount == 1 && this.inMultiSelectMode) {
                var b = this.rangeList.ranges.pop();
                a.push(b);
                this.rangeCount = 0
            }
            for (var c = a.length; c--;)this.ranges.splice(this.ranges.indexOf(a[c]), 1);
            this._emit("removeRange", {ranges: a});
            this.rangeCount == 0 && this.inMultiSelectMode && (this.inMultiSelectMode = false, this._emit("singleSelect"), this.session.$undoSelect = true, this.rangeList.detach(this.session));
            (b = b || this.ranges[0]) && !b.isEqual(this.getRange()) && this.fromOrientedRange(b)
        };
        this.$initRangeList = function () {
            if (!this.rangeList) {
                this.rangeList = new e;
                this.ranges = [];
                this.rangeCount = 0
            }
        };
        this.getAllRanges = function () {
            return this.rangeList.ranges.concat()
        };
        this.splitIntoLines = function () {
            if (this.rangeCount > 1) {
                var b = this.rangeList.ranges, c = b[b.length - 1], b = a.fromPoints(b[0].start, c.end);
                this.toSingleRange();
                this.setSelectionRange(b, c.cursor == c.start)
            } else {
                var b = this.getRange(), d = this.isBackwards(), e = b.start.row,
                    c = b.end.row;
                if (e == c) {
                    if (d) {
                        c = b.end;
                        b = b.start
                    } else {
                        c = b.start;
                        b = b.end
                    }
                    this.addRange(a.fromPoints(b, b));
                    this.addRange(a.fromPoints(c, c))
                } else {
                    var d = [], g = this.getLineRange(e, true);
                    g.start.column = b.start.column;
                    d.push(g);
                    for (e = e + 1; e < c; e++)d.push(this.getLineRange(e, true));
                    g = this.getLineRange(c, true);
                    g.end.column = b.end.column;
                    d.push(g);
                    d.forEach(this.addRange, this)
                }
            }
        };
        this.toggleBlockSelection = function () {
            if (this.rangeCount > 1) {
                var b = this.rangeList.ranges, c = b[b.length - 1], b = a.fromPoints(b[0].start, c.end);
                this.toSingleRange();
                this.setSelectionRange(b, c.cursor == c.start)
            } else {
                c = this.session.documentToScreenPosition(this.selectionLead);
                b = this.session.documentToScreenPosition(this.selectionAnchor);
                this.rectangularRangeBlock(c, b).forEach(this.addRange, this)
            }
        };
        this.rectangularRangeBlock = function (b, c, d) {
            var e = [], g = b.column < c.column;
            if (g)var f = b.column, h = c.column; else {
                f = c.column;
                h = b.column
            }
            var k = b.row < c.row;
            if (k)var j = b.row, b = c.row; else {
                j = c.row;
                b = b.row
            }
            f < 0 && (f = 0);
            j < 0 && (j = 0);
            for (j == b && (d = true); j <= b; j++) {
                c =
                    a.fromPoints(this.session.screenToDocumentPosition(j, f), this.session.screenToDocumentPosition(j, h));
                if (c.isEmpty()) {
                    if (l && c.end.row == l.row && c.end.column == l.column)break;
                    var l = c.end
                }
                c.cursor = g ? c.start : c.end;
                e.push(c)
            }
            k && e.reverse();
            if (!d) {
                for (d = e.length - 1; e[d].isEmpty() && d > 0;)d--;
                if (d > 0)for (var w = 0; e[w].isEmpty();)w++;
                for (; d >= w; d--)e[d].isEmpty() && e.splice(d, 1)
            }
            return e
        }
    }).call(d.prototype);
    (function () {
        this.updateSelectionMarkers = function () {
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        };
        this.addSelectionMarker = function (a) {
            a.cursor || (a.cursor = a.end);
            var b = this.getSelectionStyle();
            return a.marker = this.session.addMarker(a, "ace_selection", b), this.session.$selectionMarkers.push(a), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, a
        };
        this.removeSelectionMarker = function (a) {
            if (a.marker) {
                this.session.removeMarker(a.marker);
                a = this.session.$selectionMarkers.indexOf(a);
                a != -1 && this.session.$selectionMarkers.splice(a, 1);
                this.session.selectionMarkerCount = this.session.$selectionMarkers.length
            }
        };
        this.removeSelectionMarkers = function (a) {
            for (var b = this.session.$selectionMarkers, c = a.length; c--;) {
                var d = a[c];
                if (d.marker) {
                    this.session.removeMarker(d.marker);
                    d = b.indexOf(d);
                    d != -1 && b.splice(d, 1)
                }
            }
            this.session.selectionMarkerCount = b.length
        };
        this.$onAddRange = function (a) {
            this.addSelectionMarker(a.range);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        };
        this.$onRemoveRange = function (a) {
            this.removeSelectionMarkers(a.ranges);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        };
        this.$onMultiSelect =
            function () {
                if (!this.inMultiSelectMode) {
                    this.inMultiSelectMode = true;
                    this.setStyle("multiselect");
                    this.keyBinding.addKeyboardHandler(k.keyboardHandler);
                    this.commands.on("exec", this.$onMultiSelectExec);
                    this.renderer.updateCursor();
                    this.renderer.updateBackMarkers()
                }
            };
        this.$onSingleSelect = function () {
            if (!this.session.multiSelect.inVirtualMode) {
                this.inMultiSelectMode = false;
                this.unsetStyle("multiselect");
                this.keyBinding.removeKeyboardHandler(k.keyboardHandler);
                this.commands.removeEventListener("exec", this.$onMultiSelectExec);
                this.renderer.updateCursor();
                this.renderer.updateBackMarkers()
            }
        };
        this.$onMultiSelectExec = function (a) {
            var b = a.command, c = a.editor;
            if (c.multiSelect) {
                b.multiSelectAction ? b.multiSelectAction == "forEach" ? c.forEachSelection(b, a.args) : b.multiSelectAction == "single" ? (c.exitMultiSelectMode(), b.exec(c, a.args || {})) : b.multiSelectAction(c, a.args || {}) : (b.exec(c, a.args || {}), c.multiSelect.addRange(c.multiSelect.toOrientedRange()), c.multiSelect.mergeOverlappingRanges());
                a.preventDefault()
            }
        };
        this.forEachSelection = function (a, b) {
            if (!this.inVirtualSelectionMode) {
                var c = this.session, e = this.selection, g = e.rangeList, f = e._eventRegistry;
                e._eventRegistry = {};
                var h = new d(c);
                this.inVirtualSelectionMode = true;
                for (var k = g.ranges.length; k--;) {
                    h.fromOrientedRange(g.ranges[k]);
                    this.selection = c.selection = h;
                    a.exec(this, b || {});
                    h.toOrientedRange(g.ranges[k])
                }
                h.detach();
                this.selection = c.selection = e;
                this.inVirtualSelectionMode = false;
                e._eventRegistry = f;
                e.mergeOverlappingRanges();
                this.onCursorChange();
                this.onSelectionChange()
            }
        };
        this.exitMultiSelectMode =
            function () {
                this.inVirtualSelectionMode || this.multiSelect.toSingleRange()
            };
        this.getCopyText = function () {
            var a = "";
            if (this.inMultiSelectMode) {
                for (var b = this.multiSelect.rangeList.ranges, a = [], c = 0; c < b.length; c++)a.push(this.session.getTextRange(b[c]));
                a = a.join(this.session.getDocument().getNewLineCharacter())
            } else this.selection.isEmpty() || (a = this.session.getTextRange(this.getSelectionRange()));
            return a
        };
        this.onPaste = function (a) {
            if (!this.$readOnly) {
                this._emit("paste", a);
                if (!this.inMultiSelectMode)return this.insert(a);
                var b = a.split(/\r\n|\r|\n/), c = this.selection.rangeList.ranges;
                if (b.length > c.length || b.length <= 2 || !b[1])return this.commands.exec("insertstring", this, a);
                for (a = c.length; a--;) {
                    var d = c[a];
                    d.isEmpty() || this.session.remove(d);
                    this.session.insert(d.start, b[a])
                }
            }
        };
        this.findAll = function (a, b, c) {
            b = b || {};
            b.needle = a || b.needle;
            this.$search.set(b);
            a = this.$search.findAll(this.session);
            if (!a.length)return 0;
            this.$blockScrolling = this.$blockScrolling + 1;
            b = this.multiSelect;
            c || b.toSingleRange(a[0]);
            for (c = a.length; c--;)b.addRange(a[c],
                true);
            return this.$blockScrolling = this.$blockScrolling - 1, a.length
        };
        this.selectMoreLines = function (b, c) {
            var d = this.selection.toOrientedRange(), e = d.cursor == d.end, g = this.session.documentToScreenPosition(d.cursor);
            this.selection.$desiredColumn && (g.column = this.selection.$desiredColumn);
            var f = this.session.screenToDocumentPosition(g.row + b, g.column);
            if (d.isEmpty())h = f; else var h = this.session.documentToScreenPosition(e ? d.end : d.start), h = this.session.screenToDocumentPosition(h.row + b, h.column);
            if (e) {
                e = a.fromPoints(f,
                    h);
                e.cursor = e.start
            } else {
                e = a.fromPoints(h, f);
                e.cursor = e.end
            }
            e.desiredColumn = g.column;
            if (this.selection.inMultiSelectMode) {
                if (c)var k = d.cursor
            } else this.selection.addRange(d);
            this.selection.addRange(e);
            k && this.selection.substractPoint(k)
        };
        this.transposeSelections = function (a) {
            for (var b = this.session, c = b.multiSelect, d = c.ranges, e = d.length; e--;) {
                var g = d[e];
                if (g.isEmpty()) {
                    var f = b.getWordRange(g.start.row, g.start.column);
                    g.start.row = f.start.row;
                    g.start.column = f.start.column;
                    g.end.row = f.end.row;
                    g.end.column =
                        f.end.column
                }
            }
            c.mergeOverlappingRanges();
            c = [];
            for (e = d.length; e--;) {
                g = d[e];
                c.unshift(b.getTextRange(g))
            }
            a < 0 ? c.unshift(c.pop()) : c.push(c.shift());
            for (e = d.length; e--;) {
                g = d[e];
                f = g.clone();
                b.replace(g, c[e]);
                g.start.row = f.start.row;
                g.start.column = f.start.column
            }
        };
        this.selectMore = function (a, b) {
            var c = this.session, d = c.multiSelect.toOrientedRange();
            if (d.isEmpty()) {
                d = c.getWordRange(d.start.row, d.start.column);
                d.cursor = d.end;
                this.multiSelect.addRange(d)
            }
            var e = c.getTextRange(d);
            (c = (l.$options.wrap = true, l.$options.needle =
                e, l.$options.backwards = a == -1, l.find(c))) && (c.cursor = a == -1 ? c.start : c.end, this.multiSelect.addRange(c));
            b && this.multiSelect.substractPoint(d.cursor)
        };
        this.alignCursors = function () {
            var b = this.session, c = b.multiSelect, d = c.ranges;
            if (d.length) {
                var e = -1, f = d.filter(function (a) {
                    if (a.cursor.row == e)return true;
                    e = a.cursor.row
                });
                c.$onRemoveRange(f);
                var h = 0, k = Infinity, j = d.map(function (a) {
                    var a = a.cursor, c = b.getLine(a.row).substr(a.column).search(/\S/g);
                    return c == -1 && (c = 0), a.column > h && (h = a.column), c < k && (k = c), c
                });
                d.forEach(function (c, d) {
                    var e = c.cursor, f = h - e.column, l = j[d] - k;
                    f > l ? b.insert(e, g.stringRepeat(" ", f - l)) : b.remove(new a(e.row, e.column, e.row, e.column - f + l));
                    c.start.column = c.end.column = h;
                    c.start.row = c.end.row = e.row;
                    c.cursor = c.end
                });
                c.fromOrientedRange(d[0]);
                this.renderer.updateCursor();
                this.renderer.updateBackMarkers()
            } else {
                c = this.selection.getRange();
                d = c.start.row;
                f = this.session.doc.removeLines(d, c.end.row);
                f = this.$reAlignText(f);
                this.session.doc.insertLines(d, f);
                c.start.column = 0;
                c.end.column = f[f.length - 1].length;
                this.selection.setRange(c)
            }
        };
        this.$reAlignText = function (a) {
            function b(a) {
                return a[2] ? Array(f + 1).join(" ") + a[2] + Array(h - a[2].length + k + 1).join(" ") + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
            }

            function c(a) {
                return a[2] ? Array(f + h - a[2].length + 1).join(" ") + a[2] + Array(k + 1).join(" ") + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
            }

            function d(a) {
                return a[2] ? Array(f + 1).join(" ") + a[2] + Array(k + 1).join(" ") + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
            }

            var e = true, g = true, f, h, k;
            return a.map(function (a) {
                var b = a.match(/(\s*)(.*?)(\s*)([=:].*)/);
                return b ? f == null ? (f =
                    b[1].length, h = b[2].length, k = b[3].length, b) : (f + h + k != b[1].length + b[2].length + b[3].length && (g = false), f != b[1].length && (e = false), f > b[1].length && (f = b[1].length), h < b[2].length && (h = b[2].length), k > b[3].length && (k = b[3].length), b) : [a]
            }).map(e ? g ? c : b : d)
        }
    }).call(j("./editor").Editor.prototype);
    h.onSessionChange = function (a) {
        var b = a.session;
        b.multiSelect || (b.$selectionMarkers = [], b.selection.$initRangeList(), b.multiSelect = b.selection);
        this.multiSelect = b.multiSelect;
        (a = a.oldSession) && (a.multiSelect && a.multiSelect.editor ==
            this && (a.multiSelect.editor = null), b.multiSelect.removeEventListener("addRange", this.$onAddRange), b.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), b.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), b.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect));
        b.multiSelect.on("addRange", this.$onAddRange);
        b.multiSelect.on("removeRange", this.$onRemoveRange);
        b.multiSelect.on("multiSelect", this.$onMultiSelect);
        b.multiSelect.on("singleSelect", this.$onSingleSelect);
        this.inMultiSelectMode != b.selection.inMultiSelectMode && (b.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
    };
    h.MultiSelect = function (a) {
        a.$onAddRange = a.$onAddRange.bind(a);
        a.$onRemoveRange = a.$onRemoveRange.bind(a);
        a.$onMultiSelect = a.$onMultiSelect.bind(a);
        a.$onSingleSelect = a.$onSingleSelect.bind(a);
        h.onSessionChange.call(a, a);
        a.on("changeSession", h.onSessionChange.bind(a));
        a.on("mousedown", c);
        a.commands.addCommands(k.defaultCommands);
        f(a)
    }
});
define("ace/range_list", ["require", "exports", "module"], function (j, h) {
    var f = function () {
        this.ranges = []
    };
    (function () {
        this.comparePoints = function (e, a) {
            return e.row - a.row || e.column - a.column
        };
        this.pointIndex = function (e, a) {
            for (var d = this.ranges, c = a || 0; c < d.length; c++) {
                var b = d[c], g = this.comparePoints(e, b.end);
                if (!(0 < g))return 0 == g ? c : (g = this.comparePoints(e, b.start), 0 <= g ? c : -c - 1)
            }
            return-c - 1
        };
        this.add = function (e) {
            var a = this.pointIndex(e.start);
            0 > a && (a = -a - 1);
            var d = this.pointIndex(e.end, a);
            return 0 > d ? d = -d - 1 : d++,
                this.ranges.splice(a, d - a, e)
        };
        this.addList = function (e) {
            for (var a = [], d = e.length; d--;)a.push.call(a, this.add(e[d]));
            return a
        };
        this.substractPoint = function (e) {
            e = this.pointIndex(e);
            if (0 <= e)return this.ranges.splice(e, 1)
        };
        this.merge = function () {
            for (var e = [], a = this.ranges, d = a[0], c, b = 1; b < a.length; b++) {
                c = d;
                var d = a[b], g = this.comparePoints(c.end, d.start);
                !(0 > g) && !(0 == g && !c.isEmpty() && !d.isEmpty()) && (0 > this.comparePoints(c.end, d.end) && (c.end.row = d.end.row, c.end.column = d.end.column), a.splice(b, 1), e.push(d), d = c,
                    b--)
            }
            return e
        };
        this.contains = function (e, a) {
            return 0 <= this.pointIndex({row: e, column: a})
        };
        this.containsPoint = function (e) {
            return 0 <= this.pointIndex(e)
        };
        this.rangeAtPoint = function (e) {
            e = this.pointIndex(e);
            if (0 <= e)return this.ranges[e]
        };
        this.clipRows = function (e, a) {
            var d = this.ranges;
            if (d[0].start.row > a || d[d.length - 1].start.row < e)return[];
            var c = this.pointIndex({row: e, column: 0});
            0 > c && (c = -c - 1);
            var b = this.pointIndex({row: a, column: 0}, c);
            0 > b && (b = -b - 1);
            for (var g = []; c < b; c++)g.push(d[c]);
            return g
        };
        this.removeAll =
            function () {
                return this.ranges.splice(0, this.ranges.length)
            };
        this.attach = function (e) {
            this.session && this.detach();
            this.session = e;
            this.onChange = this.$onChange.bind(this);
            this.session.on("change", this.onChange)
        };
        this.detach = function () {
            this.session && (this.session.removeListener("change", this.onChange), this.session = null)
        };
        this.$onChange = function (e) {
            var a = e.data.range;
            if ("i" == e.data.action[0])var e = a.start, d = a.end; else d = a.start, e = a.end;
            for (var a = e.row, c = d.row - a, d = -e.column + d.column, b = this.ranges, g = 0, f =
                b.length; g < f; g++) {
                var h = b[g];
                if (!(h.end.row < a)) {
                    if (h.start.row > a)break;
                    h.start.row == a && h.start.column >= e.column && (h.start.column += d, h.start.row += c);
                    h.end.row == a && h.end.column >= e.column && (h.end.column += d, h.end.row += c)
                }
            }
            if (0 != c && g < f)for (; g < f; g++)h = b[g], h.start.row += c, h.end.row += c
        }
    }).call(f.prototype);
    h.RangeList = f
});
define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event"], function (j, h) {
    function f(a, d) {
        return a.row == d.row && a.column == d.column
    }

    var e = j("../lib/event");
    h.onMouseDown = function (a) {
        var d = a.domEvent, c = d.altKey, d = d.shiftKey, b = a.getAccelKey(), g = a.getButton();
        if (a.editor.inMultiSelectMode && 2 == g)a.editor.textInput.onContextMenu(a.domEvent); else if (!b && !c)0 == g && a.editor.inMultiSelectMode && a.editor.exitMultiSelectMode(); else {
            var h = a.editor, j = h.selection, i = h.inMultiSelectMode, m =
                a.getDocumentPosition(), p = j.getCursor(), p = a.inSelection() || j.isEmpty() && f(m, p), s = a.x, q = a.y, n = function (a) {
                s = a.clientX;
                q = a.clientY
            }, r = h.session, o = h.renderer.pixelToScreenCoordinates(s, q), v = o;
            if (b && !d && !c && 0 == g) {
                if (i || !p) {
                    if (!i) {
                        var u = j.toOrientedRange();
                        h.addSelectionMarker(u)
                    }
                    var w = j.rangeList.rangeAtPoint(m);
                    e.capture(h.container, function () {
                    }, function () {
                        var a = j.toOrientedRange();
                        w && a.isEmpty() && f(w.cursor, a.cursor) ? j.substractPoint(a.cursor) : (u && (h.removeSelectionMarker(u), j.addRange(u)), j.addRange(a))
                    })
                }
            } else if (!d &&
                c && 0 == g) {
                a.stop();
                i && !b ? j.toSingleRange() : !i && b && j.addRange();
                j.moveCursorToPosition(m);
                j.clearSelection();
                var t = [];
                e.capture(h.container, n, function () {
                    clearInterval(x);
                    h.removeSelectionMarkers(t);
                    for (var a = 0; a < t.length; a++)j.addRange(t[a])
                });
                var x = setInterval(function () {
                    var a = h.renderer.pixelToScreenCoordinates(s, q), b = r.screenToDocumentPosition(a.row, a.column);
                    if (!f(v, a) || !f(b, j.selectionLead))v = a, h.selection.moveCursorToPosition(b), h.selection.clearSelection(), h.renderer.scrollCursorIntoView(), h.removeSelectionMarkers(t),
                        t = j.rectangularRangeBlock(v, o), t.forEach(h.addSelectionMarker, h), h.updateSelectionMarkers()
                }, 20);
                return a.preventDefault()
            }
        }
    }
});
define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (j, h) {
    h.defaultCommands = [
        {name: "addCursorAbove", exec: function (e) {
            e.selectMoreLines(-1)
        }, bindKey: {win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up"}, readonly: !0},
        {name: "addCursorBelow", exec: function (e) {
            e.selectMoreLines(1)
        }, bindKey: {win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down"}, readonly: !0},
        {name: "addCursorAboveSkipCurrent", exec: function (e) {
            e.selectMoreLines(-1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up"},
            readonly: !0},
        {name: "addCursorBelowSkipCurrent", exec: function (e) {
            e.selectMoreLines(1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down"}, readonly: !0},
        {name: "selectMoreBefore", exec: function (e) {
            e.selectMore(-1)
        }, bindKey: {win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left"}, readonly: !0},
        {name: "selectMoreAfter", exec: function (e) {
            e.selectMore(1)
        }, bindKey: {win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right"}, readonly: !0},
        {name: "selectNextBefore", exec: function (e) {
            e.selectMore(-1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Left",
            mac: "Ctrl-Alt-Shift-Left"}, readonly: !0},
        {name: "selectNextAfter", exec: function (e) {
            e.selectMore(1, !0)
        }, bindKey: {win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right"}, readonly: !0},
        {name: "splitIntoLines", exec: function (e) {
            e.multiSelect.splitIntoLines()
        }, bindKey: {win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L"}, readonly: !0},
        {name: "alignCursors", exec: function (e) {
            e.alignCursors()
        }, bindKey: {win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A"}}
    ];
    h.multiSelectCommands = [
        {name: "singleSelection", bindKey: "esc", exec: function (e) {
            e.exitMultiSelectMode()
        },
            readonly: !0, isAvailable: function (e) {
            return e && e.inMultiSelectMode
        }}
    ];
    var f = j("../keyboard/hash_handler").HashHandler;
    h.keyboardHandler = new f(h.multiSelectCommands)
});
define("ace/worker/worker_client", "require exports module ace/lib/oop ace/lib/event_emitter ace/config".split(" "), function (j, h) {
    var f = j("../lib/oop"), e = j("../lib/event_emitter").EventEmitter, a = j("../config"), d = function (c, b, d) {
        this.changeListener = this.changeListener.bind(this);
        if (a.get("packaged"))this.$worker = new Worker(a.moduleUrl(b, "worker")); else {
            var e;
            typeof j.supports != "undefined" && j.supports.indexOf("ucjs2-pinf-0") >= 0 ? e = j.nameToUrl("ace/worker/worker_sourcemint") : (j.nameToUrl && !j.toUrl && (j.toUrl =
                j.nameToUrl), e = this.$normalizePath(j.toUrl("ace/worker/worker", null, "_")));
            this.$worker = new Worker(e);
            var f = {};
            for (e = 0; e < c.length; e++) {
                var h = c[e], m = this.$normalizePath(j.toUrl(h, null, "_").replace(/.js(\?.*)?$/, ""));
                f[h] = m
            }
        }
        this.$worker.postMessage({init: true, tlns: f, module: b, classname: d});
        this.callbackId = 1;
        this.callbacks = {};
        var p = this;
        this.$worker.onerror = function (a) {
            throw window.console && console.log && console.log(a), a;
        };
        this.$worker.onmessage = function (a) {
            a = a.data;
            switch (a.type) {
                case "log":
                    window.console &&
                        console.log && console.log(a.data);
                    break;
                case "event":
                    p._emit(a.name, {data: a.data});
                    break;
                case "call":
                    var b = p.callbacks[a.id];
                    b && (b(a.data), delete p.callbacks[a.id])
            }
        }
    };
    (function () {
        f.implement(this, e);
        this.$normalizePath = function (a) {
            return location.host ? (a = a.replace(/^[a-z]+:\/\/[^\/]+/, ""), a = location.protocol + "//" + location.host + (a.charAt(0) == "/" ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + a.replace(/^[\/]+/, ""), a) : a
        };
        this.terminate = function () {
            this._emit("terminate", {});
            this.$worker.terminate();
            this.$worker = null;
            this.$doc.removeEventListener("change", this.changeListener);
            this.$doc = null
        };
        this.send = function (a, b) {
            this.$worker.postMessage({command: a, args: b})
        };
        this.call = function (a, b, d) {
            if (d) {
                var e = this.callbackId++;
                this.callbacks[e] = d;
                b.push(e)
            }
            this.send(a, b)
        };
        this.emit = function (a, b) {
            try {
                this.$worker.postMessage({event: a, data: {data: b.data}})
            } catch (d) {
            }
        };
        this.attachToDocument = function (a) {
            this.$doc && this.terminate();
            this.$doc = a;
            this.call("setValue", [a.getValue()]);
            a.on("change", this.changeListener)
        };
        this.changeListener = function (a) {
            a.range = {start: a.data.range.start, end: a.data.range.end};
            this.emit("change", a)
        }
    }).call(d.prototype);
    h.WorkerClient = d
});
define("ace/keyboard/state_handler", ["require", "exports", "module"], function (j, h) {
    function f(e) {
        this.keymapping = this.$buildKeymappingRegex(e)
    }

    f.prototype = {$buildKeymappingRegex: function (e) {
        for (var a in e)this.$buildBindingsRegex(e[a]);
        return e
    }, $buildBindingsRegex: function (e) {
        e.forEach(function (a) {
            a.key ? a.key = RegExp("^" + a.key + "$") : Array.isArray(a.regex) ? ("key"in a || (a.key = RegExp("^" + a.regex[1] + "$")), a.regex = RegExp(a.regex.join("") + "$")) : a.regex && (a.regex = RegExp(a.regex + "$"))
        })
    }, $composeBuffer: function (e, a, d, c) {
        if (null == e.state || null == e.buffer)e.state = "start", e.buffer = "";
        var b = [];
        a & 1 && b.push("ctrl");
        a & 8 && b.push("command");
        a & 2 && b.push("option");
        a & 4 && b.push("shift");
        d && b.push(d);
        d = b.join("-");
        b = e.buffer + d;
        2 != a && (e.buffer = b);
        e = {bufferToUse: b, symbolicName: d};
        return c && (e.keyIdentifier = c.keyIdentifier), e
    }, $find: function (e, a, d, c, b, g) {
        var f = {};
        return this.keymapping[e.state].some(function (h) {
            var i;
            if (h.key && !h.key.test(d) || h.regex && !(i = h.regex.exec(a)) || h.match && !h.match(a, c, b, d, g))return!1;
            if (h.disallowMatches)for (var j =
                0; j < h.disallowMatches.length; j++)if (i[h.disallowMatches[j]])return!1;
            if (h.exec) {
                f.command = h.exec;
                if (h.params) {
                    var p;
                    f.args = {};
                    h.params.forEach(function (a) {
                        null != a.match && null != i ? p = i[a.match] || a.defaultValue : p = a.defaultValue;
                        "number" === a.type && (p = parseInt(p));
                        f.args[a.name] = p
                    })
                }
                e.buffer = ""
            }
            return h.then && (e.state = h.then, e.buffer = ""), null == f.command && (f.command = "null"), !0
        }), f.command ? f : (e.buffer = "", !1)
    }, handleKeyboard: function (e, a, d, c, b) {
        -1 == a && (a = 0);
        return 0 == a || "" != d && d != String.fromCharCode(0) ? (c =
            this.$composeBuffer(e, a, d, b), c = this.$find(e, c.bufferToUse, c.symbolicName, a, d, c.keyIdentifier), c) : null
    }};
    h.matchCharacterOnly = function (e, a, d) {
        return 0 == a ? !0 : 4 == a && 1 == d.length ? !0 : !1
    };
    h.StateHandler = f
});
define("ace/placeholder", "require exports module ace/range ace/lib/event_emitter ace/lib/oop".split(" "), function (j, h) {
    var f = j("./range").Range, e = j("./lib/event_emitter").EventEmitter, a = j("./lib/oop"), d = function (a, b, d, e, f, h) {
        var j = this;
        this.length = b;
        this.session = a;
        this.doc = a.getDocument();
        this.mainClass = f;
        this.othersClass = h;
        this.$onUpdate = this.onUpdate.bind(this);
        this.doc.on("change", this.$onUpdate);
        this.$others = e;
        this.$onCursorChange = function () {
            setTimeout(function () {
                j.onCursorChange()
            })
        };
        this.$pos =
            d;
        this.$undoStackDepth = (a.getUndoManager().$undoStack || a.getUndoManager().$undostack || {length: -1}).length;
        this.setup();
        a.selection.on("changeCursor", this.$onCursorChange)
    };
    (function () {
        a.implement(this, e);
        this.setup = function () {
            var a = this, b = this.doc, d = this.session, e = this.$pos;
            this.pos = b.createAnchor(e.row, e.column);
            this.markerId = d.addMarker(new f(e.row, e.column, e.row, e.column + this.length), this.mainClass, null, false);
            this.pos.on("change", function (b) {
                d.removeMarker(a.markerId);
                a.markerId = d.addMarker(new f(b.value.row,
                    b.value.column, b.value.row, b.value.column + a.length), a.mainClass, null, false)
            });
            this.others = [];
            this.$others.forEach(function (d) {
                d = b.createAnchor(d.row, d.column);
                a.others.push(d)
            });
            d.setUndoSelect(false)
        };
        this.showOtherMarkers = function () {
            if (!this.othersActive) {
                var a = this.session, b = this;
                this.othersActive = true;
                this.others.forEach(function (d) {
                    d.markerId = a.addMarker(new f(d.row, d.column, d.row, d.column + b.length), b.othersClass, null, false);
                    d.on("change", function (e) {
                        a.removeMarker(d.markerId);
                        d.markerId = a.addMarker(new f(e.value.row,
                            e.value.column, e.value.row, e.value.column + b.length), b.othersClass, null, false)
                    })
                })
            }
        };
        this.hideOtherMarkers = function () {
            if (this.othersActive) {
                this.othersActive = false;
                for (var a = 0; a < this.others.length; a++)this.session.removeMarker(this.others[a].markerId)
            }
        };
        this.onUpdate = function (a) {
            var a = a.data, b = a.range;
            if (b.start.row === b.end.row && b.start.row === this.pos.row && !this.$updating) {
                this.$updating = true;
                var d = a.action === "insertText" ? b.end.column - b.start.column : b.start.column - b.end.column;
                if (b.start.column >= this.pos.column &&
                    b.start.column <= this.pos.column + this.length + 1) {
                    var e = b.start.column - this.pos.column;
                    this.length = this.length + d;
                    if (!this.session.$fromUndo) {
                        if (a.action === "insertText")for (var h = this.others.length - 1; h >= 0; h--) {
                            var i = this.others[h], j = {row: i.row, column: i.column + e};
                            i.row === b.start.row && b.start.column < i.column && (j.column = j.column + d);
                            this.doc.insert(j, a.text)
                        } else if (a.action === "removeText")for (h = this.others.length - 1; h >= 0; h--) {
                            i = this.others[h];
                            j = {row: i.row, column: i.column + e};
                            i.row === b.start.row && b.start.column <
                                i.column && (j.column = j.column + d);
                            this.doc.remove(new f(j.row, j.column, j.row, j.column - d))
                        }
                        b.start.column === this.pos.column && a.action === "insertText" ? setTimeout(function () {
                            this.pos.setPosition(this.pos.row, this.pos.column - d);
                            for (var a = 0; a < this.others.length; a++) {
                                var c = this.others[a], e = c.row, f = c.column - d;
                                c.row === b.start.row && b.start.column < c.column && (f = f + d);
                                c.setPosition(e, f)
                            }
                        }.bind(this), 0) : b.start.column === this.pos.column && a.action === "removeText" && setTimeout(function () {
                            for (var a = 0; a < this.others.length; a++) {
                                var c =
                                    this.others[a];
                                c.row === b.start.row && b.start.column < c.column && c.setPosition(c.row, c.column - d)
                            }
                        }.bind(this), 0)
                    }
                    this.pos._emit("change", {value: this.pos});
                    for (h = 0; h < this.others.length; h++)this.others[h]._emit("change", {value: this.others[h]})
                }
                this.$updating = false
            }
        };
        this.onCursorChange = function (a) {
            if (!this.$updating) {
                var b = this.session.selection.getCursor();
                b.row === this.pos.row && b.column >= this.pos.column && b.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", a)) : (this.hideOtherMarkers(),
                    this._emit("cursorLeave", a))
            }
        };
        this.detach = function () {
            this.session.removeMarker(this.markerId);
            this.hideOtherMarkers();
            this.doc.removeEventListener("change", this.$onUpdate);
            this.session.selection.removeEventListener("changeCursor", this.$onCursorChange);
            this.pos.detach();
            for (var a = 0; a < this.others.length; a++)this.others[a].detach();
            this.session.setUndoSelect(true)
        };
        this.cancel = function () {
            if (this.$undoStackDepth === -1)throw Error("Canceling placeholders only supported with undo manager attached to session.");
            for (var a = this.session.getUndoManager(), b = (a.$undoStack || a.$undostack).length - this.$undoStackDepth, d = 0; d < b; d++)a.undo(true)
        }
    }).call(d.prototype);
    h.PlaceHolder = d
});
define("ace/theme/textmate", ["require", "exports", "module", "text!ace/theme/textmate.css", "ace/lib/dom"], function (j, h) {
    h.isDark = !1;
    h.cssClass = "ace-tm";
    h.cssText = j("text!./textmate.css");
    j("../lib/dom").importCssString(h.cssText, h.cssClass)
});
define("text!ace/theme/textmate.css", [], '.ace-tm .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tm .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tm .ace_gutter {\n  background: #f0f0f0;\n  color: #333;\n}\n\n.ace-tm .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_fold {\n    background-color: #6B72E6;\n}\n\n.ace-tm .ace_scroller {\n  background-color: #FFFFFF;\n}\n\n.ace-tm .ace_cursor {\n  border-left: 2px solid black;\n}\n\n.ace-tm .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid black;\n}\n        \n.ace-tm .ace_line .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_line .ace_storage,\n.ace-tm .ace_line .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_line .ace_constant {\n  color: rgb(197, 6, 11);\n}\n\n.ace-tm .ace_line .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_invalid {\n  background-color: rgba(255, 0, 0, 0.1);\n  color: red;\n}\n\n.ace-tm .ace_line .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_line .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_support.ace_type,\n.ace-tm .ace_line .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_line .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_line .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_line .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_line .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_line .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_line .ace_xml_pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_entity.ace_name.ace_function {\n  color: #0000A2;\n}\n\n\n.ace-tm .ace_markup.ace_heading {\n  color: rgb(12, 7, 255);\n}\n\n.ace-tm .ace_markup.ace_list {\n  color:rgb(185, 6, 144);\n}\n\n.ace-tm .ace_meta.ace_tag {\n  color:rgb(0, 22, 142);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n.ace-tm.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px white;\n  border-radius: 2px;\n}\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active_line {\n  background: rgba(0, 0, 0, 0.07);\n}\n\n.ace-tm .ace_gutter_active_line {\n    background-color : #dcdcdc;\n}\n\n.ace-tm .ace_marker-layer .ace_selected_word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_indent-guide {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\n}\n');
(function () {
    window.require(["ace/ace"], function (j) {
        j && j.config.init();
        window.ace || (window.ace = {});
        for (var h in j)j.hasOwnProperty(h) && (ace[h] = j[h])
    })
})();