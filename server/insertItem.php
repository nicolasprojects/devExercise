<?php
require 'db.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// insert new item
$sql = "INSERT INTO items (id, description, image, sortorder)
		VALUES ('".$_POST["id"]."', '".$_POST["description"]."', '".$_POST["image"]."', '".$_POST["sortorder"]."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>