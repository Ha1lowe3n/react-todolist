import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import Task, { TaskPropsType } from "../components/Task";

export default {
    title: "Todolist/Task",
    component: Task,
} as Meta;

const baseArgs = {
    changeTaskTitle: action("Title changed inside Task"),
    changeCheckStatus: action("Status changed inside Task"),
    removeTask: action("Remove Button inside Task clicked"),
};

const Template: Story<TaskPropsType> = (args: TaskPropsType) => (
    <Task {...args} />
);

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: { id: "1", title: "JS learn", isDone: true },
    todolistId: "todolistId1",
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: { id: "1", title: "JS learn", isDone: false },
    todolistId: "todolistId1",
};
