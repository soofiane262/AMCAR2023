<?php
require_once "../../ressources/inc/conf.php";
require_once "../../ressources/inc/functions.php";
require_once "../../ressources/inc/Select.php";
require_once "../../ressources/inc/Add.php";
require_once "../../ressources/inc/Session.php";

Session::start();
extract($_POST);
$bdd = pdoConnection();
$select = new Select($bdd);
$add = new Add($bdd);

$SocieteInfo = current($select->getSocieteInfo());
$SMTP = current($select->getSMTPConfig());

// Get data
$continue = true;
$event = null;
$json = null;
if (!isset($sessionConference) or !isset($evenementId)) {
	echo ("error 1");
	$continue = false;
} elseif (empty($nomPrenom) or empty($email) or empty($telephone)) {
	echo ("error 2");
	$continue = false;
} else {
	$event = current($select->findByKey("evenement", "SESSION_KEY", $sessionConference, null, false));
	if (empty($event)) {
		echo ("error 3");
		$continue = false;
	}
}
if ($continue and !empty($event)) {
	$user = current($select->checkUserEvent($event->ID, $email));
	if (!empty($user)) {
		echo ("exists");
		$continue = false;
	} else
		echo ("success");
}

if ($continue) {
	$newWatcherId = $add->addNewSubscription($nomPrenom, $email, $event->ID, $idSpecialite, $idSecteur, $idVille, $idPays, $statut, $idCentreExercice, $newsletter, $telephone, $conjoint);
	if (!empty($newWatcherId)) {
		echo ("success");
	} else {
		echo ("error 4");
		$continue = false;
	}
}
