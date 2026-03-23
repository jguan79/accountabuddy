import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/signupStyles";
import { useRouter } from "expo-router";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";

export default function Signup() {
    const router = useRouter();

    // --- State for inputs ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // --- Signup handler ---
    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !password) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        try {
            const createUserFn = httpsCallable(functions, "createUser");
            const res = await createUserFn({
                firstName,
                lastName,
                username,
                password,
            });

            if (res.data) {
                console.log("New user created:", res.data);
                Alert.alert("Success", "User created successfully!");
                router.push("/homepage"); // navigate to main page
            } else {
                Alert.alert("Error", "Failed to create user.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            Alert.alert("Error", "Something went wrong while signing up.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
                {/* Logo */}
                <View style={styles.logo}>
                    <Text style={styles.logoText}>Logo</Text>
                </View>

                {/* Welcome Text and App Name*/}
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.appName}>Accountabuddy</Text>
            </View>

            <View style={styles.inputSection}>
                {/* Sign Up Title */}
                <Text style={styles.title}>Sign Up</Text>

                {/* First Name Input */}
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

                {/* Last Name Input */}
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />

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
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Next Button */}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleSignup}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <Text style={styles.signinText}>
                    Already have an account?
                    <Text
                        style={styles.signinText}
                        onPress={() => router.push("/")}
                    >
                        {" "}
                        Sign in
                    </Text>
                </Text>
            </View>
        </View>
    );
}
