import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import SplashScreen from "./src/screens/Splash";
import * as StorageModifiers from "./src/utils/StorageModifiers";
import RootLayoutNav from "./src/screens/_layout";

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [fontsLoaded, fontsError] = useFonts({
		MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
		MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
		MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
		MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
		MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		StorageModifiers.setProgram();
		StorageModifiers.setCategories();
		StorageModifiers.setSpeech();
		if (fontsError) throw fontsError;
	}, [fontsError]);

	return (
		<>
			{/* {!loaded && <SplashScreen onLoadedChange={setLoaded} />} */}
			{/* {loaded && <RootLayoutNav />} */}
			<RootLayoutNav />
		</>
  );
}
