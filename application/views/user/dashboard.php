<!doctype html>
<html lang="en-US">
<head>

    <meta charset="UTF-8"/>
    <meta name="author" content=""/>
    <meta name='keywords' content=''/>
    <meta name='description' content=''/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="HandheldFriendly" content="true"/>
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"/>

    <!--ss[if lt IE 9]>-->
    <script src="<?= FILES_JS_PATH ?>/base/html5shiv.js"></script>
    <script src="<?= FILES_JS_PATH ?>/base/css3-mediaqueries.js"></script>
    <!ss[end if]-->

    <link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/base/global.css"/>
    <!-- ############################################################################ -->

    <link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/style1.css"/>

</head>

<body>
<div id="container">

    <nav>
        <menu>
            <li><a href="#">item 1</a></li>
            <li class="active"><a href="#">item 2</a></li>
            <li><a href="#">item 3</a></li>
            <li><a href="#">item 4</a></li>
            <div class="badboy"></div>
        </menu>
    </nav>
    <aside id="sidebar">
        <header><?php echo $this->tank_auth->get_username(); ?>&nbsp;</header>
        <menu>
            <h2>academy :</h2>
            <li class="icon-exercise"><?php echo anchor("academy/exercises", "exercises") ?></li>
            <li class="icon-class"><?php echo anchor("academy/classes", "classes") ?></li>
            <li class="icon-exam"><?php echo anchor("academy/exames", "exames") ?></li>
            <h2>user :</h2>
            <li class="icon-dashboard active"><?php echo anchor("user/dashboard", "dashboard") ?></li>
            <li class="icon-message"><?php echo anchor("user/messages", "messages<sup>5</sup>") ?></li>
            <li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
            <li class="icon-logout"><?php echo anchor("auth/logout", "logout") ?></li>
        </menu>
    </aside>
    <div id="content">
        <header>
            <ul id="collapse-btn" collapse-target="#sidebar">
                <li></li>
                <li></li>
                <li></li>
            </ul>
            panda academy
        </header>
        <main>
            <section id="content-head">
                <section class="top">
                    <ul>
                        <li><?php echo anchor('home', 'home')?> </a>&nbsp;&gt;&nbsp;</li>
                        <li><?php echo anchor('user/home', 'user')?> </a>&nbsp;&gt;&nbsp;</li>
                        <li>dashboard</li>
                    </ul>
                </section>

                <section class="bottom">
                    <h2>dashboard</h2>

                    <div>Sample description for classes page</div>
                </section>
            </section>
            <section id="content-body">
                <section>
                    <header>header header header</header>
                    <article>
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article
                    </article>
                </section>
                <section>
                    <header>header header header</header>
                    <article>
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article
                    </article>
                </section>
                <section>
                    <header>header header header</header>
                    <article>
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article
                    </article>
                </section>
                <section>
                    <header>header header header</header>
                    <article>
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article
                    </article>
                </section>
                <section>
                    <header>header header header</header>
                    <article>
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article article article article
                        article article article article article article article article article
                    </article>
                </section>
            </section>
        </main>
    </div>
    <div class="badboy"></div>
    <!--    <footer id="footer">footer</footer>-->
</div>


<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>

<script src="<?= FILES_JS_PATH ?>/base/jquery-1.9.0.js"></script>
<!-- ############################################################################ -->

<script type="text/javascript" src="<?= FILES_JS_PATH ?>/js.js"></script>

<script type="text/javascript">

    $('html').responsive();

    var opt2 = {
        onCollapse: function () {
            $('#sidebar').animate({width: "0"}, 1000);
            $('#content').animate({paddingLeft: '0'}, 1000);
        },
        onUnCollapse: function () {
            $('#sidebar').animate({width: "280px"}, 1000);
            $('#content').animate({paddingLeft: '280px'}, 1000);
        }
    }
    $('#collapse-btn').collapse(opt2);
</script>
</body>
</html>