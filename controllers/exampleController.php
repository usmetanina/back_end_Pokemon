<?php

class exampleController extends Controller {
/*
	public function index(){
		$examples=$this->model->load();		// просим у модели все записи
		$this->setResponce($examples);		// возвращаем ответ 
	}
*/
	public function view($data){
		$example=$this->model->load($data['id']); // просим у модели конкретную запись
		$this->setResponce($example);
	}

	public function add(){
		if(isset($_POST['title'])){
			// мы передаем в модель массив с данными
			// модель должна вернуть boolean

			$dataToSave=array('title'=>$_POST['title']);
			$addedItem=$this->model->create($dataToSave);
			$this->setResponce($addedItem);
		}
	}

	public function edit($request){
		// формируем $_PUT
		$_PUT = array(); 
		$putdata = file_get_contents('php://input'); 
		$exploded = explode('&', $putdata);  
 
		foreach($exploded as $pair) { 
			$item = explode('=', $pair); 
			if(count($item) == 2) { 
				$_PUT[urldecode($item[0])] = urldecode($item[1]); 
			} 
		} 
		
		if((isset($_PUT['title']))&&(isset($request['id']))){
			
			$dataToSave=array('title'=>$_PUT['title']);
			$updatedItem=$this->model->save($request['id'],$dataToSave);
			$this->setResponce($updatedItem);
		}
	}	
	
	public function delete($request)
	{
		if (isset($request['id']))
		{
		$example=$this->model->delete($request['id']);
		$this->setResponce($example);
		}
	}

}