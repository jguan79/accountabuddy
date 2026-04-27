// ------------------------- IMPORTS ------------------------- //
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { Animated, Dimensions } from "react-native";
import { styles, taskCardBackground } from "../styles/appStyles";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Homepage">;

// ------------------------- API IMPORTS ------------------------- //
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import {
    getFriends,
    addFriend,
    createUser,
    loginUser,
    queryUsers,
} from "../api/userApi";

// ------------------------- MODELS ------------------------- //
import { Task } from "../frontend_models/Task";
import { User } from "../frontend_models/User";
import { Friend } from "../frontend_models/Friend";
import { profilePlaceholder } from "../assets/images";

// ------------------------- HOMEPAGE ------------------------- //
export default function Homepage({ route, navigation }: Props) {
    const currentUser: User = route.params.user;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
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
        "in_progress" | "overdue" | "completed"
    >("in_progress");

    useEffect(() => {
        async function fetchData() {
            try {
                const tasksResponse = await getTasks(currentUser.id);
                setTasks(
                    (tasksResponse || []).filter(
                        (task) => task.status === "in_progress",
                    ),
                );

                const friendsResponse = await getFriends(currentUser.id);
                setFriends(friendsResponse || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // ------------------------- DATE / UI HELPERS ------------------------- //
    const weekDays = ["Su", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const todayDate = today.getDate();

    const weekDates = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date(today);
        day.setDate(today.getDate() - 3 + i);
        return day.getDate();
    });

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

    // ------------------------- TASK HANDLERS ------------------------- //
    async function handleDeleteTask() {
        if (!editingTask) return;

        try {
            await deleteTask(currentUser.id, editingTask.id);

            setTasks((tasks) =>
                tasks.filter((task) => task.id !== editingTask.id),
            );

            setEditModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error("Delete task failed", err);
            Alert.alert("Error", "Failed to delete task.");
        }
    }

    async function handleCreateTask() {
        if (!newTitle) {
            Alert.alert("Validation", "Please enter a task title.");
            return;
        }

        const daysToAdd = Number.parseInt(newDueInDays, 10);
        const validDays = Number.isNaN(daysToAdd) ? 0 : daysToAdd;

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + validDays);

        try {
            const createdTask = await createTask({
                subjectTitle: newTitle,
                description: newDescription,
                dueDate: dueDate.toISOString(),
                color: newColor,
                userId: currentUser.id,
                status: "in_progress",
            });

            setTasks((prev) => [createdTask, ...prev]);
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

    function getDaysUntilDue(dateString?: string) {
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

    function formatDueInDays(days?: number) {
        if (typeof days !== "number") return { text: "-", status: "normal" };

        if (days < 0) {
            return {
                text: `Overdue ${Math.abs(days)} days`,
                status: "overdue",
            };
        }

        if (days <= 2) {
            return {
                text: `Due in ${days} days`,
                status: "soon",
            };
        }

        return {
            text: `Due in ${days} days`,
            status: "normal",
        };
    }

    async function handleUpdateTask() {
        Keyboard.dismiss();
        if (!editingTask) return;
        const updates: any = {
            subjectTitle: editTitle,
            description: editDescription,
            color: editColor,
            status: editStatus,
        };

        const days = Number.parseInt(editDueInDays, 10);

        if (editDueInDays !== "" && !Number.isNaN(days)) {
            const newDueDate = new Date(editingTask.dueDate); // base it on existing date, NOT now
            newDueDate.setDate(newDueDate.getDate() + days);
            updates.dueDate = newDueDate.toISOString();
        }

        try {
            const updatedTask = await updateTask({
                userId: currentUser.id,
                taskId: editingTask.id,
                updates,
            } as any);

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
            const dueInDays = getDaysUntilDue(dueDate);

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

        // --------- do not edit below this, will fix types later------------------
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

                    <View style={styles.statBadge}>
                        <Text style={styles.statLabel}>Next Up:</Text>

                        <Text
                            style={styles.statNumber}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {displayTasks.length > 0
                                ? displayTasks[0].name
                                : "No tasks"}
                        </Text>
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
                        <Ionicons
                            name="notifications-outline"
                            size={30}
                            color="#66BB6A"
                        ></Ionicons>

                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingText}>
                        Welcome{" "}
                        <Text style={styles.firstNameText}>
                            {currentUser.firstName || currentUser.username}
                        </Text>
                        <Text style={styles.firstNameText}>,</Text>
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
                        {weekDates.map((date, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dateCircle,
                                    date === todayDate && styles.currentDate,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        date === todayDate &&
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
                <View style={styles.tasksSectionHeader}>
                    <Text style={styles.tasksSectionTitle}>Tasks</Text>
                    <Text style={styles.tasksSectionCount}>
                        {displayTasks.length} active
                    </Text>
                </View>

                {displayTasks.map((task: any) => {
                    const dueInfo = formatDueInDays(task.dueInDays);

                    return (
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
                                setEditStatus(task.status || "in_progress");
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

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.taskName}>
                                            {task.name}
                                        </Text>

                                        {task.description && (
                                            <Text
                                                style={styles.taskDescription}
                                            >
                                                {task.description}
                                            </Text>
                                        )}
                                    </View>
                                </View>

                                <View
                                    style={[
                                        styles.dueBadge,

                                        dueInfo.status === "overdue" && {
                                            backgroundColor: "#FFE5E5",
                                            borderColor: "#FFB3B3",
                                        },

                                        dueInfo.status === "soon" && {
                                            backgroundColor: "#FFF6D6",
                                            borderColor: "#FFE08A",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dueText,

                                            dueInfo.status === "overdue" && {
                                                color: "#D32F2F",
                                            },

                                            dueInfo.status === "soon" && {
                                                color: "#B26A00",
                                            },
                                        ]}
                                    >
                                        {dueInfo.text}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

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
            {/* Add Task Modal */}
            <Modal visible={addModalOpen} animationType="slide" transparent>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.backdrop}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.panel}>
                                <Text style={styles.heading}>Add Task</Text>
                                <Text style={styles.inputLabel}>
                                    Subject Title
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g. Math, Compilers"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    value={newTitle}
                                    onChangeText={setNewTitle}
                                />

                                <Text style={styles.inputLabel}>
                                    Description (optional)
                                </Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        styles.largeInput,
                                    ]}
                                    placeholder="Add notes or steps..."
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    value={newDescription}
                                    onChangeText={setNewDescription}
                                    multiline
                                />

                                <Text style={styles.inputLabel}>
                                    Due in (days)
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g. 3"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    value={newDueInDays}
                                    onChangeText={setNewDueInDays}
                                    keyboardType="numeric"
                                />

                                <Text style={styles.inputLabel}>Color</Text>
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

                                <View style={styles.actionsRow}>
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
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* Edit Task Modal */}
            <Modal visible={editModalOpen} animationType="slide" transparent>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.backdrop}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.panel}>
                                <Text style={styles.heading}>Edit Task</Text>

                                <Text style={styles.inputLabel}>
                                    Subject Title
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Subject title"
                                    value={editTitle}
                                    onChangeText={setEditTitle}
                                />

                                <Text style={styles.inputLabel}>
                                    Description
                                </Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        styles.largeInput,
                                    ]}
                                    placeholder="Description"
                                    value={editDescription}
                                    onChangeText={setEditDescription}
                                    multiline
                                />

                                <Text style={styles.inputLabel}>
                                    Due in (days)
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="example: 3"
                                    value={editDueInDays}
                                    onChangeText={setEditDueInDays}
                                    keyboardType="numeric"
                                />

                                <Text style={styles.inputLabel}>Color</Text>
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

                                <Text style={styles.inputLabel}>Status</Text>
                                <View style={styles.statusRow}>
                                    {[
                                        {
                                            key: "in_progress",
                                            label: "In Progress",
                                        },
                                        { key: "overdue", label: "Overdue" },
                                        {
                                            key: "completed",
                                            label: "Completed",
                                        },
                                    ].map((status) => (
                                        <TouchableOpacity
                                            key={status.key}
                                            style={[
                                                styles.statusButton,
                                                editStatus ===
                                                (status.key as any)
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

                                <View style={styles.actionsRow}>
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
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
