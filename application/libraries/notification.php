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
		$this->CI->load->library('email');
	}

	public function notice_new_post($classes, $post_subject, $post_body)
	{
		$this->CI->load->model('class_member_model');

		foreach ($classes as $class_id) {
			$q = $this->CI->class_member_model->get_active_member_mails($class_id);
			if ($q->num_rows() > 0) {
				$mail_list = '';
				foreach ($q->result() as $row) {
					$mail_list .= $row->email . ',';
				}

				$this->CI->email->from('no-reply@ahmaddehnavi.ir');
				$this->CI->email->to('');
				$this->CI->email->bcc($mail_list);
				$this->CI->email->subject('Panda Academy | ' . $post_subject);
				$this->CI->email->message($this->CI->load->view('mail/notify_new_post', array('post_body' => $post_body, 'class_id' => $class_id), TRUE));

				return $this->CI->email->send();
			}
		}

		return NULL;
	}

	public function new_message_notice($to, $message)
	{
		$this->CI->load->model('user_model');
		$this->CI->email->from('no-reply@ahmaddehnavi.ir');
		$this->CI->email->to($this->CI->user_model->get_mail_by_id($to));
		$this->CI->email->subject('Panda Academy | new message exist.');
		$this->CI->email->message($this->CI->load->view('mail/notify_new_message', array(
				'message' => $message,
				'from_name' => $this->CI->auth->get_full_name(),
				'from_id' => $this->CI->auth->get_user_id())
			, TRUE));


		return $this->CI->email->send();
	}

}