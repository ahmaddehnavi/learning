<!doctype html>
<html lang="en-US">
<head>

	<meta charset="UTF-8"/>
	<meta name="author" content=""/>
	<meta name='keywords' content=''/>
	<meta name='description' content=''/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<meta name="HandheldFriendly" content="true"/>
	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"/>

	<script src="<?= FILES_JS_PATH ?>/base/html5shiv.js"></script>

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/base/global.css"/>
	<!-- ############################################################################ -->

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/style1.css"/>
	<?php
	if (!isset($title))
		echo '<title>Panda</title>';
	else
		echo '<title>Panda |' . $title . '</title>';
	?>
</head>

<body>