import React, { MouseEvent } from "react";

import { TaskType, FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => void;
    changeStateTitleTodolist: (newTitle: string, todolistId: string) => void;
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
    changeTaskTitle,
    changeStateTitleTodolist,
}: PropsType) {
    console.log("Todolist is called");
    const tasksTodolist = tasks.map((task) => {
        const onChangeInput = () => changeCheckStatus(task.id, todolistId);
        const btnRemoveTask = () => removeTask(task.id, todolistId);
        const onChangeTitle = (newValue: string) => {
            changeTaskTitle(task.id, todolistId, newValue);
        };

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox checked={task.isDone} onChange={onChangeInput} />
                <EditableSpan
                    title={task.title}
                    onChangeTitle={onChangeTitle}
                />
                <IconButton aria-label="delete" onClick={btnRemoveTask}>
                    <Delete />
                </IconButton>
            </li>
        );
    });

    const filterTodoList = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.childNodes[0].textContent) {
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
    const changeTodolistTitle = (newTitle: string) => {
        changeStateTitleTodolist(newTitle, todolistId);
    };

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    onChangeTitle={changeTodolistTitle}
                />{" "}
                <IconButton aria-label="delete" onClick={deleteTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem} />

            <ul className={"todolists_tasks"}>{tasksTodolist}</ul>

            <div>
                <Button
                    variant={todoListFilter === "all" ? "contained" : "text"}
                    onClick={filterTodoList}
                >
                    All
                </Button>
                <Button
                    color={"primary"}
                    variant={todoListFilter === "active" ? "contained" : "text"}
                    onClick={filterTodoList}
                >
                    Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={
                        todoListFilter === "completed" ? "contained" : "text"
                    }
                    onClick={filterTodoList}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
}

export default Todolist;
