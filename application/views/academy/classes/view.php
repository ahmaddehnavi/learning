<?php $this->load->view('base/header', array('title' => $lesson_name)); ?>
<div id="container">

    <nav>
        <menu>
            <li><a href="#">item 1</a></li>
            <li class="active"><a href="#">item 2</a></li>
            <li><a href="#">item 3</a></li>
            <li><a href="#">item 4</a></li>
            <div class="badboy"></div>
        </menu>
        <ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </nav>
    <aside id="sidebar">
        <header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
        <ul class="collapse-btn btn-left toggle-on" collapse-target="#sidebar">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <menu>
            <h2>academy :</h2>
            <li class="icon-exercise"><?php echo anchor("academy/exercises", "exercises") ?></li>
            <li class="icon-class"><?php echo anchor("academy/classes", "classes") ?></li>
            <li class="icon-exam"><?php echo anchor("academy/exames", "exames") ?></li>
            <h2>user :</h2>
            <li class="icon-dashboard active"><?php echo anchor("user/dashboard", "dashboard") ?></li>
            <li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
            <li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
            <li class="icon-logout"><?php echo anchor("user/logout", "logout") ?></li>
        </menu>

        <div class="list">
            <menu>
                <ul>
                    <li>
                        <figure><img src="" alt=""/></figure>
                        <p></p>
                    </li>
                </ul>
            </menu>
        </div>
    </aside>
    <div id="content">
        <header>
            <ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
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
                        <li><?php echo anchor('academy/home', 'academy')?> </a>&nbsp;&gt;&nbsp;</li>
                        <li><?php echo anchor('academy/classes', 'classes')?> </a>&nbsp;&gt;&nbsp;</li>
                        <li><?=$lesson_name?></li>
                    </ul>
                </section>

                <section class="bottom">
                    <h2><?=$lesson_name?> :</h2>

                    <div> Professor : <?=$prof_name?> , <?=$next_exam_time?> to next exam</div>
                </section>
            </section>
            <section id="content-body">
                <!--				<section class="widget white">-->
                <!--					--><?//
                //					if ($is_prof)
                //						echo 'you are professor of this class.<br/>';
                //					echo $new_change;
                //					?>
                <!---->
                <!--				</section>-->

                <?php $user_id = $this->auth->get_user_id();
                foreach ($posts->result() as $post) {
                    ?>
                    <section class="widget" tabindex="1">
                        <section class="image">
                            <figure class="imgpost">
                                <img
                                    src="<?php echo FILES_USERS_PATH . '/' . $post->author_id . '/image/profile.jpg' ?>"
                                    alt="" width="50px" height="50px"/></figure>
                            <!--                            <p class='name'>-->
                            <?php //echo $post->author_name?><!--</p>-->
                        </section>
                        <section class='total' style="padding-top: 1px;">
                            <header class='widget_head'>

                                <p class='subject'><?php echo $post->subject ?></p>

                            </header>
                            <section class='widget_body'>
                                <div class="text">    <?php echo $post->body ?></div>
                                <p class='publish'><?php echo'2 hours ago' ?></p>
                            </section>

                            <?php if ($post->author_id==$user_id){  ?>
                            <footer class="widget_footer">
                                <div class="menu">
                                    <ul>
                                        <li><a href="#">delete </a></li>
                                        <li><a href="#">edit </a></li>
                                        <div class="badboy"></div>
                                    </ul>
                                </div>
                            </footer>
                            <?php } ?>
                        </section>
                    </section>
                <?php }?>
                <!--                <div class="badboy"></div>-->
                <section class="widget" style="width: inherit;">
                    <?php echo $pagination; ?>
                </section>
            </section>
        </main>
    </div>
    <div class="badboy"></div>
    <!--    <footer id="footer">footer</footer>-->
</div>