export interface CreateUserDto {
    firstName: string;
    lastName: string;
    subscriptionLevel: number;
    email: string;
    username: string;
    password: string;
    role: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface User {
    firstName: string;
    lastName: string;
    subscriptionLevel: number;
    email: string;
    username: string;
}