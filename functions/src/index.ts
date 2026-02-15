import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { createUser } from "./cloudfunctions/createUser";

setGlobalOptions({ maxInstances: 10 });

export { createUser };
