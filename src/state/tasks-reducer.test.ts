import { v1 } from "uuid";

import { TaskStateType } from "../App";
import {
    addTaskAC,
    tasksReducer,
    removeTaskAC,
    changeCheckTaskStatusAC,
    changeTaskTitleAC,
} from "./tasks-reducer";
import { addTodolistAC } from "./todolists-reducer";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };
});

test("new task should be added in correct todolist", () => {
    const endState = tasksReducer(startState, addTaskAC("lala", "todolistId1"));

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].title).toBe("lala");
    expect(endState["todolistId2"][0].isDone).toBe(false);
    expect(endState["todolistId2"][0].id).toBeDefined();
});

test("task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"));

    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("check status of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        changeCheckTaskStatusAC("2", "todolistId1")
    );

    expect(endState["todolistId1"][1].isDone).toBeFalsy();
    expect(endState["todolistId2"][1].isDone).toBeTruthy();
});

test("title of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC("1", "todolistId1", "newTitle")
    );

    expect(endState["todolistId1"][0].title).toBe("newTitle");
    expect(endState["todolistId2"][0].title).toBe("bread");
});

test("new array should be added when new todolist is added", () => {
    const endState = tasksReducer(startState, addTodolistAC("new todolist"));

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
