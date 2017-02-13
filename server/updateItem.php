<?php
require 'db.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// update item
$sql = "UPDATE items SET
        description='".$_POST["description"]."',
        image='".$_POST["image"]."',
        sortorder='".$_POST["sortorder"]."'
        WHERE id='".$_POST["id"]."'";

if ($conn->query($sql) === TRUE) {
    echo "Updated record successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>