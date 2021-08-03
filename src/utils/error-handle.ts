import { Dispatch } from "redux";

import { setAppErrorAC, setAppStatusAC } from "../state/reducers/app-reducer";

export const handleServerAppError = (
    messages: string[],
    dispatch: Dispatch
) => {
    if (messages.length) {
        dispatch(setAppErrorAC({ error: messages[0] }));
    } else {
        dispatch(setAppErrorAC({ error: "Some error occurred" }));
    }
};

export const handleServerNetworkError = (
    errorMessage: string,
    dispatch: Dispatch
) => {
    dispatch(
        setAppErrorAC({
            error: errorMessage ? errorMessage : "Some error occurred",
        })
    );
    dispatch(setAppStatusAC({ status: "succeeded" }));
};
