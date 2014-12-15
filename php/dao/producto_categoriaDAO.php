<?php

require_once 'genericDAO.php';

class Producto_CategoriaDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'producto_categoria';
        $this->propertyNames = ['producto', 'categoria'];
        $this->propertyTypes = ['i', 'i'];
    }

}
