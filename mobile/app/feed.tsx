import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    ScrollView,
} from "react-native";
import { styles } from "../styles/appStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

// ------------------------- ASSETS ------------------------- //
import { profilePlaceholder } from "../assets/images";

// ------------------------- API ------------------------- //
import { getFriends, getUserById } from "@/api/userApi";
import { getTasks } from "@/api/taskApi";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

type FeedItem = {
    user: any;
    task: any;
};

export default function Feed({ route, navigation }: Props) {
    const currentUser = route.params.user;

    const [feedData, setFeedData] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarAnim = useRef(new Animated.Value(-260)).current;
    const sidebarWidth = 260;

    // ------------------------- LOAD FEED ------------------------- //
    useEffect(() => {
        loadFeed();
    }, []);

    async function loadFeed() {
        try {
            setLoading(true);

            // 1. get friends
            const friends = await getFriends(currentUser.id);

            // 2. for each friend, fetch user + tasks
            const friendData = await Promise.all(
                friends.map(async (friend) => {
                    const user = await getUserById(friend.userId);
                    const tasks = await getTasks(friend.userId);

                    return tasks.map((task) => ({
                        user,
                        task,
                    }));
                }),
            );

            // 3. flatten array
            const flatFeed = friendData.flat();

            setFeedData(flatFeed);
        } catch (err) {
            console.error("Feed load error:", err);
        } finally {
            setLoading(false);
        }
    }

    // ------------------------- SIDEBAR ------------------------- //
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
        }).start(() => setSidebarOpen(false));
    }

    return (
        <View style={styles.screenContainer}>
            {/* TOP BAR */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </TouchableOpacity>

                <Text style={styles.createTitle}>Feed</Text>
                <View style={{ width: 30 }} />
            </View>

            {/* FEED */}
            <ScrollView>
                {loading ? (
                    <Text style={{ padding: 20 }}>Loading feed...</Text>
                ) : (
                    feedData.map((item, index) => (
                        <View key={index} style={{ marginTop: 10 }}>
                            {/* USER HEADER */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                }}
                            >
                                <Image
                                    source={profilePlaceholder}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        marginRight: 10,
                                    }}
                                />

                                <View>
                                    <Text style={{ fontWeight: "700" }}>
                                        {item.user.firstName}{" "}
                                        {item.user.lastName}
                                    </Text>
                                    <Text
                                        style={{ color: "gray", fontSize: 12 }}
                                    >
                                        @{item.user.username}
                                    </Text>
                                </View>
                            </View>

                            {/* TASK CARD */}
                            <View style={styles.taskCard}>
                                <View style={styles.taskLeft}>
                                    <View
                                        style={[
                                            styles.taskCircle,
                                            {
                                                backgroundColor:
                                                    item.task.color ||
                                                    "#66BB6A",
                                            },
                                        ]}
                                    />
                                    <View>
                                        <Text style={styles.taskName}>
                                            {item.task.subjectTitle ||
                                                item.task.name ||
                                                item.task.title ||
                                                "Untitled"}
                                        </Text>
                                        <Text style={styles.taskDescription}>
                                            {item.task.description}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

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
                                    navigation.navigate("Feed", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>Feed</Text>
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
