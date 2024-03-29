import { StyleSheet, View } from "react-native";
import PickerText from "~/components/common/PickerText";
import SmallPicker from "~/components/settings/SmallPicker";

interface props {
	description: string;
	selectedValue: number;
	minValue: number;
	maxValue: number;
	onChange: (itemValue: number) => void;
}

export default function SettingPicker(props: props) {
	return (
		<View style={styles.contentLayout}>
			<PickerText>{props.description}</PickerText>
			<SmallPicker
				selectedValue={props.selectedValue}
				minValue={props.minValue}
				onChange={props.onChange}
				maxValue={props.maxValue}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		// flexDirection: "row",
		// alignItems: "center",
		// justifyContent: "space-between",
		paddingVertical: 6,
	},

	contentText: {
		// fontSize: 14,
		// maxWidth: 200,
	},
});
