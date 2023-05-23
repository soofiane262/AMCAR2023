import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	formValidationSchema,
	EnrollFormData,
} from "../utils/validationSchemas";
import RadioWithText from "./RadioWithText";
import { getCategories } from "../utils/StorageModifiers";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Modal,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Animated,
	Easing,
} from "react-native";
import Colors from "../constants/Colors";
import * as StyledText from "./StyledText";
import InputWithIcon from "./InputWithIcon";
import Select from "./Select";
import LottieView from "lottie-react-native";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

const API_URL = "https://sel-mars.com/amcar/api/enroll.php";

export default function EnrollForm() {
	const navigation = useNavigation();
	const [categoriesData, setCategoriesData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMsg, setModalMsg] = useState("");
	const animation = useRef(new Animated.Value(0)).current;
	const modalProgress = useRef(new Animated.Value(0)).current;
	const [modalLottieIcon, setModalLottieIcon] = useState(
		require("../../assets/animations/success.json")
	);

	useEffect(() => {
		control._reset();
		setLoading(false);
		const loadCategories = async () => {
			const data = await getCategories();
			setCategoriesData(data);
		};
		loadCategories();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<EnrollFormData>({
		resolver: zodResolver(formValidationSchema),
		mode: "onBlur",
	});

	const setModal = (icon: any, title: string, msg: string) => {
		setModalLottieIcon(icon);
		setModalTitle(title);
		setModalMsg(msg);
		Animated.timing(modalProgress, {
			toValue: 1,
			duration: 3000,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};
	const makeApiRequest = async (data: any) => {
		try {
			const response = await axios.post(API_URL, data, {
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
			});
			return response.data;
		} catch (error: any) {
			if (
				error.message === "Network Error" ||
				error.message === "timeout of 5000ms exceeded"
			) {
				return {
					status: "network",
					title: "Erreur de Connexion",
					message:
						"Il semble que votre téléphone ne soit pas connecté à Internet.\nVeuillez vous assurer d'être connecté et réessayer.",
				};
			}
			return {
				status: "error",
				title: "Erreur",
				message:
					"Nous sommes désolés, une erreur s'est produite lors de l'inscription. Veuillez réessayer ultérieurement.",
			};
		}
	};

	const onSubmit: SubmitHandler<EnrollFormData> = async (data) => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 300,
			easing: Easing.bezier(0.38, 0.15, 0.4, 1),
			useNativeDriver: true,
		}).start(() => {
			setLoading(true);
		});

		const response = await makeApiRequest(data);
		let modalAnimation;

		switch (response.status) {
			case "success":
				modalAnimation = require("../../assets/animations/success.json");
				break;
			case "exists":
				modalAnimation = require("../../assets/animations/warning.json");
				break;
			case "network":
				modalAnimation = require("../../assets/animations/network.json");
				break;
			default:
				modalAnimation = require("../../assets/animations/error.json");
		}

		setModal(modalAnimation, response.title, response.message);
		setModalVisible(true);

		Animated.timing(animation, {
			toValue: 2,
			duration: 300,
			easing: Easing.bezier(0.38, 0.15, 0.4, 1),
			useNativeDriver: true,
		}).start(() => {
			setLoading(false);
			setTimeout(() => {
				animation.setValue(0);
			}, 400);
		});
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={{ width: "100%" }}
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View style={styles.container}>
				<StyledText.SemiBold style={styles.inputLabel}>
					Prénom
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="firstName"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<InputWithIcon
							control={control}
							fieldName="firstName"
							error={errors.firstName ? true : false}
							placeholder="eg. Soufiane"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							icon="person-circle-outline"
						/>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.firstName ? errors.firstName.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					Nom
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="lastName"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<InputWithIcon
							control={control}
							fieldName="lastName"
							error={errors.lastName ? true : false}
							placeholder="eg. El Marsi"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							icon="person-circle-outline"
						/>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.lastName ? errors.lastName.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					Téléphone
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="phone"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<InputWithIcon
							control={control}
							fieldName="phone"
							error={errors.phone ? true : false}
							keyboardType={"phone-pad"}
							placeholder="eg. 0607080900"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							icon="keypad"
						/>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.phone ? errors.phone.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					E-mail
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="email"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<InputWithIcon
							control={control}
							fieldName="email"
							error={errors.email ? true : false}
							keyboardType={"email-address"}
							autoCapitalize="none"
							placeholder="eg. marsi.sofiane@gmail.com"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							icon="at-circle"
						/>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.email ? errors.email.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					Spécialité
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="specialty"
					rules={{ required: true }}
					defaultValue="Cardiologue"
					render={({ field: { onChange, onBlur, value } }) => (
						<Select
							onChangeText={onChange}
							defaultValue={"Cardiologue"}
							value={value}
							dropdownData={categoriesData}
							icon="fitness"
						/>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.specialty ? errors.specialty.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					Secteur
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="sector"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={{ width: "100%" }}>
							<RadioWithText
								label="Privé"
								value={value}
								onChange={onChange}
							/>
							<RadioWithText
								label="Public"
								value={value}
								onChange={onChange}
							/>
							<RadioWithText
								label="Militaire"
								value={value}
								onChange={onChange}
							/>
						</View>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.sector ? errors.sector.message : ""}
				</StyledText.Medium>

				<StyledText.SemiBold style={styles.inputLabel}>
					Catégorie
				</StyledText.SemiBold>
				<Controller
					control={control}
					name="category"
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={{ width: "100%" }}>
							<RadioWithText
								label="Cardiologue 3000 Dhs"
								wantedValue="Cardiologue"
								value={value}
								onChange={onChange}
							/>
							<RadioWithText
								label="Résident 1800 Dhs"
								wantedValue="Résident"
								value={value}
								onChange={onChange}
							/>
						</View>
					)}
				/>
				<StyledText.Medium style={styles.error}>
					{errors.category ? errors.category.message : ""}
				</StyledText.Medium>

				<Controller
					control={control}
					name="accommodation"
					render={({ field: { onChange, onBlur, value } }) => (
						<TouchableOpacity
							onPress={() => onChange(!value)}
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
							onBlur={onBlur}
						>
							<View style={{ flex: 1 }}>
								<StyledText.SemiBold style={styles.inputLabel}>
									Hébergement 9800 Dhs
								</StyledText.SemiBold>
							</View>
							<Switch
								value={value}
								color={Colors.primary}
								onValueChange={() => onChange(!value)}
							/>
						</TouchableOpacity>
					)}
				/>
				<StyledText.Medium
					style={{
						color: Colors.tertiary,
						fontSize: 14,
						padding: 10,
					}}
				>
					Hotel Hilton et Hotel Hyatt Regency{"\n"}• 3 nuits d'hôtel
					en pension complète{"\n"}• Repas et boissons pour les 3
					jours
				</StyledText.Medium>
				<StyledText.Medium style={styles.error}>
					{errors.accommodation ? errors.accommodation.message : ""}
				</StyledText.Medium>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
				>
					<Animated.View
						style={{
							position: "absolute",
							translateY: animation.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [
									0,
									-styles.submitButton.height / 2,
									0,
								],
							}),
							opacity: animation.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [1, 0, 1],
							}),
						}}
					>
						<StyledText.SemiBold style={styles.submitButtonText}>
							S'inscrire
						</StyledText.SemiBold>
					</Animated.View>

					<Animated.View
						style={{
							position: "absolute",
							opacity: animation.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [0, 1, 0],
							}),
							transform: [
								{
									translateX: animation.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [
											-styles.submitButton.width / 2,
											0,
											styles.submitButton.width / 2,
										],
									}),
								},
							],
						}}
					>
						<LottieView
							source={require("../../assets/animations/loadPaperPlane.json")}
							autoPlay
							loop
							style={styles.lottie}
						/>
					</Animated.View>
				</TouchableOpacity>

				<Modal visible={modalVisible} animationType="fade" transparent>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<StyledText.Bold style={styles.modalTitle}>
								{modalTitle}
							</StyledText.Bold>
							<LottieView
								source={modalLottieIcon}
								loop={false}
								progress={modalProgress}
								style={styles.lottie}
							/>
							<StyledText.Medium style={styles.modalText}>
								{modalMsg}
							</StyledText.Medium>
							<TouchableOpacity
								onPress={() => {
									setModalVisible(false);
									modalProgress.setValue(0);
									if (modalTitle === "Félicitations !") {
										setTimeout(() => {
											navigation.navigate("Home");
										}, 300);
									}
								}}
							>
								<StyledText.Regular style={styles.modalButton}>
									Fermer
								</StyledText.Regular>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 40,
		alignItems: "flex-start",
		width: "90%",
		height: "100%",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "90%",
	},
	modalTitle: {
		textAlign: "center",
		fontSize: 20,
		marginBottom: 10,
	},
	modalText: {
		fontSize: 16,
		marginBottom: 10,
	},
	modalButton: {
		fontSize: 16,
		color: Colors.primary,
		textAlign: "center",
		marginTop: 10,
	},
	inputLabel: {
		color: "#333",
		fontSize: 18,
	},
	input: {
		backgroundColor: Colors.background,
		width: "100%",
		height: 40,
		padding: 20,
		marginBottom: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: Colors.primary,
	},
	error: {
		color: Colors.error,
		marginBottom: 10,
		fontSize: 12,
		height: 18,
	},
	submitButton: {
		width: 200,
		height: 50,
		backgroundColor: Colors.primary,
		alignSelf: "center",
		paddingVertical: 12,
		paddingHorizontal: 36,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	submitButtonText: {
		color: Colors.white,
		fontSize: 16,
	},
	lottie: {
		height: 100,
		width: 100,
	},
});
