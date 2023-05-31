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
$requiredFields = ['firstName', 'lastName', 'phone', 'email', 'specialty', 'statut', 'sector', 'place', 'city', 'country', 'newsletter'];
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
$country = $DecodedData['country'];
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
$sql = "SELECT COUNT(*) as count FROM enroll WHERE email = ?";
# Prepare stmt or report errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('s', $email)) or trigger_error($stmt->error, E_USER_ERROR);
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

// Define the mapping of sector names to IDs
$sectorMapping = [
	'Privé' => 1,
	'Public' => 2,
	'Militaire' => 3,
];

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

// Define the mapping of place names to IDs
$placeMapping = [
	'Autre' => 18,
	'Cabinet privé' => 16,
	'Cardio A - Rabat' => 13,
	'Cardio B - Rabat' => 14,
	'CHU - Agadir' => 4,
	'CHU Hassan II - Fès' => 3,
	'CHU Ibn Sina - Rabat' => 5,
	'CHU Ibno Rochd - Casablanca' => 1,
	'CHU Med VI Marrakech - Marrakech' => 2,
	'CHU Mohammed VI - Oujda' => 6,
	'Clinique Privée' => 17,
	'Hôpital Cheikh Khalifa - Casablanca' => 10,
	'Hôpital Cheikh Zaid - Rabat' => 12,
	'Hôpital Militaire Avicenne - Marrakech' => 8,
	'Hôpital Militaire d\'Instruction Mohamed V - Rabat' => 7,
	'Hôpital Militaire Moulay Ismail - Meknes' => 9,
	'Hôpital Régional' => 15,
];

// Define the mapping of city names to IDs
$cityMapping = [
	'Autre' => 46,
	'Agadir' => 1,
	'Al Hoceima' => 2,
	'Alger' => 44,
	'Azemmour' => 45,
	'Azrou' => 3,
	'Béni Mellal' => 4,
	'Benslimane' => 5,
	'Berkane' => 6,
	'Berrechid' => 7,
	'Casablanca' => 8,
	'El Jadida' => 9,
	'El Kelaa des Sraghna' => 10,
	'El Ksar El Kebir' => 11,
	'Errachidia' => 12,
	'Essaouira' => 13,
	'Fes' => 14,
	'Fquih Ben Salah' => 15,
	'Guelmim' => 16,
	'Inezgane' => 17,
	'Kenitra' => 18,
	'Khemisset' => 19,
	'Khenifra' => 20,
	'Khouribga' => 21,
	'Laayoune' => 22,
	'Larache' => 23,
	'Marrakech' => 24,
	'Meknes' => 25,
	'Mohammedia' => 26,
	'Monaco' => 47,
	'Nador' => 27,
	'Ouarzazate' => 28,
	'Oujda' => 29,
	'Rabat' => 30,
	'Safi' => 31,
	'Sale' => 32,
	'Sefrou' => 33,
	'Settat' => 34,
	'Sidi Bennour' => 35,
	'Sidi Kacem' => 36,
	'Tanger' => 37,
	'Taroudant' => 38,
	'Taza' => 39,
	'Temara' => 40,
	'Tetouan' => 41,
	'Tiznit' => 42,
	'Youssoufia' => 43,
];

// Get the IDs of the specialty and sector based on provided text
$sectorId = isset($sectorMapping[$sector]) ? $sectorMapping[$sector] : '';
$specialtyId = isset($specialtyMapping[$specialty]) ? $specialtyMapping[$specialty] : '';
$placeId = isset($placeMapping[$place]) ? $placeMapping[$place] : '';
$cityId = isset($cityMapping[$city]) ? $cityMapping[$city] : '';

// Prepare data for the second API call
$data = [
	'evenementId' => 16,
	'notification' => 0,
	'sessionConference' => 'dfde13465da4681bd0b7b1256a87cbb2',
	'nomPrenom' => $firstName . ' ' . $lastName,
	'email' => $email,
	'idSpecialite' => $specialtyId,
	'idSecteur' => $sectorId,
	'idVille' => $cityId,
	'idPays' => $country,
	'statut' => $statut,
	'idCentreExercice' => $placeId,
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
$sql = "INSERT INTO enroll ( firstName, lastName, phone, email, specialty, statut, sector, place, city, country, newsletter, registration_date, origin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
# Prepare stmt or report errors
($stmt = $conn->prepare($sql)) or trigger_error($mysqli->error, E_USER_ERROR);
($stmt->bind_param('sssssssssssss', $firstName, $lastName, $phone, $email, $specialty, $statut, $sector, $place, $city, $country, $newsletter, $registration_date, $origin)) or trigger_error($stmt->error, E_USER_ERROR);
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
