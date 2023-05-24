import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	Text,
	Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import { getSponsors } from "../utils/StorageModifiers";
import { useEffect, useState } from "react";

const windowWidth = Dimensions.get("window").width;

function Sponsor({ item }: any) {
	if (!item) {
		return null;
	}

	return (
		<View style={styles.card}>
			<Image
				source={{
					uri: `https://sel-mars.com/amcar/images/sponsors/${item}.png`,
				}}
				style={styles.picture}
			/>
		</View>
	);
}

export default function SponsorsScreen() {
	const [sponsors, setSponsors] = useState<string[]>([]);
	useEffect(() => {
		const loadSponsors = async () => {
			const data = await getSponsors();
			setSponsors(data);
		};
		loadSponsors();
	}, []);
	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				numColumns={3}
				showsVerticalScrollIndicator={false}
				data={sponsors}
				renderItem={Sponsor}
				keyExtractor={(item) => item}
				ListFooterComponent={<View style={{ height: 100 }} />}
				columnWrapperStyle={{ justifyContent: "center" }}
			/>
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
	card: {
		width: "30%",
		// backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},
	picture: {
		width: windowWidth / 3 - 32,
		height: windowWidth / 3 - 32,
		marginTop: 16,
	},
	title: {
		color: Colors.secondary,
		fontSize: 16,
		textAlign: "center",
	},
	label: {
		color: Colors.primary,
		fontSize: 16,
		textAlign: "center",
		paddingBottom: 16,
	},
	text: {
		color: Colors.black,
		fontSize: 18,
		textAlign: "justify",
		lineHeight: 28,
	},
});
