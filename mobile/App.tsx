import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Index from "./app/index";
import Homepage from "./app/homepage";
import Feed from "./app/feed";
import Signup from "./app/signup";
import AddFriend from "./app/addFriend";
import FriendsList from "./app/friendsList";
import Profile from "./app/profile";

export type RootStackParamList = {
    Index: undefined;
    Homepage: { user: any; openSidebar?: boolean };
    Feed: { user: any };
    Signup: undefined;
    AddFriend: { user: any };
    FriendsList: { user: any };
    Profile: { user: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
        >
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Index"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Index" component={Index} />
                    <Stack.Screen name="Homepage" component={Homepage} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Feed" component={Feed} />
                    <Stack.Screen name="AddFriend" component={AddFriend} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="FriendsList" component={FriendsList} />
                </Stack.Navigator>
            </NavigationContainer>
        </TouchableWithoutFeedback>
    );
}
