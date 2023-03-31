.<?php

require_once "conexion.php";

class ModeloUsuarioImg{

	static public function mdlInsertarImgUsuario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO usuarioimg (principal, nombre, ruta, usuariocreacion) 
							VALUES(:principal, :nombre, :ruta, :usuario);');

		$stmt->bindParam(":principal", $data["principal"], PDO::PARAM_INT);
		$stmt->bindParam(":nombre", $data["nombre"], PDO::PARAM_STR); 
		$stmt->bindParam(":ruta", $data["ruta"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;
	}

	static public function mdlCargarUsuarioImg($id){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio','usuarioImg' => null);

		$queryUsu = $pdo->prepare('SELECT id, principal, nombre, ruta FROM usuarioimg WHERE id = :id AND estado = 1');
		$queryUsu->bindParam(":id", $id, PDO::PARAM_INT);
		$queryUsu->execute();
		$dataUsuario = $queryUsu->fetchAll(PDO::FETCH_ASSOC);	

		$json = json_encode($dataUsuario);

		$arrayResultado = array('status' => '200', 'message' => 'Cargo', 
						'usuarioImg' => $json);

		

		$queryUsu->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}
}