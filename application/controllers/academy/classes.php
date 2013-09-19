<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Classes extends Auth_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->model('class_model');

	}

	function index()
	{
		$data['suggest']       = $this->class_model->get_suggest();
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_student_classes();
		$this->load->view('academy/classes/list', $data);
	}

	function view($id)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		$info = $this->class_model->get_info($id);
//		$this->class_model->inc_number_of_change($id);
		$data = array(
			'lesson_name' => $info['lesson_name'],
			'prof_name' => $info['prof_name'],
			'new_change' => $info['new_change'],
			'is_prof' => ($info['prof_id'] === $this->auth->get_user_id()),
			'next_exam_time' => '2 day and 3 hour and 25 min'
		);
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
			$this->load->model('class_model');
			$this->class_model->remove($this->form_validation->set_value('class_id'));
		}

		redirect('academy/classes/manage');
	}

	function manage()
	{
		$data['suggest']       = $this->class_model->get_suggest();
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_student_classes();
		$this->load->view('academy/classes/manage', $data);
	}

	function join()
	{
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');

		if ($this->form_validation->run()) {
			$this->load->model('class_model');
			$student_id = $this->auth->get_user_id();
			$class_id   = $this->form_validation->set_value('class_id');
			$this->class_model->join($class_id, $student_id);
		}

		$data['suggest']       = $this->class_model->get_suggest();
		$data['prof_class']    = $this->class_model->get_prof_classes();
		$data['student_class'] = $this->class_model->get_student_classes();
		redirect('academy/classes/manage');
	}

	function leave()
	{
		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');

		if ($this->form_validation->run()) {
			$this->load->model('class_model');
			$this->class_model->leave($this->form_validation->set_value('class_id'));
		}

		redirect('academy/classes/manage');
	}
//
//	function search()
//	{
//		$this->form_validation
//			->set_rules('academy', 'Academy', 'trim|required|is_exist[academy.name]')
//			->set_rules('field', 'Field', 'trim|required|is_exist[field.name]')
//			->set_rules('lesson', 'Lesson', 'trim|required|is_exist[lesson.name]');
//
//		if ($this->form_validation->run()) {
//			$this->load->model(array('academy_model', 'field_model', 'lesson_model'));
//			$academy = $this->academy_model->get_id($this->form_validation->set_value('academy'));
//			$field   = $this->field_model->get_id($this->form_validation->set_value('field'));
//			$lesson  = $this->lesson_model->get_id($this->form_validation->set_value('lesson'));
//			$prof_id = $this->auth->get_users_id();
//			$id      = $this->class_model->create($academy, $field, $lesson, $prof_id);
//			if (FALSE !== $id) {
//				redirect('/academy/classes/view/' . $id);
//			}
//
//		}
//
//		$data['suggest']       = $this->class_model->get_suggest();
//		$data['prof_class']    = $this->class_model->get_prof_classes();
//		$data['student_class'] = $this->class_model->get_student_classes();
//		$this->load->view('academy/classes', $data);
//	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */