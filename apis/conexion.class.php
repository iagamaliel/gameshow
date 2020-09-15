<?php 
class DBManager{
	var $conect;
  
	var $BaseDatos;
	var $Servidor;
	var $Usuario;
	var $Clave;
	function DBManager(){
		$this->BaseDatos = "gameshow";
		$this->Servidor = "127.0.0.1";
		$this->Usuario = "root";
		$this->Clave = "";
	}

	function conectar() {
		if(!($con=@mysqli_connect($this->Servidor,$this->Usuario,$this->Clave,$this->BaseDatos))){
			echo"<h1> [:(] Error al conectar a la base de datos</h1>";	
			exit();
		}
		return $con;	
	}
}
?>
