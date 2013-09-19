<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Files extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));


		$this->load->model('files_model');
		$this->load->helper('download');
	}

//    function upload()
//    {
//        $this->load->view('files_view/upload_form', array('error' => '' ));
//    }

	function do_upload()
	{
		$config['upload_path']   = 'files/uploads/' . $this->auth->get_user_id();
		$config['allowed_types'] = 'gif|jpg|png|rar';
		$config['max_size']      = '10240';
		$config['max_width']     = '1024';
		$config['max_height']    = '768';

		if (!file_exists($config['upload_path'])) {
			mkdir($config['upload_path']);
		} else if (!is_dir($config['upload_path'])) {
			unlink($config['upload_path']);
			mkdir($config['upload_path']);
		}

		$this->load->library('upload', $config);

		if (!$this->upload->do_upload()) {
			$error = array('error' => $this->upload->display_errors());

			$this->load->view('files_view/upload_form', $error);
		} else {
			$data = array('upload_data' => $this->upload->data());
			$this->load->view('files_view/upload_success', $data);
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