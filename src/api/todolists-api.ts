import axios from "axios";

// ----- common types -----
type ResponseType<T> = {
    resultCode: number;
    messages: Array<string>;
    data: T;
    fieldsErrors?: string[];
};
// --------------------

// ----- Todolist types -----
export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
// --------------------

// ----- Tasks types -----
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    addedDate: string;
    deadline: null | string;
    description: null | string;
    id: string;
    order: number;
    priority: TaskPriorities;
    startDate: null | string;
    status: TaskStatuses;
    title: string;
    todoListId: string;
};
type GetTasksType = {
    error: string | null;
    items: TaskType[];
    totalCount: number;
};
export type UpdateTaskModelType = {
    title: string;
    description: string | null;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string | null;
    deadline: string | null;
};
// --------------------

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f6d122c0-e13a-41a0-8a89-732f8ec98129",
    },
});

export const todolistsAPI = {
    getTodolists() {
        return instance
            .get<TodolistType[]>(`todo-lists`)
            .then((res) => res.data);
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title })
            .then((res) => res.data);
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
            .then((res) => res.data);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title })
            .then((res) => res.data);
    },
};

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance
            .get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data);
    },
    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseType<{ item: TaskType }>>(
                `todo-lists/${todolistId}/tasks`,
                {
                    title,
                }
            )
            .then((res) => res.data);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType<{}>>(
                `todo-lists/${todolistId}/tasks/${taskId}`
            )
            .then((res) => res.data);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance
            .put<ResponseType<{ item: TaskType }>>(
                `todo-lists/${todolistId}/tasks/${taskId}`,
                model
            )
            .then((res) => res.data);
    },
};

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};
export const authAPI = {
    login(data: LoginParamsType) {
        return instance
            .post<ResponseType<{ userId?: number }>>(`auth/login`, data)
            .then((res) => res.data);
    },
};
