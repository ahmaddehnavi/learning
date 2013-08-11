<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>
<script src="<?= FILES_JS_PATH ?>/base/jquery-1.9.0.js"></script>
<!-- ############################################################################ -->

<script type="text/javascript" src="<?= FILES_JS_PATH ?>/js.js"></script>

<script type="text/javascript">
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
</script>
</body>
</html>