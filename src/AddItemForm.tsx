import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

function AddItemForm({ addItem }: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required");
            setNewTaskTitle("");
            setTimeout(() => setError(null), 3500);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") addTaskHandler();
    };
    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
}

export default AddItemForm;
