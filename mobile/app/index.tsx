import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/globalStyles";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { loginUser } from "../api/userApi";

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
            const user = await loginUser(username, password);

            if (!user) {
                Alert.alert("Login Failed", "Invalid username or password.");
                return;
            }

            console.log("Logged in user:", user);
            navigation.navigate("Homepage", { user });
        } catch (error) {
            console.log("Logged error:", error);
            Alert.alert("Error", "Something went wrong when logging in.");
        }
    };

    return (
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
    );
}
