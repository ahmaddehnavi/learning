<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller
{
    function __construct()
    {
        parent::__construct();

    }

    function index()
    {
        $this->load->view('user/dashboard');
    }
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */