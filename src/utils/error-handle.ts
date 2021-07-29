import { ThunkDispatch } from "redux-thunk";
import { CombinedState } from "redux";

import { appActions, AppDomainType } from "../state/reducers/app-reducer";
import { TodolistDomainType } from "../state/reducers/todolists-reducer";
import { TaskStateType } from "../state/reducers/tasks-reducer";
import { AppRootActionsType } from "../state/store";

type DispatchType = ThunkDispatch<
    CombinedState<{
        todolists: TodolistDomainType[];
        tasks: TaskStateType;
        app: AppDomainType;
    }>,
    unknown,
    AppRootActionsType
>;

const { setStatusAC, setErrorAC } = appActions;

export const handleServerAppError = (
    messages: string[],
    dispatch: DispatchType
) => {
    if (messages.length) {
        dispatch(setErrorAC(messages[0]));
    } else {
        dispatch(setErrorAC("Some error occurred"));
    }
};

export const handleServerNetworkError = (
    errorMessage: string,
    dispatch: DispatchType
) => {
    dispatch(setErrorAC(errorMessage ? errorMessage : "Some error occurred"));
    dispatch(setStatusAC("succeeded"));
};
