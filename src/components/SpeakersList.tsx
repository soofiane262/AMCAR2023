import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as StyledText from "../components/StyledText";
import Colors from "../constants/Colors";
import { Speaker } from "../constants/Speakers";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";

function KeynoteCard({ item }: any) {
	if (!item) {
		return null;
	}

	const { title, dateTime } = item;
	return (
		<View style={styles.keynoteContainer}>
			<StyledText.SemiBold style={styles.keynoteTitle}>
				{title}
			</StyledText.SemiBold>
			<View style={styles.cityContainer}>
				<Ionicons
					name="time"
					size={12}
					color={Colors.primary}
					style={{ paddingRight: 5 }}
				/>
				<StyledText.Medium style={styles.keynoteTime}>
					{dateTime}
				</StyledText.Medium>
			</View>
		</View>
	);
}

function SpeakerCard({ item }: any) {
	if (!item) {
		return null;
	}

	const { name, city, keynotes } = item;
	return (
		<View style={styles.speakerContainer}>
			<View
				style={{
					alignSelf: "center",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<StyledText.SemiBold style={styles.speakerName}>
					{name}
				</StyledText.SemiBold>
				<View style={styles.cityContainer}>
					<Ionicons
						name="location"
						size={12}
						color={Colors.primary}
						style={{ paddingRight: 5 }}
					/>
					<StyledText.Medium style={styles.speakerCity}>
						{city}
					</StyledText.Medium>
				</View>
			</View>
			<FlatList
				style={{
					width: "100%",
				}}
				showsVerticalScrollIndicator={false}
				data={keynotes}
				renderItem={KeynoteCard}
				keyExtractor={(item) => item.title}
			/>
		</View>
	);
}

interface Props {
	data: Speaker[];
}

export default function SpeakersList({ data }: Props) {
	const [query, setQuery] = useState("");
	const [speakers, setSpeakers] = useState<Speaker[]>([]);

	useEffect(() => {
		setSpeakers(data);
	}, [data]);

	const handleSearch = (text: string) => {
		const formattedQuery = text.toLowerCase();
		const filteredData = data.reduce((result: Speaker[], user: Speaker) => {
			if (contains(user, formattedQuery)) {
				result.push(user);
			}
			return result;
		}, []);
		setSpeakers(filteredData);
		setQuery(text);
	};

	const contains = (speaker: Speaker, query: string) => {
		const { name, city } = speaker;
		const nameLower = name.toLowerCase();
		const cityLower = city.toLowerCase();
		if (nameLower.includes(query) || cityLower.includes(query)) return true;
		return false;
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					width: "90%",
					alignSelf: "center",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: Colors.white,
					padding: 10,
					marginVertical: 10,
					height: 50,
					borderRadius: 40,
				}}
			>
				<Ionicons
					name={"search"}
					size={20}
					style={{
						color: Colors.secondary,
						paddingHorizontal: 10,
					}}
				/>
				<TextInput
					allowFontScaling={false}
					placeholderTextColor={Colors.quartary}
					selectionColor={Colors.primary}
					autoCapitalize="none"
					autoCorrect={false}
					clearButtonMode="always"
					value={query}
					onChangeText={(queryText) => handleSearch(queryText)}
					placeholder="Recherche par nom ou ville"
					style={{
						backgroundColor: Colors.white,
						paddingHorizontal: 20,
						height: 40,
						flex: 1,
						fontSize: 16,
					}}
				/>
			</View>
			<FlatList
				style={{ width: "100%" }}
				showsVerticalScrollIndicator={false}
				data={speakers}
				renderItem={SpeakerCard}
				keyExtractor={(item) => item.name}
				ListFooterComponent={<View style={{ height: 100 }} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingHorizontal: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	speakerContainer: {
		alignSelf: "center",
		width: "100%",
		padding: 20,
		marginBottom: 20,
		borderRadius: 8,
		backgroundColor: Colors.white,
	},
	speakerName: {
		fontSize: 18,
		color: Colors.secondary,
	},
	cityContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	speakerCity: {
		fontSize: 14,
		color: Colors.primary,
	},
	keynoteContainer: {
		width: "100%",
		alignSelf: "center",
		marginTop: 10,
	},
	keynoteTitle: {
		fontSize: 13,
		color: Colors.secondary,
	},
	keynoteTime: {
		fontSize: 12,
		color: Colors.primary,
	},
});
