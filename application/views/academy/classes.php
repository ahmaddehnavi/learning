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
        <header><?php echo $this->tank_auth->get_username(); ?>&nbsp;</header>
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
                    <header>My Classes</header>
                    <article>
                        <table class="table table-utilities">
                            <tbody>
                            <tr class="heading">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"></td>
                                <td class="cell-author hidden-phone hidden-tablet">Sender</td>
                                <td class="cell-title">Subject</td>
                                <td class="cell-icon hidden-phone hidden-tablet"></td>
                                <td class="cell-time align-right">Date</td>
                            </tr>
                            <tr class="unread">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Andy McMillian</td>
                                <td class="cell-title">Layout modifications</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">22:30 PM</td>
                            </tr>
                            <tr class="unread starred">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Task Server</td>
                                <td class="cell-title">New server for datacenter needed</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">16:30 PM</td>
                            </tr>
                            <tr class="unread">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Twitter</td>
                                <td class="cell-title">Izuddin Helmi (@izuddinhelmi) mentioned you on Twitter!</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">12:18 AM</td>
                            </tr>
                            <tr class="unread">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Youtube</td>
                                <td class="cell-title">Just for You from YouTube: Daily Update - Apr 15, 2013</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">12:18 AM</td>
                            </tr>
                            <tr class="read starred">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Youtube</td>
                                <td class="cell-title">Arsenal just upload a video</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 20</td>
                            </tr>
                            <tr class="read">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Google+ Team</td>
                                <td class="cell-title">John added you on Google+</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="read starred">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Twitter</td>
                                <td class="cell-title">You have new followers on Twitter</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="unread">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Dropbox</td>
                                <td class="cell-title">Get Dropbox on all of your computer</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="unread">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Dropbox</td>
                                <td class="cell-title">Please verify your email address</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="read">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">UI Awesomeness</td>
                                <td class="cell-title">Newsletter: Please confirm your subscription</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="read starred">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Gravatar</td>
                                <td class="cell-title">Verify email addition</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            <tr class="read">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Facebook</td>
                                <td class="cell-title">You have 4 friend request and 89 messages</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>

                            <tr class="read starred">
                                <td class="cell-check">
                                    <input type="checkbox" class="inbox-checkbox">
                                </td>
                                <td class="cell-icon"><i class="icon-star"></i></td>
                                <td class="cell-author hidden-phone hidden-tablet">Youtube</td>
                                <td class="cell-title">Arsenal just upload a video</td>
                                <td class="cell-icon hidden-phone hidden-tablet"><i class="icon-paper-clip-no"></i></td>
                                <td class="cell-time align-right">April 10</td>
                            </tr>
                            </tbody>
                        </table>
                    </article>
                </section>
            </section>
        </main>
    </div>
    <div class="badboy"></div>
    <!--    <footer id="footer">footer</footer>-->
    </div>
<?php $this->load->view('base/footer'); ?>