<?php $this->load->view('base/header', array('title' => 'files')); ?>
<div id="container">

	<nav>
		<menu>
			<li><a href="#">item 1</a></li>
			<li><a href="#">item 2</a></li>
			<li class="active"><a href="#">file management</a></li>
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
			<h2>file management :</h2>
			<li class="icon-images active"><?php echo anchor("files/images", "images") ?></li>
			<li class="icon-files"><?php echo anchor("files/files", "files") ?></li>

			<h2>user :</h2>
			<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
			<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
			<li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
			<li class="icon-logout"><?php echo anchor("user/logout", "logout") ?></li>
		</menu>
	</aside>
	<div id="content">
		<header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			panda file management
		</header>
		<main>
			<section id="content-head">
				<section class="top">
					<ul>
						<li><?php echo anchor('home', 'home')?> </a>&nbsp;&gt;&nbsp;</li>
						<li><?php echo anchor('files/index', 'file management')?> </a>&nbsp;&gt;&nbsp;</li>
						<li>images</li>
					</ul>
				</section>

				<section class="bottom">
					<h2>images :</h2>

					<div>manage your image files :</div>
				</section>
			</section>
			<section id="content-body">

			</section>
		</main>
	</div>
	<div class="badboy"></div>
</div>
<?php $this->load->view('base/footer'); ?>
