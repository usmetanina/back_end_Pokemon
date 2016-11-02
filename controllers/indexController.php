<?php

class indexController extends Controller {
	public $view;
	public function index(){
		$this->view = new View();
		$this->view->generate('mainView.php');
	}
		
}