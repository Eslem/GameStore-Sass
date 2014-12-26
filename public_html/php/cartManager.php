<?php

session_start();
switch ($_POST['operation']) {

    /* Set */
    case 'set' :
        if (isset($_POST["session"])) {
            $_SESSION = $_POST["session"];
        } else {
            header("HTTP/1.0 400 Request is missing session parameter");
        }
        break;


    /* Get */
    case 'get' :
        if (isset($_SESSION['cart']) || count($_SESSION['cart']) === 0) {
            echo json_encode($_SESSION['cart']);
        } else {
            header("HTTP/1.0 400 Session cart is empty or undefined");
        }
        break;


    /* Add */
    case 'add' :
        $product = $_POST['id'];
        if (!isset($_SESSION['cart']) || $_SESSION['cart'] == null) {
            $_SESSION['cart'] = array();
        }
        if (!isset($_SESSION['cart'][$product])) {
            $_SESSION['cart'][$product] = 1;
        } else {
            $_SESSION['cart'][$product] ++;
        }
        echo json_encode($_SESSION['cart']);
        break;


    /* Empty */
    case 'empty' :
        $_SESSION['cart'] = array();
        echo json_encode($_SESSION['cart']);
        break;


    /* Close */
    case 'close' :
        if (isset($_POST["session"])) {
            session_unset();
            session_destroy();
        }
        break;
}
