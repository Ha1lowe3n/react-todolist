import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { AppRootStateType } from "../state/store";
import { setAppErrorAC } from "../state/reducers/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(
        (state) => state.app.error
    );

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;
        dispatch(setAppErrorAC({ error: null }));
    };

    return (
        <div>
            <Snackbar
                open={error !== null}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
