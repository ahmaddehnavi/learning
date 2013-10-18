// If this file exists in theme directory, it will be loaded in <head> section

var imgLoading = new Image();
imgLoading.src = 'themes/oxygen/img/loading.gif';

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
//        var preClass = "";

        var $tag = $(this);
        $window.load(function () {
            checkWidth($tag);
        });

        $window.resize(function () {
            checkWidth($tag);
        });
        return $(this);

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


$(document).ready(function () {
    $('html').responsive();
    $('#upload_btn').click(function(){
//     document.getElementsByName()
    $('#upload input[type=file]').click();
//        alert("sd");
    });
});
