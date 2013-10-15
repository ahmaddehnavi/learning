<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class View extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('profile_model');
	}

	function u($username)
	{
		$data['user_info'] = $this->profile_model->get_info_by_username($username);
		if ($data['user_info']->num_rows() == 0)
			show_404();
		$this->load->view('user/view', $data);
	}

	function id($user_id)
	{
		$data['user_info'] = $this->profile_model->get_info_by_user_id($user_id);
		if ($data['user_info']->num_rows() == 0)
			show_404();
		$this->load->view('user/view', $data);
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */