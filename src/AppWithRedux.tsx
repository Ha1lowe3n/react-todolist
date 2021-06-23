import React, { useCallback, useEffect } from "react";
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

import Todolist from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {
    addTaskTC,
    deleteTaskTC,
    TaskStateType,
    updateTaskTC,
} from "./state/tasks-reducer";
import { AppStateType } from "./state/store";
import { TaskStatuses } from "./api/todolists-api";

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistDomainType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppStateType, TaskStateType>(
        (state) => state.tasks
    );

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [dispatch]);

    const changeTodoListFilter = useCallback(
        (filterValue: FilterValuesType, todolistId: string) => {
            dispatch(changeTodolistFilterAC(todolistId, filterValue));
        },
        [dispatch]
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskTC(todolistId, title));
        },
        [dispatch]
    );

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(deleteTaskTC(todolistId, taskId));
        },
        [dispatch]
    );

    const changeCheckStatus = useCallback(
        (taskId: string, todolistId: string, taskStatus: TaskStatuses) => {
            dispatch(
                updateTaskTC(todolistId, taskId, {
                    status:
                        taskStatus === TaskStatuses.New
                            ? TaskStatuses.Completed
                            : TaskStatuses.New,
                })
            );
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(deleteTodolistTC(todolistId));
        },
        [dispatch]
    );

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(createTodolistTC(title));
        },
        [dispatch]
    );

    const changeTaskTitle = useCallback(
        (taskId: string, todolistId: string, newValue: string) => {
            dispatch(updateTaskTC(todolistId, taskId, { title: newValue }));
        },
        [dispatch]
    );

    const changeStateTitleTodolist = useCallback(
        (newTitle: string, todolistId: string) => {
            dispatch(changeTodolistTitleTC(todolistId, newTitle));
        },
        [dispatch]
    );

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
                        return (
                            <Grid item key={tl.id}>
                                <Paper
                                    style={{ padding: "10px" }}
                                    elevation={3}
                                >
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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
