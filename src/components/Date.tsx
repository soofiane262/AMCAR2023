import React, { RefObject, useEffect, useState } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Dimensions,
} from "react-native";
import moment from "moment";
import * as StyledText from "./StyledText";
import Colors from "../constants/Colors";
import { ProgramData } from "../constants/ProgramNew";

const windowWidth = Dimensions.get("window").width;

interface Props {
	startDate: Date;
	program: ProgramData[][];
	date: Date;
	onSelectDate: (date: string) => void;
	selected: string;
	setScroll: (value: number) => void;
	flatListRef: RefObject<FlatList>;
	handleScroll: (index: number) => void;
}

const Date = ({
	startDate,
	program,
	date,
	onSelectDate,
	selected,
	setScroll,
	flatListRef,
	handleScroll,
}: Props) => {
	const dayNumber = moment(date).format("D");
	const dayIdx = moment(date).diff(moment(startDate), "days");
	let dayOfWeek = moment(date).format("ddd");
	dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
	const isDateSelected = selected === moment(date).format("YYYY-MM-DD");
	const fontSize = isDateSelected ? 22 : 18;
	const color = isDateSelected ? Colors.white : Colors.primary;

	const handlePress = () => {
		const wantedDay = () => {
			const isSameDate =
				program[dayIdx][0].date ===
				moment(date).format("YYYY-MM-DD").toString();
			return isSameDate;
		};
		if (wantedDay()) {
			setScroll(moment(date).diff(moment(startDate), "days") * 80);
			handleScroll(moment(date).diff(moment(startDate), "days"));
			onSelectDate(moment(date).format("YYYY-MM-DD"));
		}
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.card}>
			<View>
				<StyledText.SemiBold
					style={[
						styles.medium,
						{
							color,
						},
					]}
				>
					{dayOfWeek}
				</StyledText.SemiBold>
				<View style={{ height: 10 }} />
				<StyledText.Bold style={[styles.medium, { fontSize, color }]}>
					{dayNumber}
				</StyledText.Bold>
			</View>
		</TouchableOpacity>
	);
};

export default Date;

const styles = StyleSheet.create({
	card: {
		padding: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
		height: 90,
		width: 70,
		marginHorizontal: 5,
	},
	big: {
		fontSize: 20,
		textAlign: "center",
	},
	medium: {
		textAlign: "center",
		fontSize: 16,
	},
});
