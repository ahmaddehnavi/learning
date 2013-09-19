<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->model('profile_model');
	}

	function index()
	{
		$data['form_1_msg'] = '';
		if ($this->input->post('form_num') == 1) {
			$this->form_validation
				->set_rules('current_password', 'current password', 'trim|required')
				->set_rules('new_password', 'new password', 'trim|required|min_length[5]')
				->set_rules('conf_new_password', 'confirm password', 'trim|required|matches[new_password]');


			if ($this->form_validation->run()) {
				if ($this->auth->change_password(
					$this->form_validation->set_value('current_password'),
					$this->form_validation->set_value('new_password')
				) === TRUE
				) {
					$data['form_1_msg'] = '<p class="success">password changed successful</p>.';
				} else {
					$data['form_1_msg'] = '<p class="form_err">current password incorrect.</p>';
				}

			}
		} else if ($this->input->post('form_num') == 2) {
			$this->form_validation
				->set_rules('full_name', 'full name', 'trim|xss_clean')
				->set_rules('about', 'about', 'trim|xss_clean');


			if ($this->form_validation->run()) {
				$this->profile_model->update_personal(
					$this->form_validation->set_value('full_name'),
					$this->form_validation->set_value('about')
				);
			}

			if (!empty($_FILES['userfile'])) {
				print_r($_FILES['userfile']);
				$config = array(
					'upload_path' => 'files/users/' . $this->auth->get_user_id() . '/profile/',
					'allowed_types' => 'gif|jpg|png',
					'max_size' => '2048',
					'file_name' => 'profile.jpg',
					'is_image' => TRUE,
					'$overwrite' => TRUE,
				);
				$this->load->library('upload', $config);

				if (!$this->upload->do_upload()) {
					echo  $this->upload->display_errors();

//					$this->load->view('file_view/upload_form', $error);
				} else {
//					$data = array('upload_data' => $this->upload->data());
//					$this->load->view('file_view/upload_success', $data);
				}
			}
		} else if ($this->input->post('form_num') == 3) {
			$this->form_validation
				->set_rules('academy', 'academy', 'trim|xss_clean|is_exist[academy.name]')
				->set_rules('field', 'field', 'trim|xss_clean|is_exist[field_table.name]');

			if ($this->form_validation->run()) {
				$this->profile_model->update_academy(
					$this->form_validation->set_value('academy'),
					$this->form_validation->set_value('field')
				);
			}
		}

		$data['full_name'] = $this->profile_model->get_full_name();
		$data['about']     = $this->profile_model->get_about();
		$data['academy']   = $this->profile_model->get_academy_name();
		$data['field']     = $this->profile_model->get_field_name();
		$data['image']     = $this->profile_model->get_image();
		$this->load->view('user/profile', $data);
	}


}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */