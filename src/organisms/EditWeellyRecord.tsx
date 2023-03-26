import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import CheckBox from "~/molecules/PressableCheckBox";
import { showDate } from "~/organisms/TodaysRecord";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	function onPressTookMedicine(nextBoolean: boolean, index: number) {
		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord.slice(0, index),
				{
					...record.dailyRecord[index],
					tookMedicine: nextBoolean,
				},
				...record.dailyRecord.slice(index + 1),
			],
		});
	}

	function onPressHaveBleeding(nextBoolean: boolean, index: number) {
		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord.slice(0, index),
				{
					...record.dailyRecord[index],
					haveBleeding: nextBoolean,
				},
				...record.dailyRecord.slice(index + 1),
			],
		});
	}

	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [
		...weekArr.slice((week + 1) % 7),
		...weekArr.slice(0, (week + 1) % 7),
	];

	const recordLength =
		record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];
	for (let i = 0; i < recordLength; i++) {
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.horizonalStackLayout}>
				<Text>{showDate(record.dailyRecord[0].date)}</Text>

				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							title={i === 0 ? "服薬" : null}
							size={"md"}
							isChecked={record.dailyRecord[i].tookMedicine}
							disabled={record.dailyRecord[i].isRestPeriod}
							onPress={(nextBoolean) =>
								onPressTookMedicine(nextBoolean, i)
							}
						/>
						<CheckBox
							title={i === 0 ? "出血" : null}
							size={"md"}
							isChecked={record.dailyRecord[i].haveBleeding}
							disabled={record.dailyRecord[i].isRestPeriod}
							onPress={(nextBoolean) =>
								onPressHaveBleeding(nextBoolean, i)
							}
						/>
					</>
				)}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* <View style={styles.titleContainer}> */}
			<Title title={`過去の記録`} />
			<Text style={styles.description}>
				一週間前まで記録をさかのぼって編集することができます
			</Text>
			<View style={styles.verticalStackLayout}>
				{editableWeelyRecordCheckBoxes}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		// width: 280,
		// marginBottom: 24,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	description: {
		marginTop: 8,
		marginHorizontal: 20,
		fontSize: 12,
		color: "#000000A8",
	},
	verticalStackLayout: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
		minWidth: 230,
		// maxWidth: 250,
		gap: 20,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		// marginTop: 20,
		alignItems: "center",
	},
});
