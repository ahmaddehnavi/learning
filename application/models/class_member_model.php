<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Class_Member_Model extends CI_Model
{
	/**
	 *status 0=block  , 1=wait , 2=active
 	 */
	function __construct()
	{
		parent::__construct();

	}

	/**
	 * @param $class_id
	 * @param $student_id
	 * @return bool
	 */
	public function join($class_id, $student_id)
	{
		$sql = 'SELECT * FROM class WHERE class_id=? AND join_status = 1 LIMIT 1';
		$row = $this->db->query($sql, array($class_id));
		if ($row->num_rows() === 0) {
			return FALSE;
		}

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

	public function leave($class_id)
	{
		$student_id = $this->auth->get_user_id();

		$sql = 'DELETE FROM class_member WHERE class_id=? AND student_id=? AND status!=0 LIMIT 1';
		$this->db->query($sql, array($class_id, $student_id));

		return $this->db->affected_rows() == 1;
	}

	public function get_all_members($class_id)
	{
		$sql = 'SELECT student_id , profile.full_name AS student_name
		FROM class_member
		JOIN profile ON profile.user_id=class_member.student_id
		WHERE class_id=?';

		return $this->db->query($sql, array($class_id));
	}

    public function get_active_members($class_id)
	{
		$sql = 'SELECT student_id , profile.full_name AS student_name
		FROM class_member
		JOIN profile ON profile.user_id=class_member.student_id AND class_member.status = 2
		WHERE class_id=?';

		return $this->db->query($sql, array($class_id));
	}

	public function get_active_member_mails($class_id)
	{
		$sql = 'SELECT user.email
		FROM class_member
		JOIN user ON user.user_id=class_member.student_id AND class_member.status = 2
		WHERE class_id=?';

		return $this->db->query($sql, array($class_id));
	}

	public function is_active_student_of_class($class_id)
	{
		$sql = 'SELECT * FROM class_member WHERE class_id=? AND student_id=? AND status = 2';

		return $this->db->query($sql, array($class_id, $this->auth->get_user_id()))->num_rows() === 1;
	}

	public function is_student_of_class($class_id)
	{
		$sql = 'SELECT * FROM class_member WHERE class_id=? AND student_id=? AND status = 2';

		return $this->db->query($sql, array($class_id, $this->auth->get_user_id()))->num_rows() === 1;
	}

	public function is_non_blocked_student_of_class($class_id)
	{
		$sql = 'SELECT * FROM class_member WHERE class_id=? AND student_id=? AND status != 0';

		return $this->db->query($sql, array($class_id, $this->auth->get_user_id()))->num_rows() === 1;
	}

//	public function reset_number_of_change($class_id)
//	{
//		$sql = 'UPDATE class SET number_of_change=number_of_change+1 WHERE class_id IN (?) LIMIT 1';
//		$this->db->query($sql, array(implode(',' ,$class_id)));
//
//		return $this->db->affected_rows() == count($class_id);
//	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */