<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Change Password</title>

</head>
<body>

<?php echo form_open('user/change_password')?>
<?php echo validation_errors('<p style="color:red">', '</p>'); ?>
<label>Current Password:
	<input type="password" name="current_password" value="<?php echo set_value('current_password'); ?>"/>
</label><br>
<label>Password:
	<input type="password" name="new_password" value="<?php echo set_value('new_password'); ?>"/>
</label><br>
<label>Confirm Password:
	<input type="password" name="new_password_conf" value="<?php echo set_value('new_password_conf'); ?>"/>
</label><br>

<p><input type="submit" value="Continue &rarr;"></p>
</form>
</body>
</html>