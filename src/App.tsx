import React, { useState } from "react";
import { v1 } from "uuid";

import "./App.css";

import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
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

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TaskStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistId1, title: "1st", filter: "all" },
        { id: todolistId2, title: "2nd", filter: "all" },
    ]);

    const [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "salt", isDone: false },
        ],
    });

    const changeTodoListFilter = (
        filterValue: FilterValuesType,
        todolistId: string
    ) => {
        const todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }
    };

    const addTask = (title: string, todolistId: string) => {
        const newTask = { id: v1(), title, isDone: false };
        const tasks = tasksObj[todolistId];
        const newTasks = [newTask, ...tasks];

        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    };

    const removeTask = (id: string, todolistId: string) => {
        const tasks = tasksObj[todolistId];
        const filterTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filterTasks;
        setTasks({ ...tasksObj });
    };

    const changeCheckStatus = (taskId: string, todolistId: string) => {
        const tasks = tasksObj[todolistId];
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
            setTasks({ ...tasksObj });
        }
    };

    const removeTodolist = (todolistId: string) => {
        const filterTodolists = todolists.filter((tl) => tl.id !== todolistId);
        setTodolists(filterTodolists);

        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    };

    const addTodolist = (title: string) => {
        const newTodolist: TodolistsType = {
            id: v1(),
            title,
            filter: "all",
        };
        setTodolists([...todolists, newTodolist]);
        setTasks({
            ...tasksObj,
            [newTodolist.id]: [],
        });
    };

    const changeTaskTitle = (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => {
        const tasks = tasksObj[todolistId];
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.title = newValue;
            setTasks({ ...tasksObj });
        }
    };

    const changeStateTitleTodolist = (newTitle: string, todolistId: string) => {
        const todolist = todolists.find((t) => t.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
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
                        let tasksForTodoList = tasksObj[tl.id];

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
                            <Grid item>
                                <Paper
                                    style={{ padding: "10px" }}
                                    elevation={3}
                                >
                                    <Todolist
                                        key={tl.id}
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

export default App;
