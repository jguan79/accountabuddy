import { setGlobalOptions } from "firebase-functions";
import { createUser } from "./cloudfunctions/createUser";
import { createTask } from "./cloudfunctions/createTask";
import { loginUser } from "./cloudfunctions/loginUser";
import { getTasks } from "./cloudfunctions/getTasks";
import { deleteTask } from "./cloudfunctions/deleteTasks";
import { updateTask } from "./cloudfunctions/updateTask";
import { queryUsers } from "./cloudfunctions/queryUsers";
import { getFriends } from "./cloudfunctions/getFriends";
import { addFriend } from "./cloudfunctions/addFriend";
import { updateUser } from "./cloudfunctions/updateUser";

setGlobalOptions({ maxInstances: 10 });

export {
    createUser,
    createTask,
    loginUser,
    getTasks,
    deleteTask,
    updateTask,
    queryUsers,
    getFriends,
    addFriend,
    updateUser,
};
