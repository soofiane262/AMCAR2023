import React, { useRef, useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	StyleSheet,
	Animated,
	Easing,
	ScrollView,
} from "react-native";
import moment from "moment";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

import { HomeButtonData, HomeButtons } from "../constants/HomeButtons";
import * as HomeScreenButtons from "../components/HomeScreenButtons";
import Colors from "../constants/Colors";

import SplashScreen from "./Splash";

export default function HomeScreen() {
	const [loaded, setLoaded] = useState(false);
	const today = moment().format("YYYY-MM-DD");
	const animation = useRef(new Animated.Value(0)).current;
	const lottieProgress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 2000,
			easing: Easing.bezier(0.38, 0.15, 0.4, 1),
			useNativeDriver: true,
		}).start();
	}, [animation]);

	useEffect(() => {
		setTimeout(() => {
			Animated.timing(lottieProgress, {
				toValue: 1,
				duration: 2000,
				easing: Easing.linear,
				useNativeDriver: true,
			}).start();
		}, 7000);
	}, []);

	const renderButton = ({
		item,
		buttonSize,
	}: {
		item: HomeButtonData;
		buttonSize?: "sm" | "md" | "lg" | "xl";
	}) => {
		const ButtonComponent =
			buttonSize === "sm"
				? HomeScreenButtons.Sm
				: buttonSize === "md"
				? HomeScreenButtons.Md
				: buttonSize === "lg"
				? HomeScreenButtons.Lg
				: HomeScreenButtons.Xl;
		return <ButtonComponent button={item} />;
	};
	if (!loaded)
		return (
			<>
				<SplashScreen onLoadedChange={setLoaded} />
			</>
		);
	else
		return (
			<>
				<StatusBar style="light" />
				<LottieView
					source={require("../../assets/animations/home.json")}
					progress={lottieProgress}
					style={styles.animation}
				/>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.container}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							style={{ flex: 1 }}
						>
							<View style={{ height: 20 }} />
							<View style={styles.center}>
								<View style={styles.row}>
									{renderButton({
										item: HomeButtons[0],
										buttonSize: "lg",
									})}
									{renderButton({
										item: HomeButtons[1],
										buttonSize: "lg",
									})}
								</View>
								{today >= "2023-06-08" &&
									renderButton({
										item: HomeButtons[12],
										buttonSize: "xl",
									})}
								{/* {renderButton({
									item: HomeButtons[2],
									buttonSize: "xl",
								})} */}
								<View style={styles.row}>
									{renderButton({
										item: HomeButtons[3],
										buttonSize: "md",
									})}
									<View>
										{renderButton({
											item: HomeButtons[4],
											buttonSize: "sm",
										})}
										{renderButton({
											item: HomeButtons[5],
											buttonSize: "sm",
										})}
									</View>
								</View>
								<View style={styles.row}>
									<View>
										{renderButton({
											item: HomeButtons[6],
											buttonSize: "sm",
										})}
										{renderButton({
											item: HomeButtons[7],
											buttonSize: "sm",
										})}
									</View>
									{renderButton({
										item: HomeButtons[8],
										buttonSize: "md",
									})}
								</View>
							</View>
							<View style={styles.row}>
								{renderButton({
									item: HomeButtons[9],
									buttonSize: "md",
								})}
								<View>
									{renderButton({
										item: HomeButtons[10],
										buttonSize: "sm",
									})}
									{renderButton({
										item: HomeButtons[11],
										buttonSize: "sm",
									})}
								</View>
							</View>
						</ScrollView>
					</View>
				</SafeAreaView>
			</>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: Colors.background,
	},
	animation: {
		width: "100%",
	},
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
