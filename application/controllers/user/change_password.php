<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class change_password extends CI_Controller
{

	function index()
	{
		$this->load->helper(array('url', 'form'));
		$this->load->library('form_validation');

		$base = 'required|trim|xss_clean';

		$this->form_validation
			->set_rules('current_password', 'Current Password', $base)
			->set_rules('new_password', 'New Password', $base)
			->set_rules('new_password_conf', 'New Password Confirmation', $base . '|min_length[5]|matches[new_password]');

		if ($this->form_validation->run()) {
			$this->auth->change_password($this->form_validation->set_value('current_password'), $this->form_validation->set_value('new_password'));

			$this->session->set_flashdata('message', 'Password Successfully Changed!');

			redirect('user/logged_in');
		}

		$this->load->view('user/change_password');
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */