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
			<header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<?if ($this->auth->is_logged_in()) { ?>
					<h2>user :</h2>
					<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
					<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
					<li class="icon-post"><?php echo anchor("user/posts", "posts") ?></li>
					<li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
					<li class="icon-logout .top-line"><?php echo anchor("user/logout", "logout") ?></li>
				<? } else { ?>
					<h2>user :</h2>
					<li class="icon-login"><?php echo anchor("user/login", "login") ?></li>
					<li class="icon-register"><?php echo anchor("user/register", "register") ?></li>
				<? }?>
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
							<li>view</li>
						</ul>
					</section>

					<section class="bottom">
						<h2><?=$user_info->row('full_name');?></h2>

						<div> public profile</div>
					</section>
				</section>
				<section id="content-body">

					<?php
					echo    'full name : '.$user_info->row('full_name').'<br/>';
					echo    'academy name : '.$user_info->row('academy_name').'<br/>';
					echo    'field name : '.$user_info->row('field_name').'<br/>';
					echo    'about : '.$user_info->row('about').'<br/>';
					echo    'user id : '.$user_info->row('user_id').'<br/>';
					echo    'username : '.$user_info->row('username').'<br/>';



					$user_id = $this->auth->get_user_id();
					$delete_url = site_url('user/posts/remove');
					$next = current_url();
					foreach ($public_posts->result() as $post) {
						?>
						<section class="widget" tabindex="1">
							<section class="image">
								<figure class="imgpost">
									<img
										src="<?php echo FILES_USERS_PATH . '/' . $post->author_id . '/image/profile.jpg' ?>"
										alt="" width="50px" height="50px"/></figure>
								<!--                            <p class='name'>-->
								<?php //echo $post->author_name?><!--</p>-->
							</section>
							<section class='total' style="padding-top: 1px;">
								<header class='widget_head'>

									<p class='subject'><?php echo $post->subject ?></p>

								</header>
								<section class='widget_body'>
									<div class="text">    <?php echo $post->body ?></div>
									<p class='publish'><?php echo'2 hours ago' ?></p>
								</section>
								>
								<?php if ($post->author_id == $user_id) { ?>
									<footer class="widget_footer">
										<div class="menu">
											<?=form_open($delete_url);?>
											<input type="hidden" name="post_id" value="<?= $post->post_id; ?>"/>
											<input type="hidden" name="next" value="<?= $next ?>"/>
											<input type="submit" class="btn" value="delete"/>
											</form>
										</div>
									</footer>
								<?php } ?>
							</section>
						</section>
					<?php }?>
					<!--                <div class="badboy"></div>-->
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