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
import { createUser } from "@/api/userApi";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">;

// ------------------------- SIGNUP PAGE ------------------------- //
export default function Signup() {
    const navigation = useNavigation<NavigationProp>();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !password) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        try {
            const user = await createUser({
                firstName,
                lastName,
                username,
                password,
            });

            if (!user) {
                Alert.alert("Signup failed.", "Couldn't create your account.");
                return;
            }

            console.log("New user created:", user);
            Alert.alert("Success", "User created successfully!");
            navigation.navigate("Homepage", { user });
        } catch (error) {
            console.error("Signup error:", error);
            Alert.alert("Error", "Something went wrong while signing up.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleSection}>
                <View style={styles.logoSmall}>
                    <Text style={styles.logoTextSmall}>Logo</Text>
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

                <Text
                    style={styles.signText}
                    onPress={() => navigation.navigate("Index")}
                >
                    Already have an account? Sign in
                </Text>
            </View>
        </ScrollView>
    );
}
