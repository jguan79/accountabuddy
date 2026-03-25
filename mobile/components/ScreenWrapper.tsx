// components/ScreenWrapper.tsx

// This wrapper allows for users to tap anywhere not in an input field to collapse the keyboard
// Also pushes up input fields to be viewable when keyboard is on screen
import React from "react";
import { KeyboardAvoidingView, Platform, Pressable, Keyboard, StyleSheet } from "react-native";

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {children}
            </KeyboardAvoidingView>
        </Pressable>
    );
}