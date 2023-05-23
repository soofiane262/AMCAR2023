import {
	StyleSheet,
	View,
	Animated,
	Dimensions,
	Easing,
	Text,
} from "react-native";
import Colors from "../constants/Colors";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";

const windowHeight = Dimensions.get("window").height;

interface Props {
	onLoadedChange: any;
}

export default function SplashScreen({ onLoadedChange }: Props) {
	const circleAnimation = useRef(new Animated.Value(0)).current;
	const lottieProgress = useRef(new Animated.Value(0)).current;
	const [animate, setAnimate] = useState(false);

	const handleAnimationFinish = () => {
		setTimeout(() => {
			onLoadedChange(true);
		}, 600);
		Animated.timing(circleAnimation, {
			toValue: 1,
			duration: 1000,
			easing: Easing.bezier(0.38, 0.15, 0.4, 1),
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		setTimeout(() => {
			setAnimate(true);
			Animated.timing(lottieProgress, {
				toValue: 1,
				duration: 6000,
				easing: Easing.linear,
				useNativeDriver: true,
			}).start(() => {
				handleAnimationFinish();
			});
		}, 2000);
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.circle,
					{
						transform: [
							{
								scaleX: circleAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 1],
								}),
							},
							{
								scaleY: circleAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 1],
								}),
							},
						],
					},
				]}
			/>
			<LottieView
				source={require("../../assets/animations/splash.json")}
				progress={lottieProgress}
				style={styles.animation}
				// autoPlay
				// loop={false}
				// onAnimationFinish={handleAnimationFinish}
			/>
			{/* <Text style={{ color: "white" }}>splash</Text> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.black,
	},
	circle: {
		zIndex: 2,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		height: windowHeight + 400,
		width: windowHeight + 400,
		borderRadius: windowHeight,
		borderWidth: 60,
		borderColor: Colors.primary,
		backgroundColor: Colors.background,
	},
	animation: {
		zIndex: 1,
		position: "absolute",
		width: "100%",
	},
});
