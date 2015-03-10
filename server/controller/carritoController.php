<?php

require 'genericController.php';
require '../dao/carritoDAO.php';

$carritoDAO = new CarritoDAO();

executeQuery($carritoDAO);