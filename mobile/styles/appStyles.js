import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D8EBD4",
        paddingTop: 50,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    menuIcon: {
        width: 30,
        height: 30,
        justifyContent: "space-around",
    },
    menuLine: {
        width: 25,
        height: 3,
        backgroundColor: "#66BB6A",
        borderRadius: 4,
    },
    statBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
        backgroundColor: "#F6F8F6",
    },
    statLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B6B6B",
    },

    statNumber: {
        fontSize: 14,
        color: "#2E7D32",
        fontWeight: "600",
    },
    bellIcon: {
        position: "relative",
    },
    bell: {
        fontSize: 24,
    },
    notificationDot: {
        position: "absolute",
        top: 2,
        right: 2,
        width: 10,
        height: 10,
        backgroundColor: "tomato",
        borderRadius: 5,
    },
    greetingSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subGreeting: {
        fontSize: 14,
        color: "dimgray",
        marginTop: 5,
    },
    calendar: {
        backgroundColor: "#D8EBD4",
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
    },
    weekDaysRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    weekDay: {
        fontSize: 12,
        fontWeight: "600",
        width: 30,
        textAlign: "center",
    },
    datesRow: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    dateCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: "center",
        alignItems: "center",
    },
    currentDate: {
        backgroundColor: "#66BB6A",
    },
    dateText: {
        fontSize: 14,
    },
    currentDateText: {
        color: "white",
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
    },

    /* Task stuff, comment later */
    taskCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    taskLeft: {
        flex: 1,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    taskCircle: {
        borderRadius: 4,
        marginRight: 12,
        minHeight: 40,
        width: 5,
        height: "100%",
    },
    taskName: {
        fontSize: 15,
        marginBottom: 3,
        fontWeight: "700",
        color: "#1E3A1A",
        flexShrink: 1,
    },
    taskDescription: {
        fontSize: 13,
        color: "#6B8F67",
        marginTop: 2,
        lineHeight: 18,
        flexShrink: 1,
    },
    dueBadge: {
        flexShrink: 0,
        backgroundColor: "#F0F8EF",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#C8E0C4",
        minWidth: 60,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    dueText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#3D6B37",
    },
    daysText: {
        fontSize: 10,
        color: "#6B8F67",
        marginTop: 1,
    },
    addTaskButton: {
        backgroundColor: "#BADBB3",
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 20,
    },
    addTaskText: {
        fontSize: 16,
    },

    /*friend*/
    friendButton: {
        backgroundColor: "#94C88A",
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 12,
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    /* Sidebar styles */
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    sidebarContainer: {
        width: 260,
        height: "100%",
        backgroundColor: "#ffffff",
        paddingTop: 60,
        paddingHorizontal: 20,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    sidebarTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
    },
    sidebarItem: {
        paddingVertical: 14,
        paddingHorizontal: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    sidebarHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        marginBottom: 8,
    },
    sidebarAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#94C88A",
        marginRight: 12,
    },
    sidebarHeaderText: {
        flexDirection: "column",
    },
    sidebarUsername: {
        fontSize: 16,
        fontWeight: "800",
    },
    sidebarSubtitle: {
        fontSize: 12,
        color: "dimgray",
        marginTop: 2,
    },
    sidebarMenu: {
        paddingHorizontal: 12,
    },
    sidebarItemText: {
        fontSize: 15,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    sidebarFooter: {
        marginTop: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        paddingTop: 12,
    },
    sidebarLogoutButton: {
        backgroundColor: "#FFECEC",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 14,
        alignItems: "center",
    },
    sidebarLogoutText: {
        color: "#B00020",
        fontWeight: "700",
    },
    /* Modal styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "92%",
        backgroundColor: "#F6FBF6",
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E6F1E6",
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },
    searchInput: {
        height: 48,
        backgroundColor: "#EAF6EA",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#E0EFE0",
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F2F7F2",
    },
    resultName: {
        fontSize: 15,
        fontWeight: "700",
    },
    resultUsername: {
        fontSize: 12,
        color: "dimgray",
        marginTop: 4,
    },
    addFriendButton: {
        backgroundColor: "#66BB6A",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    addFriendButtonText: {
        color: "#fff",
        fontWeight: "700",
    },
    addFriendContent: {
        paddingHorizontal: 18,
        paddingTop: 12,
    },
    addFriendResults: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 40,
    },
    emptyResultContainer: {
        padding: 18,
    },
    emptyResultText: {
        color: "dimgray",
    },
    searchActionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    input: {
        height: 48,
        backgroundColor: "#EAF6EA",
        borderRadius: 30,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 24,
        alignItems: "center",
    },
    modalButtonPrimary: {
        backgroundColor: "#66BB6A",
    },
    modalButtonOutline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#94C88A",
    },
    modalButtonText: {
        fontWeight: "700",
    },
    modalButtonTextPrimary: {
        color: "#fff",
    },
    modalButtonTextOutline: {
        color: "#2f6f3a",
    },
    /* full-screen modal layout */
    modalFullScreen: {
        flex: 1,
        backgroundColor: "#D8EBD4",
        paddingTop: 50,
    },
    modalHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        marginBottom: 6,
    },
    modalContent: {
        paddingHorizontal: 18,
        paddingBottom: 40,
    },
    createTitle: {
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 14,
    },
    fieldLabel: {
        fontSize: 14,
        marginBottom: 8,
        marginTop: 6,
        fontWeight: "600",
    },
    pillInput: {
        height: 48,
        backgroundColor: "#CFEAD0",
        borderRadius: 30,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    largeInput: {
        height: 110,
        textAlignVertical: "top",
        paddingTop: 12,
    },
    colorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    colorDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
    },
    colorDotSelected: {
        borderWidth: 2,
        borderColor: "#333",
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 8,
        marginHorizontal: 6,
        borderRadius: 18,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
    },
    statusButtonSelected: {
        backgroundColor: "#66BB6A",
        borderColor: "#5aa85b",
    },
    statusText: {
        fontWeight: "700",
    },
    swipeRightAction: {
        backgroundColor: "#FF6B6B",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        marginRight: 16,
        borderRadius: 16,
        paddingVertical: 10,
        marginBottom: 15,
    },
    swipeRightText: {
        color: "#fff",
        fontWeight: "700",
    },
    createButton: {
        marginTop: 12,
        alignSelf: "center",
        width: "60%",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#94C88A",
        backgroundColor: "#EAF6EA",
    },
    createButtonText: {
        fontWeight: "700",
    },
    pageRoot: {
        flex: 1,
    },
    spacer40: {
        height: 40,
    },
});

// helper for dynamic task card background color
export function taskCardBackground(color) {
    return {
        backgroundColor: "#fff",
        borderLeftWidth: 5,
        borderLeftColor: color || "#94C88A",
    };
}
