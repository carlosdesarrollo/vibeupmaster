<?php

class Conexion{

	static public function conectar(){

		$link = new PDO("mysql:host=localhost;dbname=bd_pays;port=3317",
			            "root",
			            "");

		$link->exec("set names utf8");

		return $link;

	}

	private static $_instance;
    
    public static function getInstance() {

        if (!isset(self::$_instance)) {
            try {
                    self::$_instance = new PDO(
                        'mysql:host=78.159.114.154;dbname=tuperfum_pays',
                        'tuperfum_pays',
                        'UsrPass123***',
                        array(
                            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_general_ci",
                            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
                        )
                    );
            } catch (PDOException $e) {

                throw new PDOException($e->getMessage(), (int) $e->getCode());
            }
        }

        return self::$_instance;
    }

    public static function closeInstance() {

            return self::$_instance = null;

    }

}