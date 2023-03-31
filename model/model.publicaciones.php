<?php

require_once "conexion.php";

class ModeloPublicaciones{

	static public function mdlListarPublicaciones($id)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare("SELECT a.id,
										CONCAT(d.ruta, d.nombre) AS fotoperfil,
										a.comentario,
										a.rutaimagen,
										a.imagenes,
										a.megusta,
										c.nombrecompleto,
										c.apodo,
										a.fechacreacion,
										DATE_FORMAT(a.fechacreacion, '%d %M %Y') shippeddate,
										IFNULL((
											SELECT COUNT(publicacionid) AS CantComentarios FROM comentariospub
											WHERE publicacionid = a.id
										),0) AS cantcomentarios
									FROM publicaciones a
									INNER JOIN usuarios b ON a.usuariocreacion = b.id
									INNER JOIN personas c ON b.personaid = c.id
									INNER JOIN usuarioimg d ON d.descripcion = 'FOTO PERFIL' AND d.estado = 1 AND a.usuariocreacion = d.usuariocreacion
									WHERE a.estado = 1
									AND (a.usuariocreacion = :id OR :id = 0)
									ORDER BY 1 DESC;");

		$queryExiste->bindParam(":id", $id, PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlInsertarPublicaciones($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO publicaciones(comentario,rutaimagen,imagenes,usuariocreacion)
							VALUES(:comentario,:rutaimagen,:imagenes,:usuario);');

		$stmt->bindParam(":comentario", $data["comentario"], PDO::PARAM_STR);
		$stmt->bindParam(":rutaimagen", $data["rutaimagen"], PDO::PARAM_STR);
		$stmt->bindParam(":imagenes", $data["imagenes"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
				
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

		}

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;	
	}

	static public function mdlInsertarComentario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO comentariospub(publicacionid,comentario,usuariocreacion)
						VALUES(:publicacionid,:comentario,:usuario);;');

		$stmt->bindParam(":publicacionid", $data["publicacionid"], PDO::PARAM_INT);
		$stmt->bindParam(":comentario", $data["comentario"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
				
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

		}

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;	
	}


	static public function mdlListarComentarios($idpub)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare("SELECT a.id, a.comentario,
									CASE WHEN nombrecompleto = ''
									THEN b.usuario
									ELSE nombrecompleto END AS nombre,
									a.fechacreacion
									FROM comentariospub a
									INNER JOIN usuarios b ON a.usuariocreacion = b.id
									LEFT JOIN personas c ON b.personaid = c.id
									WHERE publicacionid = :idpub
									ORDER BY id ASC");

		$queryExiste->bindParam(":idpub", $idpub, PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlInsertarLikes($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('UPDATE publicaciones SET megusta = megusta + 1 WHERE id = :id');

		$stmt->bindParam(":id", $data["id"], PDO::PARAM_STR);
		//$stmt->bindParam(":rutaimagen", $data["rutaimagen"], PDO::PARAM_STR);
		//$stmt->bindParam(":imagenes", $data["imagenes"], PDO::PARAM_STR);
		//$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
				
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

		}

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;	
	}
}