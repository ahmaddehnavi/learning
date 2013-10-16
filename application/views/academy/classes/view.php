<?php $this->load->view('base/header', array('title' => $lesson_name)); ?>
<div id="container">

	<nav>
		<menu>
			<li><?= anchor('/','home')?></li>
			<li><?=anchor('/academy','academy','class="active"')?></li>
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
		<header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
		<ul class="collapse-btn btn-left toggle-on" collapse-target="#sidebar">
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<menu>
			<h2>academy :</h2>
			<li class="icon-class active"><?php echo anchor("academy/classes", "classes") ?></li>
			<li class="icon-lighteners"><?php echo anchor("academy/lighteners", "lighteners") ?></li>
			<h2>user :</h2>
			<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
			<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
			<li class="icon-post"><?php echo anchor("user/posts", "posts") ?></li>
			<li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
			<li class="icon-logout .top-line"><?php echo anchor("user/logout", "logout") ?></li>
		</menu>



		<section class="list">
			<menu>

				<?php  foreach ($members->result() as $member) {
					echo '<li>';
					echo    anchor('user/view/id/'.$member->student_id,'
							<figure><img src="'.FILES_USERS_PATH . '/' . $member->student_id . '/image/profile_24.jpg"
							alt="" width=24 height=24/></figure>
							<p>'.$member->student_name.'</p>
							<div class="badboy"></div>'
						,'class="ad" target="_blank"');
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
						<li><?=$lesson_name?></li>
					</ul>
				</section>

				<section class="bottom">
					<h2><?=$lesson_name?> :</h2>

					<div> Professor : <?=$prof_name?> , <?=$next_exam_time?> to next exam</div>
				</section>
			</section>
			<section id="content-body">

				<?php
				$user_id = $this->auth->get_user_id();
				$delete_url=site_url('user/posts/remove');
				$next=current_url();
				foreach ($posts->result() as $post) {
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
										<input type="hidden" name="next" value="<?=$next?>"/>
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