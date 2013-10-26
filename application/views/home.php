<!doctype html>
<html lang="en-US">
<head>

	<!-- global code  -->
	<meta charset="UTF-8"/>
	<meta name="author" content=""/>
	<meta name='keywords' content=''/>
	<meta name='description' content=''/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<meta name="HandheldFriendly" content="true"/>
	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"/>

	<!--[if lt IE 9]>
	<script src="<?=FILES_JS_PATH?>/base/html5shiv.js"></script>
	<![endif]-->
	<!-- ############################################################################ -->

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/home.css"/>
	<title>Panda Academy</title>
</head>
<body>
<div class="container" style="background-image: url('<?=FILES_IMG_PATH?>/bg.jpg');">

		<div class="user">
			<?php
			if ($this->auth->is_logged_in()) {
				echo anchor('/academy/classes/', $this->auth->get_full_name());
			} else {
				echo anchor('/user/login/', 'sign in');
			}
			?>
		</div>

		<h2 class="center">an interactive educational system</h2>
		<h4> to make a connection between teacher and students</h4>
		<?=anchor('/user/register/', 'get started', 'class="button center"') ?>
</div>
<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>
<script src="<?=FILES_JS_PATH?>/base/jquery-1.9.0.js"></script>
<script type="text/javascript" src="<?= FILES_JS_PATH ?>/js.js"></script>
</body>
</html>