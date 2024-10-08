import { CancelIcon, DropIcon, PillIcon, QuestionIcon } from "@/components/common/Icons";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
	textComponent?: React.ReactNode;
	type: "medicine" | "bleeding";
	size: "sm" | "md" | "lg";
	isChecked: boolean;
	isRestPeriod: boolean;
	isNotRecorded?: boolean;
	readonly?: boolean;
	onPress: (nextBoolean: boolean) => void;
};

export default function CheckBox(props: Props) {
	const checkBoxSize = props.size === "sm" ? 25 : props.size === "md" ? 70 : 100;

	const ImageComponent = () => {
		if (props.isRestPeriod) {
			return <CancelIcon size={props.size} />;
		}
		if (props.isNotRecorded) {
			return <QuestionIcon size={props.size} />;
		}
		if (props.type === "medicine") {
			return <PillIcon size={props.size} />;
		}
		if (props.type === "bleeding") {
			return <DropIcon size={props.size} />;
		}
	};

	const fillColor = () => {
		if (props.isRestPeriod) {
			return Colors.checkbox.unpressable;
		}
		if (props.isNotRecorded) {
			return Colors.checkbox.unpressableUnknown;
		}
		return Colors.checkbox.fill;
	};

	return (
		<View style={styles.container}>
			{props.textComponent}
			<BouncyCheckbox
				size={checkBoxSize}
				innerIconStyle={{
					borderWidth: 2,
				}}
				iconStyle={{
					elevation: 1,
				}}
				ImageComponent={ImageComponent}
				fillColor={fillColor()}
				unfillColor={Colors.checkbox.unfill}
				isChecked={props.isRestPeriod || props.isNotRecorded ? true : props.isChecked} // タスク：isCheckedは無視されるが大丈夫？
				disableText={true}
				disabled={props.isRestPeriod || props.isNotRecorded || props.readonly}
				disableBuiltInState={true}
				onPress={() => props.onPress(!props.isChecked)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
});
