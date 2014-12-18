<?php

require "flyway.php";

$openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
$openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];
echo 'mysql://' . $openshiftHost . ':' . $openshiftPort;
$link = mysqli_connect($openshiftHost . ':' . $openshiftPort, 'adminyGQgBlT', 'uAZR7FyX8zh9', 'metroidgames') or die("Error link" . mysqli_error($link));

$flyway = new Flyway($link);
$flyway->migrate();


