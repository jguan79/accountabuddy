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

type Props = NativeStackScreenProps<RootStackParamList, "FriendsList">;

export default function FriendsList({ route, navigation }: Props) {
    const currentUser = route.params.user;
    const [friends, setFriends] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchFriends() {
        setLoading(true);
        try {
            const fn = httpsCallable(functions, "getFriends");
            const res = await fn({ userId: currentUser.id });
            setFriends(res.data || []);
        } catch (err) {
            console.error("Failed to fetch friends", err);
            Alert.alert("Error", "Could not load friends.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, []);

    function renderItem({ item }: { item: any }) {
        return (
            <View style={styles.resultRow}>
                <View>
                    <Text style={styles.resultName}>{item.username}</Text>
                </View>
                {/* Optional: Add a button to remove friend later */}
                {/* <TouchableOpacity style={styles.removeFriendButton}>
                    <Text style={styles.removeFriendButtonText}>Remove</Text>
                </TouchableOpacity> */}
            </View>
        );
    }

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

                <Text style={styles.createTitle}>My Friends</Text>
                <View style={{ width: 30 }} />
            </View>

            {loading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(i) => i.userId || i.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.addFriendResults}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyResultContainer}>
                            <Text style={styles.emptyResultText}>
                                You have no friends yet.
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
