import { StyleSheet } from "react-native";
import { theme } from "./constants/main";

export const PINK = "#ff5dc8";

export const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: "#fff",
};

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    marginEnd: 10,
  },
  header: {
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  subheader: {
    paddingTop: 10,
  },
});
