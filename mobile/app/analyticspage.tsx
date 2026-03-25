import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { styles } from "../styles/homepageStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "AnalyticsPage">;

export default function AnalyticsPage({ route, navigation }: Props) {
    const currentUser = route.params.user;

    return (
        <View style={styles.modalFullScreen}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() =>
                        navigation.navigate("Homepage", {
                            user: currentUser,
                            openSidebar: true,
                        })
                    }
                >
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </TouchableOpacity>

                <Text style={styles.createTitle}>Analytics</Text>
                <View style={{ width: 30 }} />
            </View>
        </View>
    );
}
