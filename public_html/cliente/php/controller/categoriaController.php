<?php
require 'genericController.php';
require '../dao/categoriaDAO.php';

$categoriaDAO = new CategoriaDAO();

executeQuery($categoriaDAO);
