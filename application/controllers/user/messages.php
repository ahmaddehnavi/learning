<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Messages extends Auth_Controller
{
	function __construct(){
		parent::__construct();
		$this->load->model('message_model');
	}

	function index()
	{
		$data['messages_unread'] = $this->message_model->get_unread_messages(0);
		$this->load->view('user/messages/messages_unread', $data);
	}

	function sent($page = 0)
	{
		$this->load->library('pagination');
		$config['base_url']         = site_url('user/messages/sent/');
		$config['total_rows']       = $this->message_model->get_sent_number();
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;


		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['messages_sent'] = $this->message_model->get_sent_messages($page * 10);
		$this->load->view('user/messages/messages_sent', $data);
	}

	function inbox($page = 0)
	{
		$this->load->library('pagination');
		$config['base_url']         = site_url('user/messages/inbox/');
		$config['total_rows']       = $this->message_model->get_inbox_number();
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['messages_inbox'] = $this->message_model->get_inbox_messages($page * 10);

		$this->load->view('user/messages/messages_inbox', $data);
	}

	function send()
	{
		$this->load->library('form_validation');
		$this->form_validation
			->set_rules('to', 'receiver', 'required|is_natural|is_exist[user.user_id]')
			->set_rules('message', 'message', 'required');

		if ($this->form_validation->run()) {
			$to      = $this->form_validation->set_value('to');
			$message = $this->form_validation->set_value('message');
			if($this->message_model->send($to, $message)!==false){
				$this->load->library('notification');
				$this->notification->new_message_notice($to,$message);
			}
		}
//echo 'ssssssss';
		redirect('user/messages/sent');
//		echo 'sss';
	}

	function conversation($other_id = FALSE)
	{
		if ($other_id === FALSE) {
			redirect('user/messages');
		}
		$other_id = intval($other_id);

		$this->load->model('profile_model');
		$data['messages']        = $this->message_model->get_conversation($other_id);
		$data['other_full_name'] = $this->profile_model->get_full_name_by_id($other_id);
		$data['user_full_name']  = $this->profile_model->get_full_name();

		$this->message_model->conversation_mark_as_read($other_id);
		$this->load->view('user/messages/conversation', $data);
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */