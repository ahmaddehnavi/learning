<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Ahmad
 * Date: 10/19/13
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

class Code_Class extends CI_Controller{
	function generate($a=1,$f=2){
		$this->load->model('class_code_model');
		$c=$this->class_code_model->generate_code($a,$f);
		echo
		'<pre>'.
		print_r($c).
		'</pre>';
	}
}