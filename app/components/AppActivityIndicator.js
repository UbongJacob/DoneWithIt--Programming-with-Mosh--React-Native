import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function AppActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        autoSize
        loop
        source={require("../assets/animation/loader.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    elevation: 1,
    height: "100%",
    opacity: 0.6,
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
});
export default AppActivityIndicator;
