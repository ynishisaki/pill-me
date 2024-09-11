import CustomOutlineButton from "@/components/common/CustomOutlineButton";
import { ThemedText } from "@/components/common/ThemedText";
import SettingsMedicationMethod from "@/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "@/components/settings/SettingsSheetManagement";
import SettingsStartRecordDate from "@/components/settings/SettingsStartRecordDate";
import ScrollableScreenLayout from "@/components/template/ScrollableScreenLayout";
import { recordState } from "@/states/recordState";
import { pillColor } from "@/styles/color";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

export default function InitnialSettingsScreen() {
	const router = useRouter();

	const [record, setRecord] = useRecoilState(recordState);
	const onPressDecideButton = () => {
		setRecord({
			...record,
			isAsyncStorageLoaded: true,
		});
		router.push("/");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<View>
					<ThemedText type='contentTitle'>初期設定</ThemedText>
				</View>

				<SettingsMedicationMethod isFirstSettings />
				<SettingsSheetManagement isFirstSettings />
				<SettingsStartRecordDate isFirstSettings />

				<View style={styles.buttonContainer}>
					<CustomOutlineButton
						onPress={onPressDecideButton}
						title='アプリを開始する'
						bgColor={pillColor}
						textColor='whitesmoke'
						borderColor='transparent'
					/>
				</View>
			</View>
		</ScrollableScreenLayout>
	);
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		marginVertical: 20,
		rowGap: 20,
	},

	buttonContainer: {
		rowGap: 6,
	},
});