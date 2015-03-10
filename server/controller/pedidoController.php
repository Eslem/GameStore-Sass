<?php

$url= $_SERVER["REQUEST_URI"];
if ($url === ("/GameStore-Sass/public_html/server/pdfCreator.php")) {
    require 'controller/genericController.php';
    require 'dao/pedidoDAO.php';
} else {
    require 'genericController.php';
    require '../dao/pedidoDAO.php';
}

$pedidoDAO = new PedidoDAO();

executeQuery($pedidoDAO);
