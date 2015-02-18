<?php

$url= $_SERVER["REQUEST_URI"];
if ($url === ("/GameStore-Sass/public_html/server/pdfCreator.php")) {
    require 'dao/genericDAO.php';
} else {
    require_once 'genericDAO.php';
}

class PedidoDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'pedido';
        $this->propertyNames = ['usuario', 'estado'];
        $this->propertyTypes = ['s', 's'];
    }

}
