import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as StyledText from "../components/StyledText";
import Colors from "../constants/Colors";
import { getSpeech } from "../utils/StorageModifiers";
import { Image } from "react-native";
import LottieView from "lottie-react-native";

export default function ChairmanScreen() {
	const [speech, setSpeech] = useState<string>("");

	useEffect(() => {
		const loadSpeech = async () => {
			const data = await getSpeech();
			setSpeech(data);
		};
		loadSpeech();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Image
					source={{
						uri: "https://sel-mars.com/amcar/images/committee/s_chraibi.png",
					}}
					style={styles.picture}
				/>
				<StyledText.Bold style={styles.title}>
					Pr. Saïd Chraibi
				</StyledText.Bold>
				<StyledText.SemiBold style={styles.label}>
					Président de l'AMCAR
				</StyledText.SemiBold>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<StyledText.Medium style={styles.text}>
					{speech}
				</StyledText.Medium>
				<StyledText.Bold style={styles.text}>
					{"\n"}Vive la Cardiologie Marocaine, Vive l'AMCAR
				</StyledText.Bold>
				<View style={{ height: 100 }} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingHorizontal: 16,
	},
	buttonContainer: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	card: {
		backgroundColor: Colors.primary,
		borderRadius: 8,
		// padding: 16,
		marginTop: 50,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	picture: {
		width: 120,
		height: 120,
		top: -40,
	},
	title: {
		color: Colors.white,
		fontSize: 20,
		textAlign: "center",
		top: -20,
		lineHeight: 28,
	},
	label: {
		color: Colors.white,
		fontSize: 16,
		textAlign: "center",
		top: -20,
		lineHeight: 28,
	},
	text: {
		color: Colors.black,
		fontSize: 18,
		textAlign: "justify",
		lineHeight: 28,
	},
});
