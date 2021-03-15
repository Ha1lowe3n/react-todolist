import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react";

import { TaskType, FilterValuesType } from "./App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    changeTodoListFilter: (filterValue: FilterValuesType) => void;
    removeTask: (id: string) => void;
    addTask: (title: string) => void;
};

function Todolist({
    title,
    tasks,
    changeTodoListFilter,
    removeTask,
    addTask,
}: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const tasksTodolist = tasks.map((task) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={() => removeTask(task.id)}>x</button>
        </li>
    ));

    const filterTodoList = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.innerText) {
            case "Active":
                return changeTodoListFilter("active");
            case "Completed":
                return changeTodoListFilter("completed");
            default:
                return changeTodoListFilter("all");
        }
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>{tasksTodolist}</ul>

            <div>
                <button onClick={filterTodoList}>All</button>
                <button onClick={filterTodoList}>Active</button>
                <button onClick={filterTodoList}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
