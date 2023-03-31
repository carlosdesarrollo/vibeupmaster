<?php

/**
 * ENTITY USUARIOS
 */
class Usuarios
{
	private $id;
	private $rolid;  
	private $personaid;
	private $usuario;  
	private $contrasena;   
	private $tipologin;   
	private $estado;   
	private $usuariocreacion;   
	private $fechacreacion;   
	private $usuariomodificacion;   
	private $fechamodificacion; 

	public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setRol($rolid)
    {
        $this->rolid = $rolid;

        return $this;
    }

    public function getRol()
    {
        return $this->rolid;
    }
	
}