import { StyleSheet } from "react-native";

const COLORS = {
    primary: "#6BAE62",
    background: "#EAF4E6",
    card: "#F2F8F1",
    border: "#C8E0C4",
    textDark: "#1E3A1A",
};

export const styles = StyleSheet.create({
    /* Container */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    heroSection: {
        paddingTop: 80,
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 36,
        paddingBottom: 55,
        borderBottomLeftRadius: 36,
    },

    logo: {
        justifyContent: "center",
        width: 88,
        marginBottom: 14,
        alignItems: "center",
        height: 88,
        borderRadius: 44,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(255,255,255,0.25)",
    },

    logoSmall: {
        marginBottom: 10,
        justifyContent: "center",
        height: 70,
        width: 70,
        alignItems: "center",
        borderRadius: 35,
        borderWidth: 2,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderColor: "rgba(255,255,255,0.5)",
    },

    logoText: {
        fontSize: 18,
        color: "white",
        fontWeight: "700",
    },

    logoTextSmall: {
        fontSize: 13,
        color: "white",
        fontWeight: "700",
    },

    appName: {
        fontSize: 34,
        color: "white",
        fontWeight: "800",
        marginBottom: 6,
    },

    welcomeText: {
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
    },

    title: {
        fontSize: 25,
        color: COLORS.textDark,
        marginBottom: 8,
        fontWeight: "700",
        paddingTop: 18,
    },

    label: {
        fontSize: 13,
        color: "#3D6B37",
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 18,
        textTransform: "uppercase",
    },

    buttonText: {
        fontSize: 15,
        fontWeight: "700",
        color: "white",
    },

    forgotPassword: {
        fontSize: 13,
        textAlign: "center",
        marginTop: 12,
        fontWeight: "600",
        color: COLORS.primary,
    },

    formCard: {
        marginHorizontal: 20,
        backgroundColor: "white",
        padding: 24,
        borderRadius: 24,
        marginTop: -26,
        elevation: 6,
    },

    input: {
        paddingHorizontal: 16,
        backgroundColor: COLORS.card,
        fontSize: 15,
        borderRadius: 12,
        color: COLORS.textDark,
        paddingVertical: 12,
        borderColor: COLORS.border,
        borderWidth: 1,
    },

    loginButton: {
        marginTop: 24,
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 14,
        elevation: 5,
    },

    nextButton: {
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: COLORS.primary,
        width: "55%",
        paddingVertical: 13,
        borderRadius: 14,
        alignItems: "center",
        marginBottom: 12,
    },

    titleSection: {
        paddingTop: 55,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        paddingBottom: 45,
        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },

    inputSection: {
        marginHorizontal: 20,
        padding: 24,
        backgroundColor: "white",
        borderRadius: 24,
        marginTop: -22,
    },

    signText: {
        textAlign: "center",
        fontSize: 14,
        color: "#4A7244",
        fontWeight: "600",
        marginTop: 10,
    },

    divider: {
        height: 1,
        marginVertical: 18,
        backgroundColor: COLORS.border,
        width: "100%",
    },
});
