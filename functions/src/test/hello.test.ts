import { helloWorld } from "../cloudfunctions/hello";

const mockRequest: any = {
    data: { name: "Adrian" },
};

const mockContext: any = {};

async function testHello() {
    try {
        const result = await helloWorld(mockRequest, mockContext);
        console.log("Function returned:", result);
    } catch (err) {
        console.error("Function threw an error:", err);
    }
}

testHello();
