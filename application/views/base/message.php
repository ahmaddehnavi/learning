<?php $this->load->view('base/header',array('title'=>'message')); ?>
	<style type="text/css">
		#container {
			padding : 50px 0;
		}

		.message-box {
			margin    : 0 auto;
			width     : 330px;
			max-width : 100%;
			background-color: #fff;
			padding: 20px;
		}
		.message-box input , .btn{
			max-width: 100%;
		}

		.mini-phone .btn{
			width: 100%;
		}
		.mini-phone h2{
			text-align: center;
		}

		.mini-phone .message-box {
			margin : auto;
			padding: 5px;
		}

		.message-box h2 {
			border-bottom : 1px solid #aaa;
			margin-bottom : 15px;
			padding       : 10px 0;
			color         : #aaa;
		}

	</style>
	<nav>
		<menu>
			<li><?= anchor('/', 'home')?></li>
			<li><?=anchor('/academy', 'academy')?></li>
			<li class="active"><?=anchor('/user', 'user')?></li>
			<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>
	<div id="container">
		<div class="message-box widget">
			<?=$message;?>
		</div>
	</div>
<?php $this->load->view('base/footer'); ?>