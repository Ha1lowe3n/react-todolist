import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import {
    TodolistActionsType,
    todolistsReducer,
} from "./reducers/todolists-reducer";
import { TaskActionsType, tasksReducer } from "./reducers/tasks-reducer";
import { AppActionsType, appReducer } from "./reducers/app-reducer";
import { authReducer, LoginActionsType } from "./reducers/login-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType =
    | TodolistActionsType
    | TaskActionsType
    | AppActionsType
    | LoginActionsType;
export type ThunkType = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppRootActionsType
>;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
