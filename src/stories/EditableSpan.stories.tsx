import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { action } from "@storybook/addon-actions";
import EditableSpan, {
    EditableSpanPropsType,
} from "../components/EditableSpan";

export default {
    title: "Todolist/EditableSpan",
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: "Value EditableSpan changed",
        },
        value: {
            defaultValue: "HTML",
            description: "Start",
        },
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (
    args: EditableSpanPropsType
) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: "Ratata",
    onChangeTitle: action("Title is changed"),
};
