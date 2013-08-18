<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('profile_model');
    }

    function index()
    {
        if ($this->input->post('form_num') == 1) {
            $this->form_validation
                ->set_rules('full_name', 'full name', 'trim|xss_clean')
                ->set_rules('about', 'about', 'trim|xss_clean');


            if ($this->form_validation->run()) {
                $this->profile_model->update_personal(
                    $this->form_validation->set_value('full_name'),
                    $this->form_validation->set_value('about')
                );
            }
        } else if ($this->input->post('form_num') == 2) {
            $this->form_validation
                ->set_rules('university', 'university', 'trim|xss_clean|callback_university_available')
                ->set_rules('field', 'field', 'trim|xss_clean|callback_field_available');

            if ($this->form_validation->run()) {
                $this->profile_model->update_academy(
                    $this->form_validation->set_value('university'),
                    $this->form_validation->set_value('field')
                );
            }
        }

        $data['full_name']  = $this->profile_model->get_full_name();
        $data['about']      = $this->profile_model->get_about();
        $data['university'] = $this->profile_model->get_university();
        $data['field']      = $this->profile_model->get_field();

        $this->load->view('user/profile', $data);
    }

    function university_available($name)
    {
        $this->load->model('university_model');
        if ($this->university_model->get_university_id($name) === FALSE) {
            $this->form_validation->set_message('university_available', 'University not exist ' . anchor('/academy/university/create', 'create university'));

            return FALSE;
        }

        return TRUE;
    }

    function field_available($name)
    {
        $this->load->model('field_model');
        if ($this->field_model->get_field_id($name) === FALSE) {
            $this->form_validation->set_message('field_available', 'field not exist ' . anchor('/academy/field/create', 'create field'));

            return FALSE;
        }

        return TRUE;
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */