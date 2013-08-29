<?php
/**
 * Created by JetBrains PhpStorm.
 * users: Ahmad
 * Date: 7/17/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */

class Files_model extends CI_Model
{
    private $table_name = 'files';

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Add file properties to db
     *
     * @param    arr
     * @return    bool
     */
    function add_file($file_name, $client_name)
    {
//        var_dump($file[]);
        $users_id            = $this->tank_auth->get_users_id();
        $data['users_id']    = $users_id;
        $data['file_name']   = $file_name;
        $data['client_name'] = $client_name;
        $data['file_date']   = time();
        $this->db->insert($this->table_name, $data);

        return $this->db->insert_id();
    }

    /**
     * @param $file_id
     * @param $file_date
     * @return CI_DB_result
     */
    function get_file($file_id, $file_date)
    {
        $users_id = $this->tank_auth->get_users_id();
        $query    = $this->db
            ->where('file_id', $file_id)
            ->where('file_date', $file_date)
            ->get($this->table_name);
        if ($query->num_rows() == 1) {
            $query->row();
        }

        return FALSE;
    }


    /**
     * remove file details from db
     * @param $file_id
     * @return CI_DB_active_record
     *
     */
    function delete_file($file_id)
    {
        $users_id = $this->tank_auth->get_users_id();

        return $this->db
            ->where('users_id', $users_id)
            ->where('file_id', $file_id)
            ->delete($this->table_name);

        return $this->db->affected_rows() > 0;
    }


    /**
     * @param int $offset
     * @param int $limit
     * @return CI_DB_result
     */
    function get_my_files($offset = 0, $limit = 30)
    {
        $users_id = $this->tank_auth->get_users_id();

        return $this->db
            ->where('users_id', $users_id)
            ->offset($offset)
            ->limit($limit)
            ->get(upload::$table_name);
    }


}
/* End of file files_model.php */
/* Location: ./application/models/files_model.php */