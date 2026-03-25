import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from "react-native";
import { Animated, Dimensions } from "react-native";
import { styles, taskCardBackground } from "../styles/homepageStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import ScreenWrapper from "../components/ScreenWrapper";

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
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDueInDays, setNewDueInDays] = useState<string>("");
    const [newColor, setNewColor] = useState("#FFD27F");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDueInDays, setEditDueInDays] = useState<string>("");
    const [editColor, setEditColor] = useState("#FFD27F");
    const [editStatus, setEditStatus] = useState<
        "in progress" | "overdue" | "completed"
    >("in progress");

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

        // if navigated here with openSidebar flag, open it
        if ((route.params as any)?.openSidebar) {
            // small timeout to ensure layout/anim values initialized
            setTimeout(() => openSidebar(), 80);
        }
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

    async function handleDeleteTask() {
        if (!editingTask) return;

        try {
            const deleteTaskFn = httpsCallable(functions, "deleteTask");
            await deleteTaskFn({
                userId: currentUser.id,
                taskId: editingTask.id,
            });

            setTasks((prev) =>
                prev.filter(
                    (t: any) =>
                        t.id !== editingTask.id && t._id !== editingTask.id,
                ),
            );
            setEditModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error("Delete task failed", err);
            Alert.alert("Error", "Failed to delete task.");
        }
    }

    function closeSidebar() {
        Animated.timing(sidebarAnim, {
            toValue: -sidebarWidth,
            duration: 180,
            useNativeDriver: true,
        }).start(() => setSidebarOpen(false));
    }

    async function handleCreateTask() {
        if (!newTitle) {
            Alert.alert("Validation", "Please enter a task title.");
            return;
        }

        // compute dueDate from days if provided
        const days = parseInt(newDueInDays || "0", 10);
        const due = new Date();
        due.setDate(due.getDate() + (isNaN(days) ? 0 : days));
        const dueDate = due.toISOString();

        try {
            const createTaskFn = httpsCallable(functions, "createTask");
            const res = await createTaskFn({
                subjectTitle: newTitle,
                description: newDescription,
                dueDate,
                color: newColor,
                userId: currentUser.id,
            });

            const created = res.data;
            // Prepend to tasks list
            setTasks((prev) => [created, ...prev]);
            setAddModalOpen(false);
            // reset form
            setNewTitle("");
            setNewDescription("");
            setNewDueInDays("");
            setNewColor("#FFD27F");
        } catch (err) {
            console.error("Create task failed", err);
            Alert.alert("Error", "Failed to create task.");
        }
    }

    function computeDueInDaysFromISO(iso?: string) {
        if (!iso) return undefined;
        const due = new Date(iso);
        const today = new Date();
        due.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffMs = due.getTime() - today.getTime();
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil(diffMs / msPerDay);
    }

    async function handleUpdateTask() {
        if (!editingTask) return;

        const days = parseInt(editDueInDays || "0", 10);
        const due = new Date();
        due.setDate(due.getDate() + (isNaN(days) ? 0 : days));
        const dueDate = due.toISOString();

        try {
            const updateTaskFn = httpsCallable(functions, "updateTask");
            const res = await updateTaskFn({
                userId: currentUser.id,
                taskId: editingTask.id,
                updates: {
                    subjectTitle: editTitle,
                    description: editDescription,
                    dueDate,
                    color: editColor,
                    status: editStatus,
                },
            });

            const updated = res.data || {};

            if (editStatus === "completed" || editStatus === "overdue") {
                // remove completed tasks from the list
                setTasks((prev) =>
                    prev.filter(
                        (t: any) =>
                            !(
                                t.id === updated.id ||
                                t._id === updated.id ||
                                t.id === editingTask.id
                            ),
                    ),
                );
            } else {
                setTasks((prev) =>
                    prev.map((t: any) => {
                        if (
                            t.id === updated.id ||
                            t._id === updated.id ||
                            t.id === editingTask.id
                        ) {
                            return { ...t, ...updated };
                        }
                        return t;
                    }),
                );
            }

            setEditModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error("Update task failed", err);
            Alert.alert("Error", "Failed to update task.");
        }
    }

    const displayTasks = useMemo(() => {
        // normalize shape and compute dueInDays
        const normalized = tasks.map((t: any) => {
            const id = t.id || t._id || String(Math.random()).slice(2);
            const name = t.subjectTitle || t.name || t.title || "Untitled";
            const description = t.description || t.desc || "";
            const color = t.color || t.col || "#FFFFFF";
            const dueDate = t.dueDate || t.due || t.due_date;
            const dueInDays = computeDueInDaysFromISO(dueDate);
            return { ...t, id, name, description, color, dueDate, dueInDays };
        });

        // sort: tasks with due date first (smaller days first), then without due date
        normalized.sort((a: any, b: any) => {
            const aDays =
                typeof a.dueInDays === "number"
                    ? a.dueInDays
                    : Number.POSITIVE_INFINITY;
            const bDays =
                typeof b.dueInDays === "number"
                    ? b.dueInDays
                    : Number.POSITIVE_INFINITY;
            return aDays - bDays;
        });

        return normalized;
    }, [tasks]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.pageRoot}>
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
                        Welcome {currentUser.firstName || currentUser.username},
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

                {displayTasks.map((task: any) => (
                    <TouchableOpacity
                        key={task.id}
                        onPress={() => {
                            setEditingTask(task);
                            setEditTitle(task.name || "");
                            setEditDescription(task.description || "");
                            setEditDueInDays(
                                typeof task.dueInDays === "number"
                                    ? String(task.dueInDays)
                                    : "",
                            );
                            setEditColor(task.color || "#FFD27F");
                            setEditStatus(task.status || "in progress");
                            setEditModalOpen(true);
                        }}
                    >
                        <View
                            style={[
                                styles.taskCard,
                                taskCardBackground(task.color),
                            ]}
                        >
                            <View style={styles.taskLeft}>
                                <View style={styles.taskCircle} />
                                <View>
                                    <Text style={styles.taskName}>
                                        {task.name}
                                    </Text>
                                    {task.description ? (
                                        <Text style={styles.taskDescription}>
                                            {task.description}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                            <View style={styles.dueBadge}>
                                <Text style={styles.dueText}>
                                    Due in{" "}
                                    {typeof task.dueInDays === "number"
                                        ? task.dueInDays
                                        : "-"}{" "}
                                </Text>
                                <Text style={styles.daysText}>days</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Add Task Button */}
                <TouchableOpacity
                    style={styles.addTaskButton}
                    onPress={() => setAddModalOpen(true)}
                >
                    <Text style={styles.addTaskText}>Add Task</Text>
                </TouchableOpacity>

                <View style={styles.spacer40} />
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
                            <View style={styles.sidebarAvatar} />
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

                        {/* Everything below this view is a sidebar nav link*/}
                        <View style={styles.sidebarMenu}>
                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("Index");
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
                                onPress={() =>
                                    Alert.alert(
                                        "Profile",
                                        "Profile not implemented",
                                    )
                                }
                            >
                                <Text style={styles.sidebarItemText}>
                                    Profile
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sidebarItem}
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("AnalyticsPage", {
                                        user: currentUser,
                                    });
                                }}
                            >
                                <Text style={styles.sidebarItemText}>
                                    Analytics
                                </Text>
                            </TouchableOpacity>

                        </View>
                        {/* Everything above this view is a sidebar nav link*/}

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
            {/* Add Task Modal */}
            <Modal visible={addModalOpen} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Add Task</Text>
                        <Text style={styles.fieldLabel}>Subject Title</Text>
                        <TextInput
                            style={styles.pillInput}
                            placeholder="e.g. Math, Compilers"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />

                        <Text style={styles.fieldLabel}>
                            Description (optional)
                        </Text>
                        <TextInput
                            style={[styles.pillInput, styles.largeInput]}
                            placeholder="Add notes or steps..."
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            value={newDescription}
                            onChangeText={setNewDescription}
                            multiline
                        />

                        <Text style={styles.fieldLabel}>Due in (days)</Text>
                        <TextInput
                            style={styles.pillInput}
                            placeholder="e.g. 3"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            value={newDueInDays}
                            onChangeText={setNewDueInDays}
                            keyboardType="numeric"
                        />

                        <Text style={styles.fieldLabel}>Color</Text>
                        <View style={styles.colorRow}>
                            {[
                                "#ffffff",
                                "#000000",
                                "#bfbfbf",
                                "#FFD27F",
                                "#FFA07A",
                                "#7BD389",
                                "#66BB6A",
                            ].map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[
                                        styles.colorDot,
                                        { backgroundColor: c },
                                        newColor === c
                                            ? styles.colorDotSelected
                                            : null,
                                    ]}
                                    onPress={() => setNewColor(c)}
                                />
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.modalButtonOutline,
                                ]}
                                onPress={() => setAddModalOpen(false)}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.modalButtonTextOutline,
                                    ]}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.modalButtonPrimary,
                                ]}
                                onPress={handleCreateTask}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.modalButtonTextPrimary,
                                    ]}
                                >
                                    Create
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Edit Task Modal */}
            <Modal visible={editModalOpen} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Edit Task</Text>

                        <Text style={styles.fieldLabel}>Subject Title</Text>
                        <TextInput
                            style={styles.pillInput}
                            placeholder="Subject title"
                            value={editTitle}
                            onChangeText={setEditTitle}
                        />

                        <Text style={styles.fieldLabel}>Description</Text>
                        <TextInput
                            style={[styles.pillInput, styles.largeInput]}
                            placeholder="Description"
                            value={editDescription}
                            onChangeText={setEditDescription}
                            multiline
                        />

                        <Text style={styles.fieldLabel}>Due in (days)</Text>
                        <TextInput
                            style={styles.pillInput}
                            placeholder="e.g. 3"
                            value={editDueInDays}
                            onChangeText={setEditDueInDays}
                            keyboardType="numeric"
                        />

                        <Text style={styles.fieldLabel}>Color</Text>
                        <View style={styles.colorRow}>
                            {[
                                "#FFD27F",
                                "#FFA07A",
                                "#7BD389",
                                "#66BB6A",
                                "#ffffff",
                                "#bfbfbf",
                            ].map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[
                                        styles.colorDot,
                                        { backgroundColor: c },
                                        editColor === c
                                            ? styles.colorDotSelected
                                            : null,
                                    ]}
                                    onPress={() => setEditColor(c)}
                                />
                            ))}
                        </View>

                        <Text style={styles.fieldLabel}>Status</Text>
                        <View style={styles.statusRow}>
                            {[
                                { key: "in progress", label: "In Progress" },
                                { key: "overdue", label: "Overdue" },
                                { key: "completed", label: "Completed" },
                            ].map((s) => (
                                <TouchableOpacity
                                    key={s.key}
                                    style={[
                                        styles.statusButton,
                                        editStatus === (s.key as any)
                                            ? styles.statusButtonSelected
                                            : null,
                                    ]}
                                    onPress={() => setEditStatus(s.key as any)}
                                >
                                    <Text style={styles.statusText}>
                                        {s.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.modalButtonOutline,
                                ]}
                                onPress={() => setEditModalOpen(false)}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.modalButtonTextOutline,
                                    ]}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.modalButtonPrimary,
                                ]}
                                onPress={handleUpdateTask}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.modalButtonTextPrimary,
                                    ]}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
