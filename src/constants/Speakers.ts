export interface Keynote {
	title: string;
	dateTime: string;
}

export interface Speaker {
	name: string;
	city: string;
	keynotes: Keynote[];
}

const Speakers: Speaker[] = [
	{
		name: "M. Alamai",
		city: "Casablanca",
		keynotes: [
			{
				title: "Actualités dans la gestion des dyslipidèmies en post SCA",
				dateTime: "Jeudi 08 à 18:30",
			},
		],
	},
	{
		name: "I. Asfalou",
		city: "Rabat",
		keynotes: [
			{
				title: "Comment utiliser le Strain au quotidien ?",
				dateTime: "Jeudi 08 à 15:00",
			},
		],
	},
	{
		name: "Ch. Caussin",
		city: "Paris",
		keynotes: [
			{
				title: "Cas cliniques de cardiologie interventionelle : Tavi, fermeture auricule G, fermeture FOP",
				dateTime: "Jeudi 08 à 15:00",
			},
			{
				title: "Fermeture percutanée des FOP : Pour qui ?",
				dateTime: "Jeudi 08 à 17:45",
			},
		],
	},
	{
		name: "Ch. Diakov",
		city: "Paris",
		keynotes: [
			{
				title: "Echo des valvulopathies : Situations difficiles",
				dateTime: "Jeudi 08 à 15:00",
			},
			{
				title: "Évaluation de la cardiotoxicité myocardique au cours de la chimiothérapie",
				dateTime: "Vendredi 09 à 08:30",
			},
		],
	},
	{
		name: "J. Dreyfus",
		city: "Paris",
		keynotes: [
			{
				title: "L'Échocardigraphie interventionelle des valves",
				dateTime: "Jeudi 08 à 17:15",
			},
			{
				title: "Traitement interventionnel des IT secondaires : Remplacer ou réparer ?",
				dateTime: "Jeudi 08 à 18:00",
			},
		],
	},
	{
		name: "I. Ismail",
		city: "Casablanca",
		keynotes: [
			{
				title: "Le parcours du patient candidat à un TAVI",
				dateTime: "Jeudi 08 à 17:30",
			},
		],
	},
	{
		name: "S. Kownator",
		city: "Thionville",
		keynotes: [
			{
				title: "Écho Doppler artériel des membres inférieurs",
				dateTime: "Jeudi 08 à 15:00",
			},
			{
				title: "Traitement médical des sténoses carotidiennes asymptomatiques",
				dateTime: "Samedi 10 à 08:50",
			},
		],
	},
	{
		name: "O. Pichot",
		city: "Grenoble",
		keynotes: [
			{
				title: "Atelier veines des MI",
				dateTime: "Jeudi 08 à 15:00",
			},
		],
	},
	{
		name: "I. Aberkane",
		city: "Paris",
		keynotes: [
			{
				title: "La Conférence de l'Année : Le triomphe de l'intelligence humaine",
				dateTime: "Jeudi 08 à 19:00",
			},
		],
	},
	{
		name: "N. Doghmi",
		city: "Rabat",
		keynotes: [
			{
				title: "L'IRM dans les myocardiopathies",
				dateTime: "Vendredi 09 à 08:50",
			},
		],
	},
	{
		name: "M. C. Malergue",
		city: "Paris",
		keynotes: [
			{
				title: "CMH : Diagnostic étiologique et pronostic ?",
				dateTime: "Vendredi 09 à 09:10",
			},
		],
	},
	{
		name: "T. Damy",

		city: "Paris",
		keynotes: [
			{
				title: "Traitement médical de l'amylose cardiaque : Où en est-on ?",
				dateTime: "Vendredi 09 à 09:30",
			},
		],
	},
	{
		name: "Z. Raissouni",
		city: "Tanger",
		keynotes: [
			{
				title: "Le rôle de l'ivabradine dans la prise en charge initiale du patient en insuffisance cardiaque",
				dateTime: "Vendredi 09 à 10:00",
			},
		],
	},
	{
		name: "Y. Chikhaoui",
		city: "Rabat",
		keynotes: [
			{
				title: "Traitements des rétrecissements aortiques congénitaux",
				dateTime: "Vendredi 09 à 11:00",
			},
		],
	},
	{
		name: "D. Bonnet",
		city: "Paris",
		keynotes: [
			{
				title: "Quoi de neuf dans l'imagerie des cardiopathies congénitales ?",
				dateTime: "Vendredi 09 à 11:25",
			},
			{
				title: "Cas cliniques cardiologie pédiatrique",
				dateTime: "Vendredi 09 à 13:00",
			},
		],
	},
	{
		name: "F. Roubertie",
		city: "Bordeaux",
		keynotes: [
			{
				title: "Quel ventricule unique opérer ? Quand et comment ?",
				dateTime: "Vendredi 09 à 11:55",
			},
		],
	},
	{
		name: "P. Valensi",
		city: "Paris",
		keynotes: [
			{
				title: "Nouvelles recommandations 2023 : Quelle prise en charge pour le patient DT2 à haut risque CV",
				dateTime: "Vendredi 09 à 12:30",
			},
		],
	},
	{
		name: "E. Donal",
		city: "Rennes",
		keynotes: [
			{
				title: "Atelier Strain sur Echo Pack",
				dateTime: "Vendredi 09 à 13:00",
			},
		],
	},
	{
		name: "Gh. Bennouna",
		city: "Casablanca",
		keynotes: [
			{
				title: "Lecture de coronarographies",
				dateTime: "Vendredi 09 à 13:00",
			},
		],
	},
	{
		name: "D. Guerrot",
		city: "Rouen",
		keynotes: [
			{
				title: "Coeur & Rein : A propos de cas cliniques",
				dateTime: "Vendredi 09 à 13:00",
			},
		],
	},
	{
		name: "B. Alos",
		city: "Poitiers",
		keynotes: [
			{
				title: "Place actuelle du coro scanner et de l'AngioIRM dans la gestion de la maladie coronaire",
				dateTime: "Vendredi 09 à 14:30",
			},
		],
	},
	{
		name: "M. Beaufigeau",
		city: "Perpignan",
		keynotes: [
			{
				title: "Lésions coronaires et TAVI",
				dateTime: "Vendredi 09 à 14:45",
			},
		],
	},
	{
		name: "K. Boughalem",
		city: "Casablanca",
		keynotes: [
			{
				title: "Comment traiter les lésions de bifurcations et les lésions calcifiées ?",
				dateTime: "Vendredi 09 à 15:00",
			},
		],
	},
	{
		name: "N. Meneveau",
		city: "Besançon",
		keynotes: [
			{
				title: "Comment aborder la revascularisation d'une dysfonction ischémique du VG ?",
				dateTime: "Vendredi 09 à 15:15",
			},
			{
				title: "De l'embolie pulmonaire à l'HTAP post embolique",
				dateTime: "Samedi 10 à 17:45",
			},
		],
	},
	{
		name: "L. Bendriss",
		city: "Marrakech",
		keynotes: [
			{
				title: "Lisinopril et protection cardio-rénale chez l'hypertendu : effet classe ou propre ?",
				dateTime: "Vendredi 09 à 16:00",
			},
		],
	},
	{
		name: "T. Letourneau",
		city: "Nantes",
		keynotes: [
			{
				title: "Les pièges à éviter lors de l'évaluation d'une poly valvulopathie ?",
				dateTime: "Vendredi 09 à 17:00",
			},
		],
	},
	{
		name: "Ph. Unger",
		city: "Bruxelles",
		keynotes: [
			{
				title: "Sténose aortique à haut gradient paradoxal : modérée ou sévère ?",
				dateTime: "Vendredi 09 à 17:20",
			},
			{
				title: "Evaluation de la valve tricuspide avant le Triclip",
				dateTime: "Vendredi 09 à 17:15",
			},
		],
	},
	{
		name: "Ch. Tribouilloy",
		city: "Amiens",
		keynotes: [
			{
				title: "Évaluation des fuites aortiques",
				dateTime: "Vendredi 09 à 17:40",
			},
		],
	},
	{
		name: "G. El Khoury",
		city: "Bruxelles",
		keynotes: [
			{
				title: "Comment opérer les fuites aortiques sevères ? Réparer ou remplacer ?",
				dateTime: "Vendredi 09 à 18:00",
			},
		],
	},
	{
		name: "M. El Hattaoui",
		city: "Marrakech",
		keynotes: [
			{
				title: "Optimisation du traitement de l'insuffisance cardiaque en pratique",
				dateTime: "Vendredi 09 à 18:30",
			},
			{
				title: "L'ETO en pratique",
				dateTime: "Samedi 10 à 13:00",
			},
			{
				title: "Rôle du Ticagrelor dans l'approche moderne du SCA",
				dateTime: "Samedi 10 à 16:00",
			},
		],
	},
	{
		name: "M. Alami",
		city: "Casablanca",
		keynotes: [
			{
				title: "AOD et situations difficiles",
				dateTime: "Samedi 10 à 08:30",
			},
		],
	},
	{
		name: "A. Bensouda",
		city: "Rabat",
		keynotes: [
			{
				title: "Gestion du traitement anti-thrombotique en périopératoire",
				dateTime: "Samedi 10 à 08:50",
			},
		],
	},
	{
		name: "A. Pathak",
		city: "Monaco",
		keynotes: [
			{
				title: "Est-il possible de faire régresser une plaque d'athérome ?",
				dateTime: "Samedi 10 à 09:30",
			},
			{
				title: "Histoire de la vie d'un hypertendu avec un ARAII",
				dateTime: "Samedi 10 à 12:30",
			},
		],
	},
	{
		name: "A. Bennis",
		city: "Casablanca",
		keynotes: [
			{
				title: "Nouvelles recommandations de l'Insuffisance Cardiaque... Comment surpasser l'inertie ?",
				dateTime: "Samedi 10 à 10:00",
			},
			{
				title: "Les éléments du pronostic de l'insuffisance cardiaque",
				dateTime: "Samedi 10 à 14:45",
			},
		],
	},
	{
		name: "A. Moustaghfir",
		city: "Casablanca",
		keynotes: [
			{
				title: "L'hypertonie vagale du sujet jeune : Est ce vraiment une maladie ?",
				dateTime: "Samedi 10 à 11:00",
			},
			{
				title: "Quiz ECG",
				dateTime: "Samedi 10 à 13:00",
			},
		],
	},
	{
		name: "I. Bensahi",
		city: "Casablanca",
		keynotes: [
			{
				title: "Prise en charge des syndromes du QT long",
				dateTime: "Samedi 10 à 11:15",
			},
		],
	},
	{
		name: "I. El Hajjaji",
		city: "Fes",
		keynotes: [
			{
				title: "Prise en charge des troubles du rythme après IDM",
				dateTime: "Samedi 10 à 11:30",
			},
		],
	},
	{
		name: "G. Latcu",
		city: "Monaco",
		keynotes: [
			{
				title: "Brady arythmies : Les indications de la stimulation cardiaque",
				dateTime: "Samedi 10 à 11:45",
			},
			{
				title: "La resynchronisation dans l'IC : Mythe ou réalité ?",
				dateTime: "Samedi 10 à 15:15",
			},
		],
	},
	{
		name: "M. Z. Jalal",
		city: "Bordeaux",
		keynotes: [
			{
				title: "Le cathétérisme droit",
				dateTime: "Samedi 10 à 13:00",
			},
		],
	},
	{
		name: "J. C. Sadik",
		city: "Paris",
		keynotes: [
			{
				title: "Echo Doppler artériel des TSA",
				dateTime: "Samedi 10 à 13:00",
			},
		],
	},
	{
		name: "D. Logeart",
		city: "Paris",
		keynotes: [
			{
				title: "Situations difficiles dans L'IC : Dialysé, hypotension, résistance au traitement…",
				dateTime: "Samedi 10 à 14:30",
			},
		],
	},
	{
		name: "A. Benyass",
		city: "Rabat",
		keynotes: [
			{
				title: "Traitement médical de l'IC : Une avancée considérable",
				dateTime: "Samedi 10 à 15:00",
			},
		],
	},
	{
		name: "E. Abergel",
		city: "Bordeaux",
		keynotes: [
			{
				title: "Evaluation de la fonction VD: Intérêt du couplage VD - AP",
				dateTime: "Samedi 10 à 17:00",
			},
		],
	},
	{
		name: "Ch. Selton-Suty",
		city: "Nancy",
		keynotes: [
			{
				title: "L'imagerie 3D du VD",
				dateTime: "Samedi 10 à 17:30",
			},
		],
	},
];

export default Speakers;
