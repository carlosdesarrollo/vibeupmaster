<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once '../model/model.publicaciones.php';
    
    $oContralador = new CPublicacionesController();
    $page = "iIndex";
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }    
    
    switch ($page){
        case 'iRegLike':
            $oContralador->ctrModLikes();
            break;
        case 'iRegComentarios':
            $oContralador->ctrRegistrarComentarios();
            break;
        case 'iListarComentarios':
            $oContralador->ctrListarComentarios();
            break;
        case 'iRegPub':
            $oContralador->ctrRegistrarPublicacion();
            break;
        case 'iListarPub':
            $oContralador->ctrListarPublicaciones();
            break;
    }
    class CPublicacionesController{
        
        private $model;
        
        public function __CONSTRUCT(){
            $this->model  = new ModeloPublicaciones();
        }

        public function ctrListarPublicaciones()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {

                $dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarPublicaciones($dataURL['id']);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistrarPublicacion()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('comentario' => $dataURL['comentario'],
                                    'rutaimagen' => $dataURL['rutaimagen'],
                                    'imagenes' => $dataURL['imagenes'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarPublicaciones($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListarComentarios()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $resultado = $this->model->mdlListarComentarios($dataURL["idpub"]);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistrarComentarios()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('publicacionid' => $dataURL['publicacionid'],
                                    'comentario' => $dataURL['comentario'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarComentario($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrModLikes()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('id' => $dataURL['publicacionid'],
                                    'usuario' => $dataURL['usuario']);

                $resultado = $this->model->mdlInsertarLikes($arrayData);

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

