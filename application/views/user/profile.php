<?php $this->load->view('base/header'); ?>
    <div id="container" class="p-profile">

        <nav>
            <menu>
                <li><a href="#">home</a></li>
                <li class="active"><a href="#">academy</a></li>
                <li><a href="#">file management</a></li>
                <li><a href="#">social network</a></li>
                <div class="badboy"></div>
            </menu>
            <ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </nav>
        <aside id="sidebar">
            <header><?php echo 'full name' ?>&nbsp;</header>
            <ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <menu>
                <h2>user :</h2>
                <li class="icon-dashboard active"><?php echo anchor("user/dashboard", "dashboard") ?></li>
                <li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
                <li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
                <li class="icon-logout .top-line"><?php echo anchor("auth/logout", "logout") ?></li>
            </menu>

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
                            <li><?php echo anchor('user/home', 'user')?> </a>&nbsp;&gt;&nbsp;</li>
                            <li>profile</li>
                        </ul>
                    </section>

                    <section class="bottom">
                        <h2>profile</h2>

                        <div>Sample description for classes page</div>
                    </section>
                </section>
                <section id="content-body">
                    <section>
                        <header>update profile :</header>
                        <article>
                            <?php echo form_open('user/profile');?>
                            <div class="left">

                                <div class="row">
                                    <label for="full_name"> full name :</label>
                                    <input type="text" name="full_name"/>
                                    <?=form_error('full_name', '<div class="form_err">', '</div>')?>

                                </div>
                                <div class="row">
                                    <label for="university"> university :</label>
                                    <input type="text" name="university"/>
                                    <?=form_error('university', '<div class="form_err">', '</div>')?>
                                </div>

                                <div class="row">
                                    <label for="field"> field :</label>
                                    <input type="text" name="field"/>
                                    <?=form_error('field', '<div class="form_err">', '</div>')?>
                                </div>
                            </div>

                            <div class="left row col2">
                                <label for="about"> about :</label>
                                <textarea name="about" style="min-height:184px;width:184px;max-width: 90%"> </textarea>
                                <?=form_error('about', '<div class="form_err">', '</div>')?>
                            </div>

                            <div class="left" style="max-width: 30%;">
                                <div class="row">
                                    <label for="image"> image :</label>
                                    <img src="" alt="" width="100px" height="100px"/>
                                </div>
                                <div class="row">
                                    <input type="file" class="file_input" name="image"/>
                                    <?=form_error('image', '<div class="form_err">', '</div>')?>
                                </div>
                            </div>

                            <div class="badboy"></div>

                            <div class="row">
                                <input class="btn" type="submit" value="update"/>
                            </div>
                            </form>
                        </article>
                    </section>

            </main>
        </div>
        <div class="badboy"></div>
        <!--    <footer id="footer">footer</footer>-->
    </div>
<?php $this->load->view('base/footer'); ?>