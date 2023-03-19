import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { Layout } from "~/templates/layout";

import { ScreenNavigationProp } from "~/types";
import { Settings } from "~/organisms/Settings";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='InitialSettings'>
			<Settings />
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// width: 330,
		// marginBottom: 24,
		// backgroundColor: "#000",
		borderRadius: 16,
	},
});