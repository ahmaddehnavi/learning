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

	public function notice_new_post($classes,$post_subject ,$post_body)
	{
		$this->CI->load->model('class_member_model');

		foreach($classes as $class ){
			$q=$this->CI->class_member_model->get_member_mails($class);
			if($q->num_rows()>0){
				$mail_list='';
				foreach($q->result() as $row){
					$mail_list.=$row->email.',';
				}

			$this->CI->email->from('no-reply@panda.com');
			$this->CI->email->to('');
			$this->CI->email->bcc($mail_list);
			$this->CI->email->subject('Panda Academy | '.$post_subject);
			$this->CI->email->message(
				$post_body.'</br>
				<a href="'.site_url('academy/classes/view/'.$class).'">click here to view your class.</a>
				or go to '.site_url('academy/classes/view/'.$class)
			);
			return $this->CI->email->send();
			}
		}
		return null;
	}
	public function new_message_notice($to,$message)
	{
		$this->CI->load->model('user_model');

			$this->CI->email->from('no-reply@panda.com');
			$this->CI->email->to($this->CI->user_model->get_mail_by_id($to));
			$this->CI->email->subject('Panda Academy | new message exist.');
			$this->CI->email->message(
				$message.'</br>
				<a href="'.site_url('user/messages/').'">click here to view your message</a>
				or go to '.site_url('user/messages/')
			);
			return $this->CI->email->send();
	}

}