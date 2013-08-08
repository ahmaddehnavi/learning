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
            }
        }, options);

        var $window = jQuery(window);
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
                $tag.removeClass('desktop tablet phone mini-phone').addClass('large-desktop');
                settings.onLargeDesktop();
            }
            else if ($window.width() > 979) {
                $tag.removeClass('large-desktop tablet phone mini-phone').addClass('desktop');
                settings.onDesktop();
            }
            else if ($window.width() > 767) {
                $tag.removeClass('large-desktop desktop phone mini-phone').addClass('tablet');
                settings.onTablet();
            }
            else if ($window.width() > 480) {
                $tag.removeClass('large-desktop desktop tablet mini-phone').addClass('phone');
                settings.onPhone();
            } else {
                $tag.removeClass('large-desktop desktop tablet phone').addClass('mini-phone');
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
