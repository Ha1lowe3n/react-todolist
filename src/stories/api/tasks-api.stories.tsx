import React, { useEffect, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";

import { tasksAPI, UpdateTaskModelType } from "../../api/todolists-api";

export default {
    title: "API/tasksAPI",
} as Meta;

const { getTasks, createTask, deleteTask, updateTask } = tasksAPI;

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistId, setTodolistId] = useState<string>("");

    useEffect(() => {
        setLoading(false);
        setTodolistId("");
    }, [state]);

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                <div>
                    {JSON.stringify(state)}
                    <div>
                        <input
                            style={{ marginTop: 5 }}
                            placeholder={"ID Todolist"}
                            value={todolistId}
                            onChange={(e) => {
                                setTodolistId(e.currentTarget.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                setLoading(true);
                                getTasks(todolistId).then((data) => {
                                    setState(data);
                                });
                            }}
                        >
                            Get Tasks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistId, setTodolistId] = useState<string>("");
    const [todolistTitle, setTodolistTitle] = useState<string>("");

    useEffect(() => {
        setLoading(false);
        setTodolistId("");
        setTodolistTitle("");
    }, [state]);

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                <div>
                    {JSON.stringify(state)}
                    <div>
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"ID Todolist"}
                            value={todolistId}
                            onChange={(e) => {
                                setTodolistId(e.currentTarget.value);
                            }}
                        />
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"Title Todolist"}
                            value={todolistTitle}
                            onChange={(e) => {
                                setTodolistTitle(e.currentTarget.value);
                            }}
                        />
                        <button
                            style={{
                                display: "block",
                                marginTop: 10,
                            }}
                            onClick={() => {
                                setLoading(true);
                                createTask(todolistId, todolistTitle).then(
                                    (data) => setState(data)
                                );
                            }}
                        >
                            Create Tasks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    useEffect(() => {
        setLoading(false);
        setTodolistId("");
        setTaskId("");
    }, [state]);

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                <div>
                    {JSON.stringify(state)}
                    <div>
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"ID Todolist"}
                            value={todolistId}
                            onChange={(e) => {
                                setTodolistId(e.currentTarget.value);
                            }}
                        />
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"ID Task"}
                            value={taskId}
                            onChange={(e) => {
                                setTaskId(e.currentTarget.value);
                            }}
                        />
                        <button
                            style={{
                                display: "block",
                                marginTop: 10,
                            }}
                            onClick={() => {
                                setLoading(true);
                                deleteTask(todolistId, taskId).then((data) =>
                                    setState(data)
                                );
                            }}
                        >
                            Delete Tasks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    // ----- model -----
    const [modelTitle, setModelTitle] = useState<string>("");
    const [modelDeadline, setModelDeadline] = useState<string | null>(null);
    const [modelDescription, setModelDescription] =
        useState<string | null>(null);
    const [modelPriority, setModelPriority] = useState<number>(0);
    const [modelStartDate, setModelStartDate] = useState<string | null>(null);
    const [modelStatus, setModelStatus] = useState<number>(0);
    const model: UpdateTaskModelType = {
        title: modelTitle,
        deadline: modelDeadline,
        description: modelDescription,
        priority: modelPriority,
        startDate: modelStartDate,
        status: modelStatus,
    };
    // ------------------

    useEffect(() => {
        setLoading(false);
        setTaskId("");
        setTodolistId("");
        setModelTitle("");
        setModelDeadline(null);
        setModelDescription(null);
        setModelPriority(0);
        setModelStartDate(null);
        setModelStatus(0);
    }, [state]);

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                <div>
                    {JSON.stringify(state)}
                    <div>
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"ID Todolist"}
                            value={todolistId}
                            onChange={(e) => {
                                setTodolistId(e.currentTarget.value);
                            }}
                        />
                        <input
                            style={{
                                display: "block",
                                marginTop: 5,
                            }}
                            placeholder={"ID Task"}
                            value={taskId}
                            onChange={(e) => {
                                setTaskId(e.currentTarget.value);
                            }}
                        />

                        {/* Model inputs */}
                        <span
                            style={{
                                display: "block",
                                marginTop: 15,
                            }}
                        >
                            Model
                        </span>
                        <div>
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="text"
                                placeholder={"title"}
                                value={modelTitle}
                                onChange={(e) => {
                                    setModelTitle(e.currentTarget.value);
                                }}
                            />
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="text"
                                placeholder={"deadline"}
                                value={
                                    modelDeadline !== null ? modelDeadline : ""
                                }
                                onChange={(e) => {
                                    setModelDeadline(e.currentTarget.value);
                                }}
                            />
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="text"
                                placeholder={"description"}
                                value={
                                    modelDescription !== null
                                        ? modelDescription
                                        : ""
                                }
                                onChange={(e) => {
                                    setModelDescription(e.currentTarget.value);
                                }}
                            />
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="number"
                                placeholder={"priority"}
                                value={modelPriority}
                                onChange={(e) => {
                                    setModelPriority(+e.currentTarget.value);
                                }}
                            />
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="text"
                                placeholder={"start date"}
                                value={
                                    modelStartDate !== null
                                        ? modelStartDate
                                        : ""
                                }
                                onChange={(e) => {
                                    setModelStartDate(e.currentTarget.value);
                                }}
                            />
                            <input
                                style={{
                                    display: "block",
                                    marginTop: 5,
                                }}
                                type="number"
                                placeholder={"status"}
                                value={modelStatus}
                                onChange={(e) => {
                                    setModelStatus(+e.currentTarget.value);
                                }}
                            />
                        </div>
                        <button
                            style={{
                                display: "block",
                                marginTop: 10,
                            }}
                            onClick={() => {
                                setLoading(true);
                                updateTask(todolistId, taskId, model).then(
                                    (data) => setState(data)
                                );
                            }}
                        >
                            Update Tasks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
