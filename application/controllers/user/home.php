<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class home extends  Auth_Controller
{
	function __construct()
	{
		parent::__construct();

	}

	function index()
	{
		redirect('user/dashboard');
	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */