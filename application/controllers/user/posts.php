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
        $config['base_url'] = site_url('user/posts/page/');
        $config['total_rows'] = $data['total'];
        $config['per_page'] = 10;
        $config['use_page_numbers'] = TRUE;
        $config['uri_segment'] = 4;

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
        $config['base_url'] = site_url('user/posts/page/');
        $config['total_rows'] = $data['total'];
        $config['per_page'] = 10;
        $config['use_page_numbers'] = TRUE;
        $config['uri_segment'] = 4;

        $this->pagination->initialize($config);

        $data['pagination'] = $this->pagination->create_links();
        $this->load->view('user/post/list', $data);
    }

    private function class_check($str)
    {
        if ($str == 'test') {
            $this->form_validation->set_message('username_check', 'The %s field can not be the word "test"');
            return FALSE;
        } else {
            return TRUE;
        }
    }

    function publish()
    {
        $this->load->library('form_validation');
        $this->form_validation
            ->set_rules('subject', 'Subject', 'trim|required|alpha_dash')
            ->set_rules('body', 'post body', 'trim|required')
            ->set_rules('classes[]', 'Selected Classes', 'trim')//بررسی مالکیت کلاس
            ->set_rules('mail_notice', 'Mail notification', 'trim')
            ->set_rules('sms_notice', 'sms notification', 'trim')
            ->set_rules('post_type', 'post type', 'trim|required')
            ->set_rules('blog', 'blog publish', 'trim');

        $data['publish_error'] = '';
        if ($this->form_validation->run()) {
            $this->load->model(array('post_model'));
            $subject = $this->form_validation->set_value('subject');
            $body = $this->form_validation->set_value('body');
            $classes = $this->input->post('classes');
            $mail_notice = $this->form_validation->set_value('mail_notice');
            $sms_notice = $this->form_validation->set_value('sms_notice');
            $post_type = $this->form_validation->set_value('post_type');
            $blog = $this->form_validation->set_value('blog');

            $id = $this->post_model->create($post_type, $subject, $body);

            if (FALSE === $id) {
                $data['publish_error'] = 'error';
            } else {
                $this->load->model('class_post_model');
//				$this->load->library('notification');

                $this->class_post_model->add_post_to_classes($id, $classes);
//				if ($mail_notice == 1)
//					$this->notification->new_post_mail($id, $subject, $body, $classes);
//				if ($sms_notice == 1)
//					$this->notification->new_post_sms($id, $subject, $body, $classes);
//				redirect('user/posts/');
            }
        }

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

//	function remove()
//	{
//		$this->form_validation->set_rules('class_id', 'Class id', 'trim|required|is_natural|is_exist[class.class_id]');
//
//		if ($this->form_validation->run()) {
//			$this->load->model('class_model');
//			$this->class_model->remove($this->form_validation->set_value('class_id'));
//		}
//
//		redirect('academy/classes/manage');
//	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */