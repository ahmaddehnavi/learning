<?php $this->load->view('base/header'); ?>
<style type="text/css">
	#container {
		padding : 50px 0;
	}

	.login-form {
		margin    : 0 auto;
		width     : 330px;
		max-width : 100%
	}

	.login-form input , .btn{
		max-width: 100%;
	}

	.mini-phone .btn{
		width: 100%;
	}
	.mini-phone h2{
		text-align: center;
	}
	.mini-phone .login-form {
		margin : auto;
	}

	.login-form h2 {
		border-bottom : 1px solid #aaa;
		margin-bottom : 15px;
		padding       : 10px 0;
		color         : #aaa;
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
<div id="container">
	<div class="login-form widget">
		<h2>reset password</h2>
		<?php echo form_open('user/lost_password')?>
		<input type="email" name="email" placeholder="mail"/>
		<input type="submit" value="reset password" class="btn" name='submit'>
		</form>

		<?php echo validation_errors('<p style="color:red">', '</p>'); ?>
		<?php if ($form_error): ?><p style="color:red">An error occurred, please try again</p><?php endif; ?>
	</div>
</div>
<?php $this->load->view('base/footer'); ?>