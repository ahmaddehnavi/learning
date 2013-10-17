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

	public function get_sent_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id = message.to_id AND (from_id=?)
		ORDER BY time
		LIMIT ?,10';
		return $this->db->query($sql, array($this->auth->get_user_id(),$offset));
	}

	public function get_inbox_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id=message.from_id AND to_id=?
		ORDER BY time
		LIMIT ?,10';
		return $this->db->query($sql, array( $this->auth->get_user_id(),$offset));
	}

	public function get_unread_messages($offset = 0)
	{
		$sql='
		SELECT message.* , profile.full_name
   	    FROM message
		JOIN profile ON profile.user_id=message.from_id AND to_id=? AND message.is_read = 0
		ORDER BY time';
		return $this->db->query($sql, array( $this->auth->get_user_id()));
	}

	public function get_inbox_number()
	{
		$sql = 'SELECT count(*) AS num FROM message WHERE to_id=?';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}
	public function get_sent_number()
	{
		$sql = 'SELECT count(*) AS num FROM message WHERE from_id=? ';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}
	public function get_unread_number()
	{
		$sql = 'SELECT count(*) AS num FROM message WHERE to_id=? AND is_read=0';
		return $this->db->query($sql, array($this->auth->get_user_id()))->row('num');
	}


	public function get_conversation($other_id,$offset=0)
	{
		$user_id=$this->auth->get_user_id();
		$sql='
		SELECT DISTINCT * FROM message
		WHERE (from_id= ? AND  to_id = ?) OR (from_id= ? AND  to_id = ?)
		ORDER BY time
		LIMIT ?,10';
		return $this->db->query($sql, array($user_id,$other_id,$other_id,$user_id,$offset));
	}

}
/* End of file academy_model.php */
/* Location: ./application/models/academy_model.php */