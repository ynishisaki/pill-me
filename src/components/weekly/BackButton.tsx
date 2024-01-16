import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BackIcon } from "~/components/Icons";
import BaseBlackText from "~/components/common/BaseBlackText";
import { HeaderColor } from "~/styles/color";

export const BackButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.backButtonContainer}>
				<BackIcon />
				{/* <Text style={styles.buttonLabelText}>戻る</Text> */}
				<BaseBlackText>戻る</BaseBlackText>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	backButtonContainer: {
		width: 90,
		paddingVertical: 3,
		paddingHorizontal: 10,
		flexDirection: "row",
		// 上下方向を中央ぞろえにする
		alignItems: "center",
		// 左右方向を中央ぞろえにする
		justifyContent: "center",
		columnGap: 8,
		borderColor: HeaderColor,
		borderStyle: "solid",
		borderWidth: 2,
		borderRadius: 8,
	},
	buttonLabelText: {
		fontSize: 16,
		color: "gray",
		lineHeight: 24,
		fontFamily: "NotoSansJP_400Regular",
	},
});
