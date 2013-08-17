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
