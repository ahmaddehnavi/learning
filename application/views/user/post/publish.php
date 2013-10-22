<?php $this->load->view('base/header'); ?>
<script src="<?= FILES_JS_PATH ?>/ckeditor/ckeditor.js"></script>

<style type="text/css">
	select {
		padding  : 0;
		border   : 0;
		margin   : 10px 0;
		overflow : auto;

	}
</style>
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
			<h2>post :</h2>
			<li class="active"><?php echo anchor('user/posts/publish', '<i class="icon-pencil"></i>publish') ?></li>
			<li><?php echo anchor("user/posts", '<i class="icon-edit"></i>manage') ?></li>

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
						<li><?php echo anchor('user/post/home', 'post')?> </a>&nbsp;&gt;&nbsp;</li>
						<li>publish</li>
					</ul>
				</section>

				<section class="bottom">
					<h2>publish</h2>

					<div>Sample description for classes page</div>
				</section>
			</section>
			<section id="content-body">
				<section class="widget-body">
					<?php echo form_open_multipart('/user/posts/publish')?>
					<section class="left">
						<p> write your post :</p>

						<input type="text" name="subject" placeholder="subject"/>
						<?php echo form_error('subject', '<p class="form_err">', '</p>') ?>

						<textarea name="body" id="body" cols="30" rows="10" placeholder="post body"></textarea>
						<?php echo form_error('body', '<p class="form_err">', '</p>') ?>


					</section>

					<section class="left">
						<h2>publish on classes :</h2>
						<select name="classes[]" multiple size="5" title="use CTRL for multi select...">
							<?php
							foreach ($prof_classes->result() as $class) {
							echo "<option value='$class->class_id'
									title='$class->academy_name \n $class->field_name \n $class->lesson_name' >$class->lesson_name</option>";
							}
							?>
						</select>
						<?php echo form_error('classes[]', '<p class="form_err">', '</p>') ?>

						<label for="mail_notice">
							<input type="checkbox" name="mail_notice" value="1"/>mail notification (free)?
							<?php echo form_error('mail_notice', '<p class="form_err">', '</p>') ?>
						</label>
					</section>
					<section class="left">
						<label for="post_type">
							post type:
							<select name="post_type" id="post_type">
								<option value="notice">notice</option>
								<option value="booklet" title="every one can view this post">booklet</option>
								<option value="exercise" title="enable student upload file for this post">exercise
								</option>
							</select>
							<?php echo form_error('post_type', '<p class="form_err">', '</p>') ?>
						</label>
						<label for="blog">
							<input type="checkbox" name="is_public" value="1"/>share on your
							<?php echo anchor('/user/view/id/' . $this->auth->get_user_id(), 'public profile'); ?>
							<?php echo form_error('is_public', '<p class="form_err">', '</p>') ?>
						</label>

					</section>

					<div class="badboy"></div>
					<div class="right"><input type="submit" class="btn" value="publish"/></div>
					<div class="badboy"></div>
					<p class="form_err"><?php echo $publish_error;?></p>
					</form>

				</section>
			</section>
		</main>
	</div>
	<div class="badboy"></div>
</div>
<script>

	CKEDITOR.replace('body', {
		filebrowserBrowseUrl: '<?php echo FILE_MANAGE_PATH?>/browse.php?type=Images',
		filebrowserUploadUrl: '<?php echo FILE_MANAGE_PATH?>/upload.php?type=Files'
	});

</script>
<?php $this->load->view('base/footer'); ?>
