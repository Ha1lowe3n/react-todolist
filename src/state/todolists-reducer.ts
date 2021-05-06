import { v1 } from "uuid";

import { FilterValuesType, TodolistsType } from "../App";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistsType> = [
    { id: todolistId1, title: "1st", filter: "all" },
    { id: todolistId2, title: "2nd", filter: "all" },
];

export const todolistsReducer = (
    state: Array<TodolistsType> = initialState,
    action: ActionsType
): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [
                { id: action.id, title: action.title, filter: "all" },
                ...state,
            ];
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
            return state;
    }
};

// action creators
export const removeTodolistAC = (todolistId: string) => ({
    type: "REMOVE-TODOLIST" as const,
    id: todolistId,
});

export const addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST" as const,
    title,
    id: v1(),
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
