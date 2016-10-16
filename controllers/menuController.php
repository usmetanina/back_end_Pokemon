<?php

class menuController extends Controller {

	public function index(){
		$examples=$this->model->load();		// просим у модели все записи
		$this->setResponce($examples);		// возвращаем ответ 
	}
}