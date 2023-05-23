import { SafeAreaView, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import EnrollForm from "../components/EnrollForm";

export default function EnrollScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<EnrollForm />
			</View>
		</SafeAreaView>
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
});
