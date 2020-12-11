import React from "react";
import { View, ActivityIndicator } from "react-native";
import { theme } from "./constants/main";

import styles from "./styles";

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);
