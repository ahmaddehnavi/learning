//(function ($) {
//
//    $.fn.responsive = function (options) {
//
//        // Establish our default settings
//        var settings = $.extend({
//            onMobile: function(){},
//            onDesktop: function(){}
//        }, options);
//
//        return this.each(function () {
//
//            $(this).text(settings.text);
//
//            if (settings.color) {
//                $(this).css('color', settings.color);
//            }
//
//            if (settings.fontStyle) {
//                $(this).css('font-style', settings.fontStyle);
//            }
//        });
//
//    }
//
//}(jQuery));

(function ($) {

    $.fn.responsive = function (options) {

        // Establish our default settings
        var settings = $.extend({
            onLargeDesktop: function () {
            },
            onDesktop: function () {
            },
            onTablet: function () {
            },
            onPhone: function () {
            },
            onMiniPhone: function () {
            },
            onNoLargeDesktop: function () {
            },
            onNoDesktop: function () {
            },
            onNoTablet: function () {
            },
            onNoPhone: function () {
            },
            onNoMiniPhone: function () {
            }
        }, options);

        var $window = jQuery(window);
        var preClass = "";
//        return this.each(function () {

        var $tag = $(this);
        $window.load(function () {
            checkWidth($tag);
        });

        $window.resize(function () {
            checkWidth($tag);
        });
        return $(this);
//        });


        function checkWidth($tag) {
            if ($window.width() > 1200) {
                $tag.removeClass('no-large-desktop desktop tablet phone mini-phone').addClass('large-desktop no-desktop no-tablet no-phone no-mini-phone');
                settings.onLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 979) {
                $tag.removeClass('large-desktop no-desktop tablet phone mini-phone').addClass('no-large-desktop desktop no-tablet no-phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 767) {
                $tag.removeClass('large-desktop desktop no-tablet phone mini-phone').addClass('no-large-desktop no-desktop tablet no-phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 480) {
                $tag.removeClass('large-desktop desktop tablet no-phone mini-phone').addClass('no-large-desktop no-desktop no-tablet phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onPhone();
                settings.onNoMiniPhone();
            } else {
                $tag.removeClass('large-desktop desktop tablet phone no-mini-phone').addClass('no-large-desktop no-desktop no-tablet no-phone mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onMiniPhone();
            }
        }

    }

}(jQuery));


(function ($) {

    $.fn.responsive = function (options) {

        // Establish our default settings
        var settings = $.extend({
            onLargeDesktop: function () {
            },
            onDesktop: function () {
            },
            onTablet: function () {
            },
            onPhone: function () {
            },
            onMiniPhone: function () {
            },
            onNoLargeDesktop: function () {
            },
            onNoDesktop: function () {
            },
            onNoTablet: function () {
            },
            onNoPhone: function () {
            },
            onNoMiniPhone: function () {
            }
        }, options);

        var $window = jQuery(window);
        var preClass = "";
//        return this.each(function () {

        var $tag = $(this);
        $window.load(function () {
            checkWidth($tag);
        });

        $window.resize(function () {
            checkWidth($tag);
        });
        return $(this);
//        });


        function checkWidth($tag) {
            if ($window.width() > 1200) {
                $tag.removeClass('no-large-desktop desktop tablet phone mini-phone').addClass('large-desktop no-desktop no-tablet no-phone no-mini-phone');
                settings.onLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 979) {
                $tag.removeClass('large-desktop no-desktop tablet phone mini-phone').addClass('no-large-desktop desktop no-tablet no-phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 767) {
                $tag.removeClass('large-desktop desktop no-tablet phone mini-phone').addClass('no-large-desktop no-desktop tablet no-phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onTablet();
                settings.onNoPhone();
                settings.onNoMiniPhone();
            }
            else if ($window.width() > 480) {
                $tag.removeClass('large-desktop desktop tablet no-phone mini-phone').addClass('no-large-desktop no-desktop no-tablet phone no-mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onPhone();
                settings.onNoMiniPhone();
            } else {
                $tag.removeClass('large-desktop desktop tablet phone no-mini-phone').addClass('no-large-desktop no-desktop no-tablet no-phone mini-phone');
                settings.onNoLargeDesktop();
                settings.onNoDesktop();
                settings.onNoTablet();
                settings.onNoPhone();
                settings.onMiniPhone();
            }
        }

    }

}(jQuery));


(function ($) {

    $.fn.toggleButton = function (options) {

        // Establish our default settings
        var settings = $.extend({
            onToggleOn: function () {
            },
            onToggleOff: function () {
            }
        }, options);

        return this.each(function () {
            var $this = $(this);
            $this.click(function () {

                if ($this.hasClass('toggle-on')) {
                    $this.removeClass('toggle-on').addClass('toggle-off');
                    settings.onToggleOff();
                } else if ($this.hasClass('toggle-off')) {
                    $this.removeClass('toggle-off').addClass('toggle-on');
                    settings.onToggleOn();
                }
                else {
                    $this.addClass('toggle-on');
                    settings.onToggleOn();
                }
            });
        });

    }

}(jQuery));

/*(function ($) {

 $.fn.placeholder = function (options) {

 var settings = $.extend({
 placeholderClass: 'placeholder'
 }, options);

 //        $('form').submit(removePlaceholder());
 //        function removePlaceholder(){
 //            this.each(function () {
 //                var $this = $(this);
 //                var $placeholder = $this.attr('placeholder');
 //                if ($this.val() == $placeholder) {
 //                        $this.val('');
 //                }
 //             });
 //        }

 return this.each(function () {
 var $this = $(this);
 var $placeholder = $this.attr('placeholder');
 if ($this.val() == '') {
 $this.val($placeholder).addClass(settings.placeholderClass);
 }

 $this.focus(function () {
 if ($this.val() == $placeholder) {
 $this.val('').removeClass(settings.placeholderClass);
 }
 });
 $this.blur(function () {
 if ($this.val() == '') {
 $this.val($placeholder).addClass(settings.placeholderClass);
 }
 });
 })
 }

 }(jQuery));
 */

(function (window, document, $) {

    var isInputSupported = 'placeholder' in document.createElement('input');
    var isTextareaSupported = 'placeholder' in document.createElement('textarea');
    var prototype = $.fn;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;

    if (isInputSupported && isTextareaSupported) {

        placeholder = prototype.placeholder = function () {
            return this;
        };

        placeholder.input = placeholder.textarea = true;

    } else {

        placeholder = prototype.placeholder = function () {
            var $this = this;
            $this
                .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.placeholder')
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
            return $this;
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function (element) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
            },
            'set': function (element, value) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value = value;
                }

                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value == '') {
                    element.value = value;
                    // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                    if (element != document.activeElement) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass('placeholder')) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }
        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function () {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function () {
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                setTimeout(function () {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function () {
            $('.placeholder').each(function () {
                this.value = '';
            });
        });

    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function (i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this;
        var $input = $(input);
        if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass('placeholder');
                input == document.activeElement && input.select();
            }
        }
    }

    function setPlaceholder() {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({ 'type': 'text' });
                    } catch (e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }
                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                // Note: `$input[0] != input` now!
            }
            $input.addClass('placeholder');
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass('placeholder');
        }
    }

}(this, document, jQuery));

$(document).ready(function () {
    var opt3;
    var opt1 = {
        onNoMiniPhone: function () {
            $('nav').animate({marginTop: "0"}, 1000);
//            opt3.onToggleOn();
        }
    }
    $('html').responsive(opt1);


    var opt2 = {
        onToggleOff: function () {

            $('#sidebar').animate({width: "0"}, 1000);
            $('#content').animate({paddingLeft: '0'}, 1000);
        },
        onToggleOn: function () {
            $('#sidebar').animate({width: '280px'}, 1000);
            $('#content').animate({paddingLeft: '280px'}, 1000);
        }
    }
    $('.btn-left').toggleButton(opt2);


    opt3 = {
        onToggleOn: function () {
            $('nav').animate({marginTop: "0"}, 1000);

        },
        onToggleOff: function () {
            $('nav').animate({marginTop: "-187px"}, 1000);
        }
    }
    $('.btn-top').toggleButton(opt3);

    $('input, textarea').placeholder();

    $window = $(window);
    $main = $('main');

    var fixSize = function () {
        if ($window.height() - 114 > $main.height()) {
            $main.height($window.height() - 114);
        }
    }
    $(window).resize(fixSize);
    fixSize();

});
