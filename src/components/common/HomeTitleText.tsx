import { StyleSheet, Text } from "react-native";

export default function HomeTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
	titleText: {
		color: "white",
		fontSize: 52,
		lineHeight: 60,
		fontFamily: "NotoSansJP_700Bold",
		marginBottom: 30,
	},
});
