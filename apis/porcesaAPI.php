<?php
	require('mantenimiento.class.php');

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	$method = $obj->data->params->method;
	$consulta = $obj->data->params->query;

	$objMmto = new Mmto;

	if($method != "GET"){
		if ($objMmto->crud($consulta)){
			echo true;
		}else{
			echo false;
		} 
	} else {
		$result = $objMmto->crud($consulta);
		
		$arr = array();
		if(mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_assoc($result)) {
				$arr[] = $row;	
			}
		}

		# JSON-encode the response
		$json_response = json_encode($arr);

		// # Return the response
		echo $json_response;
	} 
?>