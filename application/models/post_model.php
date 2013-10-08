<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Post_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function create($post_type, $subject, $body)
	{
		$sql = 'INSERT INTO post(author_id,post_type,subject,body) VALUES(?,?,?,?)';
		if (FALSE !== $this->db->query($sql, array($this->auth->get_user_id(), $post_type, $subject, $body))) {
			return $this->db->insert_id();
		}

		return FALSE;
	}

	public function remove($post_id)
	{
		$author_id = $this->auth->get_user_id();

		$sql = 'DELETE FROM post WHERE post_id=? AND author_id=? LIMIT 1';
		$this->db->query($sql, array($post_id, $author_id));

		return $this->db->affected_rows() === 1;
	}

	public function get_author_posts($offset = 0, $limit = 10)
	{
		$data['total'] = $this->db
			->where('author_id', $this->auth->get_user_id())
			->count_all_results('post');

		$data['posts'] = $this->db
			->select('author_id,full_name AS author_name,post_id,subject,body,post_type')
			->where('author_id', $this->auth->get_user_id())
			->offset($offset)
			->limit($limit)
			->order_by('post_id', 'desc')
			->join('profile', 'profile.user_id = post.author_id')
			->get('post');

		return $data;
	}

	public function get_class_posts($class_id, $offset = 0, $limit = 10)
	{
		$data['total'] = $this->db
			->where('class_id', $class_id)
			->count_all_results('class_post');

		$data['posts'] = $this->db
			->from('class_post')
			->where('class_id', $class_id)
			->join('post', 'class_post.post_id=post.post_id')
			->offset($offset)
			->limit($limit)
			->get();

		return $data;
	}

	public function get_info($class_id)
	{
		$this->load->model(array('profile_model', 'lesson_model'));

		$sql                 = 'SELECT * FROM class WHERE class_id=? LIMIT 1';
		$row                 = $this->db->query($sql, array($class_id));
		$data['prof_name']   = $this->profile_model->get_full_name_by_id($row->row('prof_id'));
		$data['lesson_name'] = $this->lesson_model->get_name_by_id($row->row('lesson_id'));
		$data['prof_id']     = $row->row('prof_id');
		$data['new_change']  = $this->get_number_of_new_change($class_id);

		return $data;
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */