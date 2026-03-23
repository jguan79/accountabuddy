import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../styles/homepageStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";

// Define types (optional but helpful)
type Task = {
    id: string;
    name: string;
    description: string;
    dueInDays: number;
    color: string;
};
type User = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
};

export default function Home({ route }: any) {
    const router = useRouter();

    // --- State ---
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // --- Fetch user info, tasks, friends ---
    useEffect(() => {
        async function fetchData() {
            try {
                const currentUser: User = route?.params?.user;
                if (!currentUser) {
                    router.push("/");
                    return;
                }
                setUser(currentUser);

                // Fetch tasks
                const getTasksFn = httpsCallable<{ userId: string }, Task[]>(
                    functions,
                    "getTasks",
                );
                const tasksRes = await getTasksFn({ userId: currentUser.id });
                setTasks(tasksRes.data || []);

                // Fetch friends
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
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => router.push("/")}
                >
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </TouchableOpacity>

                <View style={styles.streakBadge}>
                    <Text style={styles.streak}>☀️</Text>
                    <Text style={styles.streakText}>12</Text>
                </View>

                <TouchableOpacity style={styles.bellIcon}>
                    <Text style={styles.bell}>🔔</Text>
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            {/* Greeting */}
            <View style={styles.greetingSection}>
                <Text style={styles.greetingText}>
                    Welcome {user?.username},
                </Text>
                <Text style={styles.subGreeting}>
                    What are we accomplishing today?
                </Text>
            </View>

            {/* Tasks Section */}
            <Text style={styles.sectionTitle}>Tasks</Text>
            {tasks.map((task) => (
                <View
                    key={task.id}
                    style={[styles.taskCard, { backgroundColor: task.color }]}
                >
                    <View style={styles.taskLeft}>
                        <View style={styles.taskCircle} />
                        <View>
                            <Text style={styles.taskName}>{task.name}</Text>
                            <Text style={styles.taskDescription}>
                                {task.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.dueBadge}>
                        <Text style={styles.dueText}>
                            Due in {task.dueInDays}
                        </Text>
                        <Text style={styles.daysText}>days</Text>
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.addTaskButton}>
                <Text style={styles.addTaskText}>Add Task</Text>
            </TouchableOpacity>

            {/* Friends Section */}
            <Text style={styles.sectionTitle}>
                View your friends' activities
            </Text>
            {friends.map((friend) => (
                <TouchableOpacity key={friend.id} style={styles.friendButton}>
                    <Text style={styles.friendName}>{friend.username}</Text>
                </TouchableOpacity>
            ))}

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}
