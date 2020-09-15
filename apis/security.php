<?php
	//if(!isset($_SESSION["userId"])){
		require('mantenimiento.class.php');

		$json = file_get_contents('php://input');
		$obj = json_decode($json);

		$method = $obj->data->params->method;
		$consulta = $obj->data->params->query;

		$objMmto = new Mmto;

		if($method == "Security"){
			
			$result = $objMmto->crud($consulta);
			
			$arr = array();
			if(mysqli_num_rows($result) > 0) {
				session_start();
				while($row = mysqli_fetch_assoc($result)) {
					$arr[] = $row;
					$_SESSION["userId"] = $row['id_usuario'];
					//header('location: ../views/index.php'); 
				}
			}

			# JSON-encode the response
			$json_response = json_encode($arr);

			// # Return the response
			echo $json_response;
		}
	//}
?>
