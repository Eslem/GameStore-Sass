<?php

require_once '../dao/productoDAO.php';

$productoDAO = new ProductoDAO();

switch ($_POST['query']) {
    case 'select' :
        echo $productoDAO->select();
        break;
    case 'find' :
        echo $productoDAO->find($_POST['id']);
        break;
    case 'findByCondition' :
        echo $productoDAO->findByCondition($_POST['condition']);
        break;
    case 'insert' :
        echo $productoDAO->insert($_POST['values']);
        break;
    case 'update' :
        echo $productoDAO->update($_POST['id'], $_POST['values']);
        break;
    case 'delete' :
        echo $productoDAO->delete($_POST['id']);
        break;
    default :
        echo 'Invalid AJAX query';
        break;
}