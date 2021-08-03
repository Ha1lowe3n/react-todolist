import { Dispatch } from "redux";

import { setAppErrorAC, setAppStatusAC } from "../state/reducers/app-reducer";

export const handleServerAppError = (
    messages: string[],
    dispatch: Dispatch
) => {
    if (messages.length) {
        dispatch(setAppErrorAC(messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error occurred"));
    }
};

export const handleServerNetworkError = (
    errorMessage: string,
    dispatch: Dispatch
) => {
    dispatch(
        setAppErrorAC(errorMessage ? errorMessage : "Some error occurred")
    );
    dispatch(setAppStatusAC("succeeded"));
};
