import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Home/HomeScreen";
import { screenOptions } from "../styles";
import DetailsScreen from "../Details/DetailsScreen";

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Characters" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({
            route: {
              params: {
                character: { name },
              },
            },
          }: {
            route: any;
          }) => ({
            title: ` ${name}`,
            gestureResponseDistance: { horizontal: 500 },
          })}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
