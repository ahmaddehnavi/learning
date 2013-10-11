<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller
{

	function index()
	{
		if ($this->auth->is_logged_in())
			redirect('/user/home');


		$this->load->library('login_with_google');


		$this->load->library('form_validation');

		$base = 'required|trim|xss_clean';

		$this->form_validation->set_rules('username', 'username', $base . '|max_length[40]')
			->set_rules('password', 'Password', $base);

		$next_page = $this->session->userdata('next_page');
		$data      = array(
			'login_error' => FALSE,
			'registration_message' => $this->session->flashdata('registration_message'),
			'next_page' => empty($next_page) ? 'user/dashboard' : $next_page
		);

		if ($this->form_validation->run()) {
			$username = $this->form_validation->set_value('username');
			$password = $this->form_validation->set_value('password');

			if (FALSE !== ($user = $this->auth->login($username, $password))) {
				redirect($this->input->post('next_page'));
			}

			$data['login_error'] = TRUE;
		}

		$this->load->view('user/login', $data);
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */