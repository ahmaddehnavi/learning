<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
		if ($this->auth->is_logged_in())
			redirect('/user/home');

		$google_url = '';
		try {
			$this->load->library('loginwithgoogle');
			if ($this->loginwithgoogle->is_logged_in()) {
				if ($this->auth->force_login($this->loginwithgoogle->get_mail()) !== FALSE) {
					$next_page = $this->session->userdata('next_page');
					redirect(empty($next_page) ? 'academy/classes' : $next_page);
				}
			}
			$google_url = $this->loginwithgoogle->get_auth_url();
		} catch (Exception $e) {
		}

		$this->load->library('form_validation');

		$base = 'required|trim|xss_clean';

		$this->form_validation->set_rules('username', 'username', $base . '|max_length[40]')
			->set_rules('password', 'Password', $base);

		$next_page = $this->session->userdata('next_page');
		$data      = array(
			'login_error' => FALSE,
			'registration_message' => $this->session->flashdata('registration_message'),
			'next_page' => empty($next_page) ? 'academy/classes' : $next_page,
			'google_url' => $google_url
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

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */