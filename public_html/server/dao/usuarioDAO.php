<?php

require_once 'genericDAO.php';

class usuarioDAO extends GenericDAO {

    function __construct() {
        parent::__construct();
        $this->tableName = 'usuario';
        $this->propertyNames = ['alias', 'nombre','apellido', 'direccion', 'telefono', 'email',  'password'];
        $this->propertyTypes = ['s', 's', 's', 's', 's', 's', 's'];
    }

    function login($email, $password) {
        $connection = $this->connectionManager->getConnection();
        $query = "SELECT * FROM " . $this->tableName . " WHERE email='$email' and password='$password'";
        $result = $connection->query($query);

        if (is_object($result) && $result->num_rows > 0) {
            session_start();
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
   
