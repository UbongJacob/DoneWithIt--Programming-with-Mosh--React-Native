import React from "react";
import { StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";

import colors from "../config/colors";
import AppText from "./AppText";

function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    elevation: 1,
    justifyContent: "center",
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default OfflineNotice;
