<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Class_Code_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function get_academy_id($code1, $code2)
	{
		$sql = '
		SELECT academy_id FROM class_code WHERE code1=? AND code2=? AND prof_id IS NULL LIMIT 1';
		$row = $this->db->query($sql, array($code1, $code2));
		if ($row->num_rows() === 1) {
			return $row->row('academy_id');
		}

		return FALSE;
	}

	public function get_field_id($code1, $code2)
	{
		$sql = '
		SELECT field_id FROM class_code WHERE code1=? AND code2=? AND prof_id IS NULL LIMIT 1';
		$row = $this->db->query($sql, array($code1, $code2));
		if ($row->num_rows() === 1) {
			return $row->row('field_id');
		}

		return FALSE;
	}

	/**
	 * @param $academy_id
	 * @param $field_id
	 * @return array|bool
	 */
	public function generate_code($academy_id, $field_id)
	{
		$data = array(
			'code1' => random_string('alnum', rand(6, 10)),
			'code2' => random_string('alnum', rand(6, 10)),
			'academy_id' => $academy_id,
			'field_id' => $field_id
		);

		if ($this->db->insert('class_code', $data) !== FALSE)
			return $data;

		return FALSE;
	}

	/**
	 * @param $code1
	 * @param $code2
	 * @return array|bool
	 */
	public function use_code($code1, $code2)
	{
		$sql = '
		UPDATE class_code SET  prof_id=?  WHERE code1=? AND code2=? AND prof_id IS NULL LIMIT 1';
		$row = $this->db->query($sql, array($this->auth->get_user_id(), $code1, $code2));
		if ($this->db->affected_rows() === 1) {
			return TRUE;
		}

		return FALSE;
	}
}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */