import { StyleSheet, Text } from "react-native";
export default function OverviewText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.overviewText}>{children}</Text>;
}

const styles = StyleSheet.create({
	overviewText: {
		color: "gray",
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
});
