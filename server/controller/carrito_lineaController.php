<?php

require 'genericController.php';
require '../dao/carrito_lineaDAO.php';

$carrito_lineaDAO = new Carrito_LineaDAO();

executeQuery($carrito_lineaDAO);