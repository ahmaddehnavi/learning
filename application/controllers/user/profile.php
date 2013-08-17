<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
    }

    function index()
    {
        $this->form_validation
            ->set_rules('full_name', 'full name', 'trim|required|xss_clean')
            ->set_rules('university', 'university', 'trim|xss_clean')
            ->set_rules('field', 'field', 'trim|xss_clean');


        if ($this->form_validation->run()) {
            echo 'sssssssssssss';
            redirect('user/dashboard');
        }
        $this->load->view('user/profile');
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */