<?php $this->load->view('base/header', array('title' => 'post list')); ?>
	<div id="container">

		<nav>
			<menu>
				<li><?= anchor('/', 'home')?></li>
				<li class="active"><?=anchor('/academy', 'academy')?></li>
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
					'<img src="' . FILES_USERS_PATH . '/' . $this->auth->get_user_id() . '/image/profile_80.jpg"
							 width="40px" height="40px" id="user-image"/>' . $this->auth->get_full_name()
					, 'target="_blank"');
				?>
				&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>post :</h2>
				<li><?php echo anchor('user/posts/publish', '<i class="icon-pencil"></i>publish') ?></li>
				<li class="active"><?php echo anchor("user/posts", '<i class="icon-edit"></i>manage') ?></li>

				<h2>user :</h2>

				<li><?php echo anchor('user/messages', '<i class="icon-inbox"></i>messages<b class="label">' . $this->unread_message . '</b>') ?></li>
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
							<li>posts</li>
						</ul>
					</section>

					<section class="bottom">
						<h2>posts</h2>

						<div>all your post</div>
					</section>
					<div class="badboy"></div>
				</section>
				<section id="content-body">
					<?php $delete_url = site_url('user/posts/remove');
					$next = current_url();
					foreach ($posts->result() as $post) {
						?>

						<section class="widget " tabindex="1">
							<section class="image">
								<figure class="imgpost">
									<img
										src="<?php echo FILES_USERS_PATH . '/' . $post->author_id . '/image/profile_50.jpg' ?>"
										alt="" width="50px" height="50px"/></figure>
								<p class='name'><?php echo $post->author_name?></p>
							</section>
							<section class='total' style="padding-top: 1px;">
								<header class='widget_head'>

									<p class='subject'><?php echo $post->subject ?></p>

								</header>
								<section class='widget_body'>
									<div class="text">    <?php echo $post->body ?></div>
									<div class="badboy"></div>
									<p class='publish'><?php echo date('Y/m/d H:m', $post->time) ?></p>
								</section>
								<footer class="widget_footer">
									<ul>
										<li><?=form_open($delete_url);?>
											<input type="hidden" name="post_id" value="<?= $post->post_id; ?>"/>
											<input type="hidden" name="next" value="<?= $next ?>"/>
											<input type="submit" class="btn btn-red confirm" value="delete"/>
											</form>
										</li>
										<?php
										if ($post->post_type === 'exercise') {
											echo '<li class="view-exercise">' .
												anchor(FILE_MANAGE_PATH . '/browse.php?dir=files/private/exercise/' . $post->post_id, 'view uploaded exercise', 'class="btn btn-small" target="_blank"') .
												'</li>';
										}
										?>
									</ul>
								</footer>
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

	<script type="text/javascript">
		$(function () {
			$('.confirm').confirmOn({
				questionText: 'This action cannot be undone, are you sure?',
				textYes: 'Yes, I\'m sure',
				textNo: 'No, I\'m not sure'
			}, 'click', function () {
				$(this).parent('form').submit();
			});
		});
	</script>
<?php $this->load->view('base/footer'); ?>