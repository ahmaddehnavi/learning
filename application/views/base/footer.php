<!-- ############################################################################ -->
<script src="<?= FILES_JS_PATH ?>/base/prefixfree.min.js"></script>
<script src="<?= FILES_JS_PATH ?>/base/jquery-1.9.0.js"></script>
<!-- ############################################################################ -->

<script type="text/javascript" src="<?= FILES_JS_PATH ?>/js.js"></script>
<script type="text/javascript">
	$('img').error(function () {
		$(this).attr('src', "<?php echo FILES_IMG_PATH.'/no-image.jpg';?>");
	});
</script>
</body>
</html>