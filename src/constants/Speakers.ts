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
		name: "S. Chraïbi",
		city: "Casablanca",
		keynotes: [
			{
				title: "L'impact de la crise sanitaire sur l'activité des entreprises",
				dateTime: "Jeudi 08 à 16h00",
			},
			{
				title: "L'impact de laur l'activité des entreprises",
				dateTime: "Jeudi 08 à 12h00",
			},
		],
	},
	{
		name: "S. soufff",
		city: "Casablanca",
		keynotes: [
			{
				title: "L'impact de la crise sanitaire sur l'activité des entreprises",
				dateTime: "Jeudi 08 à 16h00",
			},
			{
				title: "L'impact de laur l'activité des entreprises",
				dateTime: "Jeudi 08 à 12h00",
			},
		],
	},
];

export default Speakers;
