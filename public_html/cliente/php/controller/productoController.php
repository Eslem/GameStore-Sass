<?php

require_once __DIR__ . '\..\controller\genericController.php';
require_once __DIR__ . '\..\dao\productoDAO.php';

$productoDAO = new ProductoDAO();

executeQuery($productoDAO);