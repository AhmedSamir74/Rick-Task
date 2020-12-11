import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../constants/main";

export default StyleSheet.create({
  centered: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: Dimensions.get("screen").width,
    height: 200,
    marginBottom: 10,
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
  header: {
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
    marginVertical: 15,
    color: theme.colors.primary,
  },
  titleCont: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.black,
    marginBottom: 5,
  },
  subTitle: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.black,
  },
  subTitleDesc: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.darkGrey,
    marginTop: 5,
    borderLeftWidth: 1,
    borderColor: theme.colors.lightGrey,
    paddingLeft: 10,
  },
});
