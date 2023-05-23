import { useState, useEffect, useRef, RefObject } from "react";
import { StyleSheet, Animated, View, Easing, FlatList } from "react-native";
import moment, { Moment } from "moment";
import Date from "./Date";
import Colors from "../constants/Colors";
import { ProgramData } from "../constants/ProgramNew";

interface Props {
	startDate: Date;
	program: ProgramData[][];
	day: Date;
	flatListRef: RefObject<FlatList>;
	handleScroll: (index: number) => void;
}

const Calendar = ({
	startDate,
	program,
	day,
	flatListRef,
	handleScroll,
}: Props) => {
	const [dates, setDates] = useState<Moment[]>();
	const [offsetPosition, setOffsetPosition] = useState(
		moment(day).diff(moment(startDate), "days") * 80
	);
	const [selectedDate, setSelectedDate] = useState(
		moment(day).format("YYYY-MM-DD")
	);
	const offsetProgress = useRef(new Animated.Value(offsetPosition)).current;

	// get the dates from today to 3 days from startDate, format them as strings and store them in state
	const getDates = () => {
		const _dates = [];
		for (let i = 0; i < 3; i++) {
			const date = moment(startDate).add(i, "days");
			_dates.push(date);
		}
		setDates(_dates);
	};

	useEffect(() => {
		getDates();
	}, []);

	useEffect(() => {
		Animated.timing(offsetProgress, {
			toValue: offsetPosition,
			duration: 400,
			easing: Easing.bezier(0.38, 0.15, 0.4, 1),
			useNativeDriver: true,
		}).start();
	}, [offsetPosition]);

	return (
		<>
			<View style={styles.centered}></View>
			<View style={styles.dateSection}>
				<View style={styles.scroll}>
					<Animated.View
						style={{
							height: 110,
							width: 80,
							borderRadius: 30,
							transform: [{ translateX: offsetProgress }],
							position: "absolute",
							backgroundColor: Colors.primary,
							shadowColor: Colors.secondary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}
					/>
					{dates?.map((date, index) => (
						<Date
							key={index}
							startDate={startDate}
							program={program}
							date={date.toDate()}
							onSelectDate={setSelectedDate}
							selected={selectedDate.toString()}
							setScroll={setOffsetPosition}
							flatListRef={flatListRef}
							handleScroll={handleScroll}
						/>
					))}
				</View>
			</View>
		</>
	);
};

export default Calendar;

const styles = StyleSheet.create({
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	dateSection: {
		width: "100%",
		padding: 20,
	},
	scroll: {
		flexDirection: "row",
	},
});
