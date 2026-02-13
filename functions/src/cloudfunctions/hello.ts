import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

const helloWorld = onCall((req) => {
    logger.info("Input received:", req.data); // structured log
    const result = { message: "Hello World!" };
    logger.info("Returning:", result);
    return result;
});

export { helloWorld };
