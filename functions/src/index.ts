import { setGlobalOptions } from "firebase-functions";
// import { onRequest } from "firebase-functions/https"; // remove
// import * as logger from "firebase-functions/logger"; // remove
import { createUser } from "./cloudfunctions/createUser";

setGlobalOptions({ maxInstances: 10 });

export { createUser };
