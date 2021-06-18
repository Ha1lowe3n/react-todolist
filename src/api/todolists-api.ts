import axios from "axios";

// ----- common types -----
type ResponseType<T> = {
    resultCode: number;
    messages: Array<string>;
    data: T;
    fieldsErrors: string[];
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
export type TaskType = {
    addedDate: string;
    deadline: null | string;
    description: null | string;
    id: string;
    order: number;
    priority: number;
    startDate: null | string;
    status: number;
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
    status: number;
    priority: number;
    startDate: string | null;
    deadline: string | null;
};
// --------------------

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f6d122c0-e13a-41a0-8a89-732f8ec98129",
    },
});

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(``).then((res) => res.data);
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TodolistType }>>(``, { title })
            .then((res) => res.data);
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType<{}>>(`${todolistId}`)
            .then((res) => res.data);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<ResponseType<{}>>(`${todolistId}`, { title })
            .then((res) => res.data);
    },
};

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance
            .get<GetTasksType>(`${todolistId}/tasks`)
            .then((res) => res.data);
    },
    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {
                title,
            })
            .then((res) => res.data);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
            .then((res) => res.data);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance
            .put<ResponseType<{ item: TaskType }>>(
                `${todolistId}/tasks/${taskId}`,
                model
            )
            .then((res) => res.data);
    },
};
