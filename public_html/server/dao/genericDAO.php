<?php

require_once '../connectionManager.php';

class GenericDAO {

    function __construct() {
        $this->connectionManager = new ConnectionManager();
       // $this->connectionManager = new ConnectionManager('localhost', 'root', 'root', 'tienda');
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
        echo '<br/>Invalid query "' . $query . '".';
    }
}

function select() {
    $connection = $this->connectionManager->getConnection();

    $query = "SELECT * FROM " . $this->tableName;
    $result = $connection->query($query);

    if (is_object($result) && $result->num_rows > 0) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property)
                $property = utf8_encode($property);
            array_push($resultArray, $row);
        }

        $this->connectionManager->closeConnection($connection);
        return $resultArray;
    } else {
        echo false;
    }
}

function selectPaginated($index, $quantity) {
    $connection = $this->connectionManager->getConnection();

    $query = "SELECT * FROM " . $this->tableName . " LIMIT " . $index . ", " . $quantity;
    $result = $connection->query($query);

    if (is_object($result) && $result->num_rows > 0) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property)
                $property = utf8_encode($property);
            array_push($resultArray, $row);
        }

        $this->connectionManager->closeConnection($connection);
        return $resultArray;
    } else {
        echo false;
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

        //echo $query;
    $result = $connection->query($query);

    if (is_object($result) && $result->num_rows > 0) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property)
                $property = utf8_encode($property);
            array_push($resultArray, $row);
        }

        $this->connectionManager->closeConnection($connection);
        return $resultArray;
    } else {
        echo false;
    }
}

function find($id) {
    $connection = $this->connectionManager->getConnection();

    $query = "SELECT * FROM " . $this->tableName . " WHERE id = ?";
    $preparedStatement = $connection->prepare($query);
    if (!!$preparedStatement) {
        $preparedStatement->bind_param("i", $id);
        $preparedStatement->execute();
        $result = $preparedStatement->get_result();
        $preparedStatement->close();
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows === 1) {
            $row = $result->fetch_assoc();
            foreach ($row as &$property) {
                $property = utf8_encode($property);
            }
            return $row;
        } else {
            echo false;
        }
    } else {
        echo '<br/>Invalid query "' . $query . '".';
    }
}

function findByCondition($condition) {
    $connection = $this->connectionManager->getConnection();

    $query = "SELECT * FROM " . $this->tableName . " WHERE " . $condition;
    $result = $connection->query($query);
    if (is_object($result) && $result->num_rows > 0) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property)
                $property = utf8_encode($property);
            array_push($resultArray, $row);
        }

        $this->connectionManager->closeConnection($connection);
        echo $resultArray;
    } else {
        echo false;
    }
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

function update($id, $values) {
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
    $query .= " WHERE id = ?";

    $this->prepareAndExecuteStatement($connection, $query, $values);
}

function delete($id) {
    $connection = $this->connectionManager->getConnection();

    $query = "DELETE FROM producto WHERE id = ?";

    $preparedStatement = $connection->prepare($query);
    if (!!$preparedStatement) {
        $preparedStatement->bind_param("i", $id);
        $result = $preparedStatement->execute();

        $this->connectionManager->closeConnection($connection);
        return $result;
    } else {
        echo '<br/>Invalid query "' . $query . '".';
    }
}

}
