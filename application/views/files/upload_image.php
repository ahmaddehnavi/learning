<html>
<head>
	<title>Upload Form</title>
</head>
<body>

<?php echo $error;?>

<?php echo form_open_multipart('files/upload_image');?>

<input type="file" name="userfile" size="20"/>
<br/><br/>
<input type="submit" value="upload"/>

</form>

</body>
</html>