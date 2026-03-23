import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Animated, Dimensions } from "react-native";
import { styles } from "../styles/homepageStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Homepage">;

type Task = {
    id: string;
    name: string;
    description?: string;
    dueInDays?: number;
    color?: string;
};

type User = {
    id: string;
    firstName?: string;
    lastName?: string;
    username: string;
};

export default function Homepage({ route, navigation }: Props) {
    const currentUser: User = route.params.user;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarAnim = useRef(new Animated.Value(-260)).current;
    const sidebarWidth = 260;

    useEffect(() => {
        if (!currentUser) {
            navigation.replace("Index");
            return;
        }

        async function fetchData() {
            try {
                const getTasksFn = httpsCallable<{ userId: string }, Task[]>(
                    functions,
                    "getTasks",
                );
                const tasksRes = await getTasksFn({ userId: currentUser.id });
                setTasks(tasksRes.data || []);

                const getFriendsFn = httpsCallable<{ userId: string }, User[]>(
                    functions,
                    "getFriends",
                );
                const friendsRes = await getFriendsFn({
                    userId: currentUser.id,
                });
                setFriends(friendsRes.data || []);
            } catch (err) {
                console.error("Failed to load homepage data:", err);
                // fallback to sample data
                setTasks([
                    {
                        id: "1",
                        name: "Capstone",
                        description: "Finish slides",
                        dueInDays: 5,
                        color: "#FFB6C1",
                    },
                    {
                        id: "2",
                        name: "Compilers",
                        description: "Project 1",
                        dueInDays: 2,
                        color: "#DDA0DD",
                    },
                ]);
                setFriends([
                    { id: "f1", username: "Timmy" },
                    { id: "f2", username: "John" },
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const weekDays = ["Su", "Mon", "T", "W", "Th", "F", "S"];
    const today = new Date();
    const currentDay = today.getDate();

    // build a simple week centered on today
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - 3 + i);
        return d.getDate();
    });

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

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.menuIcon}
                        onPress={openSidebar}
                    >
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>

                    <View style={styles.streakBadge}>
                        <Text style={styles.streak}>☀️</Text>
                        <Text style={styles.streakText}>12</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.bellIcon}
                        onPress={() =>
                            Alert.alert("Notifications", "No new notifications")
                        }
                    >
                        <Text style={styles.bell}>🔔</Text>
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingText}>
                        Welcome {currentUser.username},
                    </Text>
                    <Text style={styles.subGreeting}>
                        What are we accomplishing today?
                    </Text>
                </View>

                {/* Calendar Widget */}
                <View style={styles.calendar}>
                    <View style={styles.weekDaysRow}>
                        {weekDays.map((day, index) => (
                            <Text key={index} style={styles.weekDay}>
                                {day}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.datesRow}>
                        {dates.map((date, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dateCircle,
                                    date === currentDay && styles.currentDate,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        date === currentDay &&
                                            styles.currentDateText,
                                    ]}
                                >
                                    {date}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Tasks Section */}
                <Text style={styles.sectionTitle}>Tasks</Text>

                {tasks.map((task) => (
                    <View
                        key={task.id}
                        style={[
                            styles.taskCard,
                            { backgroundColor: task.color || "#FFF" },
                        ]}
                    >
                        <View style={styles.taskLeft}>
                            <View style={styles.taskCircle} />
                            <View>
                                <Text style={styles.taskName}>{task.name}</Text>
                                {task.description ? (
                                    <Text style={styles.taskDescription}>
                                        {task.description}
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                        <View style={styles.dueBadge}>
                            <Text style={styles.dueText}>
                                Due in {task.dueInDays ?? "-"}{" "}
                            </Text>
                            <Text style={styles.daysText}>days</Text>
                        </View>
                    </View>
                ))}

                {/* Add Task Button */}
                <TouchableOpacity
                    style={styles.addTaskButton}
                    onPress={() =>
                        Alert.alert(
                            "Add Task",
                            "Open add task screen (not implemented)",
                        )
                    }
                >
                    <Text style={styles.addTaskText}>Add Task</Text>
                </TouchableOpacity>

                {/* Friends Section */}
                <Text style={styles.sectionTitle}>
                    View your friends' activities
                </Text>

                {friends.map((friend, index) => (
                    <TouchableOpacity
                        key={friend.id ?? index}
                        style={styles.friendButton}
                        onPress={() => Alert.alert(friend.username)}
                    >
                        <Text style={styles.friendName}>{friend.username}</Text>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 40 }} />
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
                        <Text style={styles.sidebarTitle}>Menu</Text>
                        <TouchableOpacity
                            style={styles.sidebarItem}
                            onPress={() => {
                                closeSidebar();
                                navigation.navigate("Index");
                            }}
                        >
                            <Text>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sidebarItem}
                            onPress={() =>
                                Alert.alert(
                                    "Friends",
                                    "Friends List not implemented",
                                )
                            }
                        >
                            <Text>Friends List</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sidebarItem}
                            onPress={() =>
                                Alert.alert(
                                    "Add Friend",
                                    "Add Friend not implemented",
                                )
                            }
                        >
                            <Text>Add Friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sidebarItem}
                            onPress={() =>
                                Alert.alert(
                                    "Profile",
                                    "Profile not implemented",
                                )
                            }
                        >
                            <Text>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sidebarItem}
                            onPress={() => {
                                closeSidebar();
                                navigation.replace("Index");
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}
