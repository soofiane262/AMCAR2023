import HomeScreen from "./Home";
import EnrollScreen from "./Enroll";
import ProgramNew from "./ProgramNew";
import MapScreen from "./Map";
import ChairmanScreen from "./Chairman";
import CommitteeScreen from "./Committee";
import QuestionScreen from "./Question";

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../../src/constants/Colors";

const Stack = createNativeStackNavigator();

export default function RootLayoutNav() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerBackTitleVisible: false,
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTitleStyle: {
						fontFamily: "MontserratSemiBold",
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
					name="Program"
					component={ProgramNew}
					options={{ title: "Programme" }}
				/>
				<Stack.Screen
					name="Map"
					component={MapScreen}
					options={{ title: "Plan Intéractif" }}
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
					name="Question"
					component={QuestionScreen}
					options={{
						title: "Posez vos questions",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
