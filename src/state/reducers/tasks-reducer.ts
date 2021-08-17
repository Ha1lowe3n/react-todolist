import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
} from "./todolists-reducer";
import {
    TaskPriorities,
    tasksAPI,
    TaskStatuses,
    TaskType,
} from "../../api/todolists-api";
import { AppRootStateType } from "../store";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { setAppStatusAC } from "./app-reducer";

// special type for universal update task
type UpdateTaskDomainModelType = {
    title?: string;
    description?: string | null;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string | null;
    deadline?: string | null;
};

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

const initialState: TaskStateType = {};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload);
        },
        removeTaskAC(
            state,
            action: PayloadAction<{ taskId: string; todolistId: string }>
        ) {
            const index = state[action.payload.todolistId].findIndex(
                (t) => t.id === action.payload.taskId
            );
            state[action.payload.todolistId].splice(index, 1);
        },
        updateTaskAC(
            state,
            action: PayloadAction<{
                taskId: string;
                todolistId: string;
                model: UpdateTaskDomainModelType;
            }>
        ) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(
                (t) => t.id === action.payload.taskId
            );
            tasks[index] = { ...tasks[index], ...action.payload.model };
        },
        setTasksAC(
            state,
            action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>
        ) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        });
    },
});

export const tasksReducer = slice.reducer;
export const { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } =
    slice.actions;

// thunk creators
export const fetchTasksTC =
    () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            const todolists = getState().todolists;
            for (const tl of todolists) {
                const { items } = await tasksAPI.getTasks(tl.id);
                dispatch(setTasksAC({ tasks: items, todolistId: tl.id }));
                dispatch(setAppStatusAC({ status: "succeeded" }));
            }
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const deleteTaskTC =
    (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            await tasksAPI.deleteTask(todolistId, taskId);
            dispatch(removeTaskAC({ taskId, todolistId }));
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const addTaskTC =
    (todolistId: string, title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            const {
                data: { item },
                resultCode,
                messages,
            } = await tasksAPI.createTask(todolistId, title);

            if (resultCode === 0) {
                dispatch(addTaskAC(item));
            } else {
                handleServerAppError(messages, dispatch);
            }
            dispatch(setAppStatusAC({ status: "succeeded" }));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const updateTaskTC =
    (todolistId: string, taskId: string, model: UpdateTaskDomainModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC({ status: "loading" }));
            const state = getState();
            const task = state.tasks[todolistId].find(
                (task) => task.id === taskId
            );

            if (task) {
                const apiModel = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...model,
                };

                const { resultCode, messages } = await tasksAPI.updateTask(
                    todolistId,
                    taskId,
                    apiModel
                );

                if (resultCode === 0) {
                    dispatch(
                        updateTaskAC({ taskId, todolistId, model: apiModel })
                    );
                } else {
                    handleServerAppError(messages, dispatch);
                }
                dispatch(setAppStatusAC({ status: "succeeded" }));
            }
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
