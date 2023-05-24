import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import * as StyledText from "./StyledText";
import { ProgramData } from "../constants/ProgramNew";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment-timezone";

interface TimeProps {
	time: string;
}

const Time = ({ time }: TimeProps) => {
	return (
		<View style={styles.timeContainer}>
			<StyledText.Regular style={styles.time}>
				{moment(time, "HH:mm").format("HH:mm")}
			</StyledText.Regular>
			<View style={styles.timeLine} />
		</View>
	);
};

interface SpeakerProps {
	name: string;
	city: string;
}

const Speaker = (speaker: SpeakerProps, color: any) => {
	return (
		<View style={styles.personContainer}>
			<StyledText.SemiBold style={[styles.name, { color: color.text }]}>
				{speaker.name}
			</StyledText.SemiBold>
			{speaker.city && (
				<View style={styles.cityContainer}>
					<Ionicons
						name="location"
						size={12}
						color={color.tail}
						style={{ paddingRight: 5 }}
					/>
					<StyledText.Medium
						style={[styles.city, { color: color.tail }]}
					>
						{speaker.city}
					</StyledText.Medium>
				</View>
			)}
		</View>
	);
};

interface SpeakerListProps {
	speakers: any;
	color: string;
}

const SpeakerList = ({ speakers, color }: SpeakerListProps) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<FlatList
				style={{
					alignSelf: "center",
					paddingHorizontal: 10,
					paddingBottom: 10,
				}}
				data={speakers}
				numColumns={2}
				keyExtractor={(item) => item.name + item.city}
				columnWrapperStyle={{
					justifyContent: "space-between",
				}}
				renderItem={({ item }) => Speaker(item, color)}
			/>
		</View>
	);
};

interface ConfOfTheYearProps {
	speakers: any;
	color: string;
	image: string;
}

const ConfOfTheYear = ({ speakers, color, image }: ConfOfTheYearProps) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<SpeakerList speakers={speakers} color={color} />
			<Image
				source={{ uri: image }}
				style={{ width: 180, height: 210 }}
			/>
		</View>
	);
};

interface LaboratoryProps {
	name: string;
	logo: string;
	color: string;
}

const Laboratory = ({ name, logo, color }: LaboratoryProps) => {
	return (
		<View style={styles.laboratory}>
			<StyledText.Medium style={{ width: "80%", color: color }}>
				Avec la participation des laboratoires{" "}
				<StyledText.Bold style={{ color: color }}>
					{name}
				</StyledText.Bold>
			</StyledText.Medium>
			{logo && (
				<Image
					source={{ uri: logo }}
					style={{ width: 80, height: 80 }}
				/>
			)}
		</View>
	);
};

interface Props {
	data: ProgramData;
}

export default function ProgramCard({ data }: Props) {
	const currentTime = moment().tz("Africa/Casablanca");
	const color = Colors.program[data.color];
	const endTimeMoment = moment(
		`${data.date} ${data.endTime}`,
		"YYYY-MM-DD HH:mm"
	);
	const endDateMoment = moment(`2023-06-10 23:59`, "YYYY-MM-DD HH:mm");
	const isFinished =
		currentTime.isAfter(endTimeMoment) &&
		currentTime.isBefore(endDateMoment);
	return (
		<View style={[styles.container, { opacity: isFinished ? 0.5 : 1 }]}>
			{data.time && <Time time={data.startTime} />}
			<View
				style={[styles.innerContainer, { backgroundColor: color.bg }]}
			>
				<View style={styles.header}>
					{data.icon && (
						<Ionicons
							name={data.icon}
							size={18}
							color={color.text}
							style={{ padding: 5 }}
						/>
					)}
					<StyledText.Bold
						style={[styles.title, { color: color.text }]}
					>
						{data.title}
					</StyledText.Bold>
				</View>
				{data.moderators && (
					<View style={{ alignItems: "center" }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Ionicons
								name="time"
								size={14}
								color={color.text}
							/>
							<StyledText.Medium
								style={{
									color: color.text,
									fontSize: 14,
									paddingHorizontal: 5,
								}}
							>
								{data.startTime} - {data.endTime}
							</StyledText.Medium>
						</View>
						<View
							style={{
								alignSelf: "center",
								height: 1,
								width: "50%",
								backgroundColor: color.tail,
							}}
						/>
						<StyledText.Medium
							style={{ color: color.text, fontSize: 14 }}
						>
							Modérateur{data.moderators.length > 1 && "s"}
						</StyledText.Medium>
						<SpeakerList speakers={data.moderators} color={color} />
					</View>
				)}
				{data.speakers &&
					(!data.title.includes("La Conférence de l'Année") ? (
						<SpeakerList speakers={data.speakers} color={color} />
					) : (
						<ConfOfTheYear
							speakers={data.speakers}
							color={color}
							image={data.image}
						/>
					))}
				{data.laboratory && (
					<Laboratory
						name={data.laboratory}
						logo={data.image}
						color={color.text}
					/>
				)}
			</View>
			<View style={[styles.tail, { backgroundColor: color.tail }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 10,
		width: Dimensions.get("window").width * 0.9,
	},
	tail: {
		width: "95%",
		height: 6,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingVertical: 5,
	},
	time: {
		fontSize: 14,
		paddingHorizontal: 5,
		color: Colors.tertiary,
	},
	timeLine: {
		height: 1,
		flex: 1,
		backgroundColor: Colors.tertiary,
	},
	innerContainer: {
		width: "100%",
		borderRadius: 10,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 16,
	},
	personContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	name: {
		fontSize: 16,
	},
	city: {
		fontSize: 14,
	},
	cityContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	laboratory: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});
