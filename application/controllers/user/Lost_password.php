<?php

class Lost_password extends CI_Controller
{
	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
		$this->load->library('form_validation');
	}

	// --------------------------------------------------------------------------

	/**
	 * Index Page
	 */
	public function index()
	{

		$data['form_error'] = FALSE;

		$this->form_validation->set_rules(
			'email',
			'Email Address',
			'required|valid_email|trim|xss_clean'
		);

		if ($this->form_validation->run()) {
			$email = $this->form_validation->set_value('email');

			if (FALSE !== ($ud = $this->auth->forgot_password($email))) {
				$message = $this->_prep_message($ud, $email);

				$this->load->library('email');

				$this->email->from('system@academy.com', 'System')
					->to($email)
					->subject('Recovery Password, Panda Academy!')
					->message($message)
					->send();
//				echo $this->email->print_debugger();
				// redirect('forgot_password/reset_requested');
			}

			$data['form_error'] = TRUE;
		}

		$this->load->view('user/lost_password', $data);

	}

	// --------------------------------------------------------------------------

	/**
	 * Reset Requested
	 */
	public function reset_requested()
	{
		$this->load->view('reset_requested');
	}

	// --------------------------------------------------------------------------

	/**
	 * Reset
	 *
	 * @param    string
	 */
	public function reset($hash = NULL)
	{
		if (!$hash && !$this->input->post('user_id')) {
			show_404();
		}

		$base = 'required|trim|xss_clean';

		$this->form_validation->set_rules('password', 'Password', $base)
			->set_rules('password_conf', 'Password Confirmation', $base . '|min_length[5]|matches[password]');


		if ($this->form_validation->run()) {
			$this->auth->change_password($this->form_validation->set_value('password'));

			redirect('user/login');
		}


		$data['user_id'] = $this->auth->test_reset_hash($hash);

		if (!$data['user_id']) {
			show_404();
		}

		$this->load->view('user/password_reset_form', $data);
	}

	// --------------------------------------------------------------------------

	/**
	 * Prep email message
	 *
	 * @param    array    userdata
	 * @return    string
	 */
	private function _prep_message($ud)
	{
		return sprintf('
Greetings!

You requested to have your password reset.
Please visit this link to reset your password.  

%s
	
If you didn\'t do this, you can ignore this message.

Thanks!',

			site_url('user/lost_password/reset/' . $ud['hash']));
	}

}