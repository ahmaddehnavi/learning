<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Classes extends CI_Controller
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
        $this->load->view('academy/classes', $data);
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

        $data['suggest'] = $this->class_model->get_suggest();
        $this->load->view('academy/classes', $data);
    }

    function remove()
    {
        $data['suggest']       = $this->class_model->get_suggest();
        $data['prof_class']    = $this->class_model->get_prof_classes();
        $data['student_class'] = $this->class_model->get_student_classes();
        $this->load->view('academy/classes', $data);
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
        $this->load->view('academy/classes', $data);
    }

    function search()
    {
        $this->form_validation
            ->set_rules('academy', 'Academy', 'trim|required|is_exist[academy.name]')
            ->set_rules('field', 'Field', 'trim|required|is_exist[field.name]')
            ->set_rules('lesson', 'Lesson', 'trim|required|is_exist[lesson.name]');

        if ($this->form_validation->run()) {
            $this->load->model(array('academy_model', 'field_model', 'lesson_model'));
            $academy = $this->academy_model->get_id($this->form_validation->set_value('academy'));
            $field   = $this->field_model->get_id($this->form_validation->set_value('field'));
            $lesson  = $this->lesson_model->get_id($this->form_validation->set_value('lesson'));
            $prof_id = $this->auth->get_users_id();
            $id      = $this->class_model->create($academy, $field, $lesson, $prof_id);
            if (FALSE !== $id) {
                redirect('/academy/classes/view/' . $id);
            }

        }

        $data['suggest']       = $this->class_model->get_suggest();
        $data['prof_class']    = $this->class_model->get_prof_classes();
        $data['student_class'] = $this->class_model->get_student_classes();
        $this->load->view('academy/classes', $data);
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */