import { atom, RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./src/pages/Home";
import { Settings } from "./src/pages/Settings";
import { EditWeeklyRecord } from "./src/pages/EditWeeklyRecord";
import { TouchableOpacity } from "react-native";
import { SettingIcon } from "~/atoms/Icons";

export function getDateStrings(selectedDate: Date) {
	const offset = selectedDate.getTimezoneOffset();
	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	return selectedDate.toISOString().split("T")[0];
}

export const today = getDateStrings(new Date()); // YYYY-DD-MM

export const recordState = atom({
	key: "1", // unique ID (with respect to other atoms/selectors)
	default: {
		initialSheetSettings: {
			// 投薬方法に関する設定
			minConteniousTakingDays: 24,
			maxConteniousTakingDays: 120,
			conteniousBleeingDaysForRest: 3,
			stopTakingDays: 4,
			// シートの管理
			numOfPillsPerSheet: 28,
			beginSheetIndex: 0, // 0スタート
		},
		dailyRecord: [
			{
				date: today,
				tookMedicine: false, // 今日薬を飲んだか
				haveBleeding: false, // 今日出血があったか
				isRestPeriod: false, // 休薬日か
			},
		],
		isAsyncStorageLoaded: false,
	},
});

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RecoilRoot>
				<Stack.Navigator
					screenOptions={{
						// タスク：設定画面はtitleをつける
						title: "",
						headerTransparent: true,
						headerBlurEffect: "systemUltraThinMaterial",
					}}
					initialRouteName='Home'>
					<Stack.Screen
						name='Home'
						component={Home}
						options={({ navigation }) => ({
							headerRight: () => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("Settings");
									}}>
									<SettingIcon />
								</TouchableOpacity>
							),
						})}
					/>
					<Stack.Screen name='Settings' component={Settings} />
					<Stack.Screen
						name='EditWeeklyRecord'
						component={EditWeeklyRecord}
					/>
				</Stack.Navigator>
			</RecoilRoot>
		</NavigationContainer>
	);
}
