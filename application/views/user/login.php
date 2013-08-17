<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Home</title>
	<?php $this->load->view('_shared/css')?>
</head>
<body>

<?php echo $registration_message; ?>
<?php echo form_open('user/login')?>
	<?php echo validation_errors('<p style="color:red">', '</p>'); ?>
	<?php if ($login_error):?><p style="color:red">Invalid Username or Password</p><?php endif; ?>
	<label>Username:
		<?php echo form_input('username')?>
	</label><br>
	<label>Password:
		<?php echo form_password('password')?>
	</label><br>
	<p><?=anchor('forgot_password', 'Forgot password')?></p>
	<p><?=anchor('register', 'Register Here')?></p>
	
	<p><input type="submit" value="Continue &rarr;" name='submits'></p>
</form>
<p>Page rendered in {elapsed_time} seconds</p>

</body>
</html>