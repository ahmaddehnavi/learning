<?php $this->load->view('base/header'); ?>
	<style type="text/css">
		.widget_body .text{
			padding-top: 40px;

		}
	</style>
	<div id="container">
		<nav>
			<menu>
				<li><?= anchor('/', 'home')?></li>
				<li><?=anchor('/academy', 'academy')?></li>
				<li class="active"><?=anchor('/user', 'user')?></li>
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
				<h2>message :</h2>
				<li><?php echo anchor("user/messages/", '<i class="icon-inbox"></i>unread<b class="label">'.$this->unread_message.'</b>') ?></li>
				<li class="active"><?php echo anchor("user/messages/inbox", '<i class="icon-download-alt"></i>inbox') ?></li>
				<li><?php echo anchor("user/messages/sent", '<i class="icon-upload-alt"></i>sent') ?></li>

				<h2>user :</h2>

				<li><?php echo anchor('user/messages', '<i class="icon-inbox"></i>messages') ?></li>
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
							<li><?php echo anchor('user/home', 'user')?> </a>&nbsp;&gt;&nbsp;</li>
							<li><?php echo anchor('user/messages', 'messages')?> </a>&nbsp;&gt;&nbsp;</li>
							<li>inbox</li>
						</ul>
					</section>

					<section class="bottom">
						<h2>inbox</h2>

						<div>received messages</div>
					</section>
				</section>
				<section id="content-body">
					<?php
					$user_id = $this->auth->get_user_id();
					foreach ($messages_inbox->result() as $message) {
//						echo 'id : ' . $message->message_id . '<br/>';
//						echo 'from : ' . $message->full_name . '<br/>';
//						echo '' . $message->from_id . '<br/>';
//						echo 'message : ' . $message->message . '<br/>';
//						echo '' . date('Y/m/d H:m', $message->time) . '<hr/>';
//					}
//
//					echo $pagination;
					?>


					<section class="widget " tabindex="1">
						<section class="image">
							<figure class="imgpost">
								<img
									src="<?php echo FILES_USERS_PATH . '/' . $message->from_id . '/image/profile_50.jpg' ?>"
									alt="" width="50px" height="50px"/></figure>
							<p class='name'><?php echo $message->full_name?></p>
						</section>
						<section class='total' style="padding-top: 1px;">

							<section class='widget_body'>
								<div class="text">    <?php echo $message->message ?></div>
								<div class="badboy"></div>
								<p class='publish'><?php echo date('Y/m/d H:m', $message->time) ?></p>
							</section>

						</section>
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