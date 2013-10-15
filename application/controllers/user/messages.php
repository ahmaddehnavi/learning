<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Messages extends Auth_Controller
{

	function index()
	{
//		$this->load->model('message_model');
//
//		$this->load->library('pagination');
//		$config['base_url'] = site_url('user/posts/page/');
////		$config['total_rows']       = $data['total'];
//		$config['per_page']         = 10;
//		$config['use_page_numbers'] = TRUE;
//		$config['uri_segment']      = 4;
//
//		$this->pagination->initialize($config);
//
//		$data['pagination'] = $this->pagination->create_links();
//
//		$data['messages'] = $this->message_model->get_message(10);
		$this->load->view('user/messages');
	}
//
//	function page($page)
//	{
//		$this->load->model('message_model');
//
//		$this->load->library('pagination');
//		$config['base_url'] = site_url('user/posts/page/');
////		$config['total_rows']       = $data['total'];
//		$config['per_page']         = 10;
//		$config['use_page_numbers'] = TRUE;
//		$config['uri_segment']      = 4;
//
//		$this->pagination->initialize($config);
//
//		$data['pagination'] = $this->pagination->create_links();
//
//		$data['messages'] = $this->message_model->get_message($page);
//		$this->load->view('user/login', $data);
//	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */