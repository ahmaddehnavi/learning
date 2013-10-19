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
//				print_r($q);
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
//			echo $this->CI->email->print_debugger().'</br>';
			}
		}
		return null;
	}

//	function _mail($subject,$body,){
//		$subject=''.$subject;
//		$body=''.$body;
//
//		foreach()
//	}
}