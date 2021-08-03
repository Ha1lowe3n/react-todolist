import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { authAPI, LoginParamsType } from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { setAppStatusAC } from "./app-reducer";

const initialState = {
    isLoggedIn: false,
};

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
});

export const authReducer = slice.reducer;

// thunks
export const { setIsLoggedIn } = slice.actions;

export const loginTC =
    (data: LoginParamsType) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"));
            const { resultCode, messages } = await authAPI.login(data);
            if (resultCode === 0) {
                dispatch(setIsLoggedIn({ value: true }));
            } else {
                handleServerAppError(messages, dispatch);
            }
            dispatch(setAppStatusAC("succeeded"));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"));
        const { resultCode, messages } = await authAPI.logout();
        if (resultCode === 0) {
            dispatch(setIsLoggedIn({ value: false }));
        } else {
            handleServerAppError(messages, dispatch);
        }
        dispatch(setAppStatusAC("succeeded"));
    } catch (err) {
        handleServerNetworkError(err.message, dispatch);
    }
};