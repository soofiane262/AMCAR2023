import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import SplashScreen from "./src/screens/Splash";
import * as StorageModifiers from "./src/utils/StorageModifiers";
import RootLayoutNav from "./src/screens/_layout";
import * as StyledText from "./src/components/StyledText";
import { View } from "react-native";

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [fontsLoaded] = useFonts({
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
	}, []);

	return (
		<>
			{!loaded && <SplashScreen fontsLoaded={fontsLoaded} onLoadedChange={setLoaded} />}
			{loaded &&
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<StyledText.Bold>Hi</StyledText.Bold>
				</View>}
			{/* {loaded && <RootLayoutNav />} */}
		</>
  );
}
