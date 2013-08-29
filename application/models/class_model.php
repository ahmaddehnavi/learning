<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Class_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * @param $academy_id
     * @param $field_id
     * @param $lesson_id
     * @param $prof_id
     * @return int
     */
    public function create_class($academy_id, $field_id, $lesson_id, $prof_id)
    {
        $sql = 'SELECT class_id FROM class WHERE academy_id=? AND field_id=? AND lesson_id=? AND prof_id=? LIMIT 1';
        $row = $this->db->query($sql, array($academy_id, $field_id, $lesson_id, $prof_id));
        if ($row->num_rows() > 0) {
            return $row->row('class_id');
        }

        $sql = 'INSERT INTO class(academy_id,field_id,lesson_id,prof_id) VALUES(?,?,?,?)';
        if (FALSE !== $this->db->query($sql, array($academy_id, $field_id, $lesson_id, $prof_id))) {
            return $this->db->insert_id();
        }

        return FALSE;
    }
}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */