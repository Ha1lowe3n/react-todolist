import { authAPI } from "../../api/todolists-api";
import { ThunkType } from "../store";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { loginActions } from "./login-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppDomainType = {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean;
};
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>;

const initialState: AppDomainType = {
    status: "idle",
    error: null,
    isInitialized: false,
};

export const appReducer = (
    state = initialState,
    action: AppActionsType
): AppDomainType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        case "APP/SET-INITIALIZED":
            return { ...state, isInitialized: action.value };
        default:
            return state;
    }
};

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS" as const,
    status,
});
export const setAppErrorAC = (error: string | null) => ({
    type: "APP/SET-ERROR" as const,
    error,
});
export const setAppInitializedAC = (value: boolean) => ({
    type: "APP/SET-INITIALIZED" as const,
    value,
});

// thunks
const { setIsLoggedIn } = loginActions;

export const initializeTC = (): ThunkType => async (dispatch) => {
    try {
        const { resultCode, messages } = await authAPI.authMe();
        if (resultCode === 0) {
            dispatch(setIsLoggedIn(true));
        } else {
            handleServerAppError(messages, dispatch);
        }
        dispatch(setAppInitializedAC(true));
    } catch (err) {
        handleServerNetworkError(err.message, dispatch);
    }
};
