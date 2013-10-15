<?php $this->load->view('base/header'); ?>
	<div id="container">

		<nav>
			<menu>
				<li><?= anchor('/','home')?></li>
				<li><?=anchor('/academy','academy')?></li>
				<li class="active"><?=anchor('/user','user')?></li>
				<li><a href="<?=FILE_MANAGE_PATH?>">file management</a></li>
				<div class="badboy"></div>
			</menu>
			<ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</nav>
		<aside id="sidebar">
			<header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>academy :</h2>
				<li class="icon-class"><?php echo anchor("academy/classes", "classes") ?></li>
				<h2>user :</h2>
				<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
				<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
				<li class="icon-post"><?php echo anchor("user/posts", "posts") ?></li>
				<li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
				<li class="icon-logout .top-line"><?php echo anchor("user/logout", "logout") ?></li>
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
					<section class="widget">
						<header class="widget-head">header header header</header>
						<article class="widget-body">
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article
						</article>
					</section>
					<section class="widget">
						<header class="widget-head">header header header</header>
						<article class="widget-body">
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article
						</article>
					</section>
					<section class="widget">
						<header class="widget-head">header header header</header>
						<article class="widget-body">
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article article article
							article
							article article article article article article article article article
						</article>
					</section>
				</section>
			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>