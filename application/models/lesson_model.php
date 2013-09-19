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


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */