import { useRef, useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Modal } from "react-native";
import Calendar from "../components/Calendar";
import Colors from "../constants/Colors";
import moment from "moment";
import "moment/locale/fr";
import { ProgramData } from "../constants/ProgramNew";
import ProgramCard from "../components/ProgramCard";
import { getProgram } from "../utils/StorageModifiers";
import LottieView from "lottie-react-native";

export default function ProgramNew() {
	moment.locale("fr");
	const [program, setProgram] = useState<ProgramData[][]>([]);
	const today = moment().tz("Africa/Casablanca").format("YYYY-MM-DD");
	const startDate = moment("2023-05-02").format("YYYY-MM-DD");
	const endDate = moment("2023-05-04").format("YYYY-MM-DD");
	const day = today >= startDate && today <= endDate ? today : startDate;
	const dayIdx = moment(day).diff(moment(startDate), "days");
	const horFlatListRef = useRef<FlatList>(null);
	const flatListRef: any[] = [
		useRef<FlatList>(null),
		useRef<FlatList>(null),
		useRef<FlatList>(null),
	];
	const [modalVisible, setModalVisible] = useState(true);

	const handleScroll = (index: number) => {
		horFlatListRef.current?.scrollToIndex({ animated: true, index });
	};

	useEffect(() => {
		const loadProgram = async () => {
			const data = await getProgram();
			setProgram(data);
		};
		const initScreen = () => {
			const currentTime = moment().tz("Africa/Casablanca");
			horFlatListRef.current?.scrollToIndex({
				index: dayIdx,
			});
			const ongoingSession = program[dayIdx].find(
				(session: ProgramData) =>
					moment(`${session.startTime}`, "HH:mm").isSameOrBefore(
						currentTime
					) &&
					moment(`${session.endTime}`, "HH:mm").isAfter(currentTime)
			);

			const nextSession = program[dayIdx].find(
				(session: ProgramData) =>
					currentTime.isBefore(
						moment(`${session.startTime}`, "HH:mm")
					) &&
					moment(`${session.startTime}`, "HH:mm").isAfter(currentTime)
			);

			const nearestSession = ongoingSession || nextSession;

			if (nearestSession) {
				const index = program[dayIdx].indexOf(nearestSession);
				flatListRef[dayIdx].current?.scrollToIndex({ index });
			}
			setTimeout(() => {
				setModalVisible(false);
			}, 1000 + 1000 * dayIdx);
		};
		if (program.length === 0) loadProgram();
		else initScreen();
	}, [program]);

	const renderProgramDay = ({ item }: { item: ProgramData[] }) => {
		const idx = program.indexOf(item);
		return (
			<FlatList
				style={{
					flex: 1,
					width: "100%",
					paddingHorizontal: 20,
				}}
				ref={flatListRef[idx]}
				ListFooterComponent={<View style={{ height: 100 }} />}
				data={item}
				renderItem={({ item }) => (
					<ProgramCard data={item as ProgramData} />
				)}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				onScrollToIndexFailed={(info) => {
					const wait = new Promise((resolve) =>
						setTimeout(resolve, 100)
					);
					wait.then(() => {
						flatListRef[idx].current?.scrollToIndex({
							index: info.index,
							animated: true,
							viewPosition: 0.5,
						});
					});
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Calendar
					startDate={moment(startDate).toDate()}
					program={program}
					day={moment(day).toDate()}
					flatListRef={flatListRef[dayIdx]}
					handleScroll={handleScroll}
				/>
				<FlatList
					ref={horFlatListRef}
					style={styles.programContainer}
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEnabled={false}
					keyExtractor={(item) => program.indexOf(item).toString()}
					data={program}
					renderItem={renderProgramDay}
					onScrollToIndexFailed={(info) => {
						const wait = new Promise((resolve) =>
							setTimeout(resolve, 100)
						);
						wait.then(() => {
							horFlatListRef.current?.scrollToIndex({
								index: info.index,
								animated: true,
								viewPosition: 0.5,
							});
						});
					}}
				/>
				<Modal visible={modalVisible} animationType="fade" transparent>
					<View style={styles.modalContainer}>
						<LottieView
							source={require("../../assets/animations/loading.json")}
							autoPlay
							loop
							style={{ width: 100 }}
						/>
					</View>
				</Modal>
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
	programContainer: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
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
});
