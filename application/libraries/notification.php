<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 *
 *
 *
 *
 *
 */

class Notification extends Auth_Controller
{

	public function __construct()
	{
		$this->CI =& get_instance();
//		$this->load->library();
	}

	public function notice_new_post($post_id, $subject, $body, $classes)
	{

	}
}