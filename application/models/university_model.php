<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class University_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * @param $university
     * @return bool|mixed
     */
    public function get_university_id($university)
    {
        $row = $this->db->select('university_id')->where('name', $university)->get('university');
        if ($row->num_rows() == 1) {
            return $row->row('university_id');
        }

        return FALSE;
    }


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */