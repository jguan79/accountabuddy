import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Animated,
    Image,
} from "react-native";
import { styles } from "../styles/appStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
type Props = NativeStackScreenProps<RootStackParamList, "FriendsList">;

// ------------------------- API IMPORTS ------------------------- //
import { getFriends } from "@/api/userApi";

// ------------------------- MODELS ------------------------- //
import { Friend } from "@/frontend_models/Friend";
import { profilePlaceholder } from "../assets/images";

// ------------------------- FRIENDS LIST ------------------------- //
export default function FriendsList({ route, navigation }: Props) {
    const currentUser = route.params.user;
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
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

    async function fetchFriends() {
        setLoading(true);
        try {
            const response = await getFriends(currentUser.id);
            setFriends(response || []);
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

    function renderItem({ item }: { item: Friend }) {
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
                <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
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
                    keyExtractor={(i) => i.userId}
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
