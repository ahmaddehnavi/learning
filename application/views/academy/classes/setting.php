<?php $this->load->view('base/header', array('title' => 'classes | '.$lesson_name.' setting')); ?>
	<div id="container">

		<nav>
			<menu>
				<li><?= anchor('/', 'home')?></li>
				<li><?=anchor('/academy', 'academy', 'class="active"')?></li>
				<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
				<div class="badboy"></div>
			</menu>
			<ul class="collapse-btn btn-top toggle-on" collapse-target="nav">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</nav>
		<aside id="sidebar">
			<header>
				<?php echo anchor('/user/view/u/' . $this->auth->get_username(),
					'<img src="' . FILES_USERS_PATH . '/' . $this->auth->get_user_id() . '/image/profile_80.jpg"
							 width="40px" height="40px" id="user-image"/>' . $this->auth->get_full_name()
					, 'target="_blank"');
				?>
				&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-on" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>academy :</h2>
				<li class="active"><?php echo anchor("academy/classes", '<i class="icon-group"></i>classes') ?></li>
				<li><?php echo anchor("academy/classes/manage", '<i class="icon-cog"></i>manage') ?></li>
				<h2>user :</h2>

				<li><?php echo anchor('user/messages', '<i class="icon-inbox"></i>messages<b class="label">' . $this->unread_message . '</b>') ?></li>
				<li><?php echo anchor('user/posts', '<i class="icon-file-text"></i>posts') ?></li>
				<li><?php echo anchor('user/profile', '<i class="icon-user"></i>profile') ?></li>
				<li class="top-line"><?php echo anchor('user/logout', '<i class="icon-signout"></i>logout') ?></li>
			</menu>
		</aside>
		<div id="content">
			<header>
				<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
					<li></li>
					<li></li>
					<li></li>
				</ul>
				panda academy
			</header>
			<main>
				<section id="content-head">
					<section class="top">
						<ul>
							<li><?php echo anchor('home', 'home')?> </a>&nbsp;&gt;&nbsp;</li>
							<li><?php echo anchor('academy/home', 'academy')?> </a>&nbsp;&gt;&nbsp;</li>
							<li><?php echo anchor('academy/classes', 'classes')?> </a>&nbsp;&gt;&nbsp;</li>
							<li><?=$lesson_name?></li>
						</ul>
					</section>

					<section class="bottom">
						<h2><?=$lesson_name?> :</h2>

						<div> Professor : <?=$prof_name?></div>
						<?php echo anchor("academy/classes/view/".$class_id, '<i class="icon-arrow-left"></i> &nbsp;&nbsp;back to class','class="btn-fix btn-small right"') ?>
					</section>
				</section>
				<section id="content-body">

					<section>
						<section>
							<?php
							if ($join_status == 1) {
								echo anchor('academy/classes/disable_join/' . $class_id, '<i class="icon-lock"></i> &nbsp;&nbsp;disable join student.', 'class="btn-fix btn-small" style="margin:10px 10px 0px 10px"');
							} else {
								echo anchor('academy/classes/enable_join/' . $class_id, '<i class="icon-unlock"></i> &nbsp;&nbsp;enable join student.', 'class="btn-fix btn-small" style="margin:10px 10px 0px 10px"');
							}
							echo anchor('academy/classes/remove_blocked_members/' . $class_id, '<i class="icon-remove"></i> &nbsp;&nbsp;remove blocked student.', 'class="btn-fix btn-small btn-red" style="margin:10px 10px 0px 10px"');

							?>


						</section>

						<?php
						static $status = array('block', 'wait', 'active');
						echo form_open('academy/classes/update_members/')?>
						<input type="hidden" name="class_id" value="<?= $class_id ?>"/>
						<table id="student-list">
							<thead>
							<tr class="table-head">
								<th style="width: 20px"><input type="checkbox" id="select-all"/></th>
								<th colspan="2">student</th>
								<th>status</th>
							</tr>
							</thead>

							<tbody>
							<?php foreach ($members->result() as $member) { ?>
								<tr>
									<td><input type="checkbox" class="check" name="members_id[]"
											   value="<?= $member->student_id ?>"/></td>
									<td class="s-img"><img
											src="<?= FILES_USERS_PATH . '/' . $member->student_id ?>/image/profile_30.jpg"
											alt="" width="30" height="30"/></td>
									<td><?=anchor('user/view/id/'.$member->student_id,$member->student_name,'target="_blank"')?></td>
									<td><?=$status[$member->status]?></td>
								</tr>
							<? }?>
							</tbody>
						</table>
						<select name="status" id="select-status">
							<option value="2">active</option>
							<option value="1">wait</option>
							<option value="0">block</option>
						</select>
						<input type="submit" class="btn-fix" value="update"/>
						</form>
					</section>
				</section>
			</main>
		</div>
		<div class="badboy"></div>
	</div>
	<style type="text/css">
		#select-status{
			width: 100px;
		}

		#student-list img{
			margin: 0 !important;
			vertical-align: middle;
		}

		.s-img{
			width: 30px;
			background: #ffffff;
			padding: 0;
		}
	</style>
	<script type="text/javascript">
		$('tr').click(function () {
			$(this).find('.check').click();
		});
		$('#select-all').click(function(){

		if($(this).prop('checked')===false){
			$('.check').prop('checked', false);
		}else{
			$('.check').prop('checked', true);
		}
		});


		$(function() {
			$('.confirm-remove').confirmOn({
			questionText: 'Remove student action cannot be undone, are you sure?',
			textYes: 'Yes',
			textNo: 'No'
			},'click', function() {
//			$(this).;
			});

		$('.confirm-leave').confirmOn({
			questionText: 'are you sure?',
			textYes: 'Yes',
			textNo: 'No'
			},'click', function() {
			$(this).parent('form').submit();
			});
		});
	</script>
<?php $this->load->view('base/footer'); ?>