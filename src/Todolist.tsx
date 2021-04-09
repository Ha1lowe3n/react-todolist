import React, { MouseEvent } from "react";

import { TaskType, FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";

type PropsType = {
    todolistId: string;
    title: string;
    tasks: Array<TaskType>;
    changeTodoListFilter: (filterValue: FilterValuesType, id: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    todoListFilter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
};

function Todolist({
    todolistId,
    title,
    tasks,
    changeTodoListFilter,
    removeTask,
    addTask,
    changeCheckStatus,
    todoListFilter,
    removeTodolist,
}: PropsType) {
    const tasksTodolist = tasks.map((task) => {
        const onChangeInput = () => changeCheckStatus(task.id, todolistId);
        const btnRemoveTask = () => removeTask(task.id, todolistId);

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeInput}
                />
                <span>{task.title}</span>
                <button onClick={btnRemoveTask}>x</button>
            </li>
        );
    });

    const filterTodoList = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.innerText) {
            case "Active":
                return changeTodoListFilter("active", todolistId);
            case "Completed":
                return changeTodoListFilter("completed", todolistId);
            default:
                return changeTodoListFilter("all", todolistId);
        }
    };

    const deleteTodolist = () => removeTodolist(todolistId);
    const addItem = (title: string) => addTask(title, todolistId);

    return (
        <div>
            <h3>
                {title} <button onClick={deleteTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addItem} />

            <ul>{tasksTodolist}</ul>

            <div>
                <button
                    className={todoListFilter === "all" ? "active-filter" : ""}
                    onClick={filterTodoList}
                >
                    All
                </button>
                <button
                    className={
                        todoListFilter === "active" ? "active-filter" : ""
                    }
                    onClick={filterTodoList}
                >
                    Active
                </button>
                <button
                    className={
                        todoListFilter === "completed" ? "active-filter" : ""
                    }
                    onClick={filterTodoList}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
