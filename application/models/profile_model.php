<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    public function get_field()
    {
        $row = $this->db->select('field_id')->where('user_id', $this->auth->get_user_id())->get('profiles');
        if ($row->num_rows() == 1) {
            $row = $this->db->select('name')->where('field_id', $row->row('field_id'))->get('field');
        }

        if ($row->num_rows() == 1) {
            return $row->row('name');
        }

        return '';
    }

    public function get_university()
    {
        $row = $this->db->select('university_id')->where('user_id', $this->auth->get_user_id())->get('profiles');
        if ($row->num_rows() == 1) {
            $row = $this->db->select('name')->where('university_id', $row->row('university_id'))->get('university');
        }

        if ($row->num_rows() == 1) {
            return $row->row('name');
        }

        return '';
    }

    public function get_full_name()
    {
        $row = $this->db->select('full_name')->where('user_id', $this->auth->get_user_id())->get('profiles');
        if ($row->num_rows() == 1) {
            return $row->row('full_name');
        }

        return '';
    }

    public function get_about()
    {
        $row = $this->db->select('about')->where('user_id', $this->auth->get_user_id())->get('profiles');
        if ($row->num_rows() == 1) {
            return $row->row('about');
        }

        return '';
    }

    public function update_academy($university, $field)
    {
        $data = array(
            'university_id' => $this->get_university_id($university),
            'field_id' => $this->get_field_id($field)
        );


        $this->db
            ->where('user_id', $this->auth->get_user_id())
            ->limit(1)
            ->update('profiles', $data);

        return $this->db->affected_rows();
    }

    public function get_university_id($university)
    {
        $row = $this->db->select('university_id')->where('name', $university)->get('university');
        if ($row->num_rows() == 1) {
            return $row->row('university_id');
        }

        return FALSE;
    }

    public function get_field_id($field)
    {
        $row = $this->db->select('field_id')->where('name', $field)->get('field');
        if ($row->num_rows() == 1) {
            return $row->row('field_id');
        }

        return FALSE;
    }

    public function update_personal($full_name, $about)
    {
        $data = array(
            'full_name' => $full_name,
            'about' => $about
        );


        $this->db
            ->where('user_id', $this->auth->get_user_id())
            ->limit(1)
            ->update('profiles', $data);

        return $this->db->affected_rows();
    }
}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */