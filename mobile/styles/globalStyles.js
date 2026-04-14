import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // ------------------------
    // Containers
    // ------------------------
    container: {
        flex: 1,
        backgroundColor: "#D8EBD4",
        padding: 30,
        justifyContent: "center",
    },

    signup_container: {
        flex: 1,
        backgroundColor: "#D8EBD4",
    },

    // ------------------------
    // Logo styles
    // ------------------------
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#94C88A",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    logoSmall: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#94C88A",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },

    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },

    logoTextSmall: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    // ------------------------
    // Text styles
    // ------------------------
    label: {
        fontSize: 18,
        marginBottom: 8,
        marginTop: 50,
        fontWeight: "bold",
    },

    labelSmall: {
        fontSize: 14,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: "bold",
    },

    buttonText: {
        fontSize: 18,
    },

    checkboxText: {
        fontSize: 14,
    },

    signupText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
    },

    signinText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
    },

    welcomeText: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 5,
    },

    appName: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#94C88A",
        marginBottom: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        paddingTop: 20,
    },

    // ------------------------
    // Inputs
    // ------------------------
    input: {
        backgroundColor: "#94C88A",
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
    },

    // ------------------------
    // Buttons
    // ------------------------
    loginButton: {
        borderColor: "#94C88A",
        backgroundColor: "#D8EBD4",
        borderRadius: 25,
        borderWidth: 3,
        padding: 10,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
        width: "40%",
    },

    nextButton: {
        borderColor: "#94C88A",
        backgroundColor: "#D8EBD4",
        borderRadius: 25,
        borderWidth: 3,
        padding: 10,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 14,
        width: "40%",
    },

    // ------------------------
    // Signup layout
    // ------------------------
    titleSection: {
        backgroundColor: "#E7F0F1",
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: "center",
    },

    inputSection: {
        backgroundColor: "#D8EBD4",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        padding: 30,
    },

    // ------------------------
    // Misc UI elements
    // ------------------------
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#94C88A",
        backgroundColor: "#D8EBD4",
        marginRight: 10,
    },

    divider: {
        height: 1,
        backgroundColor: "#94C88A",
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
    },

    forgotPassword: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 100,
        fontWeight: "bold",
    },
});
