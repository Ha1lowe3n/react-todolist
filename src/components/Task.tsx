import React from "react";

import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import EditableSpan from "./EditableSpan";
import { TaskStatuses, TaskType } from "../api/todolists-api";

export type TaskPropsType = {
    changeCheckStatus: (taskId: string, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newValue: string
    ) => void;
    task: TaskType;
    todolistId: string;
};

const Task = React.memo(function ({
    changeCheckStatus,
    removeTask,
    changeTaskTitle,
    task,
    todolistId,
}: TaskPropsType) {
    const onChangeInput = () => changeCheckStatus(task.id, todolistId);
    const btnRemoveTask = () => removeTask(task.id, todolistId);
    const onChangeTitle = (newValue: string) => {
        changeTaskTitle(task.id, todolistId, newValue);
    };

    return (
        <li
            key={task.id}
            className={task.status === TaskStatuses.Completed ? "is-done" : ""}
        >
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeInput}
            />
            <EditableSpan title={task.title} onChangeTitle={onChangeTitle} />
            <IconButton aria-label="delete" onClick={btnRemoveTask}>
                <Delete />
            </IconButton>
        </li>
    );
});

export default Task;
