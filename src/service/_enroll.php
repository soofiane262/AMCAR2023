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
$registration_date = new DateTime();
$registration_date = $registration_date->format('Y-m-d H:i:s');

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

// Insert the data into the first database
$sql = "INSERT INTO enroll ( firstName, lastName, phone, email, specialty, statut, sector, place, city, newsletter, registration_date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
# Prepare stmt or report errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('sssssssssss', $firstName, $lastName, $phone, $email, $specialty, $statut, $sector, $place, $city, $newsletter, $registration_date)) or trigger_error($stmt->error, E_USER_ERROR);
# Execute stmt or report errors
($stmt->execute()) or trigger_error($stmt->error, E_USER_ERROR);
# Close stmt
$stmt->close();

// Close the first database connection
$conn->close();

// Data inserted successfully in the first database

// Define the mapping of specialty names to IDs
$specialtyMapping = [
	'Allergologie' => 24,
	'Anatomie et cytologie pathologiques humaines' => 25,
	'Anesthésie-réanimation' => 26,
	'Angiologie, artères, veines, lymphatiques' => 27,
	'Autre' => 73,
	'Biologie médicale' => 28,
	'Cancérologie' => 29,
	'Cardiologie et médecine des affections vasculaires' => 31,
	'Cardiologue' => 1,
	'Chirurgie dentaire' => 32,
	'Chirurgie générale' => 33,
	'Chirurgie infantile' => 34,
	'Chirurgie maxillo-faciale' => 35,
	'Chirurgie orthopédique, traumatologie' => 36,
	'Chirurgie plastique' => 37,
	'Chirurgien cardio-vasculaire ' => 2,
	'Dentiste' => 69,
	'Dermato-vénéréologie' => 38,
	'Diabétologie-nutrition' => 39,
	'Diététique' => 40,
	'Endocrinologie et maladies métaboliques' => 41,
	'Gastroentérologie' => 42,
	'Gynécologie obstétrique' => 43,
	'Laboratoire' => 72,
	'Maladies du sang' => 44,
	'Médecine d\'urgence' => 45,
	'Médecine du sport' => 46,
	'Médecine du travail' => 47,
	'Médecine générale' => 48,
	'Médecine interne' => 49,
	'Médecine physique et de réadaptation' => 50,
	'Néphrologie' => 55,
	'Neurochirurgie' => 51,
	'Neurologie' => 52,
	'Neuropsychiatrie' => 53,
	'Nutrition' => 54,
	'Ophtalmologie' => 56,
	'Ostéopathie' => 57,
	'Oto-rhino-laryngologie' => 58,
	'Partenaire' => 71,
	'Pathologie digestive' => 59,
	'Pédiatrie' => 62,
	'Pharmacien' => 68,
	'Pneumo-phtisiologie' => 60,
	'Psychiatrie' => 61,
	'Radiologie' => 63,
	'Rhumatologie' => 64,
	'Santé publique' => 65,
	'Sponsor' => 70,
	'Stomatologie' => 66,
	'Urologie' => 67,
];

// Define the mapping of sector names to IDs
$sectorMapping = [
	'Privé' => 1,
	'Public' => 2,
	'Militaire' => 3,
];

// Get the IDs of the specialty and sector based on provided text
$specialtyId = isset($specialtyMapping[$specialty]) ? $specialtyMapping[$specialty] : '';
$sectorId = isset($sectorMapping[$sector]) ? $sectorMapping[$sector] : '';

// Prepare data for the second API call
$data = [
	'evenementId' => 16,
	'notification' => 0,
	'sessionConference' => 'dfde13465da4681bd0b7b1256a87cbb2',
	'nomPrenom' => $firstName . ' ' . $lastName,
	'email' => $email,
	'idSpecialite' => $specialtyId,
	'idSecteur' => $sectorId,
	'idVille' => 46,
	'idPays' => $city,
	'statut' => $statut,
	'idCentreExercice' => 18,
	'newsletter' => $newsletter,
	'telephone' => $phone,
	'conjoint' => 0,
];

// Make a cURL POST request to the second API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://amcar.ma/new/src/controllers/_appEventSignUpController.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
if ($response == 'exists') {
	// Data already exists
	echo json_encode(['status' => 'exists', 'title' => 'Vous êtes déjà inscrit', 'message' => 'Nous sommes heureux de vous compter parmi nos participants. Si vous avez des questions, n\'hésitez pas à nous contacter.']);
} else if ($response == 'success') {
	// Data inserted successfully
	echo json_encode(['status' => 'success', 'title' => 'Félicitations !', 'message' => 'Vous êtes inscrit au congrès avec succès. Nous sommes impatients de vous voir.']);
} else {
	// Error
	error_log('Error inserting ' . $email . ' into the second database: ' . $response);
}

// Close the second database connection
curl_close($ch);

exit();
