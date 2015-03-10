<?php

require_once 'genericDAO.php';

class Carrito_LineaDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'linea_carrito';
        $this->propertyNames = ['id_carrito', 'id_producto', 'cantidad'];
        $this->propertyTypes = ['i', 'i', 's'];
    }
}
