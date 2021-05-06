import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../App";

test("correct todolist should be removed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistsType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        removeTodolistAC(todolistId1)
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: TodolistsType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        addTodolistAC(newTodolistTitle)
    );

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test("correct todolist should change it's name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: TodolistsType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        changeTodolistTitleAC(todolistId2, newTodolistTitle)
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: TodolistsType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        changeTodolistFilterAC(todolistId2, newFilter)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
