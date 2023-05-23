import { z } from "zod";

export const formValidationSchema = z.object({
	firstName: z
		.string({ required_error: "Veuillez entrer votre prénom" })
		.min(3, { message: "Veuillez entrer votre prénom" }),
	lastName: z
		.string({ required_error: "Veuillez entrer votre nom" })
		.min(3, { message: "Veuillez entrer votre nom" }),
	category: z.string({
		required_error: "Veuillez sélectionner votre catégorie",
	}),
	sector: z
		.string({ required_error: "Veuillez sélectionner votre secteur" })
		.nonempty({ message: "Veuillez sélectionner votre secteur" }),
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
	accommodation: z.boolean().default(false),
});

export type EnrollFormData = z.infer<typeof formValidationSchema>;

const questionValidationSchema = z.object({
	question: z
		.string({ required_error: "Veuillez entrer votre question" })
		.nonempty({ message: "Veuillez entrer votre question" }),
});

type FormData = z.infer<typeof questionValidationSchema>;
