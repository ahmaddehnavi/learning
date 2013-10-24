<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Message_Model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

	public function send($to, $message)
	{
		$sql = 'INSERT INTO message (from_id,to_id,message,time) VALUE(?,?,?,?)';
		$this->db->query($sql, array($this->auth->get_user_id(), $to, $message, time()));

		return $this->db->affected_rows() == 1;
	}


	/**
	 * @param $othor_user_id
	 * @return bool
	 */
	public function conversation_mark_as_read($othor_user_id)
	{
		$sql = 'UPDATE message SET is_read = 1 WHERE to_id = ? AND from_id=?';
		$this->db->query($sql, array($this->auth->get_user_id(),$othor_user_id));

		return $this->db->affected_rows() > 0;
	}

	public function all_mark_as_read()
	{
		$sql = 'UPDATE message SET is_read = 1 WHERE to_id = ?';
		$this->db->query($sql, array($this->auth->get_user_id()));

		return $this->db->affected_rows() > 0;
	}
	/**
	 * @param int $offset
	 * @return CI_DB_result
	 */
	public function get_sent_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id = message.to_id AND message.from_id=?
		ORDER BY  message_id desc
		LIMIT ?,10';
		return $this->db->query($sql, array($this->auth->get_user_id(),$offset));
	}

	/**
	 * @param int $offset
	 * @return CI_DB_result
	 */
	public function get_inbox_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id=message.from_id AND to_id=?
		ORDER BY message_id desc
		LIMIT ?,10';
		return $this->db->query($sql, array( $this->auth->get_user_id(),$offset));
	}

	/**
	 * @param int $offset
	 * @return CI_DB_result
	 */
	public function get_unread_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id=message.from_id AND to_id=? AND message.is_read = 0
		ORDER BY  message_id desc';
		return $this->db->query($sql, array( $this->auth->get_user_id()));
	}

	/**
	 * @return mixed
	 */
	public function get_inbox_number()
	{
		$sql = 'SELECT count(*) AS num FROM message WHERE to_id=?';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}

	/**
	 * @return mixed
	 */
	public function get_sent_number()
	{
		$sql = 'SELECT count(message_id) AS num FROM message WHERE from_id=? ';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}

	/**
	 * @return mixed
	 */
	public function get_unread_number()
	{
		$sql = 'SELECT count(message_id) AS num FROM message WHERE to_id=? AND is_read=0';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}

	/**
	 * @param $other_id
	 * @param int $offset
	 * @return CI_DB_result
	 */
	public function get_conversation($other_id,$offset=0)
	{
		$user_id=$this->auth->get_user_id();
		$sql='
		SELECT DISTINCT * FROM message
		WHERE (from_id= ? AND  to_id = ?) OR (from_id= ? AND  to_id = ?)
		ORDER BY  message_id desc
		LIMIT ?,10';
		return $this->db->query($sql, array($user_id,$other_id,$other_id,$user_id,$offset));
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */