import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { helloWorld } from "./cloudfunctions/hello";

setGlobalOptions({ maxInstances: 10 });

export { helloWorld };
