<?php

// Include the dbconfig.php file to get the database access credentials and connection object
require_once('dbconfig.php');

// Get a new mysqli connection object
$conn = getDbInstance();

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check for valid request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method']);
    exit();
}

// Extract the data from the request
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

error_log(print_r($DecodedData, true)); // Check if the data is being received correctly

// Check for required fields
$requiredFields = ['question'];
foreach ($requiredFields as $field) {
	if (empty($DecodedData[$field])) {
		echo json_encode(['status' => 'error', 'title' => 'Erreur','message' => 'Veuillez remplir tous les champs obligatoires.']);
		// Close the database connection
		$conn->close();
        exit();
    }
}

// Extract the data from the request
$question = $DecodedData['question'];
$question_date = date('Y-m-d H:i:s');

// Insert the data into the database
$sql = "INSERT INTO questions (question, question_date) VALUES (?, ?)";
# Prepare stmt or reports errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('ss', $question, $question_date)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or reports errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
# Close stmt
$stmt->close();

// Data inserted successfully
echo json_encode(['status' => 'success', 'title' => 'Merci !', 'message' => 'Nous vous remercions pour votre question. Nous y répondrons dans la prochaine session discussion.']);

// Close the database connection
$conn->close();

?>
