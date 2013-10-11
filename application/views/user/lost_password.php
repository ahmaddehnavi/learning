<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Home</title>
</head>
<body>

<?php echo form_open('user/lost_password')?>
<?php echo validation_errors('<p style="color:red">', '</p>'); ?>
<?php if ($form_error): ?><p style="color:red">An error occurred, please try again</p><?php endif; ?>
<label>Email Address:
	<?php echo form_input('email')?>
</label><br>

<p><input type="submit" value="reset password" name='submit'></p>
</form>
</body>
</html>