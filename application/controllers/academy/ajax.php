<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends Ajax_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('academy_ajax_model');

	}

	function get_academy_list()
	{
		echo '[
		{
			"name": "Jake Harding",
      "url": "https://twitter.com/JakeHarding"
    },
		{
			"name": "Tim Trueman",
      "url": "https://twitter.com/timtrueman"
    },
		{
			"name": "Veljko Skarich",
      "url": "https://twitter.com/vskarich"
    }
		';
//				print_r(
//					$this->academy_ajax_model->get_academy_list());
	}

	function get_fields_list()
	{
		echo '{
    "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5"
    ]
}';
		print_r(
			$this->academy_ajax_model->get_list($this->input->post('academy')));
	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */