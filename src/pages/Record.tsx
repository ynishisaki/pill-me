import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CurrentSheet } from "~/components/record/CurrentSheet";
import { WeeklyRecord } from "~/components/record/WeeklyRecord";
import { translucentWhite } from "~/styles/color";
import ScreenLayout from "~/template/ScreenLayout";

export const Record = () => {
	const isFocused = useIsFocused();

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<View style={styles.sheetRecord}>
						<CurrentSheet />
					</View>
					<View style={styles.weeklyRecord}>
						<WeeklyRecord />
					</View>
				</View>
			)}
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "column",
		rowGap: 50,
		marginBottom: 40,
	},
	weeklyRecord: {
		height: 170,
		width: 330,
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
	sheetRecord: {
		height: 214,
		width: 330,
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
});
