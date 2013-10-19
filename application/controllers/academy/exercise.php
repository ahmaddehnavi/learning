<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Exercise extends  Auth_Controller
{
	/**
	 * todo
	 */
	function __construct()
	{
		parent::__construct();

	}

	function index()
	{
		$this->load->view('academy/exercises');
	}

	function upload()
	{
		echo form_open_multipart('academy/exercise/upload') .

			form_hidden('post_id', '74') .
			'<input type="file" name="userfile" />' .
			form_submit() .
			form_close();
		echo validation_errors();

		$this->load->library('form_validation');
		$this->form_validation->set_rules('post_id', 'post id', 'trim|required|is_natural');
		if ($this->form_validation->run()) {
			if (($r = $this->_upload($this->form_validation->set_value('post_id'))) === TRUE)
				echo 'success';
			else echo $r;
		}
	}

	function _upload($post_id)
	{

		$this->load->model(array('post_model'));

		if ($this->post_model->is_can_upload_exercise($post_id) === FALSE) return FALSE;

		$author_id = $this->post_model->get_author_id($post_id);

		$full_name = $this->auth->get_full_name();
		$config    = array(
			'upload_path' => 'files/uploads/' . $author_id . '/files/private/exercise/' . $post_id . '/',
			'allowed_types' => 'rar|zip|pdf|docx',
			'max_size' => '10240',
			'file_name' => $this->auth->get_user_id() . '[' . $full_name . ']',
			'overwrite' => TRUE,
		);

		if (!file_exists($config['upload_path']))
			mkdir($config['upload_path'], 666, TRUE);

		$this->load->library('upload', $config);
		if ($this->upload->do_upload()) {
			return TRUE;
		} else {
			return $this->upload->display_errors();
		}
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */