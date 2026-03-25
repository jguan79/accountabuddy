import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable, View, Keyboard } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Index from "./app/index";
import Homepage from "./app/homepage";
import Signup from "./app/signup";
import AddFriend from "./app/addFriend";
import FriendsList from "./app/friendsList";
import AnalyticsPage from "./app/analyticspage";

export type RootStackParamList = {
    Index: undefined;
    Homepage: { user: any; openSidebar?: boolean };
    Signup: undefined;
    AddFriend: { user: any };
    FriendsList: { user: any };
    AnalyticsPage: { user: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Index"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Index" component={Index} />
                    <Stack.Screen name="Homepage" component={Homepage} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="AddFriend" component={AddFriend} />

                    {/* FriendsList screen */}
                    <Stack.Screen name="FriendsList" component={FriendsList} />
                    <Stack.Screen name="AnalyticsPage" component={AnalyticsPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </Pressable>
    );
}
