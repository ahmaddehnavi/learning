<?php $this->load->view('base/header', array('title' => $lesson_name.'  | booklet')); ?>
	<div id="container">

		<nav>
			<menu>
				<li><?= anchor('/', 'home')?></li>
				<li><?=anchor('/academy', 'academy', 'class="active"')?></li>
				<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
				<div class="badboy"></div>
			</menu>
			<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
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
			<ul class="collapse-btn btn-left toggle-on" collapse-target="#sidebar">
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


			<section class="list">
				<menu>

					<?php  foreach ($members->result() as $member) {
						echo '<li>';
						echo    anchor('user/view/id/' . $member->student_id, '
							<figure><img src="' . FILES_USERS_PATH . '/' . $member->student_id . '/image/profile_24.jpg"
							alt="" width=24 height=24/></figure>
							<p>' . $member->student_name . '</p>
							<div class="badboy"></div>'
							, 'class="ad" target="_blank"');
						echo '</li>';
					} ?>

				</menu>
			</section>
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
							<li><?php echo anchor('academy/classes/view/'.$class_id,$lesson_name)?> </a>&nbsp;&gt;&nbsp;</li>
							<li>Booklet</li>
						</ul>
					</section>

					<section class="bottom">
						<h2><?=$lesson_name?> :</h2>
						<div> All Available Booklet for <?=$lesson_name?> </div>
						<?php echo anchor("academy/classes/view/".$class_id, '<i class="icon-arrow-left"></i> &nbsp;&nbsp;back to class','class="btn-fix btn-small right"') ?>
					</section>
				</section>
				<section id="content-body">

					<?php
					foreach ($posts->result() as $post) {
						?>
						<section class="widget" tabindex="1">
							<section class="image">
								<figure class="imgpost">
									<img
										src="<?php echo FILES_USERS_PATH . '/' . $post->author_id . '/image/profile_50.jpg' ?>"
										alt="" width="50px" height="50px"/>
								</figure>
								<p class='name'>
									<?=$post->author_name?>
								</p>
							</section>
							<section class='total' style="padding-top: 1px;">
								<header class='widget_head'>

									<p class='subject'><?php echo $post->subject ?></p>

								</header>
								<section class='widget_body'>
									<div class="text"><?php echo $post->body ?></div>
									<div class="badboy"></div>
									<p class='publish'><?php echo date('Y/m/d H:m',$post->time) ?></p>
								</section>

								<div class="badboy"></div>
							</section>
						</section>

					<?php }?>
					<section class="widget" style="width: inherit;">
						<?php echo $pagination; ?>
					</section>

				</section>
			</main>
		</div>
		<div class="badboy"></div>
	</div>
<?php $this->load->view('base/footer'); ?>