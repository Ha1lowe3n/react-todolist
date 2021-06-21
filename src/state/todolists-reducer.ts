import { v1 } from "uuid";

import { todolistsAPI, TodolistType } from "../api/todolists-api";
import { ThunkType } from "./store";

export type TodolistActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
};

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: TodolistActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [
                {
                    id: action.id,
                    title: action.title,
                    filter: "all",
                    addedDate: "",
                    order: 0,
                },
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
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({
                ...tl,
                filter: "all",
            }));
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
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS" as const,
    todolists,
});

// thunk creators
export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
    try {
        console.log("uraaaaa");
        const data = await todolistsAPI.getTodolists();
        dispatch(setTodolistsAC(data));
    } catch (err) {
        throw new Error(err);
    }
};
