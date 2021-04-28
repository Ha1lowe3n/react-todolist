//import { FilterValuesType, TodolistsType } from "../App";
import { v1 } from "uuid";
import { TaskStateType } from "../App";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

export const tasksReducer = (
    state: TaskStateType,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...]
            }
        default:
            throw new Error("I don't understand this type");
    }
};

// actions creators
export const addTaskAC = (title: string, todolistId: string) => ({
    type: "ADD-TASK" as const,
    title,
    todolistId,
});

export const addTodolistAC = (newTodolistTitle: string) => ({
    type: "ADD-TODOLIST" as const,
    title: newTodolistTitle,
});

export const changeTodolistTitleAC = (
    todolistId: string,
    newTodolistTitle: string
) => ({
    type: "CHANGE-TODOLIST-TITLE" as const,
    id: todolistId,
    title: newTodolistTitle,
});

export const changeTodolistFilterAC = (
    todolistId: string,
    newFilter: FilterValuesType
) => ({
    type: "CHANGE-TODOLIST-FILTER" as const,
    id: todolistId,
    filter: newFilter,
});
