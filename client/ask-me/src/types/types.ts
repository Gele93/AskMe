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

export interface Set {
    id: number;
    name: string;
    description: string;
    themes: Theme[];
}

export interface Theme {
    id: number;
    name: string;
    description: string;
    setId: number;
    questions: Question[];
}

export interface Question {
    id: number;
    text: string;
    themeId: number;
    answers: Answer[];
}

export interface Answer {
    id: number;
    text: string;
    questionId: number;
}

export enum CreateStage {
    Tool,
    Details,
    Preview
}