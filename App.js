import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as StorageModifiers from "./src/utils/StorageModifiers";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Colors from "./src/constants/Colors";
import * as Notifications from "expo-notifications";

import HomeScreen from "./src/screens/Home";
import EnrollScreen from "./src/screens/Enroll";
import QuestionScreen from "./src/screens/Question";
import ProgramNew from "./src/screens/ProgramNew";
import ChairmanScreen from "./src/screens/Chairman";
import SpeakersScreen from "./src/screens/Speakers";
import ModeratorsScreen from "./src/screens/Moderators";
import CommitteeScreen from "./src/screens/Committee";
import SponsorsScreen from "./src/screens/Sponsors";
import InfosScreen from "./src/screens/Infos";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function App() {
	const [] = useFonts({
		MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
		MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
		MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
		MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
		MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
	});

	useEffect(() => {
		StorageModifiers.setProgram();
		StorageModifiers.setCategories();
		StorageModifiers.setSpeech();
		StorageModifiers.setSponsors();
		StorageModifiers.setSpeakers();
		StorageModifiers.setModerators();
		const getPerm = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			if (status !== "granted") {
				await Notifications.requestPermissionsAsync();
			}
		};
		getPerm();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerBackTitleVisible: false,
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: Colors.white,
				}}
			>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Enroll"
					component={EnrollScreen}
					options={{ title: "Inscription" }}
				/>
				<Stack.Screen
					name="Question"
					component={QuestionScreen}
					options={{
						title: "Posez vos questions",
					}}
				/>
				<Stack.Screen
					name="Program"
					component={ProgramNew}
					options={{ title: "Programme" }}
				/>
				<Stack.Screen
					name="Chairman"
					component={ChairmanScreen}
					options={{
						title: "Mot de Bienvenue",
					}}
				/>
				<Stack.Screen
					name="Speakers"
					component={SpeakersScreen}
					options={{
						title: "Orateurs",
					}}
				/>
				<Stack.Screen
					name="Moderators"
					component={ModeratorsScreen}
					options={{
						title: "Modérateurs",
					}}
				/>
				<Stack.Screen
					name="Committee"
					component={CommitteeScreen}
					options={{
						title: "Comité d'organisation",
					}}
				/>
				<Stack.Screen
					name="Sponsors"
					component={SponsorsScreen}
					options={{
						title: "Sponsors",
					}}
				/>
				<Stack.Screen
					name="Infos"
					component={InfosScreen}
					options={{
						title: "Informations",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
		// <>
		// 	{!loaded && <SplashScreen fontsLoaded={fontsLoaded} onLoadedChange={setLoaded} />}
		// 	{loaded &&
		// 		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		// 			<StyledText.Bold>Hi</StyledText.Bold>
		// 		</View>}
		// 	{/* {loaded && <RootLayoutNav />} */}
		// </>
	);
}
