<?php
// Include the dbconfig.php file to get the database access credentials and connection object
require('dbconfig.php');

// Get a new mysqli connection object
$conn = getDbInstance();

// Query to fetch data from the enroll table
$sql = "SELECT firstName, lastName, category, sector, phone, email, specialty, accommodation FROM enroll";

// Execute the query
$result = $conn->query($sql);

// Create a file pointer for output
$fp = fopen('enroll.csv', 'w');

// Write the column headers to the CSV file
fputcsv($fp, array('First Name', 'Last Name', 'Category', 'Sector', 'Phone', 'Email', 'Specialty', 'Accommodation'));

// Loop through the query results and write each row to the CSV file
while ($row = $result->fetch_assoc()) {
    fputcsv($fp, $row);
}

// Close the file pointer
fclose($fp);

// Set headers for file download
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="enroll.csv"');

// Output the file contents
readfile('enroll.csv');

// Close the database connection
$conn->close();
?>
