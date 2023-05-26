import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import LottieView from "lottie-react-native";
import Select from "../components/Select";
import * as StyledText from "../components/StyledText";

import map0 from "../../assets/animations/map/0.json";
import map1 from "../../assets/animations/map/1-2.json";

const mapSources = [map0, map1];

export default function MapScreen() {
	const [mapSource, setMapSource] = useState(mapSources[0]);
	const [departure, setDeparture] = useState("");
	const [arrival, setArrival] = useState("");
	const data = [
		"Entrée",
		"Hall",
		"Stands",
		"Restaurant",
		"Plénière",
		"Salle 1",
		"Salle 2",
		"Salle 3",
		"Salle 4",
	];

	useEffect(() => {
		if (departure && arrival) {
			console.log("departure", departure);
			setMapSource(mapSources[1]);
		}
	}, [departure, arrival]);

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<View style={{ width: "40%" }}>
					<StyledText.Medium
						style={{
							marginLeft: 10,
							fontSize: 16,
							color: Colors.tertiary,
						}}
					>
						Départ
					</StyledText.Medium>
					<Select
						defaultValue={""}
						value={departure}
						onChangeText={setDeparture}
						dropdownData={data}
						style={{ width: "100%" }}
					/>
				</View>
				<View style={{ width: "40%" }}>
					<StyledText.Medium
						style={{
							marginLeft: 10,
							fontSize: 16,
							color: Colors.tertiary,
						}}
					>
						Arrivée
					</StyledText.Medium>
					<Select
						defaultValue={""}
						value={arrival}
						onChangeText={setArrival}
						dropdownData={data}
						style={{ width: "100%" }}
					/>
				</View>
			</View>
			<LottieView
				source={mapSource}
				autoPlay
				loop={false}
				style={styles.animation}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.background,
	},
	buttonContainer: {
		width: "100%",
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
		width: "86%",
	},
});
