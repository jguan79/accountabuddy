import { onCall } from "firebase-functions/v2/https";

const sayHello = onCall((request) => {
    return { message: "Hello World!" };
});

export { sayHello as helloWorld };
