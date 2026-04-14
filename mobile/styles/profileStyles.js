import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D8EBD4",
        padding: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 30,
    },
    imageContainer: {
        marginBottom: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    placeholderImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#94C88A",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 50,
    },
    uploadButton: {
        backgroundColor: "#66BB6A",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 30,
    },
    uploadText: {
        color: "white",
        fontWeight: "600",
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 14,
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        width: "100%",
        backgroundColor: "#94C88A",
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
        marginBottom: 10,
    },
    updateButton: {
        width: "100%",
        backgroundColor: "#66BB6A",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
    },
    signOutButton: {
        width: "100%",
        backgroundColor: "#66BB6A",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
