import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/signupStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// Type for React Navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">;

export default function Signup() {
    const navigation = useNavigation<NavigationProp>();

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
                // Navigate to homepage with the user object
                navigation.navigate("Homepage", { user: res.data });
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

                <View style={styles.logo}>
                    <Text style={styles.logoText}>Logo</Text>
                </View>

                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.appName}>Accountabuddy</Text>
            </View>

            <View style={styles.inputSection}>

                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />

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

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleSignup}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <Text style={styles.signinText}>
                    Already have an account?
                    <Text
                        style={styles.signinText}
                        onPress={() => navigation.navigate("Index")}
                    >
                        {" "}
                        Sign in
                    </Text>
                </Text>
            </View>
        </View>
    );
}
