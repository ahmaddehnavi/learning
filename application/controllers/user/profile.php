<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends Auth_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->model(array('profile_model', 'field_model', 'academy_model'));
	}

	function index()
	{
		$data['form_1_msg'] = '';
		$data['upload_err'] = '';

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
				->set_rules('about', 'about', 'trim|xss_clean');


			if ($this->form_validation->run()) {
				$this->profile_model->update_about(
					$this->form_validation->set_value('about')
				);
			}

			if (!empty($_FILES['userfile'])) {
				$data['upload_err'] = $this->_upload_profile_image();
			}

		} else if ($this->input->post('form_num') == 3) {
			$this->form_validation
				->set_rules('academy_id', 'academy', 'trim|is_natural|is_exist[academy.academy_id]')
				->set_rules('field_id', 'field', 'trim|is_natural|is_exist[field_table.field_id]');

			if ($this->form_validation->run()) {
				$this->profile_model->update_academy(
					$this->form_validation->set_value('academy_id'),
					$this->form_validation->set_value('field_id')
				);
			}
		}

		$data['full_name']    = $this->profile_model->get_full_name();
		$data['about']        = $this->profile_model->get_about();
		$data['academy_id']   = $this->profile_model->get_academy_id();
		$data['field_id']     = $this->profile_model->get_field_id();
		$data['academy_list'] = $this->academy_model->get_list();
		$data['field_list']   = $this->field_model->get_list();

		$this->load->view('user/profile', $data);
	}

	function _upload_profile_image()
	{
		$config = array(
			'upload_path' => 'files/uploads/' . $this->auth->get_user_id() . '/image/',
			'allowed_types' => 'gif|jpg|png',
			'max_size' => '2048',
			'file_name' => 'profile.jpg',
			'overwrite' => TRUE,
		);

		if(!file_exists($config['upload_path']))
			@mkdir($config['upload_path']);
		$this->load->library('upload', $config);

		if ($this->upload->do_upload()) {

			$this->load->library('image_moo');
			$this->image_moo
				->load('files/uploads/' . $this->auth->get_user_id() . '/image/profile.jpg')

				->resize(24, 24)
				->save('files/uploads/' . $this->auth->get_user_id() . '/image/profile_24.jpg', TRUE)

				->resize(40, 40)
				->save('files/uploads/' . $this->auth->get_user_id() . '/image/profile_40.jpg', TRUE)

				->resize(50, 50)
				->save('files/uploads/' . $this->auth->get_user_id() . '/image/profile_50.jpg', TRUE)

				->resize(80, 80)
				->save('files/uploads/' . $this->auth->get_user_id() . '/image/profile_80.jpg', TRUE)

				->resize(100, 100)
				->save('files/uploads/' . $this->auth->get_user_id() . '/image/profile_100.jpg', TRUE);

			return TRUE;
		} else {
			return $this->upload->display_errors();
		}

		return FALSE;
	}
}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */