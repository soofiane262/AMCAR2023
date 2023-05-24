import Colors from "./Colors";

export interface HomeButtonData {
	id: string;
	title: string;
	iconFamily?: string;
	icon: string;
	color?: string;
	href?: string;
}

export const HomeButtons: HomeButtonData[] = [
	{
		id: "Enroll",
		title: "Inscription",
		icon: "id-badge",
		color: Colors.primary,
	},
	{
		id: "Program",
		title: "Programme",
		icon: "clock",
		color: Colors.secondary,
	},
	{
		id: "Map",
		title: "Plan Interactif",
		icon: "milestone",
		color: Colors.secondary,
	},
	{
		id: "Chairman",
		title: "Mot de Bienvenue",
		icon: "log",
		color: Colors.secondary,
	},
	{
		id: "Speakers",
		title: "Orateurs",
		iconFamily: "Ionicons",
		icon: "md-mic-outline",
		color: Colors.secondary,
	},
	{
		id: "Moderators",
		title: "Modérateurs",
		iconFamily: "Ionicons",
		icon: "md-chatbubbles-outline",
		color: Colors.secondary,
	},
	{
		id: "Posters",
		title: "Posters",
		icon: "file-code",
		color: Colors.secondary,
		href: "https://new.amcar.ma/PostersAcceptes.php",
	},
	{
		id: "Sponsors",
		title: "Sponsors",
		iconFamily: "Ionicons",
		icon: "ribbon-outline",
		color: Colors.secondary,
	},
	{
		id: "Committee",
		title: "Comité",
		icon: "people",
		color: Colors.secondary,
	},
	{
		id: "Infos",
		title: "Infos",
		icon: "info",
		color: Colors.secondary,
	},
	{
		id: "Instagram",
		title: "Instagram",
		iconFamily: "Ionicons",
		icon: "logo-instagram",
		color: Colors.secondary,
		href: "https://instagram.com/cardio.amcar",
	},
	{
		id: "Website",
		title: "Site Web",
		icon: "globe",
		color: Colors.secondary,
		href: "https://new.amcar.ma/",
	},
	{
		id: "Question",
		title: "Posez vos Questions",
		icon: "question",
		color: Colors.secondary,
	},
];
