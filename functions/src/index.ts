import { setGlobalOptions } from "firebase-functions";
// import { onRequest } from "firebase-functions/https"; // remove comment as necessary
// import * as logger from "firebase-functions/logger"; // remove comment as necessary
import { createUser } from "./cloudfunctions/createUser";
import { createTask } from "./cloudfunctions/createTask";
import { loginUser } from "./cloudfunctions/loginUser";
import { getTasks } from "./cloudfunctions/getTasks";
import { deleteTask } from "./cloudfunctions/deleteTasks";
import { updateTask } from "./cloudfunctions/updateTask";
import { queryUsers } from "./cloudfunctions/queryUsers";
import { getFriends } from "./cloudfunctions/getFriends";
import { addFriend } from "./cloudfunctions/addFriend";

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
};
