<?php


$username = "adminyGQgBlT";
$password = "uAZR7FyX8zh9";
$dbname = "metroidgames";

$openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
$openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];


$servername = "mysql://$openshiftHost:$openshiftPort";


$conn = new mysqli($openshiftHost, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//$sql = "SELECT 7  from DUAL";
//$result = $conn->query($sql);

echo json_encode($result->fetch_assoc());
$conn->close();




header ("location: cliente/index.html");
