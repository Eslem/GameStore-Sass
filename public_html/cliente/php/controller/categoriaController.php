<?php

require_once '../dao/categoriaDAO.php';

$categoriaDAO = new CategoriaDAO();

switch ($_POST['query']) {
    case 'select' :
        echo $categoriaDAO->select();
        break;
    case 'find' :
        echo $categoriaDAO->find($_POST['id']);
        break;
    case 'findByCondition' :
        echo $categoriaDAO->findByCondition($_POST['condition']);
        break;
    case 'insert' :
        echo $categoriaDAO->insert($_POST['values']);
        break;
    case 'update' :
        echo $categoriaDAO->update($_POST['id'], $_POST['values']);
        break;
    case 'delete' :
        echo $categoriaDAO->delete($_POST['id']);
        break;
    default :
        echo 'Invalid AJAX query';
        break;
}