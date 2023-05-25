export interface Keynote {
	title: string;
	dateTime: string;
}

export interface Speaker {
	name: string;
	city: string;
	keynotes: Keynote[];
}

const Moderators: Speaker[] = [
	{
		name: "M. Cherti",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Cardiologie Structurelle",
				dateTime: "Jeudi 08 à 17:10",
			},
		],
	},
	{
		name: "H. Belghiti",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Cardiologie Structurelle",
				dateTime: "Jeudi 08 à 17:10",
			},
		],
	},
	{
		name: "Y. Ettaoumi",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Cardiologie Structurelle",
				dateTime: "Jeudi 08 à 17:10",
			},
		],
	},
	{
		name: "R. Belghiti",
		city: "Agadir",
		keynotes: [
			{
				title: "Session Cardiologie Structurelle",
				dateTime: "Jeudi 08 à 17:10",
			},
		],
	},
	{
		name: "L. Azzouzi",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Cardiomyopathies",
				dateTime: "Vendredi 09 à 08:30",
			},
		],
	},
	{
		name: "H. Benjelloune",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Cardiomyopathies",
				dateTime: "Vendredi 09 à 08:30",
			},
		],
	},
	{
		name: "S. Abir",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Cardiomyopathies",
				dateTime: "Vendredi 09 à 08:30",
			},
		],
	},
	{
		name: "S. Soulami",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Cardiomyopathies",
				dateTime: "Vendredi 09 à 08:30",
			},
		],
	},
	{
		name: "S. Fadouach",
		city: "Marrakech",
		keynotes: [
			{
				title: "Session Cardiologie Pédiatrique",
				dateTime: "Vendredi 09 à 11:00",
			},
		],
	},
	{
		name: "S. Zaïmi",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Cardiologie Pédiatrique",
				dateTime: "Vendredi 09 à 11:00",
			},
		],
	},
	{
		name: "R. Amri",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Cardiologie Pédiatrique",
				dateTime: "Vendredi 09 à 11:00",
			},
		],
	},
	{
		name: "M. El Kouache",
		city: "Fes",
		keynotes: [
			{
				title: "Session Cardiologie Pédiatrique",
				dateTime: "Vendredi 09 à 11:00",
			},
		],
	},
	{
		name: "S. Ztot",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Coronaires",
				dateTime: "Vendredi 09 à 14:30",
			},
		],
	},
	{
		name: "A. Bouzerda",
		city: "Marakech",
		keynotes: [
			{
				title: "Session Coronaires",
				dateTime: "Vendredi 09 à 14:30",
			},
		],
	},
	{
		name: "N. Ouafi",
		city: "Oujda",
		keynotes: [
			{
				title: "Session Coronaires",
				dateTime: "Vendredi 09 à 14:30",
			},
		],
	},
	{
		name: "Z. Lakhal",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Coronaires",
				dateTime: "Vendredi 09 à 14:30",
			},
		],
	},
	{
		name: "L. Bendriss",
		city: "Marrakech",
		keynotes: [
			{
				title: "Session Valvulopathies",
				dateTime: "Vendredi 09 à 17:00",
			},
		],
	},
	{
		name: "Kh. Boye",
		city: "Nouakchott",
		keynotes: [
			{
				title: "Session Valvulopathies",
				dateTime: "Vendredi 09 à 17:00",
			},
		],
	},
	{
		name: "S. Moughil",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Valvulopathies",
				dateTime: "Vendredi 09 à 17:00",
			},
		],
	},
	{
		name: "M. Nazi",
		city: "Meknès",
		keynotes: [
			{
				title: "Session Valvulopathies",
				dateTime: "Vendredi 09 à 17:00",
			},
		],
	},
	{
		name: "S. Chraïbi",
		city: "Casablanca",
		keynotes: [
			{
				title: "La Conférence de l'Année : Le triomphe de l'intelligence humaine",
				dateTime: "Jeudi 08 à 19:00",
			},
			{
				title: "Le Débat des Journées: Le Coeur droit au centre de la polémique",
				dateTime: "Samedi 10 à 17:00",
			},
		],
	},
	{
		name: "M. M. Alaoui",
		city: "Casablanca",
		keynotes: [
			{
				title: "La Conférence de l'Année : Le triomphe de l'intelligence humaine",
				dateTime: "Jeudi 08 à 19:00",
			},
		],
	},
	{
		name: "A. Salem",
		city: "Tunis",
		keynotes: [
			{
				title: "Session à thèmes",
				dateTime: "Samedi 10 à 08:30",
			},
		],
	},
	{
		name: "Kh. Yaqini",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session à thèmes",
				dateTime: "Samedi 10 à 08:30",
			},
		],
	},
	{
		name: "N. Chraïbi",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session à thèmes",
				dateTime: "Samedi 10 à 08:30",
			},
		],
	},
	{
		name: "N. Mouine",
		city: "Rabat",
		keynotes: [
			{
				title: "Session à thèmes",
				dateTime: "Samedi 10 à 08:30",
			},
		],
	},
	{
		name: "A. El Hattaoui",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Rythmologie",
				dateTime: "Samedi 10 à 11:00",
			},
		],
	},
	{
		name: "A. Kane",
		city: "Dakar",
		keynotes: [
			{
				title: "Session Rythmologie",
				dateTime: "Samedi 10 à 11:00",
			},
		],
	},
	{
		name: "A. Chaib",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Rythmologie",
				dateTime: "Samedi 10 à 11:00",
			},
		],
	},
	{
		name: "A. Tahiri",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Rythmologie",
				dateTime: "Samedi 10 à 11:00",
			},
		],
	},
	{
		name: "R. Habbal",
		city: "Casablanca",
		keynotes: [
			{
				title: "Session Insuffisance Cardiaque",
				dateTime: "Samedi 10 à 14:30",
			},
		],
	},
	{
		name: "A. Soufiani",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Insuffisance Cardiaque",
				dateTime: "Samedi 10 à 14:30",
			},
		],
	},
	{
		name: "N. Berrada",
		city: "Rabat",
		keynotes: [
			{
				title: "Session Insuffisance Cardiaque",
				dateTime: "Samedi 10 à 14:30",
			},
		],
	},
	{
		name: "A. Khatouri",
		city: "Marrakech",
		keynotes: [
			{
				title: "Session Insuffisance Cardiaque",
				dateTime: "Samedi 10 à 14:30",
			},
		],
	},
	{
		name: "L. Saher",
		city: "Casablanca",
		keynotes: [
			{
				title: "Le Débat des Journées: Le Coeur droit au centre de la polémique",
				dateTime: "Samedi 10 à 17:00",
			},
		],
	},
	{
		name: "A. Aouad",
		city: "Rabat",
		keynotes: [
			{
				title: "Le Débat des Journées: Le Coeur droit au centre de la polémique",
				dateTime: "Samedi 10 à 17:00",
			},
		],
	},
	{
		name: "M. C. Malergue",
		city: "Paris",
		keynotes: [
			{
				title: "Le Débat des Journées: Le Coeur droit au centre de la polémique",
				dateTime: "Samedi 10 à 17:00",
			},
		],
	},
];

export default Moderators;
