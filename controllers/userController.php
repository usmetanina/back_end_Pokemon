<?php

class userController extends Controller {

	public function view($data){
		$example=$this->model->load($data['id']); 
		$this->setResponce($example);
	}

	public function add(){
		
		$data=json_decode(file_get_contents('php://input'), TRUE);

		if(isset($data['name'])){

			if (isset($data['score'])){
				$dataToSave=array('name'=>$data['name'],
								'score'=>$data['score']);
			}
			else {
				$dataToSave=array('name'=>$data['name'],
								'score'=>0);
			}
			
			$addedItem=$this->model->create($dataToSave);
			$this->setResponce($addedItem);
		}
	}

	public function edit($request){
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
			if ((isset($_PUT['name'])) && (isset($_PUT['score'])))
				$dataToSave=array('name'=>$_PUT['name'],
								'score'=>$_PUT['score']);
			if ((isset($_PUT['name'])) && (!isset($_PUT['score'])))
				$dataToSave=array('name'=>$_PUT['name'],
								'score'=>NULL);
			if (!(isset($_PUT['name'])) && (isset($_PUT['score'])))
				$dataToSave=array('name'=>NULL,
								'score'=>$_PUT['score']);					
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