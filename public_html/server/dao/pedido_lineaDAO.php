<?php

require_once 'genericDAO.php';

class AdministradorDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'pedido_linea';
        $this->propertyNames = ['id_pedido', 'id_producto', 'cantidad'];
        $this->propertyTypes = ['s', 's', 's'];
    }
}
