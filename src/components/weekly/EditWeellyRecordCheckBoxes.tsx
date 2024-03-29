import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import CheckBox from "~/components/common/CheckBox";
import OverviewAlertText from "~/components/common/OverviewAlertText";
import WidthFixedCheckboxTitleText from "~/components/common/WidthFixedCheckboxTitleText";
import WidthFixedRightText from "~/components/common/WidthFixedRightText";
import { hasNoRecordDays } from "~/functions/countRecord";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";

export default function EditWeellyRecordCheckBoxes() {
	const [record, setRecord] = useRecoilState(recordState);

	function updateAWeekRecord(key: string, nextBoolean: boolean, index: number) {
		let updatedRecord = {
			...record,
			dailyRecord: [
				// 記録更新対象の日以降の記録は削除
				...record.dailyRecord.slice(0, index).map((dailyRecord) => {
					return {
						...dailyRecord,
						tookMedicine: false,
						haveBleeding: false,
						isRestPeriod: false,
					};
				}),
				// 記録更新対象
				{
					...record.dailyRecord[index],
					[key]: nextBoolean,
				},
				...record.dailyRecord.slice(index + 1),
			],
		};

		const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(updatedRecord, index);

		if (isTomorrowStartsRestPeriod) {
			const { stopTakingDays } = record.initialSheetSettings;
			const updateRecordToIndex = index > stopTakingDays ? index - stopTakingDays : 0;

			updatedRecord = {
				...updatedRecord,
				dailyRecord: [
					...updatedRecord.dailyRecord.slice(0, updateRecordToIndex),
					// 休薬期間
					...Array.from({ length: index - updateRecordToIndex }, (_, i) => {
						return {
							...updatedRecord.dailyRecord[i],
							isRestPeriod: isTomorrowStartsRestPeriod,
						};
					}),
					// 記録した日はすでにupdatedRecordに含まれている
					...updatedRecord.dailyRecord.slice(index),
				],
			};

			alertTomorrowRestPeriod();
		}
		setRecord(updatedRecord);
	}

	const alertTomorrowRestPeriod = () =>
		Alert.alert(
			"休薬日となりました",
			`出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
			[
				{
					text: "OK",
					style: "default",
				},
			]
		);

	const recordLength = record.dailyRecord.length >= 8 ? 8 : record.dailyRecord.length;

	const editableWeelyRecordCheckBoxes = [];

	// 今日の記録はHomeでつける
	for (let i = 1; i < recordLength; i++) {
		const { hasNoRecordWithoutToday } = hasNoRecordDays(record, i);
		editableWeelyRecordCheckBoxes.push(
			<View key={i} style={styles.horizonalStackLayout}>
				<WidthFixedRightText>
					{getDateWeekStringsForDisplay(record.dailyRecord[i].date)}
					{"\n"}({i}日前)
				</WidthFixedRightText>
				{record.isAsyncStorageLoaded && (
					<>
						<CheckBox
							type='medicine'
							size={"md"}
							isChecked={record.dailyRecord[i].tookMedicine}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							isNotRecorded={hasNoRecordWithoutToday}
							onPress={(nextBoolean) => updateAWeekRecord("tookMedicine", nextBoolean, i)}
						/>
						<CheckBox
							type='bleeding'
							size={"md"}
							isChecked={record.dailyRecord[i].haveBleeding}
							isRestPeriod={record.dailyRecord[i].isRestPeriod}
							isNotRecorded={hasNoRecordWithoutToday}
							onPress={(nextBoolean) => updateAWeekRecord("haveBleeding", nextBoolean, i)}
						/>
					</>
				)}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* 昨日以前の記録がない場合 */}
			{recordLength < 2 ? (
				<OverviewAlertText key={-1}>編集できる記録がありません</OverviewAlertText>
			) : (
				<View key={-1} style={styles.horizonalStackLayout}>
					<WidthFixedRightText>
						<></>
					</WidthFixedRightText>

					<WidthFixedCheckboxTitleText>服薬</WidthFixedCheckboxTitleText>
					<WidthFixedCheckboxTitleText>出血</WidthFixedCheckboxTitleText>
				</View>
			)}

			<View style={styles.verticalStackLayout}>{editableWeelyRecordCheckBoxes}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: "auto",
	},

	verticalStackLayout: {
		gap: 12,
	},
	horizonalStackLayout: {
		flexDirection: "row",
		justifyContent: "center",
		columnGap: 20,
		alignItems: "center",
	},
});
