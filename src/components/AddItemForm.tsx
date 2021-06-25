import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import { IconButton, TextField } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

export type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

const AddItemForm = React.memo(function ({ addItem }: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const clearError = setTimeout(() => {
            setError(false);
        }, 3500);

        return () => clearTimeout(clearError);
    }, [error]);

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim());
        } else {
            setError(true);
        }
        if (!error) {
            setNewTaskTitle("");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false);
        if (e.key === "Enter") addTaskHandler();
    };

    return (
        <div>
            <TextField
                label="Writing some..."
                variant={"outlined"}
                error={error}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error && "Title is empty"}
            />
            <IconButton
                style={{ padding: "16px" }}
                aria-label="delete"
                onClick={addTaskHandler}
                color={"primary"}
            >
                <ControlPoint />
            </IconButton>
        </div>
    );
});

export default AddItemForm;
