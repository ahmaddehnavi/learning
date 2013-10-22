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

				$is_send=$this->email->from('no-reply@pandaacademy.ir', 'Panda Academy')
					->to($email)
					->subject('Recovery Password, Panda Academy!')
					->message($message)
					->send();

				if($is_send)
				 redirect('user/lost_password/reset_requested');
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
		$this->load->view('user/reset_requested');
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

		$data['user_id'] = $this->auth->test_reset_hash($hash);

		if (!$data['user_id']) {
			show_404();
		}
		$data['is_error'] = $this->auth->send_new_password($data['user_id']);

		$this->load->view('user/password_send', $data);
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