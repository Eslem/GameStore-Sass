<?php

require 'genericController.php';
require '../dao/administradorDAO.php';

$administradorDAO = new AdministradorDAO();

executeQuery($administradorDAO);
