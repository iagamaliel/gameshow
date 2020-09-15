<?php 
	include_once("conexion.class.php");

	class Mmto{
	 //constructor	
	 	var $con;
	 	function Mmto(){
	 		$this->con=new DBManager;
	 	}

		function crud($sql) {
			return mysqli_query($this->con->conectar(), $sql);
		}
	}
?>