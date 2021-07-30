import { ThunkType } from "../store";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { appActions } from "./app-reducer";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type LoginActionsType = ReturnType<InferValueTypes<typeof loginActions>>;
export type LoginStateType = {
    isLoggedIn: boolean;
};

const initialState: LoginStateType = {
    isLoggedIn: false,
};

export const authReducer = (
    state: LoginStateType = initialState,
    action: LoginActionsType
): LoginStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN":
            return { ...state, isLoggedIn: action.value };
        default:
            return state;
    }
};

// action creators
export const loginActions = {
    setIsLoggedIn: (value: boolean) => ({
        type: "SET-IS-LOGGED-IN" as const,
        value,
    }),
};

// thunks
const { setStatusAC } = appActions;
const { setIsLoggedIn } = loginActions;

export const loginTC =
    (data: LoginParamsType): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(setStatusAC("loading"));
            const { resultCode, messages } = await authAPI.login(data);
            if (resultCode === 0) {
                dispatch(setIsLoggedIn(true));
            } else {
                handleServerAppError(messages, dispatch);
            }
            dispatch(setStatusAC("succeeded"));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
