import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    Animated,
    Image,
} from "react-native";
import { styles } from "../styles/appStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "AddFriend">;

// ------------------------- API IMPORTS ------------------------- //
import { queryUsers, addFriend } from "@/api/userApi";

// ------------------------- MODELS ------------------------- //
import { profilePlaceholder } from "../assets/images";

// ------------------------- ADD A FRIEND------------------------- //
export default function AddFriend({ route, navigation }: Props) {
    const currentUser = route.params.user;
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarAnim = useRef(new Animated.Value(-260)).current;
    const sidebarWidth = 260;

    // ------------------------- SIDEBAR HANDLERS ------------------------- //
    function openSidebar() {
        setSidebarOpen(true);

        Animated.timing(sidebarAnim, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }

    function closeSidebar() {
        Animated.timing(sidebarAnim, {
            toValue: -sidebarWidth,
            duration: 180,
            useNativeDriver: true,
        }).start(() => {
            setSidebarOpen(false);
        });
    }

    async function handleSearch() {
        if (!query || query.trim().length === 0) {
            Alert.alert("Enter a username to search");
            return;
        }

        setSearching(true);
        try {
            const res = await queryUsers(query.trim(), currentUser.id);
            setResults(res || []);
        } catch (err) {
            console.error("Search failed", err);
            Alert.alert("Error", "Failed to search users.");
        } finally {
            setSearching(false);
        }
    }

    async function handleAddFriend(friend: any) {
        try {
            await addFriend(currentUser.id, friend.id);
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
                <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
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

            {sidebarOpen ? (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.overlay}
                    onPress={closeSidebar}
                >
                    <Animated.View
                        style={[
                            styles.sidebarContainer,
                            { transform: [{ translateX: sidebarAnim }] },
                        ]}
                    >
                        <View style={styles.sidebarHeader}>
                            <Image
                                source={profilePlaceholder}
                                style={styles.sidebarAvatar}
                            />
                            <View style={styles.sidebarHeaderText}>
                                <Text style={styles.sidebarUsername}>
                                    {currentUser.firstName ||
                                        currentUser.username}
                                </Text>
                                <Text style={styles.sidebarSubtitle}>
                                    @{currentUser.username}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.sidebarMenu}>
                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("Homepage", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("FriendsList", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>
                                    Friends
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("AddFriend", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>
                                    Add Friend
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("Profile", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>
                                    Profile
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sidebarFooter}>
                            <TouchableOpacity
                                style={styles.sidebarLogoutButton}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.replace("Index");
                                }}
                            >
                                <Text style={styles.sidebarLogoutText}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}
