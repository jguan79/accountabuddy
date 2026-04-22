import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { Friend } from "../frontend_models/Friend";
import { CreateUserInput, User } from "../frontend_models/User";

export async function getFriends(userId: string) {
    const getFriendsCallable = httpsCallable(functions, "getFriends");
    const response = await getFriendsCallable({ userId });
    return response.data as Friend[];
}

export async function addFriend(userId: string, friendId: string) {
    const addFriendCallable = httpsCallable(functions, "addFriend");
    const response = await addFriendCallable({ userId, friendId });
    return response.data;
}

export async function createUser(data: CreateUserInput) {
    const createUserCallable = httpsCallable(functions, "createUser");
    const response = await createUserCallable(data);
    return response.data as User;
}

export async function loginUser(username: string, password: string) {
    const loginUserCallable = httpsCallable(functions, "loginUser");
    const response = await loginUserCallable({ username, password });
    return response.data as User;
}

export async function queryUsers(usernamePart: string, currentUserId?: string) {
    const queryUsersCallable = httpsCallable(functions, "queryUsers");
    const response = await queryUsersCallable({ usernamePart, currentUserId });
    return response.data;
}
