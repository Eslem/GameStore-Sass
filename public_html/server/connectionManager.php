<?php

class ConnectionManager {    
/*
    function __construct($server, $username, $password, $database) {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }
*/
    function __construct(){
        $this->server = "localhost";
        $this->username = "root";
        $this->password = "root";
        $this->database = "tienda";
    }

    public function getConnection() {
        $connection = mysqli_connect($this->server, $this->username, $this->password, $this->database) or die ("Error connectin ".mysqli_connect_error());

        if (!$connection) {
            die('Connection failed: ' . mysqli_connect_error());
        } else {
            return $connection;
        }
    }

    public function closeConnection($connection) {
        $connection->close();
    }

}
