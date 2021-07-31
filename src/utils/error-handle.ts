import { ThunkDispatch } from "redux-thunk";
import { CombinedState } from "redux";

import {
    AppDomainType,
    setAppErrorAC,
    setAppStatusAC,
} from "../state/reducers/app-reducer";
import { TodolistDomainType } from "../state/reducers/todolists-reducer";
import { TaskStateType } from "../state/reducers/tasks-reducer";
import { AppRootActionsType } from "../state/store";
import { LoginStateType } from "../state/reducers/login-reducer";

type DispatchType = ThunkDispatch<
    CombinedState<{
        todolists: TodolistDomainType[];
        tasks: TaskStateType;
        app: AppDomainType;
        auth: LoginStateType;
    }>,
    unknown,
    AppRootActionsType
>;

export const handleServerAppError = (
    messages: string[],
    dispatch: DispatchType
) => {
    if (messages.length) {
        dispatch(setAppErrorAC(messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error occurred"));
    }
};

export const handleServerNetworkError = (
    errorMessage: string,
    dispatch: DispatchType
) => {
    dispatch(
        setAppErrorAC(errorMessage ? errorMessage : "Some error occurred")
    );
    dispatch(setAppStatusAC("succeeded"));
};
