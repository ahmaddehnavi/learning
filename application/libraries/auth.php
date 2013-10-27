<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 *
 *
 *
 *
 *
 */

class Auth
{
	public static $status = array(
		'inactive' => 0,
		'active' => 1
	);

	// --------------------------------------------------------------------------

	/**
	 * Construct
	 */
	public function __construct()
	{
		$this->CI =& get_instance();
	}

	// --------------------------------------------------------------------------

	/**
	 * Log Out
	 *
	 * This method destroys the user session, and redirects to
	 * either the index URL of the app, or a user-defined url
	 *
	 * @param    string        url to redirect to:  controller/method
	 * @return    void
	 */
	public function log_out($redirect = '')
	{

		if (!isset($_SESSION)) {
			session_start();
		}
		$_SESSION['file_management']['disabled']  = TRUE;
		$_SESSION['file_management']['uploadURL'] = '../files/uploads/public';

		$this->CI->session->sess_destroy();
		session_unset();
		session_destroy();

		redirect($redirect);
	}

	// --------------------------------------------------------------------------

	/**
	 * Create new user
	 *
	 * This function creates a new user.  It does check to make
	 * sure a user with the same email or username does not already
	 * exists.  Return FALSE if the user exists, return the new user
	 * id if the user exists.
	 *
	 * @todo    consider just using callbacks in the controller
	 * to test for a unique username or email
	 *
	 * @param    string        username
	 * @param    string        password
	 * @param    string        email address
	 * @return    mixed        user_id
	 */
	public function create_user($full_name, $username, $email,$academy_id,$field_id)
	{
		$qry = $this->CI->db
			->where('username', $username)
			->or_where('email', $email)
			->get('user');

		if ($qry->num_rows() !== 0) {
			return FALSE;
		}

		$salt = $this->_create_salt();

		$data = array(
			'username' => $username,
			'password' => sha1($salt),
			'email' => $email,
			'salt' => $salt,
			'status' => self::$status['inactive'],
		);

		$this->CI->db->insert('user', $data);
		$user_id = $this->CI->db->insert_id();

		$this->create_profile($user_id, $full_name,$academy_id,$field_id);

		$this->send_user_information($user_id,$username,$email,$full_name);
		return $user_id;
	}

	private function create_profile($user_id, $full_name,$academy_id,$field_id)
	{
		$data = array(
			'user_id' => $user_id,
			'full_name' => $full_name,
			'academy_id'=>$academy_id,
			'field_id'=>$field_id
		);
		$this->CI->db->insert('profile', $data);

		@mkdir('files/uploads/' . $user_id . '/image', 0777, TRUE);
		@mkdir('files/uploads/' . $user_id . '/files', 0777, TRUE);
		@mkdir('files/uploads/' . $user_id . '/files/private/', 0777, TRUE);
		@mkdir('files/uploads/' . $user_id . '/files/private/exercise', 0777, TRUE);
		@mkdir('files/uploads/' . $user_id . '/files/public/image', 0777, TRUE);

		$htaccess = '
		deny from all
        ErrorDocument 403 /404.html
        ';
		@file_put_contents('files/uploads/' . $user_id . '/files/private/.htaccess', $htaccess);
//		chmod('files/uploads/' . $user_id . '/files/private/.htaccess', 666);
	}

	// --------------------------------------------------------------------------

	/**
	 * Is the user logged in?
	 *
	 * This method checks to see if the user is logged in or not
	 *
	 * @return    boolean
	 */
	public function is_logged_in()
	{
		if (!$this->CI->session->userdata('user_id')) {
			return FALSE;
		}

		$this->CI->db
			->where('user_id', $this->get_user_id())
			->limit(1)
			->set('last_active_time', time())
			->update('user');

		return TRUE;
	}

	// --------------------------------------------------------------------------


	// --------------------------------------------------------------------------

	/**
	 * Change Password
	 * This method updates the user password
	 * @return bool
	 */
	public function change_password($current_password, $new_password)
	{
		$current_password = sha1($current_password . $this->CI->session->userdata('salt'));

		$new_password = sha1($new_password . $this->CI->session->userdata('salt'));

		$this->CI->db
			->where('user_id', $this->CI->session->userdata('user_id'))
			->where('password', $current_password)
			->set('password', $new_password)
			->limit(1)
			->update('user');
		$r = $this->CI->db->affected_rows() == 1;
		// garbage collect on unused hashes
		$this->_hash_gc();

		return $r;
	}


	// --------------------------------------------------------------------------

	/**
	 * Hash garbage collection
	 *
	 * this function will remove expired hashes from the
	 * auth_passwd_request table
	 *
	 * @return void
	 */
	private function _hash_gc()
	{
		$timeout = ($this->CI->config->item('passwd_change_timeout')) ?
			$this->CI->config->item('passwd_change_timeout') : 24 * 60 * 60;

		$this->CI->db->where('request_time <', time() - $timeout)->delete('auth_passwd_request');
	}

	// --------------------------------------------------------------------------

	/**
	 * Log In Action
	 *
	 * This function does a couple of things.
	 * First, we query to see if the username exists in the database
	 * If it does, we grab the salt from that query.  Then concatenate
	 * the salt with the posted password, sha1() the whole things together.
	 * so if all goes well, we're golden.
	 *
	 * @param    string        username
	 * @param    string        password
	 * @return    mixed        FALSE on failure, user_id on success
	 */
	public function login($username, $password)
	{
		$qry = $this->CI->db
			->where('username', $username)
			->or_where('email', $username)
			->get('user');

		// No results, we're done.
		if ($qry->num_rows() !== 1) {
			return FALSE;
		}

		if (sha1($password . $qry->row('salt')) == $qry->row('password')) {
			$data = array(
				'user_id' => $qry->row('user_id'),
				'username' => $qry->row('username'),
				'email' => $qry->row('email'),
				'salt' => $qry->row('salt'),
				'status' => $qry->row('status')
			);
			$id   = $qry->row('user_id');
			$this->CI->session->set_userdata($data);

			if (!isset($_SESSION)) {
				session_start();
			}
			$_SESSION['file_management']['disabled']  = FALSE;
			$_SESSION['file_management']['uploadURL'] = '../files/uploads/' . $id;

			return $id;
		}

		return FALSE;
	}

	// --------------------------------------------------------------------------

	public function force_login($mail)
	{
		$qry = $this->CI->db->where('email', $mail)->get('user');

		// No results, we're done.
		if ($qry->num_rows() !== 1) {
			return FALSE;
		}

		$data = array(
			'user_id' => $qry->row('user_id'),
			'username' => $qry->row('username'),
			'email' => $qry->row('email'),
			'status' => $qry->row('status')
		);
		$id   = $qry->row('user_id');
		$this->CI->session->set_userdata($data);
		if (!isset($_SESSION)) {
			session_start();
		}
		$_SESSION['file_management']['disabled']  = FALSE;
		$_SESSION['file_management']['uploadURL'] = '../files/uploads/' . $id;

		return $id;
	}

	/**
	 * Forgot Password
	 *
	 * This function first checks to see if the user-submitted email address
	 * actually exists.  If it doesn't no point in going forward, so return FALSE
	 * if it does, generate the hash, insert it into the database and pass the hash
	 * back to the controller to use when the user is emailed.
	 *
	 * @param    string    email address
	 * @return    mixed    FALSE if no email addy, otherwise an array
	 */
	public function forgot_password($email_address)
	{
		// Does this email address exist in the database?
		$query = $this->CI->db->select('user_id, username')
			->get_where('user',
				array('email' => $email_address));

		if ($query->num_rows() === 0) {
			return FALSE; // No user, bail.
		}

		// Create a hash
		$hash = $this->_create_salt();

		$data = array(
			'user_id' => $query->row('user_id'),
			'hash' => $hash,
			'request_time' => time()
		);

		$this->CI->db->insert('auth_passwd_request', $data);

		return array(
			'hash' => $hash,
			'username' => $query->row('username'),
			'user_id' => $query->row('user_id')
		);
	}

	// --------------------------------------------------------------------------

	/**
	 * Test the reset hash
	 *
	 * This function takes the reset hash from the URL and tests against the
	 * auth_passwd_reset table.  Note, an optional configuration variable
	 * passwd_change_timeout is used here.  If it it not set, the passwd hash
	 * will be valid for 24 hours.
	 *
	 * @param    string        hash
	 * @return    mixed        FALSE or int user id
	 */
	public function test_reset_hash($hash)
	{
		$query = $this->CI->db->get_where('auth_passwd_request',
			array('hash' => $hash));

		if ($query->num_rows() === 0) {
			return FALSE;
		}

		$timeout = ($this->CI->config->item('passwd_change_timeout')) ?
			$this->CI->config->item('passwd_change_timeout') : 24 * 60 * 60;

		$this->CI->db->where('hash', $hash)->delete('auth_passwd_request');

		if (time() - $query->row('request_time') > $timeout) {
			return FALSE;
		}

		return $query->row('user_id');
	}

	public function get_full_name()
	{
		$this->CI->load->model('profile_model');

		return $this->CI->profile_model->get_full_name();
	}

	public function get_username()
	{
		$sql = "SELECT username FROM user WHERE user_id = ? LIMIT 1";

		return $this->CI->db->query($sql, array($this->get_user_id()))->row('username');
	}

	function get_last_active_time()
	{
		$sql = "SELECT last_active_time FROM user WHERE user_id=? LIMIT 1";

		return $this->CI->db->query($sql, array($this->get_user_id()))->row('last_active_time');

	}

	public function get_user_id()
	{
		return $this->CI->session->userdata('user_id');
	}

	public function send_new_password($user_id)
	{
		$this->CI->load->helper('string');

		$salt         = $this->_create_salt();
		$new_password = random_string('alnum', 10);
		$data         = array(
			'password' => sha1($new_password . $salt),
			'salt' => $salt
		);

		$this->CI->db->where('user_id', $user_id)->limit(1)->update('user', $data);

		if ($this->CI->db->affected_rows() === 1) {

			$mail = $this->CI->db->select('email')->where('user_id', $user_id)->limit(1)->get('user')->row('email');

			$this->CI->load->library('email');

			$this->CI->email->from('system@ahmaddehnavi.ir', 'System')
				->to($mail)
				->subject('Recovery Password, Panda Academy!')
				->message($this->CI->load->view('mail/account_information',array(
					'new_password'=>$new_password
				),TRUE))
				->send();

//			echo $this->CI->email->print_debugger();

			return TRUE;
		}

		return FALSE;
	}

	public function send_user_information($user_id,$username,$mail,$full_name)
	{
		$this->CI->load->helper('string');

		$salt         = $this->_create_salt();
		$new_password = random_string('alnum', 10);
		$data         = array(
			'password' => sha1($new_password . $salt),
			'salt' => $salt
		);

		$this->CI->db->where('user_id', $user_id)->limit(1)->update('user', $data);

		if ($this->CI->db->affected_rows() === 1) {

			$this->CI->load->library('email');

			$this->CI->email->from('no-reply@ahmaddehnavi.ir', 'System')
				->to($mail)
				->subject('Panda Academy | Account Information')
				->message($this->CI->load->view('mail/account_information',array(
					'username'=>$username,
					'password'=>$new_password,
					'full_name'=>$full_name,
					'user_id'=>$user_id
				),TRUE))
				->send();

			return TRUE;
		}


		return FALSE;
	}

	/**
	 * Create Salt
	 *
	 * This function will create a salt hash to be used in
	 * authentication
	 *
	 * @todo it might be nice to use /dev/urandom to create the salt,
	 * but it would need to be configurable, or at least fall back in case
	 * the host does not allow access there.  For the time being
	 * using random_string() from the string helper should do
	 * just plain fine.
	 *
	 * @return    string        the salt
	 */
	protected function _create_salt()
	{
		$this->CI->load->helper('string');

		return sha1(random_string('alnum', 32));
	}
}