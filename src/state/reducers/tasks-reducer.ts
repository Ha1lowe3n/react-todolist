import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
} from "./todolists-reducer";
import {
    TaskPriorities,
    tasksAPI,
    TaskStatuses,
    TaskType,
} from "../../api/todolists-api";
import { AppRootStateType, ThunkType } from "../store";
import { appActions } from "./app-reducer";

// special type for universal update task
type UpdateTaskDomainModelType = {
    title?: string;
    description?: string | null;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string | null;
    deadline?: string | null;
};

export type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>;

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

const initialState: TaskStateType = {};

export const tasksReducer = (
    state: TaskStateType = initialState,
    action: TaskActionsType
): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [
                    action.task,
                    ...state[action.task.todoListId],
                ],
            };
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    ...state[action.todolistId].filter(
                        (t) => t.id !== action.taskId
                    ),
                ],
            };
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => {
                    return task.id === action.taskId
                        ? {
                              ...task,
                              ...action.model,
                          }
                        : task;
                }),
            };
        case "ADD-TODOLIST":
            return { ...state, [action.todolist.id]: [] };
        case "REMOVE-TODOLIST": {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        case "SET-TODOLISTS": {
            const newState = { ...state };
            action.todolists.forEach((tl) => {
                newState[tl.id] = [];
            });
            return newState;
        }
        case "SET-TASKS":
            return { ...state, [action.todolistId]: action.tasks };
        default:
            return state;
    }
};

// action creators
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK" as const,
    task,
});
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK" as const,
    taskId,
    todolistId,
});
export const updateTaskAC = (
    taskId: string,
    todolistId: string,
    model: UpdateTaskDomainModelType
) => ({
    type: "UPDATE-TASK" as const,
    taskId,
    todolistId,
    model,
});
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASKS" as const,
    tasks,
    todolistId,
});

// thunk creators
const { setStatusAC, setErrorAC } = appActions;

export const fetchTasksTC =
    (todolistId: string): ThunkType =>
    async (dispatch) => {
        try {
            const { items } = await tasksAPI.getTasks(todolistId);
            dispatch(setTasksAC(items, todolistId));
            dispatch(setStatusAC("succeeded"));
        } catch (err) {
            throw new Error(err);
        }
    };
export const deleteTaskTC =
    (todolistId: string, taskId: string): ThunkType =>
    async (dispatch) => {
        try {
            await tasksAPI.deleteTask(todolistId, taskId);
            dispatch(removeTaskAC(taskId, todolistId));
        } catch (err) {
            throw new Error(err);
        }
    };
export const addTaskTC =
    (todolistId: string, title: string): ThunkType =>
    async (dispatch) => {
        try {
            const {
                data: { item },
                resultCode,
                messages,
            } = await tasksAPI.createTask(todolistId, title);

            if (resultCode === 0) {
                dispatch(addTaskAC(item));
            } else {
                if (messages.length) {
                    dispatch(setErrorAC(messages[0]));
                } else {
                    dispatch(setErrorAC("Some error occurred"));
                }
            }
        } catch (err) {
            throw new Error(err);
        }
    };
export const updateTaskTC =
    (
        todolistId: string,
        taskId: string,
        model: UpdateTaskDomainModelType
    ): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const state = getState();
            const task = state.tasks[todolistId].find(
                (task) => task.id === taskId
            );

            if (task) {
                const apiModel = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...model,
                };

                await tasksAPI.updateTask(todolistId, taskId, apiModel);
                dispatch(updateTaskAC(taskId, todolistId, apiModel));
            }
        } catch (err) {
            throw new Error(err);
        }
    };
