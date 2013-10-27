<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Class_Post_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	function add_post_to_classes($post_id, $classes)
	{
		foreach ($classes as $class) {
			$this->db->query('INSERT INTO class_post ( post_id , class_id ) VALUES(' . $post_id . ',' . intval($class) . ')');
		}
		$this->db->affected_rows() == count($classes);
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */