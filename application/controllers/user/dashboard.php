<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends  Auth_Controller
{
    function __construct()
    {
        parent::__construct();

    }

    function index()
    {
        redirect('academy/classes');
    }
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */