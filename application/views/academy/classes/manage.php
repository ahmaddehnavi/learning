<?php $this->load->view('base/header'); ?>
	<div id="container">

	<nav>
		<menu>
			<li><?= anchor('/', 'home')?></li>
			<li><?=anchor('/academy', 'academy', 'class="active"')?></li>
			<li><a href="<?= FILE_MANAGE_PATH ?>">file management</a></li>
			<div class="badboy"></div>
		</menu>
		<ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</nav>
	<aside id="sidebar">
		<header><?php echo 'f_name l_name' ?>&nbsp;</header>
		<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<menu>
			<h2>academy :</h2>
			<li class="icon-class active"><?php echo anchor("academy/classes", "classes") ?></li>
			<h2>user :</h2>
			<li><?php echo anchor("user/dashboard", '<i class="icon-dashboard"></i>dashboard') ?></li>
			<li><?php echo anchor('user/messages', '<i class="icon-inbox"></i>messages<b class="label">'.$this->unread_message.'</b>') ?></li>
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
						<li>manage</li>
					</ul>
				</section>

				<section class="bottom">
					<h2>Manage Classes</h2>

					<div>create , remove , join and leave classes.</div>
					<?=anchor('/academy/classes/', 'view mode', 'class="btn-fix btn-small right" title="view your classes"');?>
				</section>
			</section>
			<section id="content-body">
				<section class="widget white">
					<header class="widget-head">create class</header>
					<table class="table-form">
						<thead>
						<tr>
							<?=form_open('/academy/classes/create/', 'class=widget-body')?>
							<th>
								<select name="lesson_id">
									<option value="">select lesson ...</option>
									<?php
									foreach ($lesson_list->result() as $lesson) {
										echo '<option value="' . $lesson->lesson_id . '">' . $lesson->name . '</option>';
									}?>
								</select>
							</th>
							<th><input type="text" name="code1" placeholder="activation code 1"/></th>
							<th><input type="text" name="code2" placeholder="activation code 2"/></th>
							<th><input type="submit" value="create class" class="btn"/></th>
							<div class="badboy"></div>
							</form>
						</tr>
						<tr>
							<th class="form_err"><?=$error?></th>
							<?=form_error('lesson_id', '<td class="form_err">', '</td>')?>
							<?=form_error('code1', '<td class="form_err">', '</td>')?>
							<?=form_error('code2', '<td class="form_err">', '</td>')?>
						</tr>
						<tr class="table-head">
							<th>id</th>
							<th>academy</th>
							<th>field</th>
							<th>lesson</th>
							<th>action</th>
							<div class="badboy"></div>
						</tr>
						</thead>
						<tbody>
						<?php if ($prof_class->num_rows() == 0) { ?>
							<tr>
								<td colspan="6">No class exist.</td>
							</tr>
						<?php }foreach ($prof_class->result() as $row) { ?>
							<tr>
								<td><?php echo $row->class_id?></td>
								<td><?php echo $row->academy_name?></td>
								<td><?php echo $row->field_name?></td>
								<td><?php echo $row->lesson_name?></td>
								<td>
									<?=form_open('/academy/classes/remove/')?>
									<input type="hidden" name="class_id" value="<?= $row->class_id ?>"/>
									<input type="submit" value="remove" class="btn btn-small"/>

									<div class="badboy"></div>
									</form>
								</td>
							</tr>
						<? }?>
						</tbody>
					</table>
				</section>

				<section class="widget white" style="">
					<header class="widget-head">join to class</header>
					<table class="table-form">
						<thead>

						<tr class="table-head">
							<th>id</th>
							<th>academy</th>
							<th>field</th>
							<th>lesson</th>
							<th>prof</th>
							<th>action</th>
							<div class="badboy"></div>
						</tr>
						</thead>
						<tbody>
						<?php if ($suggest->num_rows() == 0) { ?>
							<tr>
								<td colspan="6">No suggest available. <?=anchor('user/profile','click here','class=btn-fix btn-small')?> for update your academy setting.</td>
							</tr>

						<?php
						}
						foreach ($suggest->result() as $row) {
							?>
							<tr>
								<td><?php echo $row->class_id?></td>
								<td><?php echo $row->academy_name?></td>
								<td><?php echo $row->field_name?></td>
								<td><?php echo $row->lesson_name?></td>
								<td><?php echo $row->prof_name?></td>
								<td>
									<?=form_open('/academy/classes/join/')?>
									<input type="hidden" name="class_id" value="<?= $row->class_id ?>"/>
									<input type="submit" value="join" class="btn btn-small"/>

									<div class="badboy"></div>
									</form>
								</td>
							</tr>

						<?php }?>
						</tbody>
					</table>
				</section>

				<section class="widget white">
					<header class="widget-head">joined class</header>
					<table class="table-form">
						<thead>
						<tr class="table-head">
							<th>id</th>
							<th>academy</th>
							<th>field</th>
							<th>lesson</th>
							<th>prof</th>
							<th>status</th>
							<th>action</th>
							<div class="badboy"></div>
						</tr>
						</thead>
						<tbody>

						<?php if ($student_class->num_rows() == 0) { ?>
							<tr>
								<td colspan="6">no class find.</td>
							</tr>
						<?php
						}else{
						$status=array(
							'block',
							'wait',
							'active'
						);
						foreach ($student_class->result() as $row) {
							?>
							<tr>
								<td><?php echo $row->class_id?></td>
								<td><?php echo $row->academy_name?></td>
								<td><?php echo $row->field_name?></td>
								<td><?php echo $row->lesson_name?></td>
								<td><?php echo $row->prof_name?></td>
								<td><?php echo $status[$row->joined_status]?></td>

								<td>
									<?=form_open('/academy/classes/leave/')?>
									<input type="hidden" name="class_id" value="<?= $row->class_id ?>"/>
									<input type="submit" value="leave" class="btn btn-small"/>

									<div class="badboy"></div>
									</form>
								</td>
							</tr>
						<?php }
						}?>
						</tbody>
					</table>
				</section>
		</main>
	</div>
	<div class="badboy"></div>
	</div>
<?php $this->load->view('base/footer'); ?>