<?php

session_start();
switch ($_POST['operation']) {        

    /* Log In */
    case 'login' :
        if (isset($_POST['account'])) {
            $_SESSION = $_POST['account'];
        } else {
            header("HTTP/1.0 400 Request is missing session parameter");
        }
        break;


    /* Log Out */
    case 'logout' :
        unset($_SESSION['account']);
        break;


    /* Recover */
    case 'get' :
        if (isset($_SESSION['account'])) {
            echo json_encode($_SESSION['account']);
        } else {
            header("HTTP/1.0 400 Session account is empty or undefined");
        }
        break;


    /* Close */
    case 'close' :
        if (isset($_POST["session"])) {
            session_unset();
            session_destroy();
        }
        break;
}
