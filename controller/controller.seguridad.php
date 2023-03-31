<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once '../model/model.seguridad.php';
    require('../extensiones//fpdf/fpdf.php');
    
    $oContralador = new CSeguridadController();
    $page = "iIndex";
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }    
    
    switch ($page){
        case 'iListParentesco':
            $oContralador->ctrListParentesco();
            break;
        case 'iListNacionalidades':
            $oContralador->ctrListNacionalidades();
            break;
        case 'iPdfMenor':
            $oContralador->ctrPdfMenorEdad();
            break;
        case 'iCargarTeamsUsu':
            $oContralador->ctrListTeamsUsuarios();
            break;
        case 'iRegistrarUsuTeams':
            $oContralador->ctrRegistrarUsuTeams();
            break;
        case 'iCargarCiudadTeams':
            $oContralador->ctrListCiudadTeams();
            break;
        case 'iCargarTeams2':
            $oContralador->ctrListTeams2();
            break;
        case 'iCargarTeams':
            $oContralador->ctrListTeams();
            break;
        case 'iCargarUsuImg':
            $oContralador->ctrListUsuariosImg();
            break;
        case 'iRegistrarUsuImg':
            $oContralador->ctrRegistroUsuarioImg();
            break;
        case 'iCargarDeportesUsu':
            $oContralador->ctrListDeportes();
            break;
        case 'iCargarDatosUsu':
            $oContralador->ctrDataUsuario();
            break;
        case 'iRegistrarPersona':
            $oContralador->ctrRegistrarPersona();
            break;
        case 'iLogin':
            $oContralador->ctrIngresarLogin();
            break;
        case 'iRegistroUsuario':
            $oContralador->ctrRegistroUsuario();
            break;
        case 'iBuscarPerfil':
            $oContralador->ctrBuscarPerfil();
            break;  
        case 'iActualizarUsuImg':
            $oContralador->ctrActualizarUsuarioImg();
            break;
        case 'iBuscarPerfilId':
            $oContralador->mdlBuscarPerfilPorId();
            break; 

        case 'iRegistrarGall':
            $oContralador->ctrRegistroUsuarioGalleria();
            break; 

        case 'iAnularGall':
            $oContralador->ctrAnularUsuarioGalleria();
            break; 

        case 'iBuscarGall':
            $oContralador->ctrBuscarGalleriaIdUsuario();
            break; 



    }
    class CSeguridadController{
        
        private $model;
        
        public function __CONSTRUCT(){
            $this->model  = new ModeloSeguridad();
        }

        public function ctrPdfMenorEdad()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlCargarUsuario($dataURL['id']);

                $arrayResultado = array('status' => '500', 
                    'message' => 'Error no existen datos del Acudiente',
                    'usuarioEnt' => null, 
                    'usuarioEnt' => null );

                if ($resultado['personaEnt'] != null) {
                    // code...
                    $pdf = new FPDF();
                    $pdf->AddPage();
                    $pdf->SetFont('Arial','B',16);
                    $pdf->Cell(40,10,'PAYSPOR');
                    $pdf->Text(40, 50, "Yo ". $resultado['personaEnt']['acudiente'] ." identificado con ID #". $resultado['personaEnt']['cedulaacudiente']);
                    $pdf->Text(40, 60, "tutor responsable o acudiente del menor ");
                    $pdf->Text(40, 70, "identificado como ". $resultado['personaEnt']['nombrecompleto']);


                    $fecha = $dataURL['id'] . date('YmdHis') . '.pdf';

                    $ruta = "../pdf/";

                    $pdf->Output('F',$ruta.$fecha);

                    $arrayResultado = array('status' => '200', 
                    'message' => $fecha,
                    'usuarioEnt' => null, 
                    'usuarioEnt' => null );
                }


                echo json_encode($arrayResultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
        }

        public function ctrListTeamsUsuarios()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarTeamsUsuarios($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistrarUsuTeams()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('ciudadid' => $dataURL['ciudadid'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarUsuarioTeams($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListCiudadTeams()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarCiudadTeams($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListTeams2()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                //$dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarTeams2();

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListTeams()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                //$dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarTeams();

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListDeportes()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarDeportesUsuario($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrDataUsuario()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlCargarUsuario($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistroUsuario()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('rolid' => $dataURL['rolid'],
                                    'personaid' => $dataURL['personaid'],
                                    'usuario' => $dataURL['usuario'],
                                    'contrasena' => $dataURL['contrasena'],
                                    'tipologin' => $dataURL['tipologin']);

                $resultado = $this->model->mdlInsertarUsuario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrIngresarLogin()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('usuario' => $dataURL['usuario'], 'contrasena' => $dataURL['contrasena']);

                $resultado = $this->model->mdlValidarLogin($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistrarPersona()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('personaid' => $dataURL['personaid'], 
                                'nombrecompleto' => $dataURL['nombrecompleto'], 
                                'fechanacimiento' => $dataURL['fechanacimiento'],
                                'ciudad' => $dataURL['ciudad'],
                                'direccion' => $dataURL['direccion'],
                                'telefono' => $dataURL['telefono'],
                                'telefvis' => $dataURL['telefvis'],
                                'usuario' => $dataURL['usuario'],
                                'tipo' => $dataURL['tipo'],
                                'apodo' => $dataURL['apodo'],
                                'acudiente' => $dataURL['acudiente'],
                                'parentesco' => $dataURL['parentesco'],
                                'acudientendocumento' => $dataURL['acudientendocumento'],
                                'acudientetelf' => $dataURL['acudientetelf'],
                                'acudientecorreo' => $dataURL['acudientecorreo'],
                                'sexo' => $dataURL['sexo'],
                                'nacionalidad' => $dataURL['nacionalidad'],
                                'deporte' => $dataURL['deporte']);

                if ($dataURL['personaid'] == 0) {

                    $resultado = $this->model->mdlInsertarPersona($arrayData);

                }else{
                    $resultado = $this->model->mdlEditarPersona($arrayData);
                }
                

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistroUsuarioImg()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('principal' => $dataURL['principal'],
                                    'nombre' => $dataURL['nombre'],
                                    'descripcion' => $dataURL['descripcion'],
                                    'ruta' => $dataURL['ruta'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarImgUsuario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListUsuariosImg()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlCargarUsuarioImg($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListNacionalidades()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {

                $resultado = $this->model->mdlCargarNacionalidades();

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListParentesco()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {

                $resultado = $this->model->mdlCargarParentesco();

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }



         public function ctrBuscarPerfil()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlBuscarPerfil($dataURL['nombre']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }
         public function ctrActualizarUsuarioImg()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('principal' => $dataURL['principal'],
                                    'nombre' => $dataURL['nombre'],
                                    'descripcion' => $dataURL['descripcion'],
                                    'ruta' => $dataURL['ruta'],
                                    'usuario' => $dataURL['usuario'],
                                    'id' => $dataURL['id']);

                $resultado = $this->model->mdlActualizarImgUsuario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

         public function mdlBuscarPerfilPorId()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlBuscarPerfilPorId($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

         public function ctrRegistroUsuarioGalleria()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('id' => $dataURL['id'],
                                    'idtipo' => $dataURL['idtipo'],
                                    'descripcion' => $dataURL['descripcion'],
                                    'imagen' => $dataURL['imagen'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarGalleriaUsuario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }


           public function ctrAnularUsuarioGalleria()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('id' => $dataURL['id'],
                                    'idusuario'  => $dataURL['idusuario'] );

                $resultado = $this->model->mdlElminarGalleriaUsuario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

         public function ctrBuscarGalleriaIdUsuario()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('usuario'=>$dataURL['usuario'],
                'idtipo'=>$dataURL['idtipo']);
                $resultado = $this->model->mdlCargarUsuarioGalleria($arrayData );

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }


    }
?>

