import { Dimensions, Image, View } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function MapScreen() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Image
				source={require("../../assets/images/siteMap.png")}
				style={{
					width: windowWidth,
					height: windowWidth * 1.3,
				}}
			/>
		</View>
	);
}
