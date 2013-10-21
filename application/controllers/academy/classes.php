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
//			$is_prof = FALSE;
		} elseif ($this->class_model->is_prof_of_class($id) === TRUE) {
			$is_prof = TRUE;
		} else {
			show_404();
		}

		$info = $this->class_model->get_info($id);

		$data            = $this->post_model->get_class_posts($id, $page * 10);
		$data['members'] = $this->class_member_model->get_active_members($id);
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
		$data['is_prof']     = $is_prof;

		if ($is_prof) {
			$this->load->view('academy/classes/prof_view', $data);
		} else {
			$this->load->view('academy/classes/view', $data);
		}
	}

	function setting($id, $page = 0)
	{
//		if (!is_numeric($id)) {
//			show_404();
//		}
//		if ($this->class_member_model->is_validate_member($id)) {
//			show_404();
//		}
//
//		$info = $this->class_model->get_info($id);
//
//		$data            = $this->post_model->get_class_posts($id, $page * 10);
//		$data['members'] = $this->class_member_model->get_all_members($id);
//
//		$data['lesson_name'] = $info['lesson_name'];
//		$data['prof_name']   = $info['prof_name'];
//		$data['new_change']  = $info['new_change'];
//		$data['is_prof']     = ($info['prof_id'] === $this->auth->get_user_id());
//
//		$this->load->view('academy/classes/view', $data);

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

			$lesson = $this->form_validation->set_value('lesson_id');
			$prof_id = $this->auth->get_user_id();
			$id      = $this->class_model->create($academy_id, $field_id, $lesson, $prof_id);
			if (FALSE !== $id) {
				$this->class_code_model->use_code($code1,$code2);
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
		$data['error'] = $this->session->flashdata('invalid_code_error');
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
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');

		if ($this->form_validation->run()) {
			$this->class_member_model->leave($this->form_validation->set_value('class_id'));
		}

		redirect('academy/classes/manage');
	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */