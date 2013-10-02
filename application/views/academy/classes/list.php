<?php $this->load->view('base/header'); ?>
	<div id="container">

		<nav>
			<menu>
				<li><a href="#">item 1</a></li>
				<li class="active"><a href="#">item 2</a></li>
				<li><a href="#">item 3</a></li>
				<li><a href="#">item 4</a></li>
				<div class="badboy"></div>
			</menu>
			<ul class="collapse-btn btn-top toggle-off" collapse-target="nav">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</nav>
		<aside id="sidebar">
			<header><?php echo $this->auth->get_full_name() ?>&nbsp;</header>
			<ul class="collapse-btn btn-left toggle-off" collapse-target="#sidebar">
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<menu>
				<h2>academy :</h2>
				<li class="icon-class"><?php echo anchor("academy/classes", "classes") ?></li>
				<li class="icon-"><?php echo anchor("academy/lighteners", "lighteners") ?></li>
				<h2>user :</h2>
				<li class="icon-dashboard active"><?php echo anchor("user/dashboard", "dashboard") ?></li>
				<li class="icon-message"><?php echo anchor("user/messages", "messages<b class='label'>5</b>") ?></li>
				<li class="icon-post"><?php echo anchor("user/posts", "posts") ?></li>
				<li class="icon-profile"><?php echo anchor("user/profile", "profile") ?></li>
				<li class="icon-logout .top-line"><?php echo anchor("user/logout", "logout") ?></li>
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
							<li>classes</li>
						</ul>
					</section>

					<section class="bottom">
						<h2>Classes</h2>

						<div>list of your classes</div>
						<?=anchor('/academy/classes/manage', 'manage - / +', 'class="btn-fix btn-small right" title="add , remove , join , leave"');?>
					</section>
				</section>
				<section id="content-body">
					<section class="widget white">
						<header class="widget-head">your class</header>

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

							<?php foreach ($prof_class->result() as $row) { ?>
								<tr>
									<td><?php echo $row->class_id?></td>
									<td><?php echo $row->academy_name?></td>
									<td><?php echo $row->field_name?></td>
									<td><?php echo $row->lesson_name?></td>
									<td>you</td>
									<td>
										<?=anchor('/academy/classes/view/' . $row->class_id, 'view', 'class="btn btn-small"')?>
									</td>
								</tr>
							<?
							}
							foreach ($student_class->result() as $row) {
								?>
								<tr>
									<td><?php echo $row->class_id?></td>
									<td><?php echo $row->academy_name?></td>
									<td><?php echo $row->field_name?></td>
									<td><?php echo $row->lesson_name?></td>
									<td><?php echo $row->prof_name?></td>
									<td>
										<?=anchor('/academy/classes/view/' . $row->class_id, 'view', 'class="btn btn-small"')?>
									</td>
								</tr>
							<?php }?>


							</tbody>
						</table>

					</section>
			</main>
		</div>
		<div class="badboy"></div>
		<!--    <footer id="footer">footer</footer>-->
	</div>
<?php $this->load->view('base/footer'); ?>