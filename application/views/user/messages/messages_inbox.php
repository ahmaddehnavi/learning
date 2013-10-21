<?php $this->load->view('base/header'); ?>
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
			<header><?php echo $this->auth->get_full_name(); ?>&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>message :</h2>
				<li class=""><?php echo anchor("user/messages/", "unread<b class='label'>$this->unread_message</b>") ?></li>
				<li class="active"><?php echo anchor("user/messages/inbox", "inbox") ?></li>
				<li class=""><?php echo anchor("user/messages/sent", "sent") ?></li>

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
							<li><?php echo anchor('user/home', 'user')?> </a>&nbsp;&gt;&nbsp;</li>
							<li><?php echo anchor('user/message', 'message')?> </a>&nbsp;&gt;&nbsp;</li>
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
						echo 'id : ' . $message->message_id . '<br/>';
						echo 'from : ' . $message->full_name . '<br/>';
						echo '' . $message->from_id . '<br/>';
						echo 'message : ' . $message->message . '<br/>';
						echo '' . date('y/m/d h:m', $message->time) . '<hr/>';
					}

					echo $pagination;
					?>

				</section>
			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>