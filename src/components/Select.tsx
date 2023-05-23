import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ModalDropdown from "react-native-modal-dropdown";
import * as StyledText from "./StyledText";

const windowHeight = Dimensions.get("window").height;

interface Props {
	defaultValue: string;
	value?: string;
	onChangeText: (text: string) => void;
	dropdownData: string[];
	icon: any;
}

const Select: React.FC<Props> = ({
	defaultValue,
	onChangeText,
	value,
	dropdownData,
	icon,
}) => {
	const [color, setColor] = React.useState(Colors.quartary);
	if (!value) {
		onChangeText(defaultValue);
	}
	return (
		<View style={[styles.container, { borderColor: color }]}>
			<ModalDropdown
				options={dropdownData}
				onSelect={(index, value) => onChangeText(value)}
				onDropdownWillShow={() => setColor(Colors.primary)}
				onDropdownWillHide={() => setColor(Colors.quartary)}
				style={styles.dropdown}
				dropdownTextStyle={styles.dropdownText}
				dropdownTextHighlightStyle={styles.dropdownTextHighlight}
				dropdownStyle={styles.dropdownContainer}
				defaultValue={defaultValue}
			>
				<View style={styles.inner}>
					<Ionicons
						name={icon}
						size={20}
						style={[styles.icon, { color }]}
					/>
					<StyledText.Medium style={styles.input}>
						{value}
					</StyledText.Medium>
					<Ionicons
						name={"chevron-down-outline"}
						size={20}
						style={[styles.icon, { alignSelf: "flex-end" }]}
					/>
				</View>
			</ModalDropdown>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10,
		width: "100%",
		flexDirection: "row",
		backgroundColor: "#e9e9e9",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#000",
	},
	inner: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 4,
	},
	dropdown: {
		width: "100%",
		marginLeft: 10,
	},
	dropdownContainer: {
		width: "70%",
		height: windowHeight / 3,
		borderRadius: 5,
		marginTop: 5,
	},
	dropdownText: {
		fontSize: 16,
		color: Colors.secondary,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	dropdownTextHighlight: {
		color: Colors.primary,
	},
});

export default Select;
