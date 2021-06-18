import { v1 } from "uuid";

import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";

export type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>;

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

const initialState: TaskStateType = {};

export const tasksReducer = (
    state: TaskStateType = initialState,
    action: TaskActionsType
): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {
                        id: v1(),
                        title: action.title,
                        status: TaskStatuses.New,
                        addedDate: "",
                        deadline: null,
                        description: null,
                        order: 0,
                        priority: TaskPriorities.Low,
                        startDate: null,
                        todoListId: action.todolistId,
                    },
                    ...state[action.todolistId],
                ],
            };
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    ...state[action.todolistId].filter(
                        (t) => t.id !== action.taskId
                    ),
                ],
            };
        case "CHANGE-CHECK-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => {
                    return task.id === action.taskId
                        ? {
                              ...task,
                              status:
                                  task.status === TaskStatuses.New
                                      ? TaskStatuses.Completed
                                      : TaskStatuses.New,
                          }
                        : task;
                }),
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => {
                    return task.id === action.taskId
                        ? { ...task, title: action.newTitle }
                        : task;
                }),
            };
        case "ADD-TODOLIST": {
            const newState = { ...state };
            newState[action.id] = [];
            return newState;
        }
        case "REMOVE-TODOLIST": {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

// action creators
export const addTaskAC = (title: string, todolistId: string) => ({
    type: "ADD-TASK" as const,
    title,
    todolistId,
});

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK" as const,
    taskId,
    todolistId,
});

export const changeCheckTaskStatusAC = (
    taskId: string,
    todolistId: string
) => ({
    type: "CHANGE-CHECK-TASK-STATUS" as const,
    taskId,
    todolistId,
});

export const changeTaskTitleAC = (
    taskId: string,
    todolistId: string,
    newTitle: string
) => ({
    type: "CHANGE-TASK-TITLE" as const,
    taskId,
    todolistId,
    newTitle,
});
