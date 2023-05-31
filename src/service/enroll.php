<?php

// Set the default timezone to GMT+1
date_default_timezone_set('Africa/Casablanca');

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
$requiredFields = ['firstName', 'lastName', 'phone', 'email', 'specialty', 'statut', 'sector', 'place', 'city'];
foreach ($requiredFields as $field) {
	if (empty($DecodedData[$field])) {
		echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Veuillez remplir tous les champs obligatoires.']);
		// Close the database connection
		$conn->close();
		exit();
	}
}

// Extract the data from the request
$firstName = $DecodedData['firstName'];
$lastName = $DecodedData['lastName'];
$phone = $DecodedData['phone'];
$email = $DecodedData['email'];
$specialty = $DecodedData['specialty'];
$statut = $DecodedData['statut'];
$sector = $DecodedData['sector'];
$place = $DecodedData['place'];
$city = $DecodedData['city'];
$newsletter = $DecodedData['newsletter'];
if ($newsletter === true || $newsletter === "Oui") {
	$newsletter = true;
} else {
	$newsletter = false;
}
$registration_date = new DateTime();
$registration_date = $registration_date->format('Y-m-d H:i:s');
$origin = 'app';

// Include the dbconfig.php file to get the database access credentials and connection object
require_once('dbconfig.php');
// Get a new mysqli connection object
$conn = getDbInstance();

// Check if the connection was successful
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// Check if the data already exists in the database
$sql = "SELECT COUNT(*) as count FROM enroll WHERE phone = ? OR email = ? OR (firstName = ? AND lastName = ? AND specialty = ? AND statut = ? AND sector = ?)";
# Prepare stmt or report errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('sssssss',  $phone, $email, $firstName, $lastName, $specialty, $statut, $sector)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or report errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
# Save data or report errors
($result = $stmt->get_result()) or trigger_error($stmt->error, E_USER_ERROR);
# Close stmt
$stmt->close();

if ($result->fetch_assoc()['count'] > 0) {
	// Data already exists
	echo json_encode(['status' => 'exists', 'title' => 'Vous êtes déjà inscrit', 'message' => 'Nous sommes heureux de vous compter parmi nos participants. Si vous avez des questions, n\'hésitez pas à nous contacter.']);
	// Close the database connection
	$conn->close();
	exit();
}

// Prepare data for the second API call
$data = [
	'evenementId' => 16,
	'notification' => 0,
	'sessionConference' => 'dfde13465da4681bd0b7b1256a87cbb2',
	'nomPrenom' => $firstName . ' ' . $lastName,
	'email' => $email,
	'idSpecialite' => 1,
	'idSecteur' => 1,
	'idVille' => 46,
	'idPays' => $city,
	'statut' => $statut,
	'idCentreExercice' => 18,
	'newsletter' => $newsletter,
	'telephone' => $phone,
	'conjoint' => 0,
];

// Make a cURL POST request to the website API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://amcar.ma/new/src/controllers/_appEventSignUpController.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

// Close the second database connection
curl_close($ch);

if ($response == 'exists') {
	$origin = 'website';
	// Data already exists
	echo json_encode(['status' => 'exists', 'title' => 'Vous êtes déjà inscrit', 'message' => 'Nous sommes heureux de vous compter parmi nos participants. Si vous avez des questions, n\'hésitez pas à nous contacter.']);
} else if ($response !== 'success') {
	// Error
	error_log('Error inserting ' . $email . ' into the second database: ' . $response);
}

// Insert the data into the first database
$sql = "INSERT INTO enroll ( firstName, lastName, phone, email, specialty, statut, sector, place, city, newsletter, registration_date, origin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
# Prepare stmt or report errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('ssssssssssss', $firstName, $lastName, $phone, $email, $specialty, $statut, $sector, $place, $city, $newsletter, $registration_date, $origin)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or report errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);

// Check if the data was inserted successfully
if ($stmt->affected_rows > 0 && $origin == 'app') {
	// Data inserted successfully
	echo json_encode(['status' => 'success', 'title' => 'Félicitations !', 'message' => 'Vous êtes inscrit au congrès avec succès. Nous sommes impatients de vous voir.']);
} else if ($origin == 'app') {
	// Error
	error_log('Error inserting ' . $email . ' into the first database: ' . $stmt->error);
	echo json_encode(['status' => 'error', 'title' => 'Erreur', 'message' => 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.']);
}
# Close stmt
$stmt->close();

// Close the first database connection
$conn->close();

exit();
