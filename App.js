import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import SplashScreen from "./src/screens/Splash";
import * as StorageModifiers from "./src/utils/StorageModifiers";
import RootLayoutNav from "./src/screens/_layout";
import * as StyledText from "./src/components/StyledText";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Colors from "./src/constants/Colors";

import HomeScreen from "./src/screens/Home";
import EnrollScreen from "./src/screens/Enroll";
import QuestionScreen from "./src/screens/Question";
import ProgramNew from "./src/screens/ProgramNew";
import ChairmanScreen from "./src/screens/Chairman";
import CommitteeScreen from "./src/screens/Committee";
import SponsorsScreen from "./src/screens/Sponsors";

const Stack = createNativeStackNavigator();

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
