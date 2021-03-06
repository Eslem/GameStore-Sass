<?php
$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction

$tableName = 'categoria';

if (!$sidx) {
    $sidx = 1;
}
$db = mysqli_connect('localhost', 'root', 'root', 'tienda') or die("Connection Error: " . mysql_error());

$result = mysqli_query($db, "SELECT COUNT(*) AS count FROM $tableName");
while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    $count = $row['count'];
}

if ($count > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages) {
    $page = $total_pages;
}

$start = $limit * $page - $limit; // do not put $limit*($page - 1)
$SQL = "SELECT * FROM $tableName ORDER BY $sidx $sord LIMIT $start , $limit";
$result = mysqli_query($db, $SQL) or die("Couldn't execute query." . mysql_error());


$response = new stdClass;
$response->page = $page;
$response->total = $total_pages;
$response->records = $count;
$i = 0;
while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    //$response->rows[$i]['id'] = $row[id];
    $response->rows[$i]['cell'] = $row;
    //echo print_r($row);
    $i++;
}

//print_r($response);
echo json_encode($response);