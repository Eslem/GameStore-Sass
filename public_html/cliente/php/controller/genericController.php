<?php

function executeQuery($dao) {
    switch ($_POST['query']) {

        /* Select */
        case 'select' :
            echo json_encode($dao->select());
            break;


        /* Select (paginated) */
        case 'selectPaginated' :
            if (!isset($_POST["index"]) || !isset($_POST["quantity"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo json_encode($dao->selectPaginated($_POST["index"], $_POST["quantity"]));
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


        /* Find by condition */
        case 'findByCondition' :
            if (!isset($_POST["condition"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo json_encode($dao->findByCondition($_POST['condition']));
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


        /* Update */
        case 'update' :
            if (!isset($_POST["id"]) || !isset($_POST["values"])) {
                header("HTTP/1.0 400 Request is missing parameters");
            } else {
                echo $dao->update($_POST['id'], $_POST['values']);
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


        default :
            header("HTTP/1.0 400 Request query is invalid");
            break;
    }
}
