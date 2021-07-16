import React from "react";
import { useSelector } from "react-redux";

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

import TodolistsList from "../features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "../state/reducers/app-reducer";

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
                <TodolistsList demo={demo} />
            </Container>
        </div>
    );
}

export default App;
