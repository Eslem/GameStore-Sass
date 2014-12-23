<?php

$bool = Array(false => 'false', true => 'true');

function getSession() {
    if (!isset($_SESSION['creationTime'])) {
        session_start();
        session_unset();
        $_SESSION['creationTime'] = date("Y-m-d H:i:s", time());
    }
    echo session_id();
}

function addToCart($product){
    if(!isset($_SESSION['cart']) || $_SESSION['cart']==null){
        $_SESSION['cart'] = array();
    }
    $_SESSION['cart'][]= $product;
    print_r($_SESSION);
}

session_start();
switch ($_POST['operation']) {

    /* Set */
    case 'set' :
    if (!isset($_POST["session"])) {
        header("HTTP/1.0 400 Request is missing session parameter");
    } else {
        startSessionWhenNonexistent();
        $_SESSION = $_POST["session"];
    }
    break;

    /* Get */
    case 'get' :
    startSessionWhenNonexistent();
    echo json_encode($_SESSION);
    break;

    case 'addToCart' :
    addToCart($_POST['id']);
    break;

    /* Close */
    case 'close' :
    if (session_id() !== "") {
        session_unset();
        session_destroy();
    }
    break;
}
