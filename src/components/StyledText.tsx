import { Text, TextProps } from "react-native";

export function Light(props: TextProps) {
	return (
		<Text
			{...props}
			allowFontScaling={false}
			style={[props.style, { fontFamily: "MontserratLight" }]}
		/>
	);
}

export function Regular(props: TextProps) {
	return (
		<Text
			{...props}
			allowFontScaling={false}
			style={[props.style, { fontFamily: "MontserratRegular" }]}
		/>
	);
}

export function Medium(props: TextProps) {
	return (
		<Text
			{...props}
			allowFontScaling={false}
			style={[props.style, { fontFamily: "MontserratMedium" }]}
		/>
	);
}

export function SemiBold(props: TextProps) {
	return (
		<Text
			{...props}
			allowFontScaling={false}
			style={[props.style, { fontFamily: "MontserratSemiBold" }]}
		/>
	);
}

export function Bold(props: TextProps) {
	return (
		<Text
			{...props}
			allowFontScaling={false}
			style={[props.style, { fontFamily: "MontserratBold" }]}
		/>
	);
}
