<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Classes extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    function index()
    {
        $this->load->view('academy/classes');
    }

    function create()
    {
        $this->load->library('form_validation');

        $this->form_validation
            ->set_rules('academy', 'Academy', 'trim|required|is_exist[academy.name]')
            ->set_rules('field', 'Field', 'trim|required|is_exist[field.name]')
            ->set_rules('lesson', 'Lesson', 'trim|required|is_exist[lesson.name]');


        if ($this->form_validation->run()) {
            $this->load->model(array('class_model', 'academy_model', 'field_model', 'lesson_model'));
            $academy = $this->academy_model->get_id($this->form_validation->set_value('academy'));
            $field   = $this->field_model->get_id($this->form_validation->set_value('field'));
            $lesson  = $this->lesson_model->get_id($this->form_validation->set_value('lesson'));
            $prof_id = $this->auth->get_user_id();
            $id      = $this->class_model->create($academy, $field, $lesson, $prof_id);
            if (FALSE !== $id) {
                redirect('/academy/classes/view/' . $id);
            }

        }

        $this->load->view('academy/classes');

    }

    function remove()
    {
        $this->load->view('academy/classes');
    }

    function join()
    {
        $this->load->view('academy/classes');
    }

    function unjoin()
    {
        $this->load->view('academy/classes');
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */