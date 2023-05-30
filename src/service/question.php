<?php

// Include the dbconfig.php file to get the database access credentials and connection object
require_once('dbconfig.php');

// Set the default timezone to GMT+1
date_default_timezone_set('Africa/Casablanca');

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

// Check for required fields
$requiredFields = ['question'];
foreach ($requiredFields as $field) {
	if (empty($DecodedData[$field])) {
		echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Veuillez remplir tous les champs obligatoires.']);
		// Close the database connection
		$conn->close();
		exit();
	}
}

// Extract the data from the request
$question = $DecodedData['question'];
$question_date = new DateTime();
$question_date = $question_date->format('Y-m-d H:i:s');

// Insert the data into the database
$sql = "INSERT INTO questions (question, question_date) VALUES (?, ?)";
# Prepare stmt or reports errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('ss', $question, $question_date)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or reports errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
// # Close stmt
// $stmt->close();

// -------------------------------------------------------------------------------------------------------------

// Check if the data was inserted successfully
if ($stmt->affected_rows > 0) {
	// Data inserted successfully

	# Close stmt
	$stmt->close();
	// Close the database connection
	$conn->close();

	// Prepare the data for the second API
	$postData = array(
		'enonceQ' => $question
	);

	// Set the URL of the second API
	$url = 'https://amcar.ma/QuestionAMCAR/src/envoyerQuestion.php';

	// Initialize cURL
	$curl = curl_init($url);

	// Set the cURL options
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

	// Execute the cURL request
	$response = curl_exec($curl);

	// Check for errors
	if (curl_errno($curl)) {
		echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Une erreur s\'est produite, veuillez réessayer ultérieurement.']);
	} else {
		// Check the response from the second API
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		if ($httpCode === 200) {
			echo json_encode(['status' => 'success', 'title' => 'Merci !', 'message' => 'Nous vous remercions pour votre question. Nous y répondrons dans la prochaine session discussion.']);
		} else {
			echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Une erreur s\'est produite, veuillez réessayer ultérieurement.']);
		}
	}

	// Close cURL
	curl_close($curl);
} else {
	// Error occurred while inserting data into the first table
	echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Une erreur s\'est produite, veuillez réessayer ultérieurement.']);
	// Close the database connection
	$conn->close();
}


// -------------------------------------------------------------------------------------------------------------

// // Data inserted successfully
// echo json_encode(['status' => 'success', 'title' => 'Merci !', 'message' => 'Nous vous remercions pour votre question. Nous y répondrons dans la prochaine session discussion.']);

// // Close the database connection
// $conn->close();
