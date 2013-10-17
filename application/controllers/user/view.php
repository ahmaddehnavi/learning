<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class View extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model(array('profile_model', 'post_model'));
	}

	function u($username, $page = 0)
	{
		$data['user_info'] = $this->profile_model->get_info_by_username($username);
		if ($data['user_info']->num_rows() == 0)
			show_404();

		$posts                = $this->post_model->get_public_posts($data['user_info']->row('user_id'), $page * 10);
		$data['public_posts'] = $posts['posts'];

		$this->load->library('pagination');
		$config['base_url']         = site_url('user/view/u/' . $username . '/');
		$config['total_rows']       = $posts['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();


		$this->load->view('user/view', $data);
	}

	function id($user_id, $page = 0)
	{
		$user_id              = intval($user_id);
		$posts                = $this->post_model->get_public_posts($user_id, $page * 10);
		$data['public_posts'] = $posts['posts'];


		$this->load->library('pagination');
		$config['base_url']         = site_url('user/view/u/' . $user_id . '/');
		$config['total_rows']       = $posts['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 5;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['user_info'] = $this->profile_model->get_info_by_user_id($user_id);
		if ($data['user_info']->num_rows() == 0)
			show_404();
		$this->load->view('user/view', $data);
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */