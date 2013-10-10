<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Logged_in extends CI_Controller
{

	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();

		if (!$this->auth->is_logged_in()) {
			show_404();
		}
	}

	// --------------------------------------------------------------------------

	/**
	 * Index
	 */
	public function index()
	{
		$this->load->view('user/logged_in');
	}

	// --------------------------------------------------------------------------

	/**
	 * logout
	 */
	public function logout()
	{
		$this->auth->log_out();
	}

	// --------------------------------------------------------------------------

	/**
	 * Change password
	 */
	public function change_password()
	{
		$this->load->helper(array('url', 'form'));
		$this->load->library('form_validation');

		$base = 'required|trim|xss_clean';

		$this->form_validation->set_rules(
			'password',
			'Password',
			$base . '|matches[password_conf]')
			->set_rules(
				'password_conf',
				'Password Confirmation',
				$base . '|min_length[5]');

		if ($this->form_validation->run()) {
			$this->auth->change_password($this->input->post('password'));

			$this->session->set_flashdata('message', 'Password Successfully Changed!');

			redirect('logged_in');
		}

		$this->load->view('user/change_password');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */