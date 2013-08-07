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
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */