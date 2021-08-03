import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { v1 } from "uuid";

import { tasksReducer } from "../state/reducers/tasks-reducer";
import { todolistsReducer } from "../state/reducers/todolists-reducer";
import { AppRootStateType } from "../state/store";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import { appReducer } from "../state/reducers/app-reducer";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "../state/reducers/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

const todolistId1: string = v1();
const todolistId2: string = v1();

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "loading",
        },
    ],
    tasks: {
        [todolistId1]: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
        ],
        [todolistId2]: [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "1",
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: "2",
            },
        ],
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false,
    },
};

export const storyBookStore = createStore(
    rootReducer,
    initialGlobalState,
    applyMiddleware(thunkMiddleware)
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
);
