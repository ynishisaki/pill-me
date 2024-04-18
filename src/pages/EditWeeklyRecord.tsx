import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import { LeftIcon } from "~/components/Icons";
import CustomButton from "~/components/common/CustomButton";
import Divider from "~/components/common/Divider";
import OverviewText from "~/components/common/OverviewText";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { hasNoRecordDays } from "~/functions/countRecord";
import { recordState } from "~/states/recordState";
import { secondaryColor } from "~/styles/color";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<>
			<ScrollableScreenLayout>
				{isFocused && (
					<View style={styles.contentsLayout}>
						<ContentLayout title='記録の編集'>
							<CustomButton
								onPress={() => navigation.navigate("Home")}
								bgColor={secondaryColor}
								textColor='dimgray'
								title='ホームに戻る'
								iconComponent={<LeftIcon />}
							/>
							<Divider />

							<OverviewText>過去の記録を編集できます</OverviewText>
							{hasNoRecordWithoutToday && (
								<OverviewText>
									{`記録忘れの日があります\n下から順番に服薬記録を埋めてください。`}
								</OverviewText>
							)}

							{/* <Divider /> */}
							<EditWeellyRecordCheckBoxes />
						</ContentLayout>
					</View>
				)}
			</ScrollableScreenLayout>
		</>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 10,
	},
	bottom: {
		position: "absolute",
		bottom: 0,
	},
});
