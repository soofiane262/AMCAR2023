<?php

// Include the dbconfig.php file to get the database access credentials and connection object
require('dbconfig.php');

// Get a new mysqli connection object
$conn = getDbInstance();

// Retrieve the first row from the "speech" table
$sql = "SELECT speech FROM speech LIMIT 1";
$result = $conn->query($sql);

$speech = "";

// Check if a row was returned
if ($result->num_rows == 1) {
    // Get the first row and extract the "speech" value
    $row = $result->fetch_assoc();
    $speech = $row['speech'];
}

echo $speech;

// Close the database connection
$conn->close();

?>
