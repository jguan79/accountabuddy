import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { styles } from "../styles/homepageStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "AddFriend">;

export default function AddFriend({ route, navigation }: Props) {
    const currentUser = route.params.user;
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    async function handleSearch() {
        if (!query || query.trim().length === 0) {
            Alert.alert("Enter a username to search");
            return;
        }

        setSearching(true);
        try {
            const fn = httpsCallable(functions, "queryUsers");
            const res = await fn({
                usernamePart: query.trim(),
                currentUserId: currentUser.id,
            });
            setResults(res.data || []);
        } catch (err) {
            console.error("Search failed", err);
            Alert.alert("Error", "Failed to search users.");
        } finally {
            setSearching(false);
        }
    }

    async function handleAddFriend(friend: any) {
        try {
            const fn = httpsCallable(functions, "addFriend");
            await fn({ userId: currentUser.id, friendId: friend.id });
            Alert.alert(
                "Friend added",
                `You are now friends with ${friend.username || friend.firstName}`,
            );
            setResults((prev) =>
                prev.filter((r) => r.id !== friend.id && r._id !== friend.id),
            );
        } catch (err) {
            console.error("Add friend failed", err);
            Alert.alert("Error", "Failed to add friend.");
        }
    }

    function renderItem({ item }: { item: any }) {
        return (
            <View style={styles.resultRow}>
                <View>
                    <Text style={styles.resultName}>
                        {item.firstName || item.username}
                    </Text>
                    <Text style={styles.resultUsername}>@{item.username}</Text>
                </View>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => handleAddFriend(item)}
                >
                    <Text style={styles.addFriendButtonText}>Add</Text>
                </TouchableOpacity>
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

                <Text style={styles.createTitle}>Find a friend</Text>

                <View style={{ width: 30 }} />
            </View>

            <View style={styles.addFriendContent}>
                <Text style={styles.fieldLabel}>
                    Type in the username of the person you are looking for.
                </Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search username"
                    value={query}
                    onChangeText={setQuery}
                    autoCapitalize="none"
                />

                <View style={styles.searchActionsRow}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.modalButtonOutline]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            style={[
                                styles.modalButtonText,
                                styles.modalButtonTextOutline,
                            ]}
                        >
                            Close
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.modalButtonPrimary]}
                        onPress={handleSearch}
                    >
                        <Text
                            style={[
                                styles.modalButtonText,
                                styles.modalButtonTextPrimary,
                            ]}
                        >
                            {searching ? "Searching..." : "Search"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={results}
                keyExtractor={(i) => i.id || i._id || i.username}
                renderItem={renderItem}
                contentContainerStyle={styles.addFriendResults}
                ListEmptyComponent={() => (
                    <View style={styles.emptyResultContainer}>
                        <Text style={styles.emptyResultText}>No results</Text>
                    </View>
                )}
            />
        </View>
    );
}
