<?php $this->load->view('base/header'); ?>
<div id="container">

	<nav>
		<menu>
			<li><?= anchor('/','home')?></li>
			<li class="active"><?=anchor('/academy','academy')?></li>
			<li><?=anchor('/user','user')?></li>
			<li><a href="<?=FILE_MANAGE_PATH?>">file management</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>
	<aside id="sidebar">
		<header><img src="<?= FILES_USERS_PATH . '/' . $this->auth->get_user_id() ?>/image/profile_80.jpg"
					 width="40px" height="40px" id="user-image"/><?php echo $this->auth->get_full_name(); ?>&nbsp;</header>

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
			<li><?php echo anchor("user/dashboard", '<i class="icon-dashboard"></i>dashboard') ?></li>
			<li><?php echo anchor('user/messages', '<i class="icon-inbox"></i>messages<b class="label">'.$this->unread_message.'</b>') ?></li>
			<li><?php echo anchor('user/posts', '<i class="icon-file-text"></i>posts') ?></li>
			<li><?php echo anchor('user/profile', '<i class="icon-user"></i>profile') ?></li>
			<li class="top-line"><?php echo anchor('user/logout', '<i class="icon-signout"></i>logout') ?></li>
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
					<h2>Class :</h2>

					<div>Sample description for classes page</div>
				</section>
			</section>
			<section id="content-body">
				<section class="widget white">

				</section>
			</section>
		</main>
	</div>
	<div class="badboy"></div>
</div>
<?php $this->load->view('base/footer'); ?>