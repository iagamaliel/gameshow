<?php
	session_start();

	if(isset($_SESSION["userId"])){

		require('mantenimiento.class.php');

		$json = file_get_contents('php://input');
		$obj = json_decode($json);

		$method = $obj->data->params->method;

		$objMmto = new Mmto;

		if($method == "customDataUser"){
			
			$Id = $_SESSION["userId"];
			$result = $objMmto->crud("select * from vt_usuarios_roles_jugadores where id_usuario = '$Id' and usuarioActivo = 1");
			
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
	}
?>
