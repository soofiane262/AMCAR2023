import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import * as StyledText from "../components/StyledText";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import CommitteeMembers from "../constants/CommitteeMembers";

function CommitteeMember({ item }: any) {
	if (!item) {
		return null;
	}

	const { name, picture, role } = item;
	return (
		<View style={styles.card}>
			<Image source={{ uri: picture }} style={styles.picture} />
			<StyledText.SemiBold style={styles.title}>
				{name}
			</StyledText.SemiBold>
			<StyledText.Medium style={styles.label}>{role}</StyledText.Medium>
		</View>
	);
}

export default function CommitteeScreen() {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.card,
					{
						marginTop: 50,
						width: "100%",
						backgroundColor: Colors.primary,
					},
				]}
			>
				<Image
					source={{
						uri: "https://sel-mars.com/amcar/images/committee/s_chraibi.png",
					}}
					style={styles.picture}
				/>
				<StyledText.Bold
					style={[
						styles.title,
						{ color: Colors.white, fontSize: 18 },
					]}
				>
					Said CHRAÏBI
				</StyledText.Bold>
				<StyledText.Medium
					style={[styles.label, { color: Colors.white }]}
				>
					Président de l'AMCAR
				</StyledText.Medium>
			</View>
			<FlatList
				style={{ width: "100%" }}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				data={CommitteeMembers}
				renderItem={CommitteeMember}
				keyExtractor={(item) => item.name}
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
		paddingHorizontal: 16,
	},
	card: {
		width: "50%",
		// backgroundColor: Colors.primary,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	picture: {
		width: 100,
		height: 100,
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
