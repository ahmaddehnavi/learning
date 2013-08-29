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
                ->set_rules('academy', 'academy', 'trim|xss_clean|is_exist[academy.name]')
                ->set_rules('field', 'field', 'trim|xss_clean|is_exist[field_table.name]');

            if ($this->form_validation->run()) {
                $this->profile_model->update_academy(
                    $this->form_validation->set_value('academy'),
                    $this->form_validation->set_value('field')
                );
            }
        }

        $data['full_name'] = $this->profile_model->get_full_name();
        $data['about']     = $this->profile_model->get_about();
        $data['academy']   = $this->profile_model->get_academy_name();
        $data['field']     = $this->profile_model->get_field_name();

        $this->load->view('user/profile', $data);
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */