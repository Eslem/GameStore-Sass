<?php

session_start();
switch ($_POST['operation']) {

    /* Set */
    case 'set' :
        if (isset($_POST['user'])) {
            $_SESSION = $_POST['user'];
        } else {
            header("HTTP/1.0 400 Request is missing session parameter");
        }
        break;


    /* Get */
    case 'get' :
        if (!isset($_SESSION['user'])) {
            $_SESSION['user'] = Array();
        }
        echo json_encode($_SESSION['user']);
        break;

  

    /* Empty */
    case 'empty' :
        $_SESSION['user'] = array();
        //echo json_encode($_SESSION['user']);
        break;


  
}
