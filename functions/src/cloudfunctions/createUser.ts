import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

const createUser = onCall((req) => {
    logger.info("Input received:", req.data);
    const result = { message: "Hello World!" };
    logger.info("Returning:", result);
    return result;
});

export { createUser };
