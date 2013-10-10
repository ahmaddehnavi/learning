<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * MY_Form_validation Class
 *
 * Extends Form_Validation library
 *
 * Allows for custom error messages to be added to the error array
 *
 * Note that this update should be used with the
 * form_validation library introduced in CI 1.7.0
 */
class MY_Form_validation extends CI_Form_validation
{
	function __construct()
	{
		parent::__construct();
	}

	public function is_exist($str, $field)
	{
		list($table, $field) = explode('.', $field);
		$query = $this->CI->db->limit(1)->get_where($table, array($field => $str));

		return $query->num_rows() === 1;
	}
}