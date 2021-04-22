import { FilterValuesType, TodolistsType } from "../App";
import { v1 } from "uuid";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST";
    id: string;
};
type AddTodolistActionType = {
    type: "ADD-TODOLIST";
    title: string;
};
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE";
    id: string;
    title: string;
};
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER";
    id: string;
    filter: FilterValuesType;
};
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const todolistsReducer = (
    state: TodolistsType[],
    action: ActionsType
): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [...state, { id: v1(), title: action.title, filter: "all" }];
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find((t) => t.id === action.id);
            if (todolist) todolist.title = action.title;
            return [...state];
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find((t) => t.id === action.id);
            if (todolist) todolist.filter = action.filter;
            return [...state];
        }
        default:
            throw new Error("I don't understand this type");
    }
};

// actions creators
export const removeTodolistAC = (
    todolistId: string
): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    id: todolistId,
});

export const addTodolistAC = (
    newTodolistTitle: string
): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
});

export const changeTodolistTitleAC = (
    todolistId: string,
    newTodolistTitle: string
): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE" as const,
    id: todolistId,
    title: newTodolistTitle,
});

export const changeTodolistFilterAC = (
    todolistId: string,
    newFilter: FilterValuesType
): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER" as const,
    id: todolistId,
    filter: newFilter,
});
