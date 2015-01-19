<?php

require 'genericController.php';
require '../dao/pedido_lineaDAO.php';

$pedido_lineaDAO = new Pedido_LineaDAO();

executeQuery($pedido_lineaDAO);