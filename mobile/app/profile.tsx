import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    ScrollView,
} from "react-native";
import { styles } from "../styles/appStyles";
import { useState, useRef, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

// ------------------------- API IMPORTS ------------------------- //
import { updateUser } from "@/api/userApi";

// ------------------------- MODELS ------------------------- //
import { profilePlaceholder } from "../assets/images";

// ------------------------- UPDATE PROFILE ------------------------- //
export default function Profile({ route, navigation }: Props) {
    const currentUser = route.params.user;
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
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

    // ------------------------- DEFAULT INPUT ------------------------- //
    useEffect(() => {
        if (!currentUser) return;

        setUsername(currentUser.username || "");
        setFirstName(currentUser.firstName || "");
        setLastName(currentUser.lastName || "");
    }, [currentUser]);

    // ------------------------- UPDATE PROFILE HANDLER ------------------------- //
    async function handleUpdateProfile() {
        try {
            const updatedUser = await updateUser(currentUser.id, {
                username,
                firstName,
                lastName,
            });
            navigation.setParams({ user: updatedUser });
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update profile.");
        }
    }

    function uploadPress() {
        alert(
            "Profile pictures can be customized in a future update. For now, your avatar is automatically generated for the purpose of the demo.",
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

                    <Text style={styles.tasksSectionTitle}>Profile</Text>

                    <View style={{ width: 30 }} />
                </View>

                {/* Greeting Section (like the homepage, use this as reference for other pages) */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingText}>
                        Hey{" "}
                        <Text style={styles.firstNameText}>
                            {currentUser.firstName || currentUser.username}
                        </Text>
                        ,
                    </Text>
                    <Text style={styles.subGreeting}>
                        Manage your profile details
                    </Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileContainer}>
                    {/* Avatar */}
                    <View style={styles.imageContainer}>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Text style={styles.placeholderText}>📷</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={uploadPress}
                    >
                        <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>

                    {/* Inputs */}
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    {/* Buttons */}
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

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
