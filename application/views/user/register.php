<?php $this->load->view('base/header', array('title' => 'user | register')); ?>
	<style type="text/css">
		.message-box {
			margin    : 50px auto;
			width     : 330px;
			max-width : 100%;
		}

		.message-box form {
			padding : 30px;
		}

		.mini-phone .message-box form {
			padding : 0;
		}

		.mini-phone .message-box {
			margin : auto;
		}

		.message-box h2 {
			border-bottom : 1px solid #aaa;
			margin-bottom : 15px;
			padding       : 10px 0;
			color         : #aaa;
		}

		select {
			margin: 10px 0;
			border-radius: 2px;
			width: 100%;
		}
	</style>
	<nav>
		<menu>
			<li><?= anchor('/', 'home')?></li>
			<li><?=anchor('/academy', 'academy')?></li>
			<li class="active"><?=anchor('/user', 'user')?></li>
			<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>

	<div class="message-box widget">
		<?php echo form_open('user/register', 'class="widget-body"')?>

		<label>full name:
			<input type="text" name="full_name" value="<?php echo set_value('full_name'); ?>"/>
			<?= form_error('full_name', '<p class="form_err">', '</p>')?>
		</label><br/>

		<label>username:
			<input type="text" name="username" value="<?php echo set_value('username'); ?>"/>
			<?= form_error('username', '<p class="form_err">', '</p>')?>
		</label><br/>

		<label>Email:
			<input type="email" name="email" value="<?php echo set_value('email'); ?>"/>
			<?= form_error('email', '<p class="form_err">', '</p>')?>
		</label><br/>

		<label for="academy_id">select your academy :
			<select name="academy_id">
				<option value=""> ...</option>
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
		</label><br/>

		<label for="field_id"> select your field :
			<select name="field_id">
				<option value=""> ...</option>
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
		</label><br/>

		<div>
			<input type="submit" value="create account" class="btn" name='submits'>
		</div>

		<div class="success"><?=$status?></div>
		</form>
	</div>

<?php $this->load->view('base/footer'); ?>