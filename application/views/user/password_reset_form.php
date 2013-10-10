<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Password Reset Form</title>

</head>
<body>

<?php echo form_open('user/forgot_password/reset')?>
<?php echo form_hidden('user_id', $user_id); ?>
<?php echo validation_errors('<p style="color:red">', '</p>'); ?>

<label>Password:
	<?php echo form_password('password')?>
</label><br>
<label>Confirm Password:
	<?php echo form_password('password_conf')?>
</label><br>

<p><input type="submit" value="Continue &rarr;" name='submit'></p>
</form>
<p>Page rendered in {elapsed_time} seconds</p>

</body>
</html>