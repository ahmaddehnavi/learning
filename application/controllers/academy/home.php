<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller
{
    function __construct()
    {
        parent::__construct();

    }

    function index()
    {
        $this->load->view('academy/home');
    }

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */