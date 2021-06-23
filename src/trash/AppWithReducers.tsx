// import React, { useReducer } from "react";
// import { v1 } from "uuid";
//
// import "./App.css";
//
// import Todolist from "./components/Todolist";
// import AddItemForm from "./components/AddItemForm";
// import {
//     AppBar,
//     Button,
//     Container,
//     Grid,
//     IconButton,
//     Paper,
//     Toolbar,
//     Typography,
// } from "@material-ui/core";
// import { Menu } from "@material-ui/icons";
//
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer,
// } from "./state/todolists-reducer";
// import {
//     addTaskAC,
//     changeCheckTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     tasksReducer,
// } from "./state/tasks-reducer";
//
// export type TaskType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// };
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// export type TodolistsType = {
//     id: string;
//     title: string;
//     filter: FilterValuesType;
// };
//
// export type TaskStateType = {
//     [key: string]: Array<TaskType>;
// };
//
// function AppWithReducers() {
//     const todolistId1 = v1();
//     const todolistId2 = v1();
//
//     const [todolists, dispatchToTodolistsReducer] = useReducer(
//         todolistsReducer,
//         [
//             { id: todolistId1, title: "1st", filter: "all" },
//             { id: todolistId2, title: "2nd", filter: "all" },
//         ]
//     );
//
//     const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             { id: v1(), title: "HTML", isDone: true },
//             { id: v1(), title: "CSS", isDone: true },
//             { id: v1(), title: "React", isDone: false },
//         ],
//         [todolistId2]: [
//             { id: v1(), title: "Milk", isDone: true },
//             { id: v1(), title: "book", isDone: true },
//             { id: v1(), title: "salt", isDone: false },
//         ],
//     });
//
//     const changeTodoListFilter = (
//         filterValue: FilterValuesType,
//         todolistId: string
//     ) => {
//         dispatchToTodolistsReducer(
//             changeTodolistFilterAC(todolistId, filterValue)
//         );
//     };
//
//     const addTask = (title: string, todolistId: string) => {
//         dispatchToTasksReducer(addTaskAC(title, todolistId));
//     };
//
//     const removeTask = (taskId: string, todolistId: string) => {
//         dispatchToTasksReducer(removeTaskAC(taskId, todolistId));
//     };
//
//     const changeCheckStatus = (taskId: string, todolistId: string) => {
//         dispatchToTasksReducer(changeCheckTaskStatusAC(taskId, todolistId));
//     };
//
//     const removeTodolist = (todolistId: string) => {
//         const action = removeTodolistAC(todolistId);
//         dispatchToTodolistsReducer(action);
//         dispatchToTasksReducer(action);
//     };
//
//     const addTodolist = (title: string) => {
//         const action = addTodolistAC(title);
//         dispatchToTodolistsReducer(action);
//         dispatchToTasksReducer(action);
//     };
//
//     const changeTaskTitle = (
//         taskId: string,
//         todolistId: string,
//         newValue: string
//     ) => {
//         dispatchToTasksReducer(changeTaskTitleAC(taskId, todolistId, newValue));
//     };
//
//     const changeStateTitleTodolist = (newTitle: string, todolistId: string) => {
//         dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle));
//     };
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu />
//                     </IconButton>
//                     <Typography variant="h6">News</Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//                 <Grid container>
//                     <Grid item style={{ padding: "20px 0px" }}>
//                         <h3>Add new todolist</h3>
//                         <AddItemForm addItem={addTodolist} />
//                     </Grid>
//                 </Grid>
//
//                 <Grid container spacing={3}>
//                     {todolists.map((tl) => {
//                         let tasksForTodoList = tasksObj[tl.id];
//
//                         if (tl.filter === "active") {
//                             tasksForTodoList = tasksForTodoList.filter(
//                                 (t) => !t.isDone
//                             );
//                         }
//                         if (tl.filter === "completed") {
//                             tasksForTodoList = tasksForTodoList.filter(
//                                 (t) => t.isDone
//                             );
//                         }
//
//                         return (
//                             <Grid item key={tl.id}>
//                                 <Paper
//                                     style={{ padding: "10px" }}
//                                     elevation={3}
//                                 >
//                                     <Todolist
//                                         todolistId={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodoList}
//                                         changeTodoListFilter={
//                                             changeTodoListFilter
//                                         }
//                                         addTask={addTask}
//                                         removeTask={removeTask}
//                                         changeCheckStatus={changeCheckStatus}
//                                         todoListFilter={tl.filter}
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeStateTitleTodolist={
//                                             changeStateTitleTodolist
//                                         }
//                                     />
//                                 </Paper>
//                             </Grid>
//                         );
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
export default () => {};
