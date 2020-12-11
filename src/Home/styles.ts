import { StyleSheet } from "react-native";
import { theme } from "../constants/main";

export default StyleSheet.create({
  homeCont: {
    flex: 1,
  },
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
  textInptCont: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.lightGrey,
    margin: 10,
    padding: 5,
    flexDirection: "row",
    paddingEnd: 10,
  },
  searchInpt: {
    flex: 1,
  },
});
