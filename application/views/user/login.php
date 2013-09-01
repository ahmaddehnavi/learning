<?php $this->load->view('base/header'); ?>
	<style type="text/css">
		.login-form {
			margin    : 50px auto;
			width     : 330px;
			max-width : 100%;
		}

		.login-form form {
			margin : 10px;
		}

		.mini-phone .login-form {
			margin : auto;
		}

		.login-form a {
			font-size : 11px;
			padding   : 30px 0 10px 10px;
			display   : block;
		}

		.mini-phone .login-form a {
			padding : 3px 10px;
		}

		.login-form header {
			font-size      : 16px;
			font-weight    : bold;
			padding        : 25px 10px 10px 10px;
			text-align     : center;
			text-transform : uppercase;
			color          : #555;
			border-bottom  : 1px solid rgb(245, 245, 245);
		}

		.login-form header i {
			background : #333;
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

	<div class="login-form white">
		<header><i></i>login form <i></i></header>
		<?php echo $registration_message; ?>
		<?php echo form_open('user/login')?>
		<?php echo validation_errors('<p class="form_err">', '</p>'); ?>
		<?php if ($login_error): ?><p class="form_err">Invalid username or Password</p><?php endif; ?>
		<input type="text" name="username" placeholder="mail or username"/>
		<input type="password" name="password" placeholder="password"/>

		<input type="hidden" name="next_page" value="<?= $next_page ?>"/>


		<div>

			<div class="left">
				<input type="submit" value="Login" class="btn" name='submits'>
			</div>

			<div class="right">
				<p><?=anchor('forgot_password', 'Forgot password')?></p>
			</div>
			<div class="right">
				<p><?=anchor('register', 'Register Here')?></p>

			</div>

			<div class="badboy"></div>
		</div>
		</form>

	</div>

<?php $this->load->view('base/footer'); ?>