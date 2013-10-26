<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Register extends CI_Controller
{

	function index()
	{
		$this->load->library('form_validation');

		$base = 'trim|required|xss_clean';

		$this->form_validation
			->set_rules('full_name', 'full name', $base . '|max_length[40]')
			->set_rules('username', 'username', $base . '|max_length[40]|is_unique[user.username]')
			->set_rules('email', 'Email', $base . '|valid_email|max_length[50]|is_unique[user.email]')
			->set_rules('academy_id', 'academy', 'trim|is_natural|is_exist[academy.academy_id]')
			->set_rules('field_id', 'field', 'trim|is_natural|is_exist[field_table.field_id]');

$data['status']='';
		if ($this->form_validation->run()) {
			if (FALSE !== $this->auth->create_user(
				$this->form_validation->set_value('full_name'),
				$this->form_validation->set_value('username'),
				$this->form_validation->set_value('email'),
				$this->form_validation->set_value('academy_id'),
				$this->form_validation->set_value('field_id')
			)
			) {
				$data['status']='your account created successful. please check your mail for continue.<br/>if dont receive mail use reset password for get password';
			}
		}

		$this->load->model(array('field_model', 'academy_model'));
		$data['academy_list'] = $this->academy_model->get_list();
		$data['field_list']   = $this->field_model->get_list();

		$this->load->view('user/register',$data);

	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */