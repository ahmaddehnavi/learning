﻿define("ace/mode/ruby", "require exports module ace/lib/oop ace/mode/text ace/tokenizer ace/mode/ruby_highlight_rules ace/mode/matching_brace_outdent ace/range".split(" "), function (a, i) {
    var j = a("../lib/oop"), f = a("./text").Mode, c = a("../tokenizer").Tokenizer, b = a("./ruby_highlight_rules").RubyHighlightRules, g = a("./matching_brace_outdent").MatchingBraceOutdent, e = a("../range").Range, l = function () {
        this.$tokenizer = new c((new b).getRules());
        this.$outdent = new g
    };
    j.inherits(l, f);
    (function () {
        this.toggleCommentLines =
            function (c, k, h, a) {
                for (var d = true, c = /^(\s*)#/, b = h; b <= a; b++)if (!c.test(k.getLine(b))) {
                    d = false;
                    break
                }
                if (d) {
                    d = new e(0, 0, 0, 0);
                    for (b = h; b <= a; b++) {
                        h = k.getLine(b).match(c);
                        d.start.row = b;
                        d.end.row = b;
                        d.end.column = h[0].length;
                        k.replace(d, h[1])
                    }
                } else k.indentRows(h, a, "#")
            };
        this.getNextLineIndent = function (c, b, a) {
            var g = this.$getIndent(b), d = this.$tokenizer.getLineTokens(b, c).tokens;
            if (d.length && d[d.length - 1].type == "comment")return g;
            c == "start" && b.match(/^.*[\{\(\[]\s*$/) && (g = g + a);
            return g
        };
        this.checkOutdent = function (b, c, a) {
            return this.$outdent.checkOutdent(c, a)
        };
        this.autoOutdent = function (c, b, a) {
            this.$outdent.autoOutdent(b, a)
        }
    }).call(l.prototype);
    i.Mode = l
});
define("ace/mode/ruby_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, i) {
    var j = a("../lib/oop"), f = a("./text_highlight_rules").TextHighlightRules, c = function () {
        this.$rules = {start: [
            {token: "comment", regex: "#.*$"},
            {token: "comment", merge: !0, regex: "^=begin$", next: "comment"},
            {token: "string.regexp", regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},
            {token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
            {token: "string",
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
            {token: "string", regex: "[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"},
            {token: "text", regex: "::"},
            {token: "variable.instancce", regex: "@{1,2}(?:[a-zA-Z_]|d)+"},
            {token: "variable.class", regex: "[A-Z](?:[a-zA-Z_]|d)+"},
            {token: "string", regex: "[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"},
            {token: "constant.numeric", regex: "0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"},
            {token: "constant.numeric", regex: "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token: "constant.language.boolean", regex: "(?:true|false)\\b"},
            {token: this.createKeywordMapper({keyword: "alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield", "constant.language": "true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING", "variable.language": "$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|$!|root_url|flash|session|cookies|params|request|response|logger|self",
                "support.function": "abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|gsub!|get_via_redirect|h|host!|https?|https!|include|Integer|lambda|link_to|link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|validates_inclusion_of|validates_numericality_of|validates_with|validates_each|authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|translate|localize|extract_locale_from_tld|t|l|caches_page|expire_page|caches_action|expire_action|cache|expire_fragment|expire_cache_for|observe|cache_sweeper|has_many|has_one|belongs_to|has_and_belongs_to_many",
                "invalid.deprecated": "debugger"}, "identifier"), regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token: "keyword.operator", regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},
            {token: "paren.lparen", regex: "[[({]"},
            {token: "paren.rparen", regex: "[\\])}]"},
            {token: "text", regex: "\\s+"}
        ], comment: [
            {token: "comment", regex: "^=end$", next: "start"},
            {token: "comment", merge: !0, regex: ".+"}
        ]}
    };
    j.inherits(c,
        f);
    i.RubyHighlightRules = c
});
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, i) {
    var j = a("../range").Range, f = function () {
    };
    (function () {
        this.checkOutdent = function (c, b) {
            return/^\s+$/.test(c) ? /^\s*\}/.test(b) : !1
        };
        this.autoOutdent = function (c, b) {
            var a = c.getLine(b).match(/^(\s*\})/);
            if (!a)return 0;
            var a = a[1].length, e = c.findMatchingBracket({row: b, column: a});
            if (!e || e.row == b)return 0;
            e = this.$getIndent(c.getLine(e.row));
            c.replace(new j(b, 0, b, a - 1), e)
        };
        this.$getIndent = function (a) {
            return(a = a.match(/^(\s+)/)) ?
                a[1] : ""
        }
    }).call(f.prototype);
    i.MatchingBraceOutdent = f
});