import { combineReducers } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import {
    TodolistActionsType,
    todolistsReducer,
} from "./reducers/todolists-reducer";
import { TaskActionsType, tasksReducer } from "./reducers/tasks-reducer";
import { appReducer } from "./reducers/app-reducer";
import { authReducer } from "./reducers/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TodolistActionsType | TaskActionsType;
export type ThunkType = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppRootActionsType
>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware),
});
