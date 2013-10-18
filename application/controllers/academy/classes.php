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

	function view($id, $page = 0)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		$is_prof=false;
		if ($this->class_member_model->is_student_of_class($id) === true) {
			$is_prof=false;
		}elseif ($this->class_model->is_prof_of_class($id) === true) {
			$is_prof=true;
		}else{
			show_404();
		}

		$info = $this->class_model->get_info($id);

		$data            = $this->post_model->get_class_posts($id, $page * 10);
		$data['members'] = $this->class_member_model->get_members($id);
		$this->load->library('pagination');
		$config['base_url']         = site_url('academy/classes/view/' . $id . '/');
		$config['total_rows']       = $data['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination']     = $this->pagination->create_links();

		$data['lesson_name']    = $info['lesson_name'];
		$data['prof_name']      = $info['prof_name'];
		$data['new_change']     = $info['new_change'];
		$data['is_prof']        = $is_prof;

		if($is_prof){
			$this->load->view('academy/classes/prof_view', $data);
		}else{
			$this->load->view('academy/classes/view', $data);
		}
	}

	function setting($id, $page = 0)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		if ($this->class_member_model->is_validate_member($id)) {
			show_404();
		}

		$info = $this->class_model->get_info($id);

		$data            = $this->post_model->get_class_posts($id, $page * 10);
		$data['members'] = $this->class_member_model->get_members($id);

		$data['lesson_name'] = $info['lesson_name'];
		$data['prof_name']   = $info['prof_name'];
		$data['new_change']  = $info['new_change'];
		$data['is_prof']     = ($info['prof_id'] === $this->auth->get_user_id());

		$this->load->view('academy/classes/view', $data);

	}

	function create()
	{
		$this->form_validation
			->set_rules('academy', 'Academy', 'trim|required|is_exist[academy.name]')
			->set_rules('field', 'Field', 'trim|required|is_exist[field_table.name]')
			->set_rules('lesson', 'Lesson', 'trim|required|is_exist[lesson.name]');

		if ($this->form_validation->run()) {
			$this->load->model(array('academy_model', 'field_model', 'lesson_model'));
			$academy = $this->academy_model->get_id_by_name($this->form_validation->set_value('academy'));
			$field   = $this->field_model->get_id_by_name($this->form_validation->set_value('field'));
			$lesson  = $this->lesson_model->get_id_by_name($this->form_validation->set_value('lesson'));
			$prof_id = $this->auth->get_user_id();
			$id      = $this->class_model->create($academy, $field, $lesson, $prof_id);
			if (FALSE !== $id) {
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
		$data['suggest']       = $this->class_model->get_suggest();
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_full_student_classes();
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