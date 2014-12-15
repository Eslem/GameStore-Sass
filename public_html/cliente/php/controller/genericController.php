<?php

function executeQuery($dao) {
    switch ($_POST['query']) {
        case 'select' :
            echo $dao->select();
            break;
        case 'selectPaginated' :
            echo $dao->selectPaginated($_POST["index"], $_POST["quantity"]);
            break;
        case 'selectJoin' :
            $condition = null;
            if (isset($_POST["condition"])) $condition = $_POST['condition'];
            echo $dao->selectJoin($_POST['otherTable'], $_POST['field'], $_POST['otherField'], $condition);
            break;
        case 'find' :
            echo $dao->find($_POST['id']);
            break;
        case 'findByCondition' :
            echo $dao->findByCondition($_POST['condition']);
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
