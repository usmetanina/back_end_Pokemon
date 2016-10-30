<?php

class View{
	
	function generate($content_view)
	{
		include 'views/'.$content_view;
	}
}