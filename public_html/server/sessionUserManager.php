<?php

session_start();
switch ($_POST['operation']) {

    /* Set */
    case 'set' :
        if (isset($_POST['user'])) {
            $_SESSION['user'] = $_POST['user'];
            echo json_encode($_SESSION['user']);
        } else {
            header("HTTP/1.0 400 Request is missing session parameter");
        }
        break;


    /* Get */
    case 'get' :
        echo json_encode($_SESSION['user']);
        break;
  

    /* Empty */
    case 'empty' :
        unset($_SESSION['user']);
        break;
}
