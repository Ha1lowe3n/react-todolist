import { Dispatch } from "redux";

import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import { handleServerNetworkError } from "../../utils/error-handle";

export type TodolistActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
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
                { ...action.todolist, filter: "all", entityStatus: "idle" },
                ...state,
            ];
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) =>
                tl.id === action.id ? { ...tl, title: action.title } : tl
            );
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) =>
                tl.id === action.id ? { ...tl, filter: action.filter } : tl
            );
        case "CHANGE-TODOLISTS-ENTITY-STATUS":
            return state.map((tl) =>
                tl.id === action.id
                    ? { ...tl, entityStatus: action.status }
                    : tl
            );
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({
                ...tl,
                filter: "all",
                entityStatus: "idle",
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
export const addTodolistAC = (todolist: TodolistType) => ({
    type: "ADD-TODOLIST" as const,
    todolist,
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
export const changeTodolistEntityStatusAC = (
    todolistId: string,
    status: RequestStatusType
) => ({
    type: "CHANGE-TODOLISTS-ENTITY-STATUS" as const,
    id: todolistId,
    status,
});
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS" as const,
    todolists,
});

// thunk creators
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({ status: "loading" }));
        const todolists = await todolistsAPI.getTodolists();
        dispatch(setTodolistsAC(todolists));
    } catch (err) {
        handleServerNetworkError(err.message, dispatch);
    }
};
export const deleteTodolistTC =
    (todolistId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));

            await todolistsAPI.deleteTodolist(todolistId);

            dispatch(removeTodolistAC(todolistId));
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const createTodolistTC =
    (title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            const {
                data: { item },
            } = await todolistsAPI.createTodolist(title);
            dispatch(addTodolistAC(item));
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const changeTodolistTitleTC =
    (todolistId: string, newTodolistTitle: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            await todolistsAPI.updateTodolist(todolistId, newTodolistTitle);
            dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle));
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
