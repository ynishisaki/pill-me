import { StyleSheet, Text, type TextProps } from "react-native";

// import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "topTitle" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		color: "dimgray",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
	baseWhite: {
		color: "gainsboro",
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansJP_400Regular",
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	topTitle: {
		fontSize: 40,
		fontWeight: "bold",
		lineHeight: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});
