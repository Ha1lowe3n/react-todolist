import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import App from "../app/App";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

export default {
    title: "Todolist/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = () => <App demo={true} />;

export const AppExample = Template.bind({});
