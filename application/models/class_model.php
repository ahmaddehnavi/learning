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

	public function remove($class_id)
	{
		$pro_id = $this->auth->get_user_id();

		$sql = 'DELETE FROM class WHERE class_id=? AND prof_id=? LIMIT 1';
		$this->db->query($sql, array($class_id, $pro_id));

		return $this->db->affected_rows() == 1;
	}

	public function disable_join($class_id)
	{
		$pro_id = $this->auth->get_user_id();

		$sql = 'UPDATE class SET join_status = 0 WHERE class_id=? AND prof_id=? LIMIT 1';
		$this->db->query($sql, array($class_id, $pro_id));

		return $this->db->affected_rows() == 1;
	}

	public function enable_join($class_id)
	{
		$pro_id = $this->auth->get_user_id();

		$sql = 'UPDATE class SET join_status = 1 WHERE class_id=? AND prof_id=? LIMIT 1';
		$this->db->query($sql, array($class_id, $pro_id));

		return $this->db->affected_rows() == 1;
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
			 JOIN academy ON academy.academy_id=class.academy_id AND class.academy_id=?
			  	  AND class.field_id=? AND class.join_status = 1
			 JOIN field_table ON field_table.field_id=class.field_id
			 JOIN lesson ON lesson.lesson_id=class.lesson_id
			 JOIN profile ON profile.user_id=class.prof_id
			 AND class.class_id NOT IN (SELECT class_id FROM class_member WHERE student_id = ?)
			 LIMIT 100';

		return $this->db->query($sql, array($academy_id, $field_id, $this->auth->get_user_id()));
	}

	public function get_student_classes()
	{
		$sql        =
			'SELECT class.class_id,class.prof_id,lesson.name AS lesson_name ,profile.full_name AS prof_name
			 FROM class
			 JOIN class_member ON class.class_id=class_member.class_id AND class_member.student_id=?
			 JOIN lesson ON lesson.lesson_id=class.lesson_id
			 JOIN profile ON profile.user_id=class.prof_id
			 LIMIT 100';

		return $this->db->query($sql, array($this->auth->get_user_id()));
	}

	public function get_full_student_classes()
	{
		$sql        =
			'SELECT class.class_id,class.prof_id,lesson.name AS lesson_name ,profile.full_name AS prof_name
					,academy.name AS academy_name,field_table.name AS field_name , class_member.status AS joined_status
			 FROM class
			 JOIN academy ON academy.academy_id=class.academy_id
			 JOIN field_table ON field_table.field_id=class.field_id
			 JOIN class_member ON class.class_id=class_member.class_id AND class_member.student_id=?
			 JOIN lesson ON lesson.lesson_id=class.lesson_id
			 JOIN profile ON profile.user_id=class.prof_id
			 LIMIT 100';

		return $this->db->query($sql, array($this->auth->get_user_id()));
	}

	/**
	 * @return CI_DB_result
	 */
	public function get_prof_classes()
	{
		$sql        =
			'SELECT class.class_id,class.prof_id,academy.name AS academy_name,field_table.name AS field_name,lesson.name AS lesson_name
			 FROM class
			 JOIN academy ON academy.academy_id=class.academy_id AND class.prof_id=?
			 JOIN field_table ON field_table.field_id=class.field_id
			 JOIN lesson ON lesson.lesson_id=class.lesson_id
			 LIMIT 100';

		return $this->db->query($sql, array($this->auth->get_user_id()));
	}


	public function get_prof_id($class_id)
	{
		$sql = 'SELECT prof_id FROM class WHERE class_id=?';

		return $this->db->query($sql, array($class_id))->row('prof_id');
	}

	/**
	 * @param $class_id
	 * @return mixed
	 */
	public function get_info($class_id)
	{
		$this->load->model(array('profile_model', 'lesson_model'));

		$sql                 = 'SELECT * FROM class WHERE class_id=? LIMIT 1';
		$row                 = $this->db->query($sql, array($class_id));
		$data['prof_name']   = $this->profile_model->get_full_name_by_id($row->row('prof_id'));
		$data['lesson_name'] = $this->lesson_model->get_name_by_id($row->row('lesson_id'));
		$data['prof_id']     = $row->row('prof_id');
		$data['join_status'] = $row->row('join_status');
		$data['new_change']  = $this->get_number_of_new_change($class_id);

		return $data;
	}

	public function get_number_of_new_change($class_id)
	{
		$sql        = 'SELECT number_of_change FROM class_member WHERE class_id=? AND student_id=? LIMIT 1';
		$old_change = $this->db->query($sql, array($class_id, $this->auth->get_user_id()))->row('number_of_change');
		if (is_numeric($old_change))
			return $this->get_number_of_change($class_id) - $old_change;

		return '';
	}

	public function get_number_of_change($class_id)
	{
		$sql = 'SELECT number_of_change FROM class WHERE class_id=? LIMIT 1';

		return $this->db->query($sql, array($class_id))->row('number_of_change');
	}

	/**
	 * @param $class_id
	 * @return bool
	 */
	public function inc_number_of_change($class_id)
	{
		$sql = 'UPDATE class SET number_of_change=number_of_change+1 WHERE class_id IN (?) LIMIT 1';
		$this->db->query($sql, array(implode(',' ,$class_id)));

		return $this->db->affected_rows() == count($class_id);
	}

	/**
	 * @return CI_DB_result
	 */
	public function is_prof_of_class($class_id)
	{
		$sql = 'SELECT prof_id FROM class WHERE class_id=?  ';

		return $this->db->query($sql, array($class_id))->row('prof_id') === $this->auth->get_user_id();
	}


}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */