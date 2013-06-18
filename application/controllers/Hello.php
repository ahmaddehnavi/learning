<?php

class Hello extends CI_Controller
{
    function you($name = "")
    {
        $data['name'] = ($name) ? $name : 'ahmad';
        $data['age'] = 21;
        $this->load->view('you_view', $data);
    }

    function getTest()
    {
        echo '<pre>';
        print_r(func_get_args());
        echo '</pre>';
    }
}