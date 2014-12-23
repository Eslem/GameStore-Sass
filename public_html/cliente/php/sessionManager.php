<?php

$bool = Array(false => 'false', true => 'true');

function startSessionWhenNonexistent() {
    if (!isset($_SESSION)) {
        session_start();
        session_unset();
        $_SESSION['creationTime'] = date("Y-m-d H:i:s", time());
    }
    echo session_id();
}

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

    /* Close */
    case 'close' :
        if (session_id() !== "") {
            session_unset();
            session_destroy();
        }
        break;
}
