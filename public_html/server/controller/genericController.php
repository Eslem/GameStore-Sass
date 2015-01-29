<?php

function executeQuery($dao) {
    switch ($_POST['query']) {

        /* Select */
        case 'select' :
            echo json_encode($dao->select());
            break;

        /* Select by condition */
        case 'selectByCondition' :
            echo json_encode($dao->selectGeneric());
            break;


        /* Select (paginated) */
        case 'selectPaginated' :
            if (!isset($_POST["index"]) || !isset($_POST["quantity"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                $direction = $_POST['orientation'];
                $order = $_POST['order'];
                //$direction = $_POST['direction'];
                echo json_encode($dao->selectPaginated($_POST["index"], $_POST["quantity"], $order, $direction));
            }
            break;


        /* Select (joined) */
        case 'selectJoin' :
            $condition = null;
            if (isset($_POST["condition"])) {
                $condition = $_POST['condition'];
            }
            if (!isset($_POST["otherTable"]) || !isset($_POST["field"]) || !isset($_POST["otherField"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo json_encode($dao->selectJoin($_POST['otherTable'], $_POST['field'], $_POST['otherField'], $condition));
            }
            break;


        /* Find */
        case 'find' :
            if (!isset($_POST["id"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo json_encode($dao->find($_POST['id']));
            }
            break;


        /* Insert */
        case 'insert' :
            if (!isset($_POST["values"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->insert($_POST['values']);
            }
            break;
        /* Insert */
        case 'insertJSON' :
            if (!isset($_POST["values"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->insertJSON($_POST['values']);
            }
            break;


        /* Update */
        case 'update' :
            if (!isset($_POST["id"]) || !isset($_POST["values"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->update($_POST['id'], $_POST['values']);
            }
            break;


        /* Update by condition */
        case 'updateByCondition' :
            if (!isset($_POST["id"]) || !isset($_POST["values"]) || !isset($_POST["condition"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->genericUpdate($_POST['id'], $_POST['values'], $_POST["condition"]);
            }
            break;


        /* Delete */
        case 'delete' :
            if (!isset($_POST["id"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->delete($_POST['id']);
            }
            break;

        /* Login */
        case 'login':
            if (!isset($_POST['email']) || !isset($_POST['password'])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo json_encode($dao->login($_POST['email'], $_POST['password']));
            }
            break;

        /* Login */
        case 'logout':
            session_start();
            unset($_SESSION['user']);
            break;

        case 'getLogged':
            session_start();
            if (isset($_SESSION['user'])) {
                echo json_encode($_SESSION['user']);
            } else {
                header("HTTP/1.0 403 Forbidden");
            }
            break;


        /* Delete by condition */
        case 'deleteByCondition' :
            if (!isset($_POST["condition"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->genericDelete($_POST["condition"]);
            }
            break;


        default :
            header("HTTP/1.0 400 Request query is invalid");
            break;
    }
}
