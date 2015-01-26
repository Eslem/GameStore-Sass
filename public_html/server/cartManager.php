<?php

session_start();
switch ($_POST['operation']) {

    /* Set */
    case 'set' :
        if (isset($_POST['cart'])) {
            $_SESSION['cart'] = $_POST['cart'];
        } else {
            header("HTTP/1.0 400 Request is missing session parameter");
        }
        break;


    /* Get */
    case 'get' :
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = Array();
        }
        echo json_encode($_SESSION['cart']);
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


    /* Increase product count */
    case 'increase' :
        $product = $_POST['id'];
        if (!isset($_SESSION['cart']) || $_SESSION['cart'] == null) {
            $_SESSION['cart'] = array();
        } else {
            $_SESSION['cart'][$product] ++;
        }
        echo json_encode($_SESSION['cart']);
        break;


    /* Decrease product count */
    case 'decrease' :
        $product = $_POST['id'];
        if (!isset($_SESSION['cart']) || $_SESSION['cart'] == null) {
            $_SESSION['cart'] = array();
        } else {
            $_SESSION['cart'][$product] --;

            $result = $_SESSION['cart'];
            if ($_SESSION['cart'][$product] < 1) {
                unset($_SESSION['cart'][$product]);
                unset($result[$product]);
                $result['toDelete'] = $product;
            }
        }
        echo json_encode($result);
        break;


    /* Remove */
    case 'remove' :
        $product = $_POST['id'];
        if (!isset($_SESSION['cart']) || $_SESSION['cart'] == null) {
            $_SESSION['cart'] = array();
        } else {
            unset($_SESSION['cart'][$product]);
        }
        echo json_encode($_SESSION['cart']);
        break;


    /* Empty */
    case 'empty' :
        $_SESSION['cart'] = array();
        //echo json_encode($_SESSION['cart']);
        break;
}
