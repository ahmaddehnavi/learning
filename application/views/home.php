<?=BASEPATH?>
<!DOCTYPE HTML>
<html lang = "en-US">
<head>
    <meta charset = "UTF-8"/>
    <title>title</title>
    <link rel = "stylesheet" type = "text/css" href = "<?=base_url('files/css/reset.css')?>"/>
    <link rel = "stylesheet" type = "text/css" href = "<?=base_url('files/css/home.css')?>"/>
    <link rel = "stylesheet" type = "text/css" href = "<?=base_url('files/css/train_slideshow.css')?>"/>
    <script type = "text/javascript" src = "<?=base_url('files/js/html5shiv.js')?>"></script>
    <script type = "text/javascript" src = "<?=base_url('files/js/slider.js')?>"></script>
    <script type = "text/javascript" src = "<?=base_url('files/js/scroll.js')?>"></script>
 </head>
<body>
<a name = "home">.</a>
<header>
    <div class = "container">
        <div class = "user">
            <?php
            if(empty($user_id))
                echo anchor('/auth/login/','sign in');
            else
                echo anchor('/auth/logout/',"logout ( $username )");
            ?>
        </div>
        <div class = "logo"></div>
        <nav>
            <menu>
                <li class = "active" id = "pre_active"><a href = "#home" onclick = "return pageScroll(this);">get
                        start</a></li>
                <li><a href = "#slides" onclick = "return pageScroll(this);">screen shot</a></li>
                <li><a href = "#footer" onclick = "return pageScroll(this);">about us</a></li>
                <li><a href = "#">faq</a></li>
                <div class = "badboy"></div>
            </menu>
        </nav>
        <div class = "badboy"></div>
    </div>
</header>

<div class = "content2">
    <div class = "container">
        <a name = "getstart">.</a>

        <h2 class = "center">A Cloud-Enabled Desktop App for All Your Email</h2>
        <h4>Unified Inbox, Relevance Sorting, Smart Views</h4>
        <h4>Unified Inbox, Relevance Sorting</h4>
        <a class = "button center">get started</a>
    </div>
</div>


<div class = "content">
    <div class = "container">
        <a name = "slides">.</a>

        <div class = "slideshow" onmouseover = "pauseSlider()" onmouseout = "resumeSlider()">
            <ul class = "images" id = "slideshow">
                <li style = "background-image:url('<?=FILES_IMG_PATH?>slideshow/1.jpg')"></li>
                <li style = "background-image:url('<?=FILES_IMG_PATH?>slideshow/2.jpg')"></li>
                <li style = "background-image:url('<?=FILES_IMG_PATH?>slideshow/3.jpg')"></li>
                <li style = "background-image:url('<?=FILES_IMG_PATH?>slideshow/4.jpg')"></li>
                <li style = "background-image:url('<?=FILES_IMG_PATH?>slideshow/5.jpg')"></li>
            </ul>
            <ul class = "bullets">
                <script>
                    for (var i = 0; i < 5; i++) {
                        document.write("<li id='bullet" + i + "' onclick='show(" + i + ",this);'></li>");
                    }
                </script>
            </ul>
        </div>

    </div>
</div>

<footer>
    <div class = "container">
        <a name = "footer"></a>

        <div class = "column left">
            column1
        </div>
        <div class = "column left">
            column2
        </div>
        <div class = "column left">
            column3
        </div>
        <div class = "badboy"></div>
    </div>
</footer>

<script type = "text/javascript">
    startSlider();
</script>
</body>
</html>