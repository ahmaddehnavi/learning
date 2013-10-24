<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Exercise extends Auth_Controller
{
	/**
	 * todo
	 */
	function __construct()
	{
		parent::__construct();

	}

	function upload()
	{


		$this->load->library('form_validation');
		$this->form_validation->set_rules('post_id', 'post id', 'trim|required|is_natural');
		if ($this->form_validation->run()) {
			if (($r = $this->_upload($this->form_validation->set_value('post_id'))) === TRUE) {
				$data['message'] = ' your exercise uploaded success.';
			} else $data['message'] = ' your exercise can not upload because : "' . $r . ' "';
		} else {
			$data['message'] = 'invalid submit information';
		}
		$this->load->view('base/message', $data);
	}

	function _upload($post_id)
	{

		$this->load->model(array('post_model'));

		if ($this->post_model->is_can_upload_exercise($post_id) === FALSE) {
			return "don't allow to upload exercise .";
		}

		$author_id = $this->post_model->get_author_id($post_id);




		if (!file_exists('files/uploads/' . $author_id . '/files/private/.htaccess')) {

			if (!file_exists('files/uploads/' . $author_id . '/files/private/')) {
				@mkdir('files/uploads/' . $author_id . '/files/private/', 0777, TRUE);
			}

			$htaccess = '
			deny from all
			ErrorDocument 403 /404.html
        ';
			@file_put_contents('files/uploads/' . $author_id . '/files/private/.htaccess', $htaccess);
//			chmod('files/uploads/' . $author_id . '/files/private/.htaccess', 777);
		}

		if (!file_exists('files/uploads/' . $author_id . '/files/private/exercise/'.$post_id)) {
			@mkdir('files/uploads/' . $author_id . '/files/private/exercise/'.$post_id, 0777, TRUE);
		}




		$full_name = $this->auth->get_full_name();
		$config    = array(
			'upload_path' => 'files/uploads/' . $author_id . '/files/private/exercise/' . $post_id . '/',
			'allowed_types' => 'rar|zip|pdf|docx',
			'max_size' => '10240',
			'file_name' => $this->auth->get_user_id() . '[' . $full_name . ']',
			'overwrite' => TRUE,
		);

		$this->load->library('upload', $config);
		if ($this->upload->do_upload()) {
			return TRUE;
		} else {
			return 'error ';//$this->upload->display_errors();
		}
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */