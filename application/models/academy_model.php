<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Academy_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * @param $academy
     * @return bool|mixed
     */
    public function get_id($academy)
    {
        $row = $this->db->select('academy_id')->where('name', $academy)->get('academy');
        if ($row->num_rows() == 1) {
            return $row->row('academy_id');
        }

        return FALSE;
    }


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */