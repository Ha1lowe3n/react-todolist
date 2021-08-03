import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authAPI } from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { setIsLoggedIn } from "./auth-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(
            state,
            action: PayloadAction<{ status: RequestStatusType }>
        ) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value;
        },
    },
});

export const appReducer = slice.reducer;
export const { setAppStatusAC, setAppErrorAC, setAppInitializedAC } =
    slice.actions;

// thunks
export const initializeTC = () => async (dispatch: Dispatch) => {
    try {
        const { resultCode, messages } = await authAPI.authMe();
        if (resultCode === 0) {
            dispatch(setIsLoggedIn({ value: true }));
        } else {
            handleServerAppError(messages, dispatch);
        }
        dispatch(slice.actions.setAppInitializedAC({ value: true }));
    } catch (err) {
        handleServerNetworkError(err.message, dispatch);
    }
};
