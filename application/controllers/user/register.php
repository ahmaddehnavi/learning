<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Register extends CI_Controller
{

	function index()
	{
		$this->load->library('form_validation');

		$base = 'trim|required|xss_clean';

		$this->form_validation
			->set_rules('full_name', 'full name', $base . '|max_length[40]')
			->set_rules('username', 'username', $base . '|max_length[40]|is_unique[user.username]')
			->set_rules('email', 'Email', $base . '|valid_email|max_length[50]|is_unique[user.email]');

$data['status']='';
		if ($this->form_validation->run()) {
			if (FALSE !== $this->auth->create_user(
				$this->form_validation->set_value('full_name'),
				$this->form_validation->set_value('username'),
//				$this->form_validation->set_value('password'),
				$this->form_validation->set_value('email')
			)
			) {
				$data['status']='your account create successful. please check your mail for continue.';
			}
		}
		$this->load->view('user/register',$data);

	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */