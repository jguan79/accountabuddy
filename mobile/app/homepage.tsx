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
import { styles, taskCardBackground } from "../styles/appStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Keyboard } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Homepage">;

// Revisit this, maybe shared models to keep it consistent? Right now, this is all it needs.
type Task = {
    id: string;
    subjectTitle: string;
    description?: string;
    dueDate?: number;
    color?: string;
    status?: "in progress" | "completed" | "overdue";
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
                const getTasks = httpsCallable<{ userId: string }, Task[]>(
                    functions,
                    "getTasks",
                );
                const tasksRes = await getTasks({ userId: currentUser.id });
                setTasks(tasksRes.data || []);

                const getFriends = httpsCallable<{ userId: string }, User[]>(
                    functions,
                    "getFriends",
                );
                const friendsResponse = await getFriends({
                    userId: currentUser.id,
                });
                setFriends(friendsResponse.data || []);
            } catch (err) {
                console.error("Failed to load homepage data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        if ((route.params as any)?.openSidebar) {
            setTimeout(() => openSidebar(), 80);
        }
    }, []);

    const weekDays = ["Su", "Mon", "T", "W", "Th", "F", "S"];
    const now = new Date();
    const currentDate = now.getDate();

    // One week
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date();
        day.setDate(now.getDate() - 3 + i);
        return day.getDate();
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
            const deleteTask = httpsCallable(functions, "deleteTask");
            await deleteTask({
                userId: currentUser.id,
                taskId: editingTask.id,
            });

            setTasks((existingTasks) =>
                existingTasks.filter(
                    (task: any) =>
                        task.id !== editingTask.id &&
                        task._id !== editingTask.id,
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

        const days = Number.parseInt(newDueInDays, 10);
        const validDays = Number.isNaN(days) ? 0 : days;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + validDays);

        try {
            const createTask = httpsCallable(functions, "createTask");
            const response = await createTask({
                subjectTitle: newTitle,
                description: newDescription,
                dueDate,
                color: newColor,
                userId: currentUser.id,
            });

            const createdTask = response.data;

            setTasks((existingTasks) => [createdTask, ...existingTasks]);
            setAddModalOpen(false);

            // Reset form
            setNewTitle("");
            setNewDescription("");
            setNewDueInDays("");
            setNewColor("#FFD27F");
        } catch (err) {
            console.error("Create task failed", err);
            Alert.alert("Error", "Failed to create task.");
        }
    }

    function computeDueInDaysFromISO(dateString?: string) {
        if (!dateString) return undefined;
        const dueDate = new Date(dateString);
        const currentDate = new Date();
        dueDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const millisecondsDifference =
            dueDate.getTime() - currentDate.getTime();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil(millisecondsDifference / millisecondsPerDay);
    }

    async function handleUpdateTask() {
        Keyboard.dismiss();
        if (!editingTask) return;

        const days = Number.parseInt(editDueInDays, 10);
        const validDays = Number.isNaN(days) ? 0 : days;

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + validDays);

        try {
            const updateTask = httpsCallable(functions, "updateTask");

            const response = await updateTask({
                userId: currentUser.id,
                taskId: editingTask.id,
                updates: {
                    subjectTitle: editTitle,
                    description: editDescription,
                    dueDate: dueDate.toISOString(),
                    color: editColor,
                    status: editStatus,
                },
            });

            const updatedTask = response.data || {};

            const isFinished =
                editStatus === "completed" || editStatus === "overdue";

            const matchesTask = (task: any) =>
                task.id === updatedTask.id ||
                task._id === updatedTask.id ||
                task.id === editingTask.id;

            if (isFinished) {
                setTasks((existingTasks) =>
                    existingTasks.filter((task) => !matchesTask(task)),
                );
            } else {
                setTasks((existingTasks) =>
                    existingTasks.map((task) =>
                        matchesTask(task) ? { ...task, ...updatedTask } : task,
                    ),
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
        const normalizedTasks = tasks.map((task: any) => {
            const taskId =
                task.id || task._id || String(Math.random()).slice(2);
            const title =
                task.subjectTitle || task.name || task.title || "Untitled";
            const description = task.description || task.desc || "";
            const color = task.color || task.col || "#FFFFFF";
            const dueDate = task.dueDate || task.due || task.due_date;
            const dueInDays = computeDueInDaysFromISO(dueDate);

            return {
                ...task,
                id: taskId,
                name: title,
                description,
                color,
                dueDate,
                dueInDays,
            };
        });

        normalizedTasks.sort((taskA: any, taskB: any) => {
            const taskADays =
                typeof taskA.dueInDays === "number"
                    ? taskA.dueInDays
                    : Number.POSITIVE_INFINITY;

            const taskBDays =
                typeof taskB.dueInDays === "number"
                    ? taskB.dueInDays
                    : Number.POSITIVE_INFINITY;

            return taskADays - taskBDays;
        });

        return normalizedTasks;
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
                            Alert.alert(
                                "Notifications",
                                "No new notifications. Come back later!",
                            )
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
                                    date === currentDate && styles.currentDate,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        date === currentDate &&
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
                                    {task.description && (
                                        <Text style={styles.taskDescription}>
                                            {task.description}
                                        </Text>
                                    )}
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
                                onPress={() => {
                                    closeSidebar();
                                    navigation.navigate("Profile");
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
                            ].map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorDot,
                                        { backgroundColor: color },
                                        newColor === color
                                            ? styles.colorDotSelected
                                            : null,
                                    ]}
                                    onPress={() => setNewColor(color)}
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
                            placeholder="example: 3"
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
                            ].map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorDot,
                                        { backgroundColor: color },
                                        editColor === color
                                            ? styles.colorDotSelected
                                            : null,
                                    ]}
                                    onPress={() => setEditColor(color)}
                                />
                            ))}
                        </View>

                        <Text style={styles.fieldLabel}>Status</Text>
                        <View style={styles.statusRow}>
                            {[
                                { key: "in progress", label: "In Progress" },
                                { key: "overdue", label: "Overdue" },
                                { key: "completed", label: "Completed" },
                            ].map((status) => (
                                <TouchableOpacity
                                    key={status.key}
                                    style={[
                                        styles.statusButton,
                                        editStatus === (status.key as any)
                                            ? styles.statusButtonSelected
                                            : null,
                                    ]}
                                    onPress={() =>
                                        setEditStatus(status.key as any)
                                    }
                                >
                                    <Text style={styles.statusText}>
                                        {status.label}
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
