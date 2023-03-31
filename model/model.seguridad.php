<?php

require_once "conexion.php";
require_once "model.utiles.php";

class ModeloSeguridad{

	static public function mdlListarTeamsUsuarios($id)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare('SELECT a.id,b.nombre AS ciudad, c.nombre AS teams 
									FROM usuario_ciudad_teams a
									INNER JOIN ciudad_teams b ON a.ciudadid = b.id
									INNER JOIN teams c ON b.teamsid = c.id
									WHERE a.usuariocreacion = :id;');

		$queryExiste->bindParam(":id", $id, PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlInsertarUsuarioTeams($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$queryExiste=$pdo->prepare('SELECT COUNT(*) AS Cantidad FROM usuario_ciudad_teams WHERE usuariocreacion = :usuario AND ciudadid = :ciudadid');
		$queryExiste->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);
		$queryExiste->bindParam(":ciudadid", $data["ciudadid"], PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetch();
		$queryExiste->closeCursor();

		if ($ListExiste["Cantidad"] > 0) {
			$arrayResultado = array('status' => '500', 'message' => 'Ya existe ese registro para el usuario', 'data' => null );
		}else{

			$stmt = $pdo->prepare('INSERT INTO usuario_ciudad_teams(ciudadid, usuariocreacion) VALUES(:ciudadid, :usuario);');

			$stmt->bindParam(":ciudadid", $data["ciudadid"], PDO::PARAM_INT);
			$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

			if ($stmt->execute()) {
				
				$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

			}		

			$stmt->closeCursor();
		}		

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlListarCiudadTeams($id)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare('SELECT id, nombre FROM ciudad_teams WHERE estado = 1 AND teamsid = :id;');

		$queryExiste->bindParam(":id", $id, PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$arrayResultado = array('CiudadListEnt' => $ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlListarTeams()
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare('SELECT id, nombre FROM teams WHERE estado = 1;');

		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlListarTeams2()
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare('SELECT id, nombre FROM teams WHERE estado = 1;');

		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$arrayResultado = array('TeamsListEnt' => $ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $arrayResultado;
	}

	static public function mdlListarDeportesUsuario($id)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare('SELECT a.id,a.nombre,IFNULL(b.existe,0) AS existe FROM deportes a
							LEFT JOIN (
								SELECT COUNT(*) AS existe,z.deporteid FROM usuario_deporte z
								INNER JOIN deportes v ON z.deporteid = v.id
								WHERE usuarioid = :id
								GROUP BY z.deporteid
							) b ON a.id = b.deporteid');

		$queryExiste->bindParam(":id", $id, PDO::PARAM_STR);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste, JSON_UNESCAPED_UNICODE);

		//$arrayResultado = array('deporteListEnt' => $ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlInsertarUsuario($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$queryExiste=$pdo->prepare('SELECT COUNT(*) AS Cantidad FROM usuarios WHERE usuario = :usuario');
		$queryExiste->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);

		$contra=$data["contrasena"];
		$msg="";

		$queryExiste->execute();
		$ListExiste = $queryExiste->fetch();
		$queryExiste->closeCursor();

		if ($ListExiste["Cantidad"] > 0)   {
			$arrayResultado = array('status' => '500', 'message' => 'Ya existe ese usuario', 'data' => null );
		}else if (ModeloUtiles::mdlValidarClave($contra,$msg)==false){
			$arrayResultado = array('status' => '500', 'message' => $msg, 'data' => null );
		}
		else{

			$encriptar = crypt($data["contrasena"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');


			$stmt = $pdo->prepare('INSERT INTO usuarios(rolid, personaid, usuario, contrasena, tipologin) VALUES(:rolid, :personaid, :usuario, :contrasena, :tipologin);');

			$stmt->bindParam(":rolid", $data["rolid"], PDO::PARAM_STR);
			$stmt->bindParam(":personaid", $data["personaid"], PDO::PARAM_STR);
			$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
			$stmt->bindParam(":contrasena", $encriptar, PDO::PARAM_STR);
			$stmt->bindParam(":tipologin", $data["tipologin"], PDO::PARAM_STR);

			if ($stmt->execute()) {
				$id = $pdo->lastInsertId();
				$dataUsu = ModeloSeguridad::mdlCargarUsuario($id);
				
				$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 
						'usuarioEnt' => $dataUsu['usuarioEnt'],
						'personaEnt' => $dataUsu['personaEnt'] );

			}		

			$stmt->closeCursor();
		}		

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlValidarLogin($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$existeUsu = $pdo->prepare('SELECT COUNT(*) AS Cantidad FROM usuarios WHERE usuario = :usuario');
		$existeUsu->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
		$existeUsu->execute();
		$dataExisteUsu = $existeUsu->fetch(PDO::FETCH_ASSOC);

		if ($dataExisteUsu["Cantidad"] > 0) {

			$encriptar = crypt($data["contrasena"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

			$existePass = $pdo->prepare('SELECT COUNT(*) AS Cantidad FROM usuarios WHERE usuario = :usuario AND contrasena = :contrasena');
			$existePass->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
			$existePass->bindParam(":contrasena", $encriptar, PDO::PARAM_STR);
			$existePass->execute();
			$dataExistePass = $existePass->fetch(PDO::FETCH_ASSOC);

			if ($dataExistePass["Cantidad"] > 0) {
				$stmt = $pdo->prepare('SELECT id,rolid,personaid,usuario,tipologin FROM usuarios WHERE usuario = :usuario AND contrasena = :contrasena');

				$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
				$stmt->bindParam(":contrasena", $encriptar, PDO::PARAM_STR);
				$stmt->execute();
				$data = $stmt->fetch(PDO::FETCH_ASSOC);

				$arrayResultado = array('status' => '200', 'message' => 'Ingreso correctamente', 'usuarioEnt' => $data );

				$stmt->closeCursor();

			}else{
				$arrayResultado = array('status' => '500', 'message' => 'Clave Incorrecta', 'data' => null );
			}			

		}else{
			$arrayResultado = array('status' => '500', 'message' => 'No existe ese usuario', 'data' => null );
		}		

		Conexion::closeInstance();

		return $arrayResultado;

	}


	static public function mdlInsertarPersona($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO personas(nombrecompleto, fechanacimiento, ciudad, direccion, telefono, telefvis, usuariocreacion, apodo, acudiente, parentesco, cedulaacudiente, telfacudiente, acudientecorreo, sexo, nacionalidad) VALUES(:nombrecompleto, :fechanacimiento, :ciudad, :direccion, :telefono, :telefvis, :usuario, :apodo, :acudiente, :parentesco, :cedulaacudiente, :telfacudiente, :acudientecorreo, :sexo, :nacionalidad)');

		$stmt->bindParam(":nombrecompleto", ucwords($data["nombrecompleto"]), PDO::PARAM_STR);
		$stmt->bindParam(":fechanacimiento", $data["fechanacimiento"], PDO::PARAM_STR);
		$stmt->bindParam(":ciudad", $data["ciudad"], PDO::PARAM_STR);
		$stmt->bindParam(":direccion", $data["direccion"], PDO::PARAM_STR);
		$stmt->bindParam(":telefono", $data["telefono"], PDO::PARAM_STR);
		$stmt->bindParam(":telefvis", $data["telefvis"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);
		$stmt->bindParam(":apodo", $data["apodo"], PDO::PARAM_STR);
		$stmt->bindParam(":acudiente", $data["acudiente"], PDO::PARAM_STR);
		$stmt->bindParam(":parentesco", $data["parentesco"], PDO::PARAM_STR);
		$stmt->bindParam(":cedulaacudiente", $data["acudientendocumento"], PDO::PARAM_STR);
		$stmt->bindParam(":telfacudiente", $data["acudientetelf"], PDO::PARAM_STR);
		$stmt->bindParam(":acudientecorreo", $data["acudientecorreo"], PDO::PARAM_STR);
		$stmt->bindParam(":sexo", $data["sexo"], PDO::PARAM_STR);
		$stmt->bindParam(":nacionalidad", $data["nacionalidad"], PDO::PARAM_STR);

		        	
		if ($stmt->execute()) {
			$personaid = $pdo->lastInsertId();
			if($data["deporte"]!=0 || $data["deporte"]!=null ){
			$stmt2 = $pdo->prepare('INSERT INTO usuario_deporte(usuarioid,deporteid,estado,fechacreacion)VALUES( :usuario,:deporte,1,NOW());');
			$stmt2->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
			$stmt2->bindParam(":deporte", $data["deporte"], PDO::PARAM_STR);
			$stmt2->execute();
        	$stmt2->closeCursor();
			}


        	if ($data["tipo"] == 1 && $personaid != 0) {
        		
        		$updateUsu = $pdo->prepare('UPDATE usuarios SET personaid = :personaid WHERE id = :id');
        		$updateUsu->bindParam(":id", $data["usuario"], PDO::PARAM_INT);
        		$updateUsu->bindParam(":personaid", $personaid, PDO::PARAM_INT);
        		$updateUsu->execute();
        		$updateUsu->closeCursor();
        	}
			
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 
						'personaid' => $personaid );

		}		

		$stmt->closeCursor();


		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlEditarPersona($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('UPDATE personas
									SET 
									nombrecompleto = :nombrecompleto, 
									fechanacimiento = :fechanacimiento, 
									ciudad = :ciudad, 
									direccion = :direccion, 
									telefono = :telefono, 
									telefvis = :telefvis, 
									fechamodificacion = NOW(),
									usuariomodificacion = :usuario,
									apodo = :apodo,
									acudiente = :acudiente,
									parentesco = :parentesco,
									cedulaacudiente = :cedulaacudiente,
									telfacudiente = :telfacudiente,
									acudientecorreo = :acudientecorreo,
									sexo = :sexo,
									nacionalidad = :nacionalidad
									WHERE
									id = :id;');


		$stmt->bindParam(":nombrecompleto", ucwords($data["nombrecompleto"]), PDO::PARAM_STR);
		$stmt->bindParam(":fechanacimiento", $data["fechanacimiento"], PDO::PARAM_STR);
		$stmt->bindParam(":ciudad", ucwords($data["ciudad"]), PDO::PARAM_STR);
		$stmt->bindParam(":direccion", $data["direccion"], PDO::PARAM_STR);
		$stmt->bindParam(":telefono", $data["telefono"], PDO::PARAM_STR);
		$stmt->bindParam(":telefvis", $data["telefvis"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);
		$stmt->bindParam(":id", $data["personaid"], PDO::PARAM_INT);
		$stmt->bindParam(":apodo", $data["apodo"], PDO::PARAM_STR);
		$stmt->bindParam(":acudiente", $data["acudiente"], PDO::PARAM_STR);
		$stmt->bindParam(":parentesco", $data["parentesco"], PDO::PARAM_STR);
		$stmt->bindParam(":cedulaacudiente", $data["acudientendocumento"], PDO::PARAM_STR);
		$stmt->bindParam(":telfacudiente", $data["acudientetelf"], PDO::PARAM_STR);
		$stmt->bindParam(":acudientecorreo", $data["acudientecorreo"], PDO::PARAM_STR);
		$stmt->bindParam(":sexo", $data["sexo"], PDO::PARAM_STR);
		$stmt->bindParam(":nacionalidad", ucwords($data["nacionalidad"]), PDO::PARAM_STR);

		if ($stmt->execute()) {
			
			if($data["deporte"]!=0 || $data["deporte"]!=null ){
			$stmt2 = $pdo->prepare('INSERT INTO usuario_deporte(usuarioid,deporteid,estado,fechacreacion)VALUES( :usuario,:deporte,1,NOW());');
			$stmt2->bindParam(":usuario", $data["usuario"], PDO::PARAM_STR);
			$stmt2->bindParam(":deporte", $data["deporte"], PDO::PARAM_STR);
			$stmt2->execute();
        	$stmt2->closeCursor();
			}
			
			$arrayResultado = array('status' => '200', 'message' => 'Editado Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlCargarUsuario($id){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio','usuarioEnt' => null, 'personaEnt' => null );

		$queryUsu = $pdo->prepare('SELECT id,rolid,personaid,usuario,tipologin FROM usuarios WHERE id = :id');
		$queryUsu->bindParam(":id", $id, PDO::PARAM_INT);
		$queryUsu->execute();
		$dataUsuario = $queryUsu->fetch(PDO::FETCH_ASSOC);	

		$dataPersona = null;

		if ($dataUsuario["personaid"] != 0) {
			$queryPer = $pdo->prepare('SELECT p.id,nombrecompleto,fechanacimiento,ciudad,direccion,telefono,telefvis,ifnull(apodo,"") as apodo , ifnull(acudiente,"") as acudiente, 
ifnull(cedulaacudiente,"") as cedulaacudiente, ifnull(telfacudiente,"") as telfacudiente, ifnull(ciudadid,"") as ciudadid, ifnull(municipioid,"") as municipioid, 
ifnull(direccionpatrocinio,"") as direccionpatrocinio, ifnull(acudientecorreo,"") as acudientecorreo, ifnull(parentesco,"") as parentesco, ifnull(pdfconformidad,"") aspdfconformidad ,ifnull(sexo,"") as sexo, 
ifnull(nacionalidad,"") nacionalidad,ifnull(de.deporteid,0) deporteid
				FROM personas p inner join usuarios us on p.usuariocreacion=us.id left join  usuario_deporte de on us.id=de.usuarioid WHERE p.id = :id');
			$queryPer->bindParam(":id", $dataUsuario["personaid"], PDO::PARAM_INT);
			$queryPer->execute();
			$dataPersona = $queryPer->fetch(PDO::FETCH_ASSOC);
			$queryPer->closeCursor();
		}

		$arrayResultado = array('status' => '200', 'message' => 'Cargo', 
						'usuarioEnt' => $dataUsuario,
						'personaEnt' => $dataPersona);	

		$queryUsu->closeCursor();
		

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlInsertarPersonaRelacionada($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO personasrelacionadas (personaid, personarel, usuariocreacion) VALUES(:personaid, :personarel, :usuario);');

		$stmt->bindParam(":personaid", $data["personaid"], PDO::PARAM_STR);
		$stmt->bindParam(":personarel", $data["personarel"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			$id = $pdo->lastInsertId();
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => $id );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlAnularPersonaRelacionada($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('UPDATE personasrelacionadas SET estado = 0 WHERE id = :id');

		$stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			
			$arrayResultado = array('status' => '200', 'message' => 'Anulado Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlInsertarDeporte($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO deportes (nombre) VALUES(:nombre);');

		$stmt->bindParam(":nombre", $data["nombre"], PDO::PARAM_STR); 
		//$stmt->bindParam(":personarel", $data["personarel"], PDO::PARAM_STR);
		//$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;
	}

	static public function mdlInsertarImgUsuario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO usuarioimg (principal, descripcion, nombre, ruta, usuariocreacion) 
							VALUES(:principal, :descripcion, :nombre, :ruta, :usuario);');

		$stmt->bindParam(":principal", $data["principal"], PDO::PARAM_INT);
		$stmt->bindParam(":descripcion", $data["descripcion"], PDO::PARAM_STR);
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

		$queryUsu = $pdo->prepare('SELECT id, principal, descripcion, nombre, ruta FROM usuarioimg WHERE usuariocreacion = :id AND estado = 1');
		$queryUsu->bindParam(":id", $id, PDO::PARAM_INT);
		$queryUsu->execute();
		$dataUsuario = $queryUsu->fetchAll(PDO::FETCH_ASSOC);	

		$json = json_encode($dataUsuario);

		$arrayResultado = $json;

		

		$queryUsu->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlCargarNacionalidades(){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio','usuarioImg' => null);

		$queryNac = $pdo->prepare('SELECT id,nombre FROM nacionalidades WHERE estado = 1;');
		$queryNac->execute();
		$dataNacionalidad = $queryNac->fetchAll(PDO::FETCH_ASSOC);	

		$json = json_encode($dataNacionalidad);

		$arrayResultado = $json;		

		$queryNac->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlCargarParentesco(){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio','usuarioImg' => null);

		$queryPar = $pdo->prepare('SELECT id,nombre FROM parentesco WHERE estado = 1;');
		$queryPar->execute();
		$dataParentesco = $queryPar->fetchAll(PDO::FETCH_ASSOC);	

		$json = json_encode($dataParentesco);

		$arrayResultado = $json;		

		$queryPar->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

	static public function mdlBuscarPerfil($nombre)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare("SELECT pe.id,pe.nombrecompleto,us.usuario, IFNULL( dp.nombre,'No tiene depote registrado') nombredeporte, CONCAT(ifnull(im.ruta,'iconoimagen.PNG'),ifnull(im.nombre,'')) as ruta, CONCAT(ifnull(imp.ruta,'iconoimagen.PNG'),ifnull(imp.nombre,'')) as rutaportada, pe.nacionalidad,pe.ciudad,pe.fechanacimiento,us.id idusuario   FROM personas pe inner join usuarios us on pe.id=us.personaid left join usuario_deporte ud on us.id=ud.usuarioid left join deportes dp on ud.deporteid=dp.id left join usuarioimg im on us.id=im.usuariocreacion  and  im.descripcion='FOTO PERFIL'
left join  usuarioimg imp on us.id=imp.usuariocreacion  and  imp.descripcion='FOTO PORTADA'
 where pe.nombrecompleto like CONCAT('%',:nombre,'%');");

		$queryExiste->bindParam(":nombre", $nombre, PDO::PARAM_STR);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$arrayResultado = array('BuscarListEnt' => $ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlActualizarImgUsuario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );


		$stmt = $pdo->prepare("UPDATE usuarioimg SET principal=:principal,descripcion=:descripcion, nombre=:nombre, ruta=:ruta, usuariomodificacion=:usuario
		 where id=:id;");

		$stmt->bindParam(":principal", $data["principal"], PDO::PARAM_INT);
		$stmt->bindParam(":descripcion", $data["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":nombre", $data["nombre"], PDO::PARAM_STR); 
		$stmt->bindParam(":ruta", $data["ruta"], PDO::PARAM_STR);
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);
		$stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);
		if ($stmt->execute()) {
			
			$arrayResultado = array('status' => '200', 'message' => 'Se actualizo las imagenes Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();
		return $arrayResultado;
	}

	static public function mdlBuscarPerfilPorId($id)
	{
		$pdo = Conexion::getInstance();

		$queryExiste=$pdo->prepare("SELECT pe.id,pe.nombrecompleto,us.usuario, IFNULL( dp.nombre,'No tiene depote registrado') nombredeporte, CONCAT(ifnull(im.ruta,'iconoimagen.PNG'),ifnull(im.nombre,'')) as ruta, CONCAT(ifnull(imp.ruta,'iconoimagen.PNG'),ifnull(imp.nombre,'')) as rutaportada, pe.nacionalidad,pe.ciudad,pe.fechanacimiento,us.id idusuario  FROM personas pe inner join usuarios us on pe.id=us.personaid left join usuario_deporte ud on us.id=ud.usuarioid left join deportes dp on ud.deporteid=dp.id left join usuarioimg im on us.id=im.usuariocreacion  and  im.descripcion='FOTO PERFIL'
			left join  usuarioimg imp on us.id=imp.usuariocreacion  and  imp.descripcion='FOTO PORTADA' where us.id=:id;");

		$queryExiste->bindParam(":id", $id, PDO::PARAM_INT);
		$queryExiste->execute();
		$ListExiste = $queryExiste->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($ListExiste);

		$arrayResultado = array('BuscarListEnt' => $ListExiste);

		$queryExiste->closeCursor();
		Conexion::closeInstance();

		return $json;
	}

	static public function mdlInsertarGalleriaUsuario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('INSERT INTO usuario_galleria (idtipo, descripcion, imagen, idusuario,estado,fechacreacion) 
							VALUES(:idtipo, :descripcion, :imagen, :usuario, 1,NOW() );');

		
		$stmt->bindParam(":idtipo", $data["idtipo"], PDO::PARAM_INT);
		$stmt->bindParam(":descripcion", $data["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":imagen", $data["imagen"], PDO::PARAM_STR); 
		$stmt->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			$id = $pdo->lastInsertId();
			$arrayResultado = array('status' => '200', 'message' => 'Registro Correctamente', 'data' => $id );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;
	}

	static public function mdlElminarGalleriaUsuario($data)
	{
		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio', 'data' => null );

		$stmt = $pdo->prepare('UPDATE usuario_galleria SET estado=0, usuariomodificacion=:usuario,fechamodificacion=NOW() WHERE id=:id;');

		$stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);
		$stmt->bindParam(":usuario", $data["idusuaio"], PDO::PARAM_INT);

		if ($stmt->execute()) {
			
			$arrayResultado = array('status' => '200', 'message' => 'Se Anulo el registro Correctamente', 'data' => null );

		}		

		$stmt->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;
	}

	static public function mdlCargarUsuarioGalleria($data){

		$pdo = Conexion::getInstance();

		$arrayResultado = array('status' => '500', 'message' => 'Error en servicio','usuarioImg' => null);

		$queryUsu = $pdo->prepare('SELECT id,idtipo, descripcion, imagen, idusuario,estado FROM usuario_galleria WHERE idusuario = :usuario AND idtipo=:idtipo AND estado = 1');
		$queryUsu->bindParam(":usuario", $data["usuario"], PDO::PARAM_INT);
		$queryUsu->bindParam(":idtipo", $data["idtipo"], PDO::PARAM_INT);
		$queryUsu->execute();
		$dataUsuario = $queryUsu->fetchAll(PDO::FETCH_ASSOC);	

		$json = json_encode($dataUsuario);

		$arrayResultado = $json;
		$queryUsu->closeCursor();

		Conexion::closeInstance();

		return $arrayResultado;

	}

}