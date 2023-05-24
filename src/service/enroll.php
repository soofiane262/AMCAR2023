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

// Check if the data is being received correctly
error_log(print_r($DecodedData, true));

// Check for required fields
$requiredFields = ['firstName', 'lastName', 'phone', 'email', 'specialty', 'statut', 'sector', 'place', 'city'];
foreach ($requiredFields as $field) {
    if (empty($DecodedData[$field])) {
        echo json_encode(['status' => 'error', 'title' => 'Erreur','message' => 'Veuillez remplir tous les champs obligatoires.']);
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
$registration_date = date('Y-m-d H:i:s');

// Check if the data already exists in the database
$sql = "SELECT COUNT(*) as count FROM enroll WHERE phone = ? OR email = ? OR (firstName = ? AND lastName = ? AND specialty = ? AND statut = ? AND sector = ?)";
# Prepare stmt or reports errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('sssssss',  $phone, $email, $firstName, $lastName, $specialty, $statut, $sector)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or reports errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
# Save data or reports errors
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

// Insert the data into the database
$sql = "INSERT INTO enroll ( firstName, lastName, phone, email, specialty, statut, sector, place, city, newsletter, registration_date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
# Prepare stmt or reports errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('sssssssssss', $firstName, $lastName, $phone, $email, $specialty, $statut, $sector, $place, $city, $newsletter, $registration_date)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or reports errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
# Close stmt
$stmt->close();

// Data inserted successfully
echo json_encode(['status' => 'success', 'title' => 'Félicitations !', 'message' => 'Vous êtes inscrit au congrès avec succès. Nous sommes impatients de vous voir.']);

// Close the database connection
$conn->close();

?>
