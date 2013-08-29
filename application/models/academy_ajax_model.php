<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Academy_Ajax_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * @param $academy
     * @return bool|mixed
     */
    public function get_list($name)
    {
        if (empty($name)) return FALSE;
        $sql = 'SELECT name FROM academy WHERE name LIKE %?% LIMIT 10';

        return $this->db->query($sql, strtolower($name))->result_array();
    }


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */