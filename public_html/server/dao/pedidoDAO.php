<?php

require_once 'genericDAO.php';

class AdministradorDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'pedido';
        $this->propertyNames = ['usuario', 'estado'];
        $this->propertyTypes = ['s', 's'];
    }
}
