import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";

function AppGradient({ children }) {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={[
        colors.gradientColor1,
        colors.gradientColor2,
        colors.light,
        colors.gradientColor2,
        colors.gradientColor1,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default AppGradient;
