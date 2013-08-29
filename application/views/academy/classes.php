<?php $this->load->view('base/header'); ?>
    <div id="container">

    <nav>
        <menu>
            <li><a href="#">item 1</a></li>
            <li class="active"><a href="#">item 2</a></li>
            <li><a href="#">item 3</a></li>
            <li><a href="#">item 4</a></li>
            <div class="badboy"></div>
        </menu>
        <ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </nav>
    <aside id="sidebar">
        <header><?php echo 'f_name l_name' ?>&nbsp;</header>
        <ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
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
                        <li><?php echo anchor('academy/home', 'academy')?> </a>&nbsp;&gt;&nbsp;</li>
                        <li>classes</li>
                    </ul>
                </section>

                <section class="bottom">
                    <h2>Classes</h2>

                    <div>Sample description for classes page</div>
                </section>
            </section>
            <section id="content-body">
                <section class="widget white">
                    <header class="widget-head">create class</header>
                    <table class="table-form">
                        <thead>
                        <tr>
                            <?=form_open('/academy/classes/create/', 'class=widget-body')?>
                            <th><input type="text" name="academy" class="suggest" placeholder="academy"/></th>
                            <th><input type="text" name="field" placeholder="field"/></th>
                            <th><input type="text" name="lesson" placeholder="lesson"/></th>
                            <th><input type="submit" value="create class" class="btn"/></th>
                            <div class="badboy"></div>
                            </form>
                        </tr>
                        <tr class="form_err">
                            <?=form_error('academy', '<td>', '</td>')?>
                            <?=form_error('field', '<td>', '</td>')?>
                            <?=form_error('lesson', '<td>', '</td>')?>
                        </tr>
                        <tr class="table-head">
                            <th>id</th>
                            <th>academy</th>
                            <th>field</th>
                            <th>lesson</th>
                            <th>action</th>
                            <div class="badboy"></div>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><?=anchor('/academy/classes/view/7', '7');?></td>
                            <td>shahrood</td>
                            <td>computer</td>
                            <td>data base</td>
                            <td>
                                <?=form_open('/academy/classes/remove/')?>
                                <input type="hidden" name="class_id" value="1"/>
                                <input type="submit" value="remove" class="btn btn-small"/>

                                <div class="badboy"></div>
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </section>

                <section class="widget white" style="">
                    <header class="widget-head">join to class</header>
                    <table class="table-form">
                        <thead>
                        <tr>
                            <form action="" style="padding:0">
                                <th>
                                    <input type="text" name="class_id" placeholder="class_id"/>
                                </th>
                                <th>
                                    <input type="text" name="academy" placeholder="academy" title="academy"/>
                                </th>
                                <th>
                                    <input type="text" name="field" placeholder="field"/>
                                </th>
                                <th>
                                    <input type="text" name="lesson" placeholder="lesson"/>
                                </th>
                                <th>
                                    <input type="text" name="prof" placeholder="prof"/>
                                </th>
                                <th colspan="2">
                                    <input type="submit" value="search" class="btn"/>
                                </th>
                                <div class="badboy"></div>
                            </form>
                        </tr>
                        <tr class="table-head">
                            <th>id</th>
                            <th>academy</th>
                            <th>field</th>
                            <th>lesson</th>
                            <th>prof</th>
                            <th>action</th>
                            <div class="badboy"></div>
                        </tr>
                        </thead>
                        <tbody>
                        <?php if ($suggest->num_rows() == 0) { ?>
                            <tr>
                                <td colspan="6">No class is not available.</td>
                            </tr>
                        <?php }foreach ($suggest->result() as $row) { ?>
                            <tr>
                                <td><?php echo $row->class_id?></td>
                                <td><?php echo $row->academy_name?></td>
                                <td><?php echo $row->field_name?></td>
                                <td><?php echo $row->lesson_name?></td>
                                <td><?php echo $row->prof_name?></td>
                                <td>
                                    <?=form_open('/academy/classes/join/')?>
                                    <input type="hidden" name="class_id" value="1"/>
                                    <input type="submit" value="join" class="btn btn-small"/>

                                    <div class="badboy"></div>
                                    </form>
                                </td>
                            </tr>

                        <?php }?>
                        </tbody>
                    </table>
                </section>

                <section class="widget white">
                    <header class="widget-head">joined class</header>
                    <table class="table-form">
                        <thead>
                        <tr class="table-head">
                            <th>id</th>
                            <th>academy</th>
                            <th>field</th>
                            <th>lesson</th>
                            <th>prof</th>
                            <th>action</th>
                            <div class="badboy"></div>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>10</td>
                            <td>shahrood</td>
                            <td>computer</td>
                            <td>data base</td>
                            <td>hamed rahimof</td>
                            <td>
                                <?=form_open('/academy/classes/leave/')?>
                                <input type="hidden" name="class_id" value="1"/>
                                <input type="submit" value="leave" class="btn btn-small"/>

                                <div class="badboy"></div>
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
        </main>
    </div>
    <div class="badboy"></div>
    <!--    <footer id="footer">footer</footer>-->
    </div>
<?php $this->load->view('base/footer'); ?>