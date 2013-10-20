<?php $this->load->view('base/header',array('title'=>'new password sent')); ?>
<style type="text/css">
	#message {
		text-align: center;
		margin-top: 100px;
		background-color: #00aa00;
		color: #fff;
		padding: 20px 5px;
	}
</style>
<nav>
	<menu>
		<li><?= anchor('/','home')?></li>
		<li><?=anchor('/academy','academy')?></li>
		<li class="active"><?=anchor('/user','user')?></li>
		<li><a href="<?=FILE_MANAGE_PATH?>">file management</a></li>
		<div class="badboy"></div>
	</menu>
	<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
		<li></li>
		<li></li>
		<li></li>
	</ul>
</nav>

<div id="message">
	new your password sent to mail.</br>
	please check your mail</br></br>
	<?=anchor('user/login','click here ')?> and login with new password.
</div>

</body>
</html>