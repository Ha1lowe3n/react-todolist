import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeCheckTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks-reducer";
import { AppStateType } from "./state/store";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistsType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppStateType, TaskStateType>(
        (state) => state.tasks
    );

    const changeTodoListFilter = (
        filterValue: FilterValuesType,
        todolistId: string
    ) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue));
    };

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    };

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId));
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        dispatch(changeCheckTaskStatusAC(taskId, todolistId));
    };

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    };

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    };

    const changeTaskTitle = (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => {
        dispatch(changeTaskTitleAC(taskId, todolistId, newValue));
    };

    const changeStateTitleTodolist = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container>
                    <Grid item style={{ padding: "20px 0px" }}>
                        <h3>Add new todolist</h3>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodoList = tasks[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(
                                (t) => !t.isDone
                            );
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(
                                (t) => t.isDone
                            );
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper
                                    style={{ padding: "10px" }}
                                    elevation={3}
                                >
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        changeTodoListFilter={
                                            changeTodoListFilter
                                        }
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeCheckStatus={changeCheckStatus}
                                        todoListFilter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeStateTitleTodolist={
                                            changeStateTitleTodolist
                                        }
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
