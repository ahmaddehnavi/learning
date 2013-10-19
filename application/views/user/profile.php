<?php $this->load->view('base/header'); ?>
<!--	<script src="--><?//=FILES_JS_PATH?><!--/jcrop/jquery.Jcrop.min.js"></script>
	<link rel="stylesheet" href="<?=FILES_CSS_PATH?>/jquery.Jcrop.css" type="text/css" />
	<script type="text/javascript">
		function run(){
			var x1Input=$('#x1');
			var x2Input=$('#x2');
			var y1Input=$('#y1');
			var y2Input=$('#y2');
			function setValue(c)
			{
				x1Input.val(c.x);
				x2Input.val(c.x2);
				y1Input.val(c.y);
				y2Input.val(c.y2);
				// variables can be accessed here as
				// c.x, c.y, c.x2, c.y2, c.w, c.h
			}

			$('#target').Jcrop({
				onSelect:    setValue,
				bgColor:     'black',
				bgOpacity:   .4,
				setSelect:   [ 100, 100, 50, 50 ],
				aspectRatio: 1,
				minSize:[100,100]
			});
		}
	</script> -->
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
			<header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>user :</h2>
				<li class="icon-dashboard"><?php echo anchor("user/dashboard", "dashboard") ?></li>
				<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>$this->unread_message</b>") ?></li>
				<li class="icon-post"><?php echo anchor("user/posts", "posts") ?></li>
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