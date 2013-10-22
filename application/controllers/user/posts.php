<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Posts extends Auth_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('post_model');
	}

	function index()
	{
		$data = $this->post_model->get_author_posts(0);

		$this->load->library('pagination');
		$config['base_url']         = site_url('user/posts/page/');
		$config['total_rows']       = $data['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 4;

		$this->pagination->initialize($config);

		$data['pagination'] = $this->pagination->create_links();
		$this->load->view('user/post/list', $data);
	}

	function page($item = 1)
	{
		if (!is_numeric($item))
			$item = 1;

		$data = $this->post_model->get_author_posts(($item - 1) * 10);

		$this->load->library('pagination');
		$config['base_url']         = site_url('user/posts/page/');
		$config['total_rows']       = $data['total'];
		$config['per_page']         = 10;
		$config['use_page_numbers'] = TRUE;
		$config['uri_segment']      = 4;

		$this->pagination->initialize($config);

		$data['pagination'] = $this->pagination->create_links();
		$this->load->view('user/post/list', $data);
	}

	function publish()
	{
		$this->load->library('form_validation');
		$this->load->helper('htmlpurifier');
		$this->load->model('class_model');

		$this->form_validation
			->set_rules('subject', 'Subject', 'trim|required|xss_clean')
			->set_rules('body', 'post body', 'trim|required')
			->set_rules('classes[]', 'Selected Classes', 'trim')
			->set_rules('mail_notice', 'Mail notification', 'trim')
			->set_rules('post_type', 'post type', 'trim|required')
			->set_rules('is_public', 'public publish', 'trim');

		$data['publish_error'] = '';
		if ($this->form_validation->run()) {
			$subject    = $this->form_validation->set_value('subject');
			$body    = html_purify($this->form_validation->set_value('body'));
			$classes = $this->input->post('classes');
			if (is_array($classes)) {
				foreach ($classes AS $class) {
					if ($this->class_model->is_prof_of_class($class) == FALSE)
						exit('your request has been blocked.');
				}
			}

			$mail_notice = $this->form_validation->set_value('mail_notice');
			$post_type   = $this->form_validation->set_value('post_type');
			$is_public   = $this->form_validation->set_value('is_public');

			$id = $this->post_model->create($post_type, $is_public, $subject, $body);

			if (FALSE === $id) {
				$data['publish_error'] = 'error';
			} else {
				$this->load->model('class_post_model');
				$this->load->library('notification');
				if (is_array($classes)) {
					$this->class_post_model->add_post_to_classes($id, $classes);
				}
				if ($mail_notice == 1)
					$this->notification->notice_new_post($classes, $subject, $body);

				redirect('user/posts/');
			}
		}

		$data['prof_classes'] = $this->class_model->get_prof_classes();
		$this->load->view('user/post/publish', $data);

	}

	function view($id)
	{
		if (!is_numeric($id)) {
			show_404();
		}
		$info = $this->class_model->get_info($id);
//		$this->class_model->inc_number_of_change($id);
		$data = array(
			'lesson_name' => $info['lesson_name'],
			'prof_name' => $info['prof_name'],
			'new_change' => $info['new_change'],
			'is_prof' => ($info['prof_id'] === $this->auth->get_user_id()),
			'next_exam_time' => '2 day and 3 hour and 25 min'
		);
		$this->load->view('academy/classes/view', $data);

	}

	function remove()
	{
		$this->load->library('form_validation');
		$this->form_validation->set_rules('post_id', 'post id', 'trim|required|is_natural');
		$this->form_validation->set_rules('next', 'next page', 'trim|required|xss_clean');

		$next = 'user/posts';
		if ($this->form_validation->run()) {
			$this->load->model('post_model');
			$this->post_model->remove($this->form_validation->set_value('post_id'));
			$next = $this->form_validation->set_value('next');
		}
		redirect($next);
	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */