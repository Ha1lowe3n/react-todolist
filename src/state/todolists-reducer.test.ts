import { v1 } from "uuid";

import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer,
    setTodolistsAC,
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistDomainType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: "",
            order: 0,
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0,
        },
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(
        startState,
        removeTodolistAC(todolistId1)
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    const newTodolistTitle = "New Todolist";

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
    const newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(
        startState,
        changeTodolistTitleAC(todolistId2, newTodolistTitle)
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    const newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(
        startState,
        changeTodolistFilterAC(todolistId2, newFilter)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {
    const endState = todolistsReducer(startState, setTodolistsAC(startState));

    expect(endState.length).toBe(2);

    expect(endState[0].id).toBe(todolistId1);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[0].filter).toBe("all");
    expect(endState[0].addedDate).toBe("");
    expect(endState[0].order).toBe(0);

    expect(endState[1].id).toBe(todolistId2);
    expect(endState[1].title).toBe("What to buy");
    expect(endState[1].filter).toBe("all");
    expect(endState[1].addedDate).toBe("");
    expect(endState[1].order).toBe(0);
});
