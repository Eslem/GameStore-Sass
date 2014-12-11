<?php

require_once __DIR__ . '\..\controller\genericController.php';
require_once __DIR__ . '\..\dao\categoriaDAO.php';

$categoriaDAO = new CategoriaDAO();

executeQuery($categoriaDAO);
