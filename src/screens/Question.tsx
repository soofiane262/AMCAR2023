import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import LottieView from "lottie-react-native";
import QuestionForm from "../components/QuestionForm";

export default function QuestionScreen() {
	return (
		<View style={styles.container}>
			<LottieView
				source={require("../../assets/animations/question.json")}
				autoPlay
				loop={false}
				style={styles.animation}
			/>
			<QuestionForm />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.background,
	},
	buttonContainer: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	animation: {
		width: "40%",
	},
});
