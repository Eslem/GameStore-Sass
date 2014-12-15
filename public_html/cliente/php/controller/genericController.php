<?php

function executeQuery($dao) {
    switch ($_POST['query']) {
        case 'select' :
            echo json_encode($dao->select());
            break;
        case 'selectPaginated' :
            echo json_encode($dao->selectPaginated($_POST["index"], $_POST["quantity"]));
            break;
        case 'selectJoin' :
            $condition = null;
            if (isset($_POST["condition"])) {
                $condition = $_POST['condition'];
            }
            echo json_encode($dao->selectJoin($_POST['otherTable'], $_POST['field'], $_POST['otherField'], $condition));
            break;
        case 'find' :
            echo json_encode($dao->find($_POST['id']));
            break;
        case 'findByCondition' :
            echo json_encode($dao->findByCondition($_POST['condition']));
            break;
        case 'insert' :
            echo $dao->insert($_POST['values']);
            break;
        case 'update' :
            echo $dao->update($_POST['id'], $_POST['values']);
            break;
        case 'delete' :
            echo $dao->delete($_POST['id']);
            break;
        default :
            echo 'Invalid AJAX query';
            break;
    }
}
