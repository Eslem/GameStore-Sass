<?php

require "flyway.php";

$openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
$openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];
echo 'mysql://' . $openshiftHost . ':' . $openshiftPort;
$link = mysqli_connect($openshiftHost . ':' . $openshiftPort, 'adminXFr3dCn', 'vGhykHT4Ph2v', 'metro')
        or die("Error link" . mysqli_error($link));
/*
$link = mysqli_connect('localhost', 'root', '', 'tienda')
        or die("Error link" . mysqli_error($link));*/






$flyway = new Flyway($link);
$flyway->migrate();


