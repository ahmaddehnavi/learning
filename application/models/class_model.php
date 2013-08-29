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
    public function create($academy_id, $field_id, $lesson_id, $prof_id)
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

    /**
     * @param $class_id
     * @param $student_id
     * @return bool
     */
    public function join($class_id, $student_id)
    {
        $sql = 'SELECT * FROM class_member WHERE class_id=? AND student_id=? LIMIT 1';
        $row = $this->db->query($sql, array($class_id, $student_id));
        if ($row->num_rows() > 0) {
            return TRUE;
        }

        $sql = 'INSERT INTO class_member(class_id, student_id) VALUES(?,?)';
        if (FALSE !== $this->db->query($sql, array($class_id, $student_id))) {
            return $this->db->insert_id();
        }

        return FALSE;
    }

    /**
     * @return CI_DB_result
     */
    public function get_suggest()
    {
        $this->load->model('profile_model');
        $academy_id = $this->profile_model->get_academy_id();
        $field_id   = $this->profile_model->get_field_id();
        $sql        =
            'SELECT class.class_id,academy.name AS academy_name,field_table.name AS field_name,lesson.name AS lesson_name ,profile.full_name AS prof_name
             FROM class
             JOIN academy ON academy.academy_id=class.academy_id AND class.academy_id=? AND class.field_id=?
             JOIN field_table ON field_table.field_id=class.field_id
             JOIN lesson ON lesson.lesson_id=class.lesson_id
             JOIN profile ON profile.user_id=class.prof_id';

//             JOIN class_member ON class_member.class_id=class.class_id AND student_id!=? ';

        return $this->db->query($sql, array($academy_id, $field_id, $this->auth->get_user_id()));
    }

    /**
     * @param $class_id
     * @param $academy
     * @param $field
     * @param $lesson
     * @param $prof
     * @return CI_DB_result
     */
    public function search($class_id, $academy, $field, $lesson, $prof)
    {
        $sql = 'SELECT class.*
                   FROM class WHERE class.class_id=?
                   JOIN academy ON academy.academy_id=class.academy_id AND academy.name= ?
                   JOIN field_table ON field_table.field_id=class.field_id AND field_table.name= ?
                   JOIN users ON users.users_id=class.users_id AND users.name= ?';

        return $this->db->query($sql, array($class_id, $academy, $field, $lesson, $prof));
    }

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */