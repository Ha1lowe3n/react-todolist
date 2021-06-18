import {
    addTaskAC,
    changeCheckTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TaskStateType,
} from "./tasks-reducer";
import { addTodolistAC } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        todolistId1: [
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
                todoListId: "1",
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
                todoListId: "2",
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
                todoListId: "3",
            },
        ],
        todolistId2: [
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
                todoListId: "1",
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
                todoListId: "2",
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
                todoListId: "3",
            },
        ],
    };
});

test("new task should be added in correct todolist", () => {
    const endState = tasksReducer(startState, addTaskAC("lala", "todolistId1"));

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].title).toBe("lala");
    expect(endState["todolistId2"][0].status).toBe(0);
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

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
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
