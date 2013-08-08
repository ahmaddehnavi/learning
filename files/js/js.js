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
            onUnLargeDesktop: function () {
            },
            onUnDesktop: function () {
            },
            onUnTablet: function () {
            },
            onUnPhone: function () {
            },
            onUnMiniPhone: function () {
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
                settings.onUnDesktop();
                settings.onUnTablet();
                settings.onUnPhone();
                settings.onUnMiniPhone();
            }
            else if ($window.width() > 979) {
                $tag.removeClass('large-desktop no-desktop tablet phone mini-phone').addClass('no-large-desktop desktop no-tablet no-phone no-mini-phone');
                settings.onUnLargeDesktop();
                settings.onDesktop();
                settings.onUnTablet();
                settings.onUnPhone();
                settings.onUnMiniPhone();
            }
            else if ($window.width() > 767) {
                $tag.removeClass('large-desktop desktop no-tablet phone mini-phone').addClass('no-large-desktop no-desktop tablet no-phone no-mini-phone');
                settings.onUnLargeDesktop();
                settings.onUnDesktop();
                settings.onTablet();
                settings.onUnPhone();
                settings.onUnMiniPhone();
            }
            else if ($window.width() > 480) {
                $tag.removeClass('large-desktop desktop tablet no-phone mini-phone').addClass('no-large-desktop no-desktop no-tablet phone no-mini-phone');
                settings.onUnLargeDesktop();
                settings.onUnDesktop();
                settings.onUnTablet();
                settings.onPhone();
                settings.onUnMiniPhone();
            } else {
                $tag.removeClass('large-desktop desktop tablet phone no-mini-phone').addClass('no-large-desktop no-desktop no-tablet no-phone mini-phone');
                settings.onUnLargeDesktop();
                settings.onUnDesktop();
                settings.onUnTablet();
                settings.onUnPhone();
                settings.onMiniPhone();
            }
        }

    }

}(jQuery));


(function ($) {

    $.fn.collapse = function (options) {

        // Establish our default settings
        var settings = $.extend({
            onCollapse: function () {
            },
            onUnCollapse: function () {
            }
        }, options);

        return this.each(function () {
            var $this = $(this);
            var $collapseTarget = $($this.attr('collapse-target'));
            $this.click(function () {

                if ($this.hasClass('collapse-on')) {
                    $this.toggleClass('collapse-on').addClass('collapse-off');
                    settings.onUnCollapse();
                } else if ($this.hasClass('collapse-off')) {
                    $this.removeClass('collapse-off').addClass('collapse-on');
                    settings.onCollapse();
                }
                else {
                    $this.addClass('collapse-on');
                    settings.onCollapse();
                    $collapseTarget.removeClass('collapse');
                }
                $collapseTarget.toggleClass('collapse');
            });
        });

    }

}(jQuery));
