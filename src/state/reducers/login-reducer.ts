import { ThunkType } from "../store";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../utils/error-handle";
import { appActions } from "./app-reducer";

export type LoginStateType = {};
export type LoginActionsType = {};

const initialState: LoginStateType = {};

export const tasksReducer = (
    state: LoginStateType = initialState,
    action: any
): LoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

// thunks
const { setStatusAC } = appActions;

export const loginTC =
    (data: LoginParamsType): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(setStatusAC("loading"));
            const { resultCode, messages } = await authAPI.login(data);
            if (resultCode === 0) {
                alert("uraaaaa");
            } else {
                handleServerAppError(messages, dispatch);
            }
            dispatch(setStatusAC("succeeded"));
        } catch (err) {
            handleServerNetworkError(err.message, dispatch);
        }
    };
