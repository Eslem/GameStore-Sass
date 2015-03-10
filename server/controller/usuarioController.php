<?php

require 'genericController.php';
require '../dao/usuarioDAO.php';

$usuarioDAO = new UsuarioDAO();

executeQuery($usuarioDAO);
