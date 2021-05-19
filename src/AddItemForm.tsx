import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import { IconButton, TextField } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

const AddItemForm = React.memo(function ({ addItem }: AddItemFormPropsType) {
    console.log("AddItemForm is called");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError(true);
            setNewTaskTitle("");
            setTimeout(() => setError(false), 3500);
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
