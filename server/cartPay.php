<?php

$cuentaOrigen = $_POST['cuentaOrigen'];
$cuentaDestino = $_POST['cuentaDestino'];
$cantidad = $_POST['cantidad'];
$concepto = $_POST['concepto'];
$pin = $_POST['pin'];

# data needs to be POSTed to the Play url as JSON.
# (some code from http://www.lornajane.net/posts/2011/posting-json-data-with-php-curl)
$data = json_encode(array("cuentaOrigen" => "$cuentaOrigen", "cuentaDestino" => "$cuentaDestino",
    "cantidad" => "$cantidad", "concepto" => "$concepto", "pin" => "$pin"));

$ch = curl_init('http://banco-slem.rhcloud.com/api/transferencia');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);

echo 'success';