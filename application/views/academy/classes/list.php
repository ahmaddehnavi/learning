<?php $this->load->view('base/header',array('title'=>'classes list')); ?>

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/style_class.css"/>
	<div id="container">

		<nav>
			<menu>
				<li><?= anchor('/', 'home')?></li>
				<li class="active"><?=anchor('/academy', 'academy')?></li>
				<li><?=anchor('/user', 'user')?></li>
				<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
				<div class="badboy"></div>
			</menu>
			<ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</nav>
		<aside id="sidebar">
				<header>
					<?php echo anchor('/user/view/u/' . $this->auth->get_username(),
						'<img src="'. FILES_USERS_PATH . '/' . $this->auth->get_user_id().'/image/profile_80.jpg"
							 width="40px" height="40px" id="user-image"/>'.$this->auth->get_full_name()
					,'target="_blank"');
					?>
					&nbsp;</header>

			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>academy :</h2>
				<li class="active"><?php echo anchor("academy/classes", '<i class="icon-group"></i>classes') ?></li>
				<li><?php echo anchor("academy/classes/manage", '<i class="icon-cog"></i>manage') ?></li>
				<h2>user :</h2>

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
						<h2>Classes</h2>

						<div>list of your classes</div>
<!--						--><?//=anchor('/academy/classes/manage', 'manage - / +', 'class="btn-fix btn-small right" title="add , remove , join , leave"');?>
					</section>
				</section>
				<section id="content-body">
					<section class="widget white">
						<section class="widget_body">
							<?php
							$user_id = $this->auth->get_user_id();
							foreach ($prof_class->result() as $class) {
								?>

								<section class="one">

									<figure class="background">
										<img src="<?php echo FILES_IMG_PATH . '/Grass.jpg'; ?> " alt="" width="100%"
											 height=100%/>
									</figure>
									<figure class="img-teacher">
										<?=anchor('/user/view/id/'.$class->prof_id,'<img
												src="'.FILES_USERS_PATH . '/' . $class->prof_id . '/image/profile_100.jpg"
												width="100px" height="100px"/>','target="_blank"')?>
									</figure>

									<section class="descript">
										<p class="name_lesson"> <?php echo $class->lesson_name; ?></p>

										<p class="name_teacher">you</p>
										<?php echo anchor('academy/classes/view/'.$class->class_id,'view','class="btn-fix"')?>
									</section>
								</section> <?php
							} foreach ($student_class->result() as $class) {
								?>

								<section class="one">

									<figure class="background">
										<img src="<?php echo FILES_IMG_PATH . '/Grass.jpg'; ?> " alt="" width="100%"
											 height=100%/>
									</figure>
									<figure class="img-teacher">
										<?=anchor('/user/view/id/'.$class->prof_id,'<img
												src="'.FILES_USERS_PATH . '/' . $class->prof_id . '/image/profile_100.jpg"
												width="100px" height="100px"/>','target="_blank"')?>
									</figure>

									<section class="descript">
										<p class="name_lesson"> <?php echo $class->lesson_name; ?></p>

										<p class="name_teacher"><?php echo $class->prof_name; ?> </p>
										<?php echo anchor('academy/classes/view/'.$class->class_id,'view','class="btn-fix"')?>
									</section>
								</section>
							<?php
							}
							?>



							<div class="badboy"></div>
						</section>

					</section>
			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>