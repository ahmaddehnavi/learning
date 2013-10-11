<?php
$google_client_id = "XXXXX";
$google_client_secret = "XXXXX";
$google_redirect_url = "XXXXX";
$google_developer_key = "XXXXX";

require_once 'src/Login_With_Google.php';
?>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Login with Google</title>
</head>
<body>
<h1>Login with Google</h1>

<?php if (!$user_login): //user is not logged in, show login button ?>
	<a href="<?php echo $authUrl; ?>">Click to login aparnet with Google account</a><br/>

<?php else: // user logged in ?>
	<ul>
		<li><strong>User id: </strong><?php echo $user_id ?></li>
		<li><strong>User name: </strong><?php echo $user_name ?></li>
		<li><strong>Email: </strong><?php echo $email ?></li>
		<li><strong><a href="<?php echo $profile_url ?>">Profile url</a></strong></li>
		<li><strong><a href="<?php echo $profile_image_url ?>">Profile image url</a></strong></li>
		<li><strong>Person markup: </strong><?php echo $personMarkup ?></li>
	</ul>
	<h3>All info user:</h3>
	<pre><?php print_r($user); ?></pre>
	<h4><a class="logout" href="?reset=1">Logout</a></h4>
<?php
endif;
?>
</body>
</html>