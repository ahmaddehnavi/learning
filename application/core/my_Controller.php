<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Auth_Controller extends CI_Controller
{
	public  $unread_message='';
	function __construct()
	{
		parent::__construct();

		$this->load->library('Auth');
		if (!$this->auth->is_logged_in()) {
			$this->session->set_userdata('next_page', current_url());
			redirect('user/login');
		}

		$this->load->model('message_model');

		$this->unread_message = $this->message_model->get_unread_number();
		if($this->unread_message ==0)$this->unread_message ='';
	}
}

class Ajax_Controller extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->library('Auth');
		if (!$this->auth->is_logged_in()) {
			exit;
		}
	}
}

class MY_Controller extends CI_Controller
{

}
/* End of file Home.php */
/* Location: ./application/core/MY_Controller.php */