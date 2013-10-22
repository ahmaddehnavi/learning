<?php $this->load->view('base/header'); ?>
	<style type="text/css">
		.login-form {
			margin    : 50px auto;
			width     : 330px;
			max-width : 100%;
		}

		.login-form form {
			padding : 30px;
		}

		.mini-phone .login-form form {
			padding : 0;
		}

		.mini-phone .login-form {
			margin : auto;
		}

		.login-form .aa {
			font-size : 11px;
			padding   : 30px 0 10px 10px;
			display   : block;
		}

		.mini-phone .login-form .aa {
			padding : 3px 10px;
		}

		.login-form h2 {
			border-bottom : 1px solid #aaa;
			margin-bottom : 15px;
			padding       : 10px 0;
			color         : #aaa;
		}

		.login-with {
			margin-top : 50px;
		}

	</style>
	<nav>
		<menu>
			<li><a href="#">item 1</a></li>
			<li><a href="#">item 2</a></li>
			<li><a href="#">item 3</a></li>
			<li><a href="#">item 4</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>

	<div class="login-form widget">
		<?php echo form_open('user/register', 'class="widget-body"')?>

		<label>full name:
			<input type="text" name="full_name" value="<?php echo set_value('full_name'); ?>"/>
			<?= form_error('full_name', '<p class="form_err">', '</p>')?>
		</label><br>

		<label>username:
			<input type="text" name="username" value="<?php echo set_value('username'); ?>"/>
			<?= form_error('username', '<p class="form_err">', '</p>')?>
		</label><br>

		<label>Email:
			<input type="email" name="email" value="<?php echo set_value('email'); ?>"/>
			<?= form_error('email', '<p class="form_err">', '</p>')?>
		</label><br>
<!--		<label>Password:-->
<!--			<input type="password" name="password" value="--><?php //echo set_value('password'); ?><!--"/>-->
<!--			--><?//= form_error('password', '<p class="form_err">', '</p>')?>
<!--		</label><br>-->
<!--		<label>Confirm Password:-->
<!--			<input type="password" name="password_conf" value="--><?php //echo set_value('password_conf'); ?><!--"/>-->
<!--			--><?//= form_error('password_conf', '<p class="form_err">', '</p>')?>
<!--		</label><br>-->

		<div>
			<input type="submit" value="create account" class="btn" name='submits'>
		</div>

		<div class="success"><?=$status?></div>
		</form>
	</div>

<?php $this->load->view('base/footer'); ?>