<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    public function get_field_name()
    {
        $row = $this->db->select('field_id')->where('user_id', $this->auth->get_user_id())->get('profile');
        if ($row->num_rows() == 1) {
            $row = $this->db->select('name')->where('field_id', $row->row('field_id'))->get('field_table');
        }

        if ($row->num_rows() == 1) {
            return $row->row('name');
        }

        return '';
    }

    public function get_academy_name()
    {
        if (($id = $this->get_academy_id()) !== FALSE) {
            $row = $this->db->select('name')->where('academy_id', $id)->get('academy');
            if ($row->num_rows() == 1) {
                return $row->row('name');
            }
        }

        return '';
    }

    public function get_academy_id()
    {
        $row = $this->db->select('academy_id')->where('user_id', $this->auth->get_user_id())->limit(1)->get('profile');
        if ($row->num_rows() === 1) {
            return $row->row('academy_id');
        }

        return FALSE;
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

    /**
     * @param $academy
     * @param $field
     * @return bool
     */
    public function update_academy($academy, $field)
    {
        $this->load->model(array('academy_model', 'field_model'));
        $data = array(
            'academy_id' => $this->academy_model->get_id_by_name($academy),
            'field_id' => $this->field_model->get_id_by_name($field)
        );
        $this->db
            ->where('user_id', $this->auth->get_user_id())
            ->limit(1)
            ->update('profile', $data);

        return $this->db->affected_rows() == 1;
    }

    public function get_field_id()
    {
        $row = $this->db->select('field_id')->where('user_id', $this->auth->get_user_id())->get('profile');
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