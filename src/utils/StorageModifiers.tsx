import AsyncStorage from "@react-native-async-storage/async-storage";
import Categories from "../constants/Categories";
import Speech from "../constants/Speech";
import Program from "../constants/ProgramNew";
import Sponsors from "../constants/Sponsors";
import Speakers from "../constants/Speakers";
import Moderators from "../constants/Moderators";
import axios from "axios";

export const getCategories = async () => {
	try {
		const categories = await AsyncStorage.getItem("categories");
		if (
			categories !== null &&
			categories !== undefined &&
			categories !== "[]"
		) {
			return JSON.parse(categories);
		}
	} catch (e) {
		console.error("Error retrieving categories from storage:", e);
	}
	return Categories;
};

export const setCategories = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/categories.json",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const categories = response.data;
		await AsyncStorage.setItem("categories", JSON.stringify(categories));
	} catch (error) {
		console.error("Error setting categories in storage:", error);
	}
};

export const getSpeech = async () => {
	try {
		const speech = await AsyncStorage.getItem("speech");
		if (speech !== null && speech !== undefined && speech !== "") {
			return JSON.parse(speech);
		}
	} catch (e) {
		console.error("Error retrieving speech from storage:", e);
	}
	return Speech;
};

export const setSpeech = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/speech.txt",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const speech = response.data;
		await AsyncStorage.setItem("speech", JSON.stringify(speech));
	} catch (error) {
		console.error("Error setting speech in storage:", error);
	}
};

export const getProgram = async () => {
	try {
		const program = await AsyncStorage.getItem("program");
		if (program !== null && program !== undefined && program !== "[]") {
			return JSON.parse(program);
		}
	} catch (e) {
		console.error("Error retrieving program from storage:", e);
	}
	return Program;
};

export const setProgram = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/program.json",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const program = response.data;
		await AsyncStorage.setItem("program", JSON.stringify(program));
	} catch (error) {
		console.error("Error setting program in storage:", error);
	}
};

export const getSponsors = async () => {
	try {
		const sponsors = await AsyncStorage.getItem("sponsors");
		if (sponsors !== null && sponsors !== undefined && sponsors !== "[]") {
			return JSON.parse(sponsors);
		}
	} catch (e) {
		console.error("Error retrieving sponsors from storage:", e);
	}
	return Sponsors;
};

export const setSponsors = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/sponsors.json",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const sponsors = response.data;
		await AsyncStorage.setItem("sponsors", JSON.stringify(sponsors));
	} catch (error) {
		console.error("Error setting sponsors in storage:", error);
	}
};

export const getSpeakers = async () => {
	try {
		const speakers = await AsyncStorage.getItem("speakers");
		if (speakers !== null && speakers !== undefined && speakers !== "[]") {
			return JSON.parse(speakers);
		}
	} catch (e) {
		console.error("Error retrieving speakers from storage:", e);
	}
	return Speakers;
};

export const setSpeakers = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/speakers.json",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const speakers = response.data;
		await AsyncStorage.setItem("speakers", JSON.stringify(speakers));
	} catch (error) {
		console.error("Error setting speakers in storage:", error);
	}
};

export const getModerators = async () => {
	try {
		const moderators = await AsyncStorage.getItem("moderators");
		if (
			moderators !== null &&
			moderators !== undefined &&
			moderators !== "[]"
		) {
			return JSON.parse(moderators);
		}
	} catch (e) {
		console.error("Error retrieving moderators from storage:", e);
	}
	return Moderators;
};

export const setModerators = async () => {
	try {
		const response = await axios.get(
			"https://sel-mars.com/amcar/moderators.json",
			{
				// query URL without using browser cache
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
		const moderators = response.data;
		await AsyncStorage.setItem("moderators", JSON.stringify(moderators));
	} catch (error) {
		console.error("Error setting moderators in storage:", error);
	}
};
