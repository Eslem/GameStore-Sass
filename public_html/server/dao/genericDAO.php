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

    function resultToArray($result) {
        $resultArray = [];
        while ($row = $result->fetch_assoc()) {
            foreach ($row as &$property) {
                $property = utf8_encode($property);
            }
            array_push($resultArray, $row);
        }
        return $resultArray;
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

    function insert($values) {
        $connection = $this->connectionManager->getConnection();

        $query = "INSERT INTO " . $this->tableName . " (" . $this->arrayToList($this->propertyNames) .
                ") VALUES (?";
        for ($i = 1; $i < count($values); $i++) {
            $query .= ", ?";
        }
        $query .= ")";

        $this->prepareAndExecuteStatement($connection, $query, $values);
        return true;
    }

    function genericSelect($condition) {
        $connection = $this->connectionManager->getConnection();
        if ($condition === null) {
            $condition = '';
        }

        $query = "SELECT * FROM " . $this->tableName . $condition;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows > 0) {
            $resultArray = $this->resultToArray($result);
            return $resultArray;
        }
    }

    function select() {
        return $this->genericSelect(null);
    }

    function selectPaginated($index, $quantity, $order, $orientation) {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT COUNT(*) as count FROM " . $this->tableName;
        $result = $connection->query($query);

        $count = 0;
        while ($row = $result->fetch_assoc()) {
            $count = $row['count'];
        }

        $index = $index * $quantity;

        $query = "SELECT * FROM " . $this->tableName . " ORDER BY $order $orientation LIMIT " . $index . ", " . $quantity;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);
        $obj = [];
        $obj['order'] = $query;

        if (is_object($result) && $result->num_rows > 0) {
            $obj['elems'] = $this->resultToArray($result);
        }
        $obj['count'] = $count;
        return $obj;
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
            $resultArray = $this->resultToArray($result);
            return $resultArray;
        }
    }

    function find($id) {
        $connection = $this->connectionManager->getConnection();

        $query = "SELECT * FROM " . $this->tableName . " WHERE id = " . $id;
        $result = $connection->query($query);
        $this->connectionManager->closeConnection($connection);

        if (is_object($result) && $result->num_rows === 1) {
            $row = $result->fetch_assoc();
            foreach ($row as &$property) {
                $property = utf8_encode($property);
            }
            return $row;
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
        $query .= " WHERE " . $condition;

        $this->prepareAndExecuteStatement($connection, $query, $values);
    }

    function genericDelete($condition) {
        $connection = $this->connectionManager->getConnection();

        $query = "DELETE FROM " . $this->tableName . " WHERE " . $condition;
        $result = $connection->query($query);

        $this->connectionManager->closeConnection($connection);
        return $result;
    }

    function update($id, $values) {
        $this->genericUpdate($id, $values, "id = " . $id);
    }

    function delete($id) {
        $this->genericDelete("id = " . $id);
    }

    function jqgrid() {/*
      $page = $_GET['page']; // get the requested page
      $limit = $_GET['rows']; // get how many rows we want to have into the grid
      $sidx = $_GET['sidx']; // get index row - i.e. user click to sort
      $sord = $_GET['sord']; // get the direction
      if (!$sidx)
      $sidx = 1;
      // connect to the database
      $db = $this->connectionManager->getConnection();

      // mysql_select_db($database) or die("Error conecting to db.");
      $query = "SELECT COUNT(*) AS count FROM invheader a, " . $this->tableName . " b WHERE a.id=b.id";
      $result = $connection->query($query);

      // $result = mysql_query("SELECT COUNT(*) AS count FROM invheader a, " . $this->tableName . " b WHERE a.id=b.id");
      $row = mysqli_fetch_array($result, MYSQL_ASSOC);
      $count = $row['count'];

      if ($count > 0) {
      $total_pages = ceil($count / $limit);
      } else {
      $total_pages = 0;
      }
      if ($page > $total_pages)
      $page = $total_pages;

      $start = $limit * $page - $limit; // do not put $limit*($page - 1)
      $SQL = "SELECT a.* FROM invheader a,  " . $this->tableName . " b WHERE a.id=b.id ORDER BY $sidx $sord LIMIT $start , $limit";
      $result = $connection->query($query);

      $responce->page = $page;
      $responce->total = $total_pages;
      $responce->records = $count;
      $i = 0;
      while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
      $responce->rows[$i]['id'] = $row[id];
      $responce->rows[$i]['cell'] = $row;//array($row[id], $row[invdate], $row[name], $row[amount], $row[tax], $row[total], $row[note]);
      $i++;
      }
      echo json_encode($responce); */
    }

}
