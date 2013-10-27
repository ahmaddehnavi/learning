<?php $this->load->view('base/header', array('title' => 'user | profile')); ?>

	<style>
		.large-desktop .widget, .desktop .widget, .tablet .widget {
			width       : 45%;
			margin-left : 2%;
			float       : left;
		}

		#about {
			/*width:100%;*/
			display   : block;
			max-width : 100%;
		}
	</style>
	<div id="container" class="p-profile">

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
				<?php echo anchor('/user/view/id/' . $this->auth->get_user_id(),
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
								<section>
									<label for="userfile"> image :</label>
									<img id="target"
										src="<?php echo FILES_USERS_PATH . '/' . $this->auth->get_user_id() . '/image/profile.jpg' ?>"
										alt="<?= $full_name ?>" width="200px" height="200px"/>
								</section>
								<section>
									<input type="file" class="file_input" name="userfile"/>
									<?=form_error('userfile', '<div class="form_err">', '</div>')?>
								</section>
								<div class="badboy"></div>
							</section>

							<div class="badboy"></div>
<!--
							<input type="hidden" name="x1" id="x1"  value="-1"/>
							<input type="hidden" name="x2" id="x2" value="-1"/>
							<input type="hidden" name="y1" id="y1" value="-1"/>
							<input type="hidden" name="y2" id="y2" value="-1"/>
-->
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
								<input type="password" name="current_password"
									   placeholder="current password" title="Enter current password."/>
								<?=form_error('current_password', '<div class="form_err">', '</div>')?>

								<input type="password" name="new_password" value="<?= set_value('new_password') ?>"
									   placeholder="new password" title="Enter new password."/>
								<?=form_error('new_password', '<div class="form_err">', '</div>')?>

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

							<div>
								<div class="row">
									<select name="academy_id">
										<option value="">select your academy ...</option>
										<?php
										foreach ($academy_list->result() as $academy) {
											if ($academy->academy_id == $academy_id) {
												echo '<option selected value="' .  $academy->academy_id . '">' . $academy->name . '</option>';
											} else {
												echo '<option value="' .  $academy->academy_id . '">' . $academy->name . '</option>';
											}
										}?>
									</select>
									<?=form_error('academy_id', '<div class="form_err">', '</div>')?>
								</div>

								<div class="row">
<!--									<label for="field_id"> field :</label>-->
									<select name="field_id">
										<option value="">select your field ...</option>
										<?php
										foreach ($field_list->result() as $field) {
											if ($field->field_id == $field_id) {
												echo '<option selected value="' .  $field->field_id . '">' . $field->name . '</option>';
											} else {
												echo '<option value="' . $field->field_id . '">' . $field->name . '</option>';
											}
										}?>
									</select>
									<?=form_error('field_id', '<div class="form_err">', '</div>')?>
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
	</div>

<?php $this->load->view('base/footer'); ?>