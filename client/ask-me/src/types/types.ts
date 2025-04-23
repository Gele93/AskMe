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

export interface SetToLearn {
    id: number;
    name: string;
    description: string;
    themes: ThemeWithPriority[];
}

export interface SetWithScores {
    id: number;
    name: string;
    description: string;
    themes: ThemeWithScore[];
}

export interface Theme {
    id: number;
    name: string;
    description: string;
    setId: number;
    questions: Question[];
}

export interface ThemeWithPriority {
    id: number;
    name: string;
    description: string;
    setId: number;
    questions: Question[];
    priority: Priority;
}
export interface ThemeWithScore {
    id: number;
    name: string;
    description: string;
    setId: number;
    questions: QuestionWithScore[];
    priority: Priority;
}

export interface Question {
    id: number;
    text: string;
    themeId: number;
    answers: Answer[];
}

export interface QuestionWithScore {
    id: number;
    text: string;
    themeId: number;
    answers: Answer[];
    score: number;
    priority: Priority;
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

export enum ToastType {
    Info,
    Ok,
    Fail
}

export enum ActionType {
    Create,
    Edit,
    Delete,
    Neutral
}

export enum AnswerType {
    Nothing,
    Bad,
    Good,
    Perfect
}

export enum Priority {
    High,
    Normal,
    Low
}

export interface LearnSetup {
    questions: number
    goal: number
}

export enum LearnStage {
    Question,
    Next,
    Finish
}

