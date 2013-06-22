<html>
<head>
    <title>My Form</title>
</head>
<body>

<?php echo validation_errors(); ?>

<form action = "register" method="post">

   <label for="mail">Email Address</label>
   <input type="text" name="mail" value="<?php echo set_value('mail'); ?>" size="50" />

    <label for="password">Password</label>
    <input type="password" name="password" value="<?php echo set_value('password'); ?>" size="50" />

    <label for="passconf">Password Confirm</label>
    <input type="password" name="passconf" value="<?php echo set_value('passconf'); ?>" size="50" />


    <div><input type="submit" value="Submit" /></div>

</form>

</body>
</html>