import React, { useEffect, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import axios from "axios";

export default {
    title: "API",
} as Meta;

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f6d122c0-e13a-41a0-8a89-732f8ec98129",
    },
});

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        instance.get(`todo-lists`).then((res) => setState(res.data));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        instance
            .post(`todo-lists`, { title: "ya krasava" })
            .then((res) => setState(res.data));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        instance
            .delete(`todo-lists/${"00526e71-091e-4b28-ac02-b42bc4f59644"}`)
            .then((res) => setState(res.data));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        instance
            .put(`todo-lists/${"e9d275ca-ef5e-4650-83d6-a0ea94a6c533"}`, {
                title: "ratata",
            })
            .then((res) => setState(res.data));
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
