import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import OverviewText from "~/components/common/OverviewText";
import CurrentSettings from "~/components/settings/CurrentSettings";
import SettingPicker from "~/components/settings/SettingPicker";
import { recordState } from "~/states/recordState";

interface Props {
	isFirstSettings?: boolean;
}
export default function SettingsMedicationMethod(props: Props) {
	const [record, setRecord] = useRecoilState(recordState);

	const minConteniousTakingDays = record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays = record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest = record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	function onChangeMinConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				minConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeMaxConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				maxConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeConteniousBleeingDaysForRest(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				conteniousBleeingDaysForRest: Number(itemValue),
			},
		}));
	}

	function onChangeStopTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				stopTakingDays: Number(itemValue),
			},
		}));
	}

	return (
		<ContentLayout title='服薬方法'>
			<View style={styles.contentLayout}>
				<OverviewText>このアプリは、120日連続服用を対象としています。</OverviewText>
				<OverviewText>お飲みの薬の服薬方法に合わせて、以下の設定を編集してください。</OverviewText>
				{props.isFirstSettings && <OverviewText>※この設定はアプリ開始後にも変更可能です。</OverviewText>}

				<CurrentSettings />

				<>
					<SettingPicker
						description={"最短連続服薬日数"}
						selectedValue={minConteniousTakingDays}
						minValue={1}
						maxValue={maxConteniousTakingDays - 1 > 30 ? 30 : maxConteniousTakingDays - 1}
						onChange={onChangeMinConteniousTakingDays}
					/>
					<SettingPicker
						description={"最長連続服薬日数"}
						selectedValue={maxConteniousTakingDays}
						minValue={minConteniousTakingDays + 1}
						maxValue={120}
						onChange={onChangeMaxConteniousTakingDays}
					/>
					<SettingPicker
						description={"休薬開始となる連続出血日数"}
						selectedValue={conteniousBleeingDaysForRest}
						minValue={1}
						maxValue={7}
						onChange={onChangeConteniousBleeingDaysForRest}
					/>
					<SettingPicker
						description={"連続休薬日数"}
						selectedValue={stopTakingDays}
						minValue={1}
						maxValue={7}
						onChange={onChangeStopTakingDays}
					/>
				</>
			</View>
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		margin: 20,
	},
});
