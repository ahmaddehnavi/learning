<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Classes extends Auth_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->model(array('class_model', 'post_model', 'class_member_model'));

	}

	function index()
	{
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_student_classes();
		if ($data['prof_class']->num_rows() == 0 && $data['student_class']->num_rows() == 0)
			redirect('academy/classes/manage');
		$this->load->view('academy/classes/list', $data);
	}

	function view($id, $page = 1)
	{
		$page--;
		if (!is_numeric($id)) {
			show_404();
		}
		$is_prof = FALSE;
		if ($this->class_member_model->is_non_blocked_student_of_class($id) === TRUE) {
			$members = $this->class_member_model->get_active_members($id);
		} elseif ($this->class_model->is_prof_of_class($id) === TRUE) {
			$members = $this->class_member_model->get_all_members($id);
			$is_prof = TRUE;
		} else {
			show_404();
		}

		$info            = $this->class_model->get_info($id);
		$data            = $this->post_model->get_class_posts($id, $page * 10);
		$data['members'] = $members;
		$this->load->library('pagination');
		$config['base_url']         = site_url('academy/classes/view/' . $id . '/');
		$config['total_rows']       = $data['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['lesson_name'] = $info['lesson_name'];
		$data['prof_name']   = $info['prof_name'];
		$data['new_change']  = $info['new_change'];
		$data['join_status'] = $info['join_status'];
		$data['is_prof']     = $is_prof;
		$data['class_id']    = $id;

		if ($is_prof) {
			$this->load->view('academy/classes/prof_view', $data);
		} else {
			$this->load->view('academy/classes/view', $data);
		}
	}

function booklet($id, $page = 1)
	{
		$page--;
		if (!is_numeric($id)) {
			show_404();
		}
		$is_prof = FALSE;
		if ($this->class_member_model->is_non_blocked_student_of_class($id) === TRUE) {
			$members = $this->class_member_model->get_active_members($id);
		} elseif ($this->class_model->is_prof_of_class($id) === TRUE) {
			$members = $this->class_member_model->get_all_members($id);
			$is_prof = TRUE;
		} else {
			show_404();
		}

		$info            = $this->class_model->get_info($id);
		$data            = $this->post_model->get_class_booklet($id, $page * 10);
		$data['members'] = $members;
		$this->load->library('pagination');
		$config['base_url']         = site_url('academy/classes/booklet/' . $id . '/');
		$config['total_rows']       = $data['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['lesson_name'] = $info['lesson_name'];
		$data['prof_name']   = $info['prof_name'];
		$data['new_change']  = $info['new_change'];
		$data['join_status'] = $info['join_status'];
		$data['is_prof']     = $is_prof;
		$data['class_id']    = $id;

		$this->load->view('academy/classes/booklet', $data);

	}

	function setting($id)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		if ($this->class_model->is_prof_of_class($id) === FALSE) {
			show_404();
		}

		$info            = $this->class_model->get_info($id);
		$data['members'] = $this->class_member_model->get_all_members($id);

		$data['lesson_name'] = $info['lesson_name'];
		$data['prof_name']   = $info['prof_name'];
		$data['join_status'] = $info['join_status'];
		$data['class_id']    = $id;
		$this->load->view('academy/classes/setting', $data);
	}

	function enable_join($id)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		$this->class_model->enable_join($id);
		redirect('academy/classes/setting/' . $id);
	}

	function disable_join($id)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		$this->class_model->disable_join($id);
		redirect('academy/classes/setting/' . $id);
	}

	function create()
	{
		$this->form_validation
			->set_rules('code1', 'activation code', 'trim|required')
			->set_rules('code2', 'activation code', 'trim|required')
			->set_rules('lesson_id', 'Lesson', 'trim|required|is_exist[lesson.lesson_id]');

		if ($this->form_validation->run()) {
			$this->load->model(array('class_code_model'));
			$code1      = $this->form_validation->set_value('code1');
			$code2      = $this->form_validation->set_value('code2');
			$academy_id = $this->class_code_model->get_academy_id($code1, $code2);
			$field_id   = $this->class_code_model->get_field_id($code1, $code2);

			if ($academy_id === FALSE or $field_id === FALSE) {
				$this->session->set_flashdata('invalid_code_error', 'invalid code , please get code from your academy.');
				redirect('academy/classes/manage');
			}

			$lesson  = $this->form_validation->set_value('lesson_id');
			$prof_id = $this->auth->get_user_id();
			$id      = $this->class_model->create($academy_id, $field_id, $lesson, $prof_id);
			if (FALSE !== $id) {
				$this->class_code_model->use_code($code1, $code2);
				redirect('/academy/classes/view/' . $id);
			}

		}

		redirect('academy/classes/manage');
	}



	function remove()
	{
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');

		if ($this->form_validation->run()) {
			$this->class_model->remove($this->form_validation->set_value('class_id'));
			$this->class_member_model->leave_all_students($this->form_validation->set_value('class_id'));
		}

		redirect('academy/classes/manage');
	}

	function manage()
	{
		$this->load->model('lesson_model');
		$data['suggest']       = $this->class_model->get_suggest();
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_full_student_classes();
		$data['lesson_list']   = $this->lesson_model->get_list();
		$data['error']         = $this->session->flashdata('invalid_code_error');
		$this->load->view('academy/classes/manage', $data);
	}

	function join()
	{
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');

		if ($this->form_validation->run()) {
			$student_id = $this->auth->get_user_id();
			$class_id   = $this->form_validation->set_value('class_id');
			$this->class_member_model->join($class_id, $student_id);
		}

		redirect('academy/classes/manage');
	}

	function leave()
	{
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural');

		if ($this->form_validation->run()) {
			$this->class_member_model->leave($this->form_validation->set_value('class_id'));
		}

		redirect('academy/classes/manage');
	}

	function update_members()
	{
		$this->form_validation
			->set_rules('class_id', 'Class id', 'trim|required')
			->set_rules('status', 'student status', 'trim|required|is_natural|greater_than[-1]|less_than[3]')
			->set_rules('members_id[]', 'members id', 'trim|required');

		if ($this->form_validation->run()) {
			$class_id   = $this->form_validation->set_value('class_id');
			$status     = $this->form_validation->set_value('status');
			$members_id = $this->input->post('members_id');

			if (is_array($members_id)) {
				$this->class_member_model->update_members_status($class_id, $members_id, $status);
			}
		}

		redirect('academy/classes/setting/' . intval($this->form_validation->set_value('class_id')));

	}

	function remove_blocked_members($class_id)
	{
		if (!is_numeric($class_id)) {
			show_404();
		}
		$this->class_member_model->remove_blocked_members($class_id);
		redirect('academy/classes/setting/' . $class_id);

	}
}


/* End of file Home.php */
/* Location: ./application/controllers/Home.php */