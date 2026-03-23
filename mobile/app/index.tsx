import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/indexStyles";
import { useRouter } from "expo-router";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";

export default function Index() {
    console.log("Index page loaded");
    const router = useRouter();

    // --- State for inputs ---
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // --- Login handler ---
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        try {
            // Call your loginUser cloud function
            const loginUserFn = httpsCallable(functions, "loginUser");
            const res = await loginUserFn({ username, password });

            if (res.data) {
                console.log("Logged in user:", res.data);
                // Navigate to homepage
                router.push("/homepage");
            } else {
                Alert.alert("Login Failed", "Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Something went wrong while logging in.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logo}>
                <Text style={styles.logoText}>Logo</Text>
            </View>

            {/* Username Input */}
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            {/* Password Input */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            {/* Save Password Checkbox */}
            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxText}>Save password</Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <Text style={styles.forgotPassword}>
                Forgot Username or Password?
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sign Up Link */}
            <Text style={styles.signupText}>
                Don't have an account?
                <Text
                    style={styles.signupText}
                    onPress={() => router.push("/signup")}
                >
                    {" "}
                    Sign up
                </Text>
            </Text>
        </View>
    );
}
