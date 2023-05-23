import { View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import * as StyledText from "./StyledText";
import Colors from "../constants/Colors";

interface Props {
	label: string;
	wantedValue: string;
	value: string;
	onChange: (value: string) => void;
}

export default function CheckboxWithText({
	label,
	wantedValue,
	value,
	onChange,
}: Props) {
	return (
		<View style={styles.container}>
			<StyledText.Medium
				style={{
					color: Colors.secondary,
					fontSize: 16,
				}}>
				{label}
			</StyledText.Medium>
			<Checkbox
				status={wantedValue === value ? "checked" : "unchecked"}
				color={Colors.primary}
				uncheckedColor={Colors.quartary}
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
