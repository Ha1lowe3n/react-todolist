import React from "react";
// @ts-ignore
import { Story, Meta } from "@storybook/react/types-6-0";
// @ts-ignore
import { action } from "@storybook/addon-actions";

import AddItemForm, { AddItemFormPropsType } from "../components/AddItemForm";

export default {
    title: "Todolist/AddItemForm",
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: "Button inside form clicked",
        },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType) => (
    <AddItemForm {...args} />
);

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action("Button inside form clicked"),
};
