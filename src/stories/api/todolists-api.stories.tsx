import React, { useEffect, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";

import { todolistsAPI } from "../../api/todolists-api";

export default {
    title: "API/todolistsAPI",
} as Meta;

const { getTodolists, createTodolist, deleteTodolist, updateTodolist } =
    todolistsAPI;

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
    }, [state]);

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                <div>
                    {JSON.stringify(state)}
                    <div>
                        <button
                            onClick={() => {
                                setLoading(true);
                                getTodolists().then((data) => {
                                    setState(data);
                                });
                            }}
                        >
                            Get Todolists
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistTitle, setTodolistTitle] = useState<string>("");

    useEffect(() => {
        setLoading(false);
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
                            placeholder={"Title Todolist"}
                            value={todolistTitle}
                            onChange={(e) => {
                                setTodolistTitle(e.currentTarget.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                setLoading(true);
                                createTodolist(todolistTitle).then((data) => {
                                    setState(data);
                                });
                            }}
                        >
                            Create Todolist
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const DeleteTodolist = () => {
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
                            placeholder={"ID Todolist"}
                            value={todolistId}
                            onChange={(e) => {
                                setTodolistId(e.currentTarget.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                setLoading(true);
                                deleteTodolist(todolistId).then((data) => {
                                    setState(data);
                                });
                            }}
                        >
                            Delete Todolist
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [todolistId, setTodolistId] = useState<string>("");
    const [newTodolistTitle, setNewTodolistTitle] = useState<string>("");

    useEffect(() => {
        setLoading(false);
        setTodolistId("");
        setNewTodolistTitle("");
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
                            placeholder={"New title Todolist"}
                            value={newTodolistTitle}
                            onChange={(e) => {
                                setNewTodolistTitle(e.currentTarget.value);
                            }}
                        />
                        <button
                            style={{
                                display: "block",
                                marginTop: 10,
                            }}
                            onClick={() => {
                                setLoading(true);
                                updateTodolist(
                                    todolistId,
                                    newTodolistTitle
                                ).then((data) => {
                                    setState(data);
                                });
                            }}
                        >
                            Update Todolist
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
