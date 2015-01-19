<?php

require_once 'genericDAO.php';

class Pedido_LineaDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'linea_pedido';
        $this->propertyNames = ['id_pedido', 'id_producto', 'cantidad'];
        $this->propertyTypes = ['i', 'i', 's'];
    }
}
