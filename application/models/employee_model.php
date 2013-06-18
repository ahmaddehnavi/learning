<?php 
class Employee_model extends CI_Model{
	
function employee_getAll(){
	$this->load->database();
	$query=$this->db->get('employee');
	return $query->result();
}

function employee_get(){
	$this->load->database();
	$query=$this->db->select('employee',array('id'=>2));
	return $query;
}


} 