// ------------------------- IMPORTS ------------------------- //
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { styles } from "../styles/globalStyles";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// ------------------------- API IMPORTS ------------------------- //
import { loginUser } from "../api/userApi";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Index">;

// ------------------------- LOGIN PAGE ------------------------- //
export default function Index() {
    const navigation = useNavigation<NavigationProp>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert(
                "Missing info",
                "Please enter both username and password.",
            );
            return;
        }

        try {
            const user = await loginUser(username, password);

            if (!user) {
                Alert.alert("Login Failed", "Incorrect username or password.");
                return;
            }

            console.log("Logged in user:", user);
            navigation.navigate("Homepage", { user });
        } catch (error) {
            console.log("Logged error:", error);
            Alert.alert("Error", "Couldn't log you in. Try again.");
        }
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#EAF4E6" }}
            bounces={false}
        >
            <View style={styles.heroSection}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>Logo</Text>
                </View>
                <Text style={styles.appName}>Accountabuddy</Text>
                <Text style={styles.welcomeText}>
                    Build better habits with friends
                </Text>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholder="Enter your username"
                    placeholderTextColor="#9DBF99"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9DBF99"
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text
                    style={styles.signText}
                    onPress={() => navigation.navigate("Signup")}
                >
                    Don't have an account? Sign up
                </Text>
            </View>
        </ScrollView>
    );
}
