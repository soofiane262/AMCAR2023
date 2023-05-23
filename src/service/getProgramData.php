<?php

// Include the dbconfig.php file to get the database access credentials and connection object
require('dbconfig.php');

// Get a new mysqli connection object
$conn = getDbInstance();

// Retrieve the data from the "program" table
$sql = "SELECT id, date, time, start_time, end_time, color, icon, title, laboratory, image, speakers, moderators FROM program";
$result = $conn->query($sql);

// Initialize an empty array to hold the program
$program = array();

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Loop through the rows and format each program item as desired
    while ($row = $result->fetch_assoc()) {
        $program_item = array(
            'id' => $row['id'],
            'date' => $row['date'],
            'time' => (bool)$row['time'],
            'startTime' => $row['start_time'],
            'endTime' => $row['end_time'],
            'color' => $row['color'],
            'icon' => $row['icon'],
            'title' => $row['title'],
            'laboratory' => $row['laboratory'],
            'image' => $row['image']
        );

        // Add speakers and moderators if they exist
        if ($row['speakers']) {
            $program_item['speakers'] = json_decode($row['speakers'], true);
        }

        if ($row['moderators']) {
            $program_item['moderators'] = json_decode($row['moderators'], true);
        }

        // Add the program item to the array
        $program[] = $program_item;
    }
}

// Return the program as a JSON array
echo json_encode($program);

// Close the database connection
$conn->close();

?>
