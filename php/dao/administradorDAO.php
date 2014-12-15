<?php

require_once 'genericDAO.php';

class AdministradorDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'administrador';
        $this->propertyNames = ['nombre', 'apellido', 'direccion', 'telefono', 'email', 'alias', 'password'];
        $this->propertyTypes = ['s', 's', 's', 's', 's', 's', 's'];
    }
}
