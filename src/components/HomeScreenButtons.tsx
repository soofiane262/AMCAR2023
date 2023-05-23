import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React from "react";
import * as StyledText from "./StyledText";
import { HomeButtonData } from "../constants/HomeButtons";
import Colors from "../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Octicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

interface Props {
	button: HomeButtonData;
	flexDirection?: "row" | "column";
	width?: number;
	height?: number;
}

function Base({
	button,
	width = windowWidth - 40,
	height,
	flexDirection = "column",
}: Props) {
	const navigation = useNavigation();

	const buttonPressHandler = (e: any) => {
		if (button.href) {
			e.preventDefault();
			WebBrowser.openBrowserAsync(button.href);
		} else navigation.navigate(button.id);
	};
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: button.color,
					width,
					height,
					flexDirection,
				},
			]}
			onPress={buttonPressHandler}
		>
			<View
				style={[
					styles.inner,
					flexDirection === "row" ? { margin: 20 } : { margin: 10 },
				]}
			>
				{button.iconFamily === "Ionicons" ? (
					<Ionicons
						name={button.icon}
						size={innerButtonSize / 1.8}
						color={button.color}
					/>
				) : (
					<Octicons
						name={button.icon}
						size={innerButtonSize / 1.8}
						color={button.color}
					/>
				)}

				{/* <LottieView
					source={button.icon}
					progress={lottieProgress}
					style={styles.icon}
				/> */}
			</View>
			<StyledText.Bold
				style={[
					styles.title,
					flexDirection === "row"
						? { flex: 1, marginHorizontal: 4 }
						: { marginHorizontal: 10, textAlign: "center" },
				]}
			>
				{button.title}
			</StyledText.Bold>
		</TouchableOpacity>
	);
}

const baseCanvas = windowWidth / 5;
const innerButtonSize = baseCanvas / 2;

export function Sm(props: Props) {
	const width = baseCanvas * 3.3 - 20;
	const height = baseCanvas - 5;
	return (
		<Base {...props} width={width} height={height} flexDirection="row" />
	);
}

export function Md(props: Props) {
	const width = baseCanvas * 1.7 - 20;
	const height = baseCanvas * 2 + 10;
	return <Base {...props} width={width} height={height} />;
}

export function Lg(props: Props) {
	const width = windowWidth / 2 - 20;
	return <Base {...props} width={width} height={width / 1.5} />;
}

export function Xl(props: Props) {
	const width = windowWidth - 30;
	return <Base {...props} width={width} height={70} flexDirection="row" />;
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "space-evenly",
		borderRadius: 20,
		margin: 5,
	},
	inner: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		width: innerButtonSize,
		height: innerButtonSize,
		borderRadius: 10,
	},
	title: {
		color: Colors.white,
		shadowColor: Colors.primary,
		fontSize: innerButtonSize / 2.6,
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,
		elevation: 15,
	},
});
