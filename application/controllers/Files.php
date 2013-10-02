<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Files extends Auth_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));

		$this->load->model('files_model');
		$this->load->helper('download');
	}

	function index()
	{
//        $this->load->view('files/list');
	}

	function upload_file()
	{
		$config['upload_path']   = 'files/uploads/' . $this->auth->get_user_id() . '/files';
		$config['allowed_types'] = 'rar|zip|pdf';
		$config['max_size']      = '10240';

		$this->load->library('upload', $config);

		if (!$this->upload->do_upload()) {
			$error = array('error' => $this->upload->display_errors());

			$this->load->view('files/upload_file', $error);
		} else {
			$data = array('upload_data' => $this->upload->data());
			$this->load->view('files/upload_success', $data);
		}
	}

	function upload_image()
	{
		$config['upload_path']   = 'files/uploads/' . $this->auth->get_user_id() . '/images';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']      = '2048';
		$this->load->library('upload', $config);

		if (!$this->upload->do_upload()) {
			$error = array('error' => $this->upload->display_errors());

			$this->load->view('files/upload_image', $error);
		} else {
			$data = array('upload_data' => $this->upload->data());
			$this->load->view('files/upload_success', $data);
		}
	}

	function delete()
	{

	}

	function move()
	{

	}

	function rename()
	{

	}

	function copy()
	{

	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Files.php */