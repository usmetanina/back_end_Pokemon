<?php

class pokemonController extends Controller {

	public function view($data){
		$example=$this->model->load($data['id']); 
		$this->setResponce($example);
	}

	public function add(){
		if((isset($_POST['name']))&&(isset($_POST['image']))&&
			(isset($_POST['power']))&&(isset($_POST['speed']))){

			$dataToSave=array('name'=>$_POST['name'],
							'image'=>$_POST['image'],
							'power'=>$_POST['power'],
							'speed'=>$_POST['speed']);
			
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
		
		if((isset($request['id']))){
			if (isset($_PUT['name']))
			{
				$dataToSave=array('name'=>$_PUT['name']);
				$updatedItem=$this->model->save($request['id'],$dataToSave);
			}
			
			if (isset($_PUT['image']))
			{
				$dataToSave=array('image'=>$_PUT['image']);
				$updatedItem=$this->model->save($request['id'],$dataToSave);
			}
			
			if (isset($_PUT['power']))
			{
				$dataToSave=array('power'=>$_PUT['power']);		
				$updatedItem=$this->model->save($request['id'],$dataToSave);
			}
			
			if (isset($_PUT['speed']))
			{
				$dataToSave=array('speed'=>$_PUT['speed']);		
				$updatedItem=$this->model->save($request['id'],$dataToSave);
			}					

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