<?php $this->load->view('base/header'); ?>
	<style type="text/css">
		#container{
			padding: 50px 0;
		}
		.login-form {
			margin    : 0 auto;
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
			<li><?= anchor('/','home')?></li>
			<li><?=anchor('/academy','academy')?></li>
			<li class="active"><?=anchor('/user','user')?></li>
			<li><a href="<?=FILE_MANAGE_PATH?>">file management</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>
<div id="container">
	<div class="login-form widget">
		<?php echo $registration_message; ?>
		<?php echo form_open('user/login', 'class="widget-body"')?>

		<!--		<h2>username and password :</h2>-->
		<input type="text" name="username" placeholder="mail or username"/>
		<?= form_error('username', '<p class="form_err">', '</p>')?>
		<input type="password" name="password" placeholder="password"/>
		<?= form_error('password', '<p class="form_err">', '</p>')?>
		<?php if ($login_error): ?><p class="form_err">Invalid username or Password</p><?php endif; ?>
		<input type="hidden" name="next_page" value="<?= $next_page ?>"/>

		<div>
			<div class="left">
				<input type="submit" value="Login" class="btn" name='submits'>
			</div>

			<div class="right">
				<p><?=anchor('user/lost_password', 'lost password ?', 'class="aa"')?></p>
			</div>
			<div class="right">
				<p><?=anchor('user/register', 'create new account', 'class="aa"')?></p>
			</div>

			<div class="badboy"></div>
		</div>

		<div class="login-with">
			<h2>or login with :</h2>
			<a href="<?php echo $google_url;?>" class="btn btn-small" ><i class="icon-google-plus-sign"></i>&nbsp;&nbsp;google</a>
		</div>
		</form>
	</div>
</div>
<?php $this->load->view('base/footer'); ?>