import { setGlobalOptions } from "firebase-functions";
// import { onRequest } from "firebase-functions/https"; // remove comment as necessary
// import * as logger from "firebase-functions/logger"; // remove comment as necessary
import { createUser } from "./cloudfunctions/createUser";
import { createTask } from "./cloudfunctions/createTask";
import { loginUser } from "./cloudfunctions/loginUser";
import { getTasks } from "./cloudfunctions/getTasks";
import { deleteTask } from "./cloudfunctions/deleteTasks";

setGlobalOptions({ maxInstances: 10 });

export { createUser, createTask, loginUser, getTasks, deleteTask };
