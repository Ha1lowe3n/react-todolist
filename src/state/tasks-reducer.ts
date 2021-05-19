import { v1 } from "uuid";

import { TaskStateType } from "../AppWithRedux";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>;

const initialState: TaskStateType = {};

export const tasksReducer = (
    state: TaskStateType = initialState,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    { id: v1(), title: action.title, isDone: false },
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
        case "CHANGE-CHECK-TASK-STATUS": {
            const newState = { ...state };
            const task = newState[action.todolistId].find(
                (t) => t.id === action.taskId
            );
            if (task) task.isDone = !task.isDone;
            return newState;
        }
        case "CHANGE-TASK-TITLE": {
            const newState = { ...state };
            const task = newState[action.todolistId].find(
                (t) => t.id === action.taskId
            );
            if (task) task.title = action.newTitle;
            return newState;
        }
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
