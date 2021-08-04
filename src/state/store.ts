import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { todolistsReducer } from "./reducers/todolists-reducer";
import { tasksReducer } from "./reducers/tasks-reducer";
import { appReducer } from "./reducers/app-reducer";
import { authReducer } from "./reducers/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware),
});
