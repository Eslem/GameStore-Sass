<?php

require_once 'genericDAO.php';

$email = $_POST["email"];
$password = $_POST["password"];

$connection = construct();



$connection->prepare("SELECT * FROM usuario WHERE email = ?");
$connection->bind_param( "s", $email);
$connection->execute();

$connection->bind_result($resultado);
$connection->fetch();

echo $resultado;








?>      



