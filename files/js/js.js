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

//(function ($) {
//
//    $.fn.responsive = function () {
//        var ht=document.getElementsByName('HTML').item(0);
//        var init=function(){
//            alert("salam");
//        }
//
//        $(window).onload(init());
//        $(window).resize(function() {
//            alert("salam");
//        });
//    }
//
//}(jQuery));