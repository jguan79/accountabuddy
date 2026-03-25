import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/indexStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import ScreenWrapper from "../components/ScreenWrapper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Index">;

export default function Index() {
    const navigation = useNavigation<NavigationProp>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        try {
            const loginUserFn = httpsCallable(functions, "loginUser");
            const res = await loginUserFn({ username, password });

            if (res.data) {
                console.log("Logged in user:", res.data);
                navigation.navigate("Homepage", { user: res.data }); // pass object directly
            } else {
                Alert.alert("Login Failed", "Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Something went wrong while logging in.");
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>Logo</Text>
                </View>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate("Signup")}
                >
                    Don't have an account? Sign up
                </Text>
            </View>
        </ScreenWrapper>
    );
}
