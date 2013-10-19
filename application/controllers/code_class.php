<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Ahmad
 * Date: 10/19/13
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

class Code_Class extends CI_Controller{
	function generate(){
		$this->load->model('class_code_model');
		$c=$this->class_code_model->generate_code(1,2);
		echo
		'<pre>'.
		print_r($c).
		'</pre>';
	}
}