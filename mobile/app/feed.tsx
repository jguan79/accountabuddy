import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    ScrollView,
    TextInput,
    Modal,
} from "react-native";
import { styles } from "../styles/appStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

// ------------------------- ASSETS ------------------------- //
import { profilePlaceholder } from "../assets/images";

// ------------------------- API IMPORTS ------------------------- //
import { getFriends, getUserById } from "@/api/userApi";
import { getTasks } from "@/api/taskApi";
import { getCommentsForTask, addComment } from "@/api/commentApi";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

type FeedItem = {
    user: any;
    task: any;
};

export default function Feed({ route, navigation }: Props) {
    const currentUser = route.params.user;

    const [feedData, setFeedData] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);

    // ---------------- COMMENTS ---------------- //
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [commentText, setCommentText] = useState("");

    // ---------------- SIDEBAR ---------------- //
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarAnim = useRef(new Animated.Value(-260)).current;
    const sidebarWidth = 260;

    // ---------------- LOAD FEED ---------------- //
    useEffect(() => {
        loadFeed();
    }, []);

    async function loadFeed() {
        try {
            setLoading(true);

            const friends = await getFriends(currentUser.id);

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

            setFeedData(friendData.flat());
        } catch (err) {
            console.error("Feed load error:", err);
        } finally {
            setLoading(false);
        }
    }

    // ---------------- OPEN COMMENTS ---------------- //
    async function openComments(task: any) {
        setSelectedTask(task);
        setCommentsOpen(true);

        try {
            const data = await getCommentsForTask(task.id);

            const commentsWithUsers = await Promise.all(
                data.map(async (comment: any) => {
                    const user = await getUserById(comment.userId);

                    return {
                        ...comment,
                        user,
                    };
                }),
            );

            setComments(commentsWithUsers);
        } catch (err) {
            console.error("Error loading comments:", err);
        }
    }

    function closeComments() {
        setCommentsOpen(false);
        setSelectedTask(null);
        setComments([]);
        setCommentText("");
    }

    // ---------------- ADD COMMENT ---------------- //
    async function handleAddComment() {
        if (!selectedTask || commentText.trim().length === 0) return;

        try {
            const newComment = await addComment(
                selectedTask.id,
                currentUser.id,
                commentText,
            );

            setComments((prev) => [...prev, newComment]);
            setCommentText("");
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    }

    // ---------------- SIDEBAR ---------------- //
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
                    <Text style={styles.feedLoadingText}>Loading feed...</Text>
                ) : (
                    feedData.map((activity, index) => (
                        <View key={index} style={{ marginTop: 10 }}>
                            {/* USER HEADER */}
                            <View style={styles.feedUserRow}>
                                <Image
                                    source={profilePlaceholder}
                                    style={styles.feedAvatar}
                                />

                                <View>
                                    <Text style={styles.feedUserName}>
                                        {activity.user.firstName}{" "}
                                        {activity.user.lastName}
                                    </Text>

                                    <Text style={styles.feedUserHandle}>
                                        @{activity.user.username}
                                    </Text>
                                </View>
                            </View>

                            {/* TASK CARD */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => openComments(activity.task)}
                            >
                                <View style={styles.taskCard}>
                                    <View style={styles.taskLeft}>
                                        <View
                                            style={[
                                                styles.taskCircle,
                                                {
                                                    backgroundColor:
                                                        activity.task.color ||
                                                        "#66BB6A",
                                                },
                                            ]}
                                        />
                                        <View>
                                            <Text style={styles.taskName}>
                                                {activity.task.subjectTitle ||
                                                    activity.task.title ||
                                                    activity.task.name ||
                                                    "Untitled"}
                                            </Text>
                                            <Text
                                                style={styles.taskDescription}
                                            >
                                                {activity.task.description}
                                            </Text>

                                            <Text style={styles.feedHintText}>
                                                Tap to view comments
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* ---------------- COMMENTS MODAL ---------------- */}
            <Modal visible={commentsOpen} animationType="slide">
                <View style={styles.overallCommentsContainer}>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                        Comments
                    </Text>

                    {/* Comments List */}
                    <ScrollView style={{ marginTop: 20 }}>
                        {comments.map((comment, index) => (
                            <View key={index} style={{ marginBottom: 12 }}>
                                <View style={styles.commentContainer}>
                                    <View style={styles.commentTopRow}>
                                        <View style={styles.commentUserRow}>
                                            <Image
                                                source={profilePlaceholder}
                                                style={styles.commentAvatar}
                                            />
                                            <View>
                                                <Text
                                                    style={styles.commentName}
                                                >
                                                    {comment.user?.firstName}{" "}
                                                    {comment.user?.lastName}
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.commentUsername
                                                    }
                                                >
                                                    @{comment.user?.username}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={styles.commentDate}>
                                            {new Date(
                                                comment.createdAt,
                                            ).toLocaleDateString()}
                                        </Text>
                                    </View>

                                    <Text style={styles.commentText}>
                                        {comment.text}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <TextInput
                        placeholder="Write a comment..."
                        value={commentText}
                        onChangeText={setCommentText}
                        style={styles.commentInput}
                    />

                    <TouchableOpacity
                        onPress={handleAddComment}
                        style={styles.commentPostButton}
                    >
                        <Text style={styles.commentPostText}>Post Comment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={closeComments}
                        style={styles.commentCloseButton}
                    >
                        <Text style={styles.commentCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
