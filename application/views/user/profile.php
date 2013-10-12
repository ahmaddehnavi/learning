<?php $this->load->view('base/header'); ?>
	<style>
		.large-desktop .widget, .desktop .widget, .tablet .widget {
			width       : 45%;
			margin-left : 2%;
			float       : left;
		}


		#about{
			/*width:100%;*/
			display:block;
			max-width:100%;
		}
	</style>
	<div id="container" class="p-profile">

		<nav>
			<menu>
				<li><a href="#">home</a></li>
				<li class="active"><a href="#">academy</a></li>
				<li><a href="#">file management</a></li>
				<li><a href="#">social network</a></li>
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
				<h2>user :</h2>
				<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
				<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
				<li class="icon-profile active"><?php echo anchor("user/profile", "profile") ?></li>
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
							<li>profile</li>
						</ul>
					</section>

					<section class="bottom">
						<h2>profile</h2>

						<div>Sample description for classes page</div>
					</section>
				</section>

				<section id="content-body">

					<section class="widget">
						<header class="widget-head">profile :</header>


						<article class="widget-body">
							<?php echo form_open_multipart('user/profile/');?>
							<input type="hidden" name="form_num" value="2"/>

							<section class="row">
								<label for="about"> about :</label>
								<textarea name="about" id="about"><?=$about?></textarea>
								<?=form_error('about', '<div class="form_err">', '</div>')?>
							</section>

							<section class="left row">
								<section >
									<label for="userfile"> image :</label>
									<img src="<?php echo FILES_USERS_PATH.'/'.$this->auth->get_user_id().'/image/profile_100.jpg' ?>" alt="<?= $full_name ?>" width="100px" height="100px"/>
								</section>
								<section >
									<input type="file" class="file_input" name="userfile"/>
									<?=form_error('userfile', '<div class="form_err">', '</div>')?>
								</section>
								<div class="badboy"></div>
							</section>

							<div class="badboy"></div>

							<section class="row">
								<input class="btn" type="submit" value="update"/>
							</section>
							</form>

						</article>
					</section>

					<section class="widget">
						<header class="widget-head">change password :</header>
						<article class="widget-body">
							<?php echo form_open('user/profile/');?>
							<input type="hidden" name="form_num" value="1"/>

							<div class="row left">
								<?=$form_1_msg?>
<!--								<label for="current_password"> </label>-->
								<input type="password" name="current_password"
									   placeholder="current password" title="Enter current password."/>
								<?=form_error('current_password', '<div class="form_err">', '</div>')?>

<!--								<label for="new_password">new password :</label>-->
								<input type="password" name="new_password" value="<?= set_value('new_password') ?>"
									   placeholder="new password" title="Enter new password."/>
								<?=form_error('new_password', '<div class="form_err">', '</div>')?>

<!--								<label for="conf_new_password"> confirm new password :</label>-->
								<input type="password" name="conf_new_password"
									   value="<?= set_value('conf_new_password') ?>"
									   placeholder="new password confirm" title="Enter new password again."/>
								<?=form_error('conf_new_password', '<div class="form_err">', '</div>')?>
							</div>

							<div class="badboy"></div>
							<div class="row">
								<input class="btn" type="submit" value="change password."/>
							</div>
							</form>

						</article>

					</section>

					<section class="widget">
						<header class="widget-head">academy:</header>
						<article class="widget-body">
							<?php echo form_open('user/profile/');?>
							<input type="hidden" name="form_num" value="3"/>

							<div class="left">
								<div class="row">
									<label for="academy"> academy :</label>
									<input type="text" name="academy" value="<?= $academy ?>"/>
									<?=form_error('academy', '<div class="form_err">', '</div>')?>
								</div>

								<div class="row">
									<label for="field"> field :</label>
									<input type="text" name="field" value="<?= $field ?>"/>
									<?=form_error('field_table', '<div class="form_err">', '</div>')?>
								</div>
							</div>

							<div class="badboy"></div>

							<div class="row">
								<input class="btn" type="submit" value="update"/>
							</div>
							</form>

						</article>
					</section>

			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>