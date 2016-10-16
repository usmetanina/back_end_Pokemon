<?php

class Controller{

	public $model;
	public $data;
	public $responce;

	public function __construct($model=false, $data=false){
		if($model){
			$modelName=$model.'Model';
			$this->model=new $modelName($model);
		}
		$this->data=$data;
	}
	

	public function setResponce($responce){
		$this->responce=$responce;
	}

	public function getResponce(){
		return $this->responce;
	}
	public function index(){
		$examples=$this->model->load();		// просим у модели все записи
		$this->setResponce($examples);		// возвращаем ответ 
	}
}