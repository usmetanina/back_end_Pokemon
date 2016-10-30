<?php

class indexController extends Controller {
	public $view;
	public function index(){
		$this->view = new View();
		$this->view->generate('mainView.php');
		//$message = 'This in index page. This message is in controllers/indexController.php file';
		//$this->setResponce(file_get_contents("index.html"));
	}
		
}