import React, { MouseEvent, useCallback } from "react";

import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import AddItemForm from "../../../components/AddItemForm";
import EditableSpan from "../../../components/EditableSpan";
import Task from "../../../components/Task";
import {
    FilterValuesType,
    TodolistDomainType,
} from "../../../state/reducers/todolists-reducer";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    changeTodoListFilter: (filterValue: FilterValuesType, id: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeCheckStatus: (
        taskId: string,
        todolistId: string,
        taskStatus: TaskStatuses,
        taskTitle: string
    ) => void;
    todoListFilter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => void;
    changeStateTitleTodolist: (newTitle: string, todolistId: string) => void;
};

const Todolist = React.memo(function ({
    todolist,
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
    const filterTodoList = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            switch (e.currentTarget.childNodes[0].textContent) {
                case "Active":
                    return changeTodoListFilter("active", todolist.id);
                case "Completed":
                    return changeTodoListFilter("completed", todolist.id);
                default:
                    return changeTodoListFilter("all", todolist.id);
            }
        },
        [changeTodoListFilter, todolist.id]
    );

    const deleteTodolist = () => removeTodolist(todolist.id);

    const addItem = useCallback(
        (title: string) => {
            addTask(title, todolist.id);
        },
        [addTask, todolist.id]
    );

    const changeTodolistTitle = useCallback(
        (newTitle: string) => {
            changeStateTitleTodolist(newTitle, todolist.id);
        },
        [changeStateTitleTodolist, todolist.id]
    );

    if (todoListFilter === "active") {
        tasks = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todoListFilter === "completed") {
        tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={todolist.title}
                    onChangeTitle={changeTodolistTitle}
                />{" "}
                <IconButton
                    aria-label="delete"
                    onClick={deleteTodolist}
                    disabled={todolist.entityStatus === "loading"}
                >
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addItem}
                disabled={todolist.entityStatus === "loading"}
            />

            <ul className={"todolists_tasks"}>
                {tasks &&
                    tasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                changeCheckStatus={changeCheckStatus}
                                removeTask={removeTask}
                                changeTaskTitle={changeTaskTitle}
                                task={task}
                                todolistId={todolist.id}
                            />
                        );
                    })}
            </ul>
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
});

export default Todolist;
