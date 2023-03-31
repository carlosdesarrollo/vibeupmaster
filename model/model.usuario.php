<?php

require_once "conexion.php";
require_once "../entity/usuarios.php";

$data = new ModeloUsuarios();

$result = $data->mdlListarUsuario(1);

class ModeloUsuarios{

	static public function mdlListarUsuario($id){

		$pdo = Conexion::conectar();

		$stmt = $pdo->prepare('SELECT * FROM usuarios');
		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$arrayResultado = array('success' => 'ok', 'message' => '', 'data' => $data );

		var_dump($arrayResultado);

	}

	static public function mdlListarUsuario($id){

		$pdo = Conexion::conectar();

		$stmt = $pdo->prepare('SELECT * FROM usuarios');
		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$arrayResultado = array('success' => 'ok', 'message' => '', 'data' => $data );

		var_dump($arrayResultado);

	}
}