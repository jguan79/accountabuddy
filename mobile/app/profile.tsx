import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
} from "react-native";
import { styles } from "../styles/appStyles";
import { useState, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

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

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
            </View>

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

            <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signOutButton}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

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
