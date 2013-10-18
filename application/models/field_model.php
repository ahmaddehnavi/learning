<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class field_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function get_id_by_name($field_table)
	{
		$row = $this->db->select('field_id')->where('name', $field_table)->get('field_table');
		if ($row->num_rows() == 1) {
			return $row->row('field_id');
		}

		return FALSE;
	}

	public function get_list()
	{
		return $row = $this->db->select('name')->get('field_table');
	}


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */