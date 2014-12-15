<?php

require_once 'genericDAO.php';

class ProductoDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'producto';
        $this->propertyNames = ['nombre', 'descripcion', 'precio', 'categorias'];
        $this->propertyTypes = ['s', 's', 'd', 's'];
    }

}
