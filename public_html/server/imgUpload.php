<?php

$dir = "../cliente/images/games/";
$id = $_POST['id'];
foreach ($_FILES as $file) {
    if ($file["error"] > 0) {
        echo 0;
    } else {
        echo "Upload: " . $file["name"] . "<br>";
        echo "Type: " . $file["type"] . "<br>";
        echo "Size: " . ($file["size"] / 1024) . " kB<br>";
        echo "Stored in: " . $file["tmp_name"];
    }
}
if (file_exists($dir)) {
    foreach ($_FILES as $file) {
        print_r($file);
        $namesData = explode(".", $file["name"]);
        $type = $namesData[count($namesData)-1];
        move_uploaded_file($file["tmp_name"], $dir . $id . "." . $type);
        echo $dir . $id . "." . $type;
    }
} else {
    echo 0;
}
$data = $_POST['thumbnail'];
//$data = $_POST['image'];
// remove the prefix
$uri = substr($data, strpos($data, ",") + 1);
// create a filename for the new image
//$file = md5(uniqid()) . '.png';
$file = $dir . $id . '_thumb.png';
// decode the image data and save it to file
file_put_contents($file, base64_decode($uri));
// return the filename
echo $file;
?>