import React, { useState } from "react";
import "./App.css";

import Todolist from "./Todolist";
import { v1 } from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>(
        "all"
    );

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "React", isDone: false },
    ]);

    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setTodoListFilter(filterValue);
    };

    const addTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false };
        setTasks([newTask, ...tasks]);
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const changeCheckStatus = (taskId: string) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) task.isDone = !task.isDone;
        setTasks([...tasks]);
    };

    const getTaskForTodoList = () => {
        switch (todoListFilter) {
            case "active":
                return tasks.filter((t) => !t.isDone);

            case "completed":
                return tasks.filter((t) => t.isDone);

            default:
                return tasks;
        }
    };

    return (
        <div className="App">
            <Todolist
                title={todoListFilter}
                tasks={getTaskForTodoList()}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                removeTask={removeTask}
                changeCheckStatus={changeCheckStatus}
                todoListFilter={todoListFilter}
            />
        </div>
    );
}

export default App;
