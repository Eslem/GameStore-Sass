<?php

require "flyway.php";
require "../connectionManager.php";

 if (false) {
     $openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
     $openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];
     $connectionManager = new ConnectionManager($openshiftHost . ':' . $openshiftPort, 'adminXFr3dCn', 'vGhykHT4Ph2v', 'metro');
 } else {
    $connectionManager = new ConnectionManager('localhost', 'root', 'root', 'tienda');
 }
$flyway = new Flyway($connectionManager->getConnection());
$flyway->migrate();


