import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Paper } from "@material-ui/core";

import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType,
} from "../../state/reducers/todolists-reducer";
import AddItemForm from "../../components/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {
    addTaskTC,
    deleteTaskTC,
    TaskStateType,
    updateTaskTC,
} from "../../state/reducers/tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { AppRootStateType } from "../../state/store";

const TodolistsList: React.FC = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppRootStateType, TaskStateType>(
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
        <>
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
                            <Paper style={{ padding: "10px" }} elevation={3}>
                                <Todolist
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    changeTodoListFilter={changeTodoListFilter}
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
        </>
    );
};

export default TodolistsList;
