<?php

require_once '../connectionManager.php';

class GenericDAO {

    function __construct() {

        if (false) {
            $openshiftHost = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
            $openshiftPort = $_ENV["OPENSHIFT_MYSQL_DB_PORT"];
            $this->connectionManager = new ConnectionManager($openshiftHost . ':' . $openshiftPort, 'adminXFr3dCn', 'vGhykHT4Ph2v', 'metro');
        } else {
            $this->connectionManager = new ConnectionManager('localhost', 'root', 'root', 'tienda');
        }

        $this->tableName = '';
        $this->propertyNames = [];
        $this->propertyTypes = [];
    }

    function arrayToList($array) {
        $string = $array[0];
        for ($i = 1; $i < count($array); $i++) {
            $string .= ', ' . $array[$i];
        }
        return $string;
    }

    function arrayToReferencedArray($array) {
        $refs = array();
        foreach ($array as $key => $value) {
            $refs[$key] = &$array[$key];
        }
        return $refs;
    }

    function prepareAndExecuteStatement($connection, $query, $values) {
        $preparedStatement = $connection->prepare($query);
        if (!!$preparedStatement) {
            $propertyTypes = join('', $this->propertyTypes);
            if (count($this->propertyTypes) < count($values)) {
                $propertyTypes .= 'i';
            }
            array_unshift($values, $propertyTypes);
            call_user_func_array(array($preparedStatement, 'bind_param'), $this->arrayToReferencedArray($values));
            $result = $preparedStatement->execute();

            $this->connectionManager->closeConnection($connection);
            return $result;
        } else {
            $errorMsg = '<br/>Invalid query parameters (';
            for ($i = 0; $i < count($values); $i++) {
                $errorMsg .= $values[$i];
                if ($i < count($values) - 1) {
                    $errorMsg .= ', ';
                } else {
                    $errorMsg .= ').';
                }
            }
            echo $errorMsg . '<br/>Original query: ' . $query . '.<br/>';
        }
    }

    function resultToArray($result) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property)
                $property = utf8_encode($property);
            array_push($resultArray, $row);
        }
        return $resultArray;
    }

    function insert($values) {
        $connection = $this->connectionManager->getConnection();

        $query = "INSERT INTO " . $this->tableName . " (" . $this->arrayToList($this->propertyNames) .
                ") VALUES (?";
        for ($i = 1; $i < count($values); $i++) {
            $query .= ", ?";
        }
        $query .= ")";

        $this->prepareAndExecuteStatement($connection, $query, $values);
    }

    function select() {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT * FROM " . $this->tableName;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows > 0) {
            return $this->resultToArray($result);
        }
    }

    function selectPaginated($index, $quantity) {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT * FROM " . $this->tableName . " LIMIT " . $index . ", " . $quantity;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows > 0) {
            return $this->resultToArray($result);
        }
    }

    function selectJoin($otherTable, $field, $otherField, $condition) {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT * FROM " . $this->tableName . ", " . $otherTable
                . " WHERE " . $this->tableName . "." . $field . " = "
                . $otherTable . "." . $otherField;

        if ($condition !== null) {
            $query = $query . " AND " . $condition;
        }
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows > 0) {
            return $this->resultToArray($result);
        }
    }

    function genericFind($condition) {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT * FROM " . $this->tableName . $condition;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);
        if (is_object($result) && $result->num_rows > 0) {
            return $this->resultToArray($result);
        }
    }

    function genericUpdate($id, $values, $condition) {
        $connection = $this->connectionManager->getConnection();

        $query = "UPDATE " . $this->tableName . " SET ";
        for ($i = 0; $i < count($values); $i++) {
            if ($this->propertyTypes[$i] === 's') {
                $values[$i] = "'" . $values[$i] . "'";
            }
            $query .= $this->propertyNames[$i] . " = ?";
            if ($i < count($values) - 1) {
                $query .= ", ";
            }
        }
        array_push($values, $id);
        $query .= $condition;

        $this->prepareAndExecuteStatement($connection, $query, $values);
    }

    function genericDelete($condition) {
        $connection = $this->connectionManager->getConnection();

        $query = "DELETE FROM " . $this->tableName . " WHERE " . $condition;
        $result = $connection->query($query);

        $this->connectionManager->closeConnection($connection);
        return $result;
    }

    function find($id) {
        $this->genericFind(" WHERE id = " . $id);
    }

    function update($id, $values) {
        $this->genericUpdate($id, $values, " WHERE id = " . $id);
    }

    function delete($id) {
        $this->genericDelete(" WHERE id = " . $id);
    }

}
