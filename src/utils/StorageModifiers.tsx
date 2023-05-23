import AsyncStorage from "@react-native-async-storage/async-storage";
import Categories from "../constants/Categories";
import Speech from "../constants/Speech";
import Program from "../constants/ProgramNew";
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
			"https://sel-mars.com/amcar/api/getCategoriesData.php"
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
		const response = await axios.get("https://sel-mars.com/amcar/speech");
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
		const response = await axios.get("https://sel-mars.com/amcar/program");
		const program = response.data;
		await AsyncStorage.setItem("program", JSON.stringify(program));
	} catch (error) {
		console.error("Error setting program in storage:", error);
	}
};
