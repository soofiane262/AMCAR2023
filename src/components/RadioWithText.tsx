import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import * as StyledText from "./StyledText";
import Colors from "../constants/Colors";

interface Props {
	label: string;
	wantedValue?: string;
	value: string;
	onChange: (value: string) => void;
}

export default function RadioWithText({
	label,
	wantedValue = label,
	value,
	onChange,
}: Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ flex: 1 }}
				onPress={() => onChange(wantedValue)}
			>
				{wantedValue === value && (
					<StyledText.SemiBold
						style={{
							width: "80%",
							color: Colors.primary,
							fontSize: 16,
						}}
					>
						{label}
					</StyledText.SemiBold>
				)}
				{wantedValue !== value && (
					<StyledText.Medium
						style={{
							width: "80%",
							color: Colors.tertiary,
							fontSize: 16,
						}}
					>
						{label}
					</StyledText.Medium>
				)}
			</TouchableOpacity>
			<RadioButton.Android
				value={wantedValue}
				status={wantedValue === value ? "checked" : "unchecked"}
				color={Colors.primary}
				uncheckedColor={Colors.tertiary}
				onPress={() => onChange(wantedValue)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHoriontal: 10,
		marginLeft: 10,
	},
});
