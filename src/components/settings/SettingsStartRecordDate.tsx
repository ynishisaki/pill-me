import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/common/ContentLayout";
import { ThemedText } from "~/components/common/ThemedText";
import CalenderModal from "~/components/firstSettings/CalenderModal";
import { generatePastRecord, recordState } from "~/states/recordState";

interface Props {
	isFirstSettings?: boolean;
}
export default function SettingsStartRecordDate(props: Props) {
	const [numOfRecordDays, setNumOfRecordDays] = useState(1);

	const [record, setRecord] = useRecoilState(recordState);

	const genRecord = generatePastRecord(numOfRecordDays);
	useEffect(() => {
		setRecord({
			...genRecord,
		});
	}, [numOfRecordDays]);

	return (
		<ContentLayout title='服薬開始日'>
			<View style={styles.container}>
				<ThemedText type='overview'>服薬開始日を設定します。</ThemedText>
				{props.isFirstSettings && (
					<ThemedText type='warn'>※この設定はアプリ開始後に変更できません。</ThemedText>
				)}

				<View style={styles.contentLayout}>
					<Text style={styles.pickerText}>最新の服薬開始日</Text>
					<CalenderModal numOfDays={numOfRecordDays} handleSetNumOfDays={setNumOfRecordDays}></CalenderModal>
				</View>
			</View>
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
	contentLayout: {
		paddingVertical: 6,
	},
	pickerText: {
		color: "dimgray",
		fontSize: 14,
		lineHeight: 24,
		fontFamily: "NotoSansJP_400Regular",
	},
});
