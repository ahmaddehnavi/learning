<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends CI_Controller
{

	function index()
	{
		$this->auth->log_out();
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */