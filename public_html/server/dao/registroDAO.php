<?php

require_once 'genericDAO.php';

class registroDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'usuario';
        $this->propertyNames = ['nombre', 'apellido', 'direccion', 'telefono', 'email', 'alias', 'password'];
        $this->propertyTypes = ['s', 's', 's', 's', 's', 's', 's'];
    }

    function insert($user) {
        $connection = $this->connectionManager->getConnection();
        $query = "INSERT usuario ('nombre','apellido','direccion','telefono','email','alias','password')"
                . " VALUES ('$user[nombre]','$user[apellido]','$user[direccion]','$user[telefono]','$user[email]','$user[alias]','$user[password]',)";
        $result = $connection->query($query);

        if (is_object($result) && $result->num_rows > 0) {          
            while ($row = $result->fetch_assoc()) {
                $user = $row;
                unset($user['password']);
            }
            $_SESSION['user'] = $user;
            return $user;
        } else {
            return false;
        }
    }
}
   
