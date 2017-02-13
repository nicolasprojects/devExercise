<?php
require 'db.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// get the ordered list of items
$sql = "SELECT * FROM items ORDER BY sortorder";
$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// return a json object
header('Content-type: application/json; charset=utf-8');
echo json_encode($data);

$conn->close();
?>