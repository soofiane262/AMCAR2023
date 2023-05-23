import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useController } from "react-hook-form";

interface Props {
	control: any;
	fieldName: string;
	multiline?: boolean;
	error?: boolean;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	placeholder?: string;
	onBlur?: () => void;
	onChangeText: (text: string) => void;
	value?: string;
	icon?: any;
	style?: ViewStyle;
}

const InputWithIcon: React.FC<Props> = ({
	control,
	fieldName,
	multiline = false,
	error = false,
	keyboardType = "default",
	autoCapitalize = "words",
	placeholder = "",
	onBlur,
	onChangeText,
	value,
	icon,
	style,
}) => {
	const [color, setColor] = React.useState(Colors.quartary);
	const [selected, setSelected] = React.useState(false);

	const { field } = useController({
		name: fieldName,
		control, // pass in the control instance from React Hook Form
		rules: { required: true }, // add any validation rules here
		defaultValue: "", // set the initial value of the input field
	});
	useEffect(() => {
		if (error) {
			setColor(Colors.error);
		} else if (selected) {
			setColor(Colors.primary);
		} else {
			setColor(Colors.quartary);
		}
	}, [error, selected]);

	return (
		<View style={[styles.container, { borderColor: color }, style]}>
			{icon && (
				<Ionicons
					name={icon}
					size={20}
					style={[styles.icon, { color }]}
				/>
			)}
			<TextInput
				{...field}
				allowFontScaling={false}
				autoCapitalize={autoCapitalize}
				autoCorrect={false}
				autoFocus={
					fieldName === "firstName" || fieldName === "question"
				}
				keyboardType={keyboardType}
				multiline={multiline}
				onBlur={() => {
					setSelected(false);
					onBlur && onBlur();
				}}
				onChangeText={onChangeText}
				onFocus={() => setSelected(true)}
				placeholder={placeholder}
				placeholderTextColor={Colors.quartary}
				selectionColor={Colors.primary}
				style={[style, styles.input]}
				value={value}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10,
		width: "100%",
		height: 44,
		backgroundColor: "#e9e9e9",
		flexDirection: "row",
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
		padding: 0,
	},
});

export default InputWithIcon;
