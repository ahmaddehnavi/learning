<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	function get_mail_by_id($user_id){
		$sql = 'SELECT email FROM user WHERE user_id=?';
		return $this->db->query($sql, array($user_id))->row('email');
	}
}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */