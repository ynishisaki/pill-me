import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import { RootStackParamList, ScreenNavigationProp } from "~/types";
import React from "react";

// interface ScreenLayoutProps {
// 	navigationProps: ScreenNavigationProp;
// 	navigationType: keyof RootStackParamList;
// 	children: React.ReactNode;
// }

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/bgimage3.png")} resizeMode='cover' style={styles.bgimage}>
				<StatusBar
					barStyle='light-content'
					// backgroundColor='#323FA4'
				/>
				<View style={styles.contentsLayout}>{children}</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		flex: 1,
	},
	contentsLayout: {
		flex: 1,
		marginBottom: 16,
		marginHorizontal: 16,
		alignItems: "center",
		flexDirection: "column",
	},
});
