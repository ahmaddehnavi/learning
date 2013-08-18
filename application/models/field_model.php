<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Field_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    public function get_field_id($field)
    {
        $row = $this->db->select('field_id')->where('name', $field)->get('field');
        if ($row->num_rows() == 1) {
            return $row->row('field_id');
        }

        return FALSE;
    }


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */