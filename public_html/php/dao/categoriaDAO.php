<?php

require_once 'genericDAO.php';

class CategoriaDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'categoria';
        $this->propertyNames = ['nombre'];
        $this->propertyTypes = ['s'];
    }
}
