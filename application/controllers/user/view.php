<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class View extends CI_Controller
{
	function __construct()
	{
		parent::__construct();

	}

	function by_username()
	{
		$this->load->view('user/view');
	}

	function by_id($user_id)
	{
		$this->load->view('user/view');
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */