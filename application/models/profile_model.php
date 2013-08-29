<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    public function get_field()
    {
        $row = $this->db->select('field_id')->where('user_id', $this->auth->get_user_id())->get('profile');
        if ($row->num_rows() == 1) {
            $row = $this->db->select('name')->where('field_id', $row->row('field_id'))->get('field');
        }

        if ($row->num_rows() == 1) {
            return $row->row('name');
        }

        return '';
    }

    public function get_academy()
    {
        $row = $this->db->select('academy_id')->where('user_id', $this->auth->get_user_id())->get('profile');
        if ($row->num_rows() == 1) {
            $row = $this->db->select('name')->where('academy_id', $row->row('academy_id'))->get('academy');
        }

        if ($row->num_rows() == 1) {
            return $row->row('name');
        }

        return '';
    }

    public function get_full_name()
    {
        $row = $this->db->select('full_name')->where('user_id', $this->auth->get_user_id())->get('profile');
        if ($row->num_rows() == 1) {
            return $row->row('full_name');
        }

        return '';
    }

    public function get_about()
    {
        $row = $this->db->select('about')->where('user_id', $this->auth->get_user_id())->get('profile');
        if ($row->num_rows() == 1) {
            return $row->row('about');
        }

        return '';
    }

    public function update_academy($academy, $field)
    {
        $data = array(
            'academy_id' => $this->get_academy_id($academy),
            'field_id' => $this->get_field_id($field)
        );


        $this->db
            ->where('user_id', $this->auth->get_user_id())
            ->limit(1)
            ->update('profile', $data);

        return $this->db->affected_rows();
    }

    public function get_academy_id($academy)
    {
        $row = $this->db->select('academy_id')->where('name', $academy)->get('academy');
        if ($row->num_rows() == 1) {
            return $row->row('academy_id');
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
            ->update('profile', $data);

        return $this->db->affected_rows();
    }
}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */