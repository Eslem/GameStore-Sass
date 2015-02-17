<?php

require_once 'genericDAO.php';

class CarritoDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'carrito';
        $this->propertyNames = ['usuario', 'estado'];
        $this->propertyTypes = ['s', 's'];
    }
}
