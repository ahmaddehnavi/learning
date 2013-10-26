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

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/base/global.css"/>
	<!-- ############################################################################ -->

	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/home.css"/>
	<link rel="stylesheet" type="text/css" href="<?= FILES_CSS_PATH ?>/train_slideshow.css"/>

	<script src="<?= FILES_JS_PATH ?>/base/jquery-1.9.0.js"></script>
	<title>Panda Academy</title>
</head>
<body>

<a name="home">.</a>
<header>
	<div class="container">
		<div class="user">
			<?php
			if ($this->auth->is_logged_in()) {
				echo anchor('/academy/classes/', $this->auth->get_full_name());
			} else {
				echo anchor('/user/login/', 'sign in');
			}
			?>
		</div>
		<div class="logo"></div>
		<nav>
			<menu>
				<li class="active" id="pre_active">
					<a href="#home" onclick="return pageScroll(this);">get start</a></li>
				<li><a href="#slides" onclick="return pageScroll(this);">screen shot</a></li>
				<li><a href="#footer" onclick="return pageScroll(this);">about us</a></li>
				<li><a href="#">faq</a></li>
				<div class="badboy"></div>
			</menu>
		</nav>
		<div class="badboy"></div>
	</div>
</header>

<div class="content2">
	<div class="container">
		<a name="getstart">.</a>

		<h2 class="center">A Cloud-Enabled Desktop App for All Your Email</h2>
		<h4>Unified Inbox, Relevance Sorting, Smart Views</h4>
		<h4>Unified Inbox, Relevance Sorting</h4>
		<?=anchor('/user/register/', 'get started', 'class="button center"') ?>
	</div>
</div>


<div class="content">
	<div class="container">
		<a name="slides">.</a>

		<div class="slideshow" onmouseover="pauseSlider()" onmouseout="resumeSlider()">
			<ul class="images" id="slideshow">
				<li style="background-image:url('<?= FILES_IMG_PATH ?>/slideshow/1.jpg')"></li>
				<li style="background-image:url('<?= FILES_IMG_PATH ?>/slideshow/2.jpg')"></li>
				<li style="background-image:url('<?= FILES_IMG_PATH ?>/slideshow/3.jpg')"></li>
				<li style="background-image:url('<?= FILES_IMG_PATH ?>/slideshow/4.jpg')"></li>
				<li style="background-image:url('<?= FILES_IMG_PATH ?>/slideshow/5.jpg')"></li>
			</ul>
			<ul class="bullets">
				<script>
					for (var i = 0; i < 5; i++) {
						document.write("<li id=\"bullet" + i + "\" onclick=\"show(" + i + ",this);\"></li>");
					}
				</script>
			</ul>
		</div>

	</div>
</div>

<footer>
	<div class="container">
		<a name="footer"></a>

		<div class="column left">
			column1
		</div>
		<div class="column left">
			column2
		</div>
		<div class="column left">
			column3
		</div>
		<div class="badboy"></div>
	</div>
</footer>


<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>
<!--[if lt IE 9]>
<script src="<?=FILES_JS_PATH?>/base/jquery-1.9.0.js"></script>
<![endif]-->
<!--[if gte IE 9]><!-->
<script src="<?= FILES_JS_PATH ?>/base/jquery-2.0.3.js"></script>
<!--[endif]-->
<!-- ############################################################################ -->


<script type="text/javascript" src="<?= FILES_JS_PATH ?>/slider.js"></script>
<script type="text/javascript" src="<?= FILES_JS_PATH ?>/scroll.js"></script>

<script type="text/javascript">
	startSlider();
</script>
<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>
<!-- ############################################################################ -->

<script type="text/javascript" src="<?= FILES_JS_PATH ?>/js.js"></script>
<script type="text/javascript">
	$('img').error(function () {
		$(this).attr('src', "<?php echo FILES_IMG_PATH.'/no-image.jpg';?>");
	});
</script>
</body>
</html>