import { z } from "zod";

export const enrollValidationSchema = z.object({
	firstName: z
		.string({ required_error: "Veuillez entrer votre prénom" })
		.min(3, { message: "Veuillez entrer votre prénom" }),
	lastName: z
		.string({ required_error: "Veuillez entrer votre nom" })
		.min(3, { message: "Veuillez entrer votre nom" }),
	phone: z
		.string({ required_error: "Veuillez entrer votre numéro de téléphone" })
		.min(8, { message: "Veuillez entrer un numéro de téléphone valide" })
		.max(20, { message: "Veuillez entrer un numéro de téléphone valide" }),
	email: z
		.string({ required_error: "Veuillez entrer votre email" })
		.email({ message: "Veuillez entrer un email valide" }),
	specialty: z.string({
		required_error: "Veuillez sélectionner votre spécialité",
	}),
	statut: z.string({
		required_error: "Veuillez sélectionner votre statut",
	}),
	sector: z.string({
		required_error: "Veuillez sélectionner votre secteur",
	}),
	place: z
		.string({ required_error: "Veuillez entrer votre lieu d'exercice" })
		.min(3, { message: "Veuillez entrer votre lieu d'exercice" }),
	city: z
		.string({ required_error: "Veuillez entrer votre ville" })
		.min(3, { message: "Veuillez entrer votre ville" }),
	newsletter: z.boolean().default(false),
});

export type EnrollFormData = z.infer<typeof enrollValidationSchema>;

export const questionValidationSchema = z.object({
	question: z
		.string({ required_error: "Veuillez entrer votre question" })
		.nonempty({ message: "Veuillez entrer votre question" }),
});

export type QuestionFormData = z.infer<typeof questionValidationSchema>;
