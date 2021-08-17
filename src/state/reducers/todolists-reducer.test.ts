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
    changeTodolistEntityStatusAC,
} from "./todolists-reducer";
import { RequestStatusType } from "./app-reducer";

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
            entityStatus: "idle",
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(
        startState,
        removeTodolistAC({ id: todolistId1 })
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    const todolist = {
        id: "1",
        title: "hello",
        addedDate: "",
        order: 0,
    };

    const endState = todolistsReducer(startState, addTodolistAC({ todolist }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test("correct todolist should change it's name", () => {
    const newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(
        startState,
        changeTodolistTitleAC({ todolistId: todolistId2, newTodolistTitle })
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    const newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(
        startState,
        changeTodolistFilterAC({ todolistId: todolistId2, newFilter })
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test("correct entity status of todolist should be changed", () => {
    const newStatus: RequestStatusType = "loading";

    const endState = todolistsReducer(
        startState,
        changeTodolistEntityStatusAC({
            todolistId: todolistId2,
            status: newStatus,
        })
    );

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("loading");
});

test("todolists should be set to the state", () => {
    const endState = todolistsReducer(
        startState,
        setTodolistsAC({ todolists: startState })
    );

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
