<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Post_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function create($post_type, $is_public, $subject, $body)
	{
		$sql = 'INSERT INTO post(author_id,post_type,is_public,subject,body) VALUES(?,?,?,?,?)';
		if (FALSE !== $this->db->query($sql, array($this->auth->get_user_id(), $post_type, $is_public, $subject, $body))) {
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
			->select('author_id,full_name AS author_name,is_public,post_id,subject,body,post_type')
			->where('author_id', $this->auth->get_user_id())
			->offset($offset)
			->limit($limit)
			->order_by('post_id', 'desc')
			->join('profile', 'profile.user_id = post.author_id')
			->get('post');

		return $data;
	}

	public function get_public_posts($author_id, $offset = 0, $limit = 10)
	{
		$author_id     = intval($author_id);
		$data['total'] = $this->db
			->where(array('author_id' => $author_id, 'is_public' => 1))
			->count_all_results('post');

		$data['posts'] = $this->db
			->select('author_id,full_name AS author_name,post_id,subject,body,post_type')
			->where(array('author_id' => $author_id, 'is_public' => 1))
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
			->select('post.* , profile.full_name AS author_name')
			->from('class_post')
			->where('class_id', $class_id)
			->join('post', 'class_post.post_id=post.post_id')
			->join('profile', 'profile.user_id=post.author_id')
			->offset($offset)
			->limit($limit)
			->order_by('post_id', 'desc')
			->get();

		return $data;
	}

	public function get_author_id($post_id)
	{
		$sql = 'SELECT author_id FROM post WHERE post_id=? LIMIT 1';
		$row = $this->db->query($sql, array($post_id));
		if ($row->num_rows() === 1) {
			return $row->row('author_id');
		}

		return FALSE;
	}

	public function is_can_upload_exercise($post_id)
	{
		$sql = "SELECT * FROM post WHERE post_id=? AND post_type='exercise' LIMIT 1";
		$row = $this->db->query($sql, array($post_id));
		if ($row->num_rows() !== 1) {
			return FALSE;
		}

		$sql = '
		SELECT * FROM class_member
		JOIN class ON class.class_id=class_member.class_id AND class_member.student_id = ? AND class_member.status = 2
		JOIN class_post ON class_post.post_id = ?';
		$row = $this->db->query($sql, array($this->auth->get_user_id(), $post_id));
		if ($row->num_rows() > 0) {
			return TRUE;
		}

		return FALSE;
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */