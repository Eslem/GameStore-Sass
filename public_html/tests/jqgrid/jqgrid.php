<?php
ini_set('display_errors', 0);
$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction

//print_r($_GET);

if (!$sidx)
    $sidx = 1;
// connect to the database
$db = mysqli_connect("localhost", "root", "root", "tienda")
        or die("Connection Error: " . mysql_error());

//mysqli_select_db("tienda") or die("Error conecting to db.");
$result = mysqli_query($db, "SELECT COUNT(*) AS count FROM producto");
while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    $count = $row['count'];
}

if ($count > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages)
    $page = $total_pages;
$start = $limit * $page - $limit; // do not put $limit*($page - 1)
$SQL = "SELECT * FROM producto ORDER BY $sidx $sord LIMIT $start , $limit";
$result = mysqli_query($db, $SQL) or die("Couldn t execute query." . mysql_error());


$response = new stdClass;
$responce->page = $page;
$responce->total = $total_pages;
$responce->records = $count;
$i = 0;
while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    //$responce->rows[$i]['id'] = $row[id];
    $responce->rows[$i]['cell'] = $row;
    $i++;
}
echo json_encode($responce);
