import {
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	TouchableOpacity,
	Animated,
	Modal,
	Easing,
} from "react-native";
import React, { useState } from "react";
import * as StyledText from "./StyledText";
import { ProgramData } from "../constants/ProgramNew";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment-timezone";
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";

const myScheduleNotification = async (
	title: string,
	body: string,
	date: Date
) => {
	const existingNotifications =
		await Notifications.getAllScheduledNotificationsAsync();

	const isDuplicate = existingNotifications.some(
		(notification) => notification.content.body === body
	);

	if (isDuplicate) {
		console.log("Notification already scheduled with the same content.");
		return;
	}

	console.log("Scheduling notification for", date, "with title", title);
	const triggerDate: any = new Date(date);
	const now: any = new Date();
	const seconds = Math.floor((triggerDate - now) / 1000); // Calculate the number of seconds between current time and the specified date

	await Notifications.scheduleNotificationAsync({
		content: {
			title: title,
			body: body,
			data: { data: "goes here" },
		},
		trigger: { seconds: seconds },
	});
};

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
	const [modalVisible, setModalVisible] = useState(false);
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
			<TouchableOpacity
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={() => {
					if (!isFinished) setModalVisible(true);
				}}
			>
				<View
					style={[
						styles.innerContainer,
						{ backgroundColor: color.bg },
					]}
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
							<SpeakerList
								speakers={data.moderators}
								color={color}
							/>
						</View>
					)}
					{data.speakers &&
						(!data.title.includes("La Conférence de l'Année") ? (
							<SpeakerList
								speakers={data.speakers}
								color={color}
							/>
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
			</TouchableOpacity>
			<Modal visible={modalVisible} animationType="fade" transparent>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<StyledText.Bold style={styles.modalTitle}>
							{data.title}
						</StyledText.Bold>
						<LottieView
							source={require("../../assets/animations/notification.json")}
							autoPlay
							loop
							style={styles.lottie}
						/>
						<StyledText.Medium style={styles.modalText}>
							Souhaitez-vous recevoir un rappel avant le début de
							cette session ?
						</StyledText.Medium>
						<View
							style={{
								width: "100%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-evenly",
							}}
						>
							<TouchableOpacity
								onPress={() => {
									setModalVisible(false);
								}}
							>
								<StyledText.Regular style={styles.modalButton}>
									Non merci
								</StyledText.Regular>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									myScheduleNotification(
										"Ne maquez pas cette session !",
										`La session '${data.title}' commence dans 10 minutes`,
										moment(
											// `${data.date} ${data.startTime}`,
											`2023-05-25 00:50`,
											"YYYY-MM-DD HH:mm"
										)
											.subtract(10, "minutes")
											.toDate()
									);
									setModalVisible(false);
								}}
							>
								<StyledText.SemiBold style={styles.modalButton}>
									Me notifier
								</StyledText.SemiBold>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
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
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "90%",
	},
	modalTitle: {
		textAlign: "center",
		fontSize: 20,
		marginBottom: 10,
	},
	modalText: {
		fontSize: 16,
		marginBottom: 10,
	},
	modalButton: {
		fontSize: 16,
		color: Colors.primary,
		textAlign: "center",
		marginTop: 10,
	},
	lottie: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
});
