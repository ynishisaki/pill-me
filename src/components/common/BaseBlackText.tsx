import { StyleSheet, Text } from "react-native";
export default function BaseBlackText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
		marginBottom: 8,
	},
});
