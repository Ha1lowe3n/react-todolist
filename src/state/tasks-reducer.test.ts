import { v1 } from "uuid";

import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TaskStateType,
    updateTaskAC,
} from "./tasks-reducer";
import { addTodolistAC, setTodolistsAC } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";

let startState: TaskStateType;
let todolistId1: string;
let todolistId2: string;
let arrayTasksOfTodolist1: TaskType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    arrayTasksOfTodolist1 = [
        {
            id: "1",
            title: "CSS",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: null,
            description: null,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: null,
            todoListId: todolistId1,
        },
        {
            id: "2",
            title: "JS",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: null,
            description: null,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: null,
            todoListId: todolistId1,
        },
        {
            id: "3",
            title: "React",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: null,
            description: null,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: null,
            todoListId: todolistId1,
        },
    ];

    startState = {
        [todolistId1]: arrayTasksOfTodolist1,
        [todolistId2]: [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: todolistId2,
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: todolistId2,
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                addedDate: "",
                deadline: null,
                description: null,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: null,
                todoListId: todolistId2,
            },
        ],
    };
});

test("new task should be added in correct todolist", () => {
    const endState = tasksReducer(
        startState,
        addTaskAC({
            id: "4",
            title: "Vue",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: null,
            description: null,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: null,
            todoListId: todolistId1,
        })
    );

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe("Vue");
    expect(endState[todolistId2][0].status).toBe(0);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].todoListId).toBeDefined();
});

test("task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTaskAC("2", todolistId2));

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].every((t) => t.id !== "2")).toBeTruthy();
});

test("task should be updated", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC(arrayTasksOfTodolist1[0].id, todolistId1, {
            status: 2,
        })
    );

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed);
    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);
});

test("new array should be added when new todolist is added", () => {
    const newTodolistId = v1();
    const endState = tasksReducer(
        startState,
        addTodolistAC({
            id: newTodolistId,
            title: "newTodolist",
            addedDate: "",
            order: 0,
        })
    );

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test("empty arrays should be added when we set todolists", () => {
    const action = setTodolistsAC([
        { id: "1", title: "title 1", order: 0, addedDate: "" },
        { id: "2", title: "title 2", order: 0, addedDate: "" },
    ]);

    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[1]).toEqual([]);
    expect(endState[2]).toEqual([]);
});

test("tasks should be added for todolists by todolistId", () => {
    const action = setTasksAC(startState[todolistId1], todolistId1);

    const endState = tasksReducer({}, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState).toEqual({
        [todolistId1]: arrayTasksOfTodolist1,
    });
});
