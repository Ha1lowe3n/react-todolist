import React from "react";
import { useSelector } from "react-redux";
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
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import TodolistsList from "../pages/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "../state/reducers/app-reducer";
import Login from "../pages/login/Login";

type AppPropsType = {
    demo?: boolean;
};

function App({ demo = false }: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    );

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="relative">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
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
