<?php

require 'genericController.php';
require '../dao/pedidoDAO.php';

$pedidoDAO = new PedidoDAO();

executeQuery($pedidoDAO);