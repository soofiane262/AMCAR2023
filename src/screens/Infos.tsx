import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Linking,
	Platform,
	Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as StyledText from "../components/StyledText";

const width = Dimensions.get("window").width;

export default function InfosScreen() {
	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<TouchableOpacity
				onPress={() =>
					Linking.openURL(
						"https://goo.gl/maps/LyQRnht8QxScZXBF9"
					).catch((err) => console.error("An error occurred", err))
				}
			>
				<Image
					source={{
						uri: "https://sel-mars.com/amcar/images/map.png",
					}}
					style={{ width, height: width / 2, alignSelf: "center" }}
				/>
			</TouchableOpacity>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.articles}
			>
				<View
					style={{
						paddingVertical: 16,
					}}
				>
					<Image
						source={{
							uri: "https://sel-mars.com/amcar/images/amcar.png",
						}}
						style={{ width: 180, height: 90, alignSelf: "center" }}
					/>
					<View
						style={{
							alignSelf: "center",
							height: 1,
							width: "80%",
							backgroundColor: "#2B3872a0",
							borderRadius: 20,
							margin: 16,
						}}
					/>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"https://goo.gl/maps/nJPMWpiNk6129V1u6"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="location"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								14, Bd de Paris, Casablanca, Maroc
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Platform.OS !== "android"
								? Linking.openURL(`telprompt:{00212641699757}`)
								: Linking.openURL(`tel:{00212641699757}`).catch(
										(err) =>
											console.error(
												"An error occurred",
												err
											)
								  )
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="call"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								+212 6 41 69 97 57
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"mailto:amcarcontact@gmail.com"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="mail"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								amcarcontact@gmail.com
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"https://instagram.com/cardio.amcar"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="logo-instagram"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								cardio.amcar
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL("https://www.amcar.ma").catch(
								(err) => console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="globe-outline"
								size={17}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								www.amcar.ma
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ paddingVertical: 8 }}>
					<Image
						source={{
							uri: "https://sel-mars.com/amcar/images/sbt.png",
						}}
						style={{ width: 180, height: 90, alignSelf: "center" }}
					/>
					<View
						style={{
							alignSelf: "center",
							height: 1,
							width: "80%",
							backgroundColor: "#2B3872a0",
							borderRadius: 20,
							margin: 8,
						}}
					/>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"https://goo.gl/maps/6oZQD74CvxVBAniNA"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="location"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								93, Bd Adelmoumen, Résidence Capital Office
								Business Center, Casablanca, Maroc
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Platform.OS !== "android"
								? Linking.openURL(`telprompt:{00212522209096}`)
								: Linking.openURL(`tel:{00212522209096}`).catch(
										(err) =>
											console.error(
												"An error occurred",
												err
											)
								  )
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="call"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								+212 5 22 209 096/92
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							alignSelf: "center",
							padding: 8,
							marginLeft: 8 * 2,
						}}
					>
						<StyledText.Bold
							style={{
								fontSize: 18,
							}}
						>
							Mme Halima
						</StyledText.Bold>
					</View>
					<TouchableOpacity
						onPress={() =>
							Platform.OS !== "android"
								? Linking.openURL(`telprompt:{00212661799199}`)
								: Linking.openURL(`tel:{00212661799199}`).catch(
										(err) =>
											console.error(
												"An error occurred",
												err
											)
								  )
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="call"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								+212 6 61 79 91 99
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"mailto:halima.sigmaco@gmail.com"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="mail"
								family="Entypo"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								halima.sigmaco@gmail.com
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							alignSelf: "center",
							padding: 8,
							marginLeft: 8 * 2,
						}}
					>
						<StyledText.Bold
							style={{
								fontSize: 18,
							}}
						>
							Mme Nadia
						</StyledText.Bold>
					</View>
					<TouchableOpacity
						onPress={() =>
							Platform.OS !== "android"
								? Linking.openURL(`telprompt:{00212661455837}`)
								: Linking.openURL(`tel:{00212661455837}`).catch(
										(err) =>
											console.error(
												"An error occurred",
												err
											)
								  )
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="call"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								+212 6 61 45 58 37
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"mailto:nadiasigmaco@gmail.com"
							).catch((err) =>
								console.error("An error occurred", err)
							)
						}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								marginLeft: 8 * 2,
							}}
						>
							<Ionicons
								name="mail"
								family="Entypo"
								size={16}
								style={{
									color: "#2B3872",
									paddingRight: 8,
								}}
							/>
							<StyledText.Regular>
								nadiasigmaco@gmail.com
							</StyledText.Regular>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ height: 200 }} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	home: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	articles: {
		width: "90%",
	},
});
