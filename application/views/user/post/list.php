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
			<header><?php echo $this->auth->get_full_name(); ?>&nbsp;</header>
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
					<?php echo anchor('/user/post/publish', 'publish new post', 'class="btn-fix btn-small right"')?>
					<div class="badboy"></div>
				</section>
				<section id="content-body">
					<?php foreach ($posts->result() as $post) { ?>

						<section class="widget ">
							<header class="widget-head">
								<?php echo $post->subject ?>
							</header>
							<section class="widget-body">
								<?php echo $post->body ?>
							</section>
							<footer class="widget-footer">
								post id :<?php echo $post->post_id ?>
								author id: <?php echo $post->author_id ?>
							</footer>
						</section>
					<?php }?>
					<div class="badboy"></div>
					<section class="widget" style="width: inherit;">
						<?php echo $pagination; ?>
					</section>


				</section>
			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>