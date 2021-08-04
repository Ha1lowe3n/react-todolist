import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import { handleServerNetworkError } from "../../utils/error-handle";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex((tl) => tl.id === action.payload.id);
            state.splice(index, 1);
        },
        addTodolistAC(
            state,
            action: PayloadAction<{ todolist: TodolistType }>
        ) {
            state.unshift({
                ...action.payload.todolist,
                filter: "all",
                entityStatus: "idle",
            });
        },
        changeTodolistTitleAC(
            state,
            action: PayloadAction<{
                todolistId: string;
                newTodolistTitle: string;
            }>
        ) {
            const index = state.findIndex(
                (tl) => tl.id === action.payload.todolistId
            );
            state[index].title = action.payload.newTodolistTitle;
        },
        changeTodolistFilterAC(
            state,
            action: PayloadAction<{
                todolistId: string;
                newFilter: FilterValuesType;
            }>
        ) {
            const index = state.findIndex(
                (tl) => tl.id === action.payload.todolistId
            );
            state[index].filter = action.payload.newFilter;
        },
        changeTodolistEntityStatusAC(
            state,
            action: PayloadAction<{
                todolistId: string;
                status: RequestStatusType;
            }>
        ) {
            const index = state.findIndex(
                (tl) => tl.id === action.payload.todolistId
            );
            state[index].entityStatus = action.payload.status;
        },
        setTodolistsAC(
            state,
            action: PayloadAction<{ todolists: TodolistType[] }>
        ) {
            return action.payload.todolists.map((tl) => ({
                ...tl,
                filter: "all",
                entityStatus: "idle",
            }));
        },
    },
});

export const todolistsReducer = slice.reducer;
export const {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
} = slice.actions;

// thunk creators
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({ status: "loading" }));
        const todolists = await todolistsAPI.getTodolists();
        dispatch(setTodolistsAC({ todolists: todolists }));
    } catch (err) {
        handleServerNetworkError(err.message, dispatch);
    }
};
export const deleteTodolistTC =
    (todolistId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            dispatch(
                changeTodolistEntityStatusAC({ todolistId, status: "loading" })
            );
            await todolistsAPI.deleteTodolist(todolistId);
            dispatch(removeTodolistAC({ id: todolistId }));
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
            dispatch(addTodolistAC({ todolist: item }));
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
            dispatch(changeTodolistTitleAC({ todolistId, newTodolistTitle }));
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
