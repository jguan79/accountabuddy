export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    username: string;
}

// Used for signup only
export interface CreateUserInput {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
