<?php

// Include the dbconfig.php file to get the database access credentials and connection object
require('dbconfig.php');

// Get a new mysqli connection object
$conn = getDbInstance();

// Retrieve the data from the "categories" table
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);

// Initialize an empty array to hold the categories
$categories = array();

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Loop through the rows and add each category to the array
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['category'];
    }
}
    
// Return the categories as a JSON array
echo json_encode($categories);

// Close the database connection
$conn->close();

?>
