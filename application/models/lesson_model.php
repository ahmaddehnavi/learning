<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Lesson_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function get_id_by_name($lesson)
	{
		$row = $this->db->select('lesson_id')->where('name', $lesson)->get('lesson');
		if ($row->num_rows() == 1) {
			return $row->row('lesson_id');
		}

		return FALSE;
	}

	public function get_name_by_id($lesson_id)
	{
		$row = $this->db->select('name')->where('lesson_id', $lesson_id)->get('lesson');
		if ($row->num_rows() == 1) {
			return $row->row('name');
		}

		return '';
	}

	public function get_list_by_field_id($field_id)
	{
		return $row = $this->db->select('lesson_id,name')->where('field_id',$field_id)->get('lesson');
	}

	public function get_list()
	{
		$this->load->model('profile_model');
		$field_id=$this->profile_model->get_field_id();
		return $row = $this->db->select('lesson_id,name')->where('field_id',$field_id)->get('lesson');
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */