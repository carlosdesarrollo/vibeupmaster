<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once '../model/model.targets.php';
    
    $oContralador = new CTargetsController();
    $page = "iIndex";
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }    
    
    switch ($page){
        case 'iListarTargetsMetas':
            $oContralador->ctrListarTargetsMetas();
            break;
        case 'iRegTargets':
            $oContralador->ctrRegistrarTargets();
            break;
        case 'iListarTargets':
            $oContralador->ctrListarTargets();
            break;
        case 'iCargaMedallas':
            $oContralador->ctrCargaMedallas();
        break;  
    }
    class CTargetsController{
        
        private $model;
        
        public function __CONSTRUCT(){
            $this->model  = new ModeloTargets();
        }

        public function ctrListarTargetsMetas()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {

                $resultado = $this->model->mdlCargarListMetasTargets();

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrListarTargets()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $resultado = $this->model->mdlCargarTargets($dataURL["usuario"]);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

        public function ctrRegistrarTargets()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                $dataURL = json_decode(file_get_contents('php://input'), true);
                $arrayData = array('id' => $dataURL['id'],
                                    'metatargetsid' => $dataURL['metatargetsid'],
                                    'rutaimg' => $dataURL['rutaimg'],
                                    'descripcion' => $dataURL['descripcion'],
                                    'fechainicio' => $dataURL['fechainicio'],
                                    'fechafin' => $dataURL['fechafin'],
                                    'cantmedallas' => $dataURL['cantmedallas'],
                                    'imagen' => $dataURL['imagen'],
                                    'usuario' => $dataURL['usuario'],
                                    'idtipomedalla' => $dataURL['idtipomedalla']);

                $resultado = $this->model->mdlInsertarTargets($arrayData);

                echo json_encode($resultado, JSON_FORCE_OBJECT);
            }else{
                http_response_code(404);
                echo json_encode(
                    array('status' => '404', 'message' => 'Error en servicio', 'data' => null )
                );
            }
            
        }

            public function ctrCargaMedallas()
        {
            if ($_SERVER['REQUEST_METHOD'] == "POST") {
                //$dataURL = json_decode(file_get_contents('php://input'), true);

                $resultado = $this->model->mdlListarMedalla();

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

