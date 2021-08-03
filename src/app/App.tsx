import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";

import "./App.css";
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress,
    CircularProgress,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import TodolistsList from "../pages/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { AppRootStateType } from "../state/store";
import { initializeTC, RequestStatusType } from "../state/reducers/app-reducer";
import Login from "../pages/login/Login";
import { logoutTC } from "../state/reducers/auth-reducer";

type AppPropsType = {
    demo?: boolean;
};

function App({ demo = false }: AppPropsType) {
    const dispatch = useDispatch();
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    );
    const isInitialized = useSelector<AppRootStateType, boolean>(
        (state) => state.app.isInitialized
    );
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    );

    useEffect(() => {
        dispatch(initializeTC());
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <CircularProgress
                style={{
                    position: "fixed",
                    top: "calc(50% - 20px)",
                    left: "calc(50% - 20px)",
                }}
            />
        );
    }
    return (
        <div className="App">
            <ErrorSnackbar />
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        {isLoggedIn && (
                            <Button
                                style={{ textAlign: "right" }}
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Log out
                            </Button>
                        )}
                    </Toolbar>
                    {status === "loading" && (
                        <LinearProgress
                            style={{
                                position: "absolute",
                                width: "100%",
                                top: 64,
                            }}
                        />
                    )}
                </AppBar>
            </div>

            <Container fixed>
                <Route
                    path={"/"}
                    render={() => <TodolistsList demo={demo} />}
                    exact
                />
                <Route path={"/login"} component={Login} />
            </Container>
        </div>
    );
}

export default App;
