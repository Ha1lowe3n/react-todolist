import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
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

export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
    addItem: action("Button inside form clicked"),
    disabled: true,
};
