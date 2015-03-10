<?php

require 'genericController.php';
require '../dao/productoDAO.php';

$productoDAO = new ProductoDAO();

executeQuery($productoDAO);
