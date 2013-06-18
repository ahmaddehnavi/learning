<?php
class Employee extends CI_Controller
{

    function getAll()
    {
        $this->load->model('employee_model');
        $data['query'] = $this->employee_model->employee_getAll();
        $this->load->view('employee_viewall', $data);
    }

//	function get(){
//		$this->load->model('employee_model');
//		$data['query']=$this->employee_model->employee_get();
//		$this->load->view('employee_viewall',$data);
//	}
    function get($id)
    {
        echo $id;
    }
}
