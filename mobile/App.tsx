import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./app/index";
import Homepage from "./app/homepage";
import Signup from "./app/signup";

export type RootStackParamList = {
    Index: undefined;
    Homepage: { user: any };
    Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Index"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
